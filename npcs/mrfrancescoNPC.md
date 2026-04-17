# Mr Francesco - Negozio

**Ruolo:** Vende oggetti base in cambio di lingotti d'oro.

---

## Step 1 - Copia il behavior pack

Copia la cartella `behavior_pack/` del repo in:
```
C:\Users\[tuonome]\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_behavior_packs\
```

Se hai gia' fatto questo per Cultista, salta questo step.

---

## Step 2 - Attiva il pack nel mondo

Se hai gia' fatto questo per Cultista, salta questo step.

---

## Step 3 - Spawna l'NPC

```
/give @s spawn_egg 1 51
```

Piazzalo dentro il negozio.

---

## Step 4 - Tagga l'NPC

```
/tag @e[type=npc,r=2] add shop
```

---

## Step 5 - Aggancia il dialogo JSON

```
/dialogue open @e[tag=shop] @p shop_main
```

Da questo momento dialogo, bottoni e annunci acquisti sono tutti gestiti dal JSON.

---

## Listino prezzi (riferimento)

| Articolo | Prezzo |
|---|---|
| Pane x8 | 2 oro |
| Torce x16 | 1 oro |
| Spada di ferro | 4 oro |
| Piccone di ferro | 4 oro |
| Semi x16 | 1 oro |

Pagamento con sistema fiduciario - metti un baule vicino a Mr Francesco con un cartello "Paga qui prima".

---

## Listino da mettere in gioco

Metti un cartello o libro su leggio vicino al negozio:

```
=== NEGOZIO DI MR FRANCESCO ===
  Paga nel baule prima.

  Pane x8          - 2 oro
  Torce x16        - 1 oro
  Spada di ferro   - 4 oro
  Piccone di ferro - 4 oro
  Semi x16         - 1 oro

  "Niente rimborsi."
       - Mr Francesco
```

---

## Proteggi Mr Francesco

Mettilo dentro uno stallo con bancone e vetro davanti.

```
/gamemode adventure @a
```

---

## Checklist

- [ ] Behavior pack copiato e attivato
- [ ] NPC spawnato e taggato con `shop`
- [ ] `/dialogue open` eseguito
- [ ] Baule pagamento posizionato con cartello
- [ ] Listino prezzi posizionato
- [ ] Area protetta
- [ ] Testato come giocatore non-operator

---

*Mr Francesco - Minecraft Bedrock Edition v26.10+*
