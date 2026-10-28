import { MaskText } from "@/components/motion/MaskText";
import { Magnetic } from "@/components/motion/Magnetic";
import { foundry } from "@/content/property/foundry";
import { FoundryButton } from "./FoundryButton";
import { FoundryMark } from "./FoundryHeader";

export function FoundryFooter() {
  const tel = foundry.phone.replace(/\s/g, "");
  return (
    <footer className="foundry-grid-dark bg-[var(--f-char)] text-bg">
      <div aria-hidden className="foundry-hazard h-3" />
      <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-20 md:px-10 md:pb-14 md:pt-28">
        <MaskText
          as="p"
          className="font-display text-[clamp(4.2rem,12vw,12rem)] leading-[0.8]"
          lines={["Send the drawings.", <span key="b" className="text-accent">Get a fixed price.</span>]}
        />
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Magnetic>
            <FoundryButton href="#quote" size="lg">
              Request a quote
            </FoundryButton>
          </Magnetic>
          <a href={`mailto:${foundry.email}`} className="min-h-11 content-center text-lg underline decoration-white/35 underline-offset-8 transition-colors hover:decoration-accent">
            {foundry.email}
          </a>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-10 border-t border-white/20 pt-10 text-sm md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <span className="flex items-center gap-3 font-display text-[2.2rem] leading-none">
              <FoundryMark className="size-8" />
              Your Brand
            </span>
            <address className="mt-5 not-italic leading-relaxed text-white/65">
              {foundry.street}
              <br />
              {foundry.city}, {foundry.postalCode}, {foundry.country}
              <br />
              <a href={`tel:${tel}`} className="inline-block py-1 hover:text-accent">
                {foundry.phone}
              </a>
            </address>
            <ul className="mt-4 space-y-1 text-white/65">
              {foundry.hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-white/45">Page</p>
            <ul className="mt-4 space-y-1">
              {foundry.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="inline-block py-1.5 text-white/80 transition-colors hover:text-accent">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#quote" className="inline-block py-1.5 text-white/80 transition-colors hover:text-accent">
                  Request a quote
                </a>
              </li>
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-white/45">Elsewhere</p>
            <ul className="mt-4 space-y-1">
              {["LinkedIn", "Instagram", "Careers"].map((s) => (
                <li key={s}>
                  <a href="#" className="inline-block py-1.5 text-white/80 transition-colors hover:text-accent">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-6 font-mono text-[11.5px] uppercase tracking-[0.14em] text-white/45">
          <span>© 2026 Your Brand</span>
          <span className="flex items-center gap-2">
            <span aria-hidden className="size-2 animate-blink bg-accent" /> Licensed, bonded and insured
          </span>
        </div>
      </div>
    </footer>
  );
}
