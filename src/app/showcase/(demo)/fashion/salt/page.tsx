import Image from "next/image";
import { Accordion } from "@/components/Accordion";
import { JsonLd } from "@/components/JsonLd";
import { SaltContactForm } from "@/components/fashion/salt/SaltContactForm";
import { SaltHero } from "@/components/fashion/salt/SaltHero";
import { SaltLooks } from "@/components/fashion/salt/SaltLooks";
import { SaltNotes } from "@/components/fashion/salt/SaltNotes";
import { SaltPieces } from "@/components/fashion/salt/SaltPieces";
import { SaltPlanner } from "@/components/fashion/salt/SaltPlanner";
import { SaltRoute } from "@/components/fashion/salt/SaltRoute";
import { SaltWash } from "@/components/fashion/salt/SaltWash";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Counter } from "@/components/motion/Counter";
import { MaskText } from "@/components/motion/MaskText";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { salt } from "@/content/fashion/salt";
import { faqSchema, webPageSchema } from "@/lib/jsonld";
import { templateMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export const metadata = templateMetadata({ sector: "fashion", slug: "salt", title: salt.title, description: salt.description });

const productList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Summer 07",
  itemListElement: salt.pieces.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      description: `${p.kind}, ${p.fabric}.`,
      image: `${siteUrl}${p.image.src}`,
      brand: { "@type": "Brand", name: "Your Brand" },
      offers: { "@type": "Offer", price: p.price, priceCurrency: "USD", availability: "https://schema.org/InStock" },
    },
  })),
};

export default function SaltPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: salt.path, name: "Your Brand, linen resort clothing", description: salt.description, sectorName: "Fashion & Apparel", sector: "fashion" }),
          faqSchema(salt.faqs),
          productList,
        ]}
      />

      <SaltHero />

      <section aria-label="About the label" className="mx-auto max-w-[1700px] px-5 pb-16 md:px-10 md:pb-24">
        <p data-speakable className="max-w-5xl font-display text-[clamp(1.7rem,3.2vw,3.2rem)] leading-[1.12]">
          {salt.answer}
        </p>
      </section>

      <Marquee speed={-1.2} className="border-y border-line py-5">
        {salt.strip.map((item) => (
          <span key={item} className="flex items-center gap-8 pr-8 font-display text-2xl text-fg md:text-3xl">
            {item}
            <span aria-hidden className="size-2.5 rounded-full bg-accent" />
          </span>
        ))}
      </Marquee>

      <SaltPieces />
      <SaltPlanner />
      <SaltLooks />
      <SaltWash />

      <section id="story" aria-labelledby="story-title" className="bg-surface">
        <div className="mx-auto max-w-[1700px] px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-14 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-7">
              <p className="salt-caps text-muted">07 · The studio</p>
              <MaskText
                as="h2"
                id="story-title"
                className="mt-5 font-display text-[clamp(2.6rem,5.8vw,6rem)]"
                lines={["Nineteen people,", <span key="s" className="text-accent">one cutting table.</span>]}
              />
              <Reveal y={24}>
                <p className="mt-10 max-w-xl text-[1.12rem] leading-relaxed text-fg/90">{salt.manifesto}</p>
              </Reveal>
              <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-7">
                {salt.facts.map((f) => (
                  <div key={f.k} className="border-t border-line pt-4">
                    <dt className="salt-caps text-muted">{f.k}</dt>
                    <dd className="mt-1.5 text-lg font-medium">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative md:col-span-4 md:col-start-9">
              <ClipReveal className="aspect-[4/5] w-[82%] overflow-hidden rounded-[999px_999px_1.2rem_1.2rem] bg-bg">
                <Image src={salt.aboutImages[0].src} alt={salt.aboutImages[0].alt} fill sizes="(min-width: 768px) 28vw, 70vw" className="object-cover" />
              </ClipReveal>
              <ClipReveal className="-mt-16 ml-auto aspect-square w-[62%] overflow-hidden rounded-full bg-bg ring-[10px] ring-[var(--t-surface)] md:-mt-24" delay={0.15}>
                <Image src={salt.aboutImages[1].src} alt={salt.aboutImages[1].alt} fill sizes="(min-width: 768px) 22vw, 55vw" className="object-cover object-right" />
              </ClipReveal>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-2 gap-y-12 md:mt-32 md:grid-cols-4">
            {salt.stats.map((s) => (
              <div key={s.label} className="border-t border-line pr-4 pt-6">
                <p className="font-display text-[clamp(3rem,6.4vw,6.2rem)] leading-none text-accent">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="salt-caps mt-3 max-w-[14rem] text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SaltRoute />
      <SaltNotes />

      <section id="faq" aria-labelledby="faq-title" className="border-t border-line">
        <div className="mx-auto grid max-w-[1700px] gap-12 px-5 py-24 md:grid-cols-12 md:gap-6 md:px-10 md:py-36">
          <div className="md:col-span-5">
            <p className="salt-caps text-muted">08 · Before you ask</p>
            <h2 id="faq-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.4rem)]">
              Questions
            </h2>
          </div>
          <Accordion
            items={salt.faqs}
            className="md:col-span-7"
            itemClassName="border-t border-line last:border-b"
            questionClassName="py-6 text-[1.15rem] font-medium md:text-[1.3rem] hover:text-accent transition-colors"
            answerClassName="max-w-2xl pb-7 leading-relaxed text-fg/90"
            iconClassName="text-accent"
          />
        </div>
      </section>

      <section id="visit" aria-labelledby="visit-title" className="border-t border-line">
        <div className="mx-auto grid max-w-[1700px] gap-14 px-5 py-24 md:grid-cols-12 md:gap-8 md:px-10 md:py-36">
          <div className="md:col-span-5">
            <p className="salt-caps text-muted">09 · Visit or write</p>
            <h2 id="visit-title" className="mt-5 font-display text-[clamp(2.6rem,5vw,5rem)]">
              Come by <span className="text-accent">the studio.</span>
            </h2>
            <p className="mt-8 max-w-md text-[1.1rem] leading-relaxed text-fg/90">
              Try a piece on, watch the cutting table or book a styling call. If you cannot visit, write and we answer within one working day.
            </p>
            <address className="mt-8 not-italic leading-relaxed text-fg/90">
              {salt.street}, {salt.city} {salt.postalCode}, {salt.country}
              <br />
              <a href={`mailto:${salt.email}`} className="underline underline-offset-4 hover:text-accent">
                {salt.email}
              </a>
            </address>
            <ul className="mt-4 space-y-1 text-fg/80">
              {salt.hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <SaltContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
