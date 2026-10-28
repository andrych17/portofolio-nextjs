import { JsonLd } from "@/components/JsonLd";
import { DentalCalm } from "@/components/health/dental/DentalCalm";
import { DentalContactForm } from "@/components/health/dental/DentalContactForm";
import { DentalDoctors } from "@/components/health/dental/DentalDoctors";
import { DentalEstimator } from "@/components/health/dental/DentalEstimator";
import { DentalFaq } from "@/components/health/dental/DentalFaq";
import { DentalHero } from "@/components/health/dental/DentalHero";
import { DentalStrip } from "@/components/health/dental/DentalStrip";
import { DentalTreatments } from "@/components/health/dental/DentalTreatments";
import { dental } from "@/content/health/dental";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { templateMetadata } from "@/lib/seo";

export const metadata = templateMetadata({
  sector: "health",
  slug: "dental",
  title: dental.title,
  description: dental.description,
});

const serviceList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Clinical Dental Procedures",
  itemListElement: dental.treatments.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "MedicalProcedure",
      name: item.name,
      description: item.desc,
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: item.priceEstimate,
      },
    },
  })),
};

export default function DentalPage() {
  return (
    <>
      <JsonLd
        data={[
          businessSchema({
            type: "Dentist",
            description: dental.description,
            path: dental.path,
            street: dental.street,
            city: dental.city,
            postalCode: dental.postalCode,
            countryCode: dental.countryCode,
            email: dental.email,
            phone: dental.phone,
            services: [
              "Hand-layered porcelain veneers",
              "Clear orthodontic aligners",
              "3D guided titanium implants",
              "Airflow biofilm therapy",
            ],
          }),
          webPageSchema({
            path: dental.path,
            name: dental.title,
            description: dental.description,
            sectorName: "Health & Clinic",
            sector: "health",
          }),
          faqSchema(dental.faqs),
          serviceList,
        ]}
      />

      <DentalHero />
      <DentalStrip />
      <DentalTreatments />
      <DentalEstimator />
      <DentalCalm />
      <DentalDoctors />
      <DentalFaq />
      <DentalContactForm />
    </>
  );
}
