import { Accordion } from "@/components/Accordion";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";
import { MaskText, SplitWords } from "@/components/motion/MaskText";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { AtriumBuildings } from "@/components/property/atrium/AtriumBuildings";
import { AtriumContactForm } from "@/components/property/atrium/AtriumContactForm";
import { AtriumHero } from "@/components/property/atrium/AtriumHero";
import { AtriumLightwell } from "@/components/property/atrium/AtriumLightwell";
import { AtriumProcess } from "@/components/property/atrium/AtriumProcess";
import { AtriumStack } from "@/components/property/atrium/AtriumStack";
import { AtriumTestimonials } from "@/components/property/atrium/AtriumTestimonials";
import { atrium } from "@/content/property/atrium";
import { templateMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = templateMetadata({ sector: "property", slug: "atrium", title: atrium.title, description: atrium.description });

const wrap = "mx-auto max-w-[1440px] px-5 md:px-10";
const h2 = "font-display text-[clamp(2.6rem,6.2vw,6.4rem)] leading-[0.92]";
const tag = "bg-fg text-bg";
const mono = "font-mono text-[11.5px] uppercase tracking-[0.12em]";
const tel = atrium.phone.replace(/\s/g, "");

export default function AtriumPage() {
  const { ground } = atrium;
  return (
    <>
      <AtriumHero />

      {/* One-sentence answer */}
      <section aria-label="In one sentence" className="border-y border-fg/15">
        <div className={`${wrap} grid gap-5 py-10 md:grid-cols-12 md:py-14`}>
          <p className={`${mono} text-fg/60 md:col-span-2`}>At a glance</p>
          <p data-speakable className="max-w-4xl font-display text-[clamp(1.5rem,2.7vw,2.5rem)] leading-[1.14] md:col-span-10">
            {atrium.answer}
          </p>
        </div>
      </section>

      {/* Proof strip */}
      <section aria-label="What every lease includes" className="border-b border-fg/15">
        <Marquee speed={-1.2} className="py-5">
          {atrium.strip.map((s) => (
            <span key={s} className="flex items-center gap-8 pr-8 font-display text-[1.7rem] leading-none md:text-[2.2rem]">
              {s}
              <span aria-hidden className="size-2.5 bg-accent" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-h" className={`${wrap} scroll-mt-16 py-24 md:py-36`}>
        <div className="grid gap-16 md:grid-cols-12 md:gap-10">
          <div className="relative pb-16 md:col-span-5 md:pb-24">
            <ParallaxImage
              src={atrium.aboutImages[0].src}
              alt={atrium.aboutImages[0].alt}
              sizes="(min-width: 768px) 40vw, 90vw"
              offset={36}
              className="aspect-[4/5] bg-surface"
            />
            <ClipReveal className="absolute -bottom-0 right-0 aspect-[4/3] w-[56%] ring-[6px] ring-bg md:-right-12" direction="top" delay={0.2}>
              <Image src={atrium.aboutImages[1].src} alt={atrium.aboutImages[1].alt} fill sizes="(min-width: 768px) 24vw, 52vw" className="object-cover" />
            </ClipReveal>
            <p className={`absolute left-0 top-0 bg-bg px-3 py-1.5 ${mono} text-[10.5px]`}>Since 2006</p>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:self-center">
            <Eyebrow className={tag}>L02 · About</Eyebrow>
            <MaskText id="about-h" as="h2" className={`mt-6 ${h2}`} lines={["Lobbies you would", <b key="b">walk through anyway.</b>]} />
            <p className="mt-9 max-w-xl text-lg leading-relaxed text-fg/80">
              <SplitWords text={atrium.manifesto} stagger={0.012} />
            </p>
            <dl className="mt-10 grid grid-cols-2 border-t border-fg">
              {atrium.facts.map((f, i) => (
                <Reveal key={f.k} delay={i * 0.06} y={16}>
                  <div className="border-b border-fg/20 py-5 pr-4">
                    <dt className={`${mono} text-[10.5px] text-fg/55`}>{f.k}</dt>
                    <dd className="mt-1.5 font-display text-[1.7rem] leading-none md:text-[2rem]">{f.v}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <AtriumLightwell />

      {/* Buildings */}
      <section id="buildings" aria-labelledby="buildings-h" className="scroll-mt-16 py-24 md:py-36">
        <div className={wrap}>
          <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
            <div className="md:col-span-8">
              <Eyebrow className={tag}>L04 · Buildings</Eyebrow>
              <MaskText id="buildings-h" as="h2" className={`mt-6 ${h2}`} lines={["Fourteen buildings,", <b key="b">six to start with.</b>]} />
            </div>
            <p className="max-w-sm text-[16px] leading-relaxed text-fg/75 md:col-span-3 md:col-start-10 md:self-end">
              From a 24-storey tower to a five-floor corner block with a shop on the steps. Point at one to see it.
            </p>
          </div>
          <AtriumBuildings />
        </div>
      </section>

      {/* Floors */}
      <section id="floors" aria-labelledby="floors-h" className="scroll-mt-16 bg-surface py-24 md:py-36">
        <div className={wrap}>
          <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
            <div className="md:col-span-8">
              <Eyebrow className={tag}>L05 · Floors</Eyebrow>
              <MaskText id="floors-h" as="h2" className={`mt-6 ${h2}`} lines={["One tower,", <b key="b">cut open.</b>]} />
            </div>
            <p className="max-w-sm text-[16px] leading-relaxed text-fg/75 md:col-span-3 md:col-start-10 md:self-end">
              The Cartwright floor by floor. Pick a band to see what is on it, how big it is and what it costs.
            </p>
          </div>
          <AtriumStack />
        </div>
      </section>

      {/* Stats */}
      <section aria-label="The company in numbers" className="border-b border-fg/15">
        <dl className={`${wrap} grid grid-cols-2 md:grid-cols-4`}>
          {atrium.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} y={24}>
              <div className={`h-full border-fg/15 py-14 pr-4 md:py-24 md:pl-8 ${i % 2 ? "border-l pl-5" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 0 ? "md:border-l-0 md:pl-0" : "md:border-l"}`}>
                <dd className="font-display text-[clamp(3.6rem,8vw,8rem)] leading-[0.85]">
                  <Counter value={s.value} suffix={s.suffix ?? ""} />
                </dd>
                <dt className={`mt-4 max-w-[13rem] ${mono} text-[11px] leading-snug text-fg/65`}>{s.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Street level */}
      <section id="street" aria-labelledby="street-h" className={`${wrap} scroll-mt-16 py-24 md:py-36`}>
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <Eyebrow className={tag}>L07 · Street level</Eyebrow>
            <MaskText id="street-h" as="h2" className={`mt-6 ${h2}`} lines={["The ground floor", <b key="b">belongs to the street.</b>]} />
          </div>
          <p className="max-w-md text-[16px] leading-relaxed text-fg/75 md:col-span-4 md:col-start-9 md:self-end">
            Every building gives its lowest two floors back to the neighbourhood: a café, a shop, a bench anyone can use. Rents there are lower on purpose, because a busy pavement is the best amenity we have.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-14 md:mt-24 md:gap-x-8 md:gap-y-20">
          <figure className="col-span-12 md:col-span-7">
            <ParallaxImage src={ground.items[0].src} alt={ground.items[0].alt} sizes="(min-width: 768px) 56vw, 92vw" offset={28} className="aspect-[3/2] bg-surface" />
            <figcaption className={`mt-4 flex justify-between gap-4 ${mono} text-[11px] text-fg/65`}>
              <span className="text-fg">{ground.items[0].caption}</span>
              <span>{ground.items[0].note}</span>
            </figcaption>
          </figure>

          <div className="col-span-12 flex flex-col gap-10 md:col-span-4 md:col-start-9 md:gap-12">
            <figure>
              <ParallaxImage src={ground.items[1].src} alt={ground.items[1].alt} sizes="(min-width: 768px) 32vw, 92vw" offset={24} className="aspect-[4/3] bg-surface" />
              <figcaption className={`mt-4 ${mono} text-[11px] text-fg/65`}>
                <span className="text-fg">{ground.items[1].caption}</span>
                <span className="mt-1 block">{ground.items[1].note}</span>
              </figcaption>
            </figure>
            <ul className="border-t-2 border-fg">
              {ground.tally.map((t, i) => (
                <li key={t.label}>
                  <Reveal delay={i * 0.08} y={18}>
                    <div className="flex items-baseline justify-between gap-6 border-b border-fg/20 py-4">
                      <span className="font-display text-[clamp(2.8rem,4.4vw,4.2rem)] leading-none">
                        <Counter value={t.value} />
                      </span>
                      <span className={`${mono} text-right text-[11px] text-fg/65`}>{t.label}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <figure className="col-span-12 md:col-span-12">
            <ParallaxImage src={ground.items[2].src} alt={ground.items[2].alt} sizes="(min-width: 1440px) 1360px, 92vw" offset={30} className="aspect-[16/8] bg-[var(--a-ink)] md:aspect-[16/6]" />
            <figcaption className={`mt-4 flex justify-between gap-4 ${mono} text-[11px] text-fg/65`}>
              <span className="text-fg">{ground.items[2].caption}</span>
              <span>{ground.items[2].note}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Leasing process */}
      <section id="leasing" aria-labelledby="leasing-h" className="atrium-cols-dark scroll-mt-16 bg-[var(--a-ink)] py-24 text-bg md:py-36">
        <div className={wrap}>
          <div className="mb-14 md:mb-20">
            <Eyebrow className="bg-accent text-accent-fg">L08 · Leasing</Eyebrow>
            <MaskText id="leasing-h" as="h2" className={`mt-6 ${h2}`} lines={["Keys in your hand", <b key="b">inside six weeks.</b>]} />
          </div>
          <AtriumProcess />
        </div>
      </section>

      {/* Testimonials */}
      <section aria-labelledby="voices-h" className="py-24 md:py-36">
        <div className={wrap}>
          <Eyebrow className={tag}>L09 · Tenants</Eyebrow>
          <h2 id="voices-h" className="sr-only">
            What tenants say
          </h2>
          <div className="mt-10">
            <AtriumTestimonials />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-h" className={`${wrap} scroll-mt-16 border-t border-fg/15 py-24 md:py-36`}>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Eyebrow className={tag}>L10 · Questions</Eyebrow>
              <MaskText id="faq-h" as="h2" className="mt-6 font-display text-[clamp(2.6rem,5vw,5rem)] leading-[0.94]" lines={["Plain", <b key="b">answers.</b>]} />
            </div>
          </div>
          <div className="md:col-span-8">
            <Accordion
              items={atrium.faqs}
              className="border-t border-fg"
              itemClassName="border-b border-fg/20"
              questionClassName="min-h-14 py-6 font-display text-[1.5rem] leading-[1.05] md:text-[2rem]"
              answerClassName="max-w-2xl pb-7 text-[17px] leading-relaxed text-fg/75"
            />
          </div>
        </div>
      </section>

      {/* Viewing */}
      <section id="viewing" aria-labelledby="viewing-h" className="atrium-cols-dark scroll-mt-16 bg-[var(--a-ink)] py-24 text-bg md:py-36">
        <div className={`${wrap} grid gap-14 md:grid-cols-12 md:gap-12`}>
          <div className="md:col-span-5">
            <Eyebrow className="bg-accent text-accent-fg">L11 · Book a viewing</Eyebrow>
            <MaskText id="viewing-h" as="h2" className={`mt-6 ${h2}`} lines={["Come and", <b key="b">see the floor.</b>]} />
            <dl className="mt-12 border-t border-white/25">
              {[
                ["Phone", <a key="p" href={`tel:${tel}`} className="hover:text-accent">{atrium.phone}</a>],
                ["Email", <a key="e" href={`mailto:${atrium.email}`} className="hover:text-accent">{atrium.email}</a>],
                ["Office", `${atrium.street}, ${atrium.city} ${atrium.postalCode}, ${atrium.country}`],
                ["Hours", atrium.hours.join(". ")],
              ].map(([k, v]) => (
                <div key={String(k)} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-white/25 py-4">
                  <dt className={`${mono} text-[11px] text-white/50`}>{k}</dt>
                  <dd className="text-[15px] leading-snug text-white/90">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 inline-block bg-accent px-4 py-3 font-mono text-[11.5px] font-medium uppercase tracking-[0.1em] text-accent-fg">Reply within one working day</p>
          </div>
          <div className="md:col-span-7">
            <div className="rounded-[2rem] p-1.5 ring-1 ring-white/12">
              <div className="rounded-[calc(2rem-0.375rem)] bg-white/[0.04] p-6 shadow-[inset_0_1px_1px_rgb(255_255_255/0.1)] md:p-10">
                <AtriumContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
