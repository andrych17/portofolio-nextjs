import type { TemplateMeta } from "@/lib/registry";

// Owned by the fashion agent. Add one entry per template you build (3 total).
export const fashion: TemplateMeta[] = [
  { sector: "fashion", slug: "maison", name: "Maison", tagline: "Luxury editorial label", description: "A luxury editorial label website in warm off-white and oxblood, with a horizontal collection run, clip-path image reveals and an appointment form. One page.", palette: ["#f3eee6", "#17130f", "#6b1d26"], motion: ["Horizontal collection run", "Clip-path image reveals", "Hover image follow", "Scroll-drawn process line"], pages: 1 },
  { sector: "fashion", slug: "street", name: "Street", tagline: "Streetwear drop label", description: "A streetwear drop label website in black and acid lime, with a live countdown, a swap-on-tap shop with a working bag, pinned past-drop cards and a scroll-filled drop week.", palette: ["#0d0d0d", "#efede6", "#d7ff1f"], motion: ["Live drop countdown", "Swap-on-tap product photos", "Pinned archive cards", "Scroll-filled drop week"], pages: 1 },
  { sector: "fashion", slug: "salt", name: "Salt", tagline: "Linen resort label", description: "A linen resort clothing label website made in Portugal, in tomato red, with a shade picker that repaints the whole page, a carry-on packing planner, a drag carousel and a before-and-after wash slider. One page.", palette: ["#cc3a16", "#fff4e4", "#0f4c5c"], motion: ["Ink-drop page repaint", "Live carry-on packing planner", "Drag-cursor look carousel", "Wash comparison slider"], pages: 1 },
];
