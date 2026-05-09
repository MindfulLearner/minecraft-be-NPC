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
    saddle:            { name: "Saddle",            price: 70,  amount: 1 },
    name_tag:          { name: "Name Tag",          price: 32,  amount: 1 },
    sponge:            { name: "Sponge",            price: 55,  amount: 1 },
    ender_pearl:       { name: "Ender Pearls",      price: 32,  amount: 2 },
    lead:              { name: "Lead",              price: 25,  amount: 1 },
    spyglass:          { name: "Spyglass",          price: 32,  amount: 1 },
    lodestone:         { name: "Lodestone",         price: 85,  amount: 1 },
    recovery_compass:  { name: "Recovery Compass",  price: 65,  amount: 1 },
    shield:            { name: "Shield",            price: 32,  amount: 1 },
    crossbow:          { name: "Crossbow",          price: 50,  amount: 1 },
    firework_rocket:   { name: "Fireworks x3",      price: 18,  amount: 3 },
    bundle:            { name: "Bundle",            price: 50,  amount: 1 },
    lightning_rod:     { name: "Lightning Rod",     price: 45,  amount: 1 },
    amethyst_shard:    { name: "Amethyst x4",       price: 20,  amount: 4 },
    lantern:           { name: "Lanterns x4",       price: 16,  amount: 4 },
    mace:              { name: "Mace",              price: 180, amount: 1 },
    wind_charge:       { name: "Wind Charge x4",    price: 40,  amount: 4 },
    trial_key:         { name: "Trial Key",         price: 75,  amount: 1 },
    goat_horn:         { name: "Goat Horn",         price: 32,  amount: 1 },
};

const SELL = {
    oak_log:    { name: "Oak Log x512",   amount: 512, reward: 1 },
    wheat:      { name: "Wheat x512",     amount: 512, reward: 1 },
    iron_ingot: { name: "Iron x64",       amount: 64,  reward: 1 },
    stone:      { name: "Stone x512",     amount: 512, reward: 1 },
    sand:       { name: "Sand x384",      amount: 384, reward: 1 },
    bone:       { name: "Bone x128",      amount: 128, reward: 1 },
    string:     { name: "String x384",    amount: 384, reward: 1 },
    arrow:      { name: "Arrows x384",    amount: 384, reward: 1 },
    gunpowder:  { name: "Gunpowder x64",  amount: 64,  reward: 1 },
    flint:      { name: "Flint x512",     amount: 512, reward: 1 },
};

// ── FABBRO ────────────────────────────────────────────────────────────────────

const SHOP_FABBRO = {
    netherite_scrap:      { name: "Netherite Scrap",     price: 150,  amount: 1 },
    diamond:              { name: "Diamond",             price: 130,  amount: 1 },
    totem_of_undying:     { name: "Totem of Undying",    price: 220,  amount: 1 },
    sea_lantern:          { name: "Sea Lantern",         price: 65,   amount: 1 },
    trident:              { name: "Trident",             price: 170,  amount: 1 },
    nether_star:          { name: "Nether Star",         price: 500,  amount: 1 },
    wither_skeleton_skull:{ name: "Wither Skull",        price: 130,  amount: 1 },
    elytra:               { name: "Elytra",              price: 3500, amount: 1 },
    heart_of_the_sea:     { name: "Heart of the Sea",    price: 260,  amount: 1 },
    netherite_ingot:      { name: "Netherite Ingot",     price: 2000, amount: 1 },
    iron_sword_fa1:       { typeId: "iron_sword", name: "§cFlaming Sword I",  price: 100,  amount: 1, enchants: { fire_aspect: 1 } },
    iron_sword_fa2:       { typeId: "iron_sword", name: "§4Flaming Sword II", price: 170,  amount: 1, enchants: { fire_aspect: 2 } },
    beacon:               { name: "Beacon",              price: 800,  amount: 1 },
    respawn_anchor:       { name: "Respawn Anchor",      price: 200,  amount: 1 },
    dragon_egg:           { name: "Dragon Egg",          price: 5000, amount: 1 },
    netherite_upgrade_smithing_template: { name: "Netherite Upgrade Template", price: 700, amount: 1 },
};

const SELL_FABBRO = {
    ancient_debris:  { name: "Ancient Debris x3",   amount: 3,   reward: 1 },
    obsidian:        { name: "Obsidian x192",        amount: 192, reward: 1 },
    prismarine:      { name: "Prismarine x192",      amount: 192, reward: 1 },
    iron_ingot:      { name: "Iron Ingots x128",     amount: 128, reward: 1 },
    gold_ingot:      { name: "Gold Ingots x64",      amount: 64,  reward: 1 },
    raw_copper:      { name: "Raw Copper x256",      amount: 256, reward: 1 },
    quartz:          { name: "Quartz x192",          amount: 192, reward: 1 },
    blaze_rod:       { name: "Blaze Rods x64",       amount: 64,  reward: 1 },
    ender_pearl:     { name: "Ender Pearls x64",     amount: 64,  reward: 1 },
    netherite_scrap: { name: "Netherite Scrap x3",   amount: 3,   reward: 1 },
};

// ── CONTADINA ─────────────────────────────────────────────────────────────────

const SHOP_CONTADINA = {
    golden_apple:            { name: "Golden Apple",           price: 100, amount: 1 },
    slimeball:               { name: "Slimeball x4",          price: 45,  amount: 4 },
    honey_bottle:            { name: "Honey x2",              price: 30,  amount: 2 },
    nether_wart:             { name: "Nether Wart x4",        price: 30,  amount: 4 },
    golden_carrot:           { name: "Golden Carrot x2",      price: 75,  amount: 2 },
    chorus_fruit:            { name: "Chorus Fruit x4",       price: 45,  amount: 4 },
    blaze_powder:            { name: "Blaze Powder x4",       price: 45,  amount: 4 },
    enchanted_golden_apple:  { name: "Enchanted Golden Apple",price: 500, amount: 1 },
    glow_berries:            { name: "Glow Berries x8",       price: 22,  amount: 8 },
    torchflower_seeds:       { name: "Torchflower Seeds x2",  price: 55,  amount: 2 },
    cake:                    { name: "Cake",                  price: 55,  amount: 1 },
    glow_ink_sac:            { name: "Glow Ink Sac x8",       price: 38,  amount: 8 },
    honeycomb:               { name: "Honeycomb x8",          price: 35,  amount: 8 },
    book_silk:     { typeId: "enchanted_book", name: "Book: Silk Touch I",        price: 180, amount: 1, enchants: { silk_touch: 1 } },
    book_luck_sea: { typeId: "enchanted_book", name: "Book: Luck of the Sea III", price: 150, amount: 1, enchants: { luck_of_the_sea: 3 } },
    book_lure3:    { typeId: "enchanted_book", name: "Book: Lure III",            price: 125, amount: 1, enchants: { lure: 3 } },
};

const SELL_CONTADINA = {
    sweet_berries:   { name: "Sweet Berries x512", amount: 512, reward: 1 },
    melon_slice:     { name: "Melon Slice x512",   amount: 512, reward: 1 },
    cactus:          { name: "Cactus x512",        amount: 512, reward: 1 },
    carrot:          { name: "Carrots x512",       amount: 512, reward: 1 },
    potato:          { name: "Potatoes x512",      amount: 512, reward: 1 },
    pumpkin:         { name: "Pumpkin x384",       amount: 384, reward: 1 },
    bamboo:          { name: "Bamboo x512",        amount: 512, reward: 1 },
    "cc:strawberry": { name: "Strawberries x384",  amount: 384, reward: 1 },
    "cc:banana":     { name: "Bananas x256",       amount: 256, reward: 1 },
    "cc:coconut":    { name: "Coconut x128",       amount: 128, reward: 1 },
    "cc:lemon":      { name: "Lemons x384",        amount: 384, reward: 1 },
    "cc:orange":     { name: "Oranges x384",       amount: 384, reward: 1 },
    "cc:grape":      { name: "Grapes x384",        amount: 384, reward: 1 },
    "cc:pineapple":  { name: "Pineapple x256",     amount: 256, reward: 1 },
};

// ── ALCHIMISTA ────────────────────────────────────────────────────────────────

const SHOP_ALCHIMISTA = {
    phantom_membrane:    { name: "Phantom Membrane x2",    price: 85,  amount: 2 },
    shulker_shell:       { name: "Shulker Shell",          price: 150, amount: 1 },
    dragon_breath:       { name: "Dragon's Breath",        price: 175, amount: 1 },
    nautilus_shell:      { name: "Nautilus Shell x2",      price: 55,  amount: 2 },
    popped_chorus_fruit: { name: "Popped Chorus Fruit x4", price: 38,  amount: 4 },
    end_rod:             { name: "End Rods x4",            price: 30,  amount: 4 },
    echo_shard:          { name: "Echo Shard",             price: 90,  amount: 1 },
    wither_rose:         { name: "Wither Rose",            price: 55,  amount: 1 },
    sculk_catalyst:      { name: "Sculk Catalyst",         price: 90,  amount: 1 },
    ominous_bottle:      { name: "Ominous Bottle",         price: 60,  amount: 1 },
    conduit:             { name: "Conduit",                price: 400, amount: 1 },
    end_crystal:         { name: "End Crystal",            price: 150, amount: 1 },
    book_sharp3:      { typeId: "enchanted_book", name: "Book: Sharpness III",       price: 130, amount: 1, enchants: { sharpness: 3 } },
    book_sharp5:      { typeId: "enchanted_book", name: "Book: Sharpness V",         price: 280, amount: 1, enchants: { sharpness: 5 } },
    book_prot3:       { typeId: "enchanted_book", name: "Book: Protection III",      price: 130, amount: 1, enchants: { protection: 3 } },
    book_prot4:       { typeId: "enchanted_book", name: "Book: Protection IV",       price: 260, amount: 1, enchants: { protection: 4 } },
    book_eff3:        { typeId: "enchanted_book", name: "Book: Efficiency III",      price: 120, amount: 1, enchants: { efficiency: 3 } },
    book_fa1:         { typeId: "enchanted_book", name: "Book: Fire Aspect I",       price: 110, amount: 1, enchants: { fire_aspect: 1 } },
    book_fa2:         { typeId: "enchanted_book", name: "Book: Fire Aspect II",      price: 220, amount: 1, enchants: { fire_aspect: 2 } },
    book_looting3:    { typeId: "enchanted_book", name: "Book: Looting III",         price: 240, amount: 1, enchants: { looting: 3 } },
    book_ff4:         { typeId: "enchanted_book", name: "Book: Feather Falling IV",  price: 140, amount: 1, enchants: { feather_falling: 4 } },
    book_power5:      { typeId: "enchanted_book", name: "Book: Power V",             price: 200, amount: 1, enchants: { power: 5 } },
    book_unbreaking3: { typeId: "enchanted_book", name: "Book: Unbreaking III",      price: 180, amount: 1, enchants: { unbreaking: 3 } },
    book_mending:     { typeId: "enchanted_book", name: "Book: Mending",             price: 500, amount: 1, enchants: { mending: 1 } },
    book_thorns3:     { typeId: "enchanted_book", name: "Book: Thorns III",          price: 160, amount: 1, enchants: { thorns: 3 } },
    book_depth3:      { typeId: "enchanted_book", name: "Book: Depth Strider III",   price: 150, amount: 1, enchants: { depth_strider: 3 } },
    book_swift3:      { typeId: "enchanted_book", name: "Book: Swift Sneak III",     price: 220, amount: 1, enchants: { swift_sneak: 3 } },
    book_resp3:       { typeId: "enchanted_book", name: "Book: Respiration III",     price: 140, amount: 1, enchants: { respiration: 3 } },
    book_loyalty3:    { typeId: "enchanted_book", name: "Book: Loyalty III",         price: 200, amount: 1, enchants: { loyalty: 3 } },
    book_channeling:  { typeId: "enchanted_book", name: "Book: Channeling",          price: 280, amount: 1, enchants: { channeling: 1 } },
    book_riptide3:    { typeId: "enchanted_book", name: "Book: Riptide III",         price: 360, amount: 1, enchants: { riptide: 3 } },
};

const SELL_ALCHIMISTA = {
    magma_cream:          { name: "Magma Cream x64",          amount: 64,  reward: 1 },
    fermented_spider_eye: { name: "Fermented Spider Eye x32", amount: 32,  reward: 1 },
    chorus_fruit:         { name: "Chorus Fruit x128",        amount: 128, reward: 1 },
    ghast_tear:           { name: "Ghast Tear x16",           amount: 16,  reward: 1 },
    nether_brick:         { name: "Nether Brick x192",        amount: 192, reward: 1 },
    fire_charge:          { name: "Fire Charge x32",          amount: 32,  reward: 1 },
    rabbit_foot:          { name: "Rabbit's Foot x32",        amount: 32,  reward: 1 },
    blaze_powder:         { name: "Blaze Powder x64",         amount: 64,  reward: 1 },
    phantom_membrane:     { name: "Phantom Membrane x32",     amount: 32,  reward: 1 },
};

// ── OVAIOLO ───────────────────────────────────────────────────────────────────

const SHOP_OVAIOLO = {
    wolf_spawn_egg:       { name: "Wolf Egg",        price: 75,   amount: 1 },
    horse_spawn_egg:      { name: "Horse Egg",       price: 100,  amount: 1 },
    donkey_spawn_egg:     { name: "Donkey Egg",      price: 70,   amount: 1 },
    rabbit_spawn_egg:     { name: "Rabbit Egg",      price: 45,   amount: 1 },
    bee_spawn_egg:        { name: "Bee Egg",         price: 70,   amount: 1 },
    axolotl_spawn_egg:    { name: "Axolotl Egg",     price: 90,   amount: 1 },
    panda_spawn_egg:      { name: "Panda Egg",       price: 135,  amount: 1 },
    fox_spawn_egg:        { name: "Fox Egg",         price: 75,   amount: 1 },
    ocelot_spawn_egg:     { name: "Ocelot Egg",      price: 60,   amount: 1 },
    cat_spawn_egg:        { name: "Cat Egg",         price: 60,   amount: 1 },
    parrot_spawn_egg:     { name: "Parrot Egg",      price: 62,   amount: 1 },
    frog_spawn_egg:       { name: "Frog Egg",        price: 55,   amount: 1 },
    goat_spawn_egg:       { name: "Goat Egg",        price: 62,   amount: 1 },
    llama_spawn_egg:      { name: "Llama Egg",       price: 85,   amount: 1 },
    turtle_spawn_egg:     { name: "Turtle Egg",      price: 75,   amount: 1 },
    polar_bear_spawn_egg: { name: "Polar Bear Egg",  price: 75,   amount: 1 },
    camel_spawn_egg:      { name: "Camel Egg",       price: 125,  amount: 1 },
    armadillo_spawn_egg:  { name: "Armadillo Egg",   price: 70,   amount: 1 },
    strider_spawn_egg:    { name: "Strider Egg",     price: 62,   amount: 1 },
    mooshroom_spawn_egg:  { name: "Mooshroom Egg",   price: 105,  amount: 1 },
    hoglin_spawn_egg:     { name: "Hoglin Egg",      price: 70,   amount: 1 },
    enderman_spawn_egg:   { name: "Enderman Egg",    price: 85,   amount: 1 },
    phantom_spawn_egg:    { name: "Phantom Egg",     price: 100,  amount: 1 },
    sniffer_spawn_egg:    { name: "Sniffer Egg",     price: 150,  amount: 1 },
    allay_spawn_egg:      { name: "Allay Egg",       price: 120,  amount: 1 },
    breeze_spawn_egg:     { name: "Breeze Egg",      price: 200,  amount: 1 },
    warden_spawn_egg:     { name: "Warden Egg",      price: 400,  amount: 1 },
    tadpole_spawn_egg:    { name: "Tadpole Egg",     price: 40,   amount: 1 },
    glow_squid_spawn_egg: { name: "Glow Squid Egg",  price: 50,   amount: 1 },
    iron_golem_spawn_egg: { name: "Iron Golem Egg",  price: 160,  amount: 1 },
};

