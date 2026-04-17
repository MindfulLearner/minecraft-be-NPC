# [NPC NAME] - [ROLE] Guide

> Vanilla Bedrock Edition - no mods or add-ons required

---

## Character Identity

| Field | Value |
|---|---|
| **NPC Name** | `[NAME]` |
| **Role** | [Shopkeeper / Quest Giver / Other] |
| **Vibe** | [Describe personality] |
| **Skin** | [Which default NPC skin to use] |

---

## Spawn and Tag

```
/give @s spawn_egg 1 51
```

After placing, tag the NPC:

```
/tag @e[type=npc,r=2] add [tag_name]
```

---

## Name Field

```
[NAME]
```

---

## Dialogue Field

```
[Line 1]
[Line 2]
[Line 3 - keep under ~200 chars total]
```

---

## Buttons

### Button 1 - [NAME]

**Label:**
```
[Button label text]
```

**Command:**
```
/give @initiator [item] [amount]
```

**Notes:**
> [What this button does / quest description / price]

---

### Button 2 - [NAME]

**Label:**
```
[Button label text]
```

**Command:**
```
/give @initiator [item] [amount]
```

**Notes:**
> [What this button does]

---

### Button 3 - [NAME]

**Label:**
```
[Button label text]
```

**Command:**
```
/give @initiator [item] [amount]
```

**Notes:**
> [What this button does]

---

### Button 4 - [NAME]

**Label:**
```
[Button label text]
```

**Command:**
```
/give @initiator [item] [amount]
```

**Notes:**
> [What this button does]

---

### Button 5 - [NAME]

**Label:**
```
[Button label text]
```

**Command:**
```
/give @initiator [item] [amount]
```

**Notes:**
> [What this button does]

---

### Button 6 - [NAME]

**Label:**
```
[Button label text]
```

**Command:**
```
/give @initiator [item] [amount]
```

**Notes:**
> [What this button does]

---

## Quick Reference

| Slot | Label | Command | Notes |
|---|---|---|---|
| 1 | `` | `` | |
| 2 | `` | `` | |
| 3 | `` | `` | |
| 4 | `` | `` | |
| 5 | `` | `` | |
| 6 | `` | `` | |

---

## Protection

```
/gamemode adventure @a
```

Or place inside a glass/stone structure players cannot break.

---

## Host Checklist

- [ ] Spawn the NPC
- [ ] Tag it: `/tag @e[type=npc,r=2] add [tag_name]`
- [ ] Paste the Name
- [ ] Paste the Dialogue
- [ ] Add all buttons
- [ ] Protect the area
- [ ] Test as non-operator player

---

*[NPC NAME] - Minecraft Bedrock Edition v26.10+*
