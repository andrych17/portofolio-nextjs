import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { crumb } from "@/content/food/crumb";

export function CrumbStory() {
  return (
    <section id="story" aria-labelledby="story-heading" className="bg-surface/50 py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>Craft &amp; Mill</Eyebrow>
            <h2 id="story-heading" className="mt-4 font-display text-[clamp(2.4rem,4.5vw,4.2rem)] font-semibold leading-[1.08] text-fg">
              Flour is an agricultural ingredient, not white dust.
            </h2>
            <Reveal y={16}>
              <p className="mt-6 text-[1.15rem] leading-relaxed text-muted">
                {crumb.manifesto}
              </p>
            </Reveal>
            <Reveal y={16} delay={0.15}>
              <p className="mt-4 text-base leading-relaxed text-muted">
                We work directly with regional organic millers who stone-grind grain slowly at low temperatures. The germ and bran remain intact, retaining natural vitamins, aromatics, and wild microorganisms that power our loaves.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-2">
              {crumb.stats.map((s) => (
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
                src="/template/images/food/crumb/tins.webp"
                alt="Flour tins and bakery measuring tools on wooden prep bench"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <span className="text-xs uppercase tracking-wider opacity-80">Heritage Grains</span>
                <p className="font-display text-lg font-medium">Stone-Ground Red Fife</p>
              </div>
            </ClipReveal>

            <ClipReveal delay={0.15} className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-bg shadow-md ring-1 ring-line sm:mt-12">
              <Image
                src="/template/images/food/crumb/teapot.webp"
                alt="Warm morning teapot and ceramic cups in bakery dining corner"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <span className="text-xs uppercase tracking-wider opacity-80">Morning Gathering</span>
                <p className="font-display text-lg font-medium">Warm Ceramic Rituals</p>
              </div>
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
