import type { TemplateMeta } from "@/lib/registry";

// Owned by the food agent. Add one entry per template you build (3 total).
export const food: TemplateMeta[] = [
  { sector: "food", slug: "ember", name: "Ember", tagline: "Fire-lit fine dining", description: "Fire-lit steakhouse template with a cursor-following menu, a tasting timeline that draws as you scroll, stacking process cards and a reservation form.", palette: ["#14100e", "#f2e8d8", "#ff6a1f"], motion: ["Menu photo follows the cursor", "Scroll-drawn tasting timeline", "Fire glow and rising sparks", "Pinned horizontal gallery"], pages: 1 },
  { sector: "food", slug: "bowl", name: "Bowl", tagline: "Organic bowls & cold press", description: "Fresh, vibrant organic grain bowl bar and cold-press counter with a live custom bowl nutrition builder, seasonal harvest bento and morning breakfast pots.", palette: ["#fbf9f4", "#17231a", "#d95c26"], motion: ["Live custom bowl builder HUD", "Ingredient reveal on scroll", "Stats counters", "Filterable recipe cards"], pages: 1 },
  { sector: "food", slug: "crumb", name: "Crumb", tagline: "Artisan sourdough & specialty brew", description: "An artisan sourdough bakery and specialty espresso bar with an interactive bake schedule, fermentation depth slider, single-origin coffee cards, and pre-order counter.", palette: ["#f7f3ec", "#1e1411", "#b85e28"], motion: ["Interactive fermentation depth slider", "Morning deck pull schedule", "Specialty coffee cards", "Clip-path bakery reveals"], pages: 1 },
];
