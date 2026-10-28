import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { LocalTime } from "@/components/LocalTime";
import { RiseLines } from "@/components/motion/RiseLines";
import { NoirContactForm } from "@/components/noir/NoirContactForm";
import { noir } from "@/content/noir";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Start a project with Your Brand. Tell us about your brand, website or product and we will reply within one working day. Studio in Lisbon, clients worldwide.";

export const metadata = pageMetadata(noir, { title: "Contact", description, path: "/agency/noir/contact" });

export default function NoirContact() {
  return (
    <>
      <JsonLd data={webPageSchema(noir, { type: "ContactPage", name: "Contact", description, slug: "contact" })} />
      <section className="mx-auto max-w-[1600px] px-5 pb-28 pt-40 md:px-10 md:pb-40 md:pt-52">
        <div className="fade-up" style={{ ["--d" as string]: 80 }}>
          <Eyebrow className="bg-fg/[0.05] text-fg ring-1 ring-fg/10">
            <span className="size-1.5 animate-blink rounded-full bg-accent" />
            Booking projects for early 2027
          </Eyebrow>
        </div>
        <RiseLines
          className="mt-8 font-display text-[clamp(3.3rem,10vw,10.5rem)] leading-[0.86] tracking-[-0.02em]"
          lines={["Tell us", <em key="e" className="text-accent">about it.</em>]}
        />

        <div className="mt-20 grid gap-16 md:grid-cols-12">
          <div className="fade-up md:col-span-7" style={{ ["--d" as string]: 400 }}>
            <NoirContactForm />
          </div>
          <aside className="fade-up space-y-10 md:col-span-4 md:col-start-9" style={{ ["--d" as string]: 550 }}>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Email</p>
              <a href={`mailto:${noir.email}`} className="mt-2 block font-display text-3xl transition-colors hover:text-accent md:text-4xl">
                {noir.email}
              </a>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Phone</p>
              <a href={`tel:${noir.phone.replace(/\s/g, "")}`} className="mt-2 block text-xl hover:text-accent">
                {noir.phone}
              </a>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Studio</p>
              <address className="mt-2 not-italic leading-relaxed text-fg/80">
                {noir.street}
                <br />
                {noir.postalCode} {noir.city}, {noir.country}
              </address>
              <p className="mt-2 text-sm text-fg/60">
                {noir.hours}. Local time <LocalTime timeZone={noir.timeZone} className="text-fg" />.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-surface p-1.5 ring-1 ring-fg/[0.08]">
              <div className="rounded-[calc(1.5rem-0.375rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                <p className="text-fg/80" data-speakable>
                  We reply to every message within one working day. If it is a fit, the next step is a 30-minute call, then a fixed quote within a week.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
