import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { bowl } from "@/content/food/bowl";

export function BowlStory() {
  return (
    <section id="story" aria-labelledby="story-heading" className="bg-surface/50 py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>Soil to Bowl</Eyebrow>
            <h2 id="story-heading" className="mt-4 font-display text-[clamp(2.4rem,4.5vw,4.2rem)] font-semibold leading-[1.08] text-fg">
              We partner with fourteen family farms.
            </h2>
            <Reveal y={16}>
              <p className="mt-6 text-[1.15rem] leading-relaxed text-muted">
                {bowl.manifesto}
              </p>
            </Reveal>
            <Reveal y={16} delay={0.15}>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Every delivery van arrives before sunrise with produce harvested less than 24 hours prior. We wash by hand, slow-roast roots over low heat to preserve delicate enzymes, and toss only to order.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-2">
              {bowl.stats.map((s) => (
                <div key={s.label} className="border-t border-line pt-4">
                  <p className="font-display text-4xl font-semibold text-accent md:text-5xl">
                    <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-6">
            <ClipReveal className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-bg shadow-md ring-1 ring-line">
              <Image
                src="/template/images/food/bowl/oranges.webp"
                alt="Bright freshly harvested organic oranges"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <span className="text-xs uppercase tracking-wider opacity-80">Orchard Partner</span>
                <p className="font-display text-lg font-medium">Valencia Sun Groves</p>
              </div>
            </ClipReveal>

            <ClipReveal delay={0.15} className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-bg shadow-md ring-1 ring-line sm:mt-12">
              <Image
                src="/template/images/food/bowl/lemon.webp"
                alt="Ripe organic lemons on a tree branch"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <span className="text-xs uppercase tracking-wider opacity-80">Citrus Dressing</span>
                <p className="font-display text-lg font-medium">Coastal Meyer Lemons</p>
              </div>
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
