import { world, system, ItemStack, EnchantmentTypes } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";

// ── ITEM LISTS (multi-type inventory quests) ──────────────────────────────────
const STAINED_GLASS_IDS = [
    "minecraft:white_stained_glass", "minecraft:orange_stained_glass",
    "minecraft:magenta_stained_glass", "minecraft:light_blue_stained_glass",
    "minecraft:yellow_stained_glass", "minecraft:lime_stained_glass",
    "minecraft:pink_stained_glass", "minecraft:gray_stained_glass",
    "minecraft:light_gray_stained_glass", "minecraft:cyan_stained_glass",
    "minecraft:purple_stained_glass", "minecraft:blue_stained_glass",
    "minecraft:brown_stained_glass", "minecraft:green_stained_glass",
    "minecraft:red_stained_glass", "minecraft:black_stained_glass",
];
const CANDLE_IDS = [
    "minecraft:candle", "minecraft:white_candle", "minecraft:orange_candle",
    "minecraft:magenta_candle", "minecraft:light_blue_candle", "minecraft:yellow_candle",
    "minecraft:lime_candle", "minecraft:pink_candle", "minecraft:gray_candle",
    "minecraft:light_gray_candle", "minecraft:cyan_candle", "minecraft:purple_candle",
    "minecraft:blue_candle", "minecraft:brown_candle", "minecraft:green_candle",
    "minecraft:red_candle", "minecraft:black_candle",
];
const FLOWER_IDS = [
    "minecraft:dandelion", "minecraft:poppy", "minecraft:blue_orchid",
    "minecraft:allium", "minecraft:azure_bluet", "minecraft:oxeye_daisy",
    "minecraft:cornflower", "minecraft:lily_of_the_valley",
    "minecraft:red_tulip", "minecraft:orange_tulip", "minecraft:white_tulip", "minecraft:pink_tulip",
    "minecraft:sunflower", "minecraft:lilac", "minecraft:rose_bush", "minecraft:peony",
];
const WOOL_IDS = [
    "minecraft:white_wool", "minecraft:orange_wool", "minecraft:magenta_wool",
    "minecraft:light_blue_wool", "minecraft:yellow_wool", "minecraft:lime_wool",
    "minecraft:pink_wool", "minecraft:gray_wool", "minecraft:light_gray_wool",
    "minecraft:cyan_wool", "minecraft:purple_wool", "minecraft:blue_wool",
    "minecraft:brown_wool", "minecraft:green_wool", "minecraft:red_wool",
    "minecraft:black_wool",
];
const DYE_IDS = [
    "minecraft:white_dye", "minecraft:orange_dye", "minecraft:magenta_dye",
    "minecraft:light_blue_dye", "minecraft:yellow_dye", "minecraft:lime_dye",
    "minecraft:pink_dye", "minecraft:gray_dye", "minecraft:light_gray_dye",
    "minecraft:cyan_dye", "minecraft:purple_dye", "minecraft:blue_dye",
    "minecraft:brown_dye", "minecraft:green_dye", "minecraft:red_dye", "minecraft:black_dye",
];

// ── SHOP ──────────────────────────────────────────────────────────────────────

const SHOP = {
    saddle:            { name: "Sella",             price: 14, amount: 1 },
    name_tag:          { name: "Cartellino",        price: 6,  amount: 1 },
    sponge:            { name: "Spugna",            price: 11, amount: 1 },
    ender_pearl:       { name: "Perle End",         price: 6,  amount: 2 },
    lead:              { name: "Guinzaglio",        price: 5,  amount: 1 },
    spyglass:          { name: "Cannocchiale",      price: 6,  amount: 1 },
    lodestone:         { name: "Magnetite",         price: 18, amount: 1 },
    recovery_compass:  { name: "Bussola Recupero",  price: 12, amount: 1 },
    shield:            { name: "Scudo",             price: 6,  amount: 1 },
    crossbow:          { name: "Balestra",          price: 10, amount: 1 },
    firework_rocket:   { name: "Razzi x3",          price: 4,  amount: 3 },
};

const SELL = {
    oak_log:    { name: "Quercia x64",   amount: 64, reward: 1 },
    wheat:      { name: "Grano x64",     amount: 64, reward: 1 },
    iron_ingot: { name: "Ferro x8",      amount: 8,  reward: 2 },
    stone:      { name: "Pietra x64",    amount: 64, reward: 1 },
    sand:       { name: "Sabbia x32",    amount: 32, reward: 1 },
    bone:       { name: "Ossa x16",      amount: 16, reward: 2 },
    string:     { name: "Filo x32",      amount: 32, reward: 1 },
};

// ── FABBRO ────────────────────────────────────────────────────────────────────

const SHOP_FABBRO = {
    netherite_scrap:      { name: "Rottame di Netherite",   price: 26, amount: 1 },
    diamond:              { name: "Diamante",               price: 24, amount: 1 },
    totem_of_undying:     { name: "Totem dell'Immortalità", price: 40, amount: 1 },
    sea_lantern:          { name: "Lanterna del Mare",      price: 12, amount: 1 },
    trident:              { name: "Tridente",               price: 30, amount: 1 },
    nether_star:          { name: "Stella del Nether",      price: 80, amount: 1 },
    wither_skeleton_skull:{ name: "Teschio Wither",         price: 22, amount: 1 },
    elytra:               { name: "Elytra",                 price: 700, amount: 1 },
    heart_of_the_sea:     { name: "Cuore dell'Oceano",      price: 45,  amount: 1 },
    netherite_ingot:      { name: "Lingotto Netherite",     price: 400, amount: 1 },
    iron_sword_fa1:       { typeId: "iron_sword", name: "§cSpada Infuocata I",  price: 18, amount: 1, enchants: { fire_aspect: 1 } },
    iron_sword_fa2:       { typeId: "iron_sword", name: "§4Spada Infuocata II", price: 28, amount: 1, enchants: { fire_aspect: 2 } },
};

const SELL_FABBRO = {
    ancient_debris: { name: "Detriti Antichi x1",  amount: 1,  reward: 9 },
    obsidian:       { name: "Ossidiana x32",        amount: 32, reward: 3 },
    prismarine:     { name: "Prismarina x32",       amount: 32, reward: 2 },
    iron_ingot:     { name: "Lingotti Ferro x16",   amount: 16, reward: 4 },
    gold_ingot:     { name: "Lingotti Oro x8",      amount: 8,  reward: 5 },
    raw_copper:     { name: "Rame Grezzo x32",      amount: 32, reward: 1 },
    quartz:         { name: "Quarzo x16",           amount: 16, reward: 2 },
};

// ── CONTADINA ─────────────────────────────────────────────────────────────────

const SHOP_CONTADINA = {
    golden_apple:            { name: "Mela Dorata",            price: 18,  amount: 1 },
    slimeball:               { name: "Pallina Slime x4",        price: 8,   amount: 4 },
    honey_bottle:            { name: "Miele x2",               price: 5,   amount: 2 },
    nether_wart:             { name: "Verruca Nether x4",      price: 5,   amount: 4 },
    golden_carrot:           { name: "Carota d'Oro x2",        price: 12,  amount: 2 },
    chorus_fruit:            { name: "Frutto del Coro x4",     price: 8,   amount: 4 },
    blaze_powder:            { name: "Polvere Blaze x4",       price: 8,   amount: 4 },
    enchanted_golden_apple:  { name: "Mela Dorata Incantata",  price: 90, amount: 1 },
    book_silk:     { typeId: "enchanted_book", name: "Libro: Seta I",             price: 28, amount: 1, enchants: { silk_touch: 1 } },
    book_luck_sea: { typeId: "enchanted_book", name: "Libro: Fort. del Mare III", price: 24, amount: 1, enchants: { luck_of_the_sea: 3 } },
    book_lure3:    { typeId: "enchanted_book", name: "Libro: Richiamo III",       price: 20, amount: 1, enchants: { lure: 3 } },
};

const SELL_CONTADINA = {
    sweet_berries:   { name: "Bacche Dolci x40",  amount: 40, reward: 1 },
    melon_slice:     { name: "Anguria x64",        amount: 64, reward: 1 },
    cactus:          { name: "Cactus x64",         amount: 64, reward: 1 },
    carrot:          { name: "Carote x40",         amount: 40, reward: 2 },
    potato:          { name: "Patate x40",         amount: 40, reward: 1 },
    pumpkin:         { name: "Zucca x32",          amount: 32, reward: 2 },
    bamboo:          { name: "Bambù x64",          amount: 64, reward: 1 },
    "cc:strawberry": { name: "Fragole x32",        amount: 32, reward: 2 },
    "cc:banana":     { name: "Banane x16",         amount: 16, reward: 2 },
    "cc:coconut":    { name: "Cocco x8",           amount: 8,  reward: 2 },
    "cc:lemon":      { name: "Limoni x32",         amount: 32, reward: 2 },
    "cc:orange":     { name: "Arance x32",         amount: 32, reward: 2 },
    "cc:grape":      { name: "Uva x32",            amount: 32, reward: 2 },
    "cc:pineapple":  { name: "Ananas x16",         amount: 16, reward: 3 },
};

// ── ALCHIMISTA ────────────────────────────────────────────────────────────────

const SHOP_ALCHIMISTA = {
    phantom_membrane:    { name: "Membrana Fantasma x2",      price: 14, amount: 2 },
    shulker_shell:       { name: "Guscio di Shulker",         price: 26, amount: 1 },
    dragon_breath:       { name: "Soffio del Drago",          price: 28, amount: 1 },
    nautilus_shell:      { name: "Conchiglia x2",             price: 9,  amount: 2 },
    popped_chorus_fruit: { name: "Frutto del Coro Cotto x4",  price: 7,  amount: 4 },
    end_rod:             { name: "Bastoni End x4",            price: 5,  amount: 4 },
    echo_shard:          { name: "Frammento Eco",             price: 14, amount: 1 },
    wither_rose:         { name: "Rosa del Wither",           price: 8,  amount: 1 },
    sculk_catalyst:      { name: "Catalizzatore Sculk",       price: 14, amount: 1 },
    ominous_bottle:      { name: "Bottiglia Infausta",        price: 10, amount: 1 },
    book_sharp3:      { typeId: "enchanted_book", name: "Libro: Affilatura III",    price: 22, amount: 1, enchants: { sharpness: 3 } },
    book_sharp5:      { typeId: "enchanted_book", name: "Libro: Affilatura V",     price: 45, amount: 1, enchants: { sharpness: 5 } },
    book_prot3:       { typeId: "enchanted_book", name: "Libro: Protezione III",   price: 22, amount: 1, enchants: { protection: 3 } },
    book_prot4:       { typeId: "enchanted_book", name: "Libro: Protezione IV",    price: 42, amount: 1, enchants: { protection: 4 } },
    book_eff3:        { typeId: "enchanted_book", name: "Libro: Efficienza III",   price: 20, amount: 1, enchants: { efficiency: 3 } },
    book_fa1:         { typeId: "enchanted_book", name: "Libro: Asp.Fuoco I",      price: 18, amount: 1, enchants: { fire_aspect: 1 } },
    book_fa2:         { typeId: "enchanted_book", name: "Libro: Asp.Fuoco II",     price: 35, amount: 1, enchants: { fire_aspect: 2 } },
    book_looting3:    { typeId: "enchanted_book", name: "Libro: Saccheggio III",   price: 40, amount: 1, enchants: { looting: 3 } },
    book_ff4:         { typeId: "enchanted_book", name: "Libro: Caduta Morbida IV",price: 22, amount: 1, enchants: { feather_falling: 4 } },
    book_power5:      { typeId: "enchanted_book", name: "Libro: Potere V",         price: 32, amount: 1, enchants: { power: 5 } },
    book_unbreaking3: { typeId: "enchanted_book", name: "Libro: Solidità III",     price: 28, amount: 1, enchants: { unbreaking: 3 } },
    book_mending:     { typeId: "enchanted_book", name: "Libro: Riparazione",      price: 80, amount: 1, enchants: { mending: 1 } },
};

const SELL_ALCHIMISTA = {
    magma_cream:          { name: "Crema di Magma x8",     amount: 8,  reward: 3 },
    fermented_spider_eye: { name: "Occhio Fermentato x4",  amount: 4,  reward: 3 },
    chorus_fruit:         { name: "Frutto del Coro x8",    amount: 8,  reward: 2 },
    ghast_tear:           { name: "Lacrima di Ghast x4",   amount: 4,  reward: 5 },
    nether_brick:         { name: "Mattone Nether x16",    amount: 16, reward: 1 },
    fire_charge:          { name: "Carica di Fuoco x4",    amount: 4,  reward: 2 },
    rabbit_foot:          { name: "Zampa di Coniglio x4",  amount: 4,  reward: 3 },
};

// ── OVAIOLO ───────────────────────────────────────────────────────────────────

