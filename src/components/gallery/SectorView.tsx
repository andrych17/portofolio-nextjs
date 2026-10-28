import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { JsonLd } from "@/components/JsonLd";
import { TemplateCard } from "@/components/gallery/TemplateCard";
import { Reveal } from "@/components/motion/Reveal";
import { RiseLines } from "@/components/motion/RiseLines";
import { faqSchema } from "@/lib/jsonld";
import { getSector, templatePath, templatesOf, type SectorSlug } from "@/lib/registry";
import { absoluteUrl } from "@/lib/site";

export function sectorMetadata(slug: SectorSlug): Metadata {
  const sector = getSector(slug)!;
  const title = `${sector.name} Web Showcase · Andry Huang`;
  return {
    title: { absolute: title },
    description: sector.description,
    alternates: { canonical: absoluteUrl(`/${sector.slug}`) },
    openGraph: { type: "website", url: absoluteUrl(`/${sector.slug}`), title, description: sector.description, siteName: "Andry Huang" },
  };
}

const faqs = (sector: string) => [
  { q: `Are these ${sector.toLowerCase()} showcase demos finished websites?`, a: "They are complete, animated front-end builds with working navigation, interactive components, forms and SEO markup. You supply the brand name, copy and photos, and I can handle the full customization for you." },
  { q: "Do the showcase designs work on phones?", a: "Yes. Every showcase build is designed mobile-first and checked at 390 px and 1440 px wide, with reduced-motion support for visitors who turn animation off." },
  { q: "How do I commission one for my business?", a: "Pick a showcase direction, then message me through andryhuang.com. I replace Your Brand with your identity, adapt the copy, integrate your assets and deploy it on your domain." },
];

export function SectorView({ slug }: { slug: SectorSlug }) {
  const sector = getSector(slug)!;
  const list = templatesOf(sector.slug);
  const qa = faqs(sector.name);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${sector.name} web showcase`,
            description: sector.description,
            url: absoluteUrl(`/${sector.slug}`),
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Showcase", item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: sector.name, item: absoluteUrl(`/${sector.slug}`) },
              ],
            },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: list.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: `${t.name}: ${t.tagline}`, url: absoluteUrl(templatePath(t)) })),
            },
          },
          faqSchema(qa),
        ]}
      />
      <section className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-10 md:pb-16 md:pt-16" aria-labelledby="top">
        <Link href="/showcase" className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg">
          ← All sectors
        </Link>
        <RiseLines
          id="top"
          className="wide mt-6 font-display text-[clamp(2.4rem,7.4vw,6.5rem)] font-black uppercase leading-[0.94] tracking-[-0.015em]"
          lines={[sector.name, <span key="s" className="text-accent">showcase</span>]}
        />
        <Reveal delay={0.3}>
          <p data-speakable className="mt-7 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{sector.description}</p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 px-5 md:grid-cols-2 md:px-10 lg:grid-cols-3" aria-label={`${sector.name} showcase`}>
        {list.length ? (
          list.map((t, i) => <TemplateCard key={t.slug} t={t} index={i} />)
        ) : (
          <p className="col-span-full rounded-[2rem] bg-white/[0.04] p-10 text-muted ring-1 ring-white/10">Showcase demos for this sector are on the way.</p>
        )}
      </section>

      <section className="mx-auto mt-24 max-w-[1400px] px-5 md:px-10" aria-labelledby="faq">
        <h2 id="faq" className="wide font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">Questions</h2>
        <Accordion
          items={qa}
          className="mt-8 max-w-3xl"
          itemClassName="border-b border-line"
          questionClassName="py-5 text-lg font-medium"
          answerClassName="pb-6 text-muted"
        />
      </section>
    </>
  );
}
