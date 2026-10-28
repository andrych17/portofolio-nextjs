import { ArrowIsland } from "@/components/ArrowIsland";
import { Eyebrow } from "@/components/Eyebrow";
import { Magnetic } from "@/components/motion/Magnetic";
import { MaskText, SplitWords } from "@/components/motion/MaskText";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { forge } from "@/content/logistics/forge";

export function ForgeHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <Eyebrow>Project Cargo Engineering · SPMT Superloads</Eyebrow>
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent ring-1 ring-accent/30">
              Up to 1,200 Tons
            </span>
          </div>

          <MaskText
            as="h1"
            lines={[
              "Engineering heavy transport",
              <span key="2" className="text-accent">for impossible cargo.</span>,
            ]}
            className="mt-6 font-display text-[clamp(2.8rem,6.4vw,5.6rem)] font-semibold leading-[0.98] tracking-tight text-fg"
          />

          <p
            data-speakable
            className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-muted md:text-[1.22rem]"
          >
            <SplitWords text={forge.answer} />
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.22}>
              <a
                href="#quote"
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-accent-fg shadow-sm transition-transform duration-300 ease-studio hover:scale-[1.02]"
              >
                <span>Request Engineering Review</span>
                <ArrowIsland size={14} className="bg-black/20 text-black" />
              </a>
            </Magnetic>
            <Magnetic strength={0.18}>
              <a
                href="#capabilities"
                className="inline-flex min-h-12 items-center rounded-full bg-surface px-6 py-2 text-sm font-semibold text-fg ring-1 ring-line transition-colors hover:bg-bg"
              >
                3D Rigging Capabilities
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Wide Parallax Heavy-Haul Platform Banner */}
        <div className="relative mt-12 rounded-[2.5rem] bg-surface/65 p-2.5 shadow-2xl ring-1 ring-line">
          <ParallaxImage
            src={forge.heroImage}
            alt={forge.heroAlt}
            sizes="95vw"
            offset={60}
            priority
            className="aspect-[16/8] w-full rounded-[2rem]"
          />
          <div className="mt-3 grid grid-cols-1 gap-3 px-3 pb-1 sm:grid-cols-3">
            <div className="rounded-2xl bg-bg/90 p-3.5 ring-1 ring-line">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Active Platform</span>
              <p className="font-display text-lg font-semibold text-fg">24-Axle Scheuerle SPMT</p>
            </div>
            <div className="rounded-2xl bg-bg/90 p-3.5 ring-1 ring-line">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Structural Stamp</span>
              <p className="font-display text-lg font-semibold text-fg">PE Bridge Shear &amp; Axle Calc</p>
            </div>
            <div className="rounded-2xl bg-bg/90 p-3.5 ring-1 ring-line">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Hydraulic Telemetry</span>
              <p className="font-display text-lg font-semibold text-accent">3-Point Auto-Leveling ±0.2°</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
