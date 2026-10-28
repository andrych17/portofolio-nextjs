import { AtelierWorkIndex } from "@/components/atelier/AtelierWorkIndex";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { RiseLines } from "@/components/motion/RiseLines";
import { atelier } from "@/content/atelier";
import { webPageSchema, workSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Identity, packaging and website projects by Your Brand for bakeries, roasters, grocers, hotels and craft brands, with the result each one delivered.";

export const metadata = pageMetadata(atelier, { title: "Work", description, path: "/agency/atelier/work" });

export default function AtelierWork() {
  return (
    <>
      <JsonLd data={[webPageSchema(atelier, { type: "CollectionPage", name: "Work", description, slug: "work" }), workSchema(atelier)]} />
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
        <div className="fade-up" style={{ ["--d" as string]: 80 }}>
          <Eyebrow className="bg-white/60 ring-1 ring-black/[0.06]">
            {atelier.projects.length} projects · 2023 to 2026
          </Eyebrow>
        </div>
        <div className="mt-7 grid gap-10 md:grid-cols-12 md:items-end">
          <RiseLines
            className="font-display text-[clamp(3.2rem,8.4vw,8.6rem)] leading-[0.92] tracking-[-0.03em] md:col-span-8"
            lines={["Things we made", <em key="e" className="text-accent">with our hands dirty.</em>]}
          />
          <p className="fade-up max-w-sm text-lg text-fg/70 md:col-span-4" style={{ ["--d" as string]: 500 }} data-speakable>
            Jars, tea tins, shop windows and the websites behind them. Every project lists the number its owner cared about most.
          </p>
        </div>
      </section>
      <section aria-label="Projects" className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-36">
        <AtelierWorkIndex projects={atelier.projects} />
      </section>
    </>
  );
}
