import { freight } from "@/content/logistics/freight";

export function FreightFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-16 md:px-10 md:pb-32 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl font-semibold leading-tight md:text-4xl">Tell us the lane. We will do the rest.</p>
            <a href={`mailto:${freight.email}`} className="mt-6 inline-block text-lg underline decoration-accent underline-offset-8">
              {freight.email}
            </a>
            <p className="mt-3 text-fg/70">{freight.phone}</p>
            <address className="mt-6 text-sm not-italic leading-relaxed text-muted">
              {freight.street}
              <br />
              {freight.postalCode} {freight.city}
            </address>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7 md:pl-16">
            {freight.footerLinks.map((g) => (
              <div key={g.group}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{g.group}</p>
                <ul className="mt-4 space-y-1">
                  {g.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="inline-flex min-h-11 items-center text-[15px] text-fg/85 transition-colors hover:text-accent">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <p aria-hidden className="mt-16 select-none font-display text-[clamp(4.5rem,21vw,22rem)] font-semibold leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_rgb(234_240_250_/_0.22)]">
          Your Brand
        </p>
        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-line pt-6 text-[13px] text-muted md:flex-row">
          <p>© 2026 Your Brand. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {["LinkedIn", "Instagram", "YouTube"].map((s) => (
              <li key={s}>
                <a href="#" className="hover:text-fg">
                  {s}
                </a>
              </li>
            ))}
            <li>
              <a href="#" className="hover:text-fg">
                Privacy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
