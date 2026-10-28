import Link from "next/link";
import { LocalTime } from "@/components/LocalTime";
import { Magnetic } from "@/components/motion/Magnetic";
import { MaskText } from "@/components/motion/MaskText";
import { noir } from "@/content/noir";
import { pagePath, pages } from "@/content/types";
import { NoirButton } from "./NoirButton";

export function NoirFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-24 md:px-10 md:pt-36">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Have a project in mind?</p>
        <MaskText
          as="p"
          className="mt-6 font-display text-[clamp(3rem,9vw,9.5rem)] leading-[0.9] tracking-[-0.02em]"
          lines={["Let's make something", <em key="e" className="text-accent">worth remembering.</em>]}
        />
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Magnetic>
            <NoirButton href="/template/agency/noir/contact" size="lg">
              Start a project
            </NoirButton>
          </Magnetic>
          <a href={`mailto:${noir.email}`} className="group relative text-lg">
            {noir.email}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-studio group-hover:scale-x-0 group-hover:origin-right" />
          </a>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-10 text-sm md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Studio</p>
            <address className="mt-4 not-italic leading-relaxed text-fg/80">
              {noir.street}
              <br />
              {noir.postalCode} {noir.city}, {noir.country}
              <br />
              <a href={`tel:${noir.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {noir.phone}
              </a>
            </address>
            <p className="mt-4 text-fg/60">
              It is <LocalTime timeZone={noir.timeZone} className="text-fg" /> in {noir.city} right now.
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Pages</p>
            <ul className="mt-4 space-y-2">
              {pages.map((page) => (
                <li key={page.slug}>
                  <Link href={pagePath("noir", page.slug)} className="text-fg/80 transition-colors hover:text-accent">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Elsewhere</p>
            <ul className="mt-4 space-y-2">
              {noir.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="text-fg/80 transition-colors hover:text-accent">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span>© 2026 {noir.name}</span>
          <Link href="/template" className="hover:text-fg">
            More templates
          </Link>
        </div>
      </div>
      <p
        aria-hidden
        className="pointer-events-none -mb-[3vw] select-none whitespace-nowrap text-center font-display text-[18vw] leading-[0.8] text-fg/[0.04]"
      >
        Your Brand
      </p>
    </footer>
  );
}
