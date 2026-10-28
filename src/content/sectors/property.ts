import type { TemplateMeta } from "@/lib/registry";

// Owned by the property agent. Add one entry per template you build (3 total).
export const property: TemplateMeta[] = [
  {
    sector: "property",
    slug: "estate",
    name: "Estate",
    tagline: "Luxury developer and agent",
    description:
      "A luxury property developer website in forest green and brass, with a parallax hero, filterable listings, a virtual-tour viewer and an installment calculator.",
    palette: ["#f6f2ea", "#14261e", "#b08d4b"],
    motion: ["Parallax hero", "Filterable listings", "Drag-to-look tour", "Live installment calculator"],
    pages: 1,
  },
  {
    sector: "property",
    slug: "foundry",
    name: "Foundry",
    tagline: "Industrial builder, safety yellow",
    description:
      "An industrial contractor website on blueprint paper in concrete grey and safety yellow, with self-drawing dimension lines, a pinned project run and a live injury chart.",
    palette: ["#d9d8d3", "#141414", "#ffd100"],
    motion: ["Self-drawing dimension lines", "Pinned horizontal project run", "Animated injury-rate chart", "Scroll-filled process rail"],
    pages: 1,
  },
  {
    sector: "property",
    slug: "atrium",
    name: "Atrium",
    tagline: "City-centre offices, lift-lit",
    description:
      "A city-centre workspace landlord website in fog grey, ink and vermilion, with a scroll-opened light well, a tower cut open floor by floor and a lift display that counts up.",
    palette: ["#e8ebea", "#0b1319", "#ff4a1c"],
    motion: ["Scroll-opened light well", "Floor-by-floor tower section", "Cursor-following building index", "Rolling step counter"],
    pages: 1,
  },
];
