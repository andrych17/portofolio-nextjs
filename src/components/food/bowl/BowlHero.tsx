import Image from "next/image";
import { ArrowIsland } from "@/components/ArrowIsland";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { RiseLines } from "@/components/motion/RiseLines";
import { bowl } from "@/content/food/bowl";

export function BowlHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-28">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>Seasonal Harvest</Eyebrow>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent ring-1 ring-accent/20">
                100% Certified Organic
              </span>
            </div>

            <RiseLines
              as="h1"
              lines={["Real food,", "pulled from the soil", "this morning."]}
              className="mt-6 font-display text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[1.04] tracking-tight text-fg"
            />

            <Reveal y={16} delay={0.25}>
              <p
                data-speakable
                className="mt-6 max-w-xl text-[1.15rem] leading-relaxed text-muted md:text-[1.25rem]"
              >
                {bowl.answer}
              </p>
            </Reveal>

            <Reveal y={16} delay={0.35}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#bowls"
                  className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-accent-fg shadow-sm transition-transform duration-300 ease-studio hover:scale-[1.02]"
                >
                  <span>Explore Menu</span>
                  <ArrowIsland size={14} className="bg-white/20 text-white" />
                </a>
                <a
                  href="#builder"
                  className="inline-flex min-h-12 items-center rounded-full bg-surface px-6 py-2 text-sm font-semibold text-fg ring-1 ring-line transition-colors hover:bg-bg"
                >
                  Custom Builder
                </a>
              </div>
            </Reveal>

            <Reveal y={12} delay={0.45}>
              <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-line pt-6 text-sm text-muted">
                <div>
                  <span className="font-semibold text-fg">Zero Seed Oils</span>
                  <p className="text-xs">Cold-pressed olive & sesame only</p>
                </div>
                <div className="h-8 w-px bg-line" />
                <div>
                  <span className="font-semibold text-fg">48-Hour Guarantee</span>
                  <p className="text-xs">From soil harvest to counter</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <ClipReveal className="relative mx-auto max-w-[500px] p-2 ring-1 ring-line rounded-[2.5rem] bg-surface/50 shadow-xl lg:max-w-none">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.2rem]">
                <Image
                  src={bowl.heroImage}
                  alt={bowl.heroAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-bg/95 p-4 shadow-lg ring-1 ring-line backdrop-blur-md sm:left-4">
                <span className="text-xs uppercase tracking-wider text-muted">Morning Harvest</span>
                <p className="font-display text-lg font-semibold text-fg">Tuscan Kale & Quinoa</p>
                <span className="mt-1 inline-block rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
                  Packed with micronutrients
                </span>
              </div>
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
