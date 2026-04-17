# Cultista - Quest Giver NPC Guide

> Vanilla Bedrock Edition - no mods or add-ons required  
> Designed for a **fresh server, day-1 players**

---

## Character Identity

| Field | Value |
|---|---|
| **NPC Name** | `Cultista` |
| **Role** | Quest Giver |
| **Vibe** | Mysterious, cryptic, slightly ominous - speaks in riddles |
| **Skin** | Default NPC skin works fine; pick the hooded/robed one if available |

---

## Step 0 - Setup Scoreboard (una volta sola)

Prima di spawnare Cultista, esegui questi due comandi come operator. Vanno fatti **una volta sola** all'inizio del server.

```
/scoreboard objectives add quest_punti dummy "Punti Quest"
/scoreboard objectives setdisplay sidebar quest_punti
```

Questo crea la classifica e la mostra sul lato destro dello schermo per tutti i giocatori.

> Nota: usa `cultista.json` dal behavior pack per avere piu' comandi per bottone (annunci + scoreboard). L'editor in-game supporta solo 1 comando per bottone.

```
/dialogue open @e[tag=cultista] @p cultista_main
```

---

## Step 1 - Spawn the NPC

Run this command as **operator** in chat:

```
/give @s spawn_egg 1 51
```

Right-click (or long-press on mobile/console) to place it.

---

## Step 2 - Open the NPC Editor

**Long-press / right-click** the NPC while you are **operator**.  
The editor panel will open with three fields: **Name**, **Dialogue**, and **Buttons**.

---

## Step 3 - Paste the Name

Copy and paste this exactly into the **Name** field:

```
Cultista
```

---

## Step 4 - Paste the Dialogue

Copy and paste this into the **Dialogue** field:

```
La terra sussurra... ma Josh urla.
Completa le mie prove, straniero.
Lui dice che sono "troppo seria".
Scegli la tua prova qui sotto.
```

> Tip: Keep dialogue under ~200 characters or it may get cut off on mobile screens.

---

## Step 5 - Set Up the Buttons

You have **6 button slots**. Below is the full setup.  
For each button: paste the **Label** into the button name field, and the **Command** into the command field.

---

### Button 1 - The Woodcutter

**Label to paste:**
```
[Missione] Il Taglialegna
```

**Command to paste:**
```
/give @initiator gold_ingot 3
```

**What the quest is:**
> "The Cult needs timber. Bring me proof you've worked the forest."  
> Collect **32 oak logs** (honor system - host can check inventory).  
> Clicking the button rewards **3 gold ingots** to spend at Mr Francesco.

---

### Button 2 - Bone Errand

**Label to paste:**
```
[Missione] Commissione delle Ossa
```

**Command to paste:**
```
/give @initiator gold_ingot 4
```

**What the quest is:**
> "The skeletons guard secrets. Relieve them of their bones."  
> Kill **10 skeletons** at night and collect their bones.  
> Clicking the button rewards **4 gold ingots** to spend at Mr Francesco.

> **Host note:** Watch chat for when players are online at night - verify by asking them to show bones in inventory.

---

### Button 3 - Feed the Cult

**Label to paste:**
```
[Missione] Sfama il Culto
```

**Command to paste:**
```
/give @initiator gold_ingot 3
```

**What the quest is:**
> "We hunger. A farmer is only as good as their harvest."  
> Grow and harvest **32 wheat** (or collect 16 bread from any source).  
> Clicking rewards **3 gold ingots** to spend at Mr Francesco.

---

### Button 4 - Into the Dark

**Label to paste:**
```
[Missione] Nel Buio
```

**Command to paste:**
```
/give @initiator gold_ingot 4
```

**What the quest is:**
> "Descend below the stone. The darkness fears those who carry light."  
> Reach **Y = 30 or lower** underground (check F3 / coordinates screen).  
> Clicking rewards **4 gold ingots** to spend at Mr Francesco.

