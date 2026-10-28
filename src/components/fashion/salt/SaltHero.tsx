import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { Magnetic } from "@/components/motion/Magnetic";
import { RiseLines } from "@/components/motion/RiseLines";
import { salt } from "@/content/fashion/salt";
import { SaltButton } from "./SaltButton";
import { ShadeDots } from "./SaltShade";

const d = (ms: number) => ({ ["--d" as string]: ms });

/** Hero: a big serif line beside an arched photo, with a turning sun badge and the shade swatches. CSS only, so it plays before hydration. */
export function SaltHero() {
  return (
    <section id="top" aria-labelledby="hero" className="relative overflow-x-clip">
      <div className="mx-auto grid max-w-[1700px] items-center gap-12 px-5 pb-20 pt-10 md:px-10 md:pb-28 md:pt-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="fade-up" style={d(60)}>
            <Eyebrow className="bg-[var(--l-paper)] text-[var(--l-ink)]">
              <span aria-hidden className="size-1.5 rounded-full bg-[#cc3a16]" />
              Summer 07 · Linen made in Portugal
            </Eyebrow>
          </div>
          <RiseLines
            id="hero"
            className="mt-7 font-display text-[clamp(3.5rem,9.6vw,10.4rem)]"
            lines={["Dressed for", "the long", <span key="l">lunch<span className="text-accent">.</span></span>]}
          />
          <p className="fade-up mt-9 max-w-md text-[1.15rem] leading-relaxed text-fg/90" style={d(640)}>
            Shirts, dresses and trousers in heavy European linen, cut to fit one carry-on and sold in four colours a season. Mended free for as long as you own them.
          </p>
          <div className="fade-up mt-9 flex flex-wrap items-center gap-4" style={d(760)}>
            <Magnetic>
              <SaltButton href="#pieces" variant="paper">
                Shop the season
              </SaltButton>
            </Magnetic>
            <SaltButton href="#packing" variant="line">
              Plan a bag
            </SaltButton>
          </div>
          <div className="fade-up mt-12 flex items-center gap-4" style={d(900)}>
            <p className="salt-caps text-muted">Paint this page</p>
            <ShadeDots />
          </div>
        </div>

        <div className="fade-up relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none" style={d(200)}>
          <div className="salt-arch clip-in relative aspect-[4/5.2] overflow-hidden bg-surface" style={d(260)}>
            <Image src={salt.hero.src} alt={salt.hero.alt} fill priority sizes="(min-width: 1024px) 38vw, 90vw" className="object-cover" />
          </div>
          <div aria-hidden className="absolute -left-3 bottom-14 size-28 md:-left-10 md:size-36">
            <svg viewBox="0 0 160 160" className="salt-turn size-full">
              <defs>
                <path id="salt-circle" d="M80 80 m-58 0 a58 58 0 1 1 116 0 a58 58 0 1 1 -116 0" />
              </defs>
              <circle cx="80" cy="80" r="78" fill="#fff4e4" />
              <text fill="#2a1a12" fontFamily="var(--font-salt-sans)" fontSize="13" fontWeight="700" letterSpacing="3">
                <textPath href="#salt-circle" textLength="360" lengthAdjust="spacing">LINEN · SALT · SUN · LINEN · SALT · SUN ·</textPath>
              </text>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display text-3xl text-[#cc3a16]">07</span>
          </div>
          <p className="salt-caps mt-4 text-muted">Cover, Summer 07 · two people, one boat, no plan</p>
        </div>
      </div>
    </section>
  );
}
