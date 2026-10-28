import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { JsonLd } from "@/components/JsonLd";
import { SectorNav } from "@/components/gallery/SectorNav";
import { TemplateCard } from "@/components/gallery/TemplateCard";
import { faqSchema } from "@/lib/jsonld";
import { sectors, templatePath, templates, templatesOf } from "@/lib/registry";
import { absoluteUrl, siteUrl } from "@/lib/site";

const title = "Web Showcase by Sector · Andry Huang";
const description =
  "24 interactive, mobile-first Next.js websites across 8 sectors: e-commerce, agency, fashion, tech, food, property, health and logistics. Custom scroll choreography, 3D tilt, and SEO/AEO/GEO architecture.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    title,
    description,
    siteName: "Andry Huang",
    images: [{ url: `${siteUrl}/img/og-image.jpg?v=2`, width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/img/og-image.jpg?v=2`],
  },
};

const showcaseFaqs = [
  {
    q: "What is inside the Andry Huang Web Showcase?",
    a: "It is a curated collection of 24 live, interactive website builds across 8 sectors—E-Commerce, Agency, Fashion, Tech & SaaS, Food & Beverage, Property & Construction, Health & Clinic, and Logistics. Every site features its own visual art direction, interactive tools, and scroll motion choreography.",
  },
  {
    q: "How does each website differ in layout and animation?",
    a: "Instead of swapping colors on a single layout, each build uses distinct choreography: pinned horizontal lookbook rails, sticky stacking cards, 3D pointer-tracked tilt matrices, dual-speed parallax photography, live SVG telemetry diagrams, and word-by-word scroll-lit manifestos.",
  },
  {
    q: "Are these builds optimized for mobile, accessibility, and SEO/AEO?",
    a: "Yes. All 24 builds are mobile-first (tested from 390 px to 1440 px), respect prefers-reduced-motion, and ship with clean semantic HTML, Schema.org JSON-LD, and LLM-readable corpus endpoints (/showcase/llms.txt).",
  },
];

export default function GalleryHome() {
  const groups = sectors.map((sector) => ({ sector, list: templatesOf(sector.slug) })).filter((g) => g.list.length);
  let seen = 0;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Web Showcase by Sector · Andry Huang",
            description,
            url: absoluteUrl("/"),
            author: { "@type": "Person", name: "Andry Huang", url: siteUrl },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["#top", "[data-speakable]"],
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
                { "@type": "ListItem", position: 2, name: "Web Showcase", item: absoluteUrl("/") },
              ],
            },
            hasPart: sectors.map((s) => ({ "@type": "CollectionPage", name: `${s.name} web showcase`, url: absoluteUrl(`/${s.slug}`) })),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: templates.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: `${t.name}: ${t.tagline}`, url: absoluteUrl(templatePath(t)) })),
            },
          },
          faqSchema(showcaseFaqs),
        ]}
      />
      <section className="mx-auto max-w-[1400px] px-5 pb-8 pt-6 md:px-10 md:pb-12 md:pt-10" aria-labelledby="top">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          24 Live Builds · 8 Industries · Custom Scroll Choreography
        </p>
        <h1 id="top" className="wide mt-3 font-display text-[clamp(2.25rem,6vw,5.25rem)] font-black uppercase leading-[0.94] tracking-[-0.015em]">
          Web Showcase <span className="text-accent">by Sector</span>
        </h1>
        <p data-speakable className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Interactive storefronts, SaaS landing pages, studio portfolios, and industrial web platforms engineered with Next.js. Each build pairs bespoke art direction with custom scroll and pointer motion.
        </p>
      </section>

      <SectorNav items={groups.map((g) => ({ slug: g.sector.slug, name: g.sector.name.split(" ")[0], count: g.list.length }))} />

      {groups.map(({ sector, list }) => (
        <section key={sector.slug} id={sector.slug} aria-labelledby={`h-${sector.slug}`} className="mx-auto max-w-[1400px] px-5 pt-10 md:px-10 md:pt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 id={`h-${sector.slug}`} className="wide font-display text-2xl font-extrabold uppercase tracking-tight md:text-4xl">{sector.name}</h2>
              <p className="mt-1.5 text-sm text-muted md:text-base">{sector.blurb}</p>
            </div>
            <Link href={`/showcase/${sector.slug}`} className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg">
              All {list.length} →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((t, i) => (
              <TemplateCard key={t.slug} t={t} index={i} priority={seen++ < 3} />
            ))}
          </div>
        </section>
      ))}

      <section className="mx-auto mt-24 max-w-[1400px] px-5 md:px-10" aria-labelledby="faq">
        <h2 id="faq" className="wide font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">Questions</h2>
        <Accordion
          items={showcaseFaqs}
          className="mt-8 max-w-3xl"
          itemClassName="border-b border-line"
          questionClassName="py-5 text-lg font-medium"
          answerClassName="pb-6 text-muted"
        />
      </section>
    </>
  );
}
