import Image from "next/image";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { RiseLines } from "@/components/motion/RiseLines";
import { maison } from "@/content/fashion/maison";
import { MaisonButton } from "./MaisonButton";

export function MaisonHero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-x-clip">
      <div className="mx-auto grid max-w-[1700px] grid-cols-12 gap-x-6 px-5 pt-24 md:min-h-svh md:px-10 md:pt-0">
        <div className="col-span-12 flex flex-col justify-end pb-10 md:col-span-7 md:pb-16 md:pt-32">
          <p className="fade-up maison-caps flex items-center gap-4 text-muted" style={{ ["--d" as string]: 80 }}>
            <span className="maison-line block h-px w-10 bg-accent md:w-16" />
            Collection 07 &middot; Autumn Winter 2026
          </p>
          <RiseLines
            id="hero-title"
            className="mt-6 font-display text-[clamp(7.2rem,19.5vw,18rem)] font-light leading-[0.8] tracking-[-0.035em]"
            lines={["Made", "to be", <em key="k" className="pr-[0.1em] text-accent">kept.</em>]}
          />
          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[minmax(0,26rem)_auto] md:items-end md:gap-14">
            <p className="fade-up text-[17px] leading-relaxed text-fg/75" style={{ ["--d" as string]: 650 }}>
              Coats, tailoring and knitwear for the long season. Six pieces a year, cut in our own atelier and repaired for as long as you own them.
            </p>
            <div className="fade-up flex flex-wrap items-center gap-3" style={{ ["--d" as string]: 800 }}>
              <Magnetic>
                <MaisonButton href="#appointments">Book a private fitting</MaisonButton>
              </Magnetic>
              <MaisonButton href="#collection" variant="line">
                Collection 07
              </MaisonButton>
            </div>
          </div>
        </div>

        <div className="relative col-span-12 mt-2 pb-8 md:col-span-5 md:py-28">
          <div className="relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[600px]">
            <div aria-hidden className="maison-frame absolute inset-0 ring-1 ring-accent/60" />
            <div className="absolute inset-0 bg-surface">
              <ClipReveal immediate className="h-full w-full">
                <Image
                  src="/template/images/fashion/maison/hero.webp"
                  alt="Portrait of a woman in soft light, her head turned in profile, wearing deep red lipstick"
                  fill
                  priority
                  sizes="(min-width: 768px) 38vw, 100vw"
                  className="object-cover"
                />
              </ClipReveal>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute bottom-8 left-5 hidden h-14 w-px bg-fg/15 md:left-10 md:block">
        <span className="maison-cue absolute inset-0 bg-accent" />
      </div>
    </section>
  );
}

export function MaisonAnswer() {
  return (
    <section aria-label="About Your Brand" className="mx-auto max-w-[1700px] px-5 pb-20 pt-6 md:px-10 md:pb-28 md:pt-14">
      <div className="grid gap-6 md:grid-cols-12">
        <p className="maison-caps text-muted md:col-span-3">In one sentence</p>
        <p data-speakable className="font-display text-[clamp(1.55rem,2.8vw,2.9rem)] font-light leading-[1.15] md:col-span-8 md:col-start-5">
          {maison.answer}
        </p>
      </div>
    </section>
  );
}
