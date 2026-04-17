import { world, system } from "@minecraft/server";

// ── SHOP ──────────────────────────────────────────────────────────────────────

const SHOP = {
    cat_spawn_egg: { name: "Uovo di gatto",  price: 8,  amount: 1 },
    saddle:        { name: "Sella",          price: 6,  amount: 1 },
    name_tag:      { name: "Cartellino",     price: 5,  amount: 1 },
    sponge:        { name: "Spugna",         price: 7,  amount: 1 },
    ender_pearl:   { name: "Perle End",      price: 4,  amount: 2 },
};

const SELL = {
    oak_log:    { name: "Quercia x32",   amount: 32, reward: 1 },
    cobblestone:{ name: "Ciottoli x64",  amount: 64, reward: 1 },
    wheat:      { name: "Grano x32",     amount: 32, reward: 1 },
    iron_ingot: { name: "Ferro x8",      amount: 8,  reward: 2 },
};

// ── QUESTS ────────────────────────────────────────────────────────────────────

const QUESTS = {
    // Cultista
    taglialegna: { name: "Il Taglialegna",         reward: 3, npc: "Cultista" },
    ossa:        { name: "Commissione delle Ossa",  reward: 4, npc: "Cultista" },
    sfama:       { name: "Sfama il Culto",          reward: 3, npc: "Cultista" },
    buio:        { name: "Nel Buio",                reward: 4, npc: "Cultista" },
    creeper:     { name: "La Minaccia Verde",       reward: 3, npc: "Cultista" },
    // Pescatore
    piero_pesce:    { name: "Il Primo Sgarro",    reward: 3, npc: "Old Piero" },
    piero_salmone:  { name: "Sapori Amari",       reward: 4, npc: "Old Piero" },
    piero_tropicale:{ name: "La Vendetta Inizia", reward: 5, npc: "Old Piero" },
    // Cacciatrice
    elena_zombie:    { name: "La Prima Prova",   reward: 3, npc: "Elena" },
    elena_scheletri: { name: "Ossa di Ferro",    reward: 4, npc: "Elena" },
    elena_vacche:    { name: "Per il Villaggio", reward: 3, npc: "Elena" },
    elena_polli:     { name: "Cena Garantita",   reward: 2, npc: "Elena" },
    // Costruttore
    marco_ciottoli: { name: "Fondamenta Solide", reward: 3, npc: "Marco" },
    marco_quercia:  { name: "Travi di Quercia",  reward: 3, npc: "Marco" },
    marco_carbone:  { name: "Luci per Tutti",    reward: 2, npc: "Marco" },
    marco_ghiaia:   { name: "Lastricato",        reward: 2, npc: "Marco" },
    // Decoratrice
    sofia_fiori:     { name: "Giardino in Fiore", reward: 2, npc: "Sofia" },
    sofia_lana:      { name: "Calore e Colore",   reward: 3, npc: "Sofia" },
    sofia_colorante: { name: "La Tavolozza",      reward: 3, npc: "Sofia" },
    sofia_bamboo:    { name: "Angolo Verde",       reward: 2, npc: "Sofia" },
};

// Kill-tracked quests: quest key → scoreboard objective ID
const SCORE_OBJ = {
    taglialegna:     "q_taglialegna",
    ossa:            "q_ossa",
    creeper:         "q_creeper",
    elena_zombie:    "q_el_zombie",
    elena_scheletri: "q_el_scheletri",
    elena_vacche:    "q_el_vacche",
    elena_polli:     "q_el_polli",
};

// ── ITEM LISTS (multi-type inventory quests) ──────────────────────────────────

const FLOWER_IDS = [
    "minecraft:dandelion", "minecraft:poppy", "minecraft:blue_orchid",
    "minecraft:allium", "minecraft:azure_bluet", "minecraft:oxeye_daisy",
    "minecraft:cornflower", "minecraft:lily_of_the_valley",
    "minecraft:sunflower", "minecraft:lilac", "minecraft:rose_bush", "minecraft:peony",
];

const WOOL_IDS = [
    "minecraft:orange_wool", "minecraft:magenta_wool", "minecraft:light_blue_wool",
    "minecraft:yellow_wool", "minecraft:lime_wool", "minecraft:pink_wool",
    "minecraft:gray_wool", "minecraft:light_gray_wool", "minecraft:cyan_wool",
    "minecraft:purple_wool", "minecraft:blue_wool", "minecraft:brown_wool",
    "minecraft:green_wool", "minecraft:red_wool", "minecraft:black_wool",
];

