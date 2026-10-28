import { AtelierProcessRail } from "@/components/atelier/AtelierProcessRail";
import { Accordion } from "@/components/Accordion";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { MaskText } from "@/components/motion/MaskText";
import { RiseLines } from "@/components/motion/RiseLines";
import { atelier } from "@/content/atelier";
import { faqSchema, processSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "How a Your Brand project runs: a studio visit, creative direction, craft and launch over ten weeks, plus prices, timelines and answers to common questions.";

export const metadata = pageMetadata(atelier, { title: "Process", description, path: "/agency/atelier/process" });

const eyebrow = "bg-white/60 ring-1 ring-black/[0.06]";

export default function AtelierProcessPage() {
  return (
    <>
      <JsonLd
        data={[webPageSchema(atelier, { type: "WebPage", name: "Process", description, slug: "process" }), processSchema(atelier), faqSchema(atelier.faqs)]}
      />
      <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-48">
        <div className="fade-up" style={{ ["--d" as string]: 80 }}>
          <Eyebrow className={eyebrow}>Process · About ten weeks</Eyebrow>
        </div>
        <div className="mt-7 grid gap-10 md:grid-cols-12 md:items-end">
          <RiseLines
            className="font-display text-[clamp(3.2rem,8.4vw,8.6rem)] leading-[0.92] tracking-[-0.03em] md:col-span-8"
            lines={["It starts", <em key="e" className="text-accent">in your kitchen.</em>]}
          />
          <p className="fade-up max-w-sm text-lg text-fg/70 md:col-span-4" style={{ ["--d" as string]: 500 }} data-speakable>
            Four steps, one fixed fee and a weekly update every Friday. You always know what we are making and what we need from you.
          </p>
        </div>
      </section>

      <section aria-label="Project steps" className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-36">
        <AtelierProcessRail steps={atelier.process} />
      </section>

      <section aria-labelledby="faq" className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-36">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow className={eyebrow}>Questions</Eyebrow>
            <MaskText id="faq" className="mt-6 font-display text-[clamp(2.8rem,5vw,5rem)] leading-[0.95]" lines={["Good to", <em key="e" className="text-accent">know.</em>]} />
            <p className="mt-6 max-w-xs text-fg/70">
              Anything else? Write to{" "}
              <a href={`mailto:${atelier.email}`} className="underline underline-offset-4 hover:text-accent">
                {atelier.email}
              </a>
              .
            </p>
          </div>
          <div className="rounded-[2rem] bg-white/45 p-1.5 ring-1 ring-black/[0.06] md:col-span-8">
            <Accordion
              items={atelier.faqs}
              className="rounded-[calc(2rem-0.375rem)] bg-bg/70 px-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] md:px-10"
              itemClassName="border-b border-line last:border-b-0"
              questionClassName="py-6 font-display text-2xl leading-snug transition-colors hover:text-accent md:text-3xl"
              answerClassName="max-w-2xl pb-7 text-lg leading-relaxed text-fg/75"
              iconClassName="text-accent"
            />
          </div>
        </div>
      </section>
    </>
  );
}
