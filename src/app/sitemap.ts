import { MetadataRoute } from "next";
import { projects, getProjectSlug } from "@/data/projects";

// Gallery and sector pages live under /showcase. Demo pages are noindex.
const templateSectors = ["ecommerce", "agency", "fashion", "tech", "food", "property", "health", "logistics"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://andryhuang.com";
  const now = new Date();

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/works/${getProjectSlug(p)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.8 : 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portofolio`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/showcase`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...templateSectors.map((sector) => ({
      url: `${baseUrl}/showcase/${sector}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projectEntries,
  ];
}
