import Link from "next/link";
import { salt } from "@/content/fashion/salt";

export function SaltFooter() {
  return (
    <footer className="relative overflow-hidden bg-surface">
      <div className="mx-auto max-w-[1700px] px-5 pb-28 pt-20 md:px-10 md:pb-12 md:pt-28">
        <div className="grid gap-12 text-sm md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-[clamp(2rem,3.6vw,3.4rem)]">
              Pack light. <span className="text-accent">Stay long.</span>
            </p>
            <p className="mt-6 max-w-xs leading-relaxed text-fg/80">Linen clothing made in Portugal, mended free for as long as you own it.</p>
          </div>
          <div className="md:col-span-3">
            <p className="salt-caps text-muted">Studio</p>
            <address className="mt-4 not-italic leading-relaxed text-fg/90">
              {salt.street}
              <br />
              {salt.city} {salt.postalCode}, {salt.country}
              <br />
              <a href={`tel:${salt.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {salt.phone}
              </a>
              <br />
              <a href={`mailto:${salt.email}`} className="hover:text-accent">
                {salt.email}
              </a>
            </address>
            <ul className="mt-4 space-y-1 text-fg/75">
              {salt.hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer" className="md:col-span-2">
            <p className="salt-caps text-muted">Go to</p>
            <ul className="mt-4 space-y-2">
              {salt.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-fg/90 transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-2">
            <p className="salt-caps text-muted">Good to know</p>
            <ul className="mt-4 space-y-2 text-fg/90">
              <li>Returns within 30 days</li>
              <li>Mended free, for life</li>
              <li>Ships in three days</li>
            </ul>
          </div>
        </div>

        <div className="salt-caps mt-16 flex flex-wrap justify-between gap-4 text-muted">
          <span>&copy; 2026 Your Brand</span>
          <Link href="/showcase" className="-my-3 py-3 hover:text-fg">
            Back to Showcase →
          </Link>
        </div>
      </div>
    </footer>
  );
}
