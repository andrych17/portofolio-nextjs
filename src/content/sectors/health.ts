import type { TemplateMeta } from "@/lib/registry";

// Owned by the health agent. Add one entry per template you build (3 total).
export const health: TemplateMeta[] = [
  {
    sector: "health",
    slug: "clinic",
    name: "Clinic",
    tagline: "Family clinic with live booking",
    description:
      "A warm family clinic website in deep teal and coral, with a doctor roster, a step-by-step booking tool, department tabs and a 24-hour emergency desk.",
    palette: ["#f6f4ed", "#0e3535", "#f2694b"],
    motion: ["Self-drawing ECG line", "Step-by-step booking tool", "Department tabs", "Parallax clinic gallery"],
    pages: 1,
  },
  {
    sector: "health",
    slug: "dental",
    name: "Dental",
    tagline: "Boutique cosmetic & restorative dentistry",
    description:
      "A luminous boutique dental studio website in porcelain white and oceanic cerulean, with sticky stacking clinical discipline cards, 3D optical scan tilt HUD, scroll-lit calm manifesto, and treatment estimator.",
    palette: ["#f8fafb", "#111822", "#167d8a"],
    motion: [
      "Sticky stacking clinical cards",
      "3D optical scan tilt HUD",
      "Scroll-lit sensory manifesto",
      "Interactive treatment estimator",
    ],
    pages: 1,
  },
  {
    sector: "health",
    slug: "serene",
    name: "Serene",
    tagline: "Integrative longevity & thermal recovery",
    description:
      "A warm stone longevity sanctuary website with a pinned horizontal therapy protocol rail, wide parallax thermal bathhouse banner, live 85°C / 4°C contrast switcher, and biological circuit planner.",
    palette: ["#f6f4ee", "#161b17", "#2b5c40"],
    motion: [
      "Pinned horizontal therapy rail",
      "Live 85°C / 4°C contrast switcher",
      "Wide parallax sanctuary banner",
      "Biological circuit planner",
    ],
    pages: 1,
  },
];
