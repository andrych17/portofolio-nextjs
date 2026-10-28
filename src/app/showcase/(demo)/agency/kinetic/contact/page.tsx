import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { LocalTime } from "@/components/LocalTime";
import { BouncyText } from "@/components/kinetic/BouncyText";
import { KineticContactForm } from "@/components/kinetic/KineticContactForm";
import { kinetic } from "@/content/kinetic";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Start a brand, website or campaign with Your Brand in Melbourne. Send a few lines about your brand and we will reply within one working day.";

export const metadata = pageMetadata(kinetic, { title: "Contact", description, path: "/agency/kinetic/contact" });

export default function KineticContact() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-32 md:px-10 md:pb-36 md:pt-44">
      <JsonLd data={webPageSchema(kinetic, { type: "ContactPage", name: "Contact", description, slug: "contact" })} />
      <div className="fade-up" style={{ ["--d" as string]: 60 }}>
        <Eyebrow className="border-2 border-k-ink bg-white font-bold">
          <span className="size-2 animate-blink rounded-full bg-accent" />
          Taking new projects for 2027
        </Eyebrow>
      </div>
      <h1 className="mt-6 font-display text-[clamp(3.4rem,12vw,12rem)] font-black uppercase leading-[0.84] tracking-tight">
        <span className="sr-only">Say hey</span>
        <BouncyText lines={[["Say", <span key="h" className="text-accent">hey.</span>]]} />
      </h1>

      <div className="mt-12 grid gap-10 md:grid-cols-12">
        <div className="fade-up min-w-0 md:col-span-8" style={{ ["--d" as string]: 400 }}>
          <KineticContactForm />
        </div>
        <aside className="fade-up min-w-0 space-y-4 md:col-span-4" style={{ ["--d" as string]: 550 }}>
          <a href={`mailto:${kinetic.email}`} className="k-shadow block rounded-[1.5rem] border-2 border-k-ink bg-k-yellow p-6">
            <span className="font-display text-xs font-extrabold uppercase">Email</span>
            <span className="mt-1 block font-display text-xl font-black [overflow-wrap:anywhere]">{kinetic.email}</span>
          </a>
          <a href={`tel:${kinetic.phone.replace(/\s/g, "")}`} className="k-shadow block rounded-[1.5rem] border-2 border-k-ink bg-k-pink p-6">
            <span className="font-display text-xs font-extrabold uppercase">Phone</span>
            <span className="mt-1 block font-display text-xl font-black">{kinetic.phone}</span>
          </a>
          <div className="rounded-[1.5rem] border-2 border-k-ink bg-k-lime p-6 shadow-[5px_5px_0_0_#121212]">
            <span className="font-display text-xs font-extrabold uppercase">Studio</span>
            <address className="mt-1 not-italic text-lg font-medium leading-snug">
              {kinetic.street}
              <br />
              {kinetic.city} {kinetic.postalCode}, {kinetic.country}
            </address>
            <p className="mt-3 text-sm font-medium">
              {kinetic.hours}. It is <LocalTime timeZone={kinetic.timeZone} className="font-bold" /> in Melbourne.
            </p>
          </div>
          <p className="px-2 text-sm font-medium text-muted" data-speakable>
            We reply within one working day. If it is a fit, next is a 30-minute call and a fixed quote within a week.
          </p>
        </aside>
      </div>
    </section>
  );
}
