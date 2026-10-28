import { Eyebrow } from "@/components/Eyebrow";
import { Marquee } from "@/components/motion/Marquee";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/Accordion";
import { EstateAbout } from "@/components/property/estate/EstateAbout";
import { EstateCalculator } from "@/components/property/estate/EstateCalculator";
import { EstateContactForm } from "@/components/property/estate/EstateContactForm";
import { EstateDevelopments } from "@/components/property/estate/EstateDevelopments";
import { EstateHero } from "@/components/property/estate/EstateHero";
import { EstateListings } from "@/components/property/estate/EstateListings";
import { EstateProcess } from "@/components/property/estate/EstateProcess";
import { EstateStats } from "@/components/property/estate/EstateStats";
import { EstateTestimonials } from "@/components/property/estate/EstateTestimonials";
import { EstateTour } from "@/components/property/estate/EstateTour";
import { estate } from "@/content/property/estate";
import { templateMetadata } from "@/lib/seo";

export const metadata = templateMetadata({ sector: "property", slug: "estate", title: estate.title, description: estate.description });

const label = "text-[10px] font-bold uppercase tracking-[0.22em]";

export default function EstatePage() {
  return (
    <>
      <EstateHero />

      <section aria-label="What Your Brand does" className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
        <p
          data-speakable
          className="fade-up max-w-5xl font-display text-[clamp(1.7rem,3.2vw,3rem)] leading-[1.18]"
          style={{ ["--d" as string]: 300 }}
        >
          {estate.answer}
        </p>
      </section>

      <Marquee speed={-1.3} className="border-y border-line py-6">
        {estate.stripWords.map((w) => (
          <span key={w} className="flex items-center gap-10 pr-10 font-display text-[clamp(2rem,4vw,3.4rem)] italic leading-none">
            {w}
            <span aria-hidden className="size-2.5 rotate-45 bg-accent" />
          </span>
        ))}
      </Marquee>

      <EstateAbout />

      <section id="collection" aria-labelledby="collection-h" className="mx-auto max-w-[1500px] scroll-mt-20 px-5 pb-24 pt-8 md:px-10 md:pb-36">
        <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow className="bg-[#0f2a20]/[0.06] text-fg ring-1 ring-fg/10">Available now</Eyebrow>
            <MaskText
              as="h2"
              id="collection-h"
              className="mt-6 font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.95]"
              lines={["The current", <em key="e" className="text-[#8a6a28]">collection</em>]}
            />
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted md:col-span-4 md:justify-self-end">
            Eight homes across four districts. Prices are in US dollars and exclude taxes and fees.
          </p>
        </div>
        <EstateListings />
      </section>

      <section id="tour" aria-labelledby="tour-h" className="scroll-mt-0 bg-[#0f2a20] py-24 text-[#f6f2ea] md:py-36">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="mb-12 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Eyebrow className="bg-white/10 text-[#f6f2ea] ring-1 ring-white/20">Virtual tour</Eyebrow>
              <MaskText as="h2" id="tour-h" className="mt-6 font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.95]" lines={["Walk the house before", <em key="e" className="text-[#d6b571]">you drive there.</em>]} />
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-[#f6f2ea]/75 md:col-span-4 md:justify-self-end">{estate.tour.body}</p>
          </div>
          <Reveal>
            <EstateTour />
          </Reveal>
        </div>
      </section>

      <EstateDevelopments />

      <section id="finance" aria-labelledby="finance-h" className="scroll-mt-0 bg-[#17382b] py-24 text-[#f6f2ea] md:py-36">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="mb-12 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Eyebrow className="bg-white/10 text-[#f6f2ea] ring-1 ring-white/20">Installment calculator</Eyebrow>
              <MaskText as="h2" id="finance-h" className="mt-6 font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.95]" lines={["Run the", <em key="e" className="text-[#d6b571]">numbers first.</em>]} />
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-[#f6f2ea]/75 md:col-span-4 md:justify-self-end">{estate.finance.body}</p>
          </div>
          <Reveal>
            <EstateCalculator />
          </Reveal>
          <p className="mt-6 max-w-xl text-[13px] leading-relaxed text-[#f6f2ea]/60">{estate.finance.note}</p>
        </div>
      </section>

      <section aria-labelledby="stats-h" className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-36">
        <h2 id="stats-h" className={`${label} mb-14 text-muted`}>
          Fourteen years in numbers
        </h2>
        <EstateStats />
      </section>

      <section id="process" aria-labelledby="process-h" className="scroll-mt-20 bg-surface py-24 md:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-14 px-5 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <Eyebrow className="bg-[#0f2a20]/[0.06] text-fg ring-1 ring-fg/10">How buying works</Eyebrow>
              <MaskText as="h2" id="process-h" className="mt-6 font-display text-[clamp(2.8rem,5.4vw,5.4rem)] leading-[0.95]" lines={["Five steps,", <em key="e" className="text-[#8a6a28]">no surprises.</em>]} />
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-fg/70">Most buyers go from first viewing to contract in about three weeks. You decide the pace.</p>
            </div>
          </div>
          <div className="md:col-span-7">
            <EstateProcess />
          </div>
        </div>
      </section>

      <section aria-labelledby="owners-h" className="bg-[#0f2a20] py-24 text-[#f6f2ea] md:py-36">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <h2 id="owners-h" className={`${label} mb-14 text-[#d6b571]`}>
            What owners say
          </h2>
          <EstateTestimonials items={estate.testimonials} />
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-h" className="mx-auto max-w-[1500px] scroll-mt-20 px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow className="bg-[#0f2a20]/[0.06] text-fg ring-1 ring-fg/10">Questions</Eyebrow>
            <MaskText as="h2" id="faq-h" className="mt-6 font-display text-[clamp(2.8rem,5vw,5rem)] leading-[0.95]" lines={["Before you", <em key="e" className="text-[#8a6a28]">ask us.</em>]} />
          </div>
          <div className="md:col-span-8">
            <Accordion
              items={estate.faqs}
              itemClassName="border-b border-line first:border-t"
              questionClassName="py-6 font-display text-[1.45rem] leading-snug md:text-[1.9rem]"
              answerClassName="max-w-2xl pb-7 text-[16px] leading-relaxed text-fg/75"
            />
          </div>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-h" className="scroll-mt-20 bg-surface py-24 md:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-14 px-5 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <Eyebrow className="bg-[#0f2a20]/[0.06] text-fg ring-1 ring-fg/10">Contact</Eyebrow>
            <MaskText as="h2" id="contact-h" className="mt-6 font-display text-[clamp(2.8rem,5.4vw,5.4rem)] leading-[0.95]" lines={["Book a", <em key="e" className="text-[#8a6a28]">private viewing.</em>]} />
            <address className="mt-10 space-y-6 not-italic">
              <div>
                <p className={`${label} text-muted`}>Sales gallery</p>
                <p className="mt-2 text-[17px] leading-relaxed">
                  {estate.street}
                  <br />
                  {estate.city} {estate.postalCode}
                </p>
              </div>
              <div>
                <p className={`${label} text-muted`}>Opening hours</p>
                <p className="mt-2 text-[17px] leading-relaxed">
                  {estate.hours[0]}
                  <br />
                  {estate.hours[1]}
                </p>
              </div>
              <div>
                <p className={`${label} text-muted`}>Talk to us</p>
                <p className="mt-2 text-[17px] leading-relaxed">
                  <a href={`tel:${estate.phone.replace(/\s/g, "")}`} className="hover:text-[#8a6a28]">
                    {estate.phone}
                  </a>
                  <br />
                  <a href={`mailto:${estate.email}`} className="hover:text-[#8a6a28]">
                    {estate.email}
                  </a>
                </p>
              </div>
            </address>
          </div>
          <div className="md:col-span-7">
            <EstateContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
