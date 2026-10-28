// Photos: derived from Unsplash-licensed studio/craft images in public/template/images/
const img = (name: string) => `/template/images/ecommerce/kiln/${name}.webp`;

export type KilnCategory = "all" | "clay" | "tools" | "kits" | "vessels";

export type KilnVariant = {
  label: string;
  hex: string;
  lot: string;
  stock: number;
};

export type KilnProduct = {
  id: string;
  sku: string;
  name: string;
  category: Exclude<KilnCategory, "all">;
  categoryLabel: string;
  subtitle: string;
  price: number;
  unit: string;
  weightGrams: number;
  coneRange: string;
  badge?: string;
  image: string;
  alt: string;
  variants: KilnVariant[];
};

export const kiln = {
  path: "/ecommerce/kiln",
  title: "Your Brand · Ceramic Supply, Glaze Lab & Maker Storefront",
  description:
    "Shop stoneware clays, small-batch glazes, trimming tools and studio passes at Your Brand, synced live with our flagship store shelves.",
  speakable:
    "Your Brand is an online craft supply storefront and ceramic studio offering batch-tracked stoneware clays, mineral glazes, pottery tools and open-studio passes with nationwide courier shipping.",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  street: "48 Kiln Yard Lane, District 04",
  city: "Surabaya",
  postalCode: "60241",
  countryCode: "ID",
  hours: "Mon–Sun, 09:00–20:00 · Flagship & Studio",

  marquee: [
    "Live Flagship Shelf Sync",
    "Batch-Lot Tracked Glazes",
    "Same-Day Dispatch Before 15:00",
    "Instant QRIS & Virtual Account",
    "Open-Wheel Studio Co-Working",
    "Protective Double-Wall Packing",
  ],

  categories: [
    { id: "all" as const, label: "All Supplies", count: 8 },
    { id: "clay" as const, label: "Clay & Glazes", count: 3 },
    { id: "tools" as const, label: "Wheel & Tools", count: 2 },
    { id: "kits" as const, label: "Starter Kits", count: 2 },
    { id: "vessels" as const, label: "Studio Vessels", count: 1 },
  ],

  products: [
    {
      id: "stoneware-block",
      sku: "CLY-604",
      name: "Speckled Buff Stoneware Clay",
      category: "clay",
      categoryLabel: "Clay & Glazes",
      subtitle: "De-aired throwing body with fine iron grog for clean wheel walls and warm toasted flecks.",
      price: 28,
      unit: "10 kg pugged bag",
      weightGrams: 2500,
      coneRange: "Cone 5–6",
      badge: "Best Seller",
      image: img("clay"),
      alt: "Warm stoneware clay jar and wooden dipper on a worktable",
      variants: [
        { label: "Warm Buff Speckle", hex: "#d6be9c", lot: "LOT-26B4", stock: 34 },
        { label: "Raw Terracotta", hex: "#b85c3c", lot: "LOT-26T1", stock: 19 },
        { label: "Basalt Dark Body", hex: "#3d3531", lot: "LOT-26D8", stock: 11 },
      ],
    },
    {
      id: "mineral-glaze",
      sku: "GLZ-218",
      name: "Ash & Celadon Brush Glaze",
      category: "clay",
      categoryLabel: "Clay & Glazes",
      subtitle: "Food-safe suspension glaze milled in small batches so iron pooling stays consistent across firings.",
      price: 22,
      unit: "500 ml pint jar",
      weightGrams: 750,
      coneRange: "Cone 6 Oxidation",
      badge: "New Batch",
      image: img("glaze"),
      alt: "Glass teapot and ceramic cup resting beside studio botanicals",
      variants: [
        { label: "Mist Celadon", hex: "#7d9382", lot: "LOT-C09", stock: 26 },
        { label: "Oatmeal Wood Ash", hex: "#e2d7c5", lot: "LOT-A14", stock: 18 },
        { label: "Persimmon Iron", hex: "#c44d34", lot: "LOT-P03", stock: 9 },
        { label: "Tenmoku Espresso", hex: "#28201c", lot: "LOT-T11", stock: 15 },
      ],
    },
    {
      id: "underglaze-palette",
      sku: "GLZ-309",
      name: "Velvet Underglaze Set · 6 Tones",
      category: "clay",
      categoryLabel: "Clay & Glazes",
      subtitle: "Opaque mineral pigments that hold crisp brushwork from leather-hard greenware up to cone 6.",
      price: 44,
      unit: "6 × 60 ml jars",
      weightGrams: 600,
      coneRange: "Cone 04–6",
      image: img("flatlay"),
      alt: "Color samples, sketches and studio notebooks spread across a wooden table",
      variants: [
        { label: "Earth & Ochre Set", hex: "#b97938", lot: "LOT-U21", stock: 14 },
        { label: "Botanical Sage Set", hex: "#4a6b53", lot: "LOT-U22", stock: 21 },
        { label: "Cobalt & Ink Set", hex: "#2c4668", lot: "LOT-U25", stock: 8 },
      ],
    },
    {
      id: "tungsten-trim-set",
      sku: "TLS-112",
      name: "Forged Carbon-Steel Trim Set",
      category: "tools",
      categoryLabel: "Wheel & Tools",
      subtitle: "Three balanced loop and pear-edge trimmers with oiled walnut handles that stay sharp through groggy clay.",
      price: 38,
      unit: "3-piece roll",
      weightGrams: 350,
      coneRange: "Hand-forged",
      badge: "Studio Pick",
      image: img("wheel"),
      alt: "Precision metal workshop parts arranged neatly on white paper",
      variants: [
        { label: "Walnut & Brass", hex: "#6a4932", lot: "BATCH-08", stock: 22 },
        { label: "Smoked Oak", hex: "#352d28", lot: "BATCH-09", stock: 12 },
      ],
    },
    {
      id: "banding-wheel",
      sku: "TLS-405",
      name: "Cast-Iron Sculpting Banding Wheel",
      category: "tools",
      categoryLabel: "Wheel & Tools",
      subtitle: "Heavy dual-bearing 20 cm turntable with concentric centering rings for coiling and glazing.",
      price: 64,
      unit: "20 cm · 3.8 kg",
      weightGrams: 3800,
      coneRange: "Heavy Duty",
      image: img("hero"),
      alt: "Curated craft tools, notebooks and measuring gear on a dark studio surface",
      variants: [
        { label: "Oxide Rust Coat", hex: "#8e412e", lot: "BATCH-14", stock: 7 },
        { label: "Matte Graphite", hex: "#2f3133", lot: "BATCH-15", stock: 16 },
      ],
    },
    {
      id: "home-pottery-kit",
      sku: "KIT-001",
      name: "At-Home Handbuilding Starter Box",
      category: "kits",
      categoryLabel: "Starter Kits",
      subtitle: "Everything for four mugs and two bowls at your kitchen table, including firing vouchers at our studio kiln.",
      price: 56,
      unit: "Complete box + 2 kiln tickets",
      weightGrams: 3200,
      coneRange: "Includes Firing",
      badge: "Gift Ready",
      image: img("tea"),
      alt: "Printed ceramic mug resting on a sunlit cafe table",
      variants: [
        { label: "Speckled Cream Kit", hex: "#dfd3c1", lot: "KIT-26A", stock: 29 },
        { label: "Terracotta & Sage Kit", hex: "#a7553b", lot: "KIT-26B", stock: 17 },
      ],
    },
    {
      id: "glaze-test-pack",
      sku: "KIT-019",
      name: "24-Tile Glaze Chemistry Sampler",
      category: "kits",
      categoryLabel: "Starter Kits",
      subtitle: "Pre-bisqued standing test tiles with dip recipes and firing logs so you can preview layering before a full batch.",
      price: 32,
      unit: "24 bisque tiles + notebook",
      weightGrams: 900,
      coneRange: "Cone 5–6",
      image: img("studio"),
      alt: "Long sunlit wooden studio table ready for makers",
      variants: [
        { label: "Buff Stoneware Tiles", hex: "#cbb89d", lot: "TILE-04", stock: 19 },
        { label: "Porcelain White Tiles", hex: "#f1ede6", lot: "TILE-05", stock: 24 },
      ],
    },
    {
      id: "thrown-pour-over",
      sku: "VSL-802",
      name: "Wheel-Thrown Fluted Pour-Over Set",
      category: "vessels",
      categoryLabel: "Studio Vessels",
      subtitle: "Dripper and 320 ml server thrown by our resident potters, glazed inside for clean coffee extraction.",
      price: 48,
      unit: "2-piece vessel set",
      weightGrams: 850,
      coneRange: "Dishwasher Safe",
      image: img("mug"),
      alt: "Handmade ceramic tableware plated on a warm tabletop",
      variants: [
        { label: "Shino Warm Cream", hex: "#e8dcc8", lot: "KILN-44", stock: 6 },
        { label: "Iron Rust Rim", hex: "#9e3f2b", lot: "KILN-45", stock: 10 },
        { label: "Moss Ash Glaze", hex: "#546856", lot: "KILN-46", stock: 8 },
      ],
    },
  ] satisfies KilnProduct[],

  couriers: [
    { id: "reg", name: "Regular Cargo (2–3 days)", baseRate: 4, perKg: 1.5, note: "Double-wall box + biodegradable honeycomb wrap" },
    { id: "exp", name: "Next-Day Express (1 day)", baseRate: 8, perKg: 2.5, note: "Priority air/land dispatch before 15:00" },
    { id: "instant", name: "Same-Day City Courier", baseRate: 6, perKg: 0.8, note: "Direct bike/van courier within city limits" },
    { id: "pickup", name: "Flagship Shelf Pickup", baseRate: 0, perKg: 0, note: "Ready in 45 mins at 48 Kiln Yard Lane" },
  ],

  workshops: [
    {
      code: "WS-01",
      title: "Open-Wheel Studio Pass",
      schedule: "Daily · 10:00–14:00 or 15:00–19:00",
      level: "Self-guided makers",
      price: "$18 / session",
      spots: "6 wheels available today",
      summary: "Drop into our sunlit co-working pottery floor. Includes Shimpo Whisper wheel access, bats, reclaim buckets, and damp-room shelf storage.",
    },
    {
      code: "WS-02",
      title: "First Time on the Wheel · Weekend Class",
      schedule: "Sat & Sun · 10:00–12:30",
      level: "Complete beginners",
      price: "$45 / person",
      spots: "4 seats left this Saturday",
      summary: "Center, pull and trim two everyday mugs with our resident instructors. We bisque, glaze in your chosen batch, and message you when ready.",
    },
    {
      code: "WS-03",
      title: "Glaze Mixing & Dye-Lot Consistency Lab",
      schedule: "Thursdays · 18:00–20:30",
      level: "Intermediate potters",
      price: "$52 / person",
      spots: "5 seats left",
      summary: "Learn specific-gravity hydrometer checks, iron-oxide percentages, and how to reproduce glaze batches across different clay bodies.",
    },
  ],

  stats: [
    { value: 1420, suffix: "+", label: "Active clay & glaze SKUs synced with our physical shelves" },
    { value: 99, suffix: ".4%", label: "Intact ceramic & liquid glaze delivery rate nationwide" },
    { value: 45, suffix: " min", label: "Average click-and-collect prep time at our flagship counter" },
    { value: 18, suffix: " wheels", label: "In our open-studio maker floor for classes and co-working" },
  ],

  steps: [
    {
      no: "01",
      title: "Pick exact batch & dye lot",
      body: "Natural minerals shift slightly between millings. Every clay bag and glaze jar lists its exact batch lot and real-time flagship shelf count so your firing stays predictable.",
    },
    {
      no: "02",
      title: "Instant checkout & live shipping weight",
      body: "Our cart calculates exact parcel weight from your clay bags and pint jars, quotes live courier rates, and accepts QRIS, virtual accounts, or cards.",
    },
    {
      no: "03",
      title: "Packed in-store or ready for studio pickup",
      body: "Orders placed before 15:00 leave our warehouse the same afternoon in double-wall kraft cartons, or wait on our pickup shelf if you are heading in for wheel hours.",
    },
  ],

  testimonials: [
    {
      quote: "Being able to check the exact glaze batch number online before ordering saved my 40-piece cafe dinnerware commission from color mismatch.",
      name: "Nadia K.",
      role: "Small-batch tableware potter",
    },
    {
      quote: "I order 20 kg of speckled stoneware on Tuesday morning and it arrives double-boxed without a single punctured bag. Their stock count is always accurate.",
      name: "Hendra W.",
      role: "Home studio ceramicist",
    },
    {
      quote: "The open-wheel studio pass plus the supply counter in one place feels like a second home. I buy my trimming tools right before class.",
      name: "Clara S.",
      role: "Weekend studio member",
    },
  ],

  faqs: [
    {
      q: "Is the stock shown on the website synced with your physical store?",
      a: "Yes. Every bag of clay, pint of glaze and tool roll shares one live inventory ledger with our flagship counter at 48 Kiln Yard Lane. When a studio member buys a jar at the register, the online batch count updates immediately.",
    },
    {
      q: "Why do your clay bodies and glazes list a batch or lot code?",
      a: "Raw feldspars, ball clays and iron oxides are mined minerals that vary subtly from season to season. Listing the lot number lets production potters buy enough from a single milling run for uniform kiln results.",
    },
    {
      q: "How do you ship heavy wet clay and liquid glazes without leaks?",
      a: "Clay pug bags are heat-sealed inside a secondary moisture sleeve, and glaze jars receive an induction foil seal plus corrugated neck collars inside double-wall kraft boxes.",
    },
    {
      q: "Can I buy supplies online and pick them up before my studio workshop?",
      a: "Yes. Select Flagship Shelf Pickup in the shipping estimator and your order will be staged at the studio front desk within 45 minutes at zero shipping cost.",
    },
    {
      q: "Do you offer kiln firing if I buy the At-Home Handbuilding Starter Box?",
      a: "Every starter box includes two firing vouchers covering bisque (Cone 04) and glaze firing (Cone 6) for up to six hand-built pieces at our studio kilns.",
    },
    {
      q: "Can schools or cafes order bulk clay and custom glaze batches?",
      a: "We supply schools, architecture studios and hospitality groups with pallet-rate stoneware and custom-tinted house glazes. Use the wholesale inquiry form below for a same-day quote.",
    },
  ],
};
