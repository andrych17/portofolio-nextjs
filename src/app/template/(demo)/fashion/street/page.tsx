import Image from "next/image";
import { Accordion } from "@/components/Accordion";
import { JsonLd } from "@/components/JsonLd";
import { StreetArchive } from "@/components/fashion/street/StreetArchive";
import { StreetCalendar } from "@/components/fashion/street/StreetCalendar";
import { StreetContactForm } from "@/components/fashion/street/StreetContactForm";
import { StreetHero } from "@/components/fashion/street/StreetHero";
import { StreetNotes } from "@/components/fashion/street/StreetNotes";
import { StreetShop } from "@/components/fashion/street/StreetShop";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";
import { MaskText } from "@/components/motion/MaskText";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { street } from "@/content/fashion/street";
import { faqSchema, webPageSchema } from "@/lib/jsonld";
import { templateMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export const metadata = templateMetadata({ sector: "fashion", slug: "street", title: street.title, description: street.description });

const productList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Drop 07",
  itemListElement: street.products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      description: `${p.kind}, ${p.colour}.`,
      image: `${siteUrl}${p.images[0].src}`,
      brand: { "@type": "Brand", name: "Your Brand" },
      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: "USD",
        availability: p.tag === "Low stock" ? "https://schema.org/LimitedAvailability" : "https://schema.org/InStock",
      },
    },
  })),
};

export default function StreetPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: street.path, name: "Your Brand, streetwear label", description: street.description, sectorName: "Fashion & Apparel", sector: "fashion" }),
          faqSchema(street.faqs),
          productList,
        ]}
      />

      <StreetHero />

      <section aria-label="About the label" className="mx-auto max-w-[1700px] px-5 pb-20 pt-28 md:px-10 md:pb-28 md:pt-40">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="street-tag text-muted md:col-span-3">(00) In one line</p>
          <p data-speakable className="text-[clamp(1.5rem,2.8vw,2.6rem)] font-medium leading-[1.2] md:col-span-9">
            {street.answer}
          </p>
        </div>
      </section>

      <Marquee speed={-1.2} className="border-y border-line py-5">
        {street.strip.map((item) => (
          <span key={item} className="flex items-center gap-8 pr-8 font-display text-2xl uppercase text-fg/80 md:text-3xl">
            {item}
            <span aria-hidden className="size-2 rotate-45 bg-accent" />
          </span>
        ))}
      </Marquee>

      <StreetShop />
      <StreetArchive />

      {/* Motion band: two photos drifting at different speeds under one line of type */}
      <section aria-label="In motion" className="relative grid md:grid-cols-2">
        {street.band.map((b, i) => (
          <ParallaxImage key={b.src} src={b.src} alt={b.alt} sizes="(min-width: 768px) 50vw, 100vw" offset={70} className={`h-[52svh] bg-surface md:h-[88svh] ${i === 1 ? "grayscale-[0.2]" : ""}`} />
        ))}
        <p aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center text-center font-display text-[clamp(2.8rem,10vw,10rem)] uppercase leading-[0.9] text-accent drop-shadow-[0_6px_30px_rgb(0_0_0/0.45)]">
          Keep
          <br />
          moving.
        </p>
      </section>

      <section id="studio" aria-labelledby="studio-title" className="mx-auto max-w-[1700px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-14 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7">
            <p className="street-tag text-accent">(03) The studio</p>
            <MaskText
              as="h2"
              id="studio-title"
              className="mt-5 font-display text-[clamp(2.4rem,5.4vw,5.6rem)]"
              lines={["Twenty-four tees,", <span key="s" className="text-fg/35">one loading dock.</span>]}
            />
            <Reveal y={24}>
              <p className="mt-10 max-w-xl text-[1.12rem] leading-relaxed text-fg/80">{street.manifesto}</p>
            </Reveal>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-px bg-line">
              {street.facts.map((f) => (
                <div key={f.k} className="bg-bg py-5 pr-4">
                  <dt className="street-tag text-muted">{f.k}</dt>
                  <dd className="mt-1.5 text-lg font-medium">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative md:col-span-4 md:col-start-9">
            <ClipReveal className="aspect-[4/5] w-[80%] bg-surface">
              <Image src={street.aboutImages[0].src} alt={street.aboutImages[0].alt} fill sizes="(min-width: 768px) 28vw, 70vw" className="object-cover" />
            </ClipReveal>
            <ClipReveal className="-mt-16 ml-auto aspect-[4/5] w-[62%] bg-surface ring-[10px] ring-bg md:-mt-24" delay={0.15}>
              <Image src={street.aboutImages[1].src} alt={street.aboutImages[1].alt} fill sizes="(min-width: 768px) 22vw, 55vw" className="object-cover" />
            </ClipReveal>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 border-y border-line md:mt-32 md:grid-cols-4">
          {street.stats.map((s, i) => (
            <div key={s.label} className={`px-1 py-8 md:px-6 md:py-12 ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line md:border-t-0" : ""} ${i > 0 ? "md:border-l md:border-line" : ""}`}>
              <p className="font-display text-[clamp(2.8rem,6.4vw,6rem)] leading-none text-accent">
                <Counter value={s.value} />
                {s.suffix && <span className="ml-2 text-[0.34em]">{s.suffix.trim()}</span>}
              </p>
              <p className="street-tag mt-3 max-w-[14rem] text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <StreetCalendar />
      <StreetNotes />

      <section id="faq" aria-labelledby="faq-title" className="border-t border-line">
        <div className="mx-auto grid max-w-[1700px] gap-12 px-5 py-24 md:grid-cols-12 md:gap-6 md:px-10 md:py-36">
          <div className="md:col-span-5">
            <p className="street-tag text-accent">(06) Before you ask</p>
            <h2 id="faq-title" className="mt-5 font-display text-[clamp(2.2rem,3.8vw,3.9rem)]">
              Questions
            </h2>
          </div>
          <Accordion
            items={street.faqs}
            className="md:col-span-7"
            itemClassName="border-t border-line last:border-b"
            questionClassName="py-6 text-[1.15rem] font-medium md:text-[1.3rem] hover:text-accent transition-colors"
            answerClassName="max-w-2xl pb-7 leading-relaxed text-fg/75"
            iconClassName="text-accent"
          />
        </div>
      </section>

      <section id="wholesale" aria-labelledby="wholesale-title" className="bg-accent text-accent-fg">
        <div className="mx-auto grid max-w-[1700px] gap-14 px-5 py-24 md:grid-cols-12 md:gap-8 md:px-10 md:py-36">
          <div className="md:col-span-5">
            <p className="street-tag">(07) Wholesale and press</p>
            <h2 id="wholesale-title" className="mt-5 font-display text-[clamp(2.4rem,4.8vw,4.9rem)]">
              Stock us. Write about us.
            </h2>
            <p className="mt-8 max-w-md text-[1.1rem] leading-relaxed">
              We open a handful of wholesale accounts each season and send samples to anyone writing about the drop. Tell us who you are and we answer within one working day.
            </p>
            <p className="street-tag mt-8">
              <a href={`mailto:${street.email}`} className="underline underline-offset-4">
                {street.email}
              </a>
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <StreetContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
