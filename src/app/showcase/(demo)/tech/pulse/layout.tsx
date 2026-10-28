import "./theme.css";
import { JsonLd } from "@/components/JsonLd";
import { PulseFooter } from "@/components/tech/pulse/PulseFooter";
import { PulseHeader } from "@/components/tech/pulse/PulseHeader";
import { pulse } from "@/content/tech/pulse";
import { pulseFonts } from "@/fonts/tech-pulse";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const app = {
  ...businessSchema({
    type: "SoftwareApplication",
    path: pulse.path,
    description: pulse.description,
    email: pulse.email,
    phone: pulse.phone,
    street: pulse.street,
    city: pulse.city,
    postalCode: pulse.postalCode,
    countryCode: pulse.countryCode,
    services: ["Product analytics", "Funnels", "Retention", "Alerts", "Feature flags"],
  }),
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  offers: pulse.plans.map((p) => ({
    "@type": "Offer",
    name: p.name,
    description: p.blurb,
    price: String(p.monthly),
    priceCurrency: "USD",
    url: absoluteUrl(`${pulse.path}#pricing`),
    availability: "https://schema.org/InStock",
  })),
};

export default function PulseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="top" className={`theme-tech-pulse ${pulseFonts} min-h-dvh bg-bg font-sans text-fg`}>
      <JsonLd
        data={[
          app,
          webPageSchema({ path: pulse.path, name: pulse.title, description: pulse.description, sectorName: "Tech & SaaS", sector: "tech" }),
          faqSchema(pulse.faqs),
        ]}
      />
      <PulseHeader />
      <main id="main">{children}</main>
      <PulseFooter />
    </div>
  );
}
