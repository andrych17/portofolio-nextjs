// Photos: derived from Unsplash-licensed studio/desk/hardware images in public/template/images/
const img = (name: string) => `/template/images/ecommerce/play/${name}.webp`;

export type PlayCategory = "all" | "kits" | "switches" | "keycaps" | "desk";

export type PlayProduct = {
  id: string;
  sku: string;
  name: string;
  category: Exclude<PlayCategory, "all">;
  spec: string;
  subtitle: string;
  price: number;
  weightGrams: number;
  badge?: string;
  image: string;
  alt: string;
  variants: { label: string; hex: string; hubStock: number }[];
};

export const play = {
  path: "/ecommerce/play",
  title: "Your Brand · Mechanical Keyboards, Switches & Desk Gear Storefront",
  description:
    "Shop CNC aluminum barebones keyboard kits, factory-lubed mechanical switches, dye-sub PBT keycaps and desk accessories at Your Brand.",
  speakable:
    "Your Brand is a daylight-first hobbyist storefront for custom mechanical keyboards, tactile and linear switches, keycap sets and precision desk accessories with real-time multi-warehouse stock.",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  street: "88 Typing Arcade, Tech District",
  city: "Surabaya",
  postalCode: "60271",
  countryCode: "ID",
  hours: "Mon–Sun, 10:00–21:00 · Switch Tester Bar & Pickup Counter",

  marquee: [
    "In-Stock Ready to Ship (No 12-Month Group Buys)",
    "Hand-Lubed Switch Batch QA",
    "QMK / VIA Open Firmware Ready",
    "Anti-Crush Foam Mailer Boxes",
    "In-Store 96-Switch Tester Wall",
    "Instant QRIS & Virtual Account",
  ],

  categories: [
    { id: "all" as const, label: "All Hardware", count: 6 },
    { id: "kits" as const, label: "Barebones Kits", count: 2 },
    { id: "switches" as const, label: "Switches (35-Pack)", count: 2 },
    { id: "keycaps" as const, label: "PBT Keycap Sets", count: 1 },
    { id: "desk" as const, label: "Cables & Desk", count: 1 },
  ],

  products: [
    {
      id: "mono65-cnc-kit",
      sku: "KBD-065",
      name: "Mono65 Gasket CNC Aluminum Kit",
      category: "kits",
      spec: "65% · Hot-Swap PCB · QMK/VIA",
      subtitle: "6063 bead-blasted aluminum case with silicone sock gaskets, brass internal weight and south-facing RGB PCB.",
      price: 148,
      weightGrams: 1650,
      badge: "In-Stock Drop",
      image: img("hero"),
      alt: "Clean minimalist workspace with keyboard and glasses on a wooden desk",
      variants: [
        { label: "Electrophoretic Milk White", hex: "#f1f5f9", hubStock: 18 },
        { label: "Cobalt Anodized Blue", hex: "#2546f0", hubStock: 11 },
        { label: "Space Slate Grey", hex: "#334155", hubStock: 14 },
      ],
    },
    {
      id: "ortho75-pro-kit",
      sku: "KBD-075",
      name: "Field75 Rotary Knob Barebones Kit",
      category: "kits",
      spec: "75% + Detented Encoder · Tri-Mode",
      subtitle: "Polycarbonate plate for deep marbly acoustics, knurled aluminum volume encoder and 4000 mAh wireless battery.",
      price: 165,
      weightGrams: 1800,
      badge: "Rotary Encoder",
      image: img("board"),
      alt: "Precision geometric grid layout representing custom keyboard matrix",
      variants: [
        { label: "Silver Mist", hex: "#cbd5e1", hubStock: 9 },
        { label: "Signal Amber", hex: "#f59e0b", hubStock: 7 },
      ],
    },
    {
      id: "cloud-linear-switches",
      sku: "SW-L45",
      name: "POM Cloud Linear Switches · 35 Pack",
      category: "switches",
      spec: "45g Operating · 3.6mm Travel · 5-Pin",
      subtitle: "Full-POM housing with long-pole LY stem and light factory Krytox 205g0 lube on rails for a deep clack.",
      price: 19,
      weightGrams: 180,
      badge: "Best Seller",
      image: img("switches"),
      alt: "Rows of precision metal mechanical components arranged on white paper",
      variants: [
        { label: "45g Light Linear", hex: "#38bdf8", hubStock: 84 },
        { label: "55g Heavy Linear", hex: "#1d4ed8", hubStock: 52 },
      ],
    },
    {
      id: "citrus-tactile-switches",
      sku: "SW-T58",
      name: "Bergamot Snappy Tactile Switches · 35 Pack",
      category: "switches",
      spec: "58g Bottom-Out · D-Bump Tactile · 5-Pin",
      subtitle: "Zero pre-travel rounded tactile bump with 22mm two-stage gold-plated spring for crisp coding feedback.",
      price: 21,
      weightGrams: 180,
      image: img("studio"),
      alt: "Precision tools and hardware samples arranged on a clean surface",
      variants: [
        { label: "58g Crisp Tactile", hex: "#f97316", hubStock: 63 },
        { label: "62g Silent Tactile", hex: "#10b981", hubStock: 39 },
      ],
    },
    {
      id: "swiss-pbt-keycaps",
      sku: "CAP-901",
      name: " International Typographic PBT Keycaps",
      category: "keycaps",
      spec: "Cherry Profile · 1.6mm Thick PBT · 148 Keys",
      subtitle: "Crisp five-side dye-sublimated legends with sub-legends and accent novelties for 60%, 65%, 75% and TKL layouts.",
      price: 54,
      weightGrams: 460,
      badge: "1.6mm Thick",
      image: img("keycaps"),
      alt: "Typography specimens and color swatches laid out on a studio table",
      variants: [
        { label: "Alabaster + Cobalt Accents", hex: "#2546f0", hubStock: 29 },
        { label: "Warm Paper + Orange Accents", hex: "#ea580c", hubStock: 21 },
      ],
    },
    {
      id: "aviator-coiled-cable",
      sku: "DSK-302",
      name: "Lemo-Style Detachable Coiled USB-C Cable",
      category: "desk",
      spec: "Double-Sleeved Techflex · CNC Connector",
      subtitle: "Reverse-coiled springy cable with quick-release metal push-pull connector for clean desk routing.",
      price: 36,
      weightGrams: 290,
      image: img("cable"),
      alt: "Precision hardware dials and braided connectors",
      variants: [
        { label: "Ice White + Chrome", hex: "#e2e8f0", hubStock: 33 },
        { label: "Cobalt Blue + Matte Black", hex: "#1e40af", hubStock: 19 },
      ],
    },
  ] satisfies PlayProduct[],

  couriers: [
    { id: "air", name: "Express Air Priority (1–2 days)", baseRate: 6, perKg: 2.0, note: "Foam-cornered anti-crush box + full transit insurance" },
    { id: "reg", name: "Standard Tracked Parcel (2–4 days)", baseRate: 3, perKg: 1.2, note: "Boxed with ESD-safe switch trays" },
    { id: "bar", name: "In-Store Switch Bar Pickup", baseRate: 0, perKg: 0, note: "Ready in 30 mins at 88 Typing Arcade" },
  ],

  stats: [
    { value: 100, suffix: "%", label: "In-stock items ready in our warehouse (zero multi-year group buys)" },
    { value: 96, suffix: " switches", label: "On our physical test wall to compare sound and actuation in person" },
    { value: 24, suffix: " hr", label: "Hot-swap PCB & stabilizer inspection before every kit ships" },
    { value: 4900, suffix: "+", label: "Custom builds shipped with zero bent switch pins" },
  ],

  faqs: [
    {
      q: "Are these keyboard kits in stock or group-buy pre-orders?",
      a: "Every barebones kit, switch pack and keycap set listed on our storefront is physically in stock on our Surabaya racks and ships within one business day.",
    },
    {
      q: "How many 35-pack switch boxes do I need for a 65% or 75% keyboard?",
      a: "A 65% board uses 67–68 switches (two 35-packs = 70 switches), while a 75% board uses 81–84 switches (three 35-packs = 105 switches, leaving spares).",
    },
    {
      q: "Do the switches arrive pre-lubed from the factory?",
      a: "Yes. Both our POM Cloud Linears and Bergamot Tactiles receive a light, uniform factory coat on the stem sliders and spring ends so you can mount them straight into a hot-swap PCB.",
    },
    {
      q: "Can I test the switches in person before buying?",
      a: "Visit our Switch Tester Bar at 88 Typing Arcade any day between 10:00 and 21:00 to try 96 switches mounted across aluminum, polycarbonate and FR4 plates.",
    },
    {
      q: "Do you offer assembly and stabilizer tuning for teams or gifts?",
      a: "We build custom corporate onboarding keyboards and tuned studio boards with custom laser-etched keycaps. Reach out via the form below for bulk or pre-assembled quotes.",
    },
  ],
};
