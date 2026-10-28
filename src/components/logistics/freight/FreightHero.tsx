import { ArrowIsland } from "@/components/ArrowIsland";
import { Eyebrow } from "@/components/Eyebrow";
import { Magnetic } from "@/components/motion/Magnetic";
import { RiseLines } from "@/components/motion/RiseLines";
import { FreightMap } from "./FreightMap";

export function FreightHero() {
  return (
    <section id="top" aria-labelledby="hero" className="relative isolate min-h-[100svh] overflow-hidden pt-28 md:pt-32">
      {/* graticule */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.5]" style={{ backgroundImage: "linear-gradient(to right, rgb(147 166 198 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(147 166 198 / 0.08) 1px, transparent 1px)", backgroundSize: "96px 96px", maskImage: "radial-gradient(70% 60% at 60% 55%, #000, transparent)" }} />
      <div aria-hidden className="absolute -right-40 top-1/3 -z-10 size-[620px] rounded-full bg-accent/[0.07] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="fade-up" style={{ ["--d" as string]: 60 }}>
          <Eyebrow className="bg-fg/[0.06] text-fg ring-1 ring-fg/10">
            <span className="size-1.5 animate-blink rounded-full bg-accent" />
            Freight forwarding · 24/7 ops desk
          </Eyebrow>
        </div>
        <RiseLines
          id="hero"
          className="mt-7 font-display text-[clamp(3.9rem,10.4vw,10.5rem)] font-semibold leading-[0.88]"
          lines={[
            "Every border.",
            <span key="b" className="text-accent">
              One booking.
            </span>,
          ]}
        />
        <div className="fade-up mt-9 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: 600 }}>
          <Magnetic>
            <a href="#contact" className="group inline-flex items-center gap-4 rounded-full bg-accent py-2 pl-7 pr-2 text-[15px] font-semibold text-accent-fg">
              Get a quote
              <ArrowIsland className="size-11 bg-black/10" />
            </a>
          </Magnetic>
          <a href="#track" className="rounded-full bg-bg/60 px-6 py-3.5 text-[15px] ring-1 ring-fg/25 backdrop-blur-sm transition-colors hover:ring-fg/60">
            Track a shipment
          </a>
        </div>
      </div>

      {/* The map sits in the lower half so the headline stays clear of it. Wider than the screen on phones. */}
      <div className="relative mt-10 h-[300px] overflow-hidden md:absolute md:inset-x-0 md:bottom-16 md:mt-0 md:h-auto md:overflow-visible">
        <div className="absolute -left-[62%] top-0 w-[230%] md:static md:left-auto md:ml-auto md:w-[min(1320px,90%)]" style={{ maskImage: "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)" }}>
          <FreightMap />
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
