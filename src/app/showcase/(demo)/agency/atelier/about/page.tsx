import Image from "next/image";
import { AtelierStats } from "@/components/atelier/AtelierStats";
import { AtelierTeam } from "@/components/atelier/AtelierTeam";
import { AtelierTimeline } from "@/components/atelier/AtelierTimeline";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { RiseLines } from "@/components/motion/RiseLines";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { atelier } from "@/content/atelier";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Your Brand is six designers, a developer and a photographer in a former bike shop on the Westerstraat, Amsterdam. Meet the team and how we work.";

export const metadata = pageMetadata(atelier, { title: "About", description, path: "/agency/atelier/about" });

const eyebrow = "bg-white/60 ring-1 ring-black/[0.06]";
const h2 = "font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.95] tracking-[-0.02em]";
const valueSpans = ["md:col-span-7", "md:col-span-5", "md:col-span-12"];

export default function AtelierAbout() {
  return (
    <>
      <JsonLd data={webPageSchema(atelier, { type: "AboutPage", name: "About", description, slug: "about" })} />

      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-24 pt-36 md:grid-cols-12 md:px-10 md:pt-48">
        <div className="md:col-span-6">
          <div className="fade-up" style={{ ["--d" as string]: 80 }}>
            <Eyebrow className={eyebrow}>About · Since {atelier.founded}</Eyebrow>
          </div>
          <RiseLines
            className="mt-7 font-display text-[clamp(3.2rem,7.6vw,7.8rem)] leading-[0.92] tracking-[-0.03em]"
            lines={["Six people,", "one long", <em key="e" className="text-accent">table.</em>]}
          />
          <p className="fade-up mt-9 max-w-md text-lg leading-relaxed text-fg/75" style={{ ["--d" as string]: 520 }} data-speakable>
            {atelier.intro}
          </p>
        </div>
        <div className="grid grid-cols-6 gap-4 md:col-span-6">
          <div className="clip-in relative col-span-4 row-span-2 aspect-[4/5] overflow-hidden rounded-[2rem]" style={{ ["--d" as string]: 250 }}>
            <div className="absolute inset-0">
              <Image src="/template/images/atelier/door.jpg" alt="The old wooden door of a stone townhouse" fill priority sizes="(min-width: 768px) 30vw, 66vw" className="object-cover" />
            </div>
          </div>
          <div className="clip-in relative col-span-2 aspect-square overflow-hidden rounded-[1.5rem] md:mt-16" style={{ ["--d" as string]: 450 }}>
            <div className="absolute inset-0">
              <Image src="/template/images/atelier/desk.jpg" alt="Glasses resting on a laptop on a wooden desk" fill sizes="(min-width: 768px) 15vw, 33vw" className="object-cover" />
            </div>
          </div>
          <div className="clip-in relative col-span-2 aspect-[3/4] overflow-hidden rounded-[1.5rem]" style={{ ["--d" as string]: 600 }}>
            <div className="absolute inset-0">
              <Image src="/template/images/atelier/tea.jpg" alt="A glass teapot and cup beside yellow roses" fill sizes="(min-width: 768px) 15vw, 33vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <Eyebrow className={eyebrow}>Why we exist</Eyebrow>
          </div>
          <ScrollWords text={atelier.manifesto} className="font-display text-[clamp(1.9rem,4vw,4rem)] leading-[1.08] md:col-span-9" />
        </div>
      </section>

      <section aria-labelledby="values" className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-36">
        <Eyebrow className={eyebrow}>How we work</Eyebrow>
        <MaskText id="values" className={`mb-14 mt-6 ${h2}`} lines={["Three habits", <em key="e" className="text-accent">we keep.</em>]} />
        <div className="grid gap-4 md:grid-cols-12 md:gap-5">
          {atelier.values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08} className={valueSpans[i]}>
              <article className="h-full rounded-[2rem] bg-white/45 p-1.5 ring-1 ring-black/[0.06]">
                <div className={`flex h-full flex-col justify-between gap-12 rounded-[calc(2rem-0.375rem)] p-8 md:p-10 ${i === 2 ? "bg-accent text-accent-fg md:flex-row md:items-end" : "bg-bg/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]"}`}>
                  <span className="font-display text-6xl italic leading-none opacity-80">0{i + 1}</span>
                  <div className="max-w-xl">
                    <h3 className="font-display text-3xl leading-tight md:text-4xl">{value.title}</h3>
                    <p className="mt-3 text-lg leading-relaxed opacity-80">{value.body}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="story" className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-36">
        <div className="mb-16 md:text-center">
          <Eyebrow className={eyebrow}>Our story</Eyebrow>
          <MaskText id="story" className={`mt-6 ${h2}`} lines={["From a kitchen table", <em key="e" className="text-accent">to the Westerstraat.</em>]} />
        </div>
        <AtelierTimeline items={atelier.milestones} />
      </section>

      <section aria-labelledby="team" className="mx-auto max-w-[1440px] px-5 pb-40 md:px-10 md:pb-52">
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow className={eyebrow}>The studio</Eyebrow>
            <MaskText id="team" className={`mt-6 ${h2}`} lines={["The people", <em key="e" className="text-accent">at the table.</em>]} />
          </div>
          <p className="max-w-sm text-fg/70 md:col-span-4 md:col-start-9">Small on purpose. Whoever you meet at the first visit is who designs, builds and photographs your project.</p>
        </div>
        <AtelierTeam people={atelier.team} />
      </section>

      <section aria-label="In numbers" className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-36">
        <ClipReveal className="relative mb-5 aspect-[16/9] rounded-[2.5rem] md:aspect-[21/8]">
          <Image src="/template/images/atelier/tuscany.jpg" alt="Cypress trees on a hill farm in southern Tuscany" fill sizes="100vw" className="object-cover" />
        </ClipReveal>
        <AtelierStats stats={atelier.stats} />
      </section>
    </>
  );
}
