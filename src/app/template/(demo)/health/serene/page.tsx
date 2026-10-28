import { JsonLd } from "@/components/JsonLd";
import { SereneCircuitPlanner } from "@/components/health/serene/SereneCircuitPlanner";
import { SereneContactForm } from "@/components/health/serene/SereneContactForm";
import { SereneFaq } from "@/components/health/serene/SereneFaq";
import { SereneHero } from "@/components/health/serene/SereneHero";
import { SereneStrip } from "@/components/health/serene/SereneStrip";
import { SereneSuites } from "@/components/health/serene/SereneSuites";
import { SereneTeam } from "@/components/health/serene/SereneTeam";
import { SereneTherapies } from "@/components/health/serene/SereneTherapies";
import { serene } from "@/content/health/serene";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { templateMetadata } from "@/lib/seo";

export const metadata = templateMetadata({
  sector: "health",
  slug: "serene",
  title: serene.title,
  description: serene.description,
});

const serviceList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Biological Recovery Therapies",
  itemListElement: serene.therapies.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "MedicalProcedure",
      name: item.name,
      description: item.desc,
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: item.price,
      },
    },
  })),
};

export default function SerenePage() {
  return (
    <>
      <JsonLd
        data={[
          businessSchema({
            type: "MedicalClinic",
            description: serene.description,
            path: serene.path,
            street: serene.street,
            city: serene.city,
            postalCode: serene.postalCode,
            countryCode: serene.countryCode,
            email: serene.email,
            phone: serene.phone,
            services: [
              "Contrast hydrotherapy and cold plunge",
              "Mild hyperbaric oxygen therapy",
              "Full-spectrum photobiomodulation",
              "Musculoskeletal sports physiotherapy",
            ],
          }),
          webPageSchema({
            path: serene.path,
            name: serene.title,
            description: serene.description,
            sectorName: "Health & Clinic",
            sector: "health",
          }),
          faqSchema(serene.faqs),
          serviceList,
        ]}
      />

      <SereneHero />
      <SereneStrip />
      <SereneTherapies />
      <SereneCircuitPlanner />
      <SereneSuites />
      <SereneTeam />
      <SereneFaq />
      <SereneContactForm />
    </>
  );
}
