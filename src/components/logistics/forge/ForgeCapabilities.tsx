import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { forge } from "@/content/logistics/forge";

export function ForgeCapabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Heavy Transport</Eyebrow>
            <h2 id="capabilities-heading" className="mt-3 font-display text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-tight text-fg">
              Engineered Capabilities
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Specialized multi-axle modular trailers, high-girder schnabel frames, and indoor hydraulic gantry systems.
            </p>
          </div>
          <div className="text-sm font-medium text-muted">
            PE stamped rigging &amp; transport calculations
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-12">
          {forge.capabilities.map((c, idx) => {
            const isLarge = idx === 0 || idx === 3;
            return (
              <Reveal
                key={c.id}
                y={20}
                delay={idx * 0.1}
                className={isLarge ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <article className="group flex h-full flex-col justify-between rounded-[2rem] bg-surface p-6 ring-1 ring-line transition-all duration-300 hover:ring-accent/40 md:p-8">
                  <div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div>
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">Division 0{idx + 1}</span>
                        <h3 className="mt-2 font-display text-2xl font-semibold text-fg md:text-3xl">{c.name}</h3>
                        <p className="mt-1 text-sm font-medium text-muted">{c.tagline}</p>
                      </div>
                      <span className="self-start shrink-0 rounded-full bg-bg px-3.5 py-1 text-xs font-bold text-fg ring-1 ring-line">
                        {c.maxWeight}
                      </span>
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-muted">{c.desc}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {c.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full bg-bg/80 px-3 py-1 text-xs font-medium text-fg/85 ring-1 ring-line"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-2 border-t border-line/60 pt-4 text-xs text-muted sm:grid-cols-2">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider opacity-70">Primary Equipment</span>
                      <span className="font-medium text-fg">{c.equipment}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider opacity-70">Engineering Scope</span>
                      <span className="font-medium text-fg">{c.engineering}</span>
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
