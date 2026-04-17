# NPC Ideas - Friends Server

> **Active NPCs:** Cultista (quest giver) + Mr Francesco (shop) — see `npcs/anpccustombeh/`
> **Next batch:** 4 new NPCs planned — see `npcs/new-npc-ideas.md`
> - Old Piero (fisherman), Elena (huntress), Marco (builder), Sofia (decorator)

---

# Shop & Quest Giver NPC Ideas - Friends Server

## Overview

Two NPC roles to bring your friends server to life:
- **The Shopkeeper** - buy/sell items using a custom currency or barter system
- **The Quest Giver** - assigns missions, tracks progress, rewards players

Both are built using **NPC Add-ons** (available via Bedrock's built-in `/give @s npc_spawn_egg` command - no extra add-on required on vanilla Bedrock).

---

## The Shopkeeper

### Concept
A villager-style NPC that acts as a central economy hub. Friends earn "coins" by playing and spend them here.

### Currency Options (pick one)
| Currency | How to get it | Pros |
|---|---|---|
| **Emeralds** | Mine, trade, loot | Already in the game, no setup |
| **Gold Ingots** | Mine, piglin trade | Thematic if you have a Nether theme |
| **Custom Named Item** | Chest at spawn with a starter pack | Most immersive - rename a stick "Server Coin" |

### Shop Categories

#### Tier 1 - Starter Goods (cheap)
- Bread, cooked food, torches
- Basic tools (stone/iron)
- Seeds and saplings

#### Tier 2 - Mid Game
- Enchanted books (common enchants: Efficiency III, Protection II)
- Horse armor
- Ender pearls (small stack)
- Name tags *(now craftable in v26.10, but still useful for sale)*

#### Tier 3 - Luxury
- Elytra repair (offer a Phantom Membrane for a price)
- Rare dyes and banners
- Heads / decorative blocks
- A "mystery box" - random item from a loot chest the host prepares

### NPC Dialogue Ideas
```
[Opening]
"Welcome, traveler. I have what you need - if you have what I want."

[Out of stock]
"Come back later. My supplier ran into some creepers."

[Thank you]
"Spend wisely. The wilderness out there is not kind."
```

### How to Set It Up (no mods)
1. Place a **Chest** behind the NPC sign-post with items inside
2. Use **Signs** or **Book & Quill** as a price list posted nearby
3. Use the **NPC Editor** (operator-only) to write dialogue and add button links to commands
4. Optional: Use `/give` commands wired to NPC buttons for automated trades

---

## The Quest Giver

### Concept
An NPC that hands out missions to your friends. Quests add a shared goal and give everyone something to do besides free-roam.

### Quest Types

#### Gathering Quests (easiest to run)
> Collect X of an item and bring it back

| Quest Name | Objective | Reward |
|---|---|---|
| **Bone Merchant** | Bring 32 bones | 5 emeralds + Skeleton head |
| **The Iron Run** | Collect 64 iron ore | Diamond pickaxe |
| **Nether Errand** | Return with 10 blaze rods | Enchanted Golden Apple |
| **Dragon's Hoard** | Find 1 dragon egg | Custom title sign + special chest |

#### Hunting Quests (PvE goals)
> Kill a specific mob or boss

| Quest Name | Objective | Reward |
|---|---|---|
| **Slayer of Skeletons** | Kill 25 skeletons | Bow + Power II |
| **Elder Problem** | Defeat an Elder Guardian | Trident (from host chest) |
| **End It** | Kill the Ender Dragon | Server-wide announcement + free Tier 3 shop item |

#### Exploration Quests (adventure goals)
> Find a location and screenshot / report back

| Quest Name | Objective | Reward |
|---|---|---|
| **Cartographer** | Find a Woodland Mansion | Totem of Undying |
| **Deep Diver** | Reach Y -50 | Stack of diamonds |
| **Pilgrim** | Visit all biomes | Elytra |

#### Build Quests (creative challenges)
> Build something the host judges

| Quest Name | Objective | Reward |
|---|---|---|
| **Architect** | Build a house with at least 3 rooms | 64 of any block of their choice |
| **Gardener** | Create a working farm (5 crop types) | Silk Touch shovel |
| **Landmark** | Build a statue visible from 100 blocks away | Their name on a sign at spawn |

---

## NPC Setup Tips (Bedrock Specific)

### Placing an NPC
```
/give @s spawn_egg 1 51
```
Spawn the NPC, then **long-press / interact** as an operator to open the NPC editor.

### NPC Editor Fields
- **Name** - shown above the NPC's head
- **Dialogue** - what they say when you talk to them
- **Buttons** - up to 6 buttons, each can run a command or open a URL

### Useful Commands for NPC Buttons
```bash
# Give a quest reward item directly
/give @p diamond 5

# Teleport player to quest area
/tp @p 100 64 -200

# Announce quest completion to all
/say [Quest Complete] @p finished The Iron Run!

# Give XP as reward
/xp 500 @p
```

### Preventing NPC Grief
- Set the NPC area as **Adventure mode** or use barriers:
  ```
  /gamemode adventure @a
  ```
- Put NPCs inside a **protected structure** (glass box, fenced plaza)
- Only the host (operator) can edit NPC dialogue

---

## Suggested Spawn Area Layout

```
         [QUEST BOARD - Signs with active quests]
                        |
    [QUEST GIVER NPC]---+---[SHOPKEEPER NPC]
         "Old Mira"              "Trader Brom"
                        |
              [Welcome Sign / Rules]
                        |
                   [Portal / Exit]
```

---

## Quick-Start Checklist

- [ ] Place and name the Shopkeeper NPC
- [ ] Build a small shop building around them
- [ ] Write a price list in a **Book & Quill** and put it on a lectern nearby
- [ ] Place and name the Quest Giver NPC
- [ ] Write 3–5 starting quests on **Signs** or a noticeboard
- [ ] Prepare reward chests (locked in a server room only the host accesses)
- [ ] Test NPC dialogue and commands as a non-operator player

---

*Built for Minecraft Bedrock Edition - compatible with v26.10 and later*
