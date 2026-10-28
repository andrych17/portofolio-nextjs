import { agency } from "@/content/sectors/agency";
import { ecommerce } from "@/content/sectors/ecommerce";
import { fashion } from "@/content/sectors/fashion";
import { food } from "@/content/sectors/food";
import { health } from "@/content/sectors/health";
import { logistics } from "@/content/sectors/logistics";
import { property } from "@/content/sectors/property";
import { tech } from "@/content/sectors/tech";

export type SectorSlug = "ecommerce" | "agency" | "fashion" | "tech" | "food" | "property" | "health" | "logistics";

export type Sector = { slug: SectorSlug; name: string; blurb: string; description: string };

export type TemplateMeta = {
  sector: SectorSlug;
  /** URL segment: /template/<sector>/<slug>. Also the folder name under app/(demo)/<sector>/. */
  slug: string;
  /** Style name shown in the gallery ("Maison", "Street"). The brand inside the demo is always "Your Brand". */
  name: string;
  tagline: string;
  /** 140-160 characters, plain sentence, used for meta description and gallery card. */
  description: string;
  /** Three hex colors: background, ink, accent. Shown as swatches on the card. */
  palette: [string, string, string];
  /** Short motion highlights, e.g. ["Horizontal lookbook", "Image mask reveal"]. 2-4 items. */
  motion: string[];
  /** Number of pages: 1 for one-pagers, 5 for the agency set. */
  pages: number;
};

export const sectors: Sector[] = [
  { slug: "ecommerce", name: "E-Commerce & Retail", blurb: "Online storefronts, craft supply shops and retail catalogs.", description: "Animated e-commerce storefront templates with interactive product filtering, batch-lot variant swatches, live stock indicators, cart drawer and shipping estimator." },
  { slug: "agency", name: "Agency & Studio", blurb: "Design studios, creative and digital agencies.", description: "Animated website templates for design studios, branding and digital agencies, with portfolio, process and contact pages." },
  { slug: "fashion", name: "Fashion & Apparel", blurb: "Labels, boutiques and streetwear drops.", description: "Animated website templates for fashion labels, boutiques and streetwear brands, with lookbooks and product showcases." },
  { slug: "tech", name: "Tech & SaaS", blurb: "Software, AI and developer products.", description: "Animated landing page templates for SaaS, AI and developer tools, with product demos, pricing and docs-style sections." },
  { slug: "food", name: "Food & Beverage", blurb: "Restaurants, cafes, bakeries and delivery.", description: "Animated website templates for restaurants, cafes and food brands, with menus, reservations and ordering." },
  { slug: "property", name: "Property & Construction", blurb: "Developers, agents, contractors and architects.", description: "Animated company profile templates for property developers, real estate agents, contractors and architecture studios." },
  { slug: "health", name: "Health & Clinic", blurb: "Clinics, dentists, wellness and spas.", description: "Animated website templates for clinics, dental practices and wellness brands, with doctor profiles and booking." },
  { slug: "logistics", name: "Logistics & Industrial", blurb: "Freight, fleet, manufacturing and supply chain.", description: "Animated company profile templates for logistics, freight and industrial companies, with tracking, coverage and capability sections." },
];

export const templates: TemplateMeta[] = [...ecommerce, ...agency, ...fashion, ...tech, ...food, ...property, ...health, ...logistics];

export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);
export const templatesOf = (sector: string) => templates.filter((t) => t.sector === sector);
export const getTemplate = (sector: string, slug: string) => templates.find((t) => t.sector === sector && t.slug === slug);

/** App path of a template's home page. */
export const templatePath = (t: Pick<TemplateMeta, "sector" | "slug">) => `/template/${t.sector}/${t.slug}`;
/** Thumbnail for gallery cards. next/image does not add basePath to public files, so it is spelled out here. */
export const thumbSrc = (t: Pick<TemplateMeta, "sector" | "slug">) => `/template/thumbs/${t.sector}-${t.slug}.webp`;
