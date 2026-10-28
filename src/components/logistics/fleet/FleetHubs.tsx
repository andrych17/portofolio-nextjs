import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";

export function FleetHubs() {
  return (
    <section id="hubs" aria-labelledby="hubs-heading" className="py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>Strategic Infrastructure</Eyebrow>
            <h2 id="hubs-heading" className="mt-4 font-display text-[clamp(2.4rem,4.5vw,4.2rem)] font-semibold leading-[1.08] text-fg">
              Cross-dock terminals positioned at core freight nodes.
            </h2>
            <p className="mt-6 text-[1.15rem] leading-relaxed text-muted">
              Our network of secure carrier-owned terminals features 24/7 security gates, automated trailer wash bays, high-speed diesel lanes, and climate-controlled cross-dock staging.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-surface p-5 ring-1 ring-line">
                <h3 className="font-display text-lg font-semibold text-fg">Drop-and-Hook Yards</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Pre-loaded trailers spotted at customer distribution centers ensure non-stop tractor turnaround with zero live-load delays.
                </p>
              </div>
              <div className="rounded-2xl bg-surface p-5 ring-1 ring-line">
                <h3 className="font-display text-lg font-semibold text-fg">Cold Staging Bays</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  In-terminal refrigerated cross-docks with dock seals and monitored cold tunnels prevent thermal loss during load transfers.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-6">
            <ClipReveal className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-bg shadow-md ring-1 ring-line">
              <Image
                src="/template/images/logistics/fleet/city.webp"
                alt="Urban logistics distribution skyline and terminal corridor"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <span className="text-xs uppercase tracking-wider opacity-80">Midwest Gateway</span>
                <p className="font-display text-lg font-medium">Chicago Central Cross-Dock</p>
              </div>
            </ClipReveal>

            <ClipReveal delay={0.15} className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-bg shadow-md ring-1 ring-line sm:mt-12">
              <Image
                src="/template/images/logistics/fleet/bay.webp"
                alt="Coastal distribution facility with wide cargo access"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <span className="text-xs uppercase tracking-wider opacity-80">Pacific Corridor</span>
                <p className="font-display text-lg font-medium">Los Angeles Harbor Yard</p>
              </div>
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
