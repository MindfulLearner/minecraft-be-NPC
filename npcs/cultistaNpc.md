# Cultista - Quest Giver

**Ruolo:** Dà missioni ai giocatori in cambio di pepite d'oro. Tutto automatico — nessun admin necessario.

> Fa parte del pack `anpccustombeh`, condiviso con Mr Francesco, Old Piero, Elena, Marco e Sofia.

---

## Setup (una volta sola)

### 1. Copia il behavior pack

```
npcs/anpccustombeh/  →  C:\Users\[tuonome]\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_behavior_packs\
```

### 2. Registra il pack nel mondo (OBBLIGATORIO)

File: `...\minecraftWorlds\[tuomondo]\world_behavior_packs.json`

```json
[
    {
        "pack_id": "6f3d9a1c-4b8e-4f2a-9c7d-1e5b3a8f0d2e",
        "version": [1, 0, 0]
    }
]
```

Senza questo i bottoni NPC non eseguono comandi.

### 3. Scoreboard (una volta sola, in gioco)

```
/scoreboard objectives add quest_punti dummy "Punti Quest"
/scoreboard objectives setdisplay sidebar quest_punti
```

Gli altri obiettivi (`q_taglialegna`, `q_ossa`, `q_creeper`) vengono creati automaticamente dallo script all'avvio.

### 4. Spawna e tagga l'NPC

```
/give @s spawn_egg 1 51
/tag @e[type=npc,r=2] add cultista
```

### 5. Imposta la scena di default

```
/dialogue change @e[tag=cultista] cultista_intro
```

Da questo momento funziona per tutti i giocatori senza intervento admin.

---

## Workflow giocatore

1. **Clicca Cultista** → sceglie l'identità (intro) → arriva alle missioni
2. **Gioca** → i progressi vengono tracciati automaticamente con notifiche in chat
3. **Torna dal Cultista** → clicca `» Consegna` → sceglie la missione completata
4. **Lo script verifica** e premia automaticamente (pepite + punto scoreboard + annuncio in chat)

Se non ha finito, riceve il progresso attuale (es. `Scheletri: 6/10`).

---

## Missioni

| Missione | Obiettivo | Reward | Tracking |
|---|---|---|---|
| Il Taglialegna | Taglia 32 tronchi di quercia | 3 pepite | automatico (break block) |
| Le Ossa | Uccidi 10 scheletri | 4 pepite | automatico (entity die) |
| Sfama il Culto | Avere 16 pani nell'inventario | 3 pepite | check inventario alla consegna |
| Nel Buio | Scendi a Y≤30 | 4 pepite | automatico (posizione ogni 2s) |
| I Creeper | Uccidi 5 creeper | 3 pepite | automatico (entity die) |

---

## Scene del dialogo

| Scene Tag | Descrizione |
|---|---|
| `cultista_intro` | Prima scena — scelta dell'identità |
| `cultista_avventuriero` | Branch: avventuriero |
| `cultista_membro` | Branch: membro del culto |
| `cultista_smascherato` | Branch: smascherato |
| `cultista_main` | Menu missioni |
| `cultista_consegna` | Menu consegna |

---

## Proteggi l'NPC

Mettilo in una struttura chiusa o usa:
```
/gamemode adventure @a
```

---

## Checklist

- [ ] Behavior pack copiato
- [ ] `world_behavior_packs.json` aggiornato con il pack UUID
- [ ] Pack attivato nel mondo
- [ ] `/scoreboard objectives add quest_punti dummy` eseguito
- [ ] NPC spawnato e taggato con `cultista`
- [ ] `/dialogue change @e[tag=cultista] cultista_intro` eseguito
- [ ] Testato come giocatore non-operator

---

*Cultista - Minecraft Bedrock Edition v26.10+ | Script-driven*
