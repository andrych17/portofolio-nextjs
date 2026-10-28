import Link from "next/link";
import { orbit } from "@/content/tech/orbit";

export function OrbitFooter() {
  return (
    <footer className="border-t border-orbit-border bg-orbit-bg text-orbit-fg relative z-10 pb-28 md:pb-12 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-orbit-accent shadow-[0_0_14px_var(--color-orbit-accent)]" />
              <span className="font-heading font-extrabold tracking-tight text-xl text-orbit-fg">
                {orbit.name}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-orbit-surface border border-orbit-border text-orbit-muted">
                Enterprise Cloud
              </span>
            </div>
            <p className="text-orbit-muted text-sm max-w-md font-sans leading-relaxed">
              {orbit.description}
            </p>
            <div className="pt-2 text-xs font-mono text-orbit-muted space-y-1">
              <p>{orbit.street}</p>
              <p>{orbit.city}, {orbit.postalCode} • {orbit.countryCode}</p>
              <p>NOC Operations: 24/7 Anycast Monitoring</p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-bold uppercase text-xs tracking-widest text-orbit-accent mb-4">
              Platform Architecture
            </h4>
            <ul className="space-y-2.5 text-sm text-orbit-muted">
              {orbit.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-orbit-fg transition-colors duration-150 inline-block font-sans"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct contact & compliance */}
          <div>
            <h4 className="font-heading font-bold uppercase text-xs tracking-widest text-orbit-accent mb-4">
              Infrastructure NOC
            </h4>
            <div className="space-y-3 text-sm text-orbit-muted font-mono">
              <div>
                <span className="text-[10px] uppercase text-orbit-muted/60 block">Direct Line</span>
                <a
                  href={`tel:${orbit.phone}`}
                  className="hover:text-orbit-accent transition-colors duration-150 text-orbit-fg font-bold"
                >
                  {orbit.phone}
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase text-orbit-muted/60 block">NOC Dispatch</span>
                <a
                  href={`mailto:${orbit.email}`}
                  className="hover:text-orbit-accent transition-colors duration-150 text-orbit-fg underline underline-offset-4"
                >
                  {orbit.email}
                </a>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-orbit-surface border border-orbit-border text-xs text-orbit-emerald font-sans">
                  <span className="w-2 h-2 rounded-full bg-orbit-emerald animate-pulse" />
                  NVLink Mesh Active: 100%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-orbit-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-orbit-muted">
          <p>© 2026 {orbit.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>SOC2 Type II</span>
            <span>•</span>
            <span>HIPAA BAA Available</span>
            <span>•</span>
            <Link href="/template" className="hover:text-orbit-fg transition-colors">
              Gallery Home
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
