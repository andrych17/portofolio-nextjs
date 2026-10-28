import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { MaskText } from "@/components/motion/MaskText";
import { RiseLines } from "@/components/motion/RiseLines";
import { NoirHoverList } from "@/components/noir/NoirHoverList";
import { NoirWorkGrid } from "@/components/noir/NoirWorkGrid";
import { noir } from "@/content/noir";
import { webPageSchema, workSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Selected work by Your Brand: brand identities, Next.js websites, e-commerce and digital products for clients in Europe and the US, and what each one delivered.";

export const metadata = pageMetadata(noir, { title: "Work", description, path: "/agency/noir/work" });

export default function NoirWork() {
  return (
    <>
      <JsonLd
        data={[webPageSchema(noir, { type: "CollectionPage", name: "Work", description, slug: "work" }), workSchema(noir)]}
      />
      <section className="mx-auto max-w-[1600px] px-5 pb-20 pt-40 md:px-10 md:pb-28 md:pt-52">
        <div className="fade-up" style={{ ["--d" as string]: 80 }}>
          <Eyebrow className="bg-fg/[0.05] text-fg ring-1 ring-fg/10">Work · 2019 to 2026</Eyebrow>
        </div>
        <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
          <RiseLines
            className="font-display text-[clamp(3.3rem,10vw,10.5rem)] leading-[0.86] tracking-[-0.02em] md:col-span-9"
            lines={["Selected work", <em key="e" className="text-accent">and what it changed.</em>]}
          />
          <p className="fade-up max-w-sm text-fg/70 md:col-span-3" style={{ ["--d" as string]: 500 }} data-speakable>
            Every project here shipped and is still live. Each one lists the result the client cared about most.
          </p>
        </div>
      </section>

      <section aria-label="Projects" className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-40">
        <NoirWorkGrid projects={noir.projects} />
      </section>

      <section aria-label="Project index" className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-40">
        <div className="mb-12 flex items-end justify-between">
          <MaskText as="h2" className="font-display text-[clamp(2.6rem,6vw,6rem)] leading-[0.9]" lines={["Index"]} />
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{noir.projects.length} projects</p>
        </div>
        <NoirHoverList projects={noir.projects} />
      </section>
    </>
  );
}
