import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { MaskText } from "@/components/motion/MaskText";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { RiseLines } from "@/components/motion/RiseLines";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { NoirStats } from "@/components/noir/NoirStats";
import { noir } from "@/content/noir";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Meet Your Brand, a team of eleven designers and engineers in Lisbon. How we work, who we are and why we keep the studio small on purpose.";

export const metadata = pageMetadata(noir, { title: "About", description, path: "/agency/noir/about" });

export default function NoirAbout() {
  return (
    <>
      <JsonLd data={webPageSchema(noir, { type: "AboutPage", name: "About", description, slug: "about" })} />
      <section className="mx-auto max-w-[1600px] px-5 pb-16 pt-40 md:px-10 md:pt-52">
        <div className="fade-up" style={{ ["--d" as string]: 80 }}>
          <Eyebrow className="bg-fg/[0.05] text-fg ring-1 ring-fg/10">About · Since {noir.founded}</Eyebrow>
        </div>
        <RiseLines
          className="mt-8 font-display text-[clamp(3.3rem,10vw,10.5rem)] leading-[0.86] tracking-[-0.02em]"
          lines={["Eleven people.", "One room.", <em key="e" className="text-accent">No account managers.</em>]}
        />
      </section>

      <section aria-label="Studio photos" className="mx-auto grid max-w-[1600px] gap-6 px-5 md:grid-cols-12 md:px-10">
        <ParallaxImage
          src="/template/images/noir/corridor.jpg"
          alt="Long corridor with soft daylight"
          sizes="(min-width: 768px) 58vw, 100vw"
          className="aspect-[4/3] rounded-[1.25rem] md:col-span-7"
          imgClassName="grayscale"
          priority
        />
        <div className="md:col-span-4 md:col-start-9 md:mt-48">
          <ParallaxImage
            src="/template/images/noir/camera.jpg"
            alt="Photographer holding a film camera"
            sizes="(min-width: 768px) 33vw, 100vw"
            className="aspect-[4/5] rounded-[1.25rem]"
            imgClassName="grayscale"
            offset={40}
          />
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Friday critique, every week since 2014</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:col-span-3">(01) Why we exist</p>
          <ScrollWords text={noir.intro + " " + noir.manifesto} className="font-display text-[clamp(2rem,4.4vw,4.4rem)] leading-[1.05] md:col-span-9" />
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">(02) How we work</p>
              <MaskText as="h2" className="mt-4 font-display text-[clamp(3rem,6vw,6rem)] leading-[0.9]" lines={["Three rules", <em key="e" className="text-accent">we keep.</em>]} />
            </div>
          </div>
          <ol className="space-y-6 md:col-span-7 md:col-start-6">
            {noir.values.map((value, i) => (
              <li key={value.title}>
                <Reveal className="rounded-[1.5rem] bg-surface p-1.5 ring-1 ring-fg/[0.08]">
                  <div className="rounded-[calc(1.5rem-0.375rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] md:p-12">
                    <p className="font-display text-7xl leading-none text-accent">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-8 font-display text-4xl md:text-5xl">{value.title}</h3>
                    <p className="mt-4 max-w-lg text-lg text-fg/70">{value.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="team" className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-40">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">(03) The team</p>
        <h2 id="team" className="sr-only">
          The team
        </h2>
        <ul className="mt-10 border-t border-line">
          {noir.team.map((person) => (
            <li key={person.name} className="group border-b border-line">
              <Reveal y={20} className="flex flex-col justify-between gap-2 py-7 md:flex-row md:items-baseline">
                <span className="font-display text-5xl leading-none transition-[transform,color] duration-700 ease-studio group-hover:translate-x-3 group-hover:italic group-hover:text-accent md:text-7xl">
                  {person.name}
                </span>
                <span className="text-muted">{person.role}</span>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-fg/60">Plus five more designers and engineers who would rather not be on the website.</p>
      </section>

      <section aria-label="History" className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-40">
        <p className="mb-12 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">(04) Timeline</p>
        <ol className="grid gap-px overflow-hidden rounded-[1.5rem] bg-line ring-1 ring-fg/[0.08] md:grid-cols-5">
          {noir.milestones.map((m, i) => (
            <li key={m.year} className="bg-bg">
              <Reveal delay={i * 0.08} className="flex h-full flex-col p-8">
                <span className="font-display text-6xl text-accent">{m.year}</span>
                <p className="mt-10 text-fg/70">{m.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="Studio in numbers" className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-40">
        <NoirStats stats={noir.stats} />
      </section>
    </>
  );
}
