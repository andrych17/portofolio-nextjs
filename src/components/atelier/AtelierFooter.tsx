import Link from "next/link";
import { LocalTime } from "@/components/LocalTime";
import { MaskText } from "@/components/motion/MaskText";
import { atelier } from "@/content/atelier";
import { pagePath, pages } from "@/content/types";
import { AtelierButton } from "./AtelierButton";

export function AtelierFooter() {
  return (
    <footer className="px-3 pb-3 md:px-6 md:pb-6">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[2.5rem] bg-accent text-accent-fg">
        <div className="grid gap-12 px-6 pb-10 pt-20 md:grid-cols-12 md:px-14 md:pt-28">
          <div className="md:col-span-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent-fg/60">New projects from February 2027</p>
            <MaskText
              as="p"
              className="mt-6 font-display text-[clamp(2.8rem,7vw,7rem)] leading-[0.95] tracking-[-0.02em]"
              lines={["Have something", <em key="e">in the oven?</em>]}
            />
            <div className="mt-10 flex flex-wrap gap-3">
              <AtelierButton href="/showcase/agency/atelier/contact" variant="light">
                Book a studio visit
              </AtelierButton>
              <a href={`mailto:${atelier.email}`} className="inline-flex items-center rounded-full px-6 py-3 text-[15px] ring-1 ring-accent-fg/25 transition-colors hover:bg-accent-fg/10">
                {atelier.email}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm md:col-span-4 md:mt-auto">
            <nav aria-label="Footer">
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent-fg/60">Studio</p>
              <ul className="mt-3 space-y-1.5">
                {pages.map((page) => (
                  <li key={page.slug}>
                    <Link href={pagePath("atelier", page.slug)} className="text-accent-fg/85 hover:text-accent-fg hover:underline">
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent-fg/60">Follow</p>
              <ul className="mt-3 space-y-1.5">
                {atelier.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-accent-fg/85 hover:text-accent-fg hover:underline">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <address className="col-span-2 not-italic leading-relaxed text-accent-fg/85">
              {atelier.street}, {atelier.postalCode} {atelier.city}
              <br />
              {atelier.hours} · <LocalTime timeZone={atelier.timeZone} /> here now
            </address>
          </div>
        </div>
        <p aria-hidden className="select-none whitespace-nowrap px-4 text-center font-display text-[17vw] italic leading-[0.9] text-accent-fg/10 md:text-[15vw]">
          Your Brand
        </p>
        <div className="flex flex-wrap justify-between gap-3 px-6 pb-6 text-xs text-accent-fg/60 md:px-14">
          <span>© 2026 Your Brand B.V.</span>
          <Link href="/showcase" className="hover:text-accent-fg">
            Back to Showcase →
          </Link>
        </div>
      </div>
    </footer>
  );
}
