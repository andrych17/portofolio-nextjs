import { AtelierContactForm } from "@/components/atelier/AtelierContactForm";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { LocalTime } from "@/components/LocalTime";
import { RiseLines } from "@/components/motion/RiseLines";
import { atelier } from "@/content/atelier";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Book a studio visit with Your Brand in Amsterdam. Tell us about your bakery, shop, hotel or brand and we will reply within two working days.";

export const metadata = pageMetadata(atelier, { title: "Contact", description, path: "/agency/atelier/contact" });

export default function AtelierContact() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-28 pt-36 md:px-10 md:pb-36 md:pt-48">
      <JsonLd data={webPageSchema(atelier, { type: "ContactPage", name: "Contact", description, slug: "contact" })} />
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="fade-up" style={{ ["--d" as string]: 80 }}>
            <Eyebrow className="bg-white/60 ring-1 ring-black/[0.06]">
              <span className="size-1.5 animate-blink rounded-full bg-accent" />
              New projects from February 2027
            </Eyebrow>
          </div>
          <RiseLines
            className="mt-7 font-display text-[clamp(3.2rem,7vw,7rem)] leading-[0.92] tracking-[-0.03em]"
            lines={["Come by", <em key="e" className="text-accent">the studio.</em>]}
          />
          <p className="fade-up mt-8 max-w-md text-lg leading-relaxed text-fg/75" style={{ ["--d" as string]: 450 }} data-speakable>
            Tell us a little about what you make. If it sounds like a fit, we will suggest a few dates to visit you, or for you to visit us on the Westerstraat.
          </p>

          <dl className="fade-up mt-12 divide-y divide-line border-y border-line" style={{ ["--d" as string]: 600 }}>
            <div className="flex justify-between gap-6 py-4">
              <dt className="text-muted">Email</dt>
              <dd>
                <a href={`mailto:${atelier.email}`} className="hover:text-accent">
                  {atelier.email}
                </a>
              </dd>
            </div>
            <div className="flex justify-between gap-6 py-4">
              <dt className="text-muted">Phone</dt>
              <dd>
                <a href={`tel:${atelier.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                  {atelier.phone}
                </a>
              </dd>
            </div>
            <div className="flex justify-between gap-6 py-4">
              <dt className="text-muted">Studio</dt>
              <dd className="text-right">
                <address className="not-italic">
                  {atelier.street}, {atelier.postalCode} {atelier.city}
                </address>
              </dd>
            </div>
            <div className="flex justify-between gap-6 py-4">
              <dt className="text-muted">Open</dt>
              <dd className="text-right">
                {atelier.hours} · now <LocalTime timeZone={atelier.timeZone} />
              </dd>
            </div>
          </dl>
        </div>
        <div className="fade-up md:col-span-7" style={{ ["--d" as string]: 380 }}>
          <AtelierContactForm />
        </div>
      </div>
    </section>
  );
}
