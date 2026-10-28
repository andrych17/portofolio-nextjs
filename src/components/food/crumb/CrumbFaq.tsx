import { Accordion } from "@/components/Accordion";
import { Eyebrow } from "@/components/Eyebrow";
import { crumb } from "@/content/food/crumb";

export function CrumbFaq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Bakery Notes</Eyebrow>
            <h2 id="faq-heading" className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-tight text-fg">
              Questions &amp; Care
            </h2>
            <p className="mt-4 text-muted">
              Everything you need to know about our fermentation techniques, pre-ordering, storage, and event catering.
            </p>
          </div>

          <div className="lg:col-span-7">
            <Accordion
              items={crumb.faqs}
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
