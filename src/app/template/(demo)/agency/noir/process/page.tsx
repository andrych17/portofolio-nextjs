import { Accordion } from "@/components/Accordion";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { MaskText } from "@/components/motion/MaskText";
import { RiseLines } from "@/components/motion/RiseLines";
import { NoirProcess } from "@/components/noir/NoirProcess";
import { noir } from "@/content/noir";
import { faqSchema, processSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "How a website or brand project with Your Brand works: five steps from discovery to launch, typical timelines, costs and answers to common questions.";

export const metadata = pageMetadata(noir, { title: "Process", description, path: "/agency/noir/process" });

export default function NoirProcessPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(noir, { type: "WebPage", name: "Process", description, slug: "process" }),
          processSchema(noir),
          faqSchema(noir.faqs),
        ]}
      />
      <section className="mx-auto max-w-[1600px] px-5 pb-10 pt-40 md:px-10 md:pt-52">
        <div className="fade-up" style={{ ["--d" as string]: 80 }}>
          <Eyebrow className="bg-fg/[0.05] text-fg ring-1 ring-fg/10">Process · 6 to 16 weeks</Eyebrow>
        </div>
        <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
          <RiseLines
            className="font-display text-[clamp(3.3rem,10vw,10.5rem)] leading-[0.86] tracking-[-0.02em] md:col-span-8"
            lines={["Five steps,", <em key="e" className="text-accent">no surprises.</em>]}
          />
          <p className="fade-up max-w-sm text-lg text-fg/70 md:col-span-4" style={{ ["--d" as string]: 500 }} data-speakable>
            Every project follows the same five steps. You always know what we are working on this week, what we need from you and what comes next.
          </p>
        </div>
      </section>

      <section aria-label="Project steps" className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-40">
        <NoirProcess steps={noir.process} />
      </section>

      <section aria-labelledby="faq" className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Questions</p>
            <MaskText id="faq" as="h2" className="mt-4 font-display text-[clamp(3rem,6vw,6rem)] leading-[0.9]" lines={["Asked", <em key="e" className="text-accent">often.</em>]} />
          </div>
          <Accordion
            items={noir.faqs}
            className="border-t border-line md:col-span-8"
            itemClassName="border-b border-line"
            questionClassName="py-7 font-display text-3xl leading-tight transition-colors hover:text-accent md:text-4xl"
            answerClassName="max-w-2xl pb-8 text-lg text-fg/70"
            iconClassName="text-accent"
          />
        </div>
      </section>
    </>
  );
}
