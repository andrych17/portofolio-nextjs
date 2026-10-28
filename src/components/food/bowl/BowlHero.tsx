import { ArrowIsland } from "@/components/ArrowIsland";
import { Eyebrow } from "@/components/Eyebrow";
import { Magnetic } from "@/components/motion/Magnetic";
import { MaskText, SplitWords } from "@/components/motion/MaskText";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { bowl } from "@/content/food/bowl";

export function BowlHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        {/* Centered Harvest Masthead */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <Eyebrow>Seasonal Harvest · 48-Hour Soil-to-Bowl</Eyebrow>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent ring-1 ring-accent/20">
              100% Certified Organic
            </span>
          </div>

          <MaskText
            as="h1"
            lines={["Real food, pulled from", <span key="2" className="italic text-accent">the soil this morning.</span>]}
            className="mt-6 font-display text-[clamp(2.8rem,6.4vw,5.8rem)] font-semibold leading-[0.98] tracking-tight text-fg"
          />

          <p
            data-speakable
            className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-muted md:text-[1.22rem]"
          >
            <SplitWords text={bowl.answer} />
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.22}>
              <a
                href="#bowls"
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-accent-fg shadow-sm transition-transform duration-300 ease-studio hover:scale-[1.02]"
              >
                <span>Explore Signature Bowls</span>
                <ArrowIsland size={14} className="bg-white/20 text-white" />
              </a>
            </Magnetic>
            <Magnetic strength={0.18}>
              <a
                href="#builder"
                className="inline-flex min-h-12 items-center rounded-full bg-surface px-6 py-2 text-sm font-semibold text-fg ring-1 ring-line transition-colors hover:bg-bg"
              >
                Interactive Macro Builder
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Wide Parallax Harvest Banner */}
        <div className="relative mt-12 rounded-[2.5rem] bg-surface/60 p-2.5 ring-1 ring-line shadow-xl">
          <ParallaxImage
            src={bowl.heroImage}
            alt={bowl.heroAlt}
            sizes="95vw"
            offset={55}
            priority
            className="aspect-[16/8] w-full rounded-[2rem]"
          />
          <div className="mt-3 grid grid-cols-1 gap-3 px-3 pb-1 sm:grid-cols-3">
            <div className="rounded-2xl bg-bg/90 p-3.5 ring-1 ring-line">
              <span className="text-[11px] uppercase tracking-wider text-muted">Morning Harvest</span>
              <p className="font-display text-lg font-semibold text-fg">Tuscan Kale &amp; Sprouted Quinoa</p>
            </div>
            <div className="rounded-2xl bg-bg/90 p-3.5 ring-1 ring-line">
              <span className="text-[11px] uppercase tracking-wider text-muted">Cooking Fats</span>
              <p className="font-display text-lg font-semibold text-fg">100% Cold-Pressed Olive &amp; Sesame</p>
            </div>
            <div className="rounded-2xl bg-bg/90 p-3.5 ring-1 ring-line">
              <span className="text-[11px] uppercase tracking-wider text-muted">Farm Traceability</span>
              <p className="font-display text-lg font-semibold text-accent">Harvested Under 48 Hours Ago</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
