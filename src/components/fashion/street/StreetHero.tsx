import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { Magnetic } from "@/components/motion/Magnetic";
import { RiseLines } from "@/components/motion/RiseLines";
import { street } from "@/content/fashion/street";
import { StreetButton } from "./StreetButton";
import { StreetCountdown } from "./StreetCountdown";

const d = (ms: number) => ({ ["--d" as string]: ms });
const TAPE = ["Drop 07", "24 pieces", "No restock", "Ships in 48 hours"];

/** Poster hero: full-bleed photo, a wide headline, a live countdown and a slanted tape band. CSS only, so it plays before hydration. */
export function StreetHero() {
  return (
    <section id="top" aria-labelledby="hero" className="relative isolate overflow-x-clip">
      <div className="street-grain relative flex min-h-[calc(100svh-6.5rem)] flex-col justify-end">
        <div className="clip-in absolute inset-0 -z-10 bg-surface" style={d(0)}>
          <Image src={street.hero.src} alt={street.hero.alt} fill priority sizes="100vw" className="object-cover object-[50%_40%]" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-bg/5" />
        </div>

        <div className="mx-auto w-full max-w-[1700px] px-5 pb-28 pt-24 md:px-10 md:pb-32">
          <div className="fade-up" style={d(100)}>
            <Eyebrow className="bg-accent text-accent-fg">
              <span aria-hidden className="size-1.5 animate-blink rounded-full bg-accent-fg" />
              Drop 07 · Live now
            </Eyebrow>
          </div>
          <RiseLines
            id="hero"
            className="mt-6 font-display text-[clamp(2.4rem,12vw,12.5rem)] md:text-[clamp(4rem,10.8vw,12rem)]"
            lines={["Made for", "the long", <span key="w" className="text-accent">way home.</span>]}
          />

          <div className="mt-10 grid items-end gap-10 md:grid-cols-12">
            <div className="fade-up min-w-0 md:col-span-6 lg:col-span-5" style={d(700)}>
              <p className="max-w-md text-[1.1rem] leading-relaxed text-fg/85">
                One drop of twenty-four pieces every six weeks. Cut in three factories we visit, packed by three of us, never made again.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <StreetButton href="#shop">Shop Drop 07</StreetButton>
                </Magnetic>
                <StreetButton href="#archive" variant="line">
                  Read the archive
                </StreetButton>
              </div>
            </div>
            <StreetCountdown className="fade-up min-w-0 md:col-span-6 md:justify-self-end lg:col-span-7" />
          </div>
        </div>

        <div aria-hidden className="absolute right-6 top-8 hidden size-32 md:block lg:right-14 lg:top-12 lg:size-40">
          <svg viewBox="0 0 160 160" className="street-spin size-full">
            <defs>
              <path id="street-circle" d="M80 80 m-60 0 a60 60 0 1 1 120 0 a60 60 0 1 1 -120 0" />
            </defs>
            <circle cx="80" cy="80" r="78" fill="#d7ff1f" />
            <text fill="#0d0d0d" fontFamily="var(--font-street-mono)" fontSize="11.5" fontWeight="500">
              <textPath href="#street-circle" textLength="372" lengthAdjust="spacing">SOLD OUT IN 14 MINUTES · SOLD OUT IN 14 MINUTES ·</textPath>
            </text>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display text-3xl text-accent-fg">24</span>
        </div>
      </div>

      <div aria-hidden className="street-tape relative z-10 -mx-[6%] -mt-9 w-[112%] overflow-hidden bg-accent py-3 text-accent-fg md:-mt-12 md:py-4">
        <div className="street-run">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {[...TAPE, ...TAPE, ...TAPE].map((t, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-8 pr-8 font-display text-2xl uppercase md:text-4xl">
                  {t}
                  <span className="size-2 rotate-45 bg-accent-fg" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
