import Link from "next/link";
import { ember } from "@/content/food/ember";

export function EmberFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-[1500px] px-5 pb-28 pt-20 md:px-10 md:pb-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-[clamp(2.6rem,5vw,4.6rem)] italic leading-[0.95]">
              Come hungry.
              <br />
              <span className="text-accent">Stay for the embers.</span>
            </p>
          </div>
          <address className="not-italic md:col-span-3 md:col-start-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Find us</p>
            <p className="mt-4 leading-relaxed text-fg/80">
              {ember.street}
              <br />
              {ember.city} {ember.postalCode}
            </p>
            <div className="mt-2 flex flex-col text-fg/80">
              <a href={`tel:${ember.phone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center transition-colors hover:text-accent">
                {ember.phone}
              </a>
              <a href={`mailto:${ember.email}`} className="inline-flex min-h-11 items-center transition-colors hover:text-accent">
                {ember.email}
              </a>
            </div>
          </address>
          <nav aria-label="Footer" className="md:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">On this page</p>
            <ul className="mt-4 space-y-1">
              {ember.footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="inline-flex min-h-11 items-center text-fg/80 transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Elsewhere</p>
            <ul className="mt-4 space-y-1">
              {["Instagram", "Facebook", "Newsletter"].map((label) => (
                <li key={label}>
                  <a href="#" className="inline-flex min-h-11 items-center text-fg/80 transition-colors hover:text-accent">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-muted">
          <span>© 2026 Your Brand</span>
          <Link href="/showcase" className="inline-flex min-h-11 items-center hover:text-fg">
            More templates
          </Link>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none -mb-[4vw] select-none text-center font-display text-[24vw] italic leading-[0.75] text-accent/[0.07]">
        Your Brand
      </p>
    </footer>
  );
}
