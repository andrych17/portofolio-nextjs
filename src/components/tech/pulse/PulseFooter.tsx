import { Heartbeat } from "./Heartbeat";
import { MaskText } from "@/components/motion/MaskText";
import { Magnetic } from "@/components/motion/Magnetic";
import { pulse } from "@/content/tech/pulse";
import { PulseMark } from "./PulseHeader";
import { PulseButton } from "./PulseButton";

export function PulseFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-[1240px] px-5 pb-28 pt-24 md:px-8 md:pb-14 md:pt-36">
        <MaskText as="p" className="font-display text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.88]" lines={["Ship it.", <span key="b" className="text-accent">Then see it.</span>]} />
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Magnetic>
            <PulseButton href="#contact" size="lg">
              Book a demo
            </PulseButton>
          </Magnetic>
          <a href={`mailto:${pulse.email}`} className="min-h-11 content-center text-lg underline decoration-fg/30 underline-offset-8 transition-colors hover:decoration-accent">
            {pulse.email}
          </a>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-10 text-sm md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <span className="flex items-center gap-2.5 font-display text-2xl leading-none">
              <PulseMark />
              Your Brand
            </span>
            <address className="mt-5 not-italic leading-relaxed text-fg/65">
              {pulse.street}
              <br />
              {pulse.city}, {pulse.postalCode}, {pulse.country}
              <br />
              <a href={`tel:${pulse.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {pulse.phone}
              </a>
            </address>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Page</p>
            <ul className="mt-4 space-y-1">
              {pulse.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="inline-block py-1.5 text-fg/75 transition-colors hover:text-accent">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Elsewhere</p>
            <ul className="mt-4 space-y-1">
              {pulse.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="inline-block py-1.5 text-fg/75 transition-colors hover:text-accent">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Heartbeat />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span>© 2026 Your Brand</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 animate-blink rounded-full bg-accent" /> All systems normal
          </span>
        </div>
      </div>
    </footer>
  );
}