> **Host note:** Ask the player to screenshot their coordinates screen as proof.

---

### Button 5 - The Green Threat

**Label to paste:**
```
[Missione] La Minaccia Verde
```

**Command to paste:**
```
/give @initiator gold_ingot 3
```

**What the quest is:**
> "Those green abominations endanger us all. Silence five of them."  
> Kill **5 creepers** (honor system).  
> Clicking rewards **3 gold ingots** to spend at Mr Francesco.

---

### Button 6 - The Calling (Announcement)

**Label to paste:**
```
[!] Ascolta la Chiamata
```

**Command to paste:**
```
/say [Cultista] Un'altra anima. Josh sara' contento. Probabilmente.
```

**What this does:**
> Broadcasts a server-wide message whenever a player talks to Cultista for the first time.  
> No reward - purely atmospheric and lets the host know someone started questing.

---

## Full Button Summary (Quick Reference)

| Slot | Label | Command | Reward |
|---|---|---|---|
| 1 | `[Missione] Il Taglialegna` | `/give @initiator gold_ingot 3` | 3 lingotti d'oro |
| 2 | `[Missione] Commissione delle Ossa` | `/give @initiator gold_ingot 4` | 4 lingotti d'oro |
| 3 | `[Missione] Sfama il Culto` | `/give @initiator gold_ingot 3` | 3 lingotti d'oro |
| 4 | `[Missione] Nel Buio` | `/give @initiator gold_ingot 4` | 4 lingotti d'oro |
| 5 | `[Missione] La Minaccia Verde` | `/give @initiator gold_ingot 3` | 3 lingotti d'oro |
| 6 | `[!] Ascolta la Chiamata` | `/say [Cultista] Un'altra anima. Josh sara' contento. Probabilmente.` | Annuncio server |

---

## Optional: Add a Noticeboard Next to Cultista

Place a **Sign** or **Lectern with a Book & Quill** nearby.  
Use this text for the book/sign:

```
=== LE PROVE DI CULTISTA ===

[1] Il Taglialegna
    Taglia 32 tronchi di quercia
    Parla con Cultista

[2] Commissione delle Ossa
    Uccidi 10 scheletri
    Parla con Cultista

[3] Sfama il Culto
    Raccogli 16 pani
    Parla con Cultista

[4] Nel Buio
    Raggiungi Y=30 sottoterra
    Parla con Cultista

[5] La Minaccia Verde
    Uccidi 5 creeper
    Parla con Cultista

Completa tutte e 5 per sbloccare
le missioni di livello 2 (presto).
```

---

## Protecting the NPC

Set the area around Cultista to **Adventure mode** so players can't break blocks near her:

```
/gamemode adventure @a
```

Or put her inside a **glass box / stone structure** with no door (players talk through the glass).

To make only the NPC area adventure mode, use:
```
/effect @a[r=5] slowness 1 0 true
```
This won't stop griefing but warns players they are in a special zone.

---

## Host Checklist

- [ ] Spawn the NPC with `/give @s spawn_egg 1 51`
- [ ] Paste the **Name**: `Cultista`
- [ ] Paste the **Dialogue** (4 lines above)
- [ ] Add all **6 buttons** with labels and commands from the table
- [ ] Place a **Noticeboard** sign or lectern nearby
- [ ] Protect the area (glass box or adventure mode)
- [ ] Test every button as a **non-operator player** to confirm commands fire correctly
- [ ] Announce to your friends: `"Talk to Cultista at spawn to get your first quests!"`

---

## Notes

- All rewards use `/give @initiator` - targets the exact player who clicked, safe for multiplayer.
- Quest verification is **honor-based** - this is a friends server so trust is assumed.  
  For bigger rewards later, have the host manually verify before giving items from a locked chest.
- These are **Tier 1 quests**. Once your friends have iron tools and basic gear, expand to Tier 2 (see `npc-ideas.md` for ideas).

---

*Cultista NPC - built for Minecraft Bedrock Edition v26.10+*
