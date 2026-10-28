import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { BouncyText } from "@/components/kinetic/BouncyText";
import { Burst } from "@/components/kinetic/Burst";
import { KineticButton } from "@/components/kinetic/KineticButton";
import { KineticServices } from "@/components/kinetic/KineticServices";
import { KineticStats } from "@/components/kinetic/KineticStats";
import { KineticStickers } from "@/components/kinetic/KineticStickers";
import { KineticTestimonials } from "@/components/kinetic/KineticTestimonials";
import { KineticWorkStack } from "@/components/kinetic/KineticWorkStack";
import { SpinBadge } from "@/components/kinetic/SpinBadge";
import { Marquee } from "@/components/motion/Marquee";
import { MaskText } from "@/components/motion/MaskText";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { kinetic } from "@/content/kinetic";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "Brand and web studio in Melbourne";
export const metadata = {
  ...pageMetadata(kinetic, { title, description: kinetic.description, path: "/agency/kinetic" }),
  title: { absolute: `${kinetic.name} · ${title}` },
};

const eyebrow = "border-2 border-k-ink bg-white font-bold text-k-ink";
const h2 = "font-display text-[clamp(2.8rem,7vw,7rem)] font-black uppercase leading-[0.86] tracking-tight";

export default function KineticHome() {
  return (
    <>
      <JsonLd data={webPageSchema(kinetic, { type: "WebPage", name: kinetic.name, description: kinetic.description, slug: "" })} />

      <section aria-labelledby="hero" className="px-3 pt-24 md:px-6 md:pt-28">
        <div className="k-dots relative mx-auto max-w-[1440px] rounded-[2.5rem] border-2 border-k-ink bg-white px-5 pb-8 pt-12 shadow-[8px_8px_0_0_#121212] md:px-10 md:pb-10 md:pt-16">
          <div className="fade-up" style={{ ["--d" as string]: 60 }}>
            <Eyebrow className={eyebrow}>
              <span className="size-2 animate-blink rounded-full bg-accent" />
              Brand + web studio<span className="hidden md:inline"> · {kinetic.city}</span>
            </Eyebrow>
          </div>
          <h1 id="hero" className="relative z-10 mt-6 font-display text-[clamp(3rem,12vw,12rem)] font-black uppercase leading-[0.84] tracking-[-0.02em]">
            <span className="sr-only">Loud brands, fast sites.</span>
            <BouncyText
              lines={[
                [
                  "Loud",
                  <span key="pill" className="relative inline-block h-[0.66em] w-[1.5em] overflow-hidden rounded-full border-[0.04em] border-k-ink align-[0.05em]">
                    <Image src="/template/images/kinetic/coffee.jpg" alt="" fill priority sizes="220px" className="object-cover" />
                  </span>,
                ],
                ["brands,"],
                [
                  <Burst key="burst" className="inline-block size-[0.7em] animate-spin-slow align-[0.02em]" fill="#c6f432" />,
                  "fast",
                ],
                [<span key="s" className="text-accent">sites.</span>],
              ]}
            />
          </h1>
          <div className="relative z-10 mt-10 grid items-end gap-8 md:grid-cols-12">
            <p className="fade-up max-w-md text-lg font-medium leading-snug md:col-span-5" style={{ ["--d" as string]: 700 }} data-speakable>
              {kinetic.intro}
            </p>
            <div className="fade-up flex flex-wrap gap-3 md:col-span-5" style={{ ["--d" as string]: 820 }}>
              <KineticButton href="/showcase/agency/kinetic/work">See the work</KineticButton>
              <KineticButton href="/showcase/agency/kinetic/contact" tone="white">
                Start a project
              </KineticButton>
            </div>
            <div className="hidden justify-end md:col-span-2 md:flex">
              <SpinBadge text="SCROLL FOR THE GOOD STUFF · SCROLL · " className="size-32" />
            </div>
          </div>
          <KineticStickers />
        </div>
      </section>

      <section aria-label="What we do" className="relative my-16 h-52 md:my-24 md:h-72">
        <div className="absolute inset-x-[-5%] top-6 rotate-[-3deg] border-y-2 border-k-ink bg-k-blue py-4 text-white">
          <Marquee speed={-1.6} skew>
            {kinetic.services.map((s) => (
              <span key={s.title} className="flex items-center gap-6 pr-6 font-display text-3xl font-black uppercase md:text-5xl">
                {s.title}
                <Burst className="size-8 md:size-12" fill="#ffd23f" />
              </span>
            ))}
          </Marquee>
        </div>
        <div className="absolute inset-x-[-5%] top-24 rotate-[2deg] border-y-2 border-k-ink bg-k-pink py-4 md:top-36">
          <Marquee speed={1.3} skew>
            {kinetic.clients.map((c) => (
              <span key={c} className="flex items-center gap-6 pr-6 font-display text-3xl font-black uppercase md:text-5xl">
                {c}
                <span aria-hidden className="size-4 rounded-full border-2 border-k-ink bg-k-lime md:size-6" />
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <Eyebrow className={eyebrow}>Our deal</Eyebrow>
          </div>
          <ScrollWords text={kinetic.manifesto} dim={0.14} className="font-display text-[clamp(1.8rem,3.8vw,3.8rem)] font-extrabold leading-[1.02] tracking-tight md:col-span-9" />
        </div>
      </section>

      <section aria-labelledby="work" className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 px-1">
          <div>
            <Eyebrow className={eyebrow}>Fresh work</Eyebrow>
            <MaskText id="work" className={`mt-5 ${h2}`} lines={["Stuff we", <span key="s" className="text-accent">shipped.</span>]} />
          </div>
          <KineticButton href="/showcase/agency/kinetic/work" tone="yellow">
            All work
          </KineticButton>
        </div>
        <KineticWorkStack projects={kinetic.projects.slice(0, 4)} />
      </section>

      <section aria-labelledby="services" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow className={eyebrow}>On the menu</Eyebrow>
            <MaskText id="services" className={`mt-5 ${h2}`} lines={["Four flavours,", "one studio."]} />
          </div>
          <p className="max-w-sm text-lg font-medium md:col-span-4">Pick one or get the lot. Most clients start with a brand sprint and end up with the whole sundae.</p>
        </div>
        <KineticServices services={kinetic.services} />
      </section>

      <section aria-label="In numbers" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <KineticStats stats={kinetic.stats} />
      </section>

      <section aria-labelledby="love" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:pb-36 md:pt-28">
        <div className="mb-12">
          <Eyebrow className={eyebrow}>Fan mail</Eyebrow>
          <MaskText id="love" className={`mt-5 ${h2}`} lines={["Nice things", <span key="s" className="k-outline">people said.</span>]} />
        </div>
        <KineticTestimonials items={kinetic.testimonials} />
      </section>
    </>
  );
}
