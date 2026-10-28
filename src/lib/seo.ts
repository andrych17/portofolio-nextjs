import type { Metadata } from "next";
import type { Studio } from "@/content/types";
import { absoluteUrl } from "./site";

type PageInfo = { title: string; description: string; path: string };

/** og:image comes from each template's opengraph-image.tsx. Next hashes that URL, so never hard-code it.
 * Per-page metadata for the three agency templates. Titles get the studio suffix from the template layout. */
export function pageMetadata(studio: Studio, page: PageInfo): Metadata {
  const fullTitle = `${page.title} · ${studio.name}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: absoluteUrl(page.path) },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: absoluteUrl(page.path),
      siteName: studio.name,
      title: fullTitle,
      description: page.description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: page.description },
  };
}

type TemplateInfo = { sector: string; slug: string; title: string; description: string };

/**
 * Metadata for a single-page template (every sector except agency).
 * `path` is the app path, e.g. "/fashion/maison". Demo pages are noindex via the (demo) layout.
 */
export function templateMetadata({ sector, slug, title, description }: TemplateInfo): Metadata {
  const path = `/${sector}/${slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: absoluteUrl(path),
      siteName: "Your Brand",
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
