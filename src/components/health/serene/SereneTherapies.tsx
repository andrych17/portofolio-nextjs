import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { serene } from "@/content/health/serene";

export function SereneTherapies() {
  return (
    <section id="therapies" aria-labelledby="therapies-heading" className="py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Recovery Protocols</Eyebrow>
            <h2 id="therapies-heading" className="mt-3 font-display text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-tight text-fg">
              Biological Therapies
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Scientifically guided hot-cold contrast, hyperbaric oxygen pressure, and photobiomodulation to accelerate systemic recovery.
            </p>
          </div>
          <div className="text-sm font-medium text-muted">
            All suites are entirely private to your booking
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-12">
          {serene.therapies.map((t, idx) => {
            const isLarge = idx === 0 || idx === 3;
            return (
              <Reveal
                key={t.id}
                y={20}
                delay={idx * 0.1}
                className={isLarge ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <article className="group flex h-full flex-col justify-between rounded-[2rem] bg-surface p-6 ring-1 ring-line transition-all duration-300 hover:ring-fg/30 md:p-8">
                  <div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Protocol 0{idx + 1}</span>
                        <h3 className="mt-2 font-display text-2xl font-semibold text-fg md:text-3xl">{t.name}</h3>
                        <p className="mt-1 text-sm font-medium text-muted">{t.tagline}</p>
                      </div>
                      <span className="self-start shrink-0 rounded-full bg-bg px-3.5 py-1 text-xs font-bold text-fg ring-1 ring-line">
                        ${t.price} / session
                      </span>
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-muted">{t.desc}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {t.benefits.map((b) => (
                        <span
                          key={b}
                          className="rounded-full bg-bg/80 px-3 py-1 text-xs font-medium text-fg/85 ring-1 ring-line"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-2 border-t border-line/60 pt-4 text-xs text-muted">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider opacity-70">Thermal</span>
                      <span className="font-medium text-fg">{t.temperature}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider opacity-70">Duration</span>
                      <span className="font-medium text-fg">{t.duration}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider opacity-70">Target</span>
                      <span className="font-medium text-fg">{t.targetMetric}</span>
                    </div>
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
