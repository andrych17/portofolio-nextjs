import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { BouncyText } from "@/components/kinetic/BouncyText";
import { KineticWorkGrid } from "@/components/kinetic/KineticWorkGrid";
import { kinetic } from "@/content/kinetic";
import { webPageSchema, workSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Brand, website and campaign work by Your Brand for coffee roasters, festivals, skincare, van rentals and shoe drops, with the numbers each launch hit.";

export const metadata = pageMetadata(kinetic, { title: "Work", description, path: "/agency/kinetic/work" });

export default function KineticWork() {
  return (
    <>
      <JsonLd data={[webPageSchema(kinetic, { type: "CollectionPage", name: "Work", description, slug: "work" }), workSchema(kinetic)]} />
      <section className="mx-auto max-w-[1440px] px-5 pb-14 pt-32 md:px-10 md:pb-20 md:pt-44">
        <div className="fade-up" style={{ ["--d" as string]: 60 }}>
          <Eyebrow className="border-2 border-k-ink bg-white font-bold">{kinetic.projects.length} launches · Melbourne to LA</Eyebrow>
        </div>
        <div className="mt-6 grid gap-8 md:grid-cols-12 md:items-end">
          <h1 className="font-display text-[clamp(3rem,10vw,10rem)] font-black uppercase leading-[0.84] tracking-tight md:col-span-9">
            <span className="sr-only">The work</span>
            <BouncyText lines={[["The"], [<span key="w" className="text-accent">work.</span>]]} />
          </h1>
          <p className="fade-up max-w-sm text-lg font-medium md:col-span-3" style={{ ["--d" as string]: 500 }} data-speakable>
            Brands that got noticed and websites that kept up. Every card shows the number the client actually cared about.
          </p>
        </div>
      </section>
      <section aria-label="Projects" className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 md:pb-36">
        <KineticWorkGrid projects={kinetic.projects} />
      </section>
    </>
  );
}
