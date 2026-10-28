import { MapPinIcon, PhoneIcon, ClockIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { Accordion } from "@/components/Accordion";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { CaseStudies } from "@/components/logistics/freight/CaseStudies";
import { FreightContactForm } from "@/components/logistics/freight/FreightContactForm";
import { FreightFooter } from "@/components/logistics/freight/FreightFooter";
import { FreightHeader } from "@/components/logistics/freight/FreightHeader";
import { FreightHero } from "@/components/logistics/freight/FreightHero";
import { FreightProcess } from "@/components/logistics/freight/FreightProcess";
import { FreightServices } from "@/components/logistics/freight/FreightServices";
import { FreightTestimonials } from "@/components/logistics/freight/FreightTestimonials";
import { FreightWords } from "@/components/logistics/freight/FreightWords";
import { ModeTabs } from "@/components/logistics/freight/ModeTabs";
import { TrackingWidget } from "@/components/logistics/freight/TrackingWidget";
import { freight } from "@/content/logistics/freight";
import { templateMetadata } from "@/lib/seo";

export const metadata = templateMetadata({ sector: "logistics", slug: "freight", title: freight.title, description: freight.description });

const h2 = "font-display text-[clamp(2.9rem,6.4vw,6.4rem)] font-semibold leading-[0.94]";
const label = "font-mono text-[11px] uppercase tracking-[0.2em] text-muted";
const wrap = "mx-auto max-w-[1600px] px-5 md:px-10";

export default function FreightPage() {
  return (
    <>
      <FreightHeader />
      <main id="main">
        <FreightHero />

        {/* Tracking sits over the hero's lower edge */}
        <section id="track" aria-labelledby="track-heading" className={`${wrap} relative z-10 scroll-mt-24 pb-20 md:-mt-24 md:pb-28`}>
          <div className="grid gap-8 md:grid-cols-12 md:items-start md:gap-12">
            <div className="md:col-span-7">
              <TrackingWidget />
            </div>
            <div className="md:col-span-5 md:pt-24">
              <p data-speakable className="text-[clamp(1.2rem,1.9vw,1.6rem)] leading-snug text-fg/90">
                {freight.answer}
              </p>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {freight.certifications.map((c) => (
                  <li key={c} className="rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted ring-1 ring-fg/15">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-label="Gateway ports" className="border-y border-line py-7">
          <Marquee speed={-1.3}>
            {freight.ports.map((p) => (
              <span key={p} className="flex items-center gap-8 pr-8 font-mono text-[clamp(1.1rem,2vw,1.6rem)] uppercase tracking-[0.12em] text-fg/55">
                {p}
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              </span>
            ))}
          </Marquee>
        </section>

        <section id="about" aria-labelledby="about-heading" className={`${wrap} scroll-mt-20 py-24 md:py-40`}>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <Eyebrow className="bg-fg/[0.06] text-fg ring-1 ring-fg/10">About</Eyebrow>
            </div>
            <div className="md:col-span-9">
              <h2 id="about-heading" className="sr-only">
                About Your Brand
              </h2>
              <FreightWords
                text="We started in 2009 with two desks in Rotterdam and one rule: tell the customer the truth about the date. Today 620 people in 62 offices move air, sea, road and rail freight for makers, retailers and importers, and the rule still holds."
                className="font-display text-[clamp(1.9rem,4.2vw,4.2rem)] font-medium leading-[1.06] tracking-[-0.02em]"
              />
            </div>
          </div>
          <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-14">
            <ClipReveal className="aspect-[4/3] overflow-hidden rounded-[2rem] md:col-span-7">
              <Image src="/template/images/logistics/freight/yard.webp" alt="A railway yard at night with tracks leading toward a lit city" fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-[#07142b]/30 mix-blend-multiply" />
              <p className="absolute bottom-5 left-5 rounded-full bg-bg/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] backdrop-blur">Rotterdam rail terminal, 02:10</p>
            </ClipReveal>
            <dl className="flex flex-col justify-end gap-0 md:col-span-5">
              {[
                ["2009", "Founded in Rotterdam with two desks and a borrowed truck."],
                ["62", "Offices on six continents, each with its own customs desk."],
                ["24/7", "A single ops desk that answers when a vessel or a flight slips."],
              ].map(([k, v], i) => (
                <Reveal key={k} delay={i * 0.1} y={20} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-t border-line py-6">
                  <dt className="font-display text-4xl font-semibold text-accent">{k}</dt>
                  <dd className="text-[16px] leading-relaxed text-fg/75">{v}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <section id="modes" aria-labelledby="modes-heading" className="scroll-mt-20 bg-surface/60 py-24 md:py-36">
          <div className={wrap}>
            <p className={label}>Four ways to move it</p>
            <MaskText as="h2" id="modes-heading" className={`${h2} mt-4 mb-10 md:mb-16`} lines={["Pick the mode.", <span key="b" className="text-muted">Or let us pick.</span>]} />
            <ModeTabs />
          </div>
        </section>

        <section id="services" aria-labelledby="services-heading" className={`${wrap} scroll-mt-20 py-24 md:py-40`}>
          <div className="mb-12 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className={label}>What we handle</p>
              <MaskText as="h2" id="services-heading" className={`${h2} mt-4`} lines={["Everything between", <span key="b" className="text-accent">the dock and the door.</span>]} />
            </div>
            <p className="max-w-sm text-[16px] leading-relaxed text-fg/70 md:col-span-4 md:justify-self-end">One team for the booking, the paperwork and the last mile, so nothing falls between suppliers.</p>
          </div>
          <FreightServices />
        </section>

        <section id="cases" aria-labelledby="cases-heading" className="scroll-mt-20 pb-24 md:pb-0">
          <CaseStudies />
        </section>

        <section id="network" aria-labelledby="network-heading" className={`${wrap} scroll-mt-20 py-24 md:py-40`}>
          <div className="relative overflow-hidden rounded-[2.2rem] bg-surface px-6 py-14 ring-1 ring-fg/10 md:px-14 md:py-24">
            <svg aria-hidden viewBox="0 0 600 600" className="animate-spin-slow pointer-events-none absolute -right-48 -top-48 w-[640px] opacity-[0.16]">
              {[290, 230, 170, 110].map((r) => (
                <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="#93a6c6" strokeWidth="1" strokeDasharray="2 8" />
              ))}
              <path d="M300 10V590M10 300H590" stroke="#93a6c6" strokeWidth="1" />
              <circle cx="300" cy="10" r="6" fill="var(--t-accent)" />
            </svg>
            <p className={label}>The network</p>
            <MaskText as="h2" id="network-heading" className={`${h2} mt-4 max-w-[14ch]`} lines={["A network", <span key="b" className="text-accent">you can name.</span>]} />
            <dl className="relative mt-14 grid gap-x-10 gap-y-12 md:mt-24 md:grid-cols-12">
              {freight.stats.map((s, i) => (
                <div key={s.label} className={`border-t border-line pt-5 ${["md:col-span-5", "md:col-span-7", "md:col-span-7", "md:col-span-5"][i]}`}>
                  <dd className="font-display text-[clamp(4.2rem,10vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
                    <Counter value={s.value} suffix={"suffix" in s ? s.suffix : ""} />
                  </dd>
                  <dt className="mt-3 text-[15px] text-fg/70">{s.label}</dt>
                </div>
              ))}
            </dl>
            <ul className="relative mt-14 flex flex-wrap gap-2.5 md:mt-20">
              {freight.hubs.map((h) => (
                <li key={h} className="rounded-full px-4 py-2 text-[13px] text-fg/80 ring-1 ring-fg/15">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="process" aria-labelledby="process-heading" className={`${wrap} scroll-mt-20 pb-24 md:pb-40`}>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-32">
                <p className={label}>How a shipment moves</p>
                <MaskText as="h2" id="process-heading" className={`${h2} mt-4`} lines={["Five steps,", <span key="b" className="text-accent">no surprises.</span>]} />
                <p className="mt-6 max-w-xs text-[16px] leading-relaxed text-fg/70">Each step has a named owner and a time. You can see where your cargo is in it at any point.</p>
              </div>
            </div>
            <div className="md:col-span-8">
              <FreightProcess />
            </div>
          </div>
        </section>

        <section aria-label="Testimonials" className={`${wrap} pb-24 md:pb-40`}>
          <FreightTestimonials />
        </section>

        <section id="faq" aria-labelledby="faq-heading" className={`${wrap} scroll-mt-20 pb-24 md:pb-40`}>
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <p className={label}>Questions</p>
              <MaskText as="h2" id="faq-heading" className={`${h2} mt-4`} lines={["Before you", "book."]} />
            </div>
            <div className="md:col-span-8">
              <Accordion
                items={freight.faqs}
                itemClassName="border-t border-line last:border-b"
                questionClassName="py-6 font-display text-[clamp(1.25rem,2vw,1.7rem)] font-medium leading-snug"
                answerClassName="max-w-[62ch] pb-7 pr-8 text-[16px] leading-relaxed text-fg/75"
                iconClassName="text-accent"
              />
            </div>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-heading" className={`${wrap} scroll-mt-20 pb-24 md:pb-32`}>
          <div className="rounded-[2.2rem] bg-surface p-6 ring-1 ring-fg/10 md:p-14">
            <div className="grid gap-12 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-5">
                <p className={label}>Request a quote</p>
                <MaskText as="h2" id="contact-heading" className={`${h2} mt-4`} lines={["Where does", <span key="b" className="text-accent">it need to go?</span>]} />
                <ul className="mt-10 space-y-5 text-[16px]">
                  <li className="flex gap-4">
                    <MapPinIcon size={22} weight="light" className="mt-0.5 shrink-0 text-accent" />
                    <address className="not-italic text-fg/80">
                      {freight.street}, {freight.postalCode} {freight.city}
                    </address>
                  </li>
                  <li className="flex gap-4">
                    <PhoneIcon size={22} weight="light" className="mt-0.5 shrink-0 text-accent" />
                    <a href={`tel:${freight.phone.replace(/\s/g, "")}`} className="text-fg/80 hover:text-fg">
                      {freight.phone}
                    </a>
                  </li>
                  <li className="flex gap-4">
                    <EnvelopeSimpleIcon size={22} weight="light" className="mt-0.5 shrink-0 text-accent" />
                    <a href={`mailto:${freight.email}`} className="text-fg/80 hover:text-fg">
                      {freight.email}
                    </a>
                  </li>
                  <li className="flex gap-4">
                    <ClockIcon size={22} weight="light" className="mt-0.5 shrink-0 text-accent" />
                    <p className="text-fg/80">{freight.hours}</p>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-7">
                <FreightContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <FreightFooter />
    </>
  );
}
