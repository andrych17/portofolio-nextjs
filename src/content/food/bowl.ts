// Photos: picsum food & produce set: salad, corner, oranges, lemon, yogurt, raspberry, strawberries
import type { Faq, Stat } from "@/content/types";

const img = (name: string) => `/template/images/food/bowl/${name}.webp`;

export type BowlItem = {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  price: number;
  calories: number;
  protein: number;
  tags: ("V" | "GF" | "DF")[];
  image: string;
  alt: string;
};

export type BuilderCategory = {
  id: string;
  title: string;
  limit: number;
  options: { name: string; cal: number; protein: number; tag?: "V" | "GF" }[];
};

export const bowl = {
  key: "food/bowl",
  path: "/food/bowl",
  name: "Your Brand",
  tagline: "Organic grain bowls & cold press",
  title: "Your Brand | Organic Grain Bowls, Greens & Cold Press",
  description:
    "Your Brand serves organic grain bowls, crisp seasonal greens, cold-pressed elixirs and breakfast pots harvested from certified family growers every morning.",
  answer:
    "Your Brand is an all-day organic bowl counter and cold-press bar for health-conscious people who want clean, nutrient-dense meals made from produce harvested within forty-eight hours.",
  street: "48 Orchard Walk",
  city: "Greenwood",
  postalCode: "00000",
  countryCode: "US",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  hours: [
    { days: "Monday to Friday", time: "07:30 to 20:00" },
    { days: "Saturday & Sunday", time: "08:30 to 19:00" },
  ],
  nav: [
    { href: "#bowls", label: "Signature Bowls" },
    { href: "#builder", label: "Custom Builder" },
    { href: "#pots", label: "Breakfast Pots" },
    { href: "#story", label: "Growers" },
    { href: "#faq", label: "FAQ" },
    { href: "#visit", label: "Visit Us" },
  ],
  proof: [
    "100% Certified organic produce",
    "Harvested within 48 hours",
    "Zero refined seed oils or sugars",
    "Scratch dressings blended hourly",
    "Glass bottle circular deposit",
    "Compostable plant-fiber bowls",
  ],
  manifesto:
    "We believe food should give back more energy than it takes to digest. No shortcuts, no seed oils, and no mystery dressings from a plastic drum. Just cold-pressed oils, wild greens, sprouted grains and crisp roots pulled from nutrient-rich soil.",
  heroImage: img("salad"),
  heroAlt: "A vibrant organic grain bowl with dark greens, roasted sweet potato, seeds and tahini dressing",
  signatureBowls: [
    {
      id: "golden-earth",
      name: "Golden Earth Bowl",
      tagline: "Warm turmeric quinoa & roasted root medley",
      desc: "Warm tricolor quinoa, massaged Tuscan kale, honey roasted sweet potatoes, pickled red fennel, spiced chickpeas and stone-ground turmeric miso cream.",
      price: 16,
      calories: 540,
      protein: 18,
      tags: ["V", "GF", "DF"],
      image: img("salad"),
      alt: "Overhead view of a fresh grain bowl topped with colorful roasted vegetables and seeds",
    },
    {
      id: "green-goddess",
      name: "Wild Salmon Goddess",
      tagline: "Line-caught Pacific salmon & herb cream",
      desc: "Slow-roasted wild salmon, organic wild rice blend, shaved Persian cucumbers, baby spinach, avocado wedge and green goddess herb dressing.",
      price: 19,
      calories: 620,
      protein: 38,
      tags: ["GF", "DF"],
      image: img("corner"),
      alt: "Rustic restaurant corner with wooden dining tables and fresh natural morning light",
    },
    {
      id: "citrus-crunch",
      name: "Valencia Citrus Crunch",
      tagline: "Seasonal orange wheels, crisp edamame & ginger shoyu",
      desc: "Shredded purple cabbage, young edamame, shaved breakfast radish, fresh Valencia orange segments, toasted nori and sesame ginger dressing.",
      price: 15,
      calories: 460,
      protein: 16,
      tags: ["V", "GF", "DF"],
      image: img("oranges"),
      alt: "Freshly sliced bright organic oranges with citrus leaves on a marble prep board",
    },
    {
      id: "sunfire-protein",
      name: "Sunfire Protein Medley",
      tagline: "Sprouted lentils, grilled halloumi & lemon chili",
      desc: "Warm French green lentils, grilled artisanal halloumi, heirloom sun gold tomatoes, shaved cucumber ribbons, toasted pumpkin seeds and cold-pressed lemon chili oil.",
      price: 17,
      calories: 580,
      protein: 26,
      tags: ["GF"],
      image: img("lemon"),
      alt: "Fresh organic yellow lemons with green leaves in a sunlit kitchen window",
    },
  ] satisfies BowlItem[],
  breakfastPots: [
    {
      id: "probiotic-coconut",
      name: "Cultured Coconut Pot",
      tagline: "Small-batch cultured coconut cream & raw wildflower honey",
      desc: "Fermented coconut cream, sprouted buckwheat granola, fresh raspberries and raw wildflower honey drizzle.",
      price: 11,
      calories: 380,
      protein: 8,
      tags: ["V", "GF", "DF"],
      image: img("yogurt"),
      alt: "Ceramic cup with thick white cultured coconut yogurt and wooden spoon",
    },
    {
      id: "chia-raspberry",
      name: "Chia Berry Parfait",
      tagline: "Overnight cold-soaked chia, raspberry coulis & nibs",
      desc: "Almond milk chia pudding, crushed organic raspberries, Peruvian raw cacao nibs and toasted coconut flakes.",
      price: 10,
      calories: 320,
      protein: 11,
      tags: ["V", "GF", "DF"],
      image: img("raspberry"),
      alt: "Fresh bright organic raspberries in a shallow bowl",
    },
    {
      id: "strawberry-hemp",
      name: "Strawberry Hemp Pot",
      tagline: "Whipped macadamia cream, macerated strawberries & seeds",
      desc: "Whipped macadamia ricotta, macerated ripe strawberries, toasted Canadian hemp hearts and fresh garden mint.",
      price: 12,
      calories: 350,
      protein: 12,
      tags: ["V", "GF", "DF"],
      image: img("strawberries"),
      alt: "Ripe red organic strawberries ready for morning breakfast bowls",
    },
  ] satisfies BowlItem[],
  builderCategories: [
    {
      id: "base",
      title: "1. Select Base",
      limit: 1,
      options: [
        { name: "Warm Tricolor Quinoa", cal: 170, protein: 6, tag: "GF" },
        { name: "Organic Wild Rice Blend", cal: 160, protein: 5, tag: "GF" },
        { name: "Massaged Tuscan Kale", cal: 45, protein: 3, tag: "GF" },
        { name: "Baby Spinach & Arugula", cal: 25, protein: 2, tag: "GF" },
      ],
    },
    {
      id: "protein",
      title: "2. Pick Protein",
      limit: 1,
      options: [
        { name: "Organic Miso Baked Tofu", cal: 180, protein: 16, tag: "GF" },
        { name: "Slow-Herb Roasted Chicken", cal: 220, protein: 32, tag: "GF" },
        { name: "Wild Line-Caught Salmon", cal: 250, protein: 34, tag: "GF" },
        { name: "Crispy Spiced Chickpeas", cal: 160, protein: 9, tag: "GF" },
      ],
    },
    {
      id: "veggies",
      title: "3. Choose 2 Harvest Veggies",
      limit: 2,
      options: [
        { name: "Roasted Maple Sweet Potato", cal: 90, protein: 2, tag: "GF" },
        { name: "Charred Broccoli Florets", cal: 40, protein: 3, tag: "GF" },
        { name: "Pickled Fennel & Radish", cal: 25, protein: 1, tag: "GF" },
        { name: "Shaved Chioggia Beets", cal: 35, protein: 1, tag: "GF" },
        { name: "Hass Avocado Scoop (+2)", cal: 120, protein: 2, tag: "GF" },
      ],
    },
    {
      id: "crunch",
      title: "4. Crunch & Dressing",
      limit: 2,
      options: [
        { name: "Tamari Toasted Pumpkin Seeds", cal: 80, protein: 4, tag: "GF" },
        { name: "Sprouted Hemp Hearts", cal: 60, protein: 3, tag: "GF" },
        { name: "Turmeric Tahini Miso Cream", cal: 95, protein: 3, tag: "GF" },
        { name: "Green Goddess Herb Dressing", cal: 85, protein: 2, tag: "GF" },
        { name: "Sesame Ginger Shoyu", cal: 70, protein: 1, tag: "GF" },
      ],
    },
  ] satisfies BuilderCategory[],
  stats: [
    { value: 48, prefix: "<", suffix: "h", label: "Maximum elapsed time from regional harvest to counter" },
    { value: 100, suffix: "%", label: "Certified organic grains, leafy greens, seeds and roots" },
    { value: 0, suffix: "g", label: "Refined cane sugars, seed oils or artificial stabilizers" },
    { value: 14, suffix: " farms", label: "Independent family farms delivering within two hours" },
  ] satisfies Stat[],
  faqs: [
    {
      q: "Are all ingredients certified organic?",
      a: "Every leaf, seed, grain and root we purchase carries accredited organic certification. If a grower cannot supply certified stock in a bad frost, we suspend that dish until pure stock arrives.",
    },
    {
      q: "How do you handle severe nut or sesame allergies?",
      a: "We prepare all nut and seed items in a designated corner with dedicated boards and scoops, but our kitchen handles almonds, cashews, and sesame. Please notify team members before ordering.",
    },
    {
      q: "Can I build my own bowl online for takeaway pickup?",
      a: "Yes. You can select your warm base, protein, three raw or roasted vegetables, one crunch topping and scratch dressing through our online ordering counter for pickup in fifteen minutes.",
    },
    {
      q: "What happens to your glass cold-press bottles?",
      a: "Return clean bottles to any counter station for a one-dollar credit toward your next bowl. We sanitize and reuse every vessel in our closed-loop bottle washing bay.",
    },
    {
      q: "Do you offer vegan and gluten-free options across the entire menu?",
      a: "Over eighty percent of our menu is inherently vegan and naturally gluten-free. All allergen tags are marked clearly on our board and digital ordering screens.",
    },
    {
      q: "Where do your seasonal greens come from during winter?",
      a: "We partner with geothermal greenhouse farms fifty miles north for winter lettuces and microgreens, alongside hearty winter roots and squashes stored in temperature-controlled root cellars.",
    },
  ] satisfies Faq[],
  testimonials: [
    {
      quote:
        "The Wild Salmon Goddess bowl is my weekday staple. You can immediately taste the crispness of greens picked yesterday instead of limp leaves from a plastic tub.",
      author: "Maya Lin",
      role: "Architect & Daily Regular",
    },
    {
      quote:
        "Finally a lunch spot that does not hide seed oils and sugar syrups inside fancy vinaigrettes. The turmeric tahini dressing is pure culinary medicine.",
      author: "Dr. Julian Vance",
      role: "Integrative Health Practitioner",
    },
  ],
};
