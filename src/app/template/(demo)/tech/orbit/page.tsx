import { JsonLd } from "@/components/JsonLd";
import { OrbitArchitectureBento } from "@/components/tech/orbit/OrbitArchitectureBento";
import { OrbitContactForm } from "@/components/tech/orbit/OrbitContactForm";
import { OrbitFaq } from "@/components/tech/orbit/OrbitFaq";
import { OrbitHero } from "@/components/tech/orbit/OrbitHero";
import { OrbitInferenceCalculator } from "@/components/tech/orbit/OrbitInferenceCalculator";
import { OrbitLatencyMap } from "@/components/tech/orbit/OrbitLatencyMap";
import { OrbitMeshTopology } from "@/components/tech/orbit/OrbitMeshTopology";
import { OrbitPricing } from "@/components/tech/orbit/OrbitPricing";
import { OrbitStatsStrip } from "@/components/tech/orbit/OrbitStatsStrip";
import { orbit } from "@/content/tech/orbit";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { templateMetadata } from "@/lib/seo";

export const metadata = templateMetadata({
  sector: "tech",
  slug: "orbit",
  title: orbit.title,
  description: orbit.description,
});

const serviceList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Distributed GPU Cloud & Edge Inference Services",
  itemListElement: orbit.models.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: item.name,
      description: `Serverless ${item.name} inference with ${item.ttft} TTFT and ${item.throughput} throughput.`,
      provider: {
        "@type": "Organization",
        name: "Your Brand",
      },
    },
  })),
};

export default function OrbitPage() {
  return (
    <>
      <JsonLd
        data={[
          businessSchema({
            type: "Organization",
            description: orbit.description,
            path: orbit.path,
            street: orbit.street,
            city: orbit.city,
            postalCode: orbit.postalCode,
            countryCode: orbit.countryCode,
            email: orbit.email,
            phone: orbit.phone,
            services: [
              "Serverless GPU AI inference endpoints",
              "Sub-15ms Anycast edge routing across 42 global regions",
              "Dedicated bare-metal NVIDIA H100 and B200 SXM5 superclusters",
              "Zero-cold-start warm model weight streaming",
            ],
          }),
          webPageSchema({
            path: orbit.path,
            name: orbit.title,
            description: orbit.description,
            sectorName: "Technology & Software",
            sector: "tech",
          }),
          faqSchema(orbit.faqs),
          serviceList,
        ]}
      />

      <OrbitHero />
      <OrbitStatsStrip />
      <OrbitMeshTopology />
      <OrbitInferenceCalculator />
      <OrbitLatencyMap />
      <OrbitArchitectureBento />
      <OrbitPricing />
      <OrbitFaq />
      <OrbitContactForm />
    </>
  );
}
