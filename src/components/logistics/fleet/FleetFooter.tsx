import Link from "next/link";
import { fleet } from "@/content/logistics/fleet";

export function FleetFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      <div className="mx-auto max-w-[1500px] px-5 pt-20 pb-28 md:px-10 md:pt-28 md:pb-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="font-display text-3xl font-semibold tracking-tight text-fg">Your Brand</span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Asset-owned motor carrier fleet delivering dedicated dry van and pharmaceutical cold-chain transportation with zero brokerage hand-offs.
            </p>
            <p className="mt-6 text-xs text-muted">
              880 Freightway Boulevard, Metro Logistics Park · 24/7 Satellite Dispatch
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Corridors &amp; Fleet</p>
            <ul className="mt-4 space-y-2 text-sm">
              {fleet.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-fg/80 transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Carrier Inquiries</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={`mailto:${fleet.email}`} className="text-fg/80 transition-colors hover:text-accent">
                  {fleet.email}
                </a>
              </li>
              <li>
                <a href={`tel:${fleet.phone}`} className="text-fg/80 transition-colors hover:text-accent">
                  {fleet.phone}
                </a>
              </li>
              <li>
                <a href="#" className="text-fg/80 transition-colors hover:text-accent">
                  Driver Recruiting (CDL-A)
                </a>
              </li>
              <li>
                <a href="#" className="text-fg/80 transition-colors hover:text-accent">
                  Shipper EDI Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-6 text-xs text-muted">
          <p>© 2026 Your Brand. All rights reserved.</p>
          <Link href="/showcase" className="hover:text-fg">
            Back to Showcase →
          </Link>
        </div>
      </div>
    </footer>
  );
}
