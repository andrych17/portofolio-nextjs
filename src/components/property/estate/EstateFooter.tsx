import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";
import { MaskText } from "@/components/motion/MaskText";
import { estate } from "@/content/property/estate";
import { EstateButton } from "./EstateButton";

export function EstateFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#0f2a20] text-[#f6f2ea]">
      <div className="mx-auto max-w-[1500px] px-5 pb-28 pt-24 md:px-10 md:pb-12 md:pt-32">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d6b571]">Ready when you are</p>
        <MaskText
          as="p"
          className="mt-6 font-display text-[clamp(3rem,8.4vw,8.6rem)] leading-[0.92] tracking-[-0.02em]"
          lines={["Come and see it", <em key="e" className="text-[#d6b571]">in daylight.</em>]}
        />
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Magnetic>
            <EstateButton href="#contact" size="lg">
              Book a viewing
            </EstateButton>
          </Magnetic>
          <a href={`mailto:${estate.email}`} className="text-lg underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-[#d6b571]">
            {estate.email}
          </a>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-10 border-t border-white/15 pt-10 text-sm md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d6b571]">Sales gallery</p>
            <address className="mt-4 not-italic leading-relaxed text-[#f6f2ea]/80">
              {estate.street}
              <br />
              {estate.city} {estate.postalCode}, {estate.country}
              <br />
              <a href={`tel:${estate.phone.replace(/\s/g, "")}`} className="hover:text-[#d6b571]">
                {estate.phone}
              </a>
            </address>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d6b571]">Explore</p>
            <ul className="mt-4 space-y-2">
              {estate.footerNav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[#f6f2ea]/80 transition-colors hover:text-[#d6b571]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d6b571]">Elsewhere</p>
            <ul className="mt-4 space-y-2">
              {["Instagram", "LinkedIn", "Journal"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-[#f6f2ea]/80 transition-colors hover:text-[#d6b571]">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f6f2ea]/55">
          <span>© 2026 Your Brand</span>
          <Link href="/template" className="hover:text-[#f6f2ea]">
            More templates
          </Link>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none -mb-[3vw] select-none whitespace-nowrap text-center font-display text-[17vw] leading-[0.8] text-white/[0.04]">
        Your Brand
      </p>
    </footer>
  );
}
