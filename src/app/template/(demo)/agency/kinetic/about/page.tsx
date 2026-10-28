import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { BouncyText } from "@/components/kinetic/BouncyText";
import { Burst } from "@/components/kinetic/Burst";
import { KineticFlipCards } from "@/components/kinetic/KineticFlipCards";
import { KineticMilestones } from "@/components/kinetic/KineticMilestones";
import { KineticStats } from "@/components/kinetic/KineticStats";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { kinetic } from "@/content/kinetic";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Your Brand is fourteen designers, developers and strategists (plus one dog) in Collingwood, Melbourne. Meet the team behind loud brands and fast websites.";

export const metadata = pageMetadata(kinetic, { title: "About", description, path: "/agency/kinetic/about" });

const eyebrow = "border-2 border-k-ink bg-white font-bold";
const h2 = "font-display text-[clamp(2.8rem,7vw,7rem)] font-black uppercase leading-[0.86] tracking-tight";
const valueTones = ["bg-k-yellow", "bg-k-blue text-white", "bg-k-pink"];

export default function KineticAbout() {
  return (
    <>
      <JsonLd data={webPageSchema(kinetic, { type: "AboutPage", name: "About", description, slug: "about" })} />

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-20 pt-32 md:grid-cols-12 md:px-10 md:pt-44">
        <div className="md:col-span-7">
          <div className="fade-up" style={{ ["--d" as string]: 60 }}>
            <Eyebrow className={eyebrow}>About · Since {kinetic.founded}</Eyebrow>
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,6.4rem)] font-black uppercase leading-[0.86] tracking-tight">
            <span className="sr-only">14 humans, one very good dog</span>
            <BouncyText lines={[["14 humans,"], ["one very"], [<span key="g" className="text-accent">good dog.</span>]]} />
          </h1>
          <p className="fade-up mt-8 max-w-lg text-lg font-medium leading-snug" style={{ ["--d" as string]: 650 }} data-speakable>
            {kinetic.intro}
          </p>
        </div>
        <div className="relative min-h-[420px] md:col-span-5">
          <div className="fade-up absolute left-0 top-0 w-[62%] -rotate-3 overflow-hidden rounded-[1.75rem] border-2 border-k-ink shadow-[6px_6px_0_0_#121212]" style={{ ["--d" as string]: 300 }}>
            <div className="relative aspect-[4/5]">
              <Image src="/template/images/kinetic/street.jpg" alt="A sunny side street with washing lines between the houses" fill priority sizes="(min-width: 768px) 25vw, 60vw" className="object-cover" />
            </div>
          </div>
          <div className="fade-up absolute right-0 top-[18%] w-[52%] rotate-3 overflow-hidden rounded-[1.75rem] border-2 border-k-ink shadow-[6px_6px_0_0_#121212]" style={{ ["--d" as string]: 450 }}>
            <div className="relative aspect-square">
              <Image src="/template/images/kinetic/mug.jpg" alt="A vintage printed mug on a café table" fill sizes="(min-width: 768px) 20vw, 50vw" className="object-cover" />
            </div>
          </div>
          <div className="fade-up absolute bottom-0 left-[20%] w-[46%] -rotate-6" style={{ ["--d" as string]: 600 }}>
            <div className="relative">
              <Burst className="w-full" fill="#c6f432" />
              <span className="absolute inset-0 flex items-center justify-center text-center font-display text-[clamp(0.7rem,1.2vw,1.1rem)] font-black uppercase leading-tight">
                Made in
                <br />
                Collingwood
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <Eyebrow className={eyebrow}>Why Your Brand</Eyebrow>
          </div>
          <ScrollWords text={kinetic.manifesto} dim={0.14} className="font-display text-[clamp(1.8rem,3.8vw,3.8rem)] font-extrabold leading-[1.02] tracking-tight md:col-span-9" />
        </div>
      </section>

      <section aria-labelledby="values" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <Eyebrow className={eyebrow}>House rules</Eyebrow>
        <MaskText id="values" className={`mb-12 mt-5 ${h2}`} lines={["Three rules", "we live by."]} />
        <div className="space-y-5">
          {kinetic.values.map((v, i) => (
            <Reveal key={v.title} x={i % 2 ? 60 : -60} y={0}>
              <article
                className={`k-shadow grid gap-4 rounded-[2rem] border-2 border-k-ink p-7 md:grid-cols-12 md:items-center md:p-10 ${valueTones[i % valueTones.length]} ${i === 1 ? "md:ml-[8%]" : i === 2 ? "md:ml-[16%]" : "md:mr-[16%]"}`}
              >
                <span className="font-display text-6xl font-black leading-none md:col-span-2 md:text-7xl">0{i + 1}</span>
                <h3 className="font-display text-3xl font-black uppercase leading-[0.9] md:col-span-5 md:text-5xl">{v.title}</h3>
                <p className="text-lg font-medium leading-snug md:col-span-5">{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="team" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow className={eyebrow}>The crew</Eyebrow>
            <MaskText id="team" className={`mt-5 ${h2}`} lines={["Meet the", <span key="s" className="text-accent">scoops.</span>]} />
          </div>
          <p className="max-w-xs text-lg font-medium md:col-span-4">Hover or tap a card for the fact we put in everyone&apos;s onboarding doc.</p>
        </div>
        <KineticFlipCards people={kinetic.team} />
      </section>

      <KineticMilestones
        items={kinetic.milestones}
        heading={
          <div>
            <Eyebrow className={eyebrow}>The story so far</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.8rem)] font-black uppercase leading-[0.86] tracking-tight">
              From one
              <br />
              <span className="text-accent">gelato shop</span>
            </h2>
          </div>
        }
      />

      <section aria-label="In numbers" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:pb-36 md:pt-28">
        <KineticStats stats={kinetic.stats} />
      </section>
    </>
  );
}
