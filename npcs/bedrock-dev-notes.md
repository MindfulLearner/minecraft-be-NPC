# Bedrock Dev Notes — NPC System

Riferimento tecnico per questo pack. Fonte: [wiki.bedrock.dev](https://wiki.bedrock.dev)

---

## 1. Struttura file dialogo

File in `BP/dialogue/`, format version `1.17`.

```json
{
    "format_version": "1.17",
    "minecraft:npc_dialogue": {
        "scenes": [{
            "scene_tag": "npc_intro",
            "npc_name": "Nome NPC",
            "text": "Testo fumetto",
            "on_open_commands":  ["/scriptevent npc:lang_check"],
            "on_close_commands": [],
            "buttons": [
                { "name": "Accetta", "commands": ["/scriptevent npc:accept missione_x"] }
            ]
        }]
    }
}
```

**`@initiator`** — selettore speciale per il giocatore che ha il dialogo aperto. Funziona **solo** nei comandi di dialogo (on_open, on_close, buttons).

**Comandi utili:**
```
/dialogue open <npc> <player> [sceneName]
/dialogue change <npc> <sceneName> [player]
```

**Limitazioni:**
- Max **6 bottoni per scena** — per più opzioni usa paginazione (vedi shop)
- NPC non interagibili in **Creative mode**
- Se l'NPC è lontano serve una ticking area

---

## 2. Script API — Setup manifest

```json
"dependencies": [
  { "module_name": "@minecraft/server",    "version": "1.9.0" },
  { "module_name": "@minecraft/server-ui", "version": "1.1.0" }
]
```

Import usati in questo pack:
```js
import { world, system, ItemStack, EnchantmentTypes } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
```

**Init scoreboard** — usare `system.run()` (esegue al prossimo tick, mondo già pronto):
```js
system.run(() => {
    try { world.scoreboard.addObjective("mio_obj", "dummy"); } catch {}
    // catch silenzioso: l'obiettivo esiste già → ok
});
```

---

## 3. scriptEventReceive — Gotcha importante

Nel subscriber usa `ev.initiator`, **non** `ev.sourceEntity`:

```js
system.afterEvents.scriptEventReceive.subscribe((ev) => {
    // dashboard:open può venire da command block — gestiscilo prima
    if (ev.id === "dashboard:open") {
        const player = world.getAllPlayers().find(p => p.name === ev.message.trim());
        if (player) openDashboard(player);
        return;
    }

    const player = ev.initiator; // ← usa questo, non ev.sourceEntity
    if (!player || player.typeId !== "minecraft:player") return;

    const action = ev.id.split(":")[1]; // es. "cultista:accept" → "accept"
    const msg    = ev.message.trim();
    // ...
}, { namespaces: ["cultista", "shop", "pescatore"] }); // filtra namespace
```

Il filtro `namespaces` evita di processare eventi di altri pack.

---

## 4. Scoreboard

```js
// Crea (se non esiste)
try { world.scoreboard.addObjective("q_ossa", "dummy"); } catch {}

// Helper getScore (gestisce giocatori mai registrati)
function getScore(obj, player) {
    try { return obj.getScore(player) ?? 0; } catch { return 0; }
}

// Lettura / scrittura
const n = getScore(world.scoreboard.getObjective("q_ossa"), player);
world.scoreboard.getObjective("q_ossa").setScore(player, n + 1);

// Sidebar
world.scoreboard.setDisplayAtDisplaySlot("sidebar", {
    objective: world.scoreboard.getObjective("quest_punti")
});
```

---

## 5. Inventory helpers

Pattern usati in questo pack — non esposti dall'API direttamente:

```js
// Conta un singolo tipo
function countItem(player, typeId) {
    const inv = player.getComponent("minecraft:inventory").container;
    let n = 0;
    for (let i = 0; i < inv.size; i++) {
        const item = inv.getItem(i);
        if (item?.typeId === typeId) n += item.amount;
    }
    return n;
}

// Conta più typeId (es. tutti i fiori, tutta la lana colorata)
function countItems(player, typeIds) {
    const set = new Set(typeIds);
    const inv = player.getComponent("minecraft:inventory").container;
    let n = 0;
    for (let i = 0; i < inv.size; i++) {
        const item = inv.getItem(i);
        if (item && set.has(item.typeId)) n += item.amount;
    }
    return n;
}

// Rimuove N item da una lista di typeId
function clearItems(player, typeIds, amount) {
    const set = new Set(typeIds);
    const inv = player.getComponent("minecraft:inventory").container;
    let left = amount;
    for (let i = 0; i < inv.size && left > 0; i++) {
        const item = inv.getItem(i);
        if (!item || !set.has(item.typeId)) continue;
        const take = Math.min(item.amount, left);
        item.amount -= take;
        inv.setItem(i, item.amount > 0 ? item : undefined);
        left -= take;
    }
}
```

---

## 6. Kill tracker

```js
function trackKill(player, deadType, targetType, objId, goal, prefix, label) {
    if (deadType !== targetType) return;
    if (!player.hasTag(`q_${objId.replace("q_", "")}`)) return; // solo se ha la quest attiva
    const obj = world.scoreboard.getObjective(objId);
    const n   = getScore(obj, player) + 1;
    if (n > goal) return;
    obj.setScore(player, n);
    player.sendMessage(n >= goal
        ? `${prefix} Obiettivo raggiunto. Torna da me.`
        : `§7[Quest] ${label}: ${n}/${goal}`
    );
}

// Uso nel subscriber entityDie:
world.afterEvents.entityDie.subscribe((ev) => {
    const killer  = ev.damageSource.damagingEntity;
    if (!killer || killer.typeId !== "minecraft:player") return;
    const deadType = ev.deadEntity.typeId;
    trackKill(killer, deadType, "minecraft:skeleton", "q_ossa", 10, "§5[NPC]", "Scheletri");
});
```

---

## 7. giveSpecialItem — item incantati via API

```js
function giveSpecialItem(player, typeId, name, enchants) {
    try {
        const item = new ItemStack(typeId, 1);
        item.nameTag = name;
        const ench = item.getComponent("minecraft:enchantable");
        if (ench) {
            for (const [id, level] of Object.entries(enchants)) {
                try { ench.addEnchantment({ type: EnchantmentTypes.get(id), level }); } catch {}
            }
        }
        player.getComponent("minecraft:inventory")?.container.addItem(item);
    } catch {
        player.runCommand(`give @s ${typeId.replace("minecraft:", "")} 1`); // fallback
    }
}

// Esempio
giveSpecialItem(player, "minecraft:netherite_sword", "§5§lSpada", {
    sharpness: 5, fire_aspect: 2, looting: 3, unbreaking: 3, mending: 1
});
```

---

## 8. ActionFormData / MessageFormData / ModalFormData

```js
// ActionFormData — lista di bottoni (max ~6 visibili bene)
new ActionFormData()
    .title("§lTitolo")
    .body("Testo corpo")
    .button("§a» Opzione 1")
    .button("§c» Opzione 2")
    .show(player).then(r => {
        if (r.canceled) return;
        if (r.selection === 0) { /* opzione 1 */ }
    }).catch(() => {});

// MessageFormData — solo 2 bottoni (button1 = sinistra, button2 = destra)
new MessageFormData()
    .title("Conferma")
    .body("Sei sicuro?")
    .button1("§0Annulla")
    .button2("§cConferma")
    .show(player).then(r => {
        if (r.canceled || r.selection === 0) return;
        // confermato
    }).catch(() => {});

// ModalFormData — input, slider, toggle, dropdown
new ModalFormData()
    .title("Imposta")
    .slider("Quanti tenerne?", 0, 100, 1, 20) // min, max, step, default
    .show(player).then(r => {
        if (r.canceled) return;
        const valore = r.formValues[0]; // indice = ordine di aggiunta
    }).catch(() => {});
```

**Nota:** le form devono essere aperte con `system.runTimeout(() => openForm(player), 1)` se chiamate da `scriptEventReceive` — altrimenti possono non mostrarsi.

---

## 9. Tag giocatore — convenzioni

| Pattern | Significato |
|---|---|
| `q_<quest>` | Quest attiva |
| `q_<quest>_done` | Quest completata (non ripetibile) |
| `q_<quest>_ever` | Ha completato almeno una volta (anche repeatable) |
| `q_<quest>_done_<daynum>` | Daily completata oggi |
| `<npc>_avanzato` | Sblocco missioni avanzate |
| `<npc>_finale` | Premio finale ricevuto |
| `sara` | Lingua inglese + feature avanzate |
| `admin` | Accesso Admin Panel nel dashboard |

```js
// Daily tag
function getDayTag(quest) {
    return `q_${quest}_done_${Math.floor(Date.now() / 86400000)}`;
}

// Check se quest completata (gestisce sia daily che permanente)
function isQuestDone(player, quest) {
    return REPEATABLE_QUESTS.has(quest)
        ? player.hasTag(getDayTag(quest))
        : player.hasTag(`q_${quest}_done`);
}

// Check "ha mai completato" (usato per unlock avanzate)
const ever = (q) =>
    player.hasTag(`q_${q}_ever`) ||
    player.hasTag(`q_${q}_done`) ||
    (REPEATABLE_QUESTS.has(q) && player.getTags().some(t => t.startsWith(`q_${q}_done_`)));
```

---

## 10. Shop — struttura base

Un oggetto nel catalogo ha questa forma:

```js
const SHOP_MAP = {
    diamond: { name: "Diamante", price: 24, amount: 1 },
    // item incantato: typeId separato dalla chiave
    book_mending: { typeId: "enchanted_book", name: "Libro: Riparazione", price: 80, amount: 1,
                    enchants: { mending: 1 } },
};

const SELL_MAP = {
    iron_ingot: { name: "Ferro x8", amount: 8, reward: 2 },
    // multi-type: typeIds invece di usare la chiave come typeId
    white_wool: { name: "Lana x32", amount: 32, reward: 1, typeIds: WOOL_IDS },
};
```

La chiave è il `typeId` senza namespace (es. `diamond` → `minecraft:diamond`), tranne se contiene già `:` (item custom pack come `cc:banana`).

---

## 11. Utili vari

```js
// ActionBar (testo sopra hotbar)
player.onScreenDisplay.setActionBar(`§eGemme: §f${n} §6◆`);

// Posizione Y del giocatore (per quest profondità)
player.location.y

// Ora del giorno
const time = world.getAbsoluteTime() % 24000;
const isNight = time >= 12542;

// Giocatore dorme
player.isSleeping

// Comando su una dimensione specifica
world.getDimension("overworld").runCommand("time set day");
world.getDimension("nether").getEntities({ type: "minecraft:blaze" });

// Rimuovi entità (item a terra) senza death event
entity.remove(); // diverso da entity.kill()

// Nametag colorata dinamica
player.nameTag = `§c✦ §f${player.name}`;
```

---

## 12. Come aggiungere un nuovo NPC

1. Crea `dialogue/nomenuovo.json` (copia `costruttore.json` come base)
2. Aggiungi il namespace in `scriptEventReceive`:
   ```js
   }, { namespaces: [..., "nomenuovo"] });
   ```
3. Aggiungi handler per le azioni (`accept`, `deliver`, ecc.)
4. Spawna e tagga in-game:
   ```
   /give @s spawn_egg 1 51
   /tag @e[type=npc,r=2] add nomenuovo
   /dialogue change @e[tag=nomenuovo] nomenuovo_intro
   ```
5. Aggiungi all'array `RESETS` in `openAdminPanel()` per il reset automatico

---

## 13. Link utili

| Argomento | URL |
|---|---|
| NPC Dialogue format | https://wiki.bedrock.dev/entities/npc-dialogue |
| Scripting intro + manifest | https://wiki.bedrock.dev/scripting/scripting-intro |
| Script API modules | https://wiki.bedrock.dev/scripting/api-modules |
| Server Forms | https://wiki.bedrock.dev/scripting/server-forms |
| Scoreboard operations | https://wiki.bedrock.dev/commands/scoreboard-operations |
