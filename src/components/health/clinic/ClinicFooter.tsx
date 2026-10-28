import { PhoneCallIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { clinic } from "@/content/health/clinic";

const tel = clinic.phone.replace(/\s/g, "");

export function ClinicFooter() {
  return (
    <footer className="relative mx-2 mt-2 overflow-hidden rounded-t-[2.5rem] bg-fg text-bg md:mx-4">
      <div className="mx-auto max-w-[1400px] px-5 pb-32 pt-20 md:px-10 md:pb-16 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.94]">
              Care that fits
              <br />
              <span className="text-accent">around your day.</span>
            </p>
            <a
              href={`tel:${tel}`}
              className="mt-10 inline-flex min-h-14 items-center gap-3 rounded-full bg-accent px-6 text-lg font-bold text-fg transition-transform duration-500 ease-studio hover:scale-[1.03]"
            >
              <PhoneCallIcon size={22} weight="bold" aria-hidden />
              {clinic.phone}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm md:col-span-6 md:grid-cols-3">
            <div className="col-span-2 md:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bg/50">Find us</p>
              <address className="mt-4 not-italic leading-relaxed text-bg/85">
                {clinic.street}
                <br />
                {clinic.postalCode} {clinic.city}, {clinic.country}
                <br />
                <a href={`mailto:${clinic.email}`} className="underline-offset-4 hover:underline">
                  {clinic.email}
                </a>
              </address>
            </div>
            <nav aria-label="Footer">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bg/50">Explore</p>
              <ul className="mt-4 space-y-2.5">
                {clinic.nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-bg/85 transition-colors hover:text-accent">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bg/50">Follow</p>
              <ul className="mt-4 space-y-2.5">
                {clinic.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="text-bg/85 transition-colors hover:text-accent">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 border-t border-white/10 pt-8 text-[13px] leading-relaxed text-bg/60 md:grid-cols-12">
          <p className="md:col-span-7">
            This is a website template with sample content. It does not give medical advice. If you think someone&apos;s life is in
            danger, call your local emergency number first.
          </p>
          <p className="md:col-span-5 md:text-right">
            © 2026 Your Brand · <Link href="/template" className="underline-offset-4 hover:underline">More templates</Link>
          </p>
        </div>
      </div>
      <p
        aria-hidden
        className="pointer-events-none -mb-[2.5vw] select-none whitespace-nowrap text-center font-display text-[17.5vw] leading-[0.8] text-white/[0.04]"
      >
        Your Brand
      </p>
    </footer>
  );
}
