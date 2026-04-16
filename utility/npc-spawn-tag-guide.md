# How to Spawn and Tag an NPC

Vanilla Bedrock Edition - operator required.

---

## 1. Get the spawn egg

```
/give @s spawn_egg 1 51
```

---

## 2. Place the NPC

Right-click or long-press to place it in the world.

---

## 3. Open the editor

Long-press or right-click the NPC while you are operator.
Fill in Name, Dialogue, and Buttons.

---

## 4. Tag the NPC

Tags let you target a specific NPC in commands without guessing coordinates.

```
/tag @e[type=npc,r=2] add your_tag_name
```

Run this while standing next to the NPC (within 2 blocks).

---

## 5. Use the tag in commands

```
/dialogue open @e[tag=your_tag_name] @p scene_name
/dialogue change @e[tag=your_tag_name] scene_name
```

---

## Tag naming convention used in this project

| NPC | Tag |
|---|---|
| Cultista | `cultista` |
| Mr Francesco | `shop` |

---

## Useful checks

```bash
# List all tags on nearby NPCs
/tag @e[type=npc,r=5] list

# Remove a tag
/tag @e[tag=old_tag] remove old_tag
```
