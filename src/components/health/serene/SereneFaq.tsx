import { Accordion } from "@/components/Accordion";
import { Eyebrow } from "@/components/Eyebrow";
import { serene } from "@/content/health/serene";

export function SereneFaq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Protocol Clarity</Eyebrow>
            <h2 id="faq-heading" className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-tight text-fg">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted">
              Everything you need to know about preparing for cold plunges, hyperbaric sessions, suite etiquette, and health contraindications.
            </p>
          </div>

          <div className="lg:col-span-7">
            <Accordion
              items={serene.faqs}
              itemClassName="border-b border-line"
              questionClassName="py-5 text-lg font-medium text-fg hover:text-accent transition-colors"
              answerClassName="pb-6 text-base leading-relaxed text-muted"
              iconClassName="text-accent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
