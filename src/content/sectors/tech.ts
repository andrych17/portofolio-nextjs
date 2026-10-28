import type { TemplateMeta } from "@/lib/registry";

// Owned by the tech agent. Add one entry per template you build (3 total).
export const tech: TemplateMeta[] = [
  {
    sector: "tech",
    slug: "pulse",
    name: "Pulse",
    tagline: "Dark, product-led analytics SaaS",
    description:
      "A near-black analytics SaaS page with a lime accent, a live dashboard drawn in SVG, bento features, a command palette mock and an animated pricing toggle.",
    palette: ["#0a0a08", "#efede4", "#c8f04a"],
    motion: ["Self-drawing line chart", "Live event stream", "Typing command palette", "Animated pricing toggle"],
    pages: 1,
  },
  {
    sector: "tech",
    slug: "grid",
    name: "Grid",
    tagline: "Light, Swiss-grid developer API",
    description:
      "A paper-white developer API site on a visible twelve-column grid, with a typing terminal, an animated delivery diagram, tabbed docs and a 90-day status board.",
    palette: ["#f6f5f0", "#0e0e0c", "#0f3dff"],
    motion: ["Typing terminal", "Self-drawing flow diagram", "Scroll-lit manifesto", "Stacking process cards"],
    pages: 1,
  },
  {
    sector: "tech",
    slug: "orbit",
    name: "Orbit",
    tagline: "Distributed GPU cloud & edge inference",
    description:
      "An obsidian-and-violet distributed GPU cloud infrastructure template with interactive SVG topology mesh, real-time inference TCO calculator, and 42-region Anycast latency HUD.",
    palette: ["#090d16", "#f8fafc", "#8b5cf6"],
    motion: ["Live cluster topology diagram", "Interactive token inference calculator", "Real-time edge latency HUD", "Bento architecture specs"],
    pages: 1,
  },
];