const DYE_IDS = [
    "minecraft:white_dye", "minecraft:orange_dye", "minecraft:magenta_dye",
    "minecraft:light_blue_dye", "minecraft:yellow_dye", "minecraft:lime_dye",
    "minecraft:pink_dye", "minecraft:gray_dye", "minecraft:light_gray_dye",
    "minecraft:cyan_dye", "minecraft:purple_dye", "minecraft:blue_dye",
    "minecraft:brown_dye", "minecraft:green_dye", "minecraft:red_dye", "minecraft:black_dye",
];

// ── FLAVOUR ───────────────────────────────────────────────────────────────────

const FRASI_DEL_GIORNO = [
    "Oggi è un buon giorno per non morire.",
    "Josh guarda. Josh sa. Josh giudica.",
    "I creeper sono amici. I creeper ti vogliono bene. I creeper mentono.",
    "Il culto non dorme. Voi sì. Shame.",
    "Ogni albero tagliato è un passo verso la gloria.",
    "Non fidarti dei mob. Non fidarti degli amici. Fidati solo di Josh.",
    "La notte è lunga. Tu sei piccolo. Buona fortuna.",
    "Qualcuno ha aperto una chest che non era sua. Sai chi sei.",
    "Il Nether aspetta. Il Nether è paziente.",
    "Oggi potresti fare qualcosa di epico. O morire. Probabilmente morire.",
    "Lo scheletro che ti ha ucciso ieri ti saluta.",
    "Minare è meditazione. La TNT è arte.",
    "Un villager da qualche parte ti guarda con rispetto.",
    "Non tutte le grotte hanno un drago. Ma quella sì.",
    "Oggi il server gira liscio. Non rovinarlo.",
];

const HAPPY_HOURS = [
    { start: 10, end: 12 },
    { start: 15, end: 17 },
    { start: 20, end: 22 },
    { start:  0, end:  2 },
];

function isHappyHour() {
    const h = new Date().getHours();
    return HAPPY_HOURS.some(({ start, end }) =>
        end > start ? h >= start && h < end : h >= start || h < end
    );
}

let happyHourActive = false;

// ── INIT ──────────────────────────────────────────────────────────────────────

system.run(() => {
    for (const id of Object.values(SCORE_OBJ)) {
        try { world.scoreboard.addObjective(id, id); } catch {}
    }
    try { world.scoreboard.addObjective("quest_punti", "§eQuest Completate"); } catch {}
    try {
        world.scoreboard.setDisplayAtDisplaySlot("sidebar", {
            objective: world.scoreboard.getObjective("quest_punti")
        });
    } catch {}
    world.getDimension("overworld").runCommand("scoreboard objectives setdisplay sidebar quest_punti");
});

// ── EVENTS ────────────────────────────────────────────────────────────────────

world.afterEvents.playerSpawn.subscribe((ev) => {
    if (!ev.initialSpawn) return;
    const online = world.getAllPlayers().length;
    world.sendMessage(`§a[Server] §f${ev.player.name} è entrato. §7(${online} online)`);
    if (online === 1) ev.player.sendMessage("§7Sei solo. Il server è tuo.");
    const frase = FRASI_DEL_GIORNO[Math.floor(Date.now() / 86400000) % FRASI_DEL_GIORNO.length];
    ev.player.sendMessage(`§7[Frase del giorno] §f${frase}`);
});

system.runInterval(() => {
    const active = isHappyHour();
    if (active && !happyHourActive) {
        happyHourActive = true;
        world.sendMessage("§6[Ora Felice] §fXP doppio attivo! Uccidi mob per bonus XP.");
    } else if (!active && happyHourActive) {
        happyHourActive = false;
        world.sendMessage("§7[Ora Felice] §fFinita. Alla prossima!");
    }
}, 200);

// Track: Taglialegna (32 oak_log)
world.afterEvents.playerBreakBlock.subscribe((ev) => {
    const { player, brokenBlockPermutation } = ev;
    if (!player.hasTag("q_taglialegna") || brokenBlockPermutation.type.id !== "minecraft:oak_log") return;
    const obj = world.scoreboard.getObjective("q_taglialegna");
    const n = getScore(obj, player) + 1;
    if (n > 32) return;
    obj.setScore(player, n);
    player.sendMessage(n >= 32
        ? "§5[Cultista] 32 tronchi tagliati. Torna da me."
        : `§7[Quest] Tronchi: ${n}/32`
    );
});

