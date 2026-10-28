import { Accordion } from "@/components/Accordion";
import { Eyebrow } from "@/components/Eyebrow";
import { forge } from "@/content/logistics/forge";

export function ForgeFaq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Superload Protocol</Eyebrow>
            <h2 id="faq-heading" className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-tight text-fg">
              Engineering FAQ
            </h2>
            <p className="mt-4 text-muted">
              Everything project managers need to know regarding bridge structural approvals, permit lead times, utility line lifts, and indoor gantry limits.
            </p>
          </div>

          <div className="lg:col-span-7">
            <Accordion
              items={forge.faqs}
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
