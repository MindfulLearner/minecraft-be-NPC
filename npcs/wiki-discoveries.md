# Scoperte non documentate sulla wiki

Verificato su wiki.bedrock.dev — maggio 2025.

Legenda:
- ❌ **Assente** — non esiste nulla sulla wiki
- ⚠️ **Parziale** — menzionato ma senza esempi o incompleto
- ✅ **Presente** — già documentato, non serve aggiornare

---

## NPC Dialogue

| # | Scoperta | Stato | Pagina wiki |
|---|---|---|---|
| 1 | NPC button → `/scriptevent` → `ActionFormData` JS (bypass limite 6 bottoni) | ❌ | npc-dialogue |
| 2 | Lingua dinamica runtime: `on_open_commands` → `scriptevent` → `player.hasTag` → `/dialogue open` scena `_en` | ❌ | npc-dialogue |
| 3 | Multi-NPC router in un unico `scriptEventReceive` con `{ namespaces: [...] }` | ❌ | npc-dialogue / custom-commands |
| 4 | `ev.initiator` (non `ev.sourceEntity`) quando lo scriptevent viene da un bottone NPC | ⚠️ | script-server (menzionato solo per custom-commands, non per scriptEventReceive) |
| 5 | `dashboard:open` da command block: `ev.initiator` è null, player va cercato via `ev.message` | ❌ | — |
| 6 | Limite pratico ~6 bottoni NPC (wiki dice max 256 per ActionFormData, nulla sui dialoghi NPC) | ❌ | npc-dialogue |
| 7 | `/dialogue change` non ha effetto finché il player non riapre manualmente il dialogo | ✅ | npc-dialogue (documentato esplicitamente) |

---

## scriptEventReceive + pattern quest

| # | Scoperta | Stato | Pagina wiki |
|---|---|---|---|
| 8 | Tag state machine completa: `q_x` / `q_x_done` / `q_x_done_<N>` / `q_x_ever` | ❌ | — |
| 9 | Daily quest server-side: `Math.floor(Date.now() / 86400000)` come suffisso tag, zero cron | ❌ | — |
| 10 | `player.getTags().some(t => t.startsWith("q_x_done_"))` per controllare "ha mai completato" | ❌ | — |
| 11 | Auto-unlock avanzate: `checkUnlock()` in `deliverQuest()` controlla tutti i base via `ever()` e aggiunge tag | ❌ | — |

---

## Inventory API

| # | Scoperta | Stato | Pagina wiki |
|---|---|---|---|
| 12 | `countItems(player, typeIds[])` con `Set` per varianti colore (lana, fiori, dye) — `clear @s` non supporta item multipli | ❌ | — |
| 13 | Rimozione parziale stack: `item.amount -= N; inv.setItem(i, item.amount > 0 ? item : undefined)` | ❌ | — |
| 14 | `inv.getItem(i)?.typeId` restituisce namespace completo (`"minecraft:oak_log"`) — item custom già hanno il loro (`"cc:banana"`) | ❌ | — |

---

## Item incantati via Script API

| # | Scoperta | Stato | Pagina wiki |
|---|---|---|---|
| 15 | Pattern completo: `new ItemStack` + `item.nameTag` + `item.getComponent("minecraft:enchantable").addEnchantment({ type: EnchantmentTypes.get("snake_case_id"), level })` | ❌ | enchantments (solo tabella ID, zero Script API) |
| 16 | `EnchantmentTypes.get()` vuole `snake_case` minuscolo (`"feather_falling"` non `"FeatherFalling"`) — eccezione silenziabile se incompatibile | ❌ | — |

---

## Form UI

| # | Scoperta | Stato | Pagina wiki |
|---|---|---|---|
| 17 | `system.runTimeout(() => form.show(player), 1)` obbligatorio da `scriptEventReceive` e `itemUse` (altrimenti la form non compare) | ❌ | server-forms |
| 18 | Menu ricorsivi: riaprire la form dentro `.then()` dopo ogni azione crea menu persistenti | ❌ | server-forms |
| 19 | Body dinamico: `.body()` calcolato al momento dell'apertura con dati live (gemme, progresso) | ❌ | server-forms |
| 20 | `ModalFormData.slider()` per input numerico — zero esempi pratici | ❌ | server-forms (elenca il metodo, nessun esempio) |
| 21 | `MessageFormData` come confirm/cancel: `button1` = annulla, `button2` = conferma, `r.selection === 0` = annullato/button1 | ✅ | server-forms (documentato con esempio) |

---

## Server features originali

| # | Scoperta | Stato | Pagina wiki |
|---|---|---|---|
| 22 | Better sleep 50%: `player.isSleeping` + `world.getAbsoluteTime() % 24000 >= 12542` — puro Script API, zero gamerule | ❌ | — |
| 23 | `entity.remove()` vs `entity.kill()`: `remove()` è silenzioso (niente drops, niente death event) — per item cleanup usare `remove()` | ❌ | — |
| 24 | Named entity detection: `e.nameTag && e.nameTag.trim() !== ""` per proteggere animali nominati dal cleanup | ❌ | — |
| 25 | Alert una-tantum per sessione con `Set`: aggiunge chiave al Set al primo superamento soglia, non rispamma | ❌ | — |
| 26 | Session timer: `ev.initialSpawn` su `playerSpawn` evita reset a ogni respawn; `playerLeave` ha solo `ev.playerName` (no `ev.player`) | ❌ | — |
| 27 | `new Date().getHours()` funziona nello script Bedrock e dà l'ora reale del server (distinta da `world.getAbsoluteTime()`) | ❌ | — |

---

## Riepilogo

| Stato | Conteggio |
|---|---|
| ❌ Assente dalla wiki | **23** |
| ⚠️ Parziale / incompleto | **1** |
| ✅ Già presente | **2** |

---

## Priorità per contribuire alla wiki

| Priorità | # | Voce | Motivo |
|---|---|---|---|
| 🔴 Alta | 1 | NPC → scriptevent → form JS | Pattern chiave, cambia tutto l'approccio agli NPC |
| 🔴 Alta | 4 | `ev.initiator` in scriptEventReceive | Bug silenzioso molto comune, rompe il codice |
| 🔴 Alta | 17 | `runTimeout` prima di `form.show()` | Bug silenzioso, nessuno capisce perché la form non appare |
| 🔴 Alta | 15 | `giveSpecialItem` completo | Richiestissimo, frammenti ovunque ma pattern completo da nessuna parte |
| 🟡 Media | 8 | Tag state machine quest | Fondamentale per qualsiasi sistema di quest |
| 🟡 Media | 9 | Daily quest con `Date.now()` | Soluzione elegante senza add-on esterni |
| 🟡 Media | 12 | `countItems` su array typeId | Problema comune con item colorati/varianti |
| 🟡 Media | 23 | `entity.remove()` vs `entity.kill()` | Differenza non ovvia, causa bug |
| 🟡 Media | 2 | Lingua dinamica NPC | Utile per server internazionali |
| 🟢 Bassa | 22 | Better sleep pattern | Specifico ma completo e funzionante |
| 🟢 Bassa | 18-19 | Form loops + body dinamico | Espansione naturale della pagina esistente |
| 🟢 Bassa | 25-26 | Alert set + session timer | Pattern server utili |
