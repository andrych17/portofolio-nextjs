import Link from "next/link";
import { forge } from "@/content/logistics/forge";

export function ForgeFooter() {
  return (
    <footer className="border-t border-forge-border bg-forge-bg text-forge-text relative z-10 pb-28 md:pb-12 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 bg-forge-accent rounded-sm shadow-[0_0_12px_var(--color-forge-accent)]" />
              <span className="font-heading font-black tracking-wider uppercase text-xl text-forge-accent">
                {forge.name}
              </span>
            </div>
            <p className="text-forge-muted text-sm max-w-md font-sans leading-relaxed">
              {forge.description}
            </p>
            <div className="pt-2 text-xs font-mono text-forge-muted space-y-1">
              <p>{forge.street}</p>
              <p>{forge.city}, {forge.postalCode} • {forge.countryCode}</p>
              <p>Engineering Command: 24/7 Hotline</p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-bold uppercase text-xs tracking-widest text-forge-accent mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-forge-muted">
              {forge.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-forge-accent transition-colors duration-150 inline-block font-sans"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct contact */}
          <div>
            <h4 className="font-heading font-bold uppercase text-xs tracking-widest text-forge-accent mb-4">
              Heavy Lift Desk
            </h4>
            <div className="space-y-3 text-sm text-forge-muted font-mono">
              <div>
                <span className="text-[10px] uppercase text-forge-muted/60 block">Direct Line</span>
                <a
                  href={`tel:${forge.phone}`}
                  className="hover:text-forge-accent transition-colors duration-150 text-forge-text font-bold"
                >
                  {forge.phone}
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase text-forge-muted/60 block">Engineering Inquiries</span>
                <a
                  href={`mailto:${forge.email}`}
                  className="hover:text-forge-accent transition-colors duration-150 text-forge-text underline underline-offset-4"
                >
                  {forge.email}
                </a>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-forge-surface border border-forge-border text-xs text-forge-accent font-sans">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Terminal Berth Open
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-forge-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-forge-muted">
          <p>© 2026 {forge.name}. All rights reserved.</p>
          <p className="text-forge-muted/70">Engineered Heavy Transport & Rigging Operations</p>
        </div>
      </div>
    </footer>
  );
}