const SELL_OVAIOLO = {
    egg:              { name: "Eggs x512",           amount: 512, reward: 1 },
    feather:          { name: "Feathers x512",       amount: 512, reward: 1 },
    white_wool:       { name: "Wool x512",           amount: 512, reward: 1, typeIds: WOOL_IDS },
    leather:          { name: "Leather x256",        amount: 256, reward: 1 },
    rabbit_hide:      { name: "Rabbit Hide x384",    amount: 384, reward: 1 },
    armadillo_scute:  { name: "Armadillo Scute x64", amount: 64,  reward: 1 },
};

// ── BISCAZZIERE (SLOT + CASSE) ────────────────────────────────────────────────

const SLOT_SYMBOLS = [
    { id: "♦", display: "§b§l♦§r", weight: 48 },  // ×2  — 48% → ♦♦♦ ~11%
    { id: "♣", display: "§a§l♣§r", weight: 28 },  // ×3  — 28% → ♣♣♣ ~2.2%
    { id: "♥", display: "§a§l♥§r", weight: 14 },  // ×5  — 14% → ♥♥♥ ~0.27%
    { id: "♠", display: "§6§l♠§r", weight: 7  },  // ×10 — 7%  → ♠♠♠ ~0.034%
    { id: "★", display: "§c§l★§r", weight: 2  },  // ×40 — 2%  → ★★★ ~0.0008%
    { id: "✦", display: "§d§l✦§r", weight: 1  },  // ×200— 1%  → ✦✦✦ ~0.0001%
];
const SLOT_PAYOUTS = { "♦": 2, "♣": 3, "♥": 5, "♠": 10, "★": 40, "✦": 200 };

const SLOT_LOSS_LINES = [
    (bet)      => `§c§lLost. §r§7The machine keeps your §c${bet} gems§7. The jackpot grows.`,
    (bet)      => `§7Nothing. §8The §d✦ §7jackpot sits unclaimed — §d${bet * 200} gems§8 waiting for someone.`,
    (bet)      => `§c-${bet} gems. §7The house wins. §8It always does... until it doesn't.`,
    (_bet)     => `§7Bad luck. §8The odds don't remember the last spin. §7Try again.`,
    (bet)      => `§cEmpty hands. §7-${bet} gems. §8Every loss is one step closer to the jackpot.`,
    (_bet)     => `§7The reels mocked you. §8They do that. §7Show them who's boss.`,
];
const SLOT_NEAR_LINES = [
    (sym)      => `§6§lQUASI! §r§72× ${sym} §8— one reel away from a fortune. §7So close.`,
    (_sym)     => `§6§lSO CLOSE! §r§7Two matched. The third was just warming up. §8One more?`,
    (sym)      => `§6QUASI! §7The machine showed you ${sym}${sym}... §8then laughed.`,
    (_sym)     => `§6Two matched! §7The jackpot is §lteasing§r§7 you. §8Don't let it win.`,
    (_sym)     => `§6QUASI! §8That last reel. §7It always comes down to the last reel.`,
];
const SLOT_WIN_LINES = [
    (win, mult) => `§a§lWIN! §r§f×${mult} → +${win} gems! §7Not bad. §8The §d✦ §7jackpot is still out there...`,
    (win, mult) => `§a+${win} gems! §7×${mult} — a start. §8You're on a roll. Keep going?`,
    (win, mult) => `§a§l✓ §r§f+${win} gems. §7×${mult} win. §8The machine is being generous today.`,
];

const CASSE_POOLS = {
const CASSE_POOLS = {
    // Base 15g — eggs ~0.8% chance
    base: {
        cost: 15, pityMax: 12, pityObj: "pity_bas", label: "§7Base",
        items: [
            { id: "minecraft:bread",             amount: 8,  weight: 88,  name: "Bread x8" },
            { id: "minecraft:cooked_beef",       amount: 4,  weight: 72,  name: "Steak x4" },
            { id: "minecraft:string",            amount: 8,  weight: 56,  name: "String x8" },
            { id: "minecraft:bone",              amount: 4,  weight: 48,  name: "Bones x4" },
            { id: "cc:ruby",                    amount: 5,  weight: 40,  name: "5 Gems" },
            { id: "minecraft:arrow",             amount: 8,  weight: 40,  name: "Arrows x8" },
            { id: "cc:ruby",                    amount: 15, weight: 20,  name: "§a15 Gems",     rare: true },
            { id: "minecraft:chicken_spawn_egg", amount: 1,  weight: 1,   name: "§aChicken Egg", rare: true },
            { id: "minecraft:pig_spawn_egg",     amount: 1,  weight: 1,   name: "§aPig Egg",     rare: true },
            { id: "minecraft:sheep_spawn_egg",   amount: 1,  weight: 1,   name: "§aSheep Egg",   rare: true },
        ],
    },
    // Comune 30g — eggs ~0.8% chance
    comune: {
        cost: 30, pityMax: 8, pityObj: "pity_com", label: "§fComune", goldenTicketChance: 0.001,
        items: [
            { id: "minecraft:bread",             amount: 4,  weight: 56,  name: "Bread x4" },
            { id: "minecraft:apple",             amount: 4,  weight: 48,  name: "Apples x4" },
            { id: "minecraft:cooked_porkchop",   amount: 4,  weight: 40,  name: "Porkchop x4" },
            { id: "minecraft:firework_rocket",   amount: 2,  weight: 32,  name: "Fireworks x2" },
            { id: "cc:ruby",                    amount: 10, weight: 32,  name: "10 Gems" },
            { id: "minecraft:lead",              amount: 1,  weight: 28,  name: "Lead" },
            { id: "minecraft:name_tag",          amount: 1,  weight: 24,  name: "§aName Tag",     rare: true },
            { id: "cc:ruby",                    amount: 30, weight: 20,  name: "§a30 Gems",       rare: true },
            { id: "minecraft:golden_apple",      amount: 1,  weight: 12,  name: "§6Golden Apple", rare: true },
            { id: "cc:capybara_spawn_egg",       amount: 1,  weight: 1,   name: "§aCapybara Egg", rare: true },
            { id: "cc:penguin_spawn_egg",        amount: 1,  weight: 1,   name: "§aPenguin Egg",  rare: true },
            { id: "cc:deer_spawn_egg",           amount: 1,  weight: 1,   name: "§aDeer Egg",     rare: true },
        ],
    },
    // Rara 50g — eggs ~1% chance
    rara: {
        cost: 50, pityMax: 7, pityObj: "pity_rar", label: "§bRara", goldenTicketChance: 0.005,
        items: [
            { id: "cc:ruby",                    amount: 20, weight: 48,  name: "20 Gems" },
            { id: "minecraft:diamond",           amount: 2,  weight: 40,  name: "Diamonds x2" },
            { id: "minecraft:golden_apple",      amount: 2,  weight: 32,  name: "Golden Apples x2" },
            { id: "minecraft:ender_pearl",       amount: 4,  weight: 28,  name: "Ender Pearls x4" },
            { id: "cc:ruby",                    amount: 50, weight: 28,  name: "§a50 Gems",    rare: true },
            { id: "minecraft:trident",           amount: 1,  weight: 24,  name: "§bTrident",    rare: true },
            { id: "_book_fortune3",              amount: 1,  weight: 20,  name: "§aFortune III", rare: true,
              special: { typeId: "minecraft:enchanted_book", enchants: { fortune: 3 } } },
            { id: "_book_looting3",              amount: 1,  weight: 20,  name: "§aLooting III", rare: true,
              special: { typeId: "minecraft:enchanted_book", enchants: { looting: 3 } } },
            { id: "minecraft:totem_of_undying",  amount: 1,  weight: 16,  name: "§aTotem",      rare: true },
            { id: "cc:bear_spawn_egg",           amount: 1,  weight: 1,   name: "§6Bear Egg",   rare: true },
            { id: "cc:owl_spawn_egg",            amount: 1,  weight: 1,   name: "§6Owl Egg",    rare: true },
            { id: "cc:fox_spawn_egg",            amount: 1,  weight: 1,   name: "§6Fox Egg",    rare: true },
            { id: "cc:moose_spawn_egg",          amount: 1,  weight: 1,   name: "§6Moose Egg",  rare: true },
        ],
    },
    // Epica 100g — eggs ~1% chance
    epica: {
        cost: 100, pityMax: 6, pityObj: "pity_epi", label: "§dEpica", goldenTicketChance: 0.010,
        items: [
            { id: "cc:ruby",                    amount: 50,  weight: 32,  name: "50 Gems" },
            { id: "minecraft:diamond",           amount: 4,   weight: 28,  name: "Diamonds x4" },
            { id: "minecraft:netherite_ingot",   amount: 1,   weight: 32,  name: "§6Netherite Ingot", rare: true },
            { id: "_book_mending",               amount: 1,   weight: 28,  name: "§6Mending Book", rare: true,
              special: { typeId: "minecraft:enchanted_book", enchants: { mending: 1 } } },
            { id: "cc:ruby",                    amount: 100, weight: 24,  name: "§a100 Gems",  rare: true },
            { id: "minecraft:totem_of_undying",  amount: 2,   weight: 20,  name: "§aTotem x2", rare: true },
            { id: "_book_silk",                  amount: 1,   weight: 16,  name: "§aSilk Touch", rare: true,
              special: { typeId: "minecraft:enchanted_book", enchants: { silk_touch: 1 } } },
            { id: "cc:eagle_spawn_egg",          amount: 1,   weight: 1,   name: "§bEagle Egg",     rare: true },
            { id: "cc:shark_spawn_egg",          amount: 1,   weight: 1,   name: "§bShark Egg",     rare: true },
            { id: "cc:elephant_spawn_egg",       amount: 1,   weight: 1,   name: "§bElephant Egg",  rare: true },
            { id: "cc:orangutan_spawn_egg",      amount: 1,   weight: 1,   name: "§bOrangutan Egg", rare: true },
        ],
    },
    // Leggendaria 200g — eggs ~1% chance
    leggendaria: {
        cost: 200, pityMax: 5, pityObj: "pity_leg", label: "§6Leggendaria", goldenTicketChance: 0.015,
        items: [
            { id: "cc:ruby",                    amount: 100, weight: 32,  name: "100 Gems" },
            { id: "minecraft:diamond",           amount: 6,   weight: 28,  name: "Diamonds x6" },
            { id: "minecraft:netherite_ingot",   amount: 2,   weight: 28,  name: "§6Netherite Ingot x2", rare: true },
            { id: "_book_mending",               amount: 1,   weight: 24,  name: "§6Mending Book", rare: true,
              special: { typeId: "minecraft:enchanted_book", enchants: { mending: 1 } } },
            { id: "minecraft:elytra",            amount: 1,   weight: 20,  name: "§c§lElytra",           rare: true },
            { id: "minecraft:nether_star",       amount: 1,   weight: 16,  name: "§fNether Star",         rare: true },
            { id: "_sword_of_darkness",          amount: 1,   weight: 16,  name: "§5§lSword of Darkness", rare: true,
              special: { typeId: "minecraft:netherite_sword", enchants: { sharpness: 5, fire_aspect: 2, looting: 3, unbreaking: 3, mending: 1 } } },
            { id: "minecraft:beacon",            amount: 1,   weight: 12,  name: "§e§lBeacon",    rare: true },
            { id: "cc:ruby",                    amount: 200, weight: 12,  name: "§a200 Gems",     rare: true },
            { id: "minecraft:dragon_egg",        amount: 1,   weight: 4,   name: "§4§lDragon Egg", rare: true },
            { id: "cc:whale_spawn_egg",          amount: 1,   weight: 1,   name: "§bWhale Egg",    rare: true },
            { id: "cc:cassowary_spawn_egg",      amount: 1,   weight: 1,   name: "§bCassowary Egg",rare: true },
            { id: "cc:crocodile_spawn_egg",      amount: 1,   weight: 1,   name: "§2Crocodile Egg",rare: true },
            { id: "cc:scorpion_spawn_egg",       amount: 1,   weight: 1,   name: "§4Scorpion Egg", rare: true },
            { id: "cc:hermit_spawn_egg",         amount: 1,   weight: 1,   name: "§9Hermit Egg",   rare: true },
            { id: "minecraft:warden_spawn_egg",  amount: 1,   weight: 1,   name: "§4§lWarden Egg", rare: true },
        ],
    },
};

// ── RANKS ────────────────────────────────────────────────────────────────────

const RANKS = [
    { min: 0,  name: "Straniero",    color: "§7" },
    { min: 3,  name: "Avventuriero", color: "§e" },
    { min: 8,  name: "Cacciatore",   color: "§6" },
    { min: 15, name: "Veterano",     color: "§9" },
    { min: 25, name: "Leggenda",     color: null  },
];
const RAINBOW = ["§c","§6","§e","§a","§b","§9","§d"];

function getRank(pts) {
    let r = RANKS[0];
    for (const rank of RANKS) if (pts >= rank.min) r = rank;
    return r;
}

// ── QUESTS ────────────────────────────────────────────────────────────────────

const QUESTS = {
    // Cultista
    taglialegna:     { name: "The Woodcutter",      reward: 1,  npc: "Cultista" },
    ossa:            { name: "Bone Commission",     reward: 1,  npc: "Cultista" },
    sfama:           { name: "Feed the Cult",       reward: 1,  npc: "Cultista" },
    buio:            { name: "In the Dark",         reward: 1,  npc: "Cultista" },
    creeper:         { name: "The Green Threat",    reward: 1,  npc: "Cultista" },
    // Cultista advanced
    niss_anime:      { name: "Lost Souls",          reward: 1,  npc: "Cultista" },
    niss_piglin:     { name: "Nether Blood",        reward: 1,  npc: "Cultista" },
    niss_sacrificio: { name: "The Sacrifice",       reward: 1,  npc: "Cultista" },
    niss_wither:     { name: "The Final Ritual",    reward: 1,  npc: "Cultista" },
    // Fisherman
    piero_pesce:     { name: "The First Catch",     reward: 1,  npc: "Old Piero" },
    piero_salmone:   { name: "Bitter Flavors",      reward: 1,  npc: "Old Piero" },
    piero_tropicale: { name: "Revenge Begins",      reward: 1,  npc: "Old Piero" },
    // Fisherman advanced
    piero_prismarina: { name: "Ocean Treasures",   reward: 1,  npc: "Old Piero" },
    piero_guardiani:  { name: "The Reckoning",     reward: 1,  npc: "Old Piero" },
    piero_tridente:   { name: "The Weapon",        reward: 1,  npc: "Old Piero" },
    piero_elder:      { name: "The Elder Guardian",reward: 1,  npc: "Old Piero" },
    // Hunter
    elena_zombie:    { name: "The First Trial",     reward: 1,  npc: "Elena" },
    elena_scheletri: { name: "Iron Bones",          reward: 1,  npc: "Elena" },
    elena_vacche:    { name: "For the Village",     reward: 1,  npc: "Elena" },
    elena_polli:     { name: "Guaranteed Dinner",   reward: 1,  npc: "Elena" },
    // Hunter advanced
    elena_blaze:     { name: "Fire and Blood",      reward: 1,  npc: "Elena" },
    elena_wither_sk: { name: "Black Bones",         reward: 1,  npc: "Elena" },
    elena_phantom:   { name: "Endless Night",       reward: 1,  npc: "Elena" },
    elena_wither:    { name: "The Final Hunt",      reward: 1,  npc: "Elena" },
    // Builder
    marco_ciottoli:  { name: "Solid Foundations",   reward: 1,  npc: "Marco" },
    marco_quercia:   { name: "Oak Beams",           reward: 1,  npc: "Marco" },
    marco_carbone:   { name: "Lights for All",      reward: 1,  npc: "Marco" },
    marco_ghiaia:    { name: "Cobblestone Path",    reward: 1,  npc: "Marco" },
    // Builder advanced
    marco_ferro_oro:  { name: "Solid Structure",    reward: 1,  npc: "Marco" },
    marco_ossidiana:  { name: "Eternal Foundations",reward: 1,  npc: "Marco" },
    marco_nether:     { name: "From the Nether",    reward: 1,  npc: "Marco" },
    marco_netherite:  { name: "The Rare Material",  reward: 1,  npc: "Marco" },
    // Decorator
    sofia_fiori:     { name: "Blooming Garden",     reward: 1,  npc: "Sofia" },
    sofia_lana:      { name: "Warmth and Color",    reward: 1,  npc: "Sofia" },
    sofia_colorante: { name: "The Palette",         reward: 1,  npc: "Sofia" },
    sofia_bamboo:    { name: "Green Corner",        reward: 1,  npc: "Sofia" },
    // Decorator advanced
    sofia_vetro_glow:    { name: "Glowing Windows",    reward: 1,  npc: "Sofia" },
    sofia_sculk:         { name: "From the Deep",      reward: 1,  npc: "Sofia" },
    sofia_prisma:        { name: "Marine Treasures",   reward: 1,  npc: "Sofia" },
    sofia_candele_miele: { name: "Light and Sweetness",reward: 1,  npc: "Sofia" },
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
    "Digging straight down is stupid. You know it. You do it anyway.",
    "The mine calls. The mine stinks. You go anyway.",
    "Y=-58. The only place where you find diamonds and the will to live.",
    "You ate something weird in the Nether. Your gut already knows.",
    "Dirreah Village: the name was a warning. Nobody got it.",
    "The creeper exploded. The inventory weeps. Your hands tremble.",
    "You've been digging for 2 hours. You found 3 rocks and a depression.",
    "The lava under your feet is almost as hot as your stomach after the Nether.",
    "Every diamond found is a lie you tell yourself to keep digging.",
    "You fell into a villager's pit. Welcome to Minecraft.",
    "The tunnel you dug leads where you didn't want. As always.",
    "You need iron. You found granite. 64 times.",
    "Someone built a house above an abandoned mine full of gas. That's you.",
    "Mining marble sucks. Mining gravel sucks more. Do it anyway.",
    "The Nether doesn't stink. You stink. The Nether judges you.",
    "You lost your diamonds in lava. Grief processing time: now.",
    "A skeleton shot you while you were AFK. Karma.",
    "Dirreah isn't just a village. It's a state of mind. And a stomach.",
    "You survived the night. Your inventory wasn't so lucky.",
    "The sound of rain in Minecraft is relaxing. The sound of creepers is not.",
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

const REPEATABLE_QUESTS = new Set();

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
    try { world.scoreboard.addObjective("quest_punti",  "§eQuests Completed"); } catch {}
    try { world.scoreboard.addObjective("pvp_kills",    "§cPvP Kills"); } catch {}
    try { world.scoreboard.addObjective("pvp_deaths",  "§7PvP Deaths"); } catch {}
    try { world.scoreboard.addObjective("total_deaths","§cTotal Deaths"); } catch {}
    for (const obj of ["pity_bas","pity_com","pity_rar","pity_epi","pity_leg"])
        try { world.scoreboard.addObjective(obj, obj); } catch {}
    try {
        world.scoreboard.setDisplayAtDisplaySlot("sidebar", {
            objective: world.scoreboard.getObjective("quest_punti")
        });
    } catch {}
});