const SHOP_OVAIOLO = {
    wolf_spawn_egg:      { name: "Uovo di Lupo",        price: 13, amount: 1 },
    horse_spawn_egg:     { name: "Uovo di Cavallo",     price: 17, amount: 1 },
    donkey_spawn_egg:    { name: "Uovo di Asino",       price: 12, amount: 1 },
    rabbit_spawn_egg:    { name: "Uovo di Coniglio",    price: 7,  amount: 1 },
    bee_spawn_egg:       { name: "Uovo di Ape",         price: 11, amount: 1 },
    axolotl_spawn_egg:   { name: "Uovo di Axolotl",    price: 15, amount: 1 },
    panda_spawn_egg:     { name: "Uovo di Panda",       price: 22, amount: 1 },
    fox_spawn_egg:       { name: "Uovo di Volpe",       price: 13, amount: 1 },
    ocelot_spawn_egg:    { name: "Uovo di Ocelot",      price: 9,  amount: 1 },
    cat_spawn_egg:       { name: "Uovo di Gatto",       price: 9,  amount: 1 },
    parrot_spawn_egg:    { name: "Uovo di Pappagallo",  price: 10, amount: 1 },
    frog_spawn_egg:      { name: "Uovo di Rana",        price: 8,  amount: 1 },
    goat_spawn_egg:      { name: "Uovo di Capra",       price: 10, amount: 1 },
    llama_spawn_egg:     { name: "Uovo di Lama",        price: 14, amount: 1 },
    turtle_spawn_egg:    { name: "Uovo di Tartaruga",   price: 12, amount: 1 },
    polar_bear_spawn_egg:{ name: "Uovo di Orso Polare", price: 12, amount: 1 },
    camel_spawn_egg:     { name: "Uovo di Cammello",    price: 20, amount: 1 },
    armadillo_spawn_egg: { name: "Uovo di Armadillo",   price: 11, amount: 1 },
    strider_spawn_egg:   { name: "Uovo di Strider",     price: 10, amount: 1 },
    mooshroom_spawn_egg: { name: "Uovo di Fungosso",    price: 18, amount: 1 },
    hoglin_spawn_egg:    { name: "Uovo di Hoglin",      price: 12, amount: 1 },
    enderman_spawn_egg:  { name: "Uovo di Enderman",    price: 14, amount: 1 },
    phantom_spawn_egg:   { name: "Uovo di Phantom",     price: 16, amount: 1 },
    sniffer_spawn_egg:   { name: "Uovo di Sniffer",  price: 24, amount: 1 },
};

const SELL_OVAIOLO = {
    egg:        { name: "Uova x32",        amount: 32, reward: 1 },

    feather:    { name: "Piume x16",       amount: 16, reward: 1 },
    white_wool: { name: "Lana x32", amount: 32, reward: 1, typeIds: WOOL_IDS },
};

// ── QUESTS ────────────────────────────────────────────────────────────────────

const QUESTS = {
    // Cultista
    taglialegna:     { name: "Il Taglialegna",         name_en: "The Woodcutter",        reward: 4,  npc: "Cultista" },
    ossa:            { name: "Commissione delle Ossa",  name_en: "Bone Commission",       reward: 6,  npc: "Cultista" },
    sfama:           { name: "Sfama il Culto",          name_en: "Feed the Cult",         reward: 5,  npc: "Cultista" },
    buio:            { name: "Nel Buio",                name_en: "In the Dark",           reward: 5,  npc: "Cultista" },
    creeper:         { name: "La Minaccia Verde",       name_en: "The Green Threat",      reward: 4,  npc: "Cultista" },
    cultista_giorn:  { name: "Offerta al Culto",        name_en: "Cult Offering",         reward: 1,  npc: "Cultista" },
    // Cultista avanzato
    niss_anime:      { name: "Anime Perdute",           name_en: "Lost Souls",            reward: 16, npc: "Cultista" },
    niss_piglin:     { name: "Sangue del Nether",       name_en: "Nether Blood",          reward: 24, npc: "Cultista" },
    niss_sacrificio: { name: "Il Sacrificio",           name_en: "The Sacrifice",         reward: 28, npc: "Cultista" },
    niss_wither:     { name: "Il Rito Finale",          name_en: "The Final Ritual",      reward: 45, npc: "Cultista" },
    // Pescatore
    piero_pesce:     { name: "Il Primo Sgarro",         name_en: "The First Catch",       reward: 1,  npc: "Old Piero" },
    piero_salmone:   { name: "Sapori Amari",            name_en: "Bitter Flavors",        reward: 6,  npc: "Old Piero" },
    piero_tropicale: { name: "La Vendetta Inizia",      name_en: "Revenge Begins",        reward: 9,  npc: "Old Piero" },
    // Pescatore avanzato
    piero_prismarina: { name: "Tesori dell'Oceano",     name_en: "Ocean Treasures",       reward: 20, npc: "Old Piero" },
    piero_guardiani:  { name: "La Resa dei Conti",      name_en: "The Reckoning",         reward: 18, npc: "Old Piero" },
    piero_tridente:   { name: "L'Arma",                 name_en: "The Weapon",            reward: 22, npc: "Old Piero" },
    piero_elder:      { name: "Il Guardiano Antico",    name_en: "The Elder Guardian",    reward: 35, npc: "Old Piero" },
    // Cacciatrice
    elena_zombie:    { name: "La Prima Prova",           name_en: "The First Trial",      reward: 4,  npc: "Elena" },
    elena_scheletri: { name: "Ossa di Ferro",            name_en: "Iron Bones",           reward: 7,  npc: "Elena" },
    elena_vacche:    { name: "Per il Villaggio",         name_en: "For the Village",      reward: 5,  npc: "Elena" },
    elena_polli:     { name: "Cena Garantita",           name_en: "Guaranteed Dinner",    reward: 1,  npc: "Elena" },
    // Cacciatrice avanzato
    elena_blaze:     { name: "Fuoco e Sangue",           name_en: "Fire and Blood",       reward: 16, npc: "Elena" },
    elena_wither_sk: { name: "Ossa Nere",                name_en: "Black Bones",          reward: 22, npc: "Elena" },
    elena_phantom:   { name: "Notte Senza Fine",         name_en: "Endless Night",        reward: 20, npc: "Elena" },
    elena_wither:    { name: "La Caccia Finale",         name_en: "The Final Hunt",       reward: 40, npc: "Elena" },
    // Costruttore
    marco_ciottoli:  { name: "Fondamenta Solide",        name_en: "Solid Foundations",    reward: 4,  npc: "Marco" },
    marco_quercia:   { name: "Travi di Quercia",         name_en: "Oak Beams",            reward: 5,  npc: "Marco" },
    marco_carbone:   { name: "Luci per Tutti",           name_en: "Lights for All",       reward: 1,  npc: "Marco" },
    marco_ghiaia:    { name: "Lastricato",               name_en: "Cobblestone Path",     reward: 3,  npc: "Marco" },
    // Costruttore avanzato
    marco_ferro_oro:  { name: "Struttura Solida",        name_en: "Solid Structure",      reward: 18, npc: "Marco" },
    marco_ossidiana:  { name: "Fondamenta Eterne",       name_en: "Eternal Foundations",  reward: 20, npc: "Marco" },
    marco_nether:     { name: "Dal Nether",              name_en: "From the Nether",      reward: 16, npc: "Marco" },
    marco_netherite:  { name: "Il Materiale Raro",       name_en: "The Rare Material",    reward: 40, npc: "Marco" },
    // Decoratrice
    sofia_fiori:     { name: "Giardino in Fiore",        name_en: "Blooming Garden",      reward: 1,  npc: "Sofia" },
    sofia_lana:      { name: "Calore e Colore",          name_en: "Warmth and Color",     reward: 5,  npc: "Sofia" },
    sofia_colorante: { name: "La Tavolozza",             name_en: "The Palette",          reward: 4,  npc: "Sofia" },
    sofia_bamboo:    { name: "Angolo Verde",             name_en: "Green Corner",         reward: 1,  npc: "Sofia" },
    // Decoratrice avanzato
    sofia_vetro_glow:    { name: "Vetrate Luminose",     name_en: "Glowing Windows",      reward: 16, npc: "Sofia" },
    sofia_sculk:         { name: "Dal Profondo",         name_en: "From the Deep",        reward: 20, npc: "Sofia" },
    sofia_prisma:        { name: "Tesori Marini",        name_en: "Marine Treasures",     reward: 18, npc: "Sofia" },
    sofia_candele_miele: { name: "Luce e Dolcezza",      name_en: "Light and Sweetness",  reward: 22, npc: "Sofia" },
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
    // Avanzati
    piero_guardiani: "q_piero_guard",
    piero_elder:     "q_piero_elder",
    elena_blaze:     "q_el_blaze",
    elena_wither_sk: "q_el_wsk",
    elena_phantom:   "q_el_phantom",
    elena_wither:    "q_el_wither",
    niss_piglin:     "q_niss_piglin",
    niss_wither:     "q_niss_wither",
};

// ── FLAVOUR ───────────────────────────────────────────────────────────────────

