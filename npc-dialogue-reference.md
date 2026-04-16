# Bedrock NPC Dialogue - Reference

## File Location
```
behavior_pack/dialogue/scene.json
```
Multiple `.json` files allowed - Bedrock reads all of them.

---

## Full Scene Structure
```json
{
    "format_version": "1.17",
    "minecraft:npc_dialogue": {
        "scenes": [{
            "scene_tag": "scene_name",          // required - ID to call this scene
            "npc_name": "Shopkeeper",            // optional - overrides NPC display name
            "text": "§aWhat do you need?",       // optional - dialogue text (supports § codes)
            "on_open_commands": ["/say opened"], // optional - fire when dialogue opens
            "on_close_commands": ["/say bye"],   // optional - fire when dialogue closes
            "buttons": [{
                "name": "Get Diamond",           // button label
                "commands": ["/give @initiator diamond 1"]
            }]
        }]
    }
}
```

---

## Commands

| Command | What it does |
|---|---|
| `/dialogue open <npc> <player> [scene]` | Force-opens dialogue box. NPC can be hidden, must be in loaded chunk. |
| `/dialogue change <npc> <scene> [player]` | Silently points NPC to new scene - no popup, takes effect on next interaction. |

```bash
/dialogue open @e[type=npc,r=2] @p shop_intro
/dialogue open @e[tag=shopkeeper] @initiator shop_intro
/dialogue change @e[tag=questgiver] quest_complete @p
```

---

## Selectors

| Selector | Who | Note |
|---|---|---|
| `@initiator` | Player who opened the dialogue | **Only works inside NPC dialogue** - use this for per-player rewards |
| `@p` | Nearest player | |
| `@a` | All players | |

```bash
/tag @e[type=npc] add shopkeeper   # tag an NPC for targeting
```

---

## Branching Pattern
Chain scenes by calling `/dialogue open` inside button commands:
```json
{
    "scene_tag": "scene_a",
    "text": "Want a reward?",
    "buttons": [
        { "name": "Yes", "commands": ["/dialogue open @e[tag=npc1] @initiator scene_yes"] },
        { "name": "No",  "commands": ["/dialogue open @e[tag=npc1] @initiator scene_no"] }
    ]
}
```

---

## Rawtext (colors, scores, player names)

Plain `§` codes work directly in any string:
```json
"text": "§aGreen §cRed §r- reset"
```

Full rawtext object - mix text, player name, scoreboard:
```json
"text": { "rawtext": [
    { "text": "§eCoins: " },
    { "score": { "name": "@initiator", "objective": "coins" } },
    { "text": " - Hello " },
    { "selector": "@initiator" }
]}
```

### § Formatting Codes
| Code | Effect | Code | Effect |
|---|---|---|---|
| `§a` | Green | `§2` | Dark green |
| `§b` | Light blue | `§3` | Dark aqua |
| `§c` | Red | `§4` | Dark red |
| `§d` | Pink | `§5` | Dark purple |
| `§e` | Yellow | `§6` | Orange |
| `§f` | White | `§1` | Dark blue |
| `§l` | **Bold** | `§o` | *Italic* |
| `§k` | Obfuscated | `§r` | Reset |
| `\n` | New line | | |

---

## Gotchas

| Problem | Fix |
|---|---|
| Dialogue won't open | NPC must be in a loaded chunk (can be hidden underground) |
| `@initiator` not working | Only valid inside NPC scene command arrays |
| Scene not found | `scene_tag` is case-sensitive |
| `on_open` / `on_close` not firing | Must be `on_open_commands` / `on_close_commands` |
| Button limit | **UNTESTED** - no documented max, needs in-game confirmation |

---

## References
- [Microsoft - NPC Dialogue](https://learn.microsoft.com/en-us/minecraft/creator/documents/npcdialogue)
- [Bedrock Wiki - NPC Dialogue](https://wiki.bedrock.dev/entities/npc-dialogue)
- [Sample Behavior Pack](https://github.com/microsoft/minecraft-samples/tree/main/npc_dialogue_sample)
- [Raw Message JSON](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/rawmessagejson)
- [Target Selectors](https://learn.microsoft.com/en-us/minecraft/creator/documents/targetselectors)
