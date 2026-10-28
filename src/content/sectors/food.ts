import type { TemplateMeta } from "@/lib/registry";

// Owned by the food agent. Add one entry per template you build (3 total).
export const food: TemplateMeta[] = [
  { sector: "food", slug: "ember", name: "Ember", tagline: "Fire-lit fine dining", description: "Fire-lit steakhouse website with a cursor-following menu, a tasting timeline that draws as you scroll, stacking process cards and a reservation form.", palette: ["#14100e", "#f2e8d8", "#ff6a1f"], motion: ["Menu photo follows the cursor", "Scroll-drawn tasting timeline", "Fire glow and rising sparks", "Pinned horizontal gallery"], pages: 1 },
  { sector: "food", slug: "bowl", name: "Bowl", tagline: "Organic bowls & cold press", description: "Fresh, vibrant organic grain bowl bar and cold-press counter with a centered parallax harvest masthead, 3D tilt recipe cards, scroll-lit nutrition manifesto, and live custom macro bowl builder.", palette: ["#fbf9f4", "#17231a", "#d95c26"], motion: ["Parallax harvest banner", "3D tilt bowl cards", "Scroll-lit nutrition manifesto", "Live custom macro builder HUD"], pages: 1 },
  { sector: "food", slug: "crumb", name: "Crumb", tagline: "Artisan sourdough & specialty brew", description: "An artisan sourdough bakery and specialty espresso bar with an arched parallax levain portrait, pinned horizontal oven-pull rail, interactive fermentation depth slider, and pre-order counter.", palette: ["#f7f3ec", "#1e1411", "#b85e28"], motion: ["Pinned horizontal oven-pull rail", "Arched parallax levain portrait", "Interactive fermentation slider", "Scroll-lit bakery manifesto"], pages: 1 },
];
