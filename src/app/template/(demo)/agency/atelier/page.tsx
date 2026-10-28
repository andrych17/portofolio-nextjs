import Image from "next/image";
import Link from "next/link";
import { AtelierButton } from "@/components/atelier/AtelierButton";
import { AtelierProcessStack } from "@/components/atelier/AtelierProcessStack";
import { AtelierServices } from "@/components/atelier/AtelierServices";
import { AtelierStats } from "@/components/atelier/AtelierStats";
import { AtelierTestimonials } from "@/components/atelier/AtelierTestimonials";
import { AtelierWorkBento } from "@/components/atelier/AtelierWorkBento";
import { Seal } from "@/components/atelier/Seal";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { Marquee } from "@/components/motion/Marquee";
import { MaskText } from "@/components/motion/MaskText";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { RiseLines } from "@/components/motion/RiseLines";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { atelier } from "@/content/atelier";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "Brand and web design studio in Amsterdam";
export const metadata = {
  ...pageMetadata(atelier, { title, description: atelier.description, path: "/agency/atelier" }),
  title: { absolute: `${atelier.name} · ${title}` },
};

const eyebrow = "bg-white/60 text-fg ring-1 ring-black/[0.06]";

export default function AtelierHome() {
  return (
    <>
      <JsonLd data={webPageSchema(atelier, { type: "WebPage", name: atelier.name, description: atelier.description, slug: "" })} />

      <section aria-labelledby="hero" className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-20 pt-32 md:grid-cols-12 md:px-10 md:pb-28 md:pt-40">
        <div className="flex flex-col justify-end md:col-span-7">
          <div className="fade-up" style={{ ["--d" as string]: 80 }}>
            <Eyebrow className={eyebrow}>
              <span className="size-1.5 rounded-full bg-accent" />
              Studio for makers · {atelier.city}
            </Eyebrow>
          </div>
          <RiseLines
            id="hero"
            className="mt-7 font-display text-[clamp(3.2rem,8.4vw,8.6rem)] leading-[0.92] tracking-[-0.03em]"
            lines={["Brands for the", "people who", <em key="e" className="text-accent">make things.</em>]}
          />
          <p className="fade-up mt-9 max-w-xl text-lg leading-relaxed text-fg/75" style={{ ["--d" as string]: 520 }} data-speakable>
            {atelier.intro}
          </p>
          <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: 640 }}>
            <AtelierButton href="/template/agency/atelier/work">See our work</AtelierButton>
            <AtelierButton href="/template/agency/atelier/process" variant="ghost">
              How we work
            </AtelierButton>
          </div>
        </div>

        <div className="relative md:col-span-5">
          <div className="rounded-[2.25rem] bg-white/45 p-1.5 ring-1 ring-black/[0.06]">
            <div className="clip-in relative aspect-[4/5] overflow-hidden rounded-[calc(2.25rem-0.375rem)]" style={{ ["--d" as string]: 200 }}>
              <div className="absolute inset-0">
                <Image src="/template/images/atelier/honey.jpg" alt="A wooden honey dipper resting in a jar of dark honey" fill priority sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
          <Seal text="FIELDWORK · AMSTERDAM · SINCE 2017 · " className="absolute -left-2 -top-8 size-28 md:-left-12 md:size-36" />
          <div className="fade-up absolute -bottom-6 right-4 max-w-[250px] rounded-[1.5rem] bg-bg/90 p-1.5 shadow-[0_24px_50px_-20px_rgba(28,27,24,0.35)] ring-1 ring-black/[0.06] backdrop-blur md:-right-6" style={{ ["--d" as string]: 900 }}>
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-white/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted">On the table now</p>
              <p className="mt-1.5 font-display text-xl leading-tight">Honeyhill Apiary</p>
              <p className="text-sm text-muted">Jars, labels and a subscription shop</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Clients" className="border-y border-line py-7">
        <Marquee speed={-0.8}>
          {atelier.clients.map((client) => (
            <span key={client} className="flex items-center gap-10 pr-10 font-display text-3xl italic text-fg/60 md:text-5xl">
              {client}
              <span aria-hidden className="size-2 rounded-full bg-accent/60" />
            </span>
          ))}
        </Marquee>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <Eyebrow className={eyebrow}>What we believe</Eyebrow>
          </div>
          <div className="md:col-span-9">
            <ScrollWords text={atelier.manifesto} className="font-display text-[clamp(1.9rem,4vw,4rem)] leading-[1.08] tracking-[-0.01em]" />
            <Link href="/template/agency/atelier/about" className="group mt-10 inline-flex items-center gap-3 text-sm font-medium">
              <span className="h-px w-10 bg-accent transition-[width] duration-700 ease-studio group-hover:w-20" />
              Meet the studio
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Studio" className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="relative">
          <ParallaxImage
            src="/template/images/atelier/hero.jpg"
            alt="Morning light over a long wooden table in a café"
            sizes="100vw"
            offset={80}
            className="aspect-[4/5] rounded-[2.5rem] sm:aspect-[16/9] md:aspect-[21/9]"
          />
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2 md:inset-x-8 md:bottom-8">
            {["We visit the kitchen", "Print is part of design", "You own the website"].map((v) => (
              <span key={v} className="rounded-full bg-bg/85 px-4 py-2 text-sm backdrop-blur">
                {v}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="work" className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-36">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow className={eyebrow}>Selected work</Eyebrow>
            <MaskText id="work" as="h2" className="mt-6 font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.95] tracking-[-0.02em]" lines={["Made with,", <em key="e" className="text-accent">not for.</em>]} />
          </div>
          <AtelierButton href="/template/agency/atelier/work" variant="ghost">
            All {atelier.projects.length} projects
          </AtelierButton>
        </div>
        <AtelierWorkBento projects={atelier.projects} />
      </section>

      <section aria-labelledby="services" className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-36">
        <div className="mb-14 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow className={eyebrow}>Services</Eyebrow>
          </div>
          <MaskText id="services" as="h2" className="font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.95] tracking-[-0.02em] md:col-span-7" lines={["Four things,", <em key="e" className="text-accent">done properly.</em>]} />
        </div>
        <AtelierServices services={atelier.services} />
      </section>

      <section aria-labelledby="process" className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-36">
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow className={eyebrow}>How a project runs</Eyebrow>
            <MaskText id="process" as="h2" className="mt-6 font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.95] tracking-[-0.02em]" lines={["Ten weeks,", <em key="e" className="text-accent">four steps.</em>]} />
          </div>
          <p className="max-w-sm text-fg/70 md:col-span-4 md:col-start-9">Every project starts with a day in your kitchen, workshop or front desk and ends with a guide your team can follow without us.</p>
        </div>
        <AtelierProcessStack steps={atelier.process} />
      </section>

      <section aria-label="In numbers" className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-36">
        <AtelierStats stats={atelier.stats} />
      </section>

      <section aria-labelledby="clients-say" className="overflow-hidden pb-28 md:pb-36">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Eyebrow className={eyebrow}>Kind words</Eyebrow>
          <MaskText id="clients-say" as="h2" className="mb-4 mt-6 font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.95] tracking-[-0.02em]" lines={["From the people", <em key="e" className="text-accent">we work with.</em>]} />
          <AtelierTestimonials items={atelier.testimonials} />
        </div>
      </section>
    </>
  );
}
