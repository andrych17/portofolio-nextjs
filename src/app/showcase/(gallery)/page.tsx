import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SectorNav } from "@/components/gallery/SectorNav";
import { TemplateCard } from "@/components/gallery/TemplateCard";
import { sectors, templatePath, templates, templatesOf } from "@/lib/registry";
import { absoluteUrl } from "@/lib/site";

const title = "Web Showcase by Sector · Andry Huang";
const description =
  "Interactive, mobile-first web showcase for e-commerce, agency, fashion, tech, food, property, health and logistics. SEO, AEO and GEO built in. Made with Next.js.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { type: "website", url: absoluteUrl("/"), title, description, siteName: "Andry Huang" },
};

export default function GalleryHome() {
  const groups = sectors.map((sector) => ({ sector, list: templatesOf(sector.slug) })).filter((g) => g.list.length);
  let seen = 0;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Web showcase by sector",
          description,
          url: absoluteUrl("/"),
          author: { "@type": "Person", name: "Andry Huang", url: "https://andryhuang.com" },
          hasPart: sectors.map((s) => ({ "@type": "CollectionPage", name: `${s.name} web showcase`, url: absoluteUrl(`/${s.slug}`) })),
          mainEntity: {
            "@type": "ItemList",
            itemListElement: templates.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: `${t.name}: ${t.tagline}`, url: absoluteUrl(templatePath(t)) })),
          },
        }}
      />
      <h1 id="top" className="sr-only">
        Web Showcase by Sector
      </h1>

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
    </>
  );
}