const FRASI_DEL_GIORNO = [
    "Scavare dritto verso il basso è stupido. Lo sai. Lo fai lo stesso.",
    "La miniera chiama. La miniera puzza. Ci vai comunque.",
    "Y=-58. L'unico posto dove trovi diamanti e la volontà di vivere.",
    "Hai mangiato qualcosa di strano nel Nether. Il tuo intestino lo sa già.",
    "Dirreah Village: il nome era un avvertimento. Nessuno ha capito.",
    "Il creeper è esploso. L'inventario piange. Il culo trema.",
    "Stai scavando da 2 ore. Hai trovato 3 sassi e una depressione.",
    "La lava sotto i tuoi piedi è calda quasi quanto il tuo stomaco dopo il Nether.",
    "Ogni diamante trovato è una bugia che ti racconti per continuare a scavare.",
    "Sei caduto nella cacca di un villager. Benvenuto in Minecraft.",
    "Il tunnel che hai scavato porta dove non volevi. Come sempre.",
    "Hai bisogno di ferro. Hai trovato granito. 64 volte.",
    "Qualcuno ha costruito una casa sopra una miniera abbandonata piena di gas. Sei tu.",
    "Scavare il marmo fa schifo. Scavare la ghiaia fa più schifo. Fallo lo stesso.",
    "Il Nether non puzza. Sei tu che puzzi. Il Nether ti giudica.",
    "Hai perso i diamanti nella lava. Momento di elaborazione del lutto: ora.",
    "Una skeleton ti ha sparato mentre eri in bagno. Karma.",
    "Dirreah non è solo un villaggio. È uno stato mentale. E uno stomaco.",
    "Sei sopravvissuto alla notte. Il tuo intestino non ha avuto la stessa fortuna.",
    "Il suono della pioggia in Minecraft è rilassante. Il suono della diarrea no.",
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
const lastDeathLocation = new Map(); // playerName -> { x, y, z, dimensionId }
const sessionStart     = new Map(); // playerName -> timestamp (ms)

const REPEATABLE_QUESTS = new Set([
    "elena_polli", "piero_pesce", "marco_carbone", "sofia_fiori", "sofia_bamboo", "cultista_giorn"
]);

const QUEST_GROUPS = {
    cultista:    { npcTag: "cultista",    base: ["taglialegna","ossa","sfama","buio","creeper"],                                                adv: { tag: "cultista_avanzato",   quests: ["niss_anime","niss_piglin","niss_sacrificio","niss_wither"] } },
    pescatore:   { npcTag: "pescatore",   base: ["piero_pesce","piero_salmone","piero_tropicale"],                                              adv: { tag: "piero_avanzato",       quests: ["piero_prismarina","piero_guardiani","piero_tridente","piero_elder"] } },
    cacciatrice: { npcTag: "cacciatrice", base: ["elena_zombie","elena_scheletri","elena_vacche","elena_polli"],                                 adv: { tag: "cacciatrice_avanzato", quests: ["elena_blaze","elena_wither_sk","elena_phantom","elena_wither"] } },
    costruttore: { npcTag: "costruttore", base: ["marco_ciottoli","marco_quercia","marco_carbone","marco_ghiaia"],                               adv: { tag: "costruttore_avanzato", quests: ["marco_ferro_oro","marco_ossidiana","marco_nether","marco_netherite"] } },
    decoratrice: { npcTag: "decoratrice", base: ["sofia_fiori","sofia_lana","sofia_colorante","sofia_bamboo"],                                   adv: { tag: "decoratrice_avanzato", quests: ["sofia_vetro_glow","sofia_sculk","sofia_prisma","sofia_candele_miele"] } },
};

function getDayTag(quest) {
    return `q_${quest}_done_${Math.floor(Date.now() / 86400000)}`;
}
function isQuestDone(player, quest) {
    return REPEATABLE_QUESTS.has(quest)
        ? player.hasTag(getDayTag(quest))
        : player.hasTag(`q_${quest}_done`);
}

// ── INIT ──────────────────────────────────────────────────────────────────────

system.run(() => {
    for (const id of Object.values(SCORE_OBJ)) {
        try { world.scoreboard.addObjective(id, id); } catch {}
    }
    try { world.scoreboard.addObjective("quest_punti",  "§eQuest Completate"); } catch {}
    try { world.scoreboard.addObjective("pvp_kills",    "§cKill PvP"); } catch {}
    try { world.scoreboard.addObjective("pvp_deaths",  "§7Morti PvP"); } catch {}
    try { world.scoreboard.addObjective("total_deaths","§cMorti Totali"); } catch {}
    try {
        world.scoreboard.setDisplayAtDisplaySlot("sidebar", {
            objective: world.scoreboard.getObjective("quest_punti")
        });
    } catch {}
});

// ── EVENTS ────────────────────────────────────────────────────────────────────

world.afterEvents.playerSpawn.subscribe((ev) => {
    if (!ev.initialSpawn) return;
    sessionStart.set(ev.player.name, Date.now());
    system.runTimeout(() => updateNameTag(ev.player), 20);
    const online = world.getAllPlayers().length;
    world.sendMessage(`§a[Server] §f${ev.player.name} è entrato. §7(${online} online)`);
    if (online === 1) ev.player.sendMessage("§7Sei solo. Il server è tuo.");
    const frase = FRASI_DEL_GIORNO[Math.floor(Date.now() / 86400000) % FRASI_DEL_GIORNO.length];
    ev.player.sendMessage(`§7[Frase del giorno] §f${frase}`);
});

world.afterEvents.playerLeave.subscribe((ev) => {
    const start = sessionStart.get(ev.playerName);
    if (!start) return;
    const ms = Date.now() - start;
    const h  = Math.floor(ms / 3600000);
    const m  = Math.floor((ms % 3600000) / 60000);
    const t  = h > 0 ? `${h}h ${m}m` : `${m}m`;
    world.sendMessage(`§7[Server] §f${ev.playerName} ha giocato per §e${t}§f questa sessione.`);
    sessionStart.delete(ev.playerName);
});

// ── RESET MOB KILLS + PURGA CASUALE (random 15-30 min) ───────────────────────
const MOB_KILL_OBJS = ["q_el_zombie", "q_creeper", "q_ossa", "q_el_scheletri"];

const MOB_QUIP = {
    "minecraft:zombie":     ["§a⚔ §2ADDIO ZOMBIE! §r§7I morti devono stare morti.", "§2ZOMBIE PURIFICATI! §7Il villaggio respira."],
    "minecraft:skeleton":   ["§7💀 §fSCHELETRI DISSOLTI! §7Le ossa tornano alla terra.", "§8CLAC CLAC... §7niente. §fScheletri eliminati!"],
    "minecraft:creeper":    ["§a§lSSSSS— §r§2PUFF! §7Addio Creeper, niente esplosioni oggi.", "§2CREEPER ANNIENTATI! §7Il terreno è salvo."],
    "minecraft:spider":     ["§8🕷 RAGNI SCHIACCIATI! §7La tela è vuota.", "§8Addio ragni! §7Oggi niente morsi velenosi."],
    "minecraft:enderman":   ["§5ENDERMAN SCOMPARSI! §7Il buio è silenzioso.", "§5Addio Enderman! §8...non guardateli negli occhi."],
    "minecraft:drowned":    ["§bANNEGATI RIMOSSI! §7Il mare torna pulito.", "§3Bolla bolla bolla... §bAddio Annegati!"],
    "minecraft:witch":      ["§d🧙 STREGHE DISSOLTE! §7Niente più pozioni.", "§dCacca cacca cacca! §7Le streghe se ne sono andate."],
    "minecraft:phantom":    ["§1👻 PHANTOM SVANITI! §7Il cielo è libero.", "§1Addio Phantom! §7Dormite di più ragazzi."],
    "minecraft:pillager":   ["§c🏹 SACCHEGGIATORI CACCIATI! §7Il villaggio è al sicuro.", "§cADDIO PILLAGER! §8TOOOT— §7silenzio."],
};

function doMobReset() {
    // Reset scoreboards
    for (const player of world.getAllPlayers()) {
        const reset = [];
        for (const objId of MOB_KILL_OBJS) {
            const questKey = Object.keys(SCORE_OBJ).find(k => SCORE_OBJ[k] === objId);
            if (questKey && player.hasTag(`q_${questKey}`)) {
                const n = getScore(world.scoreboard.getObjective(objId), player);
                if (n > 0) reset.push(`${QUESTS[questKey].name} (${n}→0)`);
            }
            try { world.scoreboard.getObjective(objId)?.setScore(player, 0); } catch {}
        }
        if (reset.length > 0)
            player.sendMessage(`§c[Reset] §fI tuoi contatori sono stati azzerati: §e${reset.join(", ")}`);
    }

    // Purga casuale: 1-3 tipi di mob random
    const dim = world.getDimension("overworld");
    const shuffled = [...MOB_TYPES].sort(() => Math.random() - 0.5);
    const count = Math.floor(Math.random() * 3) + 1;
    const chosen = shuffled.slice(0, count);
    let totalKilled = 0;

    for (const mob of chosen) {
        const entities = [...dim.getEntities({ type: mob.type })];
        let killed = 0;
        for (const e of entities) try { e.kill(); killed++; } catch {}
        totalKilled += killed;
        if (killed > 0) {
            const quips = MOB_QUIP[mob.type];
            const quip = quips[Math.floor(Math.random() * quips.length)];
            world.sendMessage(quip + ` §8(${killed} eliminati)`);
        }
    }

    if (totalKilled === 0)
        world.sendMessage("§7[Purga] §fNessun mob trovato. Il mondo è tranquillo... per ora.");

    scheduleMobReset();
}

function mobResetCountdown(sec) {
    if (sec === 3)
        world.sendMessage("§c§l⚠ §r§7Purga in arrivo tra §c3 secondi§7! I mob non avranno scampo.");
    else
        world.sendMessage(`§c[Purga] §7... §e${sec}§7 ...`);
    if (sec <= 1) { system.runTimeout(doMobReset, 20); return; }
    system.runTimeout(() => mobResetCountdown(sec - 1), 20);
}

function scheduleMobReset() {
    const ticks = Math.floor(Math.random() * 18000) + 18000; // 15-30 min
    system.runTimeout(() => mobResetCountdown(3), ticks);
}
scheduleMobReset();

// ── CLEANUP OGGETTI A TERRA (random 2-6 ore) ──────────────────────────────────

function doItemCleanup() {
    let count = 0;
    for (const dimId of ["overworld", "nether", "the_end"]) {
        try {
            const items = world.getDimension(dimId).getEntities({ type: "minecraft:item" });
            count += items.length;
            for (const e of items) try { e.remove(); } catch {}
        } catch {}
    }
    world.sendMessage(`§6[Cleanup] §fRimossi §e${count}§f oggetti dal suolo.`);
    scheduleItemCleanup();
}

function itemCleanupCountdown(sec) {
    if (sec === 30) {
        world.sendMessage(`§6[Cleanup] §eATTENZIONE! §fGli oggetti a terra verranno rimossi tra §e30 secondi§f! Raccoglieteli!`);
        system.runTimeout(() => itemCleanupCountdown(10), 400); // aspetta 20s poi parte il conto alla rovescia
        return;
    }
    world.sendMessage(`§6[Cleanup] §fRimozione oggetti tra §e${sec}§f secondi...`);
    if (sec <= 1) { system.runTimeout(doItemCleanup, 20); return; }
    system.runTimeout(() => itemCleanupCountdown(sec - 1), 20);
}

function scheduleItemCleanup() {
    const ticks = Math.floor(Math.random() * 72000) + 72000; // 72000-144000 tick = 1-2 ore
    system.runTimeout(() => {
        world.sendMessage("§6[Cleanup] §eATTENZIONE! §fGli oggetti a terra verranno rimossi tra §e10 minuti§f! Raccoglieteli!");
        system.runTimeout(() => itemCleanupCountdown(30), 11400); // 9m30s → poi parte countdown 30s
    }, ticks);
}
scheduleItemCleanup();

const SIDEBAR_CYCLE = ["quest_punti", "pvp_kills", "total_deaths"];
let sidebarIdx = 0;
system.runInterval(() => {
    sidebarIdx = (sidebarIdx + 1) % SIDEBAR_CYCLE.length;
    try {
        world.scoreboard.setDisplayAtDisplaySlot("sidebar", {
            objective: world.scoreboard.getObjective(SIDEBAR_CYCLE[sidebarIdx])
        });
    } catch {}
}, 600); // 30 secondi

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

// ── ITEM USE (subscriber unificato) ──────────────────────────────────────────
world.afterEvents.itemUse.subscribe((ev) => {
    const { source: player, itemStack: item } = ev;
    if (item.typeId === "minecraft:compass") {
        system.runTimeout(() => openDashboard(player), 1);
    } else if (item.typeId === "minecraft:book" && item.nameTag === "§eLibro delle Missioni") {
        system.runTimeout(() => openDashboard(player), 1);
    }
});

// ── BETTER SLEEP (50% threshold) ─────────────────────────────────────────────
let nightSkipped = false;

system.runInterval(() => {
    const players = world.getAllPlayers();
    if (players.length === 0) return;

    const timeOfDay = world.getAbsoluteTime() % 24000;
    const isNight = timeOfDay >= 12542;

    if (!isNight) { nightSkipped = false; return; }
    if (nightSkipped) return;

    const sleeping = players.filter(p => p.isSleeping).length;
    const needed = Math.ceil(players.length * 0.5);
    if (sleeping >= needed) {
        nightSkipped = true;
        world.getDimension("overworld").runCommand("time set day");
        world.sendMessage(`§7[Notte] §f${sleeping}/${players.length} giocatori dormono. §eAlba anticipata!`);
    }
}, 100);

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

// Track: kill quests + morte player (subscriber unificato)
world.afterEvents.entityDie.subscribe((ev) => {
    const dead   = ev.deadEntity;
    const killer = ev.damageSource.damagingEntity;

    // — morte di un player —
    if (dead.typeId === "minecraft:player") {
        lastDeathLocation.set(dead.name, {
            x: Math.floor(dead.location.x),
            y: Math.floor(dead.location.y),
            z: Math.floor(dead.location.z),
            dimensionId: dead.dimension.id,
        });
        const totalObj = world.scoreboard.getObjective("total_deaths");
        totalObj.setScore(dead, getScore(totalObj, dead) + 1);
    }

    // — uccisione da parte di un player —
    if (!killer || killer.typeId !== "minecraft:player") return;
    const player   = killer;
    const deadType = dead.typeId;

    if (happyHourActive && deadType.startsWith("minecraft:")) {
        player.runCommand("xp 10");
    }
    if (deadType === "minecraft:player") {
        const killObj  = world.scoreboard.getObjective("pvp_kills");
        const deathObj = world.scoreboard.getObjective("pvp_deaths");
        killObj.setScore(player, getScore(killObj, player) + 1);
        deathObj.setScore(dead, getScore(deathObj, dead) + 1);
        world.sendMessage(`§c[PvP] §f${player.name} ha eliminato ${dead.name}!`);
    }
    trackKill(player, deadType, "minecraft:skeleton",       "q_ossa",         10, "§5[Cultista]", "Scheletri");
    trackKill(player, deadType, "minecraft:creeper",        "q_creeper",       5, "§5[Cultista]", "Creeper");
    trackKill(player, deadType, "minecraft:zombie",         "q_el_zombie",     8, "§6[Elena]",    "Zombie");
    trackKill(player, deadType, "minecraft:skeleton",       "q_el_scheletri", 10, "§6[Elena]",    "Scheletri");
    trackKill(player, deadType, "minecraft:cow",            "q_el_vacche",     5, "§6[Elena]",    "Vacche");
    trackKill(player, deadType, "minecraft:chicken",        "q_el_polli",      8, "§6[Elena]",    "Polli");
    trackKill(player, deadType, "minecraft:guardian",       "q_piero_guard",   5, "§b[Old Piero]","Guardiani");
    trackKill(player, deadType, "minecraft:elder_guardian", "q_piero_elder",   1, "§b[Old Piero]","Guardiano Antico");
    trackKill(player, deadType, "minecraft:blaze",          "q_el_blaze",     10, "§6[Elena]",    "Blaze");
    trackKill(player, deadType, "minecraft:wither_skeleton","q_el_wsk",        8, "§6[Elena]",    "Scheletri Wither");
    trackKill(player, deadType, "minecraft:phantom",        "q_el_phantom",    8, "§6[Elena]",    "Phantom");
    trackKill(player, deadType, "minecraft:wither",         "q_el_wither",     1, "§6[Elena]",    "Wither");
    trackKill(player, deadType, "minecraft:piglin_brute",   "q_niss_piglin",   8, "§5[Niss]",     "Piglin Brute");
    trackKill(player, deadType, "minecraft:wither",         "q_niss_wither",   1, "§5[Niss]",     "Wither");
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
    // dashboard:open può venire da command block — gestiscilo prima del guard player
    if (ev.id === "dashboard:open") {
        const target = [ev.initiator, ev.sourceEntity, world.getAllPlayers().find(p => p.name === ev.message.trim())]
            .find(e => e?.typeId === "minecraft:player");
        if (target) system.runTimeout(() => openDashboard(target), 20);
        return;
    }

    const player = ev.initiator;
    if (!player || player.typeId !== "minecraft:player") return;
    const msg = ev.message.trim();
    const action = ev.id.split(":")[1];

    if      (action === "accept")        acceptQuest(player, msg);
    else if (action === "deliver")       deliverQuest(player, msg);
    else if (action === "ritorno_morte") teleportToLastDeath(player);
    else if (action === "lang_check") {
        if (player.hasTag("sara")) {
            const npc = ev.id.split(":")[0];
            player.runCommand(`dialogue open @e[tag=${npc},r=5] @s ${npc}_intro_en`);
        }
    }
    else if (action === "missioni") {
        const npc = ev.id.split(":")[0];
        if (QUEST_GROUPS[npc]) system.runTimeout(() => openQuestForm(player, npc, false), 10);
    }
    else if (ev.id === "shop:buy")         buyItem(player, msg, SHOP,           "Francesco");
    else if (ev.id === "shop:sell")        sellItem(player, msg, SELL,          "Francesco");
    else if (ev.id === "fabbro:buy")       buyItem(player, msg, SHOP_FABBRO,   "Mastro Ugo");
    else if (ev.id === "fabbro:sell")      sellItem(player, msg, SELL_FABBRO,  "Mastro Ugo");
    else if (ev.id === "contadina:buy")    buyItem(player, msg, SHOP_CONTADINA,"Nonna Rosa");
    else if (ev.id === "contadina:sell")   sellItem(player, msg, SELL_CONTADINA,"Nonna Rosa");
    else if (ev.id === "alchimista:buy")   buyItem(player, msg, SHOP_ALCHIMISTA, "Maga Vera");
    else if (ev.id === "alchimista:sell")  sellItem(player, msg, SELL_ALCHIMISTA,"Maga Vera");
    else if (ev.id === "ovaiolo:buy")       buyItem(player, msg, SHOP_OVAIOLO,    "Zio Beppe");
    else if (ev.id === "ovaiolo:sell")      sellItem(player, msg, SELL_OVAIOLO,   "Zio Beppe");
    else if (ev.id === "shop:sellall")      sellAll(player, SELL,           "Francesco");
    else if (ev.id === "fabbro:sellall")    sellAll(player, SELL_FABBRO,    "Mastro Ugo");
    else if (ev.id === "contadina:sellall") sellAll(player, SELL_CONTADINA, "Nonna Rosa");
    else if (ev.id === "alchimista:sellall")sellAll(player, SELL_ALCHIMISTA,"Maga Vera");
    else if (ev.id === "ovaiolo:sellall")   sellAll(player, SELL_OVAIOLO,   "Zio Beppe");
    else if (action === "riti_accesso") {
        const en = player.hasTag("sara");
        if (player.hasTag("cultista_avanzato")) {
            system.runTimeout(() => openQuestForm(player, "cultista", true), 10);
        } else {
            player.sendMessage(en
                ? "§5[Cultist] §cYou are not yet worthy of the rites.\n§7Complete the trials first."
                : "§5[Cultista] §cNon sei ancora degno dei riti.\n§7Completa prima le prove.");
        }
    }
    else if (action === "hub_accesso") {
        const npc = ev.id.split(":")[0];
        const en  = player.hasTag("sara");
        const cfg = {
            pescatore:   { tag: "piero_avanzato",       msg_it: "§b[Old Piero] §cNon te lo meriti ancora.\n§7Pesca per me prima.",                          msg_en: "§b[Old Piero] §cYou haven't earned it yet.\n§7Fish for me first." },
            cacciatrice: { tag: "cacciatrice_avanzato", msg_it: "§6[Elena] §cNon sei ancora pronta.\n§7Dimostrami di saper cacciare.",                      msg_en: "§6[Elena] §cYou're not ready yet.\n§7Prove you can hunt." },
            costruttore: { tag: "costruttore_avanzato", msg_it: "§9[Marco] §cI progetti avanzati non sono per te ancora.\n§7Portami i materiali base prima.", msg_en: "§9[Marco] §cAdvanced projects aren't for you yet.\n§7Bring me the basics first." },
            decoratrice: { tag: "decoratrice_avanzato", msg_it: "§d[Sofia] §cNon ancora! Aiutami prima con le cose semplici.",                              msg_en: "§d[Sofia] §cNot yet! Help me with the simple things first." },
        }[npc];
        if (!cfg) return;
        if (player.hasTag(cfg.tag)) {
            system.runTimeout(() => openQuestForm(player, npc, true), 10);
        } else {
            player.sendMessage(en ? cfg.msg_en : cfg.msg_it);
        }
    }
    else if (action === "balance") {
        const n = countItem(player, "minecraft:emerald");
        player.onScreenDisplay.setActionBar(`§eGemme: §f${n} §6◆`);
    }
}, { namespaces: ["cultista", "shop", "pescatore", "cacciatrice", "costruttore", "decoratrice", "fabbro", "contadina", "alchimista", "ovaiolo", "dashboard"] });

// ── SHOP LOGIC ────────────────────────────────────────────────────────────────

function showGems(player) {
    const n = countItem(player, "minecraft:emerald");
    player.onScreenDisplay.setActionBar(`§eGemme: §f${n} §6◆`);
}

function buyItem(player, itemId, shopMap, npcName) {
    const item = shopMap[itemId];
    if (!item) return;
    const gemme = countItem(player, "minecraft:emerald");
    if (gemme < item.price) {
        player.sendMessage(`§c[${npcName}] Non hai abbastanza gemme. Servono ${item.price}, ne hai ${gemme}.`);
        showGems(player);
        return;
    }
    player.runCommand(`clear @s emerald 0 ${item.price}`);
    if (item.enchants) {
        giveSpecialItem(player, `minecraft:${item.typeId ?? itemId}`, item.name, item.enchants);
    } else {
        player.runCommand(`give @s ${itemId} ${item.amount}`);
    }
    world.sendMessage(`§6[${npcName}] §f${player.name} ha comprato: §e${item.name}§f. -${item.price} gemme.`);
    showGems(player);
}

function sellItem(player, itemId, sellMap, npcName) {
    const item = sellMap[itemId];
    if (!item) return;
    const resolvedId = item.typeIds ? null : (itemId.includes(":") ? itemId : `minecraft:${itemId}`);
    const count = item.typeIds ? countItems(player, item.typeIds) : countItem(player, resolvedId);
    if (count < item.amount) {
        player.sendMessage(`§c[${npcName}] Non hai abbastanza. Servono ${item.amount} ${item.name.split(" x")[0]}, ne hai ${count}.`);
        showGems(player);
        return;
    }
    if (item.typeIds) clearItems(player, item.typeIds, item.amount);
    else player.runCommand(`clear @s ${resolvedId} 0 ${item.amount}`);
    player.runCommand(`give @s emerald ${item.reward}`);
    player.sendMessage(`§6[${npcName}] §fVenduto: §e${item.name}§f. +${item.reward} gemme.`);
    showGems(player);
}

function sellAll(player, sellMap, npcName) {
    let totalGems = 0;
    const sold = [];
    for (const [itemId, item] of Object.entries(sellMap)) {
        const resolvedId = item.typeIds ? null : (itemId.includes(":") ? itemId : `minecraft:${itemId}`);
        const count = item.typeIds ? countItems(player, item.typeIds) : countItem(player, resolvedId);
        const batches = Math.floor(count / item.amount);
        if (batches < 1) continue;
        if (item.typeIds) { for (let i = 0; i < batches; i++) clearItems(player, item.typeIds, item.amount); }
        else player.runCommand(`clear @s ${resolvedId} 0 ${item.amount * batches}`);
        const reward = item.reward * batches;
        player.runCommand(`give @s emerald ${reward}`);
        totalGems += reward;
        sold.push(item.name.split(" x")[0]);
    }
    if (totalGems > 0) {
        player.sendMessage(`§a[${npcName}] Venduto tutto: §f${sold.join(", ")}§a. Totale: §f+${totalGems} gemme!`);
    } else {
        player.sendMessage(`§c[${npcName}] Non hai niente da vendere.`);
    }
    showGems(player);
}

// ── QUEST LOGIC ───────────────────────────────────────────────────────────────

function acceptQuest(player, quest) {
    if (!QUESTS[quest]) return;
    const en = player.hasTag("sara");
    if (isQuestDone(player, quest)) {
        player.sendMessage(REPEATABLE_QUESTS.has(quest)
            ? (en ? "§7You already completed this quest today. Come back tomorrow." : "§7Hai già completato questa missione oggi. Torna domani.")
            : (en ? "§7You already completed this quest." : "§7Hai già completato questa missione."));
        return;
    }
    if (player.hasTag(`q_${quest}`)) {
        const progress = getQuestProgress(player, quest, en);
        if (progress.done) {
            deliverQuest(player, quest);
        } else {
            player.sendMessage(en ? `§6[In progress] §f${progress.text}` : `§6[In corso] §f${progress.text}`);
        }
        return;
    }
    player.addTag(`q_${quest}`);
    if (SCORE_OBJ[quest]) world.scoreboard.getObjective(SCORE_OBJ[quest]).setScore(player, 0);
    const qname  = en ? (QUESTS[quest].name_en || QUESTS[quest].name) : QUESTS[quest].name;
    const reward = QUESTS[quest].reward;
    player.sendMessage(en
        ? `§e[${QUESTS[quest].npc}] §fQuest accepted: §e${qname}§f  §6+${reward} ◆§f. Good luck!`
        : `§e[${QUESTS[quest].npc}] §fMissione accettata: §e${qname}§f  §6+${reward} ◆§f. Buona fortuna!`);
}

function deliverQuest(player, quest) {
    if (!QUESTS[quest]) return;
    const en = player.hasTag("sara");
    if (!player.hasTag(`q_${quest}`)) {
        player.sendMessage(en ? "§cYou don't have this quest active." : "§cNon hai questa missione attiva.");
        return;
    }
    const progress = getQuestProgress(player, quest, en);
    if (!progress.done) {
        player.sendMessage(en ? `§c[Incomplete] §f${progress.text}` : `§c[Incompleta] §f${progress.text}`);
        return;
    }

    // Remove quest state
    player.removeTag(`q_${quest}`);
    if (REPEATABLE_QUESTS.has(quest)) {
        player.addTag(getDayTag(quest));
        if (!player.hasTag(`q_${quest}_ever`)) player.addTag(`q_${quest}_ever`);
    } else {
        player.addTag(`q_${quest}_done`);
    }
    if (SCORE_OBJ[quest]) world.scoreboard.getObjective(SCORE_OBJ[quest]).setScore(player, 0);
    if (quest === "buio") player.removeTag("q_buio_ready");

    // Consume items for delivery quests
    if (quest === "cultista_giorn")     player.runCommand("clear @s rotten_flesh 0 8");
    if (quest === "sfama")              player.runCommand("clear @s bread 0 16");
    if (quest === "piero_pesce")        player.runCommand("clear @s cod 0 10");
    if (quest === "piero_salmone")      player.runCommand("clear @s salmon 0 8");
    if (quest === "piero_tropicale")    player.runCommand("clear @s tropical_fish 0 6");
    if (quest === "marco_ciottoli")     player.runCommand("clear @s cobblestone 0 64");
    if (quest === "marco_quercia")      player.runCommand("clear @s oak_log 0 32");
    if (quest === "marco_carbone")      player.runCommand("clear @s coal 0 16");
    if (quest === "marco_ghiaia")       player.runCommand("clear @s gravel 0 32");
    if (quest === "sofia_fiori")        clearItems(player, FLOWER_IDS, 16);
    if (quest === "sofia_lana")         clearItems(player, WOOL_IDS, 8);
    if (quest === "sofia_colorante")    clearItems(player, DYE_IDS, 6);
    if (quest === "sofia_bamboo")       player.runCommand("clear @s bamboo 0 16");
    // Avanzati - consuma item
    if (quest === "piero_prismarina") { player.runCommand("clear @s prismarine 0 32"); player.runCommand("clear @s prismarine_crystals 0 8"); player.runCommand("clear @s ink_sac 0 8"); }
    if (quest === "piero_tridente")   { player.runCommand("clear @s trident 0 1"); player.runCommand("clear @s nautilus_shell 0 4"); }
    if (quest === "marco_ferro_oro")  { player.runCommand("clear @s iron_ingot 0 64"); player.runCommand("clear @s gold_ingot 0 32"); }
    if (quest === "marco_ossidiana")  { player.runCommand("clear @s obsidian 0 32"); player.runCommand("clear @s crying_obsidian 0 8"); }
    if (quest === "marco_nether")     { player.runCommand("clear @s nether_brick 0 32"); player.runCommand("clear @s quartz 0 16"); }
    if (quest === "marco_netherite")  { player.runCommand("clear @s netherite_ingot 0 4"); }
    if (quest === "sofia_vetro_glow") { clearItems(player, STAINED_GLASS_IDS, 32); player.runCommand("clear @s glowstone 0 16"); }
    if (quest === "sofia_sculk")      { player.runCommand("clear @s sculk 0 16"); player.runCommand("clear @s sculk_sensor 0 4"); }
    if (quest === "sofia_prisma")     { player.runCommand("clear @s prismarine_bricks 0 32"); player.runCommand("clear @s sea_lantern 0 16"); }
    if (quest === "sofia_candele_miele") { clearItems(player, CANDLE_IDS, 16); player.runCommand("clear @s honeycomb 0 8"); player.runCommand("clear @s amethyst_shard 0 16"); }
    if (quest === "niss_anime")       { player.runCommand("clear @s soul_sand 0 32"); player.runCommand("clear @s soul_soil 0 16"); }
    if (quest === "elena_phantom")    player.runCommand("clear @s phantom_membrane 0 4");
    if (quest === "niss_sacrificio")  { player.runCommand("clear @s totem_of_undying 0 1"); player.runCommand("clear @s ghast_tear 0 4"); }

    // Reward
    const gold = QUESTS[quest].reward;
    player.runCommand(`give @s emerald ${gold}`);

    const punti = world.scoreboard.getObjective("quest_punti");
    punti.setScore(player, getScore(punti, player) + 1);

    world.sendMessage(`§e[${QUESTS[quest].npc}] §f${player.name} §aha completato §e${QUESTS[quest].name}§f! §6+${gold} ◆`);

    // Sblocco avanzate
    checkUnlock(player, quest);
    // Premio finale
    checkFinalReward(player, quest);
}

function getQuestProgress(player, quest, en = false) {
    switch (quest) {
        // Cultista
        case "taglialegna": { const n = getScore(world.scoreboard.getObjective("q_taglialegna"), player); return { done: n >= 32, text: en ? `Logs: ${n}/32` : `Tronchi: ${n}/32` }; }
        case "ossa":        { const n = getScore(world.scoreboard.getObjective("q_ossa"), player);        return { done: n >= 10, text: en ? `Skeletons: ${n}/10` : `Scheletri: ${n}/10` }; }
        case "creeper":     { const n = getScore(world.scoreboard.getObjective("q_creeper"), player);     return { done: n >= 5,  text: `Creeper: ${n}/5` }; }
        case "sfama":       { const n = countItem(player, "minecraft:bread");                             return { done: n >= 16, text: en ? `Bread: ${n}/16` : `Pane: ${n}/16` }; }
        case "buio":        return { done: player.hasTag("q_buio_ready"), text: en ? "You must go down to Y≤30." : "Devi scendere a Y≤30." };
        case "cultista_giorn": { const n = countItem(player, "minecraft:rotten_flesh"); return { done: n >= 8, text: en ? `Rotten Flesh: ${n}/8` : `Carne Marcia: ${n}/8` }; }
        // Pescatore
        case "piero_pesce":     { const n = countItem(player, "minecraft:cod");            return { done: n >= 10, text: en ? `Cod: ${n}/10` : `Merluzzi: ${n}/10` }; }
        case "piero_salmone":   { const n = countItem(player, "minecraft:salmon");         return { done: n >= 8,  text: en ? `Salmon: ${n}/8` : `Salmoni: ${n}/8` }; }
        case "piero_tropicale": { const n = countItem(player, "minecraft:tropical_fish");  return { done: n >= 6,  text: en ? `Tropical Fish: ${n}/6` : `Tropicali: ${n}/6` }; }
        // Cacciatrice
        case "elena_zombie":    { const n = getScore(world.scoreboard.getObjective("q_el_zombie"),     player); return { done: n >= 8,  text: en ? `Zombies: ${n}/8` : `Zombie: ${n}/8` }; }
        case "elena_scheletri": { const n = getScore(world.scoreboard.getObjective("q_el_scheletri"), player); return { done: n >= 10, text: en ? `Skeletons: ${n}/10` : `Scheletri: ${n}/10` }; }
        case "elena_vacche":    { const n = getScore(world.scoreboard.getObjective("q_el_vacche"),    player); return { done: n >= 5,  text: en ? `Cows: ${n}/5` : `Vacche: ${n}/5` }; }
        case "elena_polli":     { const n = getScore(world.scoreboard.getObjective("q_el_polli"),     player); return { done: n >= 8,  text: en ? `Chickens: ${n}/8` : `Polli: ${n}/8` }; }
        // Costruttore
        case "marco_ciottoli": { const n = countItem(player, "minecraft:cobblestone"); return { done: n >= 64, text: en ? `Cobblestone: ${n}/64` : `Ciottoli: ${n}/64` }; }
        case "marco_quercia":  { const n = countItem(player, "minecraft:oak_log");     return { done: n >= 32, text: en ? `Logs: ${n}/32` : `Tronchi: ${n}/32` }; }
        case "marco_carbone":  { const n = countItem(player, "minecraft:coal");        return { done: n >= 16, text: en ? `Coal: ${n}/16` : `Carbone: ${n}/16` }; }
        case "marco_ghiaia":   { const n = countItem(player, "minecraft:gravel");      return { done: n >= 32, text: en ? `Gravel: ${n}/32` : `Ghiaia: ${n}/32` }; }
        // Decoratrice
        case "sofia_fiori":     { const n = countItems(player, FLOWER_IDS); return { done: n >= 16, text: en ? `Flowers: ${n}/16` : `Fiori: ${n}/16` }; }
        case "sofia_lana":      { const n = countItems(player, WOOL_IDS);   return { done: n >= 8,  text: en ? `Wool: ${n}/8` : `Lana: ${n}/8` }; }
        case "sofia_colorante": { const n = countItems(player, DYE_IDS);    return { done: n >= 6,  text: en ? `Dye: ${n}/6` : `Colorante: ${n}/6` }; }
        case "sofia_bamboo":    { const n = countItem(player, "minecraft:bamboo"); return { done: n >= 16, text: en ? `Bamboo: ${n}/16` : `Bambù: ${n}/16` }; }
        // Pescatore avanzato
        case "piero_prismarina": {
            const p = countItem(player, "minecraft:prismarine");
            const c = countItem(player, "minecraft:prismarine_crystals");
            const i = countItem(player, "minecraft:ink_sac");
            return { done: p >= 32 && c >= 8 && i >= 8, text: en ? `Prismarine: ${p}/32, Crystals: ${c}/8, Ink: ${i}/8` : `Prismarina: ${p}/32, Cristalli: ${c}/8, Inchiostro: ${i}/8` };
        }
        case "piero_guardiani": { const n = getScore(world.scoreboard.getObjective("q_piero_guard"), player); return { done: n >= 5,  text: en ? `Guardians: ${n}/5` : `Guardiani: ${n}/5` }; }
        case "piero_tridente": {
            const t = countItem(player, "minecraft:trident");
            const n = countItem(player, "minecraft:nautilus_shell");
            return { done: t >= 1 && n >= 4, text: en ? `Trident: ${t}/1, Nautilus: ${n}/4` : `Tridente: ${t}/1, Nautilus: ${n}/4` };
        }
        case "piero_elder": { const n = getScore(world.scoreboard.getObjective("q_piero_elder"), player); return { done: n >= 1,  text: en ? `Elder Guardian: ${n}/1` : `Guardiano Antico: ${n}/1` }; }
        // Cacciatrice avanzato
        case "elena_blaze":    { const n = getScore(world.scoreboard.getObjective("q_el_blaze"), player);   return { done: n >= 10, text: `Blaze: ${n}/10` }; }
        case "elena_wither_sk":{ const n = getScore(world.scoreboard.getObjective("q_el_wsk"),   player);   return { done: n >= 8,  text: en ? `Wither Skeletons: ${n}/8` : `Scheletri Wither: ${n}/8` }; }
        case "elena_phantom": {
            const k = getScore(world.scoreboard.getObjective("q_el_phantom"), player);
            const m = countItem(player, "minecraft:phantom_membrane");
            return { done: k >= 8 && m >= 4, text: en ? `Phantoms: ${k}/8, Membranes: ${m}/4` : `Phantom: ${k}/8, Membrane: ${m}/4` };
        }
        case "elena_wither": { const n = getScore(world.scoreboard.getObjective("q_el_wither"), player); return { done: n >= 1, text: `Wither: ${n}/1` }; }
        // Costruttore avanzato
        case "marco_ferro_oro": {
            const f = countItem(player, "minecraft:iron_ingot");
            const g = countItem(player, "minecraft:gold_ingot");
            return { done: f >= 64 && g >= 32, text: en ? `Iron: ${f}/64, Gold: ${g}/32` : `Ferro: ${f}/64, Oro: ${g}/32` };
        }
        case "marco_ossidiana": {
            const o = countItem(player, "minecraft:obsidian");
            const c = countItem(player, "minecraft:crying_obsidian");
            return { done: o >= 32 && c >= 8, text: en ? `Obsidian: ${o}/32, Crying: ${c}/8` : `Ossidiana: ${o}/32, Piangente: ${c}/8` };
        }
        case "marco_nether": {
            const b = countItem(player, "minecraft:nether_brick");
            const q = countItem(player, "minecraft:quartz");
            return { done: b >= 32 && q >= 16, text: en ? `Nether Brick: ${b}/32, Quartz: ${q}/16` : `Mattoni Nether: ${b}/32, Quarzo: ${q}/16` };
        }
        case "marco_netherite": { const n = countItem(player, "minecraft:netherite_ingot"); return { done: n >= 4, text: `Netherite: ${n}/4` }; }
        // Decoratrice avanzato
        case "sofia_vetro_glow": {
            const v = countItems(player, STAINED_GLASS_IDS);
            const g = countItem(player, "minecraft:glowstone");
            return { done: v >= 32 && g >= 16, text: en ? `Stained Glass: ${v}/32, Glowstone: ${g}/16` : `Vetro colorato: ${v}/32, Glowstone: ${g}/16` };
        }
        case "sofia_sculk": {
            const s = countItem(player, "minecraft:sculk");
            const se = countItem(player, "minecraft:sculk_sensor");
            return { done: s >= 16 && se >= 4, text: en ? `Sculk: ${s}/16, Sensor: ${se}/4` : `Sculk: ${s}/16, Sensore: ${se}/4` };
        }
        case "sofia_prisma": {
            const p = countItem(player, "minecraft:prismarine_bricks");
            const l = countItem(player, "minecraft:sea_lantern");
            return { done: p >= 32 && l >= 16, text: en ? `Prismarine: ${p}/32, Sea Lanterns: ${l}/16` : `Prismarina: ${p}/32, Lanterne Mare: ${l}/16` };
        }
        case "sofia_candele_miele": {
            const ca = countItems(player, CANDLE_IDS);
            const h  = countItem(player, "minecraft:honeycomb");
            const a  = countItem(player, "minecraft:amethyst_shard");
            return { done: ca >= 16 && h >= 8 && a >= 16, text: en ? `Candles: ${ca}/16, Honey: ${h}/8, Amethyst: ${a}/16` : `Candele: ${ca}/16, Miele: ${h}/8, Ametista: ${a}/16` };
        }
        // Cultista avanzato
        case "niss_anime": {
            const ss = countItem(player, "minecraft:soul_sand");
            const so = countItem(player, "minecraft:soul_soil");
            return { done: ss >= 32 && so >= 16, text: en ? `Soul Sand: ${ss}/32, Soul Soil: ${so}/16` : `Sabbia Anime: ${ss}/32, Terreno Anime: ${so}/16` };
        }
        case "niss_piglin": { const n = getScore(world.scoreboard.getObjective("q_niss_piglin"), player); return { done: n >= 8, text: `Piglin Brute: ${n}/8` }; }
        case "niss_sacrificio": {
            const t = countItem(player, "minecraft:totem_of_undying");
            const g = countItem(player, "minecraft:ghast_tear");
            return { done: t >= 1 && g >= 4, text: en ? `Totem: ${t}/1, Ghast Tears: ${g}/4` : `Totem: ${t}/1, Lacrime Ghast: ${g}/4` };
        }
        case "niss_wither": { const n = getScore(world.scoreboard.getObjective("q_niss_wither"), player); return { done: n >= 1, text: `Wither: ${n}/1` }; }
    }
    return { done: false, text: "" };
}

// ── UNLOCK & FINAL REWARDS ────────────────────────────────────────────────────

function checkUnlock(player, quest) {
    const has = (tag) => player.hasTag(tag);
    const ever = (q)  => has(`q_${q}_ever`) || has(`q_${q}_done`) ||
        (REPEATABLE_QUESTS.has(q) && player.getTags().some(t => t.startsWith(`q_${q}_done_`)));

    if (!has("piero_avanzato") && ["piero_pesce","piero_salmone","piero_tropicale"].includes(quest)) {
        if (ever("piero_pesce") && ever("piero_salmone") && ever("piero_tropicale")) {
            player.addTag("piero_avanzato");
            player.sendMessage("§b[Old Piero] ...aspetta. Torna da me. Ho qualcosa di diverso da chiederti.");
        }
    }
    if (!has("cacciatrice_avanzato") && ["elena_zombie","elena_scheletri","elena_vacche","elena_polli"].includes(quest)) {
        if (ever("elena_zombie") && ever("elena_scheletri") && ever("elena_vacche") && ever("elena_polli")) {
            player.addTag("cacciatrice_avanzato");
            player.sendMessage("§6[Elena] Hai superato le basi. Preparati per qualcosa di vero.");
        }
    }
    if (!has("costruttore_avanzato") && ["marco_ciottoli","marco_quercia","marco_carbone","marco_ghiaia"].includes(quest)) {
        if (ever("marco_ciottoli") && ever("marco_quercia") && ever("marco_carbone") && ever("marco_ghiaia")) {
            player.addTag("costruttore_avanzato");
            player.sendMessage("§a[Marco] Ottimo! Ho altri progetti in mente... più ambiziosi.");
        }
    }
    if (!has("decoratrice_avanzato") && ["sofia_fiori","sofia_lana","sofia_colorante","sofia_bamboo"].includes(quest)) {
        if (ever("sofia_fiori") && ever("sofia_lana") && ever("sofia_colorante") && ever("sofia_bamboo")) {
            player.addTag("decoratrice_avanzato");
            player.sendMessage("§d[Sofia] Sei fantastico! Ho idee più grandi... vieni a trovarmi!");
        }
    }
    if (!has("cultista_avanzato") && ["taglialegna","ossa","sfama","buio","creeper"].includes(quest)) {
        if (ever("taglialegna") && ever("ossa") && ever("sfama") && ever("buio") && ever("creeper")) {
            player.addTag("cultista_avanzato");
            player.sendMessage("§5[Niss] Le prove sono complete. Ora iniziano i veri riti.");
        }
    }
    updateNameTag(player);
}

function checkFinalReward(player, quest) {
    const done = (q) => player.hasTag(`q_${q}_done`);

    if (!player.hasTag("piero_finale") &&
        ["piero_prismarina","piero_guardiani","piero_tridente","piero_elder"].includes(quest) &&
        done("piero_prismarina") && done("piero_guardiani") && done("piero_tridente") && done("piero_elder")) {
        player.addTag("piero_finale");
        giveSpecialItem(player, "minecraft:trident", "§b§lFiocina di Anna",
            { loyalty: 3, impaling: 5, riptide: 3, unbreaking: 3 });
        player.sendMessage("§b[Old Piero] Prendi questo. Era di Anna.\n§3Non dimenticarla.");
        world.sendMessage(`§b[Old Piero] §f${player.name} ha concluso la storia di Old Piero.`);
    }
    if (!player.hasTag("cacciatrice_finale") &&
        ["elena_blaze","elena_wither_sk","elena_phantom","elena_wither"].includes(quest) &&
        done("elena_blaze") && done("elena_wither_sk") && done("elena_phantom") && done("elena_wither")) {
        player.addTag("cacciatrice_finale");
        giveSpecialItem(player, "minecraft:bow", "§c§lArco della Caccia",
            { power: 5, punch: 2, flame: 1, infinity: 1, unbreaking: 3 });
        player.sendMessage("§6[Elena] Non mi aspettavo che ce la facessi. Prendilo. Te lo sei guadagnato.");
        world.sendMessage(`§6[Elena] §f${player.name} ha concluso la storia di Elena.`);
    }
    if (!player.hasTag("costruttore_finale") &&
        ["marco_ferro_oro","marco_ossidiana","marco_nether","marco_netherite"].includes(quest) &&
        done("marco_ferro_oro") && done("marco_ossidiana") && done("marco_nether") && done("marco_netherite")) {
        player.addTag("costruttore_finale");
        giveSpecialItem(player, "minecraft:netherite_pickaxe", "§7§lPiccone di Marco",
            { fortune: 3, efficiency: 5, unbreaking: 3, silk_touch: 1 });
        player.sendMessage("§a[Marco] Il villaggio è quasi pronto. Grazie. Tieni questo — lo usavo io.");
        world.sendMessage(`§a[Marco] §f${player.name} ha concluso la storia di Marco.`);
    }
    if (!player.hasTag("decoratrice_finale") &&
        ["sofia_vetro_glow","sofia_sculk","sofia_prisma","sofia_candele_miele"].includes(quest) &&
        done("sofia_vetro_glow") && done("sofia_sculk") && done("sofia_prisma") && done("sofia_candele_miele")) {
        player.addTag("decoratrice_finale");
        giveSpecialItem(player, "minecraft:netherite_axe", "§d§lPennello di Sofia",
            { silk_touch: 1, efficiency: 5, unbreaking: 3, mending: 1 });
        player.sendMessage("§d[Sofia] Sei il miglior assistente che potessi sperare. Tienilo — è fatto su misura.");
        world.sendMessage(`§d[Sofia] §f${player.name} ha concluso la storia di Sofia.`);
    }
    if (!player.hasTag("cultista_finale") &&
        ["niss_anime","niss_piglin","niss_sacrificio","niss_wither"].includes(quest) &&
        done("niss_anime") && done("niss_piglin") && done("niss_sacrificio") && done("niss_wither")) {
        player.addTag("cultista_finale");
        giveSpecialItem(player, "minecraft:netherite_sword", "§5§lSigillo del Culto",
            { sharpness: 5, fire_aspect: 2, looting: 3, unbreaking: 3, mending: 1 });
        player.sendMessage("§5[Niss] I riti sono completi. Ora appartieni al culto.\n§8...o forse il culto appartiene a te.");
        world.sendMessage(`§5[Niss] §f${player.name} ha completato tutti i riti del Culto.`);
    }
    updateNameTag(player);
}

const ADVANCED_QUESTS = [
    "piero_prismarina","piero_guardiani","piero_tridente","piero_elder",
    "elena_blaze","elena_wither_sk","elena_phantom","elena_wither",
    "marco_ferro_oro","marco_ossidiana","marco_nether","marco_netherite",
    "sofia_vetro_glow","sofia_sculk","sofia_prisma","sofia_candele_miele",
    "niss_anime","niss_piglin","niss_sacrificio","niss_wither",
];
const BASE_UNLOCK_TAGS = ["piero_avanzato","cacciatrice_avanzato","costruttore_avanzato","decoratrice_avanzato","cultista_avanzato"];

function updateNameTag(player) {
    const name    = player.name;
    const punti   = getScore(world.scoreboard.getObjective("quest_punti"), player);
    const hasAnyAdv = ADVANCED_QUESTS.some(q => player.hasTag(`q_${q}_done`));
    if (hasAnyAdv) {
        const colors = ["§c","§6","§e","§a","§b","§9","§d"];
        player.nameTag = name.split("").map((c, i) => colors[i % colors.length] + c).join("");
    } else if (punti >= 20) {
        player.nameTag = `§c✦ §f${name}`;
    } else {
        player.nameTag = name;
    }
}

function giveSpecialItem(player, typeId, name, enchants) {
    try {
        const item = new ItemStack(typeId, 1);
        item.nameTag = name;
        const ench = item.getComponent("minecraft:enchantable");
        if (ench) {
            for (const [id, level] of Object.entries(enchants)) {
                try { ench.addEnchantment({ type: EnchantmentTypes.get(id), level }); } catch {}
            }
        }
        player.getComponent("minecraft:inventory")?.container.addItem(item);
    } catch {
        player.runCommand(`give @s ${typeId.replace("minecraft:", "")} 1`);
    }
}

function openQuestForm(player, npcId, advMode) {
    const en  = player.hasTag("sara");
    const cfg = QUEST_GROUPS[npcId];
    if (!cfg) return;
    const isAdv   = advMode && cfg.adv;
    const quests  = isAdv ? cfg.adv.quests : cfg.base;
    const npcName = QUESTS[quests[0]].npc;

    const doneCount = quests.filter(k => isQuestDone(player, k)).length;
    const tierLabel = isAdv ? (en ? "§c[Advanced] §r" : "§c[Avanzate] §r") : "";
    const bodyHint  = en
        ? `§f${doneCount}§7/${quests.length} complete  ·  §7§oTap to accept, check progress, or deliver.`
        : `§f${doneCount}§7/${quests.length} completate  ·  §7§oClicca per accettare o consegnare.`;

    const form = new ActionFormData()
        .title(`§l${tierLabel}${npcName}`)
        .body(bodyHint);

    for (const key of quests) {
        const q      = QUESTS[key];
        const qname  = en ? (q.name_en || q.name) : q.name;
        const done   = isQuestDone(player, key);
        const active = player.hasTag(`q_${key}`);
        let label;
        if (done) {
            label = `§2✓ §f${qname}`;
        } else if (active) {
            const prog = getQuestProgress(player, key, en);
            label = prog.done
                ? `§a§l▶ §r§f${qname}\n§a  ${en ? "Ready to deliver!" : "Pronta per la consegna!"}`
                : `§6● §f${qname}\n§8  ${prog.text}`;
        } else {
            const repTag = REPEATABLE_QUESTS.has(key) ? (en ? " §7(daily)" : " §7(giorn.)") : "";
            label = `§7○ §f${qname}${repTag}\n§8  §6+${q.reward} ◆`;
        }
        form.button(label);
    }
    const hasAdv = !isAdv && cfg.adv && player.hasTag(cfg.adv.tag);
    if (hasAdv) form.button(en ? "§c§l» Advanced Quests" : "§c§l» Missioni Avanzate");
    form.button(en ? "§0« Back" : "§0« Indietro");
    const totalQuests = quests.length;
    form.show(player).then(r => {
        if (r.canceled) return;
        if (r.selection < totalQuests) {
            acceptQuest(player, quests[r.selection]);
            system.runTimeout(() => openQuestForm(player, npcId, advMode), 5);
        } else if (hasAdv && r.selection === totalQuests) {
            openQuestForm(player, npcId, true);
        } else if (isAdv) {
            openQuestForm(player, npcId, false);
        } else {
            const scene = en ? `${cfg.npcTag}_intro_en` : `${cfg.npcTag}_intro`;
            player.runCommand(`dialogue open @e[tag=${cfg.npcTag},r=5] @s ${scene}`);
        }
    }).catch(() => {});
}

function openDashboard(player) {
    const loc     = lastDeathLocation.get(player.name);
    const isAdmin = player.hasTag("admin");
    const en      = player.hasTag("sara");
    const gems    = countItem(player, "minecraft:emerald");
    const qpts    = getScore(world.scoreboard.getObjective("quest_punti"), player);

    const form = new ActionFormData()
        .title(en ? "§l§6Quest Book" : "§l§6Libro delle Missioni")
        .body(`§6◆ §f${gems} ${en ? "gems" : "gemme"}   §7·   §e${qpts} ${en ? "quests done" : "missioni completate"}`);

    form.button(en ? "§6» Quests" : "§6» Missioni");
    form.button(en ? "§a» Daily" : "§a» Giornaliere");
    if (loc) form.button(`§c» ${en ? "Last Death" : "Ultima Morte"} §8(${loc.x}, ${loc.y}, ${loc.z})`);
    form.button(en ? "§b» Teleport" : "§b» Teletrasporto");
    if (isAdmin) form.button("§c» Admin Panel");
    form.button(en ? "§8« Close" : "§0« Chiudi");

    const base        = loc ? 3 : 2;
    const idxTeleport = base;
    const idxAdmin    = isAdmin ? base + 1 : -1;
    const idxClose    = base + (isAdmin ? 2 : 1);

    form.show(player).then(r => {
        if (r.canceled || r.selection === idxClose) return;
        if (r.selection === 0) openMissions(player);
        if (r.selection === 1) openDailyMissions(player);
        if (loc && r.selection === 2) teleportToLastDeath(player);
        if (r.selection === idxTeleport) openTeleport(player);
        if (isAdmin && r.selection === idxAdmin) openAdminPanel(player);
    }).catch(() => {});
}

function openAdminPanel(player) {
    const RESETS = [
        ["mrfrancesco", "shop_main"],
        ["contadina",   "contadina_main"],
        ["alchimista",  "alchimista_main"],
        ["fabbro",      "fabbro_main"],
        ["ovaiolo",     "ovaiolo_main"],
        ["pescatore",   "pescatore_intro"],
        ["cultista",    "cultista_intro"],
        ["costruttore", "costruttore_intro"],
        ["decoratrice", "decoratrice_intro"],
        ["cacciatrice", "cacciatrice_intro"],
        ["custode",     "custode_intro"],
    ];

    new ActionFormData()
        .title("§c§lAdmin Panel")
        .body("§7Seleziona un'azione:")
        .button("§e» Reset NPC")
        .button("§b» Pulisci oggetti a terra")
        .button("§a» Gestione Entità")
        .button("§5» Purga Mob Manuale")
        .button("§0« Chiudi")
        .show(player).then(r => {
            if (r.canceled || r.selection === 4) { openDashboard(player); return; }
            const dim = world.getDimension("overworld");
            if (r.selection === 0) {
                let ok = 0;
                for (const [tag, scene] of RESETS) {
                    try { dim.runCommand(`dialogue change @e[tag=${tag}] ${scene}`); ok++; } catch {}
                }
                player.sendMessage(`§c[Admin] §fReset completato: §e${ok}/${RESETS.length} §fNPC aggiornati.`);
            } else if (r.selection === 1) {
                try { dim.runCommand("kill @e[type=item]"); } catch {}
                player.sendMessage("§c[Admin] §fOggetti a terra eliminati.");
            } else if (r.selection === 2) {
                openEntityManager(player);
                return;
            } else if (r.selection === 3) {
                openMobPurge(player);
                return;
            }
            openAdminPanel(player);
        }).catch(() => {});
}

const FARM_TYPES = [
    { name: "Polli",      type: "minecraft:chicken" },
    { name: "Maiali",     type: "minecraft:pig"     },
    { name: "Mucche",     type: "minecraft:cow"     },
    { name: "Pecore",     type: "minecraft:sheep"   },
    { name: "Conigli",    type: "minecraft:rabbit"  },
    { name: "Gatti",      type: "minecraft:cat"     },
    { name: "Cavalli",    type: "minecraft:horse"   },
    { name: "Tartarughe", type: "minecraft:turtle"  },
    { name: "Panda",      type: "minecraft:panda"   },
    { name: "Rane",       type: "minecraft:frog"    },
    { name: "Asini",      type: "minecraft:donkey"  },
    { name: "Lama",       type: "minecraft:llama"   },
];

const MOB_TYPES = [
    { name: "Zombie",         type: "minecraft:zombie"     },
    { name: "Scheletro",      type: "minecraft:skeleton"   },
    { name: "Creeper",        type: "minecraft:creeper"    },
    { name: "Ragno",          type: "minecraft:spider"     },
    { name: "Enderman",       type: "minecraft:enderman"   },
    { name: "Annegato",       type: "minecraft:drowned"    },
    { name: "Strega",         type: "minecraft:witch"      },
    { name: "Phantom",        type: "minecraft:phantom"    },
    { name: "Saccheggiatore", type: "minecraft:pillager"   },
];

// Soglie: unnamed per animali, totale per mob
const FARM_THRESH = { warn: 20, high: 50, crit: 80 };
const MOB_THRESH  = { warn: 8,  high: 20, crit: 35 };

function farmSev(n) {
    if (n === 0)                  return { color: "§2", badge: "§2● OK",      sym: "§2✓" };
    if (n <= FARM_THRESH.warn)    return { color: "§a", badge: "§a● BASSO",   sym: "§a·" };
    if (n <= FARM_THRESH.high)    return { color: "§e", badge: "§e▲ ALTO",    sym: "§e!" };
    if (n <= FARM_THRESH.crit)    return { color: "§6", badge: "§6▲ CRITICO", sym: "§6!!" };
    return                               { color: "§c", badge: "§c■ ESTREMO", sym: "§c!!!" };
}

function mobSev(n) {
    if (n === 0)                 return { color: "§2", badge: "§2● ASSENTI",  sym: "§2✓" };
    if (n <= MOB_THRESH.warn)    return { color: "§e", badge: "§e▲ ALCUNI",   sym: "§e!" };
    if (n <= MOB_THRESH.high)    return { color: "§6", badge: "§6▲ MOLTI",    sym: "§6!!" };
    return                              { color: "§c", badge: "§c■ INVASIONE",sym: "§c!!!" };
}

function getEntityStats(dim, types, isMob = false) {
    return types.map(f => {
        const all = [...dim.getEntities({ type: f.type })];
        if (isMob) return { total: all.length, named: 0, unnamed: all.length };
        const named   = all.filter(e => e.nameTag && e.nameTag.trim() !== "");
        const unnamed = all.filter(e => !e.nameTag || e.nameTag.trim() === "");
        return { total: all.length, named: named.length, unnamed: unnamed.length };
    });
}

// ── ALERT AUTOMATICO OVERPOPOLAZIONE ─────────────────────────────────────────
const _alertedEntities = new Set();

system.runInterval(() => {
    if (world.getAllPlayers().length === 0) return;
    const dim = world.getDimension("overworld");
    const newAlerts = [];

    for (const f of FARM_TYPES) {
        const unnamed = [...dim.getEntities({ type: f.type })].filter(e => !e.nameTag || e.nameTag.trim() === "").length;
        const sev = farmSev(unnamed);
        const key = `farm_${f.type}`;
        if (unnamed > FARM_THRESH.warn && !_alertedEntities.has(key)) {
            _alertedEntities.add(key);
            newAlerts.push(`${sev.color}${f.name} §8(${unnamed} anonimi) ${sev.badge}`);
        }
    }

    for (const m of MOB_TYPES) {
        const count = [...dim.getEntities({ type: m.type })].length;
        const sev = mobSev(count);
        const key = `mob_${m.type}`;
        if (count > MOB_THRESH.warn && !_alertedEntities.has(key)) {
            _alertedEntities.add(key);
            newAlerts.push(`${sev.color}${m.name} §8(${count}) ${sev.badge}`);
        }
    }

    if (newAlerts.length > 0) {
        world.sendMessage(`§c§l[⚠ OVERPOP] §r§7Entità in eccesso — usa §eAdmin Panel §8> §eGestione Entità:\n${newAlerts.join("\n")}`);
    }
}, 20 * 60 * 5); // ogni 5 minuti

function confirmThanos(player, context, onConfirm, onCancel) {
    new MessageFormData()
        .title("§c§l⚠ THANOS SNAP ⚠")
        .body(`§c§lAZIONE IRREVERSIBILE\n\n§f${context}\n\n§7Sei assolutamente sicuro?`)
        .button1("§0✗ Annulla")
        .button2("§c§l✓ Sì, schiocca!")
        .show(player).then(r => {
            if (r.canceled || r.selection === 0) { onCancel(); return; }
            onConfirm();
        }).catch(() => onCancel());
}

function openMobPurge(player) {
    const dim   = world.getDimension("overworld");
    const stats = getEntityStats(dim, MOB_TYPES, true);

    const form = new ActionFormData()
        .title("§5§lPurga Mob Manuale")
        .body("§7Scegli quali mob purgare con messaggio in chat.\n§8I messaggi divertenti vengono inviati a tutti.\n\n" +
            MOB_TYPES.map((m, i) => {
                const sev = mobSev(stats[i].total);
                return `${sev.sym} §f${m.name}: ${sev.color}${stats[i].total}`;
            }).join("\n"));

    for (let i = 0; i < MOB_TYPES.length; i++) {
        const sev = mobSev(stats[i].total);
        form.button(`${sev.sym} §0${MOB_TYPES[i].name} §8[${sev.color}${stats[i].total}§8]`);
    }
    form.button("§c§l⚠ THANOS SNAP §r§8(tutti i mob)");
    form.button("§0« Indietro Admin");

    form.show(player).then(r => {
        const purgaAll = MOB_TYPES.length;
        const back     = MOB_TYPES.length + 1;
        if (r.canceled || r.selection === back) { openAdminPanel(player); return; }

        const isThanosAll = r.selection === purgaAll;
        const targets = isThanosAll ? MOB_TYPES : [MOB_TYPES[r.selection]];

        const doPurge = () => {
            let total = 0;
            const perType = [];
            for (const mob of targets) {
                const entities = [...dim.getEntities({ type: mob.type })];
                let killed = 0;
                for (const e of entities) try { e.kill(); killed++; } catch {}
                total += killed;
                if (killed > 0) {
                    perType.push(`§f${mob.name} §8×§e${killed}`);
                    const quip = MOB_QUIP[mob.type][Math.floor(Math.random() * MOB_QUIP[mob.type].length)];
                    world.sendMessage(quip + ` §8(${killed} eliminati)`);
                }
            }
            if (isThanosAll && total > 0)
                world.sendMessage(`§5§l✦ THANOS SNAP §r§7— §f${player.name} §7ha ripulito tutto.\n§8${perType.join("  ")}§8  |  Totale: §c${total}`);
            if (total === 0)
                player.sendMessage("§7[Purga] §fNessun mob trovato.");
            openMobPurge(player);
        };

        if (isThanosAll) {
            confirmThanos(player, "TUTTI i mob ostili verranno eliminati con messaggio in chat.", doPurge, () => openMobPurge(player));
        } else {
            doPurge();
        }
    }).catch(() => {});
}

function openEntityManager(player) {
    const dim = world.getDimension("overworld");
    const farmStats = getEntityStats(dim, FARM_TYPES);
    const mobStats  = getEntityStats(dim, MOB_TYPES, true);

    const farmWorst = Math.max(...farmStats.map(s => s.unnamed));
    const mobWorst  = Math.max(...mobStats.map(s => s.total));
    const fSev = farmSev(farmWorst);
    const mSev = mobSev(mobWorst);

    new ActionFormData()
        .title("§c§lGestione Entità")
        .body(
            `§7Panoramica server:\n` +
            `§fAnimali anonimi peggiori: ${fSev.color}${farmWorst} ${fSev.badge}\n` +
            `§fMob ostili peggiori:      ${mSev.color}${mobWorst} ${mSev.badge}\n\n` +
            `§8Thanos Snap: animali anonimi > 30 + tutti i mob.`
        )
        .button(`${fSev.sym} §0Animali da Farm`)
        .button(`${mSev.sym} §0Mob Ostili`)
        .button("§c§l⚠ THANOS SNAP §r§8(animali+mob)")
        .button(`§0↺ Reset Alert §8(${_alertedEntities.size} attivi)`)
        .button("§0« Indietro Admin")
        .show(player).then(r => {
            if (r.canceled || r.selection === 4) { openAdminPanel(player); return; }
            if (r.selection === 0) { openFarmCleanup(player); return; }
            if (r.selection === 1) { openMobCleanup(player); return; }
            if (r.selection === 3) {
                _alertedEntities.clear();
                player.sendMessage("§7[Alert] §fAlert resettati — il sistema tornerà ad avvisare se necessario.");
                openEntityManager(player);
                return;
            }
            confirmThanos(player,
                "Animali anonimi >30 per tipo + TUTTI i mob ostili verranno eliminati.",
                () => {
                    let total = 0;
                    let mobCount = 0, animalCount = 0;
                    for (const f of FARM_TYPES) {
                        const unnamed = [...dim.getEntities({ type: f.type })].filter(e => !e.nameTag || e.nameTag.trim() === "");
                        const toKill = unnamed.slice(30);
                        for (const e of toKill) try { e.kill(); animalCount++; total++; } catch {}
                    }
                    for (const m of MOB_TYPES) {
                        const all = [...dim.getEntities({ type: m.type })];
                        for (const e of all) try { e.kill(); mobCount++; total++; } catch {}
                    }
                    world.sendMessage(`§5§l✦ THANOS SNAP §r§7— §f${player.name} §7ha schioccato le dita.\n§8Animali rimossi: §e${animalCount} §8| Mob eliminati: §e${mobCount} §8| Totale: §c${total}`);
                    openEntityManager(player);
                },
                () => openEntityManager(player)
            );
            return;
        }).catch(() => {});
}

function openFarmCleanup(player) {
    const dim   = world.getDimension("overworld");
    const stats = getEntityStats(dim, FARM_TYPES);

    const bodyLines = FARM_TYPES.map((f, i) => {
        const s = stats[i];
        const sev = farmSev(s.unnamed);
        return `${sev.sym} §f${f.name}: §e${s.total} tot §8| §a${s.named} nom §8| ${sev.color}${s.unnamed} anon §8— ${sev.badge}`;
    }).join("\n");

    const form = new ActionFormData()
        .title("§a§lAnimali da Farm")
        .body(`§7Seleziona tipo. §8Solo anonimi eliminabili — nominati al sicuro.\n\n${bodyLines}`);

    for (let i = 0; i < FARM_TYPES.length; i++) {
        const s   = stats[i];
        const sev = farmSev(s.unnamed);
        form.button(`${sev.sym} §0${FARM_TYPES[i].name} §8[${sev.color}${s.unnamed} §0anon §8/ §0${s.total} §0tot§8]`);
    }
    form.button("§0« Indietro");

    form.show(player).then(r => {
        if (r.canceled || r.selection === FARM_TYPES.length) { openEntityManager(player); return; }
        openEntityTypeControl(player, FARM_TYPES[r.selection], stats[r.selection], false);
    }).catch(() => {});
}

function openMobCleanup(player) {
    const dim   = world.getDimension("overworld");
    const stats = getEntityStats(dim, MOB_TYPES, true);

    const bodyLines = MOB_TYPES.map((m, i) => {
        const n   = stats[i].total;
        const sev = mobSev(n);
        return `${sev.sym} §f${m.name}: ${sev.color}${n} §8— ${sev.badge}`;
    }).join("\n");

    const form = new ActionFormData()
        .title("§c§lMob Ostili")
        .body(`§7Seleziona tipo per impostare un cap, oppure uccidi tutti.\n\n${bodyLines}`);

    for (let i = 0; i < MOB_TYPES.length; i++) {
        const n   = stats[i].total;
        const sev = mobSev(n);
        form.button(`${sev.sym} §0${MOB_TYPES[i].name} §8[${sev.color}${n}§8]`);
    }
    form.button("§c§l⚠ THANOS SNAP §r§8(tutti i mob)");
    form.button("§0« Indietro");

    form.show(player).then(r => {
        const killAll = MOB_TYPES.length;
        const back    = MOB_TYPES.length + 1;
        if (r.canceled || r.selection === back) { openEntityManager(player); return; }
        if (r.selection === killAll) {
            confirmThanos(player,
                "TUTTI i mob ostili (zombie, scheletri, creeper...) verranno eliminati.",
                () => {
                    let total = 0;
                    const perType = [];
                    for (const m of MOB_TYPES) {
                        const entities = [...dim.getEntities({ type: m.type })];
                        let killed = 0;
                        for (const e of entities) try { e.kill(); killed++; total++; } catch {}
                        if (killed > 0) perType.push(`§f${m.name} §8×§e${killed}`);
                    }
                    world.sendMessage(`§5§l✦ THANOS SNAP §r§7— §f${player.name} §7ha schioccato le dita.\n§8${perType.join("  ")}§8  |  Totale: §c${total}`);
                    openMobCleanup(player);
                },
                () => openMobCleanup(player)
            );
            return;
        }
        openEntityTypeControl(player, MOB_TYPES[r.selection], stats[r.selection], true);
    }).catch(() => {});
}

function openEntityTypeControl(player, entityType, stats, isMob) {
    const count      = isMob ? stats.total : stats.unnamed;
    const sev        = isMob ? mobSev(count) : farmSev(count);
    const maxSlider  = Math.max(count, 1);
    const defaultKeep = isMob ? 0 : Math.min(20, Math.floor(count / 2));

    const label = isMob
        ? `${sev.badge}  §8(${count} presenti)\n\n§fQuanti tenerne? §8(0 = uccidi tutti)`
        : `${sev.badge}  §8(${count} anonimi, §a${stats.named} nominati al sicuro)\n\n§fQuanti anonimi tenere?`;

    new ModalFormData()
        .title(`§l${isMob ? "§c" : "§a"}Controllo: ${entityType.name}`)
        .slider(label, 0, maxSlider, 1, defaultKeep)
        .show(player).then(r => {
            if (r.canceled) { isMob ? openMobCleanup(player) : openFarmCleanup(player); return; }
            const keepCount = r.formValues[0];
            const dim  = world.getDimension("overworld");
            const all  = [...dim.getEntities({ type: entityType.type })];
            const pool = isMob ? all : all.filter(e => !e.nameTag || e.nameTag.trim() === "");
            const toKill = pool.slice(keepCount);
            let killed = 0;
            for (const e of toKill) try { e.kill(); killed++; } catch {}
            const after   = pool.length - killed;
            const sevAfter = isMob ? mobSev(after) : farmSev(after);
            player.sendMessage(
                killed > 0
                    ? `§c[Cleanup] §f${entityType.name}: §c${killed} eliminati §8→ rimasti ${sevAfter.color}${after} ${sevAfter.badge}`
                    : `§a[Cleanup] §f${entityType.name} già entro il limite.`
            );
            isMob ? openMobCleanup(player) : openFarmCleanup(player);
        }).catch(() => {});
}

function openMissions(player) {
    const en = player.hasTag("sara");
    const done = [], active = [], todo = [];
    for (const [key, q] of Object.entries(QUESTS)) {
        const qname = en ? (q.name_en || q.name) : q.name;
        const rep   = REPEATABLE_QUESTS.has(key) ? (en ? " §7(daily)" : " §7(giorn.)") : "";
        if (isQuestDone(player, key)) {
            done.push(`§2✓ §f${qname}${rep} §8· ${q.npc}`);
        } else if (player.hasTag(`q_${key}`)) {
            const prog = getQuestProgress(player, key, en);
            const rdy  = prog.done ? (en ? " §a[READY]" : " §a[PRONTA]") : "";
            active.push(`§6▶ §f${qname}${rep}${rdy} §8· ${q.npc}\n  §7${prog.text}`);
        } else {
            todo.push(`§8○ §7${qname}${rep} §8· ${q.npc} §8(§6+${q.reward} ◆§8)`);
        }
    }
    const total = Object.keys(QUESTS).length;
    const header = en
        ? `§e§lQUESTS  §f${done.length}§7/${total} complete\n`
        : `§e§lMISSIONI  §f${done.length}§7/${total} completate\n`;
    const lines  = [header];
    if (active.length) { lines.push(en ? "§6§lIN PROGRESS" : "§6§lIN CORSO");   lines.push(...active, ""); }
    if (todo.length)   { lines.push(en ? "§7§lTO DO"       : "§7§lDA FARE");    lines.push(...todo,   ""); }
    if (done.length)   { lines.push(en ? "§a§lCOMPLETED"   : "§a§lCOMPLETE");  lines.push(...done); }

    new MessageFormData()
        .title(en ? "§l§eQuests" : "§l§eMissioni")
        .body(lines.join("\n"))
        .button1(en ? "§0« Back" : "§0« Indietro")
        .button2(en ? "§8Close" : "§8Chiudi")
        .show(player).then(r => { if (r.selection === 0) openDashboard(player); })
        .catch(() => {});
}

function openDailyMissions(player) {
    const en = player.hasTag("sara");
    const doneLines = [], activeLines = [], todoLines = [];
    for (const key of REPEATABLE_QUESTS) {
        const q = QUESTS[key];
        if (!q) continue;
        const qname = en ? (q.name_en || q.name) : q.name;
        const done  = isQuestDone(player, key);
        const active = player.hasTag(`q_${key}`);
        const prog   = active ? getQuestProgress(player, key, en) : null;
        if (done) {
            doneLines.push(`§2✓ §f${qname} §8· ${q.npc} §8(§6+${q.reward} ◆§8)`);
        } else if (active) {
            const rdy = prog.done ? (en ? " §a[READY]" : " §a[PRONTA]") : "";
            activeLines.push(`§6▶ §f${qname}${rdy} §8· ${q.npc} §8(§6+${q.reward} ◆§8)\n  §7${prog.text}`);
        } else {
            todoLines.push(`§8○ §7${qname} §8· ${q.npc} §8(§6+${q.reward} ◆§8)`);
        }
    }
    const lines = [en ? `§a§lDAILY QUESTS\n` : `§a§lMISSIONI GIORNALIERE\n`];
    if (activeLines.length) { lines.push(en ? "§6§lIN PROGRESS" : "§6§lIN CORSO");   lines.push(...activeLines, ""); }
    if (todoLines.length)   { lines.push(en ? "§7§lTO DO"       : "§7§lDA FARE");    lines.push(...todoLines,   ""); }
    if (doneLines.length)   { lines.push(en ? "§a§lCOMPLETED"   : "§a§lCOMPLETE");  lines.push(...doneLines); }

    new MessageFormData()
        .title(en ? "§l§aDaily Quests" : "§l§aGiornaliere")
        .body(lines.join("\n"))
        .button1(en ? "§0« Back" : "§0« Indietro")
        .button2(en ? "§8Close" : "§8Chiudi")
        .show(player).then(r => { if (r.selection === 0) openDashboard(player); })
        .catch(() => {});
}



// ── TELEPORT HUB ──────────────────────────────────────────────────────────────

function openTeleport(player) {
    const form = new ActionFormData()
        .title("§l§bTeletrasporto")
        .body("§7Scegli una opzione:")
        .button("§bWarp")
        .button("§dCommunity Warp")
        .button("§eSet TP")
        .button("§5TP Friend")
        .button("§0< Indietro");

    form.show(player).then(r => {
        if (r.canceled || r.selection === 4) { openDashboard(player); return; }
        if (r.selection === 0) openServerWarps(player);
        if (r.selection === 1) openCommunityWarps(player);
        if (r.selection === 2) openSetTP(player);
        if (r.selection === 3) openTpFriend(player);
    }).catch(() => {});
}

function openTpFriend(player) {
    const others = world.getAllPlayers().filter(p => p.name !== player.name);

    const form = new ActionFormData()
        .title("§l§dTP Friend")
        .body(others.length > 0 ? "§7Scegli un giocatore:" : "§7Nessun altro giocatore online.");

    for (const p of others) form.button(`§0${p.name}`);
    form.button("§0< Indietro");

    form.show(player).then(r => {
        if (r.canceled || r.selection === others.length) { openTeleport(player); return; }
        const target = others[r.selection];
        if (!target) { openTeleport(player); return; }
        player.sendMessage(`§d[TP Friend] §fTi teletrasporto da §f${target.name}§f tra 1 secondo...`);
        const targetName = target.name;
        system.runTimeout(() => {
            const online = world.getAllPlayers().find(p => p.name === targetName);
            if (!online) { player.sendMessage(`§c[TP Friend] §f${targetName} ha lasciato il server.`); return; }
            player.teleport(online.location, { dimension: online.dimension });
            player.sendMessage(`§d[TP Friend] §fSei da §f${online.name}§f!`);
        }, 20);
    }).catch(() => {});
}

// ── SET TP (ex Casa) ──────────────────────────────────────────────────────────

function openSetTP(player) {
    const hx = player.getDynamicProperty("home_x");
    const hasHome = hx !== undefined;

    const form = new ActionFormData()
        .title("§l§eSet TP")
        .body(hasHome
            ? `§8Punto TP impostato a §8(${Math.floor(hx)}, ${Math.floor(player.getDynamicProperty("home_y"))}, ${Math.floor(player.getDynamicProperty("home_z"))})`
            : "§8Nessun punto TP impostato.")
        .button("§eImposta TP")
        .button(hasHome ? "§aTorna al TP" : "§8Torna al TP")
        .button("§0< Indietro");

    form.show(player).then(r => {
        if (r.canceled || r.selection === 2) { openTeleport(player); return; }
        if (r.selection === 0) {
            const { x, y, z } = player.location;
            player.setDynamicProperty("home_x", x);
            player.setDynamicProperty("home_y", y);
            player.setDynamicProperty("home_z", z);
            player.setDynamicProperty("home_dim", player.dimension.id);
            player.sendMessage(`§e[Set TP] §fPunto impostato a §f(${Math.floor(x)}, ${Math.floor(y)}, ${Math.floor(z)})`);
            openTeleport(player);
        } else if (r.selection === 1) {
            if (!hasHome) { player.sendMessage("§c[Set TP] Nessun punto impostato."); openTeleport(player); return; }
            player.sendMessage("§e[Set TP] §fTi teletrasporto tra 1 secondo...");
            system.runTimeout(() => {
                const dim = world.getDimension(player.getDynamicProperty("home_dim") ?? "overworld");
                player.teleport(
                    { x: player.getDynamicProperty("home_x"), y: player.getDynamicProperty("home_y"), z: player.getDynamicProperty("home_z") },
                    { dimension: dim }
                );
                player.sendMessage("§e[Set TP] §fArrivato!");
            }, 20);
        }
    }).catch(() => {});
}

// ── WARPS ─────────────────────────────────────────────────────────────────────

const SERVER_WARPS = {
    spawn:           { x:  138.31, y:  72.00, z:  -115.38, dim: "overworld", name: "§aSpawn" },
    supercoolvillage:{ x: -391.14, y:  90.00, z:  -434.57, dim: "overworld", name: "§bSupercool Village" },
    dirreah:         { x: -615.38, y: 113.00, z: -1452.64, dim: "overworld", name: "§eDirreah Village" },
};

function loadWarps() {
    try {
        const raw = world.getDynamicProperty("custom_warps");
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}

function saveWarps(warps) {
    world.setDynamicProperty("custom_warps", JSON.stringify(warps));
}

function loadDeletedWarps() {
    try {
        const raw = world.getDynamicProperty("deleted_warps");
        if (!raw) return {};
        const all = JSON.parse(raw);
        const now = Date.now();
        // filtra quelli scaduti (> 1 ora)
        const valid = {};
        for (const [k, v] of Object.entries(all)) {
            if (now - v.deletedAt < 3_600_000) valid[k] = v;
        }
        return valid;
    } catch { return {}; }
}

function saveDeletedWarps(deleted) {
    world.setDynamicProperty("deleted_warps", JSON.stringify(deleted));
}

function openServerWarps(player) {
    const entries = Object.entries(SERVER_WARPS);
    const form = new ActionFormData()
        .title("§l§bWarp")
        .body("§7Destinazioni del server:");

    for (const [, w] of entries) form.button(`${w.name}\n§8★ server`);
    form.button("§0< Indietro");

    form.show(player).then(r => {
        if (r.canceled || r.selection === entries.length) { openTeleport(player); return; }
        const [, warp] = entries[r.selection];
        player.sendMessage(`§b[Warp] §fTi teletrasporto a ${warp.name}§f tra 1 secondo...`);
        system.runTimeout(() => {
            player.teleport({ x: warp.x, y: warp.y, z: warp.z }, { dimension: world.getDimension(warp.dim) });
            player.sendMessage(`§b[Warp] §fArrivato a ${warp.name}§f!`);
        }, 20);
    }).catch(() => {});
}

function openCommunityWarps(player) {
    const warps   = loadWarps();
    const entries = Object.entries(warps);
    const deleted = loadDeletedWarps();
    const hasDeleted = Object.keys(deleted).length > 0;

    const form = new ActionFormData()
        .title("§l§dCommunity Warp")
        .body(entries.length > 0 ? "§7Warp aggiunti dalla community:" : "§7Nessun warp aggiunto ancora.");

    for (const [, w] of entries) {
        form.button(`§b${w.name}\n§8(${Math.floor(w.x)}, ${Math.floor(w.y)}, ${Math.floor(w.z)}) - ${w.creator}`);
    }

    const extras = [];
    form.button("§a+ Aggiungi");                                        extras.push("add");
    if (entries.length > 0) { form.button("§c- Elimina");              extras.push("delete"); }
    if (hasDeleted)          { form.button("§6⌛ Eliminati recenti");   extras.push("history"); }
    form.button("§0< Indietro");                                        extras.push("back");

    form.show(player).then(r => {
        if (r.canceled) { openTeleport(player); return; }
        if (r.selection < entries.length) {
            const [, warp] = entries[r.selection];
            player.sendMessage(`§d[Community Warp] §fTi teletrasporto a §b${warp.name}§f tra 1 secondo...`);
            system.runTimeout(() => {
                player.teleport({ x: warp.x, y: warp.y, z: warp.z }, { dimension: world.getDimension(warp.dim) });
                player.sendMessage(`§d[Community Warp] §fArrivato a §b${warp.name}§f!`);
            }, 20);
            return;
        }
        const action = extras[r.selection - entries.length];
        if (action === "add")     addWarp(player);
        if (action === "delete")  deleteWarpMenu(player);
        if (action === "history") showDeletedWarps(player);
        if (action === "back")    openTeleport(player);
    }).catch(() => {});
}

function addWarp(player) {
    new ModalFormData()
        .title("§l§bAggiungi Warp")
        .textField("Nome del warp:", "es. base-principale")
        .show(player).then(r => {
            if (r.canceled) { openCommunityWarps(player); return; }
            const name = (r.formValues[0] ?? "").trim();
            if (!name) {
                player.sendMessage("§c[Warp] Nome non valido.");
                openCommunityWarps(player);
                return;
            }
            const key = name.toLowerCase().replace(/\s+/g, "_");
            const warps = loadWarps();
            if (warps[key] || SERVER_WARPS[key]) {
                player.sendMessage(`§c[Warp] Esiste già un warp chiamato "${name}".`);
                openCommunityWarps(player);
                return;
            }
            const { x, y, z } = player.location;
            warps[key] = { name, x, y, z, dim: player.dimension.id, creator: player.name, createdAt: Date.now() };
            saveWarps(warps);
            world.sendMessage(`§b[Community Warp] §f${player.name} ha aggiunto §b${name}§f! §8(${Math.floor(x)}, ${Math.floor(y)}, ${Math.floor(z)})`);
            openCommunityWarps(player);
        }).catch(() => {});
}

function deleteWarpMenu(player) {
    const warps   = loadWarps();
    const entries = Object.entries(warps);

    const form = new ActionFormData()
        .title("§l§cElimina Community Warp")
        .body("§7Seleziona il warp da eliminare:");

    for (const [, w] of entries) {
        form.button(`§c${w.name}\n§8aggiunto da ${w.creator}`);
    }
    form.button("§0< Indietro");

    form.show(player).then(r => {
        if (r.canceled || r.selection === entries.length) { openCommunityWarps(player); return; }
        const [key, warp] = entries[r.selection];
        // sposta nei cancellati
        const deleted = loadDeletedWarps();
        deleted[key] = { ...warp, deletedBy: player.name, deletedAt: Date.now() };
        saveDeletedWarps(deleted);
        delete warps[key];
        saveWarps(warps);
        world.sendMessage(`§c[Community Warp] §f${player.name} ha eliminato §c${warp.name}§f.`);
        openCommunityWarps(player);
    }).catch(() => {});
}

function showDeletedWarps(player) {
    const deleted = loadDeletedWarps();
    const entries = Object.entries(deleted);
    const now     = Date.now();

    const lines = ["§c§lWARP ELIMINATI §7(ultim'ora)\n"];
    for (const [, w] of entries) {
        const minLeft = Math.ceil((3_600_000 - (now - w.deletedAt)) / 60_000);
        lines.push(`§c${w.name} §8(${Math.floor(w.x)}, ${Math.floor(w.y)}, ${Math.floor(w.z)})`);
        lines.push(`  §7Aggiunto da: §f${w.creator} §7— Eliminato da: §f${w.deletedBy} §7— scade tra §e${minLeft} min`);
    }

    new MessageFormData()
        .title("§l§cEliminati Recenti")
        .body(lines.join("\n"))
        .button1("§0< Indietro")
        .button2("§8Chiudi")
        .show(player).then(r => { if (r.selection === 0) openCommunityWarps(player); })
        .catch(() => {});
}

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

function teleportToLastDeath(player) {
    const loc = lastDeathLocation.get(player.name);
    if (!loc) {
        player.sendMessage("§5[Cultista] §fNon ricordo dove sei caduto... Muori prima.");
        return;
    }
    player.sendMessage("§5[Cultista] §fPreparati... il viaggio inizia tra 1 secondo.");
    system.runTimeout(() => {
        const dim = world.getDimension(loc.dimensionId);
        player.teleport({ x: loc.x, y: loc.y, z: loc.z }, { dimension: dim });
        player.sendMessage(`§5[Cultista] §fEccoti dove hai lasciato la tua vita. §7(${loc.x}, ${loc.y}, ${loc.z})`);
    }, 20);
}
