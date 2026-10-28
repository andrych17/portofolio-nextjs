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
      "A luminous boutique dental studio site in porcelain white and oceanic cerulean, with an interactive treatment estimator, sensory-calm suites, and 3D scan bookings.",
    palette: ["#f8fafb", "#111822", "#167d8a"],
    motion: [
      "Interactive treatment investment estimator",
      "Clip-path acoustic suite reveals",
      "Stats counters",
      "Diagnostic procedure cards",
    ],
    pages: 1,
  },
  {
    sector: "health",
    slug: "serene",
    name: "Serene",
    tagline: "Integrative longevity & thermal recovery",
    description:
      "A warm stone longevity sanctuary site with an interactive biological circuit planner, private acoustic contrast suites, and targeted physiotherapy booking.",
    palette: ["#f6f4ee", "#161b17", "#2b5c40"],
    motion: [
      "Interactive biological circuit planner",
      "Clip-path thermal suite reveals",
      "Stats counters",
      "Therapy protocol cards",
    ],
    pages: 1,
  },
];
