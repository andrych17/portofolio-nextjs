import type { ReactNode } from "react";
import { Accordion } from "@/components/Accordion";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";
import { MaskText } from "@/components/motion/MaskText";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { FoundryCapabilities } from "@/components/property/foundry/FoundryCapabilities";
import { FoundryContactForm } from "@/components/property/foundry/FoundryContactForm";
import { FoundryHero } from "@/components/property/foundry/FoundryHero";
import { FoundryProcess } from "@/components/property/foundry/FoundryProcess";
import { FoundryProjects } from "@/components/property/foundry/FoundryProjects";
import { FoundrySafety } from "@/components/property/foundry/FoundrySafety";
import { foundry } from "@/content/property/foundry";
import { templateMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = templateMetadata({ sector: "property", slug: "foundry", title: foundry.title, description: foundry.description });

const wrap = "mx-auto max-w-[1440px] px-5 md:px-10";
const h2 = "font-display text-[clamp(3.2rem,7.4vw,7.4rem)] leading-[0.84]";
const tag = "bg-fg text-bg";
const tel = foundry.phone.replace(/\s/g, "");

function Mark({ children }: { children: ReactNode }) {
  return <span className="inline-block bg-accent px-[0.1em] pb-[0.04em] text-accent-fg">{children}</span>;
}

export default function FoundryPage() {
  return (
    <>
      <FoundryHero />

      {/* One-sentence answer */}
      <section aria-label="In one sentence" className="border-b border-fg/25">
        <div className={`${wrap} grid gap-5 py-10 md:grid-cols-12 md:py-14`}>
          <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-fg/60 md:col-span-2">What we do</p>
          <p data-speakable className="max-w-4xl text-[clamp(1.4rem,2.5vw,2.3rem)] font-medium leading-[1.2] tracking-[-0.01em] md:col-span-10">
            {foundry.answer}
          </p>
        </div>
      </section>

      {/* Proof strip */}
      <section aria-label="Credentials" className="bg-fg text-bg overflow-hidden">
        <Marquee speed={-1.5} className="py-5">
          {foundry.strip.map((s) => (
            <span key={s} className="flex items-center gap-8 pr-8 font-display text-[2rem] leading-none md:text-[2.6rem]">
              {s}
              <span aria-hidden className="size-3 bg-accent" />
            </span>
          ))}
        </Marquee>
        <div aria-hidden className="foundry-hazard h-2.5" />
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-h" className={`${wrap} scroll-mt-16 py-24 md:py-36`}>
        <div className="grid gap-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6 md:self-center">
            <Eyebrow className={tag}>About · since 1994</Eyebrow>
            <MaskText
              id="about-h"
              as="h2"
              className={`mt-6 ${h2}`}
              lines={["Two excavators.", <Mark key="m">One rented yard.</Mark>]}
            />
            <Reveal>
              <p className="mt-9 max-w-xl text-lg leading-relaxed text-fg/80">{foundry.manifesto}</p>
            </Reveal>
            <dl className="mt-10 grid grid-cols-2 border-t-2 border-fg">
              {foundry.facts.map((f, i) => (
                <Reveal key={f.k} delay={i * 0.06} y={16}>
                  <div className="border-b border-fg/25 py-5 pr-4">
                    <dt className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-fg/55">{f.k}</dt>
                    <dd className="mt-1.5 font-display text-[2rem] leading-none">{f.v}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
          <div className="relative pb-12 md:col-span-6 md:col-start-7 md:pb-20">
            <ParallaxImage
              src={foundry.aboutImages[0].src}
              alt={foundry.aboutImages[0].alt}
              sizes="(min-width: 768px) 46vw, 92vw"
              offset={40}
              className="aspect-[4/5] ring-1 ring-fg/30"
              imgClassName="grayscale-[0.4] contrast-110"
            />
            <ClipReveal className="absolute -bottom-0 -left-1 aspect-[4/3] w-[54%] ring-4 ring-bg md:-left-14" direction="left" delay={0.2}>
              <Image src={foundry.aboutImages[1].src} alt={foundry.aboutImages[1].alt} fill sizes="(min-width: 768px) 26vw, 50vw" className="object-cover grayscale-[0.5]" />
            </ClipReveal>
            <p className="absolute right-0 top-0 bg-accent px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-fg">28 years, one yard road</p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" aria-labelledby="cap-h" className="scroll-mt-16 border-t border-fg/25 pb-24 pt-24 md:pb-36 md:pt-32">
        <div className={wrap}>
          <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
            <div className="md:col-span-8">
              <Eyebrow className={tag}>Capabilities</Eyebrow>
              <MaskText id="cap-h" as="h2" className={`mt-6 ${h2}`} lines={["Six trades,", <Mark key="m">one contract.</Mark>]} />
            </div>
            <p className="max-w-sm text-[16px] leading-relaxed text-fg/75 md:col-span-3 md:col-start-10 md:self-end">
              Steel, concrete, earthworks and fit-out sit under one site manager, so no trade waits on another firm&apos;s programme.
            </p>
          </div>
          <FoundryCapabilities />
        </div>
      </section>

      <FoundryProjects />

      {/* Stats */}
      <section aria-label="The company in numbers" className="border-b border-fg/25">
        <dl className={`${wrap} grid grid-cols-2 md:grid-cols-4`}>
          {foundry.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} y={24}>
              <div className={`h-full border-fg/25 py-14 pr-4 md:py-24 md:pl-8 ${i % 2 ? "border-l pl-5" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 0 ? "md:border-l-0 md:pl-0" : "md:border-l"}`}>
                <dd className="font-display text-[clamp(4.4rem,9vw,9rem)] leading-[0.8]">
                  <Counter value={s.value} suffix={"suffix" in s ? s.suffix : ""} />
                </dd>
                <dt className="mt-4 max-w-[13rem] font-mono text-[11.5px] uppercase leading-snug tracking-[0.12em] text-fg/65">{s.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Safety */}
      <section id="safety" aria-labelledby="safety-h" className="foundry-grid-dark scroll-mt-16 bg-[var(--f-char)] py-24 text-bg md:py-36">
        <div className={wrap}>
          <div className="mb-14 md:mb-20">
            <Eyebrow className="bg-accent text-accent-fg">Safety</Eyebrow>
            <MaskText id="safety-h" as="h2" className={`mt-6 ${h2}`} lines={["Everyone", <span key="m" className="text-accent">goes home.</span>]} />
          </div>
          <FoundrySafety />
        </div>
      </section>

      {/* Process */}
      <section id="process" aria-labelledby="process-h" className={`${wrap} scroll-mt-16 py-24 md:py-36`}>
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <Eyebrow className={tag}>How a job runs</Eyebrow>
              <MaskText id="process-h" as="h2" className="mt-6 font-display text-[clamp(3.2rem,5.6vw,5.6rem)] leading-[0.84]" lines={[<span key="a" className="whitespace-nowrap">From walk-round</span>, <Mark key="m">to warranty.</Mark>]} />
              <p className="mt-8 max-w-sm text-[16px] leading-relaxed text-fg/75">Five stages, the same people in each. You get a named contact on day one and a written report every week.</p>
            </div>
          </div>
          <div className="md:col-span-7">
            <FoundryProcess />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section aria-labelledby="voices-h" className="border-t border-fg/25 bg-surface py-24 md:py-36">
        <div className={wrap}>
          <Eyebrow className={tag}>Owners say</Eyebrow>
          <h2 id="voices-h" className="sr-only">
            What clients say
          </h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-12">
            <li className="md:col-span-7">
              <Reveal y={28}>
                <figure className="h-full border-t-4 border-fg bg-bg p-7 md:p-10">
                  <blockquote className="text-[clamp(1.5rem,2.4vw,2.2rem)] font-medium leading-[1.18] tracking-[-0.01em]">{foundry.testimonials[0].quote}</blockquote>
                  <figcaption className="mt-8 font-mono text-[11.5px] uppercase tracking-[0.12em] text-fg/65">
                    <span className="text-fg">{foundry.testimonials[0].name}</span> · {foundry.testimonials[0].role}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
            <li className="md:col-span-5 md:mt-16">
              <Reveal y={28} delay={0.08}>
                <figure className="flex h-full flex-col justify-between bg-accent p-7 text-accent-fg md:p-10">
                  <blockquote className="font-display text-[clamp(3.4rem,6vw,6rem)] leading-[0.86]">{foundry.testimonials[1].quote}</blockquote>
                  <figcaption className="mt-8 font-mono text-[11.5px] uppercase tracking-[0.12em]">
                    {foundry.testimonials[1].name} · {foundry.testimonials[1].role}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
            <li className="md:col-span-6 md:col-start-4">
              <Reveal y={28} delay={0.12}>
                <figure className="border-t-4 border-fg bg-fg p-7 text-bg md:p-10">
                  <blockquote className="text-[clamp(1.4rem,2.2vw,2rem)] font-medium leading-[1.2]">{foundry.testimonials[2].quote}</blockquote>
                  <figcaption className="mt-8 font-mono text-[11.5px] uppercase tracking-[0.12em] text-white/60">
                    <span className="text-bg">{foundry.testimonials[2].name}</span> · {foundry.testimonials[2].role}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-h" className={`${wrap} scroll-mt-16 py-24 md:py-36`}>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Eyebrow className={tag}>Good to know</Eyebrow>
              <MaskText id="faq-h" as="h2" className="mt-6 font-display text-[clamp(3.2rem,6vw,6rem)] leading-[0.84]" lines={["Straight", <Mark key="m">answers.</Mark>]} />
            </div>
          </div>
          <div className="md:col-span-8">
            <Accordion
              items={foundry.faqs}
              className="border-t-2 border-fg"
              itemClassName="border-b border-fg/25"
              questionClassName="min-h-14 py-6 font-display text-[1.9rem] leading-[0.95] md:text-[2.5rem]"
              answerClassName="max-w-2xl pb-7 text-[17px] leading-relaxed text-fg/75"
            />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section id="quote" aria-labelledby="quote-h" className="foundry-grid-dark scroll-mt-16 bg-[var(--f-char)] py-24 text-bg md:py-36">
        <div className={`${wrap} grid gap-14 md:grid-cols-12 md:gap-12`}>
          <div className="md:col-span-5">
            <Eyebrow className="bg-accent text-accent-fg">Request a quote</Eyebrow>
            <MaskText id="quote-h" as="h2" className={`mt-6 ${h2}`} lines={["Tell us", <span key="m" className="text-accent">what you need built.</span>]} />
            <dl className="mt-12 border-t border-white/25">
              {[
                ["Phone", <a key="p" href={`tel:${tel}`} className="hover:text-accent">{foundry.phone}</a>],
                ["Email", <a key="e" href={`mailto:${foundry.email}`} className="hover:text-accent">{foundry.email}</a>],
                ["Office", `${foundry.street}, ${foundry.city} ${foundry.postalCode}, ${foundry.country}`],
                ["Hours", foundry.hours.join(". ")],
              ].map(([k, v]) => (
                <div key={String(k)} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-white/25 py-4">
                  <dt className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-white/50">{k}</dt>
                  <dd className="text-[15px] leading-snug text-white/90">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 bg-accent px-4 py-3 font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-accent-fg">Budget estimate in about a week</p>
          </div>
          <div className="md:col-span-7">
            <div className="bg-black/30 p-6 ring-1 ring-white/15 md:p-10">
              <FoundryContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
