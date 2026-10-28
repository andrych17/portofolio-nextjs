import { JsonLd } from "@/components/JsonLd";
import { ForgeAxleCalculator } from "@/components/logistics/forge/ForgeAxleCalculator";
import { ForgeCapabilities } from "@/components/logistics/forge/ForgeCapabilities";
import { ForgeContactForm } from "@/components/logistics/forge/ForgeContactForm";
import { ForgeFaq } from "@/components/logistics/forge/ForgeFaq";
import { ForgeHero } from "@/components/logistics/forge/ForgeHero";
import { ForgeProjects } from "@/components/logistics/forge/ForgeProjects";
import { ForgeRiggingYard } from "@/components/logistics/forge/ForgeRiggingYard";
import { ForgeStrip } from "@/components/logistics/forge/ForgeStrip";
import { forge } from "@/content/logistics/forge";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { templateMetadata } from "@/lib/seo";

export const metadata = templateMetadata({
  sector: "logistics",
  slug: "forge",
  title: forge.title,
  description: forge.description,
});

const serviceList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Engineered Heavy Haul & Rigging Services",
  itemListElement: forge.capabilities.map((item, i) => ({
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

export default function ForgePage() {
  return (
    <>
      <JsonLd
        data={[
          businessSchema({
            type: "MovingCompany",
            description: forge.description,
            path: forge.path,
            street: forge.street,
            city: forge.city,
            postalCode: forge.postalCode,
            countryCode: forge.countryCode,
            email: forge.email,
            phone: forge.phone,
            services: [
              "Hydraulic multi-axle platform & SPMT transport",
              "Superload route survey and bridge stress analysis",
              "Industrial crane and hydraulic gantry rigging",
              "Multimodal barge and rail heavy transload",
            ],
          }),
          webPageSchema({
            path: forge.path,
            name: forge.title,
            description: forge.description,
            sectorName: "Logistics & Industrial",
            sector: "logistics",
          }),
          faqSchema(forge.faqs),
          serviceList,
        ]}
      />

      <ForgeHero />
      <ForgeStrip />
      <ForgeCapabilities />
      <ForgeAxleCalculator />
      <ForgeProjects />
      <ForgeRiggingYard />
      <ForgeFaq />
      <ForgeContactForm />
    </>
  );
}
