import "./theme.css";
import { JsonLd } from "@/components/JsonLd";
import { FoundryFooter } from "@/components/property/foundry/FoundryFooter";
import { FoundryHeader } from "@/components/property/foundry/FoundryHeader";
import { foundry } from "@/content/property/foundry";
import { foundryFonts } from "@/fonts/property-foundry";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const contractor = {
  ...businessSchema({
    type: "GeneralContractor",
    path: foundry.path,
    description: foundry.description,
    email: foundry.email,
    phone: foundry.phone,
    street: foundry.street,
    city: foundry.city,
    postalCode: foundry.postalCode,
    countryCode: foundry.countryCode,
    services: foundry.capabilities.map((c) => c.title),
  }),
  foundingDate: "1994",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 640 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "17:00" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Construction services",
    itemListElement: foundry.capabilities.map((c) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: c.title, description: c.body, provider: { "@id": `${absoluteUrl(foundry.path)}#organization` } },
    })),
  },
};

export default function FoundryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-property-foundry ${foundryFonts} min-h-dvh bg-bg font-sans text-fg overflow-x-clip`}>
      <JsonLd
        data={[
          contractor,
          webPageSchema({ path: foundry.path, name: "Your Brand", description: foundry.description, sectorName: "Property & Construction", sector: "property" }),
          faqSchema(foundry.faqs),
        ]}
      />
      <FoundryHeader />
      <main id="main">{children}</main>
      <FoundryFooter />
    </div>
  );
}
