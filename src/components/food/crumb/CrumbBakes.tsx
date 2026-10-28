import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { crumb } from "@/content/food/crumb";

export function CrumbBakes() {
  return (
    <section id="bakes" aria-labelledby="bakes-heading" className="py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Daily Deck Pulls</Eyebrow>
            <h2 id="bakes-heading" className="mt-3 font-display text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-tight text-fg">
              Breads &amp; Pastries
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Hand-mixed, unhurried, and pulled hot from the deck ovens in small sequential batches.
            </p>
          </div>
          <div className="text-sm font-medium text-muted">
            Baking from 06:00 until sold out
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-12">
          {crumb.bakes.map((bake, idx) => {
            const isLarge = idx === 0 || idx === 3;
            return (
              <Reveal
                key={bake.id}
                y={20}
                delay={idx * 0.1}
                className={isLarge ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <article className="group flex h-full flex-col justify-between rounded-[2rem] bg-surface p-2 ring-1 ring-line transition-all duration-300 hover:ring-fg/30">
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.6rem] bg-bg">
                      <Image
                        src={bake.image}
                        alt={bake.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 95vw"
                        className="object-cover transition-transform duration-500 ease-studio group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 rounded-full bg-bg/90 px-3 py-1 text-xs font-bold text-fg backdrop-blur-sm">
                        {bake.timeOut}
                      </div>
                    </div>

                    <div className="p-5 md:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-2xl font-semibold text-fg md:text-3xl">{bake.name}</h3>
                          <p className="mt-1 text-sm font-medium text-accent">{bake.tagline}</p>
                        </div>
                        <span className="font-display text-2xl font-semibold text-fg">${bake.price}</span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted">{bake.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-line/60 px-5 py-4 text-xs font-medium text-muted md:px-6">
                    <span className="italic">{bake.flour}</span>
                    <a href="#reserve" className="font-semibold text-accent hover:underline">
                      Reserve Loaf &rarr;
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
