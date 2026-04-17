# Mr Francesco - Negozio

**Ruolo:** Vende oggetti rari in cambio di pepite d'oro. Acquista anche risorse dai giocatori.

> Fa parte del pack `anpccustombeh`, condiviso con Cultista, Old Piero, Elena, Marco e Sofia.

---

## Setup (una volta sola)

### 1. Copia il behavior pack

```
npcs/anpccustombeh/  →  C:\Users\[tuonome]\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_behavior_packs\
```

Se hai già fatto il setup per Cultista, salta.

### 2. Registra il pack nel mondo (OBBLIGATORIO)

File: `...\minecraftWorlds\[tuomondo]\world_behavior_packs.json`

```json
[
    {
        "pack_id": "6f3d9a1c-4b8e-4f2a-9c7d-1e5b3a8f0d2e",
        "version": [1, 0, 0]
    }
]
```

### 3. Spawna e tagga l'NPC

```
/give @s spawn_egg 1 51
/tag @e[type=npc,r=2] add mrfrancesco
```

### 4. Imposta la scena di default

```
/dialogue change @e[tag=mrfrancesco] shop_main
```

---

## Listino prezzi (acquisto)

| Articolo | Prezzo |
|---|---|
| Uovo di gatto | 8 pepite |
| Sella | 6 pepite |
| Cartellino nome | 5 pepite |
| Spugna | 7 pepite |
| Perle End x2 | 4 pepite |

## Listino vendita (giocatore → Francesco)

| Articolo | Reward |
|---|---|
| Quercia x32 | 1 pepita |
| Ciottoli x64 | 1 pepita |
| Grano x32 | 1 pepita |
| Ferro x8 | 2 pepite |

---

## Listino da mettere in gioco

```
=== NEGOZIO DI MR FRANCESCO ===

  ACQUISTA (pepite → oggetti)
  Uovo di gatto    - 8p
  Sella            - 6p
  Cartellino       - 5p
  Spugna           - 7p
  Perle End x2     - 4p

  VENDE (oggetti → pepite)
  Quercia x32      - 1p
  Ciottoli x64     - 1p
  Grano x32        - 1p
  Ferro x8         - 2p

  "Niente rimborsi."
       - Mr Francesco
```

---

## Note

- Il pagamento è verificato via script: se non hai le pepite, lo script blocca l'acquisto e avvisa.
- La vendita scala automaticamente gli oggetti dall'inventario.

---

## Proteggi Mr Francesco

Mettilo dentro uno stallo con vetro davanti.

---

## Checklist

- [ ] Behavior pack copiato e `world_behavior_packs.json` aggiornato
- [ ] NPC spawnato e taggato con `mrfrancesco`
- [ ] `/dialogue change @e[tag=mrfrancesco] shop_main` eseguito
- [ ] Listino prezzi posizionato vicino all'NPC
- [ ] Testato come giocatore non-operator

---

*Mr Francesco - Minecraft Bedrock Edition v26.10+*
