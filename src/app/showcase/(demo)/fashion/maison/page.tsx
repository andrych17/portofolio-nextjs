import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { MaisonAnswer, MaisonHero } from "@/components/fashion/maison/MaisonHero";
import { MaisonAtelier } from "@/components/fashion/maison/MaisonAtelier";
import { MaisonCollection } from "@/components/fashion/maison/MaisonCollection";
import { MaisonContactForm } from "@/components/fashion/maison/MaisonContactForm";
import { MaisonLookbook } from "@/components/fashion/maison/MaisonLookbook";
import { MaisonProcess } from "@/components/fashion/maison/MaisonProcess";
import { MaisonReadText } from "@/components/fashion/maison/MaisonReadText";
import { MaisonStats } from "@/components/fashion/maison/MaisonStats";
import { MaisonTestimonials } from "@/components/fashion/maison/MaisonTestimonials";
import { Accordion } from "@/components/Accordion";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Marquee } from "@/components/motion/Marquee";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { maison } from "@/content/fashion/maison";
import { faqSchema, webPageSchema } from "@/lib/jsonld";
import { templateMetadata } from "@/lib/seo";

export const metadata = templateMetadata({ sector: "fashion", slug: "maison", title: maison.title, description: maison.description });

const productList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Collection 07",
  itemListElement: maison.collection.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@type": "Product", name: p.name, description: `${p.kind}. ${p.note}`, brand: { "@type": "Brand", name: "Your Brand" } },
  })),
};

export default function MaisonPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: maison.path, name: "Your Brand, luxury tailoring and ready-to-wear", description: maison.description, sectorName: "Fashion & Apparel", sector: "fashion" }),
          faqSchema(maison.faqs),
          productList,
        ]}
      />

      <MaisonHero />
      <MaisonAnswer />

      <Marquee speed={-1.1} className="border-y border-line py-5">
        {maison.marquee.map((item) => (
          <span key={item} className="flex items-center gap-8 pr-8 font-display text-2xl font-light italic md:text-3xl">
            {item}
            <span aria-hidden className="size-1.5 rotate-45 bg-accent" />
          </span>
        ))}
      </Marquee>

      <section id="house" aria-labelledby="house-title" className="mx-auto max-w-[1700px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-14 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4 md:pt-28">
            <p className="maison-caps text-muted">(01) The house</p>
            <ClipReveal className="mt-8 aspect-[4/5] w-full max-w-sm bg-surface">
              <Image
                src="/template/images/fashion/maison/atelier.webp"
                alt="A black blazer hanging on a plank wall above folded shirts on a shelf"
                fill
                sizes="(min-width: 768px) 28vw, 90vw"
                className="object-cover"
              />
            </ClipReveal>
            <Reveal y={16}>
              <p className="mt-4 max-w-xs text-sm text-muted">The atelier wall, where every pattern hangs until it is next needed.</p>
            </Reveal>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <MaskText
              as="h2"
              id="house-title"
              className="font-display text-[clamp(3rem,6vw,6.6rem)] font-light leading-[0.92] tracking-[-0.02em]"
              lines={["A house of", <em key="e" className="text-accent">six pieces a season.</em>]}
            />
            <MaisonReadText text={maison.manifesto} className="mt-12 max-w-3xl font-display text-[clamp(1.55rem,2.5vw,2.6rem)] font-light leading-[1.2]" />
            <dl className="mt-16 grid grid-cols-3 gap-6 border-t border-line pt-6">
              {maison.facts.map((fact) => (
                <div key={fact.k}>
                  <dt className="maison-caps text-muted">{fact.k}</dt>
                  <dd className="mt-2 font-display text-2xl font-light md:text-3xl">{fact.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <MaisonCollection />

      <section id="atelier" aria-labelledby="atelier-title" className="mx-auto max-w-[1700px] px-5 py-24 md:px-10 md:py-40">
        <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
          <p className="maison-caps text-muted md:col-span-3">(03) The atelier</p>
          <MaskText
            as="h2"
            id="atelier-title"
            className="font-display text-[clamp(3rem,7.2vw,8rem)] font-light leading-[0.9] tracking-[-0.02em] md:col-span-9"
            lines={["Made for one person,", <em key="e" className="text-accent">then kept on file.</em>]}
          />
        </div>
        <MaisonAtelier />
      </section>

      <MaisonLookbook />
      <MaisonStats />
      <MaisonProcess />
      <MaisonTestimonials />

      <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-[1700px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <p className="maison-caps text-muted">(08) Questions</p>
            <h2 id="faq-title" className="mt-5 font-display text-[clamp(2.8rem,4.6vw,5rem)] font-light leading-[0.95] tracking-[-0.02em]">
              Before you <em className="text-accent">visit.</em>
            </h2>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-fg/70">Cloth, timing, repairs and returns. Anything else, write to us and a person replies.</p>
          </div>
          <Accordion
            items={maison.faqs}
            className="border-b border-line md:col-span-7 md:col-start-6"
            itemClassName="border-t border-line"
            questionClassName="py-6 font-display text-[1.5rem] font-light leading-tight md:text-[1.9rem]"
            answerClassName="max-w-xl pb-7 text-[15px] leading-relaxed text-fg/70"
            iconClassName="text-accent"
          />
        </div>
      </section>

      <section id="appointments" aria-labelledby="appointments-title" className="bg-surface/60">
        <div className="mx-auto max-w-[1700px] px-5 py-24 md:px-10 md:py-40">
          <div className="grid gap-14 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-5">
              <p className="maison-caps text-muted">(09) Appointments</p>
              <MaskText
                as="h2"
                id="appointments-title"
                className="mt-5 font-display text-[clamp(3.2rem,6vw,6.6rem)] font-light leading-[0.92] tracking-[-0.02em]"
                lines={["Come in", <em key="e" className="text-accent">for an hour.</em>]}
              />
              <dl className="mt-12 space-y-7 text-[15px]">
                <div>
                  <dt className="maison-caps text-muted">Atelier</dt>
                  <dd className="mt-2 leading-relaxed text-fg/80">
                    {maison.street}
                    <br />
                    {maison.postalCode} {maison.city}, {maison.country}
                  </dd>
                </div>
                <div>
                  <dt className="maison-caps text-muted">Hours</dt>
                  <dd className="mt-2 max-w-xs leading-relaxed text-fg/80">{maison.hours}</dd>
                </div>
                <div>
                  <dt className="maison-caps text-muted">Write or call</dt>
                  <dd className="mt-2 leading-relaxed text-fg/80">
                    <a href={`mailto:${maison.email}`} className="hover:text-accent">
                      {maison.email}
                    </a>
                    <br />
                    <a href={`tel:${maison.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                      {maison.phone}
                    </a>
                  </dd>
                </div>
              </dl>
              <ClipReveal direction="left" className="mt-12 hidden aspect-[4/3] max-w-md bg-surface md:block">
                <Image
                  src="/template/images/fashion/maison/door.webp"
                  alt="A weathered stone doorway with a carved wooden double door"
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              </ClipReveal>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <MaisonContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
