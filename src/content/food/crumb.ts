// Photos: picsum bakery & coffee set: beans, berries, brew, counter, honey, latte, redcup, room, table, teapot, tins
import type { Faq, Stat } from "@/content/types";

const img = (name: string) => `/template/images/food/crumb/${name}.webp`;

export type BakeItem = {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  price: number;
  timeOut: string;
  flour: string;
  image: string;
  alt: string;
};

export type CoffeeItem = {
  id: string;
  origin: string;
  process: string;
  notes: string[];
  price: number;
  roaster: string;
  image: string;
  alt: string;
};

export const crumb = {
  key: "food/crumb",
  path: "/food/crumb",
  name: "Your Brand",
  tagline: "Artisan sourdough & specialty brew",
  title: "Your Brand | Artisan Sourdough Bakery & Specialty Brew",
  description:
    "Your Brand bakes 36-hour wild sourdough loaves, flaky laminated viennoiserie and brews seasonal single-origin coffees in fresh morning batches.",
  answer:
    "Your Brand is an independent neighborhood sourdough bakery and coffee bar baking long-fermented breads and pulling light-roast espresso six mornings a week.",
  street: "19 Millstone Lane",
  city: "Old Town",
  postalCode: "00000",
  countryCode: "US",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  hours: [
    { days: "Tuesday to Saturday", time: "07:00 to 15:00 (or until sold out)" },
    { days: "Sunday", time: "08:00 to 14:00" },
    { days: "Monday", time: "Closed for milling & prep" },
  ],
  nav: [
    { href: "#bakes", label: "Oven Bakes" },
    { href: "#schedule", label: "Bake Schedule" },
    { href: "#coffee", label: "Coffee Bar" },
    { href: "#story", label: "The Mill" },
    { href: "#faq", label: "FAQ" },
    { href: "#reserve", label: "Pre-Order" },
  ],
  proof: [
    "36-Hour wild fermentation",
    "100% Stone-milled heritage grains",
    "Zero commercial yeast or improvers",
    "Baked in cast iron deck ovens",
    "Grass-fed Normandy butter lamination",
    "Direct-trade seasonal single origins",
  ],
  manifesto:
    "Great bread requires only three ingredients: heritage flour, clean water, and sea salt, brought to life by an active sourdough culture and unhurried time. We never rush dough with commercial yeast or artificial enzymes. Each loaf takes three days from milling to the oven deck.",
  heroImage: img("counter"),
  heroAlt: "Warm wooden bakery counter with freshly baked golden sourdough loaves and glass pastry cloches",
  bakes: [
    {
      id: "country-loaf",
      name: "Heritage Country Sourdough",
      tagline: "85% hydration, caramelized blistered crust",
      desc: "Stone-milled Red Fife and spelt flour blend, wild levain culture, open custard-like crumb and deep blistered crust.",
      price: 11,
      timeOut: "06:30 Daily",
      flour: "Heritage Red Fife & Hard Spring Wheat",
      image: img("table"),
      alt: "Freshly sliced sourdough bread on a wooden board showing open aerated crumb structure",
    },
    {
      id: "seeded-rye",
      name: "Toasted Seed & Dark Rye",
      tagline: "Toasted flax, sunflower, pumpkin & caraway",
      desc: "Whole dark rye flour cold-fermented for forty hours, packed with toasted seeds and coated in black sesame.",
      price: 12,
      timeOut: "07:15 Daily",
      flour: "Biodynamic Whole Dark Rye",
      image: img("honey"),
      alt: "Jar of golden raw honey beside rustic seeded bread on marble counter",
    },
    {
      id: "normandy-croissant",
      name: "Laminated Butter Croissant",
      tagline: "84% French butter, 27 featherweight layers",
      desc: "Slow-fermented French pastry flour laminated with cultured Normandy butter, baked until honeycomb amber.",
      price: 6,
      timeOut: "07:00 & 10:00",
      flour: "T55 French Pastry Flour",
      image: img("berries"),
      alt: "Flaky golden butter croissant dusted with light powdered sugar and fresh seasonal berries",
    },
    {
      id: "cardamom-knot",
      name: "Swedish Cardamom Knot",
      tagline: "Freshly ground green cardamom & pearl sugar",
      desc: "Sweet brioche dough enriched with whole milk, hand-twisted with spiced cardamom butter and finished with pearl sugar.",
      price: 6.5,
      timeOut: "08:00 Daily",
      flour: "Stone-Milled Golden Wheat",
      image: img("room"),
      alt: "Atmospheric bakery room with sunlight beaming onto wooden tables and pastry trays",
    },
  ] satisfies BakeItem[],
  schedule: [
    { time: "06:30", item: "Country Sourdough & Baguettes", status: "First Deck Pull", temp: "250°C Stone" },
    { time: "07:00", item: "Butter Croissants & Pain au Chocolat", status: "Hot from Convection", temp: "205°C Steam" },
    { time: "08:00", item: "Cardamom Knots & Cinnamon Morning Buns", status: "Second Batch", temp: "195°C Glazed" },
    { time: "10:30", item: "Rosemary Olive Oil Focaccia & Lunch Slices", status: "Mid-Day Harvest", temp: "240°C Cast Iron" },
  ],
  coffees: [
    {
      id: "ethiopia-yirg",
      origin: "Yirgacheffe, Ethiopia",
      process: "Washed Heirloom",
      notes: ["Bergamot", "White Peach", "Jasmine Blossom"],
      price: 6.5,
      roaster: "Light Roast Micro-Lot",
      image: img("brew"),
      alt: "Clear glass server of pour-over specialty coffee with ceramic dripper",
    },
    {
      id: "colombia-geisha",
      origin: "Huila, Colombia",
      process: "Natural Anaerobic",
      notes: ["Blood Orange", "Dark Cacao", "Wild Honey"],
      price: 7.0,
      roaster: "Direct Trade Nano-Lot",
      image: img("latte"),
      alt: "Ceramic cup with velvety latte art espresso milk drink on saucer",
    },
    {
      id: "house-espresso",
      origin: "Guatemala & Kenya",
      process: "Fully Washed Blend",
      notes: ["Toffee Crisp", "Black Cherry", "Pecan"],
      price: 4.5,
      roaster: "Seasonal House Espresso",
      image: img("beans"),
      alt: "Freshly roasted glossy whole bean coffee in a dark roasting tray",
    },
  ] satisfies CoffeeItem[],
  stats: [
    { value: 36, suffix: "h", label: "Slow wild fermentation window for deep digestibility" },
    { value: 100, suffix: "%", label: "Stone-milled regional grains without chemical additives" },
    { value: 3, label: "Simple pure ingredients: heritage grain, spring water, sea salt" },
    { value: 0, suffix: "g", label: "Commercial bakers yeast or artificial dough conditioners" },
  ] satisfies Stat[],
  faqs: [
    {
      q: "Why is your sourdough fermented for thirty-six hours?",
      a: "Extended cold fermentation breaks down complex gluten and phytic acid, allowing natural lactobacilli to unlock deep wheaty flavor while making each slice substantially easier to digest for sensitive stomachs.",
    },
    {
      q: "Can I pre-order bread for morning counter pickup?",
      a: "Yes. Pre-orders close at five in the afternoon the day prior so our bakers can shape and cold-proof the exact number of loaves needed for the morning deck pulls.",
    },
    {
      q: "Do you use commercial yeast in your croissants or brioche?",
      a: "Our croissants and sourdough loaves use zero commercial baker's yeast. We rely exclusively on our twelve-year-old mother starter fed twice daily with organic stone-ground rye.",
    },
    {
      q: "How should I store my country loaf at home?",
      a: "Keep your loaf cut-side down on a wooden cutting board or inside a breathable linen bread bag. Do not store sourdough in plastic or in the refrigerator, as cold air accelerates crumb staling.",
    },
    {
      q: "Do you offer non-dairy milk options for coffee?",
      a: "We steam house-made unsweetened oat milk and organic macadamia milk alongside whole milk from local pasture-raised cows.",
    },
    {
      q: "Can I order catering boxes for breakfast meetings?",
      a: "We offer pastry boxes and sliced sourdough breakfast platters with artisan churned butter and seasonal preserves for groups of eight to fifty. Pre-order forty-eight hours in advance.",
    },
  ] satisfies Faq[],
  testimonials: [
    {
      quote:
        "The Heritage Country Loaf stays moist and springy for four days on the counter. The blistering on the crust reminds me of village bakeries in the French Alps.",
      author: "Henri Laurent",
      role: "Pastry Chef & Neighbor",
    },
    {
      quote:
        "Their cardamom knot alongside a pour-over Geisha coffee is the single best Saturday morning ritual in the city. Truly uncompromising craft.",
      author: "Elena Rostova",
      role: "Architectural Designer",
    },
  ],
};
