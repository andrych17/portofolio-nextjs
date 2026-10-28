import { JsonLd } from "@/components/JsonLd";
import { FleetCapabilities } from "@/components/logistics/fleet/FleetCapabilities";
import { FleetContactForm } from "@/components/logistics/fleet/FleetContactForm";
import { FleetFaq } from "@/components/logistics/fleet/FleetFaq";
import { FleetHero } from "@/components/logistics/fleet/FleetHero";
import { FleetHubs } from "@/components/logistics/fleet/FleetHubs";
import { FleetStrip } from "@/components/logistics/fleet/FleetStrip";
import { FleetTelematics } from "@/components/logistics/fleet/FleetTelematics";
import { FleetTransitCalculator } from "@/components/logistics/fleet/FleetTransitCalculator";
import { fleet } from "@/content/logistics/fleet";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { templateMetadata } from "@/lib/seo";

export const metadata = templateMetadata({
  sector: "logistics",
  slug: "fleet",
  title: fleet.title,
  description: fleet.description,
});

const serviceList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Highway Motor Carrier Services",
  itemListElement: fleet.capabilities.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: item.name,
      description: item.desc,
      provider: {
        "@type": "Organization",
        name: "Your Brand",
      },
    },
  })),
};

export default function FleetPage() {
  return (
    <>
      <JsonLd
        data={[
          businessSchema({
            type: "MovingCompany",
            description: fleet.description,
            path: fleet.path,
            street: fleet.street,
            city: fleet.city,
            postalCode: fleet.postalCode,
            countryCode: fleet.countryCode,
            email: fleet.email,
            phone: fleet.phone,
            services: [
              "Pharmaceutical cold-chain transport",
              "53ft high-cube air-ride dry van",
              "Expedited two-driver team transit",
              "Dedicated contract motor carrier operations",
            ],
          }),
          webPageSchema({
            path: fleet.path,
            name: fleet.title,
            description: fleet.description,
            sectorName: "Logistics & Industrial",
            sector: "logistics",
          }),
          faqSchema(fleet.faqs),
          serviceList,
        ]}
      />

      <FleetHero />
      <FleetStrip />
      <FleetCapabilities />
      <FleetTransitCalculator />
      <FleetHubs />
      <FleetTelematics />
      <FleetFaq />
      <FleetContactForm />
    </>
  );
}
