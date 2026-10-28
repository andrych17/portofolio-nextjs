// Photos: derived from Unsplash-licensed botanical/studio images in public/template/images/
const img = (name: string) => `/template/images/ecommerce/bloom/${name}.webp`;

export type BloomCategory = "all" | "skincare" | "body" | "home" | "refills";

export type BloomProduct = {
  id: string;
  sku: string;
  name: string;
  category: Exclude<BloomCategory, "all">;
  step: "cleanse" | "treat" | "hydrate";
  subtitle: string;
  notes: string;
  bottlePrice: number;
  refillPrice: number;
  bottleSize: string;
  refillSize: string;
  weightGrams: number;
  stock: number;
  badge?: string;
  image: string;
  alt: string;
  scents: { label: string; hex: string; batch: string }[];
};

export const bloom = {
  path: "/ecommerce/bloom",
  title: "Your Brand · Botanical Apothecary, Skincare & Refill Storefront",
  description:
    "Shop cold-pressed botanical serums, hydrosol mists, body balms and aluminum refill pouches at Your Brand, freshly blended in small batches.",
  speakable:
    "Your Brand is a bright botanical skincare and home apothecary storefront offering cold-pressed plant serums, aromatic mists and zero-waste refill pouches with nationwide cold-pack delivery.",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  street: "19 Conservatory Walk, Botanical Quarter",
  city: "Surabaya",
  postalCode: "60264",
  countryCode: "ID",
  hours: "Daily, 10:00–21:00 · Apothecary & Refill Tap Bar",

  marquee: [
    "Cold-Pressed Within 7 Days",
    "Save 18% With Refill Pouches",
    "100% Traceable Botanical Lots",
    "Insulated Cold-Pack Courier",
    "In-Store Bottle Refill Tap",
    "Dermatologist Patch-Tested",
  ],

  categories: [
    { id: "all" as const, label: "All Formulas", count: 6 },
    { id: "skincare" as const, label: "Facial Care", count: 2 },
    { id: "body" as const, label: "Body & Hand", count: 2 },
    { id: "home" as const, label: "Home Aromatics", count: 1 },
    { id: "refills" as const, label: "Refill Kits", count: 1 },
  ],

  products: [
    {
      id: "neroli-cleansing-gel",
      sku: "BLM-101",
      name: "Bitter Orange & Oat Cleansing Gel",
      category: "skincare",
      step: "cleanse",
      subtitle: "Low-lather amino cleanser with colloidal oat and steam-distilled neroli blossom water.",
      notes: "Neroli · Green Petitgrain · Oat Milk",
      bottlePrice: 34,
      refillPrice: 54,
      bottleSize: "200 ml Amber Glass",
      refillSize: "500 ml Alu Pouch (2.5×)",
      weightGrams: 420,
      stock: 42,
      badge: "Top Rated",
      image: img("hero"),
      alt: "Glass botanical infusion vessel and cup beside fresh yellow blossoms",
      scents: [
        { label: "Neroli & Petitgrain", hex: "#2d6a4f", batch: "LOT-N18" },
        { label: "Chamomile Unscented", hex: "#d4a373", batch: "LOT-C04" },
      ],
    },
    {
      id: "bakuchiol-nectar",
      sku: "BLM-108",
      name: "Pressed Rosehip & Bakuchiol Nectar",
      category: "skincare",
      step: "treat",
      subtitle: "Overnight cellular oil serum cold-pressed from Andean rosehip seeds and wild babchi leaf.",
      notes: "Wild Rosehip · Sea Buckthorn · Blue Tansy",
      bottlePrice: 48,
      refillPrice: 78,
      bottleSize: "30 ml Dropper Bottle",
      refillSize: "60 ml Refill Ampoule",
      weightGrams: 180,
      stock: 19,
      badge: "Fresh Press",
      image: img("serum"),
      alt: "Golden botanical nectar and wooden dipper in a glass apothecary jar",
      scents: [
        { label: "Golden Rosehip", hex: "#d97706", batch: "LOT-R29" },
        { label: "Blue Tansy Calm", hex: "#2b5c6b", batch: "LOT-B11" },
      ],
    },
    {
      id: "hinoki-hand-balm",
      sku: "BLM-204",
      name: "Hinoki Cypress & Shea Hand Pomade",
      category: "body",
      step: "hydrate",
      subtitle: "Fast-absorbing botanical butter that mends dry studio hands without leaving a greasy film.",
      notes: "Japanese Cypress · Vetiver Root · Cold Shea",
      bottlePrice: 26,
      refillPrice: 44,
      bottleSize: "75 ml Aluminum Tube",
      refillPriceNote: "250 ml Refill Jar",
      refillSize: "250 ml Refill Tub",
      weightGrams: 260,
      stock: 31,
      image: img("balm"),
      alt: "Freshly harvested botanical ingredients arranged on a clean surface",
      scents: [
        { label: "Hinoki & Vetiver", hex: "#1b5e3a", batch: "LOT-H07" },
        { label: "Bergamot Rind", hex: "#ca8a04", batch: "LOT-B19" },
      ],
    },
    {
      id: "fig-leaf-body-wash",
      sku: "BLM-212",
      name: "Crushed Fig Leaf & Vetiver Body Wash",
      category: "body",
      step: "cleanse",
      subtitle: "Plant-glycerin shower gel scented with green fig sap, crushed cardamom and damp cedar.",
      notes: "Green Fig · Cardamom Pod · Atlas Cedar",
      bottlePrice: 32,
      refillPrice: 52,
      bottleSize: "300 ml Pump Bottle",
      refillSize: "1000 ml Refill Pouch",
      weightGrams: 540,
      stock: 27,
      badge: "Refill Favorite",
      image: img("soap"),
      alt: "Artisanal bar and vessel plated on a bright minimalist counter",
      scents: [
        { label: "Green Fig & Cedar", hex: "#3f6212", batch: "LOT-F12" },
        { label: "Eucalyptus Steam", hex: "#0f766e", batch: "LOT-E08" },
      ],
    },
    {
      id: "linen-hydrosol-mist",
      sku: "BLM-305",
      name: "White Tea & Blossom Hydrosol Mist",
      category: "home",
      step: "hydrate",
      subtitle: "Alcohol-free botanical distillate safe for facial toning, linen pillows and sunlit rooms.",
      notes: "Silver Needle Tea · Orange Flower · Rainwater",
      bottlePrice: 29,
      refillPrice: 46,
      bottleSize: "150 ml Fine Atomizer",
      refillSize: "500 ml Refill Bottle",
      weightGrams: 340,
      stock: 36,
      image: img("mist"),
      alt: "Spring blossoms in soft natural daylight",
      scents: [
        { label: "White Tea Blossom", hex: "#65a30d", batch: "LOT-W05" },
        { label: "Lavender Highland", hex: "#6d597a", batch: "LOT-L14" },
      ],
    },
    {
      id: "zero-waste-starter-set",
      sku: "BLM-401",
      name: "Forever Glass Dispenser + 2 Pouches",
      category: "refills",
      step: "treat",
      subtitle: "Two weighted UV-violet apothecary pump bottles paired with two 500 ml aluminum refill pouches.",
      notes: "Cuts single-use plastic by 82% per year",
      bottlePrice: 68,
      refillPrice: 62,
      bottleSize: "2 Glass Bottles + 2 Pouches",
      refillSize: "4-Pouch Annual Pack",
      weightGrams: 1200,
      stock: 15,
      badge: "Save 20%",
      image: img("refill"),
      alt: "Minimalist apothecary bottles arranged in bright studio light",
      scents: [
        { label: "Signature Botanical Duo", hex: "#14532d", batch: "LOT-S01" },
        { label: "Citrus Morning Duo", hex: "#ea580c", batch: "LOT-S02" },
      ],
    },
  ] as (BloomProduct & { refillPriceNote?: string })[],

  couriers: [
    { id: "cold", name: "Insulated Cold-Pack Express (1–2 days)", baseRate: 5, perKg: 1.5, note: "Thermal liner + plant-based ice pack for fresh serums" },
    { id: "eco", name: "Carbon-Neutral Ground (2–4 days)", baseRate: 3, perKg: 1.0, note: "100% recycled honeycomb kraft mailer" },
    { id: "tap", name: "In-Store Refill Bar Pickup", baseRate: 0, perKg: 0, note: "Ready in 30 mins at 19 Conservatory Walk" },
  ],

  stats: [
    { value: 18400, suffix: "+", label: "Single-use plastic bottles prevented via our refill pouches" },
    { value: 7, suffix: " days", label: "Maximum age of any cold-pressed serum batch on our shelves" },
    { value: 100, suffix: "%", label: "Botanical ingredients with harvest-lot origin certificates" },
    { value: 15, suffix: "%", label: "Instant savings when building a 3-step botanical ritual" },
  ],

  faqs: [
    {
      q: "How do the aluminum refill pouches work?",
      a: "Keep your heavy UV-amber glass bottle on your vanity and order the 500 ml or 1000 ml spout pouch when you run low. Each pouch refills your bottle two to three times while cutting packaging waste by 82%.",
    },
    {
      q: "Can I bring my own empty jars to your physical Refill Tap Bar?",
      a: "Yes. Bring any clean glass or aluminum container to 19 Conservatory Walk and our apothecary team will tare the weight, sanitize the neck, and fill it by the gram.",
    },
    {
      q: "Why do you ship facial oils with an insulated cold pack?",
      a: "Cold-pressed rosehip, sea buckthorn and bakuchiol retain peak antioxidant potency when shielded from transit heat. Our biodegradable thermal liners keep parcels cool up to 48 hours.",
    },
    {
      q: "Are your botanical formulas safe for sensitive skin?",
      a: "Every formula is free from synthetic fragrance, sulfates and silicones, and we offer an unscented chamomile-distillate option on our core cleanser for reactive skin.",
    },
    {
      q: "Do you supply boutique hotels and spas with bulk refills?",
      a: "We partner with design hotels, yoga studios and restaurants for 5-liter dispenser jerrycans and custom ceramic wall brackets. Send us a note below for wholesale pricing.",
    },
  ],
};
