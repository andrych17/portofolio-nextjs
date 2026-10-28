import type { TemplateMeta } from "@/lib/registry";

export const ecommerce: TemplateMeta[] = [
  {
    sector: "ecommerce",
    slug: "kiln",
    name: "Kiln",
    tagline: "Craft supply & ceramic storefront",
    description:
      "An artisanal ceramics, glaze and craft supply storefront in warm cream and terracotta, with live search, batch-lot swatches, shelf stock sync, cart drawer and studio passes.",
    palette: ["#faf6ef", "#1e1916", "#c44d34"],
    motion: ["Live catalog filter & search", "Batch-lot swatch selector", "Slide-over cart & shipping calc", "Studio workshop pass booking"],
    pages: 1,
  },
  {
    sector: "ecommerce",
    slug: "bloom",
    name: "Bloom",
    tagline: "Botanical apothecary & refill bar",
    description:
      "A bright botanical skincare, room mist and zero-waste refill storefront in mint alabaster and forest green, with scent notes filter, pouch refill calculator and routine bundle builder.",
    palette: ["#f6faf7", "#142e1f", "#1b5e3a"],
    motion: ["Interactive refill savings calculator", "Scent & skin-type catalog filter", "3-step routine bundle builder", "Slide-over bag & courier quote"],
    pages: 1,
  },
  {
    sector: "ecommerce",
    slug: "play",
    name: "Play",
    tagline: "Mechanical keyboards & desk gear",
    description:
      "A crisp daylight hobbyist storefront for custom mechanical keyboards, switches and desk accessories in paper white and cobalt blue, with switch feel selector, live warehouse stock and custom kit builder.",
    palette: ["#f6f8fc", "#0f172a", "#2546f0"],
    motion: ["Switch actuation & feel filter", "Custom barebones kit configurator", "Multi-warehouse live stock badges", "Slide-over bag & express shipping"],
    pages: 1,
  },
];