// ── BOOT NPC RESET ────────────────────────────────────────────────────────────
const BOOT_RESETS = [
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
    ["biscazziere", "biscazziere_main"],
];
let _bootResetDone = false;

// ── EVENTS ────────────────────────────────────────────────────────────────────

world.afterEvents.playerSpawn.subscribe((ev) => {
    if (!ev.initialSpawn) return;
    if (!_bootResetDone) {
        _bootResetDone = true;
        system.runTimeout(() => {
            const dim = world.getDimension("overworld");
            try { dim.runCommand("scoreboard objectives setdisplay sidebar quest_punti descending"); } catch {}
            for (const [tag, scene] of BOOT_RESETS) {
                try { dim.runCommand(`dialogue change @e[tag=${tag}] ${scene}`); } catch {}
            }
        }, 60); // ~3 second delay for chunks to load
    }
    sessionStart.set(ev.player.name, Date.now());
    system.runTimeout(() => updateNameTag(ev.player), 20);
    const online = world.getAllPlayers().length;
    world.sendMessage(`§a[Server] §f${ev.player.name} joined. §7(${online} online)`);
    if (online === 1) ev.player.sendMessage("§7You're alone. The server is yours.");
    const frase = FRASI_DEL_GIORNO[Math.floor(Date.now() / 86400000) % FRASI_DEL_GIORNO.length];
    ev.player.sendMessage(`§7[Quote of the Day] §f${frase}`);
});

world.afterEvents.playerLeave.subscribe((ev) => {
    const start = sessionStart.get(ev.playerName);
    if (!start) return;
    const ms = Date.now() - start;
    const h  = Math.floor(ms / 3600000);
    const m  = Math.floor((ms % 3600000) / 60000);
    const t  = h > 0 ? `${h}h ${m}m` : `${m}m`;
    world.sendMessage(`§7[Server] §f${ev.playerName} played for §e${t}§f this session.`);
    sessionStart.delete(ev.playerName);
});

// ── RESET MOB KILLS + PURGA CASUALE (random 15-30 min) ───────────────────────
const MOB_KILL_OBJS = ["q_el_zombie", "q_creeper", "q_ossa", "q_el_scheletri"];

const MOB_QUIP = {
    "minecraft:zombie":     ["§a⚔ §2GOODBYE ZOMBIES! §r§7The dead should stay dead.", "§2ZOMBIES PURGED! §7The village breathes again."],
    "minecraft:skeleton":   ["§7💀 §fSKELETONS DISSOLVED! §7Bones return to the earth.", "§8CLACK CLACK... §7nothing. §fSkeletons eliminated!"],
    "minecraft:creeper":    ["§a§lSSSSS— §r§2PUFF! §7Goodbye Creeper, no explosions today.", "§2CREEPERS ANNIHILATED! §7The ground is safe."],
    "minecraft:spider":     ["§8🕷 SPIDERS SQUASHED! §7The web is empty.", "§8Goodbye spiders! §7No venomous bites today."],
    "minecraft:enderman":   ["§5ENDERMEN GONE! §7The darkness is silent.", "§5Goodbye Endermen! §8...don't look them in the eyes."],
    "minecraft:drowned":    ["§bDROWNED REMOVED! §7The sea is clean again.", "§3Bubble bubble bubble... §bGoodbye Drowned!"],
    "minecraft:witch":      ["§d🧙 WITCHES DISSOLVED! §7No more potions.", "§dCackle cackle cackle! §7The witches are gone."],
    "minecraft:phantom":    ["§1👻 PHANTOMS VANISHED! §7The sky is free.", "§1Goodbye Phantoms! §7Sleep more, people."],
    "minecraft:pillager":   ["§c🏹 PILLAGERS DRIVEN OFF! §7The village is safe.", "§cGOODBYE PILLAGERS! §8TOOT— §7silence."],
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
            player.sendMessage(`§c[Reset] §fYour counters have been reset: §e${reset.join(", ")}`);
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
            world.sendMessage(quip + ` §8(${killed} eliminated)`);
        }
    }

    if (totalKilled === 0)
        world.sendMessage("§7[Purge] §fNo mobs found. The world is peaceful... for now.");

    scheduleMobReset();
}

function mobResetCountdown(sec) {
    if (sec === 3)
        world.sendMessage("§c§l⚠ §r§7Purge incoming in §c3 seconds§7! Mobs have nowhere to run.");
    else
        world.sendMessage(`§c[Purge] §7... §e${sec}§7 ...`);
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
    world.sendMessage(`§6[Cleanup] §fRemoved §e${count}§f items from the ground.`);
    scheduleItemCleanup();
}

function itemCleanupCountdown(sec) {
    if (sec === 30) {
        world.sendMessage(`§6[Cleanup] §eWARNING! §fGround items will be removed in §e30 seconds§f! Pick them up!`);
        system.runTimeout(() => itemCleanupCountdown(10), 400);
        return;
    }
    world.sendMessage(`§6[Cleanup] §fItem removal in §e${sec}§f seconds...`);
    if (sec <= 1) { system.runTimeout(doItemCleanup, 20); return; }
    system.runTimeout(() => itemCleanupCountdown(sec - 1), 20);
}

function scheduleItemCleanup() {
    const ticks = Math.floor(Math.random() * 72000) + 72000; // 72000-144000 tick = 1-2 ore
    system.runTimeout(() => {
        world.sendMessage("§6[Cleanup] §eWARNING! §fGround items will be removed in §e10 minutes§f! Pick them up!");
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
        world.sendMessage("§6[Happy Hour] §fDouble XP active! Kill mobs for bonus XP.");
    } else if (!active && happyHourActive) {
        happyHourActive = false;
        world.sendMessage("§7[Happy Hour] §fOver. See you next time!");
    }
}, 200);

// ── ITEM USE (subscriber unificato) ──────────────────────────────────────────
world.afterEvents.itemUse.subscribe((ev) => {
    const { source: player, itemStack: item } = ev;
    if (item.typeId === "minecraft:compass") {
        system.runTimeout(() => openDashboard(player), 1);
    } else if (item.typeId === "minecraft:book" && item.nameTag === "§eQuest Book") {
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
        world.sendMessage(`§7[Night] §f${sleeping}/${players.length} players sleeping. §eEarly dawn!`);
    }
}, 100);

// Track: Taglialegna (64 oak_log)
world.afterEvents.playerBreakBlock.subscribe((ev) => {
    const { player, brokenBlockPermutation } = ev;
    if (!player.hasTag("q_taglialegna") || brokenBlockPermutation.type.id !== "minecraft:oak_log") return;
    const obj = world.scoreboard.getObjective("q_taglialegna");
    const n = getScore(obj, player) + 1;
    if (n > 64) return;
    obj.setScore(player, n);
    player.sendMessage(n >= 64
        ? "§5[Cultista] 64 logs cut. Come back to me."
        : `§7[Quest] Logs: ${n}/64`
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
        world.sendMessage(`§c[PvP] §f${player.name} eliminated ${dead.name}!`);
    }
    trackKill(player, deadType, "minecraft:skeleton",       "q_ossa",         25, "§5[Cultista]", "Skeletons");
    trackKill(player, deadType, "minecraft:creeper",        "q_creeper",      15, "§5[Cultista]", "Creepers");
    trackKill(player, deadType, "minecraft:zombie",         "q_el_zombie",    20, "§6[Elena]",    "Zombies");
    trackKill(player, deadType, "minecraft:skeleton",       "q_el_scheletri", 25, "§6[Elena]",    "Skeletons");
    trackKill(player, deadType, "minecraft:cow",            "q_el_vacche",    15, "§6[Elena]",    "Cows");
    trackKill(player, deadType, "minecraft:chicken",        "q_el_polli",     15, "§6[Elena]",    "Chickens");
    trackKill(player, deadType, "minecraft:guardian",       "q_piero_guard",  12, "§b[Old Piero]","Guardians");
    trackKill(player, deadType, "minecraft:elder_guardian", "q_piero_elder",   1, "§b[Old Piero]","Elder Guardian");
    trackKill(player, deadType, "minecraft:blaze",          "q_el_blaze",     25, "§6[Elena]",    "Blazes");
    trackKill(player, deadType, "minecraft:wither_skeleton","q_el_wsk",       20, "§6[Elena]",    "Wither Skeletons");
    trackKill(player, deadType, "minecraft:phantom",        "q_el_phantom",   15, "§6[Elena]",    "Phantoms");
    trackKill(player, deadType, "minecraft:wither",         "q_el_wither",     1, "§6[Elena]",    "Wither");
    trackKill(player, deadType, "minecraft:piglin_brute",   "q_niss_piglin",  15, "§5[Niss]",     "Piglin Brutes");
    trackKill(player, deadType, "minecraft:wither",         "q_niss_wither",   1, "§5[Niss]",     "Wither");
});

