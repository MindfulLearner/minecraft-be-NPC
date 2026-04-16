# Minecraft Bedrock NPC Setup

NPC guides and dialogue files for a friends Bedrock Edition server.

## What is this

A set of ready-to-use NPC configurations for a vanilla Bedrock server. No mods or add-ons required. Each NPC has a step-by-step setup guide and all commands ready to paste in-game.

## NPCs

### Cultista - Quest Giver
Gives players quests in exchange for gold ingots. Five Tier 1 quests covering gathering, combat, farming, and exploration. See `cultistaNpc.md`.

### Mr Francesco - Shopkeeper
Sells basic items for gold ingots. Players drop payment in a chest next to him, then click a button to receive goods. See `mrfrancescoNPC.md`.

## Economy

Currency: **Gold Ingots**

Players earn gold by completing Cultista quests and spend it at Mr Francesco's shop.

| Source | Gold earned |
|---|---|
| Woodcutter quest | 3 |
| Bone Errand quest | 4 |
| Feed the Cult quest | 3 |
| Into the Dark quest | 4 |
| The Green Threat quest | 3 |

| Item | Cost |
|---|---|
| Bread x8 | 2 gold |
| Torches x16 | 1 gold |
| Iron Sword | 4 gold |
| Iron Pickaxe | 4 gold |
| Seeds x16 | 1 gold |

## Files

| File | Purpose |
|---|---|
| `npcs/cultistaNpc.md` | Step-by-step setup for the quest giver NPC |
| `npcs/mrfrancescoNPC.md` | Step-by-step setup for the shop NPC |
| `npcs/behavior_pack/dialogue/shop.json` | Scene file for Mr Francesco (behavior pack approach) |
| `utility/npc-dialogue-reference.md` | Full reference for the Bedrock NPC dialogue system |
| `utility/npc-ideas.md` | Ideas and future expansion for quests and shop tiers |
| `utility/minecraft-bedrock.md` | General Bedrock Edition reference |

## Requirements

- Minecraft Bedrock Edition v26.10 or later
- Operator permissions to spawn and configure NPCs
