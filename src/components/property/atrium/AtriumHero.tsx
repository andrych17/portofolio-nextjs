import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { Magnetic } from "@/components/motion/Magnetic";
import { RiseLines } from "@/components/motion/RiseLines";
import { atrium } from "@/content/property/atrium";
import { AtriumButton } from "./AtriumButton";

const d = (ms: number) => ({ ["--d" as string]: ms });
const FLOORS = Array.from({ length: 14 }, (_, i) => String(i + 1).padStart(2, "0"));
const RULER = ["24", "18", "12", "06", "00"];

/** Hero: light-weight headline beside a tall look-up photo, a 24-floor ruler that draws itself and a lift display that counts up to level 14. CSS only, so it plays before hydration. */
export function AtriumHero() {
  return (
    <section id="top" aria-labelledby="hero" className="atrium-cols relative overflow-x-clip">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 pb-20 pt-10 md:px-10 md:pb-28 md:pt-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="fade-up" style={d(60)}>
            <Eyebrow className="bg-fg text-bg">
              <span aria-hidden className="size-1.5 bg-accent" />
              L01 · City-centre workspace
            </Eyebrow>
          </div>
          <RiseLines
            id="hero"
            className="mt-7 font-display text-[clamp(3.6rem,7.6vw,8rem)] leading-[0.9]"
            lines={["Work a few", <b key="b">floors above</b>, <span key="s">the street<span className="text-accent">.</span></span>]}
          />
          <p className="fade-up mt-9 max-w-md text-[1.15rem] leading-relaxed text-fg/80" style={d(640)}>
            Offices, studios and ground-floor shops in fourteen city-centre buildings. Short leases, one price, and a lobby you will want to walk through.
          </p>
          <div className="fade-up mt-9 flex flex-wrap items-center gap-4" style={d(760)}>
            <Magnetic>
              <AtriumButton href="#viewing" size="lg">
                Book a viewing
              </AtriumButton>
            </Magnetic>
            <AtriumButton href="#buildings" variant="line" size="lg">
              See the buildings
            </AtriumButton>
          </div>
        </div>

        <div className="fade-up relative lg:col-span-5" style={d(200)}>
          <div className="relative pb-10">
            <div className="clip-in relative aspect-[4/5] bg-[var(--a-ink)]" style={d(260)}>
              <Image src={atrium.hero.src} alt={atrium.hero.alt} fill priority sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover" />
            </div>
            <p className="absolute right-0 top-0 bg-bg px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em]">The Cartwright · looking up</p>

            {/* Ruler: 24 floors, drawn bottom-up */}
            <div aria-hidden className="absolute -left-12 bottom-10 top-0 hidden w-10 lg:block">
              <span className="atrium-ruler atrium-grow-y absolute inset-y-0 right-0 w-2.5" style={d(900)} />
              {RULER.map((l, i) => (
                <span key={l} className="fade-up absolute left-0 -translate-y-1/2 font-mono text-[10px] text-fg/60" style={{ top: `${i * 25}%`, ["--d" as string]: 1500 + i * 120 }}>
                  L{l}
                </span>
              ))}
            </div>

            {/* Lift display */}
            <div className="fade-up absolute -bottom-0 left-4 md:left-6 lg:left-8" style={d(1000)}>
              <div className="flex items-end gap-5 bg-[var(--a-ink)] py-4 pl-5 pr-6 text-bg shadow-[0_28px_50px_-26px_rgb(11_19_25/0.75)]">
                <p className="sr-only">Level 14, three suites open, from 71 dollars per square metre a month.</p>
                <span aria-hidden className="flex items-end gap-1.5">
                  <span className="pb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white/55">L</span>
                  <span className="atrium-lift font-display text-[3.6rem] text-accent">
                    <span style={d(1400)}>
                      {FLOORS.map((f) => (
                        <b key={f}>{f}</b>
                      ))}
                    </span>
                  </span>
                </span>
                <span aria-hidden className="pb-1.5 font-mono text-[11px] uppercase leading-[1.5] tracking-[0.1em] text-white/70">
                  3 suites open
                  <br />
                  from $71 / m²
                </span>
              </div>
              <div aria-hidden className="atrium-grow-x h-[3px] bg-accent" style={d(1500)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
