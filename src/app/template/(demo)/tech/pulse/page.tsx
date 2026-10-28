import { Eyebrow } from "@/components/Eyebrow";
import { Accordion } from "@/components/Accordion";
import { Counter } from "@/components/motion/Counter";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { RiseLines } from "@/components/motion/RiseLines";
import { Tilt } from "@/components/motion/Tilt";
import { PulseBento } from "@/components/tech/pulse/PulseBento";
import { PulseButton } from "@/components/tech/pulse/PulseButton";
import { PulseCases } from "@/components/tech/pulse/PulseCases";
import { PulseCommand } from "@/components/tech/pulse/PulseCommand";
import { PulseContactForm } from "@/components/tech/pulse/PulseContactForm";
import { PulseDashboard } from "@/components/tech/pulse/PulseDashboard";
import { PulsePricing } from "@/components/tech/pulse/PulsePricing";
import { PulseWords } from "@/components/tech/pulse/PulseWords";
import { PulseProcess } from "@/components/tech/pulse/PulseProcess";
import { pulse } from "@/content/tech/pulse";
import { templateMetadata } from "@/lib/seo";

export const metadata = templateMetadata({ sector: "tech", slug: "pulse", title: pulse.title, description: pulse.description });

const pill = "bg-fg/[0.05] text-fg/80 ring-1 ring-fg/10";
const wrap = "mx-auto max-w-[1240px] px-5 md:px-8";
const h2 = "font-display text-[clamp(2.6rem,6.2vw,5.8rem)] leading-[0.92]";