// Track: kill quests (Cultista + Elena)
world.afterEvents.entityDie.subscribe((ev) => {
    const killer = ev.damageSource.damagingEntity;
    if (!killer || killer.typeId !== "minecraft:player") return;
    const player = killer;
    const dead = ev.deadEntity.typeId;

    if (happyHourActive && dead.startsWith("minecraft:")) {
        player.runCommand("xp 10");
    }

    trackKill(player, dead, "minecraft:skeleton", "q_ossa",         10, "§5[Cultista]", "Scheletri");
    trackKill(player, dead, "minecraft:creeper",  "q_creeper",       5, "§5[Cultista]", "Creeper");
    trackKill(player, dead, "minecraft:zombie",   "q_el_zombie",     8, "§6[Elena]",    "Zombie");
    trackKill(player, dead, "minecraft:skeleton", "q_el_scheletri", 10, "§6[Elena]",    "Scheletri");
    trackKill(player, dead, "minecraft:cow",      "q_el_vacche",     5, "§6[Elena]",    "Vacche");
    trackKill(player, dead, "minecraft:chicken",  "q_el_polli",      8, "§6[Elena]",    "Polli");
});

// Track: Nel Buio (Y ≤ 30)
system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        if (!player.hasTag("q_buio") || player.hasTag("q_buio_ready")) continue;
        if (player.location.y <= 30) {
            player.addTag("q_buio_ready");
            player.sendMessage("§5[Cultista] Sei sceso abbastanza. Torna da me.");
        }
    }
}, 40);

// ── SCRIPT EVENTS ─────────────────────────────────────────────────────────────

system.afterEvents.scriptEventReceive.subscribe((ev) => {
    const player = ev.initiator;
    if (!player || player.typeId !== "minecraft:player") return;
    const msg = ev.message.trim();
    const action = ev.id.split(":")[1];

    if      (action === "accept")  acceptQuest(player, msg);
    else if (action === "deliver") deliverQuest(player, msg);
    else if (ev.id === "shop:buy") buyItem(player, msg);
    else if (ev.id === "shop:sell") sellItem(player, msg);
}, { namespaces: ["cultista", "shop", "pescatore", "cacciatrice", "costruttore", "decoratrice"] });

// ── SHOP LOGIC ────────────────────────────────────────────────────────────────

function buyItem(player, itemId) {
    const item = SHOP[itemId];
    if (!item) return;
    const nuggets = countItem(player, "minecraft:gold_nugget");
    if (nuggets < item.price) {
        player.sendMessage(`§c[Francesco] Non hai abbastanza pepite. Servono ${item.price}, ne hai ${nuggets}.`);
        return;
    }
    player.runCommand(`clear @s gold_nugget 0 ${item.price}`);
    player.runCommand(`give @s ${itemId} ${item.amount}`);
    world.sendMessage(`§6[Francesco] §f${player.name} ha comprato: §e${item.name}§f. -${item.price} pepite.`);
}

function sellItem(player, itemId) {
    const item = SELL[itemId];
    if (!item) return;
    const count = countItem(player, `minecraft:${itemId}`);
    if (count < item.amount) {
        player.sendMessage(`§c[Francesco] Non hai abbastanza. Servono ${item.amount} ${item.name.split(" x")[0]}, ne hai ${count}.`);
        return;
    }
    player.runCommand(`clear @s ${itemId} 0 ${item.amount}`);
    player.runCommand(`give @s gold_nugget ${item.reward}`);
    player.sendMessage(`§6[Francesco] §fVenduto: §e${item.name}§f. +${item.reward} pepite.`);
}

// ── QUEST LOGIC ───────────────────────────────────────────────────────────────

function acceptQuest(player, quest) {
    if (!QUESTS[quest]) return;
    if (player.hasTag(`q_${quest}_done`)) {
        player.sendMessage("§7Hai già completato questa missione.");
        return;
    }
    if (player.hasTag(`q_${quest}`)) {
        player.sendMessage("§cHai già questa missione attiva.");
        return;
    }
    player.addTag(`q_${quest}`);
    if (SCORE_OBJ[quest]) world.scoreboard.getObjective(SCORE_OBJ[quest]).setScore(player, 0);
    player.sendMessage(`§e[${QUESTS[quest].npc}] §fMissione accettata: §e${QUESTS[quest].name}§f. Buona fortuna.`);
}

