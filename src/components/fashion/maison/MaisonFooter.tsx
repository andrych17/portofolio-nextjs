import { maison } from "@/content/fashion/maison";
import Link from "next/link";

export function MaisonFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-[1700px] px-5 pb-28 pt-20 md:px-10 md:pb-14 md:pt-28">
        <div className="grid gap-12 text-sm md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-[clamp(2.4rem,4vw,4rem)] font-light italic leading-none">
              Clothes for a <span className="text-accent">long life.</span>
            </p>
            <p className="mt-6 max-w-xs leading-relaxed text-fg/70">Coats, tailoring and knitwear, cut in Paris and repaired for as long as you own them.</p>
          </div>
          <div className="md:col-span-3">
            <p className="maison-caps text-muted">Visit</p>
            <address className="mt-4 not-italic leading-relaxed text-fg/80">
              {maison.street}
              <br />
              {maison.postalCode} {maison.city}, {maison.country}
              <br />
              <a href={`tel:${maison.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {maison.phone}
              </a>
              <br />
              <a href={`mailto:${maison.email}`} className="hover:text-accent">
                {maison.email}
              </a>
            </address>
          </div>
          <nav aria-label="Footer" className="md:col-span-2">
            <p className="maison-caps text-muted">The house</p>
            <ul className="mt-4 space-y-2">
              {maison.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-fg/80 transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-2">
            <p className="maison-caps text-muted">Elsewhere</p>
            <ul className="mt-4 space-y-2">
              {maison.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-fg/80 transition-colors hover:text-accent">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p aria-hidden className="mt-16 select-none whitespace-nowrap text-center font-display text-[clamp(2.6rem,11vw,14rem)] font-light uppercase leading-[0.85] tracking-[0.06em] text-fg/[0.07]">
          Your Brand
        </p>

        <div className="maison-caps mt-10 flex flex-wrap justify-between gap-4 text-muted">
          <span>&copy; 2026 Your Brand</span>
          <Link href="/showcase" className="-my-3 py-3 hover:text-fg">
            Back to Showcase →
          </Link>
        </div>
      </div>
    </footer>
  );
}
