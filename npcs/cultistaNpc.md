# Cultista - Quest Giver

**Ruolo:** Darà missioni ai giocatori in cambio di lingotti d'oro.

---

## Step 1 - Copia il behavior pack

Copia la cartella `behavior_pack/` del repo in:
```
C:\Users\[tuonome]\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_behavior_packs\
```

---

## Step 2 - Attiva il pack nel mondo

1. Apri Minecraft
2. Modifica il tuo mondo - **Behavior Packs**
3. Trova `NPC Server Pack` e attivalo

---

## Step 3 - Setup scoreboard (una volta sola)

```
/scoreboard objectives add quest_punti dummy "Punti Quest"
/scoreboard objectives setdisplay sidebar quest_punti
```

Mostra la classifica quest sul lato destro dello schermo per tutti.

---

## Step 4 - Spawna l'NPC

```
/give @s spawn_egg 1 51
```

Piazzalo dove vuoi.

---

## Step 5 - Tagga l'NPC

Stai vicino a lui (entro 2 blocchi):
```
/tag @e[type=npc,r=2] add cultista
```

---

## Step 6 - Aggancia il dialogo JSON

```
/dialogue open @e[tag=cultista] @p cultista_main
```

Da questo momento dialogo, bottoni, annunci e scoreboard sono tutti gestiti dal JSON. Non devi configurare niente a mano.

---

## Missioni (riferimento)

| Missione | Obiettivo | Reward |
|---|---|---|
| Il Taglialegna | Taglia 32 tronchi di quercia | 3 oro |
| Commissione delle Ossa | Uccidi 10 scheletri | 4 oro |
| Sfama il Culto | Raccogli 16 pani | 3 oro |
| Nel Buio | Raggiungi Y=30 sottoterra | 4 oro |
| La Minaccia Verde | Uccidi 5 creeper | 3 oro |

Verifica completamento a mano - chiedi screenshot o mostra inventario. E' un server di amici, ci si fida.

---

## Bacheca (opzionale)

Metti un cartello o un libro su leggio vicino a Cultista:

```
=== LE PROVE DI CULTISTA ===

[1] Il Taglialegna
    Taglia 32 tronchi di quercia

[2] Commissione delle Ossa
    Uccidi 10 scheletri

[3] Sfama il Culto
    Raccogli 16 pani

[4] Nel Buio
    Raggiungi Y=30 sottoterra

[5] La Minaccia Verde
    Uccidi 5 creeper

Completa tutte e 5 per sbloccare
le missioni di livello 2 (presto).
```

---

## Proteggi l'NPC

```
/gamemode adventure @a
```

Oppure mettila dentro una struttura in vetro o pietra senza porta.

---

## Checklist

- [ ] Behavior pack copiato e attivato
- [ ] Scoreboard creato
- [ ] NPC spawnato e taggato con `cultista`
- [ ] `/dialogue open` eseguito
- [ ] Bacheca posizionata
- [ ] Area protetta
- [ ] Testato come giocatore non-operator

---

*Cultista - Minecraft Bedrock Edition v26.10+*
