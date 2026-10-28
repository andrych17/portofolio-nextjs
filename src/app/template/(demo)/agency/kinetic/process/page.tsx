import { Accordion } from "@/components/Accordion";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { BouncyText } from "@/components/kinetic/BouncyText";
import { KineticZigzag } from "@/components/kinetic/KineticZigzag";
import { MaskText } from "@/components/motion/MaskText";
import { kinetic } from "@/content/kinetic";
import { faqSchema, processSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "How a Your Brand project works: Scoop, Mix, Build and Serve. Timelines, prices, what you get at each step and answers to the questions clients ask most.";

export const metadata = pageMetadata(kinetic, { title: "Process", description, path: "/agency/kinetic/process" });

const eyebrow = "border-2 border-k-ink bg-white font-bold";

export default function KineticProcessPage() {
  return (
    <>
      <JsonLd data={[webPageSchema(kinetic, { type: "WebPage", name: "Process", description, slug: "process" }), processSchema(kinetic), faqSchema(kinetic.faqs)]} />
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <div className="fade-up" style={{ ["--d" as string]: 60 }}>
          <Eyebrow className={eyebrow}>Process · 6 to 10 weeks</Eyebrow>
        </div>
        <div className="mt-6 grid gap-8 md:grid-cols-12 md:items-end">
          <h1 className="font-display text-[clamp(3rem,9vw,9rem)] font-black uppercase leading-[0.84] tracking-tight md:col-span-9">
            <span className="sr-only">Scoop, mix, build, serve.</span>
            <BouncyText lines={[["Scoop.", "Mix."], ["Build.", <span key="s" className="text-accent">Serve.</span>]]} />
          </h1>
          <p className="fade-up max-w-sm text-lg font-medium md:col-span-3" style={{ ["--d" as string]: 600 }} data-speakable>
            Four steps from first workshop to a launch that keeps getting better. Fixed price, weekly demos, no surprises.
          </p>
        </div>
      </section>

      <section aria-label="Project steps" className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 md:pb-36">
        <KineticZigzag steps={kinetic.process} />
      </section>

      <section aria-labelledby="faq" className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 md:pb-36">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow className={eyebrow}>FAQ</Eyebrow>
            <MaskText id="faq" className="mt-5 font-display text-[clamp(2.4rem,4.2vw,4.4rem)] font-black uppercase leading-[0.86]" lines={["Ask us", <span key="a" className="text-accent">anything.</span>]} />
          </div>
          <Accordion
            items={kinetic.faqs}
            className="space-y-3 md:col-span-7"
            itemClassName="rounded-[1.5rem] border-2 border-k-ink bg-white px-5 shadow-[4px_4px_0_0_#121212] md:px-7"
            questionClassName="py-5 font-display text-lg font-extrabold uppercase leading-tight md:text-2xl"
            answerClassName="max-w-2xl pb-6 text-lg font-medium leading-snug"
            iconClassName="size-5 text-accent"
          />
        </div>
      </section>
    </>
  );
}
