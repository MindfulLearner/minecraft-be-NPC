# New NPCs — Design & Implementation Reference

Four quest-giving NPCs added to `anpccustombeh`. Dialogue files are live in `dialogue/`. Script logic is in `scripts/main.js`.

---

## 1. Old Piero — The Traumatized Fisherman

**Tag:** `pescatore` | **Colour:** `§b` (light blue) | **Dialogue file:** `pescatore.json`

### Backstory
Old Piero was once a happy family man and skilled fisherman. One afternoon he took his wife and two children out on the lake — none of them came back. A colossal fish devoured them. Piero survived by clinging to a plank. Since that day he cannot go near water. He needs someone else to fish for him — not for food, but for **revenge**.

### Scene flow
`pescatore_intro` → `pescatore_storia` → `pescatore_patto` → `pescatore_main` ↔ `pescatore_consegna`

### Quests

| Quest ID | Objective | Reward | Tracking |
|---|---|---|---|
| `piero_pesce` | Bring 10 cod | 3 pepite | inventory check on deliver |
| `piero_salmone` | Bring 8 salmon | 4 pepite | inventory check on deliver |
| `piero_tropicale` | Bring 6 tropical fish | 5 pepite | inventory check on deliver |

### Spawn & setup
```
/give @s spawn_egg 1 51
/tag @e[type=npc,r=2] add pescatore
/dialogue change @e[tag=pescatore] pescatore_intro
```

---

## 2. Elena — The Huntress

**Tag:** `cacciatrice` | **Colour:** `§6` (orange) | **Dialogue file:** `cacciatrice.json`

### Backstory
Elena has been hunting since she could walk. She roams the land looking for players who show real potential — not power, but hunger. She tests newcomers with small hunts first: zombies, then skeletons, then livestock. Feeding the village takes skill too.

### Scene flow
`cacciatrice_intro` → `cacciatrice_sfida` → `cacciatrice_main` ↔ `cacciatrice_consegna`

### Quests

| Quest ID | Objective | Reward | Tracking |
|---|---|---|---|
| `elena_zombie` | Kill 8 zombies | 3 pepite | auto (entityDie) |
| `elena_scheletri` | Kill 10 skeletons | 4 pepite | auto (entityDie) |
| `elena_vacche` | Kill 5 cows | 3 pepite | auto (entityDie) |
| `elena_polli` | Kill 8 chickens | 2 pepite | auto (entityDie) |

### Spawn & setup
```
/give @s spawn_egg 1 51
/tag @e[type=npc,r=2] add cacciatrice
/dialogue change @e[tag=cacciatrice] cacciatrice_intro
```

---

## 3. Marco — The Builder

**Tag:** `costruttore` | **Colour:** `§9` (blue) | **Dialogue file:** `costruttore.json`

### Backstory
Marco has been trying to expand his village for years but can't do it alone. He's a visionary with no manpower. He needs raw materials before he can build anything — stone for foundations, wood for frames, coal for torches. He always has another request.

### Scene flow
`costruttore_intro` → `costruttore_sogno` / `costruttore_realista` → `costruttore_main` ↔ `costruttore_consegna`

### Quests

| Quest ID | Objective | Reward | Tracking |
|---|---|---|---|
| `marco_ciottoli` | Bring 64 cobblestone | 3 pepite | inventory check + clear |
| `marco_quercia` | Bring 32 oak logs | 3 pepite | inventory check + clear |
| `marco_carbone` | Bring 16 coal | 2 pepite | inventory check + clear |
| `marco_ghiaia` | Bring 32 gravel | 2 pepite | inventory check + clear |

### Spawn & setup
```
/give @s spawn_egg 1 51
/tag @e[type=npc,r=2] add costruttore
/dialogue change @e[tag=costruttore] costruttore_intro
```

---

## 4. Sofia — The Decorator

**Tag:** `decoratrice` | **Colour:** `§d` (pink) | **Dialogue file:** `decoratrice.json`

### Backstory
Sofia moved into a new place and it's completely bare. She has big plans — flowers on every windowsill, colorful rugs, a bamboo corner — but she spends all her time dreaming and none of it gathering. She'll happily pay in gold nuggets to anyone willing to collect decorations for her.

### Scene flow
`decoratrice_intro` → `decoratrice_piano` → `decoratrice_main` ↔ `decoratrice_consegna`

### Quests

| Quest ID | Objective | Reward | Tracking |
|---|---|---|---|
| `sofia_fiori` | Bring 16 flowers (any type) | 2 pepite | inventory check + clear |
| `sofia_lana` | Bring 8 colored wool (any color, not white) | 3 pepite | inventory check + clear |
| `sofia_colorante` | Bring 6 dye (any type) | 3 pepite | inventory check + clear |
| `sofia_bamboo` | Bring 16 bamboo | 2 pepite | inventory check + clear |

### Spawn & setup
```
/give @s spawn_egg 1 51
/tag @e[type=npc,r=2] add decoratrice
/dialogue change @e[tag=decoratrice] decoratrice_intro
```

---

## Shared scoreboard objectives (auto-created on world load)

| Objective | Quest |
|---|---|
| `q_taglialegna` | Cultista — taglialegna |
| `q_ossa` | Cultista — ossa |
| `q_creeper` | Cultista — creeper |
| `q_el_zombie` | Elena — zombie |
| `q_el_scheletri` | Elena — scheletri |
| `q_el_vacche` | Elena — vacche |
| `q_el_polli` | Elena — polli |

---

*New NPCs — Minecraft Bedrock Edition v26.10+ | anpccustombeh pack*