// Track: Nel Buio (Y ≤ 30)
system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        if (!player.hasTag("q_buio") || player.hasTag("q_buio_ready")) continue;
        if (player.location.y <= 30) {
            player.addTag("q_buio_ready");
            player.sendMessage("§5[Cultista] You've gone deep enough. Come back to me.");
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
        if (player.hasTag("cultista_avanzato")) {
            system.runTimeout(() => openQuestForm(player, "cultista", true), 10);
        } else {
            player.sendMessage("§5[Cultist] §cYou are not yet worthy of the rites.\n§7Complete the trials first.");
        }
    }
    else if (action === "hub_accesso") {
        const npc = ev.id.split(":")[0];
        const cfg = {
            pescatore:   { tag: "piero_avanzato",       msg: "§b[Old Piero] §cYou haven't earned it yet.\n§7Fish for me first." },
            cacciatrice: { tag: "cacciatrice_avanzato", msg: "§6[Elena] §cYou're not ready yet.\n§7Prove you can hunt." },
            costruttore: { tag: "costruttore_avanzato", msg: "§9[Marco] §cAdvanced projects aren't for you yet.\n§7Bring me the basics first." },
            decoratrice: { tag: "decoratrice_avanzato", msg: "§d[Sofia] §cNot yet! Help me with the simple things first." },
        }[npc];
        if (!cfg) return;
        if (player.hasTag(cfg.tag)) {
            system.runTimeout(() => openQuestForm(player, npc, true), 10);
        } else {
            player.sendMessage(cfg.msg);
        }
    }
    else if (ev.id === "slot:bet")   runSlot(player, parseInt(msg) || 0);
    else if (ev.id === "slot:allin") runAllIn(player);
    else if (ev.id === "slot:open")  system.runTimeout(() => openSlotBetPicker(player), 5);
    else if (ev.id === "cassa:apri")         openCassa(player, msg);
    else if (ev.id === "blackjack:start")    bjStart(player, parseInt(msg));
    else if (ev.id === "blackjack:showhand") bjShowHand(player);
    else if (ev.id === "blackjack:hit")      bjHit(player);
    else if (ev.id === "blackjack:stand")    bjStand(player);
    else if (ev.id === "blackjack:double")   bjDouble(player);
    else if (ev.id === "blackjack:quit")     bjQuit(player);
    else if (action === "balance") {
        const n = countItem(player, "cc:ruby");
        player.onScreenDisplay.setActionBar(`§eRubies: §f${n} §c◆`);
    }
}, { namespaces: ["cultista", "shop", "pescatore", "cacciatrice", "costruttore", "decoratrice", "fabbro", "contadina", "alchimista", "ovaiolo", "dashboard", "biscazziere", "slot", "cassa", "blackjack"] });

// ── SHOP LOGIC ────────────────────────────────────────────────────────────────

function showGems(player) {
    const n = countItem(player, "cc:ruby");
    player.onScreenDisplay.setActionBar(`§eRubies: §f${n} §c◆`);
}

function buyItem(player, itemId, shopMap, npcName) {
    const item = shopMap[itemId];
    if (!item) return;
    const gemme = countItem(player, "cc:ruby");
    if (gemme < item.price) {
        player.sendMessage(`§c[${npcName}] Not enough gems. Need ${item.price}, you have ${gemme}.`);
        showGems(player);
        return;
    }
    player.runCommand(`clear @s cc:ruby 0 ${item.price}`);
    if (item.enchants) {
        giveSpecialItem(player, `minecraft:${item.typeId ?? itemId}`, item.name, item.enchants);
    } else {
        player.runCommand(`give @s ${itemId} ${item.amount}`);
    }
    world.sendMessage(`§6[${npcName}] §f${player.name} bought: §e${item.name}§f. -${item.price} gems.`);
    showGems(player);
}

function sellItem(player, itemId, sellMap, npcName) {
    const item = sellMap[itemId];
    if (!item) return;
    const resolvedId = item.typeIds ? null : (itemId.includes(":") ? itemId : `minecraft:${itemId}`);
    const count = item.typeIds ? countItems(player, item.typeIds) : countItem(player, resolvedId);
    if (count < item.amount) {
        player.sendMessage(`§c[${npcName}] Not enough. Need ${item.amount} ${item.name.split(" x")[0]}, you have ${count}.`);
        showGems(player);
        return;
    }
    if (item.typeIds) clearItems(player, item.typeIds, item.amount);
    else player.runCommand(`clear @s ${resolvedId} 0 ${item.amount}`);
    player.runCommand(`give @s cc:ruby ${item.reward}`);
    player.sendMessage(`§6[${npcName}] §fSold: §e${item.name}§f. +${item.reward} gems.`);
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
        player.runCommand(`give @s cc:ruby ${reward}`);
        totalGems += reward;
        sold.push(item.name.split(" x")[0]);
    }
    if (totalGems > 0) {
        player.sendMessage(`§a[${npcName}] Sold everything: §f${sold.join(", ")}§a. Total: §f+${totalGems} gems!`);
    } else {
        player.sendMessage(`§c[${npcName}] You have nothing to sell.`);
    }
    showGems(player);
}

// ── QUEST LOGIC ───────────────────────────────────────────────────────────────

function acceptQuest(player, quest) {
    if (!QUESTS[quest]) return;
    if (isQuestDone(player, quest)) {
        player.sendMessage(REPEATABLE_QUESTS.has(quest)
            ? "§7You already completed this quest today. Come back tomorrow."
            : "§7You already completed this quest.");
        return;
    }
    if (player.hasTag(`q_${quest}`)) {
        const progress = getQuestProgress(player, quest);
        if (progress.done) {
            deliverQuest(player, quest);
        } else {
            player.sendMessage(`§6[In progress] §f${progress.text}`);
        }
        return;
    }
    player.addTag(`q_${quest}`);
    if (SCORE_OBJ[quest]) world.scoreboard.getObjective(SCORE_OBJ[quest]).setScore(player, 0);
    const reward = QUESTS[quest].reward;
    player.sendMessage(`§e[${QUESTS[quest].npc}] §fQuest accepted: §e${QUESTS[quest].name}§f  §6+${reward} ◆§f. Good luck!`);
}

