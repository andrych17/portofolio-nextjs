import Link from "next/link";
import { street } from "@/content/fashion/street";

export function StreetFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-[1700px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-12 text-sm md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-[clamp(2rem,3.6vw,3.4rem)] uppercase leading-[0.95]">
              See you at <span className="text-accent">the next one.</span>
            </p>
            <p className="mt-6 max-w-xs leading-relaxed text-fg/70">{street.manifesto.split(". ")[0]}.</p>
          </div>
          <div className="md:col-span-3">
            <p className="street-tag text-muted">Pick-up and studio</p>
            <address className="mt-4 not-italic leading-relaxed text-fg/80">
              {street.street}
              <br />
              {street.city} {street.postalCode}, {street.country}
              <br />
              <a href={`tel:${street.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {street.phone}
              </a>
              <br />
              <a href={`mailto:${street.email}`} className="hover:text-accent">
                {street.email}
              </a>
            </address>
            <ul className="mt-4 space-y-1 text-fg/60">
              {street.hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer" className="md:col-span-2">
            <p className="street-tag text-muted">Go to</p>
            <ul className="mt-4 space-y-2">
              {street.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-fg/80 transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-2">
            <p className="street-tag text-muted">Help</p>
            <ul className="mt-4 space-y-2 text-fg/80">
              <li>Free returns, 30 days</li>
              <li>Sizing sheet on every page</li>
              <li>Ships in 48 hours</li>
            </ul>
          </div>
        </div>

        <p aria-hidden className="mt-16 select-none whitespace-nowrap text-center font-display text-[clamp(2rem,8.4vw,11rem)] uppercase leading-[0.85] text-fg/[0.08]">
          Your Brand*
        </p>

        <div className="street-tag mt-10 flex flex-wrap justify-between gap-4 text-muted">
          <span>&copy; 2026 Your Brand</span>
          <Link href="/showcase" className="-my-3 py-3 hover:text-fg">
            More templates
          </Link>
        </div>
      </div>
    </footer>
  );
}
