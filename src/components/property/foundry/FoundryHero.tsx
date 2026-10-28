import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { Magnetic } from "@/components/motion/Magnetic";
import { RiseLines } from "@/components/motion/RiseLines";
import { foundry } from "@/content/property/foundry";
import { FoundryButton } from "./FoundryButton";

const d = (ms: number) => ({ ["--d" as string]: ms });

/** Hero: poster type on blueprint paper, a site photo framed by dimension lines that draw themselves. CSS only, so it plays before hydration. */
export function FoundryHero() {
  return (
    <section id="top" aria-labelledby="hero" className="foundry-grid relative overflow-x-clip border-b border-fg/25">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 pb-20 pt-10 md:px-10 md:pb-28 md:pt-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="fade-up" style={d(60)}>
            <Eyebrow className="bg-fg text-bg">
              <span aria-hidden className="size-1.5 bg-accent" />
              Design-build · Class A licence
            </Eyebrow>
          </div>
          <RiseLines
            id="hero"
            className="mt-7 font-display text-[clamp(5.2rem,13.5vw,13.5rem)] leading-[0.78]"
            lines={["Built", <span key="h" className="inline-block bg-accent px-[0.1em] pb-[0.04em]">to hold.</span>]}
          />
          <p className="fade-up mt-9 max-w-md text-lg leading-relaxed text-fg/80" style={d(620)}>
            Warehouses, plants and civil works, priced by us, built by our own crews and walked every morning by one site team.
          </p>
          <div className="fade-up mt-9 flex flex-wrap items-center gap-4" style={d(740)}>
            <Magnetic>
              <FoundryButton href="#quote" size="lg">
                Request a quote
              </FoundryButton>
            </Magnetic>
            <FoundryButton href="#projects" variant="line" size="lg">
              See the projects
            </FoundryButton>
          </div>
        </div>

        <div className="fade-up relative lg:col-span-5" style={d(260)}>
          <div className="relative pb-14 pr-12 md:pr-14">
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--f-char)] ring-1 ring-fg/40">
              <Image src={foundry.hero.src} alt={foundry.hero.alt} fill priority sizes="(min-width: 1024px) 38vw, 90vw" className="object-cover grayscale-[0.35] contrast-110" />
              <div aria-hidden className="absolute inset-0 bg-[#141414]/20" />
              <p className="absolute left-0 top-0 bg-accent px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-fg">Site 04 · live</p>
            </div>

            {/* Dimension lines */}
            <div aria-hidden className="absolute bottom-2 left-0 right-12 flex h-6 items-center md:right-14">
              <span className="foundry-pop absolute left-0 h-4 w-px bg-fg" style={d(1500)} />
              <span className="foundry-scale-x h-px w-full bg-fg" style={d(1300)} />
              <span className="foundry-pop absolute right-0 h-4 w-px bg-fg" style={d(2700)} />
              <span className="foundry-pop absolute left-1/2 -translate-x-1/2 bg-bg px-2.5 font-mono text-[11px] uppercase tracking-[0.12em]" style={d(2200)}>
                60 m clear span
              </span>
            </div>
            <div aria-hidden className="absolute bottom-14 right-2 top-0 flex w-6 justify-center md:right-2.5">
              <span className="foundry-pop absolute top-0 h-px w-4 bg-fg" style={d(1700)} />
              <span className="foundry-scale-y h-full w-px bg-fg" style={d(1500)} />
              <span className="foundry-pop absolute bottom-0 h-px w-4 bg-fg" style={d(2900)} />
              <span className="foundry-pop absolute top-1/2 -translate-y-1/2 bg-bg py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] [writing-mode:vertical-rl]" style={d(2400)}>
                18 m to eaves
              </span>
            </div>
          </div>

          <div className="fade-up absolute -left-1 bottom-24 w-[14.5rem] md:-left-10" style={d(1200)}>
            <div className="bg-fg p-4 text-bg shadow-[0_26px_50px_-24px_rgb(20_20_20/0.7)]">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/55">Injury rate (TRIR)</p>
              <p className="mt-1 flex items-baseline gap-3 font-display text-[3.4rem] leading-none text-accent">
                0.38
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/60">industry 2.8</span>
              </p>
            </div>
            <div aria-hidden className="foundry-hazard h-2.5" />
          </div>
        </div>
      </div>
    </section>
  );
}
