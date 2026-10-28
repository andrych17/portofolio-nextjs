import { MaskText } from "@/components/motion/MaskText";
import { Magnetic } from "@/components/motion/Magnetic";
import { grid } from "@/content/tech/grid";
import { GridButton } from "./GridButton";
import { GridMark } from "./GridHeader";

export function GridFooter() {
  const tel = grid.phone.replace(/\s/g, "");
  return (
    <footer className="border-t border-fg">
      <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-20 md:px-10 md:pb-14 md:pt-32">
        <MaskText
          as="p"
          className="font-display text-[clamp(3.2rem,10vw,9.5rem)] leading-[0.88]"
          lines={["Send the first", <span key="b" className="text-accent">event today.</span>]}
        />
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Magnetic>
            <GridButton href="#contact" size="lg">
              Get an API key
            </GridButton>
          </Magnetic>
          <a href={`mailto:${grid.email}`} className="min-h-11 content-center text-lg underline decoration-fg/30 underline-offset-8 transition-colors hover:decoration-accent">
            {grid.email}
          </a>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-10 border-t border-line pt-10 text-sm md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <span className="flex items-center gap-3 text-2xl font-bold leading-none tracking-tight">
              <GridMark className="size-7" />
              Your Brand
            </span>
            <address className="mt-5 not-italic leading-relaxed text-fg/65">
              {grid.street}
              <br />
              {grid.city}, {grid.postalCode}, {grid.country}
              <br />
              <a href={`tel:${tel}`} className="inline-block py-1 hover:text-accent">
                {grid.phone}
              </a>
              <br />
              {grid.hours}
            </address>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="mono text-muted">Page</p>
            <ul className="mt-4 space-y-1">
              {grid.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="inline-block py-1.5 text-fg/75 transition-colors hover:text-accent">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="mono text-muted">Elsewhere</p>
            <ul className="mt-4 space-y-1">
              {grid.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="inline-block py-1.5 text-fg/75 transition-colors hover:text-accent">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mono mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-muted">
          <span>© 2026 Your Brand</span>
          <span className="flex items-center gap-2">
            <span className="grid-cursor size-1.5 bg-accent" aria-hidden /> All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
