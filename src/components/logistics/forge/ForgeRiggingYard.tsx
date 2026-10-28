import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Counter } from "@/components/motion/Counter";
import { forge } from "@/content/logistics/forge";

export function ForgeRiggingYard() {
  return (
    <section id="rigging" aria-labelledby="rigging-heading" className="bg-surface/50 py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>Waterfront Terminal</Eyebrow>
            <h2 id="rigging-heading" className="mt-4 font-display text-[clamp(2.4rem,4.5vw,4.2rem)] font-semibold leading-[1.08] text-fg">
              Deepwater berth &amp; heavy laydown terminal.
            </h2>
            <p className="mt-6 text-[1.15rem] leading-relaxed text-muted">
              {forge.manifesto}
            </p>

            <div className="mt-8 space-y-4 text-sm text-muted">
              <p>
                Our Ironport Terminal facility allows roll-on roll-off ocean barges to roll directly onto highway platform trailers, bypassing weight-restricted public roadways.
              </p>
              <p>
                With twenty acres of 10,000 PSF reinforced concrete ground bearing capacity, heavy components can be staged, surveyed, and rigged prior to final site delivery.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-2">
              {forge.stats.map((s) => (
                <div key={s.label} className="border-t border-line pt-4">
                  <p className="font-display text-4xl font-semibold text-accent md:text-5xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-6">
            <ClipReveal className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-bg shadow-md ring-1 ring-line">
              <Image
                src="/template/images/logistics/forge/tools.webp"
                alt="Heavy industrial steel rigging equipment and heavy-lift rigging hardware"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
                <span className="text-xs uppercase tracking-wider opacity-80">Rigging Yard</span>
                <p className="font-display text-lg font-medium">800-Ton Hydraulic Gantries</p>
              </div>
            </ClipReveal>

            <ClipReveal delay={0.15} className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-bg shadow-md ring-1 ring-line sm:mt-12">
              <Image
                src="/template/images/logistics/forge/lattice.webp"
                alt="High-capacity lattice boom crawler crane rigging framework"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
                <span className="text-xs uppercase tracking-wider opacity-80">Crane Operations</span>
                <p className="font-display text-lg font-medium">Lattice Boom Tandem Lifts</p>
              </div>
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
