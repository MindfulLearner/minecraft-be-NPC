# Mr Francesco - Shop NPC Guide

> Vanilla Bedrock Edition - no mods or add-ons required  
> Designed for a **fresh server, day-1 players**

---

## Character Identity

| Field | Value |
|---|---|
| **NPC Name** | `Mr Francesco` |
| **Role** | Shopkeeper |
| **Vibe** | Fancy Italian merchant, slightly dramatic, takes his shop very seriously |
| **Skin** | Default NPC skin - pick the one with the nicest outfit |

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
Mr Francesco
```

---

## Step 4 - Paste the Dialogue

Copy and paste this into the **Dialogue** field:

```
Ah, benvenuto.
I am Mr Francesco. I sell only
the finest goods at very reasonable
prices. Pay first. No refunds.
```

> Tip: Keep dialogue under ~200 characters or it may get cut off on mobile screens.

---

## Step 5 - Set Up the Buttons

You have **6 button slots**. Payment is **honor system** - place a chest next to Mr Francesco and tell players to drop their gold ingots in it before clicking a button.

---

### Button 1 - Bread

**Label to paste:**
```
Bread x8 - 2 gold
```

**Command to paste:**
```
/give @initiator bread 8
```

**What this is:**
> Basic food for new players still getting set up.  
> 2 gold ingots is cheap - meant to be accessible day 1.

---

### Button 2 - Torches

**Label to paste:**
```
Torches x16 - 1 gold
```

**Command to paste:**
```
/give @initiator torch 16
```

**What this is:**
> Essential for caves. Cheapest item in the shop.

---

### Button 3 - Iron Sword

**Label to paste:**
```
Iron Sword - 4 gold
```

**Command to paste:**
```
/give @initiator iron_sword 1
```

**What this is:**
> For players who haven't found iron yet or want to skip the grind early on.

---

### Button 4 - Iron Pickaxe

**Label to paste:**
```
Iron Pickaxe - 4 gold
```

**Command to paste:**
```
/give @initiator iron_pickaxe 1
```

**What this is:**
> Same as above - lets players get started faster.

---

### Button 5 - Seeds

**Label to paste:**
```
Seeds x16 - 1 gold
```

**Command to paste:**
```
/give @initiator wheat_seeds 16
```

**What this is:**
> For players who want to start a farm immediately without searching for grass drops.

---

### Button 6 - Mr Francesco's Announcement

**Label to paste:**
```
[!] Who is Mr Francesco?
```

**Command to paste:**
```
/say [Mr Francesco] Ah, a new customer. How delightful. My shop is open for business.
```

**What this does:**
> Broadcasts a server-wide announcement. Lets the host know someone is at the shop, and adds personality. No item reward.

---

## Full Button Summary (Quick Reference)

| Slot | Label | Command | Cost |
|---|---|---|---|
| 1 | `Bread x8 - 2 gold` | `/give @initiator bread 8` | 2 gold ingots |
| 2 | `Torches x16 - 1 gold` | `/give @initiator torch 16` | 1 gold ingot |
| 3 | `Iron Sword - 4 gold` | `/give @initiator iron_sword 1` | 4 gold ingots |
| 4 | `Iron Pickaxe - 4 gold` | `/give @initiator iron_pickaxe 1` | 4 gold ingots |
| 5 | `Seeds x16 - 1 gold` | `/give @initiator wheat_seeds 16` | 1 gold ingot |
| 6 | `[!] Who is Mr Francesco?` | `/say [Mr Francesco] Ah, a new customer...` | Free |

---

## Optional: Add a Price List Next to Mr Francesco

Place a **Lectern with a Book & Quill** or **Signs** nearby.  
Use this text:

```
=== MR FRANCESCO'S SHOP ===
  Payment: Gold ingots in chest first.

  Bread x8        - 2 gold
  Torches x16     - 1 gold
  Iron Sword      - 4 gold
  Iron Pickaxe    - 4 gold
  Seeds x16       - 1 gold

  "No refunds. No exceptions."
       - Mr Francesco
```

---

## Protecting Mr Francesco

Put him inside a small **shop stall** (fenced counter, glass front).  
Nobody should be able to reach or hit him:

```
/gamemode adventure @a
```

Or just box him in stone/glass with a 1-block gap players interact through.

---

## Host Checklist

- [ ] Spawn the NPC with `/give @s spawn_egg 1 51`
- [ ] Paste the **Name**: `Mr Francesco`
- [ ] Paste the **Dialogue** (4 lines above)
- [ ] Add all **6 buttons** with labels and commands from the table
- [ ] Place a **chest next to him** labeled "Payment Here" with a sign
- [ ] Place a **Price List** sign or lectern nearby
- [ ] Protect the area (stall, glass, or adventure mode)
- [ ] Test every button as a **non-operator player** to confirm items arrive
- [ ] Announce to friends: `"Drop your gold ingots in the chest first, then click what you want from Mr Francesco"`

---

## Notes

- All rewards use `/give @initiator` - targets the exact player who clicked, safe for multiplayer.
- Payment is **honor-based** - friends server, trust is assumed. For bigger items later, verify manually.
- These are **Tier 1 items only**. Expand the shop once your friends have iron/diamond gear (see `npc-ideas.md` for Tier 2 and 3 ideas).
- The `shop.json` scene file in `behavior_pack/dialogue/` mirrors this setup - use it if you ever move to a behavior pack approach.

---

*Mr Francesco - built for Minecraft Bedrock Edition v26.10+*
