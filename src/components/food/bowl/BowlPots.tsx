import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { bowl } from "@/content/food/bowl";

export function BowlPots() {
  return (
    <section id="pots" aria-labelledby="pots-heading" className="py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Morning &amp; Refresh</Eyebrow>
            <h2 id="pots-heading" className="mt-3 font-display text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-tight text-fg">
              Breakfast Pots &amp; Elixirs
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Cultured coconut yogurt, sprouted grains and cold-soaked chia made in small batches before sunrise.
            </p>
          </div>
          <div className="text-sm font-medium text-muted">
            Served from 07:30 daily until sold out
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {bowl.breakfastPots.map((pot, i) => (
            <Reveal key={pot.id} y={20} delay={i * 0.12}>
              <div className="group flex h-full flex-col justify-between rounded-[2rem] bg-surface p-2 ring-1 ring-line transition-all duration-300 hover:ring-fg/30">
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.6rem] bg-bg">
                    <Image
                      src={pot.image}
                      alt={pot.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 ease-studio group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex gap-1">
                      {pot.tags.map((t) => (
                        <span key={t} className="rounded-full bg-bg/90 px-2.5 py-0.5 text-xs font-bold text-fg backdrop-blur-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-2xl font-semibold text-fg">{pot.name}</h3>
                      <span className="font-display text-xl font-semibold text-fg">${pot.price}</span>
                    </div>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">{pot.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{pot.desc}</p>
                  </div>
                </div>

                <div className="border-t border-line/60 px-5 py-3 text-xs text-muted">
                  <span>{pot.calories} kcal · {pot.protein}g protein</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
