import "./theme.css";
import { JsonLd } from "@/components/JsonLd";
import { AtriumFooter } from "@/components/property/atrium/AtriumFooter";
import { AtriumGauge } from "@/components/property/atrium/AtriumGauge";
import { AtriumHeader } from "@/components/property/atrium/AtriumHeader";
import { atrium } from "@/content/property/atrium";
import { atriumFonts } from "@/fonts/property-atrium";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const agent = {
  ...businessSchema({
    type: "RealEstateAgent",
    path: atrium.path,
    description: atrium.description,
    email: atrium.email,
    phone: atrium.phone,
    street: atrium.street,
    city: atrium.city,
    postalCode: atrium.postalCode,
    countryCode: atrium.countryCode,
    services: atrium.viewing.types,
  }),
  foundingDate: "2006",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Offices, studios and shops to lease",
    itemListElement: atrium.viewing.types.map((name) => ({
      "@type": "Offer",
      businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
      itemOffered: { "@type": "Service", name, provider: { "@id": `${absoluteUrl(atrium.path)}#organization` } },
    })),
  },
};

export default function AtriumLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-property-atrium ${atriumFonts} min-h-dvh bg-bg font-sans text-fg`}>
      <JsonLd
        data={[
          agent,
          webPageSchema({ path: atrium.path, name: "Your Brand", description: atrium.description, sectorName: "Property & Construction", sector: "property" }),
          faqSchema(atrium.faqs),
        ]}
      />
      <AtriumHeader />
      <AtriumGauge />
      <main id="main">{children}</main>
      <AtriumFooter />
    </div>
  );
}