export default function PulsePage() {
  return (
    <>
      <section aria-labelledby="hero" className="relative overflow-x-clip pt-28 md:pt-36">
        <div aria-hidden className="pulse-dots absolute inset-x-0 top-0 h-[78%]" />
        <div className="relative mx-auto grid max-w-[1320px] gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 lg:pt-8">
            <div className="fade-up" style={{ ["--d" as string]: 60 }}>
              <Eyebrow className={pill}>
                <span className="size-1.5 animate-blink rounded-full bg-accent" />
                v2.14 is live · 38 s to first chart
              </Eyebrow>
            </div>
            <RiseLines
              id="hero"
              className="mt-7 font-display text-[clamp(3.7rem,6.6vw,6.6rem)] leading-[0.86]"
              lines={[
                "Know if",
                "it worked",
                <span key="l" className="relative text-accent">
                  before lunch.
                  <svg viewBox="0 0 300 14" preserveAspectRatio="none" className="pulse-underline absolute -bottom-1 left-0 h-[0.14em] w-full overflow-visible" aria-hidden>
                    <path d="M2 9 C 60 2, 120 13, 180 6 S 270 4, 298 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" pathLength={1} />
                  </svg>
                </span>,
              ]}
            />
            <p className="fade-up mt-9 max-w-[30rem] text-[17px] leading-relaxed text-fg/70" style={{ ["--d" as string]: 520 }} data-speakable>
              {pulse.answer}
            </p>
            <div className="fade-up mt-9 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: 650 }}>
              <Magnetic>
                <PulseButton href="#pricing" size="lg">
                  Start free
                </PulseButton>
              </Magnetic>
              <PulseButton href="#product" variant="ghost" size="lg">
                See the product
              </PulseButton>
            </div>
            <p className="fade-up mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted" style={{ ["--d" as string]: 750 }}>
              No card. No tracking plan. One snippet.
            </p>
          </div>
          <div className="fade-up min-w-0 lg:col-span-7 lg:-mr-[7vw]" style={{ ["--d" as string]: 420 }}>
            <Tilt max={2.2}>
              <PulseDashboard />
            </Tilt>
          </div>
        </div>
      </section>

      <section aria-label="Customers" className="mt-20 border-y border-line py-7 md:mt-28">
        <Marquee speed={-1.2}>
          {pulse.clients.map((c) => (
            <span key={c} className="flex items-center gap-12 pr-12 font-display text-3xl text-fg/45 md:text-4xl">
              {c}
              <i className="size-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </Marquee>
      </section>

      <section aria-labelledby="why" className="py-24 md:py-40">
        <div className={`${wrap} grid gap-10 md:grid-cols-12`}>
          <div className="md:col-span-3">
            <Eyebrow className={pill}>Why it exists</Eyebrow>
          </div>
          <div className="md:col-span-9">
            <h2 id="why" className="sr-only">
              Why Your Brand exists
            </h2>
            <PulseWords text={pulse.manifesto} className="font-display text-[clamp(2rem,4.4vw,4.3rem)] leading-[1.02]" />
          </div>
        </div>
      </section>

      <section id="product" aria-labelledby="product-h" className="scroll-mt-20 pb-24 md:pb-40">
        <div className={wrap}>
          <div className="mb-14 grid items-end gap-6 md:mb-20 md:grid-cols-12">
            <div className="md:col-span-8">
              <Eyebrow className={pill}>The product</Eyebrow>
              <MaskText as="h2" id="product-h" className={`mt-6 ${h2}`} lines={["Everything you check", <span key="b" className="text-accent">after a release.</span>]} />
            </div>
            <p className="max-w-sm text-[16px] leading-relaxed text-fg/65 md:col-span-4 md:col-start-9">
              Four views, one live dataset. Nothing to model, nothing to schedule, and nobody to wait for.
            </p>
          </div>
          <PulseBento />
        </div>
      </section>

      <section id="command" aria-labelledby="command-h" className="scroll-mt-20 pb-24 md:pb-40">
        <div className={wrap}>
          <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
            <div className="md:col-span-7">
              <Eyebrow className={pill}>Command palette</Eyebrow>
              <MaskText as="h2" id="command-h" className={`mt-6 ${h2}`} lines={["Press ⌘K.", <span key="b" className="text-muted">Ask anything.</span>]} />
            </div>
            <p className="max-w-md self-end text-[16px] leading-relaxed text-fg/65 md:col-span-5">
              Jump to a chart, create an alert or ask what changed after the last release. It understands your own event names, so you type the words your team already uses. Go on, type in the box.
            </p>
          </div>
          <Reveal>
            <PulseCommand />
          </Reveal>
        </div>
      </section>

      <section id="customers" aria-labelledby="customers-h" className="scroll-mt-20 pb-24 md:pb-40">
        <div className={wrap}>
          <div className="mb-14 md:mb-20">
            <Eyebrow className={pill}>Customers</Eyebrow>
            <MaskText as="h2" id="customers-h" className={`mt-6 ${h2}`} lines={["Teams that learned", <span key="b" className="text-accent">in an afternoon.</span>]} />
          </div>
          <PulseCases />
        </div>
      </section>

      <section aria-label="Numbers" className="border-y border-line py-20 md:py-32">
        <div className={`${wrap} grid gap-14 md:grid-cols-12 md:gap-8`}>
          <div className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{pulse.stats[0].label}</p>
            <p className="mt-4 font-display text-[clamp(6rem,17vw,15rem)] leading-[0.82] text-accent">
              <Counter value={pulse.stats[0].value} suffix={pulse.stats[0].suffix} duration={2.2} />
            </p>
          </div>
          <dl className="grid divide-y divide-line self-end md:col-span-6 md:col-start-7">
            {pulse.stats.slice(1).map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-6 py-6 first:pt-0 last:pb-0">
                <dt className="max-w-[16rem] text-[15px] text-fg/65">{s.label}</dt>
                <dd className="font-display text-[clamp(2.8rem,5.5vw,4.6rem)] leading-none">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="how" aria-labelledby="how-h" className="scroll-mt-20 py-24 md:py-40">
        <div className={wrap}>
          <div className="mb-16 md:mb-24">
            <Eyebrow className={pill}>How it works</Eyebrow>
            <MaskText as="h2" id="how-h" className={`mt-6 ${h2}`} lines={["From snippet to", <span key="b" className="text-muted">answer by tea time.</span>]} />
          </div>
          <PulseProcess />
        </div>
      </section>

      <section id="pricing" aria-labelledby="pricing-h" className="scroll-mt-20 pb-24 md:pb-40">
        <div className={wrap}>
          <div className="mb-12 md:mb-16">
            <Eyebrow className={pill}>Pricing</Eyebrow>
            <MaskText as="h2" id="pricing-h" className={`mt-6 ${h2}`} lines={["Priced by events.", <span key="b" className="text-accent">Never by seat.</span>]} />
          </div>
          <PulsePricing />
        </div>
      </section>

      <section aria-labelledby="love-h" className="overflow-hidden pb-24 md:pb-40">
        <div className={`${wrap} mb-12 md:mb-16`}>
          <Eyebrow className={pill}>Kind words</Eyebrow>
          <MaskText as="h2" id="love-h" className={`mt-6 ${h2}`} lines={["Teams stopped", <span key="b" className="text-muted">arguing about numbers.</span>]} />
        </div>
        <div className="space-y-4">
          {[pulse.testimonials.slice(0, 3), pulse.testimonials.slice(3)].map((row, ri) => (
            <Marquee key={ri} speed={ri ? 1.3 : -1.3}>
              {row.map((t) => (
                <figure key={t.name} className="mr-4 flex min-h-[220px] w-[300px] shrink-0 flex-col justify-between whitespace-normal rounded-3xl bg-[var(--p-panel)] p-6 ring-1 ring-fg/10 md:w-[380px] md:p-8">
                  <blockquote className="text-[16px] leading-relaxed text-fg/85 md:text-[18px]">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-accent font-display text-lg text-accent-fg">{t.name[0]}</span>
                    <span>
                      <span className="block text-[14px] font-medium">{t.name}</span>
                      <span className="block font-mono text-[11px] text-muted">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </Marquee>
          ))}
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-h" className="scroll-mt-20 pb-24 md:pb-40">
        <div className={`${wrap} grid gap-12 md:grid-cols-12`}>
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Eyebrow className={pill}>FAQ</Eyebrow>
              <MaskText as="h2" id="faq-h" className={`mt-6 ${h2}`} lines={["Before you", "ask us."]} />
              <p className="mt-6 max-w-xs text-[15px] text-fg/60">Still stuck? The form below goes to a person, not a queue.</p>
            </div>
          </div>
          <Accordion
            items={pulse.faqs}
            className="divide-y divide-line border-y border-line md:col-span-8"
            questionClassName="py-6 font-display text-[1.5rem] leading-[1.1] md:text-[1.9rem] min-h-11"
            answerClassName="max-w-2xl pb-7 text-[16px] leading-relaxed text-fg/65"
            iconClassName="text-accent"
          />
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-h" className="scroll-mt-20 pb-24 md:pb-40">
        <div className={wrap}>
          <div className="rounded-[2.2rem] bg-fg/[0.03] p-1.5 ring-1 ring-fg/10">
            <div className="grid gap-12 rounded-[calc(2.2rem-0.375rem)] bg-[var(--p-panel)] p-6 ring-1 ring-fg/[0.05] md:grid-cols-12 md:gap-10 md:p-14">
              <div className="md:col-span-5">
                <Eyebrow className={pill}>Contact</Eyebrow>
                <MaskText as="h2" id="contact-h" className={`mt-6 ${h2}`} lines={["Tell us what", <span key="b" className="text-accent">to measure.</span>]} />
                <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-fg/65">Book a 20-minute walkthrough on your own data, or ask a plain question. You will hear from a person within four working hours.</p>
                <dl className="mt-10 space-y-5 text-[15px]">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Email</dt>
                    <dd className="mt-1"><a href={`mailto:${pulse.email}`} className="hover:text-accent">{pulse.email}</a></dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Phone</dt>
                    <dd className="mt-1"><a href={`tel:${pulse.phone.replace(/\s/g, "")}`} className="hover:text-accent">{pulse.phone}</a></dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Office</dt>
                    <dd className="mt-1 leading-relaxed text-fg/75">{pulse.street}, {pulse.city}<br />{pulse.postalCode}, {pulse.country}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Hours</dt>
                    <dd className="mt-1 text-fg/75">{pulse.hours}</dd>
                  </div>
                </dl>
              </div>
              <div className="md:col-span-7">
                <PulseContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
