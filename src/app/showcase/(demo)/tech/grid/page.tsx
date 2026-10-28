import type { ReactNode } from "react";
import { Accordion } from "@/components/Accordion";
import { Eyebrow } from "@/components/Eyebrow";
import { Counter } from "@/components/motion/Counter";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { RiseLines } from "@/components/motion/RiseLines";
import { StackCards } from "@/components/motion/StackCards";
import { Tilt } from "@/components/motion/Tilt";
import { GridButton } from "@/components/tech/grid/GridButton";
import { GridChangelog } from "@/components/tech/grid/GridChangelog";
import { GridContactForm } from "@/components/tech/grid/GridContactForm";
import { GridDocs } from "@/components/tech/grid/GridDocs";
import { GridFeatures } from "@/components/tech/grid/GridFeatures";
import { GridPricing } from "@/components/tech/grid/GridPricing";
import { GridStatus } from "@/components/tech/grid/GridStatus";
import { GridTerminal } from "@/components/tech/grid/GridTerminal";
import { GridWords } from "@/components/tech/grid/GridWords";
import { grid } from "@/content/tech/grid";
import { templateMetadata } from "@/lib/seo";

export const metadata = templateMetadata({ sector: "tech", slug: "grid", title: grid.title, description: grid.description });

const wrap = "mx-auto max-w-[1440px] px-5 md:px-10";
const h2 = "font-display text-[clamp(2.6rem,6vw,5.8rem)] leading-[0.92]";
const pill = "bg-transparent text-fg/80 ring-1 ring-fg/25";
const tel = grid.phone.replace(/\s/g, "");

function Head({ n, label, id, lines, aside }: { n: string; label: string; id: string; lines: ReactNode[]; aside?: string }) {
  return (
    <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
      <div className="md:col-span-8">
        <Eyebrow className={pill}>
          § {n} · {label}
        </Eyebrow>
        <MaskText id={id} as="h2" className={`mt-6 ${h2}`} lines={lines} />
      </div>
      {aside && <p className="max-w-sm text-[16px] leading-relaxed text-fg/65 md:col-span-3 md:col-start-10 md:self-end">{aside}</p>}
    </div>
  );
}

