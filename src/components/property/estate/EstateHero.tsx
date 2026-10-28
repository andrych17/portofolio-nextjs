import { BathtubIcon, BedIcon, RulerIcon } from "@phosphor-icons/react/ssr";
import { Eyebrow } from "@/components/Eyebrow";
import { Magnetic } from "@/components/motion/Magnetic";
import { RiseLines } from "@/components/motion/RiseLines";
import { Tilt } from "@/components/motion/Tilt";
import { listings, priceFormat } from "@/content/property/estate";
import { EstateButton } from "./EstateButton";
import { EstateHeroMedia } from "./EstateHeroMedia";

const featured = listings[0];

export function EstateHero() {
  return (
    <section aria-labelledby="hero" className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden text-[#f6f2ea]">
      <EstateHeroMedia src={featured.image} alt={featured.alt} />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] gap-10 px-5 pb-10 pt-36 md:px-10 md:pb-16 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <div className="fade-up flex items-center gap-4" style={{ ["--d" as string]: 80 }}>
            <Eyebrow className="bg-white/10 text-[#f6f2ea] ring-1 ring-white/25 backdrop-blur">Developer and sales agent</Eyebrow>
            <span aria-hidden className="estate-line hidden h-px w-24 bg-[#d6b571] sm:block" style={{ ["--d" as string]: 700 }} />
          </div>
          <RiseLines
            id="hero"
            className="mt-7 font-display text-[clamp(3.6rem,10.5vw,10.5rem)] leading-[0.88] tracking-[-0.025em]"
            lines={[
              "Homes made",
              <>
                to be <em className="text-[#d6b571]">kept.</em>
              </>,
            ]}
          />
          <div className="fade-up mt-10 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: 650 }}>
            <Magnetic>
              <EstateButton href="#collection" size="lg">
                Browse the collection
              </EstateButton>
            </Magnetic>
            <EstateButton href="#tour" tone="glass" size="lg">
              Take the virtual tour
            </EstateButton>
          </div>
        </div>

        <div className="fade-up max-w-md lg:col-span-4 lg:max-w-none" style={{ ["--d" as string]: 800 }}>
          <Tilt max={4}>
            <div className="rounded-[2rem] bg-white/10 p-1.5 ring-1 ring-white/25 backdrop-blur-xl">
              <div className="rounded-[calc(2rem-0.375rem)] bg-[#0f2a20]/65 p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.14)] ring-1 ring-inset ring-white/10">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d6b571]">
                  <span className="size-1.5 animate-blink rounded-full bg-[#d6b571]" />
                  Featured listing
                </p>
                <p className="mt-4 font-display text-[2.3rem] leading-none">{featured.name}</p>
                <p className="mt-2 text-sm text-[#f6f2ea]/70">
                  {featured.type} in {featured.area}
                </p>
                <p className="mt-6 font-display text-[clamp(2.8rem,4.2vw,3.8rem)] leading-none text-[#d6b571]">{priceFormat.format(featured.price)}</p>
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-4 text-[13px] text-[#f6f2ea]/85">
                  <li className="flex items-center gap-2">
                    <BedIcon size={18} aria-hidden /> {featured.beds} beds
                  </li>
                  <li className="flex items-center gap-2">
                    <BathtubIcon size={18} aria-hidden /> {featured.baths} baths
                  </li>
                  <li className="flex items-center gap-2">
                    <RulerIcon size={18} aria-hidden /> {featured.size} m²
                  </li>
                </ul>
                <div className="mt-6">
                  <EstateButton href="#contact" size="md">
                    Book a private viewing
                  </EstateButton>
                </div>
              </div>
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
}