function deliverQuest(player, quest) {
    if (!QUESTS[quest]) return;
    if (!player.hasTag(`q_${quest}`)) {
        player.sendMessage("§cNon hai questa missione attiva.");
        return;
    }
    const progress = getQuestProgress(player, quest);
    if (!progress.done) {
        player.sendMessage(`§cNon hai ancora finito. ${progress.text}`);
        return;
    }

    // Remove quest state
    player.removeTag(`q_${quest}`);
    player.addTag(`q_${quest}_done`);
    if (SCORE_OBJ[quest]) world.scoreboard.getObjective(SCORE_OBJ[quest]).setScore(player, 0);
    if (quest === "buio") player.removeTag("q_buio_ready");

    // Consume items for delivery quests
    if (quest === "sfama")           player.runCommand("clear @s bread 0 16");
    if (quest === "piero_pesce")     player.runCommand("clear @s cod 0 10");
    if (quest === "piero_salmone")   player.runCommand("clear @s salmon 0 8");
    if (quest === "piero_tropicale") player.runCommand("clear @s tropical_fish 0 6");
    if (quest === "marco_ciottoli")  player.runCommand("clear @s cobblestone 0 64");
    if (quest === "marco_quercia")   player.runCommand("clear @s oak_log 0 32");
    if (quest === "marco_carbone")   player.runCommand("clear @s coal 0 16");
    if (quest === "marco_ghiaia")    player.runCommand("clear @s gravel 0 32");
    if (quest === "sofia_fiori")     clearItems(player, FLOWER_IDS, 16);
    if (quest === "sofia_lana")      clearItems(player, WOOL_IDS, 8);
    if (quest === "sofia_colorante") clearItems(player, DYE_IDS, 6);
    if (quest === "sofia_bamboo")    player.runCommand("clear @s bamboo 0 16");

    // Reward
    const gold = QUESTS[quest].reward;
    player.runCommand(`give @s gold_nugget ${gold}`);

    const punti = world.scoreboard.getObjective("quest_punti");
    punti.setScore(player, getScore(punti, player) + 1);

    world.sendMessage(`§e[${QUESTS[quest].npc}] §f${player.name} ha completato: §e${QUESTS[quest].name}§f! +${gold} pepite.`);
}

function getQuestProgress(player, quest) {
    switch (quest) {
        // Cultista
        case "taglialegna": { const n = getScore(world.scoreboard.getObjective("q_taglialegna"), player); return { done: n >= 32, text: `Tronchi: ${n}/32` }; }
        case "ossa":        { const n = getScore(world.scoreboard.getObjective("q_ossa"), player);        return { done: n >= 10, text: `Scheletri: ${n}/10` }; }
        case "creeper":     { const n = getScore(world.scoreboard.getObjective("q_creeper"), player);     return { done: n >= 5,  text: `Creeper: ${n}/5` }; }
        case "sfama":       { const n = countItem(player, "minecraft:bread");                             return { done: n >= 16, text: `Pane: ${n}/16` }; }
        case "buio":        return { done: player.hasTag("q_buio_ready"), text: "Devi scendere a Y≤30." };
        // Pescatore
        case "piero_pesce":     { const n = countItem(player, "minecraft:cod");            return { done: n >= 10, text: `Merluzzi: ${n}/10` }; }
        case "piero_salmone":   { const n = countItem(player, "minecraft:salmon");         return { done: n >= 8,  text: `Salmoni: ${n}/8` }; }
        case "piero_tropicale": { const n = countItem(player, "minecraft:tropical_fish");  return { done: n >= 6,  text: `Tropicali: ${n}/6` }; }
        // Cacciatrice
        case "elena_zombie":    { const n = getScore(world.scoreboard.getObjective("q_el_zombie"),     player); return { done: n >= 8,  text: `Zombie: ${n}/8` }; }
        case "elena_scheletri": { const n = getScore(world.scoreboard.getObjective("q_el_scheletri"), player); return { done: n >= 10, text: `Scheletri: ${n}/10` }; }
        case "elena_vacche":    { const n = getScore(world.scoreboard.getObjective("q_el_vacche"),    player); return { done: n >= 5,  text: `Vacche: ${n}/5` }; }
        case "elena_polli":     { const n = getScore(world.scoreboard.getObjective("q_el_polli"),     player); return { done: n >= 8,  text: `Polli: ${n}/8` }; }
        // Costruttore
        case "marco_ciottoli": { const n = countItem(player, "minecraft:cobblestone"); return { done: n >= 64, text: `Ciottoli: ${n}/64` }; }
        case "marco_quercia":  { const n = countItem(player, "minecraft:oak_log");     return { done: n >= 32, text: `Tronchi: ${n}/32` }; }
        case "marco_carbone":  { const n = countItem(player, "minecraft:coal");        return { done: n >= 16, text: `Carbone: ${n}/16` }; }
        case "marco_ghiaia":   { const n = countItem(player, "minecraft:gravel");      return { done: n >= 32, text: `Ghiaia: ${n}/32` }; }
        // Decoratrice
        case "sofia_fiori":     { const n = countItems(player, FLOWER_IDS); return { done: n >= 16, text: `Fiori: ${n}/16` }; }
        case "sofia_lana":      { const n = countItems(player, WOOL_IDS);   return { done: n >= 8,  text: `Lana: ${n}/8` }; }
        case "sofia_colorante": { const n = countItems(player, DYE_IDS);    return { done: n >= 6,  text: `Colorante: ${n}/6` }; }
        case "sofia_bamboo":    { const n = countItem(player, "minecraft:bamboo"); return { done: n >= 16, text: `Bambù: ${n}/16` }; }
    }
    return { done: false, text: "" };
}