export default function GridPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero" className="relative overflow-x-clip">
        <div aria-hidden className="grid-cols-lines pointer-events-none absolute inset-0 hidden md:block" />
        <div className={`${wrap} relative grid items-center gap-14 pb-16 pt-14 md:pb-24 md:pt-24 lg:grid-cols-12 lg:gap-10`}>
          <div className="lg:col-span-6">
            <div className="fade-up" style={{ ["--d" as string]: 60 }}>
              <Eyebrow className={`${pill} bg-bg`}>
                <span aria-hidden className="grid-cursor size-1.5 bg-accent" />
                v2.14 · replay from the dashboard
              </Eyebrow>
            </div>
            <RiseLines
              id="hero"
              className="mt-7 font-display text-[clamp(3.3rem,6.6vw,6.8rem)] leading-[0.86]"
              lines={["Send it once.", "We make it", <span key="l" className="text-accent">land.</span>]}
            />
            <div className="fade-up mt-10 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: 650 }}>
              <Magnetic>
                <GridButton href="#contact" size="lg">
                  Get an API key
                </GridButton>
              </Magnetic>
              <GridButton href="#docs" variant="line" size="lg">
                Read the docs
              </GridButton>
            </div>
            <p className="mono fade-up mt-6 text-muted" style={{ ["--d" as string]: 760 }}>
              Free plan · 50,000 events a month · no card
            </p>
          </div>
          <div className="fade-up min-w-0 lg:col-span-6" style={{ ["--d" as string]: 420 }}>
            <Tilt max={1.8}>
              <GridTerminal />
            </Tilt>
          </div>
        </div>
      </section>

      {/* One-sentence answer */}
      <section aria-label="In one sentence" className="border-t border-fg">
        <div className={`${wrap} grid gap-6 py-10 md:grid-cols-12 md:py-14`}>
          <p className="mono text-muted md:col-span-2">What it is</p>
          <p data-speakable className="max-w-4xl text-[clamp(1.35rem,2.4vw,2.2rem)] font-medium leading-[1.2] tracking-[-0.02em] md:col-span-10">
            {grid.answer}
          </p>
        </div>
      </section>

      {/* Proof: ticker + figures */}
      <section aria-label="Delivery at a glance" className="border-y border-fg">
        <Marquee speed={-1.6} className="border-b border-line py-4">
          {grid.ticker.map((t) => (
            <span key={t} className="mono flex items-center gap-8 pr-8 text-fg/70">
              {t}
              <span aria-hidden className="size-1.5 bg-accent" />
            </span>
          ))}
        </Marquee>
        <dl className={`${wrap} grid grid-cols-2 md:grid-cols-4`}>
          {grid.figures.map((f, i) => (
            <div key={f.k} className={`border-line py-8 pr-4 md:py-10 md:pl-6 ${i % 2 ? "border-l pl-5" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""} ${i === 0 ? "md:pl-0" : "md:border-l"}`}>
              <dd className="text-[clamp(2.2rem,4.6vw,4rem)] font-extrabold leading-none tracking-[-0.05em]">{f.k}</dd>
              <dt className="mono mt-3 text-muted">{f.v}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Story */}
      <section aria-labelledby="story-h" className={`${wrap} py-24 md:py-36`}>
        <Eyebrow className={pill}>§ 01 · Why it exists</Eyebrow>
        <h2 id="story-h" className="sr-only">
          Why webhook delivery needs its own service
        </h2>
        <GridWords text={grid.story.lead} className="mt-8 max-w-5xl text-[clamp(2rem,4.4vw,4.2rem)] font-bold leading-[1.02] tracking-[-0.04em]" />
        <ol className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-8">
          {grid.story.points.map((p, i) => (
            <li key={p.title} className={`md:col-span-4 ${i === 1 ? "md:mt-16" : i === 2 ? "md:mt-32" : ""}`}>
              <Reveal delay={i * 0.08} y={24}>
                <div className="border-t border-fg pt-5">
                  <p className="mono text-accent">0{i + 1}</p>
                  <h3 className="mt-3 text-[clamp(1.5rem,2.3vw,2.1rem)] font-bold leading-[1.02] tracking-[-0.03em]">{p.title}</h3>
                  <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-fg/65">{p.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Product */}
      <section id="product" aria-labelledby="product-h" className="scroll-mt-16 border-t border-fg py-24 md:py-36">
        <div className={wrap}>
          <Head
            n="02"
            label="Product"
            id="product-h"
            lines={["Everything between", <span key="a" className="text-accent">send and received.</span>]}
            aside="One event in, a signed and logged delivery out. Tap the signature, the retry bars and the replay buttons below to see them work."
          />
          <GridFeatures />
        </div>
      </section>

      {/* Docs */}
      <section id="docs" aria-labelledby="docs-h" className="scroll-mt-16 border-t border-fg py-24 md:py-36">
        <div className={wrap}>
          <Head
            n="03"
            label="Docs"
            id="docs-h"
            lines={["Read it in", <span key="a" className="text-accent">five minutes.</span>]}
            aside="Four short pages cover keys, signatures and retries. The rest of the reference is just the same ideas with more parameters."
          />
          <GridDocs />
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Delivery in numbers" className="bg-fg text-bg">
        <dl className={`${wrap} grid grid-cols-2 md:grid-cols-4`}>
          {grid.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} y={24}>
              <div className={`h-full border-white/15 py-12 pr-4 md:py-20 md:pl-8 ${i % 2 ? "border-l pl-5" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 0 ? "md:border-l-0 md:pl-0" : "md:border-l"}`}>
                <dd className="text-[clamp(2.6rem,6vw,5.6rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mono mt-4 max-w-[14rem] text-white/55">{s.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Process */}
      <section aria-labelledby="process-h" className="py-24 md:py-36">
        <div className={wrap}>
          <Head n="04" label="How it works" id="process-h" lines={["Three steps,", <span key="a" className="text-accent">one afternoon.</span>]} />
          <StackCards top={88} step={14} minScale={0.94} gapClassName="mb-[8vh]">
            {grid.process.map((p) => (
              <article key={p.n} className="grid border border-fg bg-bg md:grid-cols-12">
                <div className="p-6 md:col-span-7 md:p-10">
                  <p className="text-[clamp(4rem,9vw,8rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-accent">{p.n}</p>
                  <h3 className="mt-6 text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-none tracking-[-0.04em]">{p.title}</h3>
                  <p className="mt-4 max-w-md text-[16px] leading-relaxed text-fg/70">{p.body}</p>
                </div>
                <pre className="overflow-x-auto border-t border-fg bg-fg p-6 font-mono text-[12.5px] leading-[1.75] text-white/85 md:col-span-5 md:flex md:items-end md:border-l md:border-t-0 md:p-10">
                  <code>{p.code}</code>
                </pre>
              </article>
            ))}
          </StackCards>
        </div>
      </section>

      {/* Status */}
      <section id="status" aria-labelledby="status-h" className="scroll-mt-16 border-t border-fg py-24 md:py-36">
        <div className={wrap}>
          <Head
            n="05"
            label="Status"
            id="status-h"
            lines={["Ninety days,", <span key="a" className="text-accent">in the open.</span>]}
            aside="Every incident is a red bar with a write-up behind it. Placeholder data, drawn from fixed numbers so it never changes between visits."
          />
          <GridStatus />
        </div>
      </section>

      {/* Changelog */}
      <section id="changelog" aria-labelledby="log-h" className="scroll-mt-16 border-t border-fg py-24 md:py-36">
        <div className={`${wrap} grid gap-14 md:grid-cols-12`}>
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Eyebrow className={pill}>§ 06 · Changelog</Eyebrow>
              <MaskText id="log-h" as="h2" className={`mt-6 ${h2} !text-[clamp(2.6rem,5vw,4.8rem)]`} lines={["Shipped,", <span key="a" className="text-accent">not promised.</span>]} />
              <p className="mt-6 max-w-xs text-[16px] leading-relaxed text-fg/65">Every release gets a date, a version and one honest paragraph.</p>
            </div>
          </div>
          <div className="md:col-span-8">
            <GridChangelog />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" aria-labelledby="pricing-h" className="scroll-mt-16 border-t border-fg py-24 md:py-36">
        <div className={wrap}>
          <Head
            n="07"
            label="Pricing"
            id="pricing-h"
            lines={["Pay for events,", <span key="a" className="text-accent">not for seats.</span>]}
            aside="No per-user pricing and no surprise overage. At the cap we email you first, then queue events for 24 hours."
          />
          <GridPricing />
        </div>
      </section>

      {/* Testimonials */}
      <section aria-labelledby="voices-h" className="border-t border-fg bg-surface py-24 md:py-36">
        <div className={wrap}>
          <Eyebrow className={pill}>§ 08 · Teams</Eyebrow>
          <h2 id="voices-h" className="sr-only">
            What engineering teams say
          </h2>
          <ul className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-12">
            {grid.testimonials.map((t, i) => (
              <li key={t.name} className={["md:col-span-7", "md:col-span-5 md:mt-24", "md:col-span-5", "md:col-span-7 md:mt-24"][i]}>
                <Reveal delay={0.05} y={28}>
                  <figure className="border-t border-fg pt-6">
                    <blockquote className="text-[clamp(1.5rem,2.6vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em]">{t.quote}</blockquote>
                    <figcaption className="mono mt-6 text-muted">
                      <span className="text-fg">{t.name}</span> · {t.role}
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-h" className="scroll-mt-16 border-t border-fg py-24 md:py-36">
        <div className={`${wrap} grid gap-12 md:grid-cols-12 md:gap-16`}>
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Eyebrow className={pill}>§ 09 · FAQ</Eyebrow>
              <MaskText id="faq-h" as="h2" className={`mt-6 ${h2} !text-[clamp(2.6rem,5vw,4.8rem)]`} lines={["Questions,", <span key="a" className="text-accent">answered.</span>]} />
            </div>
          </div>
          <div className="md:col-span-8">
            <Accordion
              items={grid.faqs}
              className="border-t border-fg"
              itemClassName="border-b border-line"
              questionClassName="min-h-14 py-6 text-[1.25rem] font-bold leading-tight tracking-[-0.02em] md:text-[1.55rem]"
              answerClassName="max-w-2xl pb-7 text-[17px] leading-relaxed text-fg/65"
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-h" className="scroll-mt-16 border-t border-fg pb-28 pt-24 md:pb-40 md:pt-36">
        <div className={wrap}>
          <Head n="10" label="Contact" id="contact-h" lines={["Get a key.", <span key="a" className="text-accent">Send a test.</span>]} />
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="border border-fg p-6 md:col-span-7 md:p-10">
              <GridContactForm />
            </div>
            <aside aria-label="Contact details" className="space-y-px md:col-span-5">
              <dl className="border border-fg">
                {[
                  ["Email", <a key="e" href={`mailto:${grid.email}`} className="hover:text-accent">{grid.email}</a>],
                  ["Phone", <a key="p" href={`tel:${tel}`} className="hover:text-accent">{grid.phone}</a>],
                  ["Office", `${grid.street}, ${grid.city} ${grid.postalCode}, ${grid.country}`],
                  ["Support hours", grid.hours],
                ].map(([k, v]) => (
                  <div key={String(k)} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line p-5 last:border-b-0">
                    <dt className="mono text-muted">{k}</dt>
                    <dd className="text-[15px] leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mono flex items-center gap-3 bg-fg p-5 text-white/80">
                <span aria-hidden className="grid-cursor size-1.5 bg-accent" />
                Median reply time: 3 hours on weekdays
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