function deliverQuest(player, quest) {
    if (!QUESTS[quest]) return;
    if (!player.hasTag(`q_${quest}`)) {
        player.sendMessage("§cYou don't have this quest active.");
        return;
    }
    const progress = getQuestProgress(player, quest);
    if (!progress.done) {
        player.sendMessage(`§c[Incomplete] §f${progress.text}`);
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
    if (quest === "sfama")              player.runCommand("clear @s bread 0 32");
    if (quest === "piero_pesce")        player.runCommand("clear @s cod 0 20");
    if (quest === "piero_salmone")      player.runCommand("clear @s salmon 0 20");
    if (quest === "piero_tropicale")    player.runCommand("clear @s tropical_fish 0 15");
    if (quest === "marco_ciottoli")     player.runCommand("clear @s cobblestone 0 128");
    if (quest === "marco_quercia")      player.runCommand("clear @s oak_log 0 64");
    if (quest === "marco_carbone")      player.runCommand("clear @s coal 0 32");
    if (quest === "marco_ghiaia")       player.runCommand("clear @s gravel 0 64");
    if (quest === "sofia_fiori")        clearItems(player, FLOWER_IDS, 32);
    if (quest === "sofia_lana")         clearItems(player, WOOL_IDS, 24);
    if (quest === "sofia_colorante")    clearItems(player, DYE_IDS, 16);
    if (quest === "sofia_bamboo")       player.runCommand("clear @s bamboo 0 32");
    // Advanced - consume items
    if (quest === "piero_prismarina") { player.runCommand("clear @s prismarine 0 64"); player.runCommand("clear @s prismarine_crystals 0 16"); player.runCommand("clear @s ink_sac 0 16"); }
    if (quest === "piero_tridente")   { player.runCommand("clear @s trident 0 1"); player.runCommand("clear @s nautilus_shell 0 8"); }
    if (quest === "marco_ferro_oro")  { player.runCommand("clear @s iron_ingot 0 128"); player.runCommand("clear @s gold_ingot 0 64"); }
    if (quest === "marco_ossidiana")  { player.runCommand("clear @s obsidian 0 64"); player.runCommand("clear @s crying_obsidian 0 16"); }
    if (quest === "marco_nether")     { player.runCommand("clear @s nether_brick 0 64"); player.runCommand("clear @s quartz 0 32"); }
    if (quest === "marco_netherite")  { player.runCommand("clear @s netherite_ingot 0 8"); }
    if (quest === "sofia_vetro_glow") { clearItems(player, STAINED_GLASS_IDS, 64); player.runCommand("clear @s glowstone 0 32"); }
    if (quest === "sofia_sculk")      { player.runCommand("clear @s sculk 0 32"); player.runCommand("clear @s sculk_sensor 0 8"); }
    if (quest === "sofia_prisma")     { player.runCommand("clear @s prismarine_bricks 0 64"); player.runCommand("clear @s sea_lantern 0 32"); }
    if (quest === "sofia_candele_miele") { clearItems(player, CANDLE_IDS, 32); player.runCommand("clear @s honeycomb 0 16"); player.runCommand("clear @s amethyst_shard 0 32"); }
    if (quest === "niss_anime")       { player.runCommand("clear @s soul_sand 0 64"); player.runCommand("clear @s soul_soil 0 32"); }
    if (quest === "elena_phantom")    player.runCommand("clear @s phantom_membrane 0 8");
    if (quest === "niss_sacrificio")  { player.runCommand("clear @s totem_of_undying 0 2"); player.runCommand("clear @s ghast_tear 0 8"); }

    // Reward
    const gold = QUESTS[quest].reward;
    player.runCommand(`give @s cc:ruby ${gold}`);

    const punti = world.scoreboard.getObjective("quest_punti");
    punti.setScore(player, getScore(punti, player) + 1);

    world.sendMessage(`§e[${QUESTS[quest].npc}] §f${player.name} §acompleted §e${QUESTS[quest].name}§f! §6+${gold} ◆`);

    // Sblocco avanzate
    checkUnlock(player, quest);
    // Premio finale
    checkFinalReward(player, quest);
}

function getQuestProgress(player, quest) {
    switch (quest) {
        case "taglialegna": { const n = getScore(world.scoreboard.getObjective("q_taglialegna"), player); return { done: n >= 64, text: `Logs: ${n}/64` }; }
        case "ossa":        { const n = getScore(world.scoreboard.getObjective("q_ossa"), player);        return { done: n >= 25, text: `Skeletons: ${n}/25` }; }
        case "creeper":     { const n = getScore(world.scoreboard.getObjective("q_creeper"), player);     return { done: n >= 15, text: `Creepers: ${n}/15` }; }
        case "sfama":       { const n = countItem(player, "minecraft:bread");                             return { done: n >= 32, text: `Bread: ${n}/32` }; }
        case "buio":        return { done: player.hasTag("q_buio_ready"), text: "You must go down to Y≤30." };
        case "piero_pesce":     { const n = countItem(player, "minecraft:cod");            return { done: n >= 20, text: `Cod: ${n}/20` }; }
        case "piero_salmone":   { const n = countItem(player, "minecraft:salmon");         return { done: n >= 20, text: `Salmon: ${n}/20` }; }
        case "piero_tropicale": { const n = countItem(player, "minecraft:tropical_fish");  return { done: n >= 15, text: `Tropical Fish: ${n}/15` }; }
        case "elena_zombie":    { const n = getScore(world.scoreboard.getObjective("q_el_zombie"),     player); return { done: n >= 20, text: `Zombies: ${n}/20` }; }
        case "elena_scheletri": { const n = getScore(world.scoreboard.getObjective("q_el_scheletri"), player); return { done: n >= 25, text: `Skeletons: ${n}/25` }; }
        case "elena_vacche":    { const n = getScore(world.scoreboard.getObjective("q_el_vacche"),    player); return { done: n >= 15, text: `Cows: ${n}/15` }; }
        case "elena_polli":     { const n = getScore(world.scoreboard.getObjective("q_el_polli"),     player); return { done: n >= 15, text: `Chickens: ${n}/15` }; }
        case "marco_ciottoli": { const n = countItem(player, "minecraft:cobblestone"); return { done: n >= 128, text: `Cobblestone: ${n}/128` }; }
        case "marco_quercia":  { const n = countItem(player, "minecraft:oak_log");     return { done: n >= 64,  text: `Logs: ${n}/64` }; }
        case "marco_carbone":  { const n = countItem(player, "minecraft:coal");        return { done: n >= 32,  text: `Coal: ${n}/32` }; }
        case "marco_ghiaia":   { const n = countItem(player, "minecraft:gravel");      return { done: n >= 64,  text: `Gravel: ${n}/64` }; }
        case "sofia_fiori":     { const n = countItems(player, FLOWER_IDS); return { done: n >= 32, text: `Flowers: ${n}/32` }; }
        case "sofia_lana":      { const n = countItems(player, WOOL_IDS);   return { done: n >= 24, text: `Wool: ${n}/24` }; }
        case "sofia_colorante": { const n = countItems(player, DYE_IDS);    return { done: n >= 16, text: `Dye: ${n}/16` }; }
        case "sofia_bamboo":    { const n = countItem(player, "minecraft:bamboo"); return { done: n >= 32, text: `Bamboo: ${n}/32` }; }
        case "piero_prismarina": {
            const p = countItem(player, "minecraft:prismarine");
            const c = countItem(player, "minecraft:prismarine_crystals");
            const i = countItem(player, "minecraft:ink_sac");
            return { done: p >= 64 && c >= 16 && i >= 16, text: `Prismarine: ${p}/64, Crystals: ${c}/16, Ink: ${i}/16` };
        }
        case "piero_guardiani": { const n = getScore(world.scoreboard.getObjective("q_piero_guard"), player); return { done: n >= 12, text: `Guardians: ${n}/12` }; }
        case "piero_tridente": {
            const t = countItem(player, "minecraft:trident");
            const n = countItem(player, "minecraft:nautilus_shell");
            return { done: t >= 1 && n >= 8, text: `Trident: ${t}/1, Nautilus: ${n}/8` };
        }
        case "piero_elder": { const n = getScore(world.scoreboard.getObjective("q_piero_elder"), player); return { done: n >= 1, text: `Elder Guardian: ${n}/1` }; }
        case "elena_blaze":     { const n = getScore(world.scoreboard.getObjective("q_el_blaze"),   player); return { done: n >= 25, text: `Blazes: ${n}/25` }; }
        case "elena_wither_sk": { const n = getScore(world.scoreboard.getObjective("q_el_wsk"),     player); return { done: n >= 20, text: `Wither Skeletons: ${n}/20` }; }
        case "elena_phantom": {
            const k = getScore(world.scoreboard.getObjective("q_el_phantom"), player);
            const m = countItem(player, "minecraft:phantom_membrane");
            return { done: k >= 15 && m >= 8, text: `Phantoms: ${k}/15, Membranes: ${m}/8` };
        }
        case "elena_wither": { const n = getScore(world.scoreboard.getObjective("q_el_wither"), player); return { done: n >= 1, text: `Wither: ${n}/1` }; }
        case "marco_ferro_oro": {
            const f = countItem(player, "minecraft:iron_ingot");
            const g = countItem(player, "minecraft:gold_ingot");
            return { done: f >= 128 && g >= 64, text: `Iron: ${f}/128, Gold: ${g}/64` };
        }
        case "marco_ossidiana": {
            const o = countItem(player, "minecraft:obsidian");
            const c = countItem(player, "minecraft:crying_obsidian");
            return { done: o >= 64 && c >= 16, text: `Obsidian: ${o}/64, Crying: ${c}/16` };
        }
        case "marco_nether": {
            const b = countItem(player, "minecraft:nether_brick");
            const q = countItem(player, "minecraft:quartz");
            return { done: b >= 64 && q >= 32, text: `Nether Brick: ${b}/64, Quartz: ${q}/32` };
        }
        case "marco_netherite": { const n = countItem(player, "minecraft:netherite_ingot"); return { done: n >= 8, text: `Netherite: ${n}/8` }; }
        case "sofia_vetro_glow": {
            const v = countItems(player, STAINED_GLASS_IDS);
            const g = countItem(player, "minecraft:glowstone");
            return { done: v >= 64 && g >= 32, text: `Stained Glass: ${v}/64, Glowstone: ${g}/32` };
        }
        case "sofia_sculk": {
            const s = countItem(player, "minecraft:sculk");
            const se = countItem(player, "minecraft:sculk_sensor");
            return { done: s >= 32 && se >= 8, text: `Sculk: ${s}/32, Sensor: ${se}/8` };
        }
        case "sofia_prisma": {
            const p = countItem(player, "minecraft:prismarine_bricks");
            const l = countItem(player, "minecraft:sea_lantern");
            return { done: p >= 64 && l >= 32, text: `Prismarine: ${p}/64, Sea Lanterns: ${l}/32` };
        }
        case "sofia_candele_miele": {
            const ca = countItems(player, CANDLE_IDS);
            const h  = countItem(player, "minecraft:honeycomb");
            const a  = countItem(player, "minecraft:amethyst_shard");
            return { done: ca >= 32 && h >= 16 && a >= 32, text: `Candles: ${ca}/32, Honey: ${h}/16, Amethyst: ${a}/32` };
        }
        case "niss_anime": {
            const ss = countItem(player, "minecraft:soul_sand");
            const so = countItem(player, "minecraft:soul_soil");
            return { done: ss >= 64 && so >= 32, text: `Soul Sand: ${ss}/64, Soul Soil: ${so}/32` };
        }
        case "niss_piglin": { const n = getScore(world.scoreboard.getObjective("q_niss_piglin"), player); return { done: n >= 15, text: `Piglin Brutes: ${n}/15` }; }
        case "niss_sacrificio": {
            const t = countItem(player, "minecraft:totem_of_undying");
            const g = countItem(player, "minecraft:ghast_tear");
            return { done: t >= 2 && g >= 8, text: `Totem: ${t}/2, Ghast Tears: ${g}/8` };
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
            player.sendMessage("§b[Old Piero] ...wait. Come back. I have something different to ask you.");
        }
    }
    if (!has("cacciatrice_avanzato") && ["elena_zombie","elena_scheletri","elena_vacche","elena_polli"].includes(quest)) {
        if (ever("elena_zombie") && ever("elena_scheletri") && ever("elena_vacche") && ever("elena_polli")) {
            player.addTag("cacciatrice_avanzato");
            player.sendMessage("§6[Elena] You've passed the basics. Get ready for something real.");
        }
    }
    if (!has("costruttore_avanzato") && ["marco_ciottoli","marco_quercia","marco_carbone","marco_ghiaia"].includes(quest)) {
        if (ever("marco_ciottoli") && ever("marco_quercia") && ever("marco_carbone") && ever("marco_ghiaia")) {
            player.addTag("costruttore_avanzato");
            player.sendMessage("§a[Marco] Great! I have more projects in mind... more ambitious ones.");
        }
    }
    if (!has("decoratrice_avanzato") && ["sofia_fiori","sofia_lana","sofia_colorante","sofia_bamboo"].includes(quest)) {
        if (ever("sofia_fiori") && ever("sofia_lana") && ever("sofia_colorante") && ever("sofia_bamboo")) {
            player.addTag("decoratrice_avanzato");
            player.sendMessage("§d[Sofia] You're fantastic! I have bigger ideas... come find me!");
        }
    }
    if (!has("cultista_avanzato") && ["taglialegna","ossa","sfama","buio","creeper"].includes(quest)) {
        if (ever("taglialegna") && ever("ossa") && ever("sfama") && ever("buio") && ever("creeper")) {
            player.addTag("cultista_avanzato");
            player.sendMessage("§5[Niss] The trials are complete. Now the true rites begin.");
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
        giveSpecialItem(player, "minecraft:trident", "§b§lAnna's Harpoon",
            { loyalty: 3, impaling: 5, riptide: 3, unbreaking: 3 });
        player.sendMessage("§b[Old Piero] Take this. It belonged to Anna.\n§3Don't forget her.");
        world.sendMessage(`§b[Old Piero] §f${player.name} completed Old Piero's story.`);
    }
    if (!player.hasTag("cacciatrice_finale") &&
        ["elena_blaze","elena_wither_sk","elena_phantom","elena_wither"].includes(quest) &&
        done("elena_blaze") && done("elena_wither_sk") && done("elena_phantom") && done("elena_wither")) {
        player.addTag("cacciatrice_finale");
        giveSpecialItem(player, "minecraft:bow", "§c§lHunter's Bow",
            { power: 5, punch: 2, flame: 1, infinity: 1, unbreaking: 3 });
        player.sendMessage("§6[Elena] I didn't expect you to make it. Take it. You've earned it.");
        world.sendMessage(`§6[Elena] §f${player.name} completed Elena's story.`);
    }
    if (!player.hasTag("costruttore_finale") &&
        ["marco_ferro_oro","marco_ossidiana","marco_nether","marco_netherite"].includes(quest) &&
        done("marco_ferro_oro") && done("marco_ossidiana") && done("marco_nether") && done("marco_netherite")) {
        player.addTag("costruttore_finale");
        giveSpecialItem(player, "minecraft:netherite_pickaxe", "§7§lMarco's Pickaxe",
            { fortune: 3, efficiency: 5, unbreaking: 3, silk_touch: 1 });
        player.sendMessage("§a[Marco] The village is almost ready. Thanks. Keep this — I used to use it.");
        world.sendMessage(`§a[Marco] §f${player.name} completed Marco's story.`);
    }
    if (!player.hasTag("decoratrice_finale") &&
        ["sofia_vetro_glow","sofia_sculk","sofia_prisma","sofia_candele_miele"].includes(quest) &&
        done("sofia_vetro_glow") && done("sofia_sculk") && done("sofia_prisma") && done("sofia_candele_miele")) {
        player.addTag("decoratrice_finale");
        giveSpecialItem(player, "minecraft:netherite_axe", "§d§lSofia's Brush",
            { silk_touch: 1, efficiency: 5, unbreaking: 3, mending: 1 });
        player.sendMessage("§d[Sofia] You're the best assistant I could have hoped for. Keep it — it's custom made.");
        world.sendMessage(`§d[Sofia] §f${player.name} completed Sofia's story.`);
    }
    if (!player.hasTag("cultista_finale") &&
        ["niss_anime","niss_piglin","niss_sacrificio","niss_wither"].includes(quest) &&
        done("niss_anime") && done("niss_piglin") && done("niss_sacrificio") && done("niss_wither")) {
        player.addTag("cultista_finale");
        giveSpecialItem(player, "minecraft:netherite_sword", "§5§lCult Seal",
            { sharpness: 5, fire_aspect: 2, looting: 3, unbreaking: 3, mending: 1 });
        player.sendMessage("§5[Niss] The rites are complete. Now you belong to the cult.\n§8...or perhaps the cult belongs to you.");
        world.sendMessage(`§5[Niss] §f${player.name} completed all the Cult's rites.`);
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

function updateNameTag(player, tick = 0) {
    const pts  = getScore(world.scoreboard.getObjective("quest_punti"), player);
    const rank = getRank(pts);
    const name = player.name;
    if (rank.color === null) {
        player.nameTag = name.split("").map((c, i) => RAINBOW[(tick + i) % RAINBOW.length] + c).join("");
    } else {
        player.nameTag = rank.color + name + "§r";
    }
}

function giveSpecialItem(player, typeId, name, enchants, lore) {
    try {
        const item = new ItemStack(typeId, 1);
        item.nameTag = name;
        if (lore) item.setLore(lore);
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
    const cfg = QUEST_GROUPS[npcId];
    if (!cfg) return;
    const isAdv   = advMode && cfg.adv;
    const quests  = isAdv ? cfg.adv.quests : cfg.base;
    const npcName = QUESTS[quests[0]].npc;

    const doneCount = quests.filter(k => isQuestDone(player, k)).length;
    const tierLabel = isAdv ? "§c[Advanced] §r" : "";
    const bodyHint  = `§f${doneCount}§7/${quests.length} complete  ·  §7§oTap to accept, check progress, or deliver.`;

    const form = new ActionFormData()
        .title(`§l${tierLabel}${npcName}`)
        .body(bodyHint);

    for (const key of quests) {
        const q      = QUESTS[key];
        const done   = isQuestDone(player, key);
        const active = player.hasTag(`q_${key}`);
        let label;
        if (done) {
            label = `§2✓ §f${q.name}`;
        } else if (active) {
            const prog = getQuestProgress(player, key);
            label = prog.done
                ? `§a§l▶ §r§f${q.name}\n§a  Ready to deliver!`
                : `§6● §f${q.name}\n§8  ${prog.text}`;
        } else {
            const repTag = REPEATABLE_QUESTS.has(key) ? " §7(daily)" : "";
            label = `§7○ §f${q.name}${repTag}\n§8  §6+${q.reward} ◆`;
        }
        form.button(label);
    }
    const hasAdv = !isAdv && cfg.adv && player.hasTag(cfg.adv.tag);
    if (hasAdv) form.button("§c§l» Advanced Quests");
    form.button("§0« Back");
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
            player.runCommand(`dialogue open @e[tag=${cfg.npcTag},r=5] @s ${cfg.npcTag}_intro`);
        }
    }).catch(() => {});
}

function openDashboard(player) {
    const loc     = lastDeathLocation.get(player.name);
    const isAdmin = player.hasTag("admin");
    const gems    = countItem(player, "cc:ruby");
    const qpts    = getScore(world.scoreboard.getObjective("quest_punti"), player);

    const form = new ActionFormData()
        .title("§l§6Quest Book")
        .body(`§c◆ §f${gems} rubies   §7·   §e${qpts} quests done`);

    form.button("§6» Quests");
    if (loc) form.button(`§c» Last Death §8(${loc.x}, ${loc.y}, ${loc.z})`);
    form.button("§b» Teleport");
    if (isAdmin) form.button("§c» Admin Panel");
    form.button("§8« Close");

    const base        = loc ? 2 : 1;
    const idxTeleport = base;
    const idxAdmin    = isAdmin ? base + 1 : -1;
    const idxClose    = base + (isAdmin ? 2 : 1);

    form.show(player).then(r => {
        if (r.canceled || r.selection === idxClose) return;
        if (r.selection === 0) openMissions(player);
        if (loc && r.selection === 1) teleportToLastDeath(player);
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
        ["biscazziere", "biscazziere_main"],
    ];

    new ActionFormData()
        .title("§c§lAdmin Panel")
        .body("§7Select an action:")
        .button("§e» Reset NPC")
        .button("§b» Clear Ground Items")
        .button("§a» Entity Manager")
        .button("§5» Manual Mob Purge")
        .button("§0« Close")
        .show(player).then(r => {
            if (r.canceled || r.selection === 4) { openDashboard(player); return; }
            const dim = world.getDimension("overworld");
            if (r.selection === 0) {
                let ok = 0;
                for (const [tag, scene] of RESETS) {
                    try { dim.runCommand(`dialogue change @e[tag=${tag}] ${scene}`); ok++; } catch {}
                }
                player.sendMessage(`§c[Admin] §fReset complete: §e${ok}/${RESETS.length} §fNPCs updated.`);
            } else if (r.selection === 1) {
                try { dim.runCommand("kill @e[type=item]"); } catch {}
                player.sendMessage("§c[Admin] §fGround items removed.");
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
    { name: "Chickens",  type: "minecraft:chicken" },
    { name: "Pigs",      type: "minecraft:pig"     },
    { name: "Cows",      type: "minecraft:cow"     },
    { name: "Sheep",     type: "minecraft:sheep"   },
    { name: "Rabbits",   type: "minecraft:rabbit"  },
    { name: "Cats",      type: "minecraft:cat"     },
    { name: "Horses",    type: "minecraft:horse"   },
    { name: "Turtles",   type: "minecraft:turtle"  },
    { name: "Pandas",    type: "minecraft:panda"   },
    { name: "Frogs",     type: "minecraft:frog"    },
    { name: "Donkeys",   type: "minecraft:donkey"  },
    { name: "Llamas",    type: "minecraft:llama"   },
];

const MOB_TYPES = [
    { name: "Zombie",    type: "minecraft:zombie"   },
    { name: "Skeleton",  type: "minecraft:skeleton" },
    { name: "Creeper",   type: "minecraft:creeper"  },
    { name: "Spider",    type: "minecraft:spider"   },
    { name: "Enderman",  type: "minecraft:enderman" },
    { name: "Drowned",   type: "minecraft:drowned"  },
    { name: "Witch",     type: "minecraft:witch"    },
    { name: "Phantom",   type: "minecraft:phantom"  },
    { name: "Pillager",  type: "minecraft:pillager" },
];

// Soglie: unnamed per animali, totale per mob
const FARM_THRESH = { warn: 20, high: 50, crit: 80 };
const MOB_THRESH  = { warn: 8,  high: 20, crit: 35 };

function farmSev(n) {
    if (n === 0)                  return { color: "§2", badge: "§2● OK",       sym: "§2✓" };
    if (n <= FARM_THRESH.warn)    return { color: "§a", badge: "§a● LOW",      sym: "§a·" };
    if (n <= FARM_THRESH.high)    return { color: "§e", badge: "§e▲ HIGH",     sym: "§e!" };
    if (n <= FARM_THRESH.crit)    return { color: "§6", badge: "§6▲ CRITICAL", sym: "§6!!" };
    return                               { color: "§c", badge: "§c■ EXTREME",  sym: "§c!!!" };
}

function mobSev(n) {
    if (n === 0)                 return { color: "§2", badge: "§2● NONE",     sym: "§2✓" };
    if (n <= MOB_THRESH.warn)    return { color: "§e", badge: "§e▲ SOME",     sym: "§e!" };
    if (n <= MOB_THRESH.high)    return { color: "§6", badge: "§6▲ MANY",     sym: "§6!!" };
    return                              { color: "§c", badge: "§c■ INVASION",  sym: "§c!!!" };
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
        world.sendMessage(`§c§l[⚠ OVERPOP] §r§7Entity overflow — use §eAdmin Panel §8> §eEntity Manager:\n${newAlerts.join("\n")}`);
    }
}, 20 * 60 * 5); // ogni 5 minuti

function confirmThanos(player, context, onConfirm, onCancel) {
    new MessageFormData()
        .title("§c§l⚠ THANOS SNAP ⚠")
        .body(`§c§lIRREVERSIBLE ACTION\n\n§f${context}\n\n§7Are you absolutely sure?`)
        .button1("§0✗ Cancel")
        .button2("§c§l✓ Yes, snap!")
        .show(player).then(r => {
            if (r.canceled || r.selection === 0) { onCancel(); return; }
            onConfirm();
        }).catch(() => onCancel());
}

function openMobPurge(player) {
    const dim   = world.getDimension("overworld");
    const stats = getEntityStats(dim, MOB_TYPES, true);

    const form = new ActionFormData()
        .title("§5§lManual Mob Purge")
        .body("§7Choose which mobs to purge with a chat message.\n§8Fun messages are sent to everyone.\n\n" +
            MOB_TYPES.map((m, i) => {
                const sev = mobSev(stats[i].total);
                return `${sev.sym} §f${m.name}: ${sev.color}${stats[i].total}`;
            }).join("\n"));

    for (let i = 0; i < MOB_TYPES.length; i++) {
        const sev = mobSev(stats[i].total);
        form.button(`${sev.sym} §0${MOB_TYPES[i].name} §8[${sev.color}${stats[i].total}§8]`);
    }
    form.button("§c§l⚠ THANOS SNAP §r§8(all mobs)");
    form.button("§0« Back Admin");

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
                    world.sendMessage(quip + ` §8(${killed} eliminated)`);
                }
            }
            if (isThanosAll && total > 0)
                world.sendMessage(`§5§l✦ THANOS SNAP §r§7— §f${player.name} §7cleaned it all up.\n§8${perType.join("  ")}§8  |  Total: §c${total}`);
            if (total === 0)
                player.sendMessage("§7[Purge] §fNo mobs found.");
            openMobPurge(player);
        };

        if (isThanosAll) {
            confirmThanos(player, "ALL hostile mobs will be eliminated with a chat message.", doPurge, () => openMobPurge(player));
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
        .title("§c§lEntity Manager")
        .body(
            `§7Server overview:\n` +
            `§fWorst unnamed animals: ${fSev.color}${farmWorst} ${fSev.badge}\n` +
            `§fWorst hostile mobs:    ${mSev.color}${mobWorst} ${mSev.badge}\n\n` +
            `§8Thanos Snap: unnamed animals > 30 + all mobs.`
        )
        .button(`${fSev.sym} §0Farm Animals`)
        .button(`${mSev.sym} §0Hostile Mobs`)
        .button("§c§l⚠ THANOS SNAP §r§8(animals+mobs)")
        .button(`§0↺ Reset Alerts §8(${_alertedEntities.size} active)`)
        .button("§0« Back Admin")
        .show(player).then(r => {
            if (r.canceled || r.selection === 4) { openAdminPanel(player); return; }
            if (r.selection === 0) { openFarmCleanup(player); return; }
            if (r.selection === 1) { openMobCleanup(player); return; }
            if (r.selection === 3) {
                _alertedEntities.clear();
                player.sendMessage("§7[Alert] §fAlerts reset — the system will warn again if needed.");
                openEntityManager(player);
                return;
            }
            confirmThanos(player,
                "Unnamed animals >30 per type + ALL hostile mobs will be eliminated.",
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
                    world.sendMessage(`§5§l✦ THANOS SNAP §r§7— §f${player.name} §7snapped their fingers.\n§8Animals removed: §e${animalCount} §8| Mobs eliminated: §e${mobCount} §8| Total: §c${total}`);
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
        return `${sev.sym} §f${f.name}: §e${s.total} total §8| §a${s.named} named §8| ${sev.color}${s.unnamed} unnamed §8— ${sev.badge}`;
    }).join("\n");

    const form = new ActionFormData()
        .title("§a§lFarm Animals")
        .body(`§7Select type. §8Only unnamed can be removed — named ones are safe.\n\n${bodyLines}`);

    for (let i = 0; i < FARM_TYPES.length; i++) {
        const s   = stats[i];
        const sev = farmSev(s.unnamed);
        form.button(`${sev.sym} §0${FARM_TYPES[i].name} §8[${sev.color}${s.unnamed} §0unnamed §8/ §0${s.total} §0total§8]`);
    }
    form.button("§0« Back");

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
        .title("§c§lHostile Mobs")
        .body(`§7Select type to set a cap, or kill all.\n\n${bodyLines}`);

    for (let i = 0; i < MOB_TYPES.length; i++) {
        const n   = stats[i].total;
        const sev = mobSev(n);
        form.button(`${sev.sym} §0${MOB_TYPES[i].name} §8[${sev.color}${n}§8]`);
    }
    form.button("§c§l⚠ THANOS SNAP §r§8(all mobs)");
    form.button("§0« Back");

    form.show(player).then(r => {
        const killAll = MOB_TYPES.length;
        const back    = MOB_TYPES.length + 1;
        if (r.canceled || r.selection === back) { openEntityManager(player); return; }
        if (r.selection === killAll) {
            confirmThanos(player,
                "ALL hostile mobs (zombies, skeletons, creepers...) will be eliminated.",
                () => {
                    let total = 0;
                    const perType = [];
                    for (const m of MOB_TYPES) {
                        const entities = [...dim.getEntities({ type: m.type })];
                        let killed = 0;
                        for (const e of entities) try { e.kill(); killed++; total++; } catch {}
                        if (killed > 0) perType.push(`§f${m.name} §8×§e${killed}`);
                    }
                    world.sendMessage(`§5§l✦ THANOS SNAP §r§7— §f${player.name} §7snapped their fingers.\n§8${perType.join("  ")}§8  |  Total: §c${total}`);
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
        ? `${sev.badge}  §8(${count} present)\n\n§fHow many to keep? §8(0 = kill all)`
        : `${sev.badge}  §8(${count} unnamed, §a${stats.named} named ones safe)\n\n§fHow many unnamed to keep?`;

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
                    ? `§c[Cleanup] §f${entityType.name}: §c${killed} eliminated §8→ remaining ${sevAfter.color}${after} ${sevAfter.badge}`
                    : `§a[Cleanup] §f${entityType.name} already within the limit.`
            );
            isMob ? openMobCleanup(player) : openFarmCleanup(player);
        }).catch(() => {});
}

function openMissions(player) {
    const done = [], active = [], todo = [];
    for (const [key, q] of Object.entries(QUESTS)) {
        const rep = REPEATABLE_QUESTS.has(key) ? " §7(daily)" : "";
        if (isQuestDone(player, key)) {
            done.push(`§2✓ §f${q.name}${rep} §8· ${q.npc}`);
        } else if (player.hasTag(`q_${key}`)) {
            const prog = getQuestProgress(player, key);
            const rdy  = prog.done ? " §a[READY]" : "";
            active.push(`§6▶ §f${q.name}${rep}${rdy} §8· ${q.npc}\n  §7${prog.text}`);
        } else {
            todo.push(`§8○ §7${q.name}${rep} §8· ${q.npc} §8(§6+${q.reward} ◆§8)`);
        }
    }
    const total = Object.keys(QUESTS).length;
    const lines = [`§e§lQUESTS  §f${done.length}§7/${total} complete\n`];
    if (active.length) { lines.push("§6§lIN PROGRESS"); lines.push(...active, ""); }
    if (todo.length)   { lines.push("§7§lTO DO");       lines.push(...todo,   ""); }
    if (done.length)   { lines.push("§a§lCOMPLETED");   lines.push(...done); }

    new MessageFormData()
        .title("§l§eQuests")
        .body(lines.join("\n"))
        .button1("§0« Back")
        .button2("§8Close")
        .show(player).then(r => { if (r.selection === 0) openDashboard(player); })
        .catch(() => {});
}



// ── TELEPORT HUB ──────────────────────────────────────────────────────────────

function openTeleport(player) {
    const form = new ActionFormData()
        .title("§l§bTeleport")
        .body("§7Choose an option:")
        .button("§bWarp")
        .button("§dCommunity Warp")
        .button("§eSet TP")
        .button("§5TP Friend")
        .button("§0< Back");

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
        .body(others.length > 0 ? "§7Choose a player:" : "§7No other players online.");

    for (const p of others) form.button(`§0${p.name}`);
    form.button("§0< Back");

    form.show(player).then(r => {
        if (r.canceled || r.selection === others.length) { openTeleport(player); return; }
        const target = others[r.selection];
        if (!target) { openTeleport(player); return; }
        player.sendMessage(`§d[TP Friend] §fTeleporting you to §f${target.name}§f in 1 second...`);
        const targetName = target.name;
        system.runTimeout(() => {
            const online = world.getAllPlayers().find(p => p.name === targetName);
            if (!online) { player.sendMessage(`§c[TP Friend] §f${targetName} left the server.`); return; }
            player.teleport(online.location, { dimension: online.dimension });
            player.sendMessage(`§d[TP Friend] §fYou're at §f${online.name}§f!`);
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
            ? `§8TP point set at §8(${Math.floor(hx)}, ${Math.floor(player.getDynamicProperty("home_y"))}, ${Math.floor(player.getDynamicProperty("home_z"))})`
            : "§8No TP point set.")
        .button("§eSet TP")
        .button(hasHome ? "§aGo to TP" : "§8Go to TP")
        .button("§0< Back");

    form.show(player).then(r => {
        if (r.canceled || r.selection === 2) { openTeleport(player); return; }
        if (r.selection === 0) {
            const { x, y, z } = player.location;
            player.setDynamicProperty("home_x", x);
            player.setDynamicProperty("home_y", y);
            player.setDynamicProperty("home_z", z);
            player.setDynamicProperty("home_dim", player.dimension.id);
            player.sendMessage(`§e[Set TP] §fPoint set at §f(${Math.floor(x)}, ${Math.floor(y)}, ${Math.floor(z)})`);
            openTeleport(player);
        } else if (r.selection === 1) {
            if (!hasHome) { player.sendMessage("§c[Set TP] No point set."); openTeleport(player); return; }
            player.sendMessage("§e[Set TP] §fTeleporting in 1 second...");
            system.runTimeout(() => {
                const dim = world.getDimension(player.getDynamicProperty("home_dim") ?? "overworld");
                player.teleport(
                    { x: player.getDynamicProperty("home_x"), y: player.getDynamicProperty("home_y"), z: player.getDynamicProperty("home_z") },
                    { dimension: dim }
                );
                player.sendMessage("§e[Set TP] §fArrived!");
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
        .body("§7Server destinations:");

    for (const [, w] of entries) form.button(`${w.name}\n§8★ server`);
    form.button("§0< Back");

    form.show(player).then(r => {
        if (r.canceled || r.selection === entries.length) { openTeleport(player); return; }
        const [, warp] = entries[r.selection];
        player.sendMessage(`§b[Warp] §fTeleporting to ${warp.name}§f in 1 second...`);
        system.runTimeout(() => {
            player.teleport({ x: warp.x, y: warp.y, z: warp.z }, { dimension: world.getDimension(warp.dim) });
            player.sendMessage(`§b[Warp] §fArrived at ${warp.name}§f!`);
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
        .body(entries.length > 0 ? "§7Warps added by the community:" : "§7No warps added yet.");

    for (const [, w] of entries) {
        form.button(`§b${w.name}\n§8(${Math.floor(w.x)}, ${Math.floor(w.y)}, ${Math.floor(w.z)}) - ${w.creator}`);
    }

    const extras = [];
    form.button("§a+ Add");                                              extras.push("add");
    if (entries.length > 0) { form.button("§c- Delete");               extras.push("delete"); }
    if (hasDeleted)          { form.button("§6⌛ Recently Deleted");    extras.push("history"); }
    form.button("§0< Back");                                            extras.push("back");

    form.show(player).then(r => {
        if (r.canceled) { openTeleport(player); return; }
        if (r.selection < entries.length) {
            const [, warp] = entries[r.selection];
            player.sendMessage(`§d[Community Warp] §fTeleporting to §b${warp.name}§f in 1 second...`);
            system.runTimeout(() => {
                player.teleport({ x: warp.x, y: warp.y, z: warp.z }, { dimension: world.getDimension(warp.dim) });
                player.sendMessage(`§d[Community Warp] §fArrived at §b${warp.name}§f!`);
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
        .title("§l§bAdd Warp")
        .textField("Warp name:", "e.g. main-base")
        .show(player).then(r => {
            if (r.canceled) { openCommunityWarps(player); return; }
            const name = (r.formValues[0] ?? "").trim();
            if (!name) {
                player.sendMessage("§c[Warp] Invalid name.");
                openCommunityWarps(player);
                return;
            }
            const key = name.toLowerCase().replace(/\s+/g, "_");
            const warps = loadWarps();
            if (warps[key] || SERVER_WARPS[key]) {
                player.sendMessage(`§c[Warp] A warp called "${name}" already exists.`);
                openCommunityWarps(player);
                return;
            }
            const { x, y, z } = player.location;
            warps[key] = { name, x, y, z, dim: player.dimension.id, creator: player.name, createdAt: Date.now() };
            saveWarps(warps);
            world.sendMessage(`§b[Community Warp] §f${player.name} added §b${name}§f! §8(${Math.floor(x)}, ${Math.floor(y)}, ${Math.floor(z)})`);
            openCommunityWarps(player);
        }).catch(() => {});
}

function deleteWarpMenu(player) {
    const warps   = loadWarps();
    const entries = Object.entries(warps);

    const form = new ActionFormData()
        .title("§l§cDelete Community Warp")
        .body("§7Select the warp to delete:");

    for (const [, w] of entries) {
        form.button(`§c${w.name}\n§8added by ${w.creator}`);
    }
    form.button("§0< Back");

    form.show(player).then(r => {
        if (r.canceled || r.selection === entries.length) { openCommunityWarps(player); return; }
        const [key, warp] = entries[r.selection];
        // sposta nei cancellati
        const deleted = loadDeletedWarps();
        deleted[key] = { ...warp, deletedBy: player.name, deletedAt: Date.now() };
        saveDeletedWarps(deleted);
        delete warps[key];
        saveWarps(warps);
        world.sendMessage(`§c[Community Warp] §f${player.name} deleted §c${warp.name}§f.`);
        openCommunityWarps(player);
    }).catch(() => {});
}

function showDeletedWarps(player) {
    const deleted = loadDeletedWarps();
    const entries = Object.entries(deleted);
    const now     = Date.now();

    const lines = ["§c§lDELETED WARPS §7(last hour)\n"];
    for (const [, w] of entries) {
        const minLeft = Math.ceil((3_600_000 - (now - w.deletedAt)) / 60_000);
        lines.push(`§c${w.name} §8(${Math.floor(w.x)}, ${Math.floor(w.y)}, ${Math.floor(w.z)})`);
        lines.push(`  §7Added by: §f${w.creator} §7— Deleted by: §f${w.deletedBy} §7— expires in §e${minLeft} min`);
    }

    new MessageFormData()
        .title("§l§cRecently Deleted")
        .body(lines.join("\n"))
        .button1("§0< Back")
        .button2("§8Close")
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
        ? `${prefix} ${goal} ${label} eliminated. Come back to me.`
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
        player.sendMessage("§5[Cultista] §fI don't remember where you fell... Die first.");
        return;
    }
    player.sendMessage("§5[Cultista] §fPrepare yourself... the journey begins in 1 second.");
    system.runTimeout(() => {
        const dim = world.getDimension(loc.dimensionId);
        player.teleport({ x: loc.x, y: loc.y, z: loc.z }, { dimension: dim });
        player.sendMessage(`§5[Cultista] §fHere's where you left your life. §7(${loc.x}, ${loc.y}, ${loc.z})`);
    }, 20);
}

// ── RANK TICKER ───────────────────────────────────────────────────────────────
let rankTick = 0;
system.runInterval(() => {
    rankTick = (rankTick + 1) % RAINBOW.length;
    const obj = world.scoreboard.getObjective("quest_punti");
    for (const player of world.getAllPlayers()) {
        const pts  = getScore(obj, player);
        const rank = getRank(pts);
        const name = player.name;
        const gems = countItem(player, "cc:ruby");
        if (rank.color === null) {
            player.nameTag = name.split("").map((c, i) => RAINBOW[(rankTick + i) % RAINBOW.length] + c).join("");
            const label = "✦ Leggenda ✦".split("").map((c, i) => RAINBOW[(rankTick + i) % RAINBOW.length] + c).join("");
            player.onScreenDisplay.setActionBar(`${label}§r §8| §e${pts} §7quest §8| §6${gems} §7◆`);
        } else {
            player.nameTag = rank.color + name + "§r";
            player.onScreenDisplay.setActionBar(`${rank.color}✦ ${rank.name}§r §8| §e${pts} §7quest §8| §6${gems} §7◆`);
        }
    }
}, 8);

// ── BISCAZZIERE LOGIC ─────────────────────────────────────────────────────────

// playerName → { spins: number, losses: number }
const slotSessions = new Map();

function weightedPick(pool) {
    const total = pool.reduce((s, e) => s + e.weight, 0);
    let r = Math.random() * total;
    for (const entry of pool) {
        r -= entry.weight;
        if (r <= 0) return entry;
    }
    return pool[pool.length - 1];
}

function runSlot(player, bet) {
    const VALID_BETS = [1, 3, 5, 10, 20, 50, 100];
    if (!VALID_BETS.includes(bet)) return;
    const gems = countItem(player, "cc:ruby");
    if (gems < bet) {
        player.sendMessage(`§c[Biscazziere] §fNot enough gems. Need §c${bet}§f, you have §c${gems}§f.`);
        return;
    }
    player.runCommand(`clear @s cc:ruby 0 ${bet}`);

    // ── luck cycle ─────────────────────────────────────────────────────────────
    const sess = slotSessions.get(player.name) ?? { spins: 0, losses: 0 };
    sess.spins++;
    slotSessions.set(player.name, sess);
    const cycle = sess.spins % 50; // repeating 50-spin cycle

    let r1 = weightedPick(SLOT_SYMBOLS);
    let r2 = weightedPick(SLOT_SYMBOLS);
    let r3 = weightedPick(SLOT_SYMBOLS);

    const natWin  = r1.id === r2.id && r2.id === r3.id;
    const natNear = !natWin && (r1.id === r2.id || r2.id === r3.id || r1.id === r3.id);

    // Phase HOT (spins 1-15): after 2 losses, 40% chance of forced ♦ win to hook
    if (cycle <= 15 && !natWin && sess.losses >= 2 && Math.random() < 0.40) {
        r1 = r2 = r3 = SLOT_SYMBOLS[0]; // ♦ ×2 — smallest win, still a win
    }
    // Phase COLD (spins 21-35): small natural wins become near-misses
    else if (cycle >= 21 && cycle <= 35 && natWin && SLOT_PAYOUTS[r1.id] <= 5 && Math.random() < 0.50) {
        r3 = weightedPick(SLOT_SYMBOLS.filter(s => s.id !== r1.id));
    }
    // Phase RECOVERY (spins 36-50): after 4+ losses, 50% chance of forced small win
    else if (cycle >= 36 && !natWin && sess.losses >= 4 && Math.random() < 0.50) {
        r1 = r2 = r3 = weightedPick(SLOT_SYMBOLS.slice(0, 2)); // ♦ or ♣
    }

    // Progressive streak boost — independent of cycle phase
    // After long losing streaks the win rate climbs to 30-40%, resets on any win
    const alreadyWin = r1.id === r2.id && r2.id === r3.id;
    if (!alreadyWin) {
        const boostChance =
            sess.losses >= 10 ? 0.30 :
            sess.losses >= 7  ? 0.20 :
            sess.losses >= 5  ? 0.10 : 0;
        if (boostChance > 0 && Math.random() < boostChance)
            r1 = r2 = r3 = SLOT_SYMBOLS[0]; // force ♦ win
    }

    const isWin  = r1.id === r2.id && r2.id === r3.id;
    const isNear = !isWin && (r1.id === r2.id || r2.id === r3.id || r1.id === r3.id);

    // update session loss streak
    if (isWin) sess.losses = 0; else sess.losses++;

    // phase hint shown after result
    let phaseHint = "";
    if (!isWin && cycle >= 21 && cycle <= 35 && sess.losses >= 2)
        phaseHint = "\n§8The machine is running cold... §7but that can't last.";
    else if (!isWin && cycle >= 36 && sess.losses >= 3)
        phaseHint = "\n§7The tides are turning. §8One more spin.";
    // ──────────────────────────────────────────────────────────────────────────

    const rnd = (arr, ...args) => arr[Math.floor(Math.random() * arr.length)](...args);
    const pName = player.name;

    // Frame 0: tutte le ruote in spin
    player.onScreenDisplay.setTitle("§6[ §8? §6| §8? §6| §8? §6]", { fadeInDuration: 0, stayDuration: 25, fadeOutDuration: 5 });
    player.onScreenDisplay.setActionBar("§7Spinning...");

    // Frame 1: prima ruota si ferma (~0.9s)
    system.runTimeout(() => {
        const p = world.getAllPlayers().find(pl => pl.name === pName);
        if (!p) return;
        p.onScreenDisplay.setTitle(`§6[ ${r1.display} §6| §8? §6| §8? §6]`, { fadeInDuration: 0, stayDuration: 20, fadeOutDuration: 5 });
        p.onScreenDisplay.setActionBar("§7Spinning...");
    }, 18);

    // Frame 2: seconda ruota si ferma (~1.6s)
    system.runTimeout(() => {
        const p = world.getAllPlayers().find(pl => pl.name === pName);
        if (!p) return;
        p.onScreenDisplay.setTitle(`§6[ ${r1.display} §6| ${r2.display} §6| §8? §6]`, { fadeInDuration: 0, stayDuration: 25, fadeOutDuration: 5 });
        p.onScreenDisplay.setActionBar(r1.id === r2.id ? "§6One more..." : "§7Spinning...");
    }, 32);

    // Frame 3: terza ruota si ferma, risultato finale (~2.5s)
    system.runTimeout(() => {
        const p = world.getAllPlayers().find(pl => pl.name === pName);
        if (!p) return;
        try {
            const line = `§6[ ${r1.display} §6| ${r2.display} §6| ${r3.display} §6]`;
            let actionBarLine = "", win = 0, chatLine = "";

            if (isWin) {
                const mult = SLOT_PAYOUTS[r1.id];
                win = bet * mult;
                p.runCommand(`give @s cc:ruby ${win}`);
                if (r1.id === "✦") {
                    actionBarLine = `§d§l★ JACKPOT ×${mult}! +${win} gems!`;
                    world.sendMessage(`§d§l✦ JACKPOT! §r§f${pName} §7hit §d✦✦✦ §7and won §d${win} gems§7!`);
                } else if (r1.id === "★") {
                    actionBarLine = rnd(SLOT_WIN_LINES, win, mult);
                    world.sendMessage(`§c§l★ §r§f${pName} §7hit §c★★★ §7on the slot and won §a${win} gems§7!`);
                } else {
                    actionBarLine = rnd(SLOT_WIN_LINES, win, mult);
                    world.sendMessage(`§a[Slot] §f${pName} §7won §a${win} gems §7(${r1.id}${r1.id}${r1.id} ×${mult})`);
                }
                chatLine = `§a[Slot] ${line}  §a+${win} gems §7(×${mult})`;
            } else if (isNear) {
                const matchSym = r1.id === r2.id ? r1.display : r2.id === r3.id ? r2.display : r1.display;
                actionBarLine = rnd(SLOT_NEAR_LINES, matchSym);
                chatLine = `§6[Slot] ${line}  §6QUASI! §c-${bet} gems${phaseHint ? "  " + phaseHint.replace(/^\n/, "") : ""}`;
            } else {
                actionBarLine = rnd(SLOT_LOSS_LINES, bet);
                chatLine = `§c[Slot] ${line}  §c-${bet} gems${phaseHint ? "  " + phaseHint.replace(/^\n/, "") : ""}`;
            }

            p.onScreenDisplay.setTitle(line, { fadeInDuration: 0, stayDuration: 200, fadeOutDuration: 15 });
            p.onScreenDisplay.setActionBar(actionBarLine);
            p.sendMessage(chatLine);
        } catch (e) {
            world.sendMessage(`§c[Slot Error - ${pName}] ${e}`);
        }
    }, 50);
}


function openSlotBetPicker(player) {
    const gems = countItem(player, "cc:ruby");
    new ActionFormData()
        .title("§6§lSlot Machine")
        .body(`§6◆ §f${gems} gems\n\n§7Choose your bet:\n\n§b♦§7×2   §a♣§7×3   §a♥§7×5   §6♠§7×10   §c★§7×40   §d✦§7×200`)
        .button("§eBet §c1")
        .button("§eBet §c3")
        .button("§eBet §c5")
        .button("§eBet §c10")
        .button("§eBet §c20")
        .button("§eBet §c50")
        .button("§eBet §c100")
        .button(`§c§lALL IN  §r§8(${gems} gems — 95% bust)`)
        .button("§0✕ Close")
        .show(player).then(r => {
            if (r.canceled || r.selection === 8) return;
            if (r.selection === 7) { system.runTimeout(() => runAllIn(player), 5); return; }
            const bets = [1, 3, 5, 10, 20, 50, 100];
            system.runTimeout(() => runSlot(player, bets[r.selection]), 5);
        }).catch(() => {});
}

function runAllIn(player) {
    const gems = countItem(player, "cc:ruby");
    if (gems < 1) {
        player.sendMessage("§c[Biscazziere] §fNo gems, no game.");
        return;
    }
    player.runCommand(`clear @s cc:ruby 0 ${gems}`);
    const pName = player.name;

    player.onScreenDisplay.setTitle("§c§l A L L   I N", { fadeInDuration: 0, stayDuration: 60, fadeOutDuration: 8 });
    player.onScreenDisplay.setActionBar(`§7${gems} gems on the line...`);

    system.runTimeout(() => {
        const p = world.getAllPlayers().find(pl => pl.name === pName);
        if (!p) return;
        const win = Math.random() < 0.05;
        if (win) {
            const payout = gems * 3;
            p.runCommand(`give @s cc:ruby ${payout}`);
            p.onScreenDisplay.setTitle("§a§l★ SURVIVED ★", { fadeInDuration: 0, stayDuration: 120, fadeOutDuration: 10 });
            p.onScreenDisplay.setActionBar(`§f×3 → §a+${payout} gems!`);
            world.sendMessage(`§c§l[ALL IN] §r§f${pName} §7went all in with §c${gems} gems §7and tripled it! §a+${payout} gems§7!`);
            p.sendMessage(`§a[ALL IN] ${SLOT_SYMBOLS[5].display}${SLOT_SYMBOLS[5].display}${SLOT_SYMBOLS[5].display}  §a+${payout} gems! ×3`);
        } else {
            p.onScreenDisplay.setTitle("§4§l B U S T E D", { fadeInDuration: 0, stayDuration: 120, fadeOutDuration: 10 });
            p.onScreenDisplay.setActionBar(`§c-${gems} gems. §7The house never blinks.`);
            p.sendMessage(`§c[ALL IN] §fBUSTED. §c-${gems} gems. §7The house never blinks.`);
        }
        showGems(p);
    }, 40);
}

// ── BLACKJACK LOGIC ───────────────────────────────────────────────────────────

const bjSessions = new Map(); // playerName → session

function bjShowForm(player) {
    const sess = bjSessions.get(player.name);
    if (!sess || !sess.active) return;

    const pVal = bjValue(sess.playerHand);
    const pCol = pVal > 21 ? "§c" : pVal === 21 ? "§a" : "§e";
    const d0 = sess.dealerHand[0];

    const body =
        `§fYour hand: ${bjFmt(sess.playerHand)} §8= ${pCol}${pVal}§r\n` +
        `§8Dealer shows: ${d0.suit}${d0.v}§r  §8?\n` +
        `§7Bet: §c${sess.bet} gems`;

    const canDouble = sess.playerHand.length === 2;

    system.runTimeout(() => {
        const p = world.getAllPlayers().find(pl => pl.name === player.name);
        if (!p) return;
        const sess2 = bjSessions.get(p.name);
        if (!sess2 || !sess2.active) return;

        new ActionFormData()
            .title("§5§lBLACKJACK")
            .body(body)
            .button("§a» Hit")
            .button("§e» Stand")
            .button(canDouble ? "§6» Double" : "§8  Double (×2 cards only)")
            .button("§c» Quit")
            .show(p)
            .then(res => {
                if (res.canceled || res.selection === undefined) return;
                if (res.selection === 0) bjHit(p);
                else if (res.selection === 1) bjStand(p);
                else if (res.selection === 2 && canDouble) bjDouble(p);
                else if (res.selection === 3) bjQuit(p);
            });
    }, 15);
}

const BJ_SUITS = [
    { sym: "♥", col: "§c" },
    { sym: "♦", col: "§6" },
    { sym: "♠", col: "§f" },
    { sym: "♣", col: "§a" },
];
const BJ_VALUES = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

function bjDraw() {
    const s = BJ_SUITS[Math.floor(Math.random() * BJ_SUITS.length)];
    const v = BJ_VALUES[Math.floor(Math.random() * BJ_VALUES.length)];
    return { suit: s.col + s.sym, v };
}

function bjValue(hand) {
    let total = 0, aces = 0;
    for (const c of hand) {
        if (c.v === "A")                      { total += 11; aces++; }
        else if (["J","Q","K"].includes(c.v)) { total += 10; }
        else                                  { total += parseInt(c.v); }
    }
    while (total > 21 && aces > 0) { total -= 10; aces--; }
    return total;
}

function bjFmt(hand) {
    return hand.map(c => {
        const hint = c.v === "A" ? "§8(1/11)" : ["J","Q","K"].includes(c.v) ? "§8(10)" : "";
        return `${c.suit}${c.v}${hint}§r`;
    }).join(" ");
}

function bjShowHand(player) {
    const sess = bjSessions.get(player.name);
    if (!sess || !sess.active) return;
    const pVal = bjValue(sess.playerHand);
    const pCol = pVal > 21 ? "§c" : pVal === 21 ? "§a" : "§f";
    const d0 = sess.dealerHand[0];
    player.onScreenDisplay.setTitle(
        `${bjFmt(sess.playerHand)} §8= ${pCol}${pVal}`,
        { fadeInDuration: 0, stayDuration: 600, fadeOutDuration: 5 }
    );
    player.onScreenDisplay.setActionBar(
        `§8Dealer: ${d0.suit}${d0.v}§r §8?   §7Bet: §c${sess.bet}`
    );
}

function bjEnd(player, sess, payout, title, bar, chat) {
    bjSessions.delete(player.name);
    if (payout > 0) player.runCommand(`give @s cc:ruby ${payout}`);
    player.onScreenDisplay.setTitle(title, { fadeInDuration: 0, stayDuration: 150, fadeOutDuration: 15 });
    player.onScreenDisplay.setActionBar(bar);
    player.sendMessage(chat);
    showGems(player);
}

function bjStart(player, bet) {
    if (!bet || bet < 1) return;

    if (bjSessions.has(player.name)) {
        // sessione stuck — cancella e ricomincia
        bjSessions.delete(player.name);
    }

    const gems = countItem(player, "cc:ruby");
    if (gems < bet) {
        player.sendMessage(`§c[Blackjack] §fNot enough gems. Need §c${bet}§f, have §c${gems}§f.`);
        return;
    }

    player.runCommand(`clear @s cc:ruby 0 ${bet}`);

    const pH = [bjDraw(), bjDraw()];
    const dH = [bjDraw(), bjDraw()];

    // slight dealer blackjack boost: ~12% extra chance on top of natural
    if (bjValue(dH) !== 21 && Math.random() < 0.12) {
        const d0Val = bjValue([dH[0]]);
        const needed = 21 - d0Val;
        let neededV;
        if (needed === 11) neededV = "A";
        else if (needed === 10) neededV = ["10","J","Q","K"][Math.floor(Math.random() * 4)];
        else if (needed >= 2 && needed <= 9) neededV = String(needed);
        if (neededV) {
            const s = BJ_SUITS[Math.floor(Math.random() * BJ_SUITS.length)];
            dH[1] = { suit: s.col + s.sym, v: neededV };
        }
    }

    const pVal = bjValue(pH);
    const dVal = bjValue(dH);

    // Natural blackjack
    if (pVal === 21) {
        if (dVal === 21) {
            player.runCommand(`give @s cc:ruby ${bet}`);
            player.sendMessage(`§5[Blackjack] §6PUSH §f— both Blackjack. Refunded §6${bet}§f gems.\n§7You: ${bjFmt(pH)}  Dealer: ${bjFmt(dH)}`);
            player.onScreenDisplay.setTitle("§6PUSH — Blackjack", { fadeInDuration: 0, stayDuration: 120, fadeOutDuration: 10 });
            player.onScreenDisplay.setActionBar(`§6Refunded §c${bet} gems.`);
        } else {
            const win = Math.ceil(bet * 1.5);
            player.runCommand(`give @s cc:ruby ${bet + win}`);
            player.sendMessage(`§5[Blackjack] §a§lBLACKJACK! §r§f${bjFmt(pH)} = 21.  §a+${win} gems!`);
            player.onScreenDisplay.setTitle("§a§lBLACKJACK! ×1.5", { fadeInDuration: 0, stayDuration: 150, fadeOutDuration: 15 });
            player.onScreenDisplay.setActionBar(`§a+${win} gems!`);
            world.sendMessage(`§a§l[Blackjack] §r§f${player.name} §7hit a Natural Blackjack! §a+${win} gems§7!`);
        }
        showGems(player);
        return;
    }

    bjSessions.set(player.name, { playerHand: pH, dealerHand: dH, bet, active: true, doubled: false });
    player.sendMessage("§8[Blackjack] §7Shuffling cards§8...");
    bjShowForm(player);
}

function bjHit(player) {
    const sess = bjSessions.get(player.name);
    if (!sess || !sess.active) {
        player.sendMessage("§c[Blackjack] §fNo active game. Start one from the betting screen.");
        return;
    }
    sess.playerHand.push(bjDraw());
    const pVal = bjValue(sess.playerHand);

    if (pVal > 21) {
        bjEnd(player, sess, 0,
            `§c§lBUST!  ${pVal}`,
            `§c-${sess.bet} gems.`,
            `§5[Blackjack] §cBUST! §f${bjFmt(sess.playerHand)} §8= ${pVal}.  §c-${sess.bet} gems.`
        );
        return;
    }
    if (pVal === 21) { bjStand(player); return; } // auto-stand on 21
    player.sendMessage("§8[Blackjack] §7Drawing§8...");
    bjShowForm(player);
}

function bjStand(player) {
    const sess = bjSessions.get(player.name);
    if (!sess || !sess.active) {
        player.sendMessage("§c[Blackjack] §fNo active game.");
        return;
    }
    sess.active = false; // lock session — no more actions
    while (bjValue(sess.dealerHand) < 17) sess.dealerHand.push(bjDraw());

    const pVal = bjValue(sess.playerHand);
    const dVal = bjValue(sess.dealerHand);
    const pFmt = bjFmt(sess.playerHand);
    const dFmt = bjFmt(sess.dealerHand);
    const pName = player.name;

    let payout, title, bar, chat;
    let broadcast = null;
    if (dVal > 21 || pVal > dVal) {
        payout = sess.bet * 2;
        const why = dVal > 21 ? `Dealer bust (${dVal})` : `${pVal} vs ${dVal}`;
        title = `§a§lWIN!  +${sess.bet}`;
        bar   = `§a${why}. §f+${payout} gems total.`;
        chat  = `§5[Blackjack] §aWIN! §7You: ${pFmt} §8=${pVal}  Dealer: ${dFmt} §8=${dVal}.  §a+${sess.bet} gems.`;
        broadcast = `§5[Blackjack] §f${pName} §7beat the dealer and won §a${sess.bet} gems§7! §8(${pVal} vs ${dVal})`;
    } else if (pVal === dVal) {
        payout = sess.bet;
        title = `§6PUSH  ${pVal}`;
        bar   = `§6Tie ${pVal} = ${dVal}. Refunded §6${payout} gems.`;
        chat  = `§5[Blackjack] §6PUSH. §7You: ${pFmt} §8=${pVal}  Dealer: ${dFmt} §8=${dVal}. Refunded.`;
    } else {
        payout = 0;
        title = `§c§lLOSS  ${pVal} vs ${dVal}`;
        bar   = `§c${dVal} > ${pVal}.  §c-${sess.bet} gems.`;
        chat  = `§5[Blackjack] §cLOSS. §7You: ${pFmt} §8=${pVal}  Dealer: ${dFmt} §8=${dVal}.  §c-${sess.bet} gems.`;
    }

    // suspense: dealer reveal → result
    player.onScreenDisplay.setTitle("§6...", { fadeInDuration: 0, stayDuration: 30, fadeOutDuration: 5 });
    player.onScreenDisplay.setActionBar("§8Dealer drawing...");

    system.runTimeout(() => {
        const p = world.getAllPlayers().find(pl => pl.name === pName);
        if (!p) return;
        const dCol = dVal > 21 ? "§c" : "§f";
        p.onScreenDisplay.setTitle(
            `§8Dealer: ${dFmt} §8= ${dCol}${dVal}`,
            { fadeInDuration: 0, stayDuration: 35, fadeOutDuration: 5 }
        );
        p.onScreenDisplay.setActionBar(`§7vs your §f${pVal}`);
    }, 28);

    system.runTimeout(() => {
        const p = world.getAllPlayers().find(pl => pl.name === pName);
        if (!p) return;
        if (broadcast) world.sendMessage(broadcast);
        bjEnd(p, sess, payout, title, bar, chat);
    }, 55);
}

function bjDouble(player) {
    const sess = bjSessions.get(player.name);
    if (!sess || !sess.active) {
        player.sendMessage("§c[Blackjack] §fNo active game.");
        return;
    }
    if (sess.playerHand.length !== 2) {
        player.sendMessage("§c[Blackjack] §fDouble only allowed on first 2 cards.");
        return;
    }
    const gems = countItem(player, "cc:ruby");
    if (gems < sess.bet) {
        player.sendMessage(`§c[Blackjack] §fNot enough gems to double (need §c${sess.bet}§f more).`);
        return;
    }
    player.runCommand(`clear @s cc:ruby 0 ${sess.bet}`);
    sess.bet *= 2;
    sess.doubled = true;
    sess.playerHand.push(bjDraw());

    const pVal = bjValue(sess.playerHand);
    if (pVal > 21) {
        bjEnd(player, sess, 0,
            `§c§lBUST!  ${pVal}`,
            `§c-${sess.bet} gems. §8(doubled)`,
            `§5[Blackjack] §cBUST on double! §f${bjFmt(sess.playerHand)} §8= ${pVal}.  §c-${sess.bet} gems.`
        );
        return;
    }
    bjStand(player); // auto-stand after double
}

function bjQuit(player) {
    const sess = bjSessions.get(player.name);
    if (!sess) {
        player.sendMessage("§c[Blackjack] §fNo active game.");
        return;
    }
    bjSessions.delete(player.name);
    player.sendMessage(`§5[Blackjack] §cForfeited.  §c-${sess.bet} gems.`);
    player.onScreenDisplay.setTitle("§cForfeited", { fadeInDuration: 0, stayDuration: 80, fadeOutDuration: 10 });
    player.onScreenDisplay.setActionBar(`§c-${sess.bet} gems.`);
    showGems(player);
}

function openCassa(player, tier) {
    const cfg = CASSE_POOLS[tier];
    if (!cfg) return;
    const gems = countItem(player, "cc:ruby");
    if (gems < cfg.cost) {
        player.sendMessage(`§c[Biscazziere] §fNot enough gems. Need §c${cfg.cost}§f, you have §c${gems}§f.`);
        return;
    }
    player.runCommand(`clear @s cc:ruby 0 ${cfg.cost}`);

    const pityObj = world.scoreboard.getObjective(cfg.pityObj);
    const pity = getScore(pityObj, player);

    let prize;
    if (cfg.goldenTicketChance && Math.random() < cfg.goldenTicketChance) {
        prize = { id: "_golden_ticket", name: "§6§lGolden Ticket", rare: true, amount: 1,
                  special: { typeId: "minecraft:paper", enchants: {},
                             lore: ["§7The server owner owes you ONE favor.",
                                    "§8No questions asked. Cannot be refused.",
                                    "§6— Willy Wonka"] } };
        pityObj.setScore(player, 0);
    } else if (pity >= cfg.pityMax) {
        prize = weightedPick(cfg.items.filter(e => e.rare));
        pityObj.setScore(player, 0);
    } else {
        prize = weightedPick(cfg.items);
        pityObj.setScore(player, prize.rare ? 0 : pity + 1);
    }

    const pName = player.name;

    // decoy scroll: 5 items from common pool, fast → slow
    const commonPool = cfg.items.filter(e => !e.rare);
    const decoyPool = commonPool.length >= 2 ? commonPool : cfg.items;
    const decoys = Array.from({ length: 5 }, () => weightedPick(decoyPool));

    player.sendMessage(`§8▶ §7Opening ${cfg.label}§7 crate...`);
    player.onScreenDisplay.setTitle("§8?   ?   ?", { fadeInDuration: 0, stayDuration: 40, fadeOutDuration: 5 });

    // ticks:  0.7s  1.3s  2.0s  2.8s  3.8s
    const timing   = [14,   26,   40,   56,   76];
    const prefixes = ["§7▸", "§7▸", "§e▸▸", "§e▸▸", "§6▶▶▶"];

    timing.forEach((t, i) => {
        system.runTimeout(() => {
            const p = world.getAllPlayers().find(pl => pl.name === pName);
            if (!p) return;
            p.sendMessage(`${prefixes[i]} §f${decoys[i].name}`);
            p.onScreenDisplay.setActionBar(`§8${decoys[i].name}`);
        }, t);
    });

    // suspense pause ~4.5s
    system.runTimeout(() => {
        const p = world.getAllPlayers().find(pl => pl.name === pName);
        if (!p) return;
        p.sendMessage("§6§l...");
        p.onScreenDisplay.setTitle("§6§l...", { fadeInDuration: 0, stayDuration: 22, fadeOutDuration: 5 });
    }, 90);

    // REVEAL ~5.5s
    system.runTimeout(() => {
        const p = world.getAllPlayers().find(pl => pl.name === pName);
        if (!p) return;

        if (prize.special) {
            giveSpecialItem(p, prize.special.typeId, prize.name, prize.special.enchants, prize.special.lore);
        } else if (prize.id === "cc:ruby") {
            p.runCommand(`give @s cc:ruby ${prize.amount}`);
        } else {
            p.runCommand(`give @s ${prize.id.replace("minecraft:", "")} ${prize.amount}`);
        }

        if (prize.rare) {
            p.sendMessage(`§d§l✦ ════════════════ ✦`);
            p.sendMessage(`§6§l  ${prize.name.toUpperCase()}!!!`);
            p.sendMessage(`§d§l✦ ════════════════ ✦`);
            p.onScreenDisplay.setTitle(
                `§d✦ §6§l${prize.name} §d✦`,
                { fadeInDuration: 5, stayDuration: 130, fadeOutDuration: 20 }
            );
            p.onScreenDisplay.setActionBar(`§d✦ §6§lRARE ITEM! §d✦`);
            world.sendMessage(`§6§l✦ §r§f${pName} §7opened ${cfg.label}§7 and got: §6§l${prize.name}§7!`);
            if (prize.id === "_golden_ticket") {
                world.sendMessage(`§6§l★★★ WILLY WONKA GOLDEN TICKET ★★★`);
                world.sendMessage(`§e${pName} §6ha trovato il §6§lGolden Ticket§6! §eCongratulazioni! §6★`);
            }
        } else {
            const newPity = getScore(pityObj, p);
            p.sendMessage(`§f▸ §f${prize.name} §7×${prize.amount}`);
            p.sendMessage(`§8[Pity: ${newPity}/${cfg.pityMax}]`);
            p.onScreenDisplay.setTitle(
                `§f${prize.name}`,
                { fadeInDuration: 0, stayDuration: 80, fadeOutDuration: 15 }
            );
            p.onScreenDisplay.setActionBar(`§7×${prize.amount}`);
            world.sendMessage(`§7▸ §f${pName} §7opened ${cfg.label}§7 and got: §f${prize.name} §7×${prize.amount}`);
        }

        showGems(p);
    }, 110);
}