// ── HOME COMMANDS ─────────────────────────────────────────────────────────────

world.beforeEvents.chatSend.subscribe((ev) => {
    const msg = ev.message.trim();
    const player = ev.sender;

    if (msg === "/sethome") {
        ev.cancel = true;
        const loc = player.location;
        player.setDynamicProperty("home_x", loc.x);
        player.setDynamicProperty("home_y", loc.y);
        player.setDynamicProperty("home_z", loc.z);
        player.setDynamicProperty("home_dim", player.dimension.id);
        player.sendMessage("§a[Home] Posizione salvata!");

    } else if (msg === "/home") {
        ev.cancel = true;
        const x = player.getDynamicProperty("home_x");
        const y = player.getDynamicProperty("home_y");
        const z = player.getDynamicProperty("home_z");
        const dim = player.getDynamicProperty("home_dim") ?? "minecraft:overworld";
        if (x === undefined) {
            player.sendMessage("§c[Home] Nessuna home impostata. Usa /sethome prima.");
            return;
        }
        system.run(() => {
            player.teleport({ x, y, z }, { dimension: world.getDimension(dim) });
            player.sendMessage("§a[Home] Teletrasportato!");
        });
    }
});

// ── HELPERS ───────────────────────────────────────────────────────────────────

function trackKill(player, dead, mobType, scoreKey, goal, prefix, label) {
    if (dead !== mobType) return;
    const questKey = Object.keys(SCORE_OBJ).find(k => SCORE_OBJ[k] === scoreKey);
    if (!questKey || !player.hasTag(`q_${questKey}`)) return;
    const obj = world.scoreboard.getObjective(scoreKey);
    const n = getScore(obj, player) + 1;
    if (n > goal) return;
    obj.setScore(player, n);
    player.sendMessage(n >= goal
        ? `${prefix} ${goal} ${label} eliminati. Torna da me.`
        : `§7[Quest] ${label}: ${n}/${goal}`
    );
}

function countItem(player, typeId) {
    const inv = player.getComponent("minecraft:inventory");
    if (!inv) return 0;
    let total = 0;
    for (let i = 0; i < inv.container.size; i++) {
        const item = inv.container.getItem(i);
        if (item?.typeId === typeId) total += item.amount;
    }
    return total;
}

function countItems(player, typeIds) {
    return typeIds.reduce((sum, id) => sum + countItem(player, id), 0);
}

function clearItems(player, typeIds, totalNeeded) {
    let remaining = totalNeeded;
    for (const id of typeIds) {
        if (remaining <= 0) break;
        const count = countItem(player, id);
        if (count <= 0) continue;
        const toClear = Math.min(count, remaining);
        player.runCommand(`clear @s ${id.replace("minecraft:", "")} 0 ${toClear}`);
        remaining -= toClear;
    }
}

function getScore(objective, entity) {
    try { return objective.getScore(entity) ?? 0; }
    catch { return 0; }
}
