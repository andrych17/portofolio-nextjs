import { Magnetic } from "@/components/motion/Magnetic";
import { MaskText } from "@/components/motion/MaskText";
import { atrium } from "@/content/property/atrium";
import { AtriumButton } from "./AtriumButton";
import { AtriumMark } from "./AtriumHeader";

export function AtriumFooter() {
  const tel = atrium.phone.replace(/\s/g, "");
  return (
    <footer className="atrium-cols-dark border-t border-white/15 bg-[var(--a-ink)] text-bg">
      <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-24 md:px-10 md:pb-14 md:pt-32">
        <MaskText
          as="p"
          className="font-display text-[clamp(2.8rem,8.4vw,8.6rem)] leading-[0.92]"
          lines={["See the floor", <b key="b">before you decide.</b>]}
        />
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Magnetic>
            <AtriumButton href="#viewing" size="lg">
              Book a viewing
            </AtriumButton>
          </Magnetic>
          <a href={`mailto:${atrium.email}`} className="atrium-hover-line min-h-11 content-center pb-1 text-lg">
            {atrium.email}
          </a>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-10 border-t border-white/20 pt-10 text-sm md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <span className="flex items-center gap-3 font-display text-[1.9rem] font-medium leading-none tracking-[-0.03em]">
              <AtriumMark className="size-8" />
              Your Brand
            </span>
            <address className="mt-5 not-italic leading-relaxed text-white/65">
              {atrium.street}
              <br />
              {atrium.city}, {atrium.postalCode}, {atrium.country}
              <br />
              <a href={`tel:${tel}`} className="inline-block py-1 hover:text-accent">
                {atrium.phone}
              </a>
            </address>
            <ul className="mt-4 space-y-1 text-white/65">
              {atrium.hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-white/45">Page</p>
            <ul className="mt-4 space-y-1">
              {atrium.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="inline-block py-1.5 text-white/80 transition-colors hover:text-accent">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#viewing" className="inline-block py-1.5 text-white/80 transition-colors hover:text-accent">
                  Book a viewing
                </a>
              </li>
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-white/45">Elsewhere</p>
            <ul className="mt-4 space-y-1">
              {["LinkedIn", "Instagram", "Tenant portal"].map((s) => (
                <li key={s}>
                  <a href="#" className="inline-block py-1.5 text-white/80 transition-colors hover:text-accent">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-6 font-mono text-[11.5px] uppercase tracking-[0.12em] text-white/45">
          <span>© 2026 Your Brand</span>
          <span className="flex items-center gap-2">
            <span aria-hidden className="size-2 animate-blink bg-accent" /> Ground floor, open to the street
          </span>
        </div>
      </div>
    </footer>
  );
}
