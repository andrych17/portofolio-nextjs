import { ArrowIsland } from "@/components/ArrowIsland";
import { Eyebrow } from "@/components/Eyebrow";
import { Magnetic } from "@/components/motion/Magnetic";
import { MaskText } from "@/components/motion/MaskText";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { crumb } from "@/content/food/crumb";

export function CrumbHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-28">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Left Arched Sourdough Parallax Portrait */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-t-[11rem] rounded-b-[2.5rem] bg-surface/65 p-2.5 ring-1 ring-line shadow-xl">
              <ParallaxImage
                src={crumb.heroImage}
                alt={crumb.heroAlt}
                sizes="(min-width: 1024px) 40vw, 90vw"
                offset={50}
                priority
                className="aspect-[4/5] w-full rounded-t-[10.5rem] rounded-b-[2rem]"
              />
              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-muted">Morning Pull · 06:30</span>
                  <p className="font-display text-lg font-semibold text-fg">Country Levain Boule</p>
                </div>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                  250°C Stone Deck
                </span>
              </div>
            </div>
          </div>

          {/* Right Editorial Fermentation Copy + ScrollWords */}
          <div className="lg:col-span-7 lg:pl-6">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>Daily Micro-Bakes · Wild Levain</Eyebrow>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent ring-1 ring-accent/20">
                36-Hour Cold Proof
              </span>
            </div>

            <MaskText
              as="h1"
              lines={["Thirty-six hours", "of unhurried wild", <span key="3" className="italic text-accent">fermentation.</span>]}
              className="mt-6 font-display text-[clamp(2.8rem,6vw,5.4rem)] font-semibold leading-[1.02] tracking-tight text-fg"
            />

            <Reveal y={16} delay={0.2}>
              <p
                data-speakable
                className="mt-6 max-w-xl text-[1.12rem] leading-relaxed text-muted md:text-[1.2rem]"
              >
                {crumb.answer}
              </p>
            </Reveal>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.22}>
                <a
                  href="#bakes"
                  className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-accent-fg shadow-sm transition-transform duration-300 ease-studio hover:scale-[1.02]"
                >
                  <span>Glide Oven Pull Rail</span>
                  <ArrowIsland size={14} className="bg-white/20 text-white" />
                </a>
              </Magnetic>
              <Magnetic strength={0.18}>
                <a
                  href="#schedule"
                  className="inline-flex min-h-12 items-center rounded-full bg-surface px-6 py-2 text-sm font-semibold text-fg ring-1 ring-line transition-colors hover:bg-bg"
                >
                  Live Oven Schedule
                </a>
              </Magnetic>
            </div>

            <div className="mt-10 rounded-3xl bg-surface/75 p-5 ring-1 ring-line">
              <ScrollWords
                className="font-display text-lg font-medium italic leading-relaxed text-fg md:text-xl"
                text="Stone-milled heritage wheat, filtered spring water, grey sea salt, and a twelve-year mother starter — nothing else enters our mixers."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
