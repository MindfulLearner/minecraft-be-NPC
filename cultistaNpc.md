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
The land whispers to those who listen.
I have tasks for those willing to serve.
Complete my calling... and you will be rewarded.

Choose your trial below.
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
[Quest] The Woodcutter
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
[Quest] Bone Errand
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
[Quest] Feed the Cult
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
[Quest] Into the Dark
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
[Quest] The Green Threat
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
[!] Hear the Calling
```

**Command to paste:**
```
/say [Cultista] A new soul seeks their calling. The trials begin.
```

**What this does:**
> Broadcasts a server-wide message whenever a player talks to Cultista for the first time.  
> No reward - purely atmospheric and lets the host know someone started questing.

---

## Full Button Summary (Quick Reference)

| Slot | Label | Command | Reward |
|---|---|---|---|
| 1 | `[Quest] The Woodcutter` | `/give @initiator gold_ingot 3` | 3 gold ingots |
| 2 | `[Quest] Bone Errand` | `/give @initiator gold_ingot 4` | 4 gold ingots |
| 3 | `[Quest] Feed the Cult` | `/give @initiator gold_ingot 3` | 3 gold ingots |
| 4 | `[Quest] Into the Dark` | `/give @initiator gold_ingot 4` | 4 gold ingots |
| 5 | `[Quest] The Green Threat` | `/give @initiator gold_ingot 3` | 3 gold ingots |
| 6 | `[!] Hear the Calling` | `/say [Cultista] A new soul seeks their calling. The trials begin.` | Server announcement |

---

## Optional: Add a Noticeboard Next to Cultista

Place a **Sign** or **Lectern with a Book & Quill** nearby.  
Use this text for the book/sign:

```
=== CULTISTA'S TRIALS ===

[1] The Woodcutter
    Chop 32 oak logs
    Talk to Cultista

[2] Bone Errand
    Kill 10 skeletons
    Talk to Cultista

[3] Feed the Cult
    Collect 16 bread
    Talk to Cultista

[4] Into the Dark
    Reach Y=30 underground
    Talk to Cultista

[5] The Green Threat
    Kill 5 creepers
    Talk to Cultista

Complete all 5 to unlock
Tier 2 quests (coming soon).
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
