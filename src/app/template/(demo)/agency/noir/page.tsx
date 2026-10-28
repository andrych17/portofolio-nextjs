import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { MaskText } from "@/components/motion/MaskText";
import { RiseLines } from "@/components/motion/RiseLines";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { NoirButton } from "@/components/noir/NoirButton";
import { NoirReel } from "@/components/noir/NoirReel";
import { NoirServices } from "@/components/noir/NoirServices";
import { NoirStar } from "@/components/noir/NoirStar";
import { NoirStats } from "@/components/noir/NoirStats";
import { NoirTestimonials } from "@/components/noir/NoirTestimonials";
import { NoirWorkSlider } from "@/components/noir/NoirWorkSlider";
import { noir } from "@/content/noir";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "Design and engineering studio in Lisbon";
export const metadata = {
  ...pageMetadata(noir, { title, description: noir.description, path: "/agency/noir" }),
  title: { absolute: `${noir.name} · ${title}` },
};

export default function NoirHome() {
  return (
    <>
      <JsonLd data={webPageSchema(noir, { type: "WebPage", name: noir.name, description: noir.description, slug: "" })} />

      <section aria-labelledby="hero" className="relative mx-auto flex min-h-svh max-w-[1600px] flex-col justify-end px-5 pb-12 pt-36 md:px-10 md:pb-16">
        <div className="fade-up" style={{ ["--d" as string]: 80 }}>
          <Eyebrow className="bg-fg/[0.05] text-fg ring-1 ring-fg/10">
            <span className="size-1.5 animate-blink rounded-full bg-accent" />
            Independent studio · {noir.city}
          </Eyebrow>
        </div>
        <RiseLines
          id="hero"
          className="mt-8 font-display text-[clamp(3.3rem,11.5vw,12.5rem)] leading-[0.86] tracking-[-0.025em]"
          lines={[
            "We build",
            <>
              brands <span className="text-muted">&amp;</span> websites
            </>,
            <em key="e" className="text-accent">
              people remember.
            </em>,
          ]}
        />
        <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-end">
          <div className="fade-up flex flex-wrap items-center gap-5 md:col-span-6" style={{ ["--d" as string]: 650 }}>
            <Magnetic>
              <NoirButton href="/template/agency/noir/work">See the work</NoirButton>
            </Magnetic>
            <NoirButton href="/template/agency/noir/contact" variant="ghost">
              Start a project
            </NoirButton>
          </div>
          <p className="fade-up max-w-md text-lg leading-relaxed text-fg/75 md:col-span-5 md:col-start-8" style={{ ["--d" as string]: 550 }} data-speakable>
            {noir.intro}
          </p>
        </div>
      </section>

      <NoirReel src="/template/images/noir/hero.jpg" alt="A figure climbing white stone stairs in black and white" />

      <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:col-span-3">(01) The studio</p>
          <div className="md:col-span-9">
            <ScrollWords text={noir.manifesto} className="font-display text-[clamp(2rem,4.6vw,4.6rem)] leading-[1.04]" />
            <Link href="/template/agency/noir/about" className="group mt-12 inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em]">
              <span className="h-px w-10 bg-accent transition-[width] duration-700 ease-studio group-hover:w-20" />
              About the studio
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Selected work">
        <div className="mx-auto flex max-w-[1600px] items-end justify-between gap-6 px-5 md:px-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">(02) Selected work</p>
            <MaskText
              as="h2"
              className="mt-4 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.9]"
              lines={["Recent projects", <em key="e" className="text-muted">2023 to 2026</em>]}
            />
          </div>
          <p className="hidden max-w-xs text-sm text-muted md:block">Scroll to move through the work. Every project links to its case notes.</p>
        </div>
        <NoirWorkSlider projects={noir.projects.slice(0, 5)} />
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <div className="mb-16 grid gap-6 md:grid-cols-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:col-span-3">(03) What we do</p>
          <MaskText
            as="h2"
            className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.9] md:col-span-9"
            lines={["Four disciplines,", <em key="e" className="text-accent">one team.</em>]}
          />
        </div>
        <NoirServices services={noir.services} />
      </section>

      <Marquee speed={-1.6} skew className="border-y border-line py-8">
        {noir.services.map((service) => (
          <span key={service.title} className="flex items-center gap-10 pr-10 font-display text-[clamp(3rem,8vw,8rem)] italic leading-none">
            {service.title}
            <NoirStar className="size-[0.45em] text-accent" />
          </span>
        ))}
      </Marquee>

      <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <p className="mb-16 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">(04) In numbers</p>
        <NoirStats stats={noir.stats} />
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-40">
        <NoirTestimonials items={noir.testimonials} />
      </section>

      <section aria-label="Clients" className="pb-20">
        <p className="mx-auto mb-8 max-w-[1600px] px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:px-10">
          Trusted by
        </p>
        <Marquee speed={-1}>
          {noir.clients.map((client) => (
            <span key={client} className="px-8 font-display text-4xl text-fg/40 md:px-14 md:text-6xl">
              {client}
            </span>
          ))}
        </Marquee>
      </section>
    </>
  );
}
