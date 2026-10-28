import "./theme.css";
import { JsonLd } from "@/components/JsonLd";
import { freight } from "@/content/logistics/freight";
import { freightFonts } from "@/fonts/logistics-freight";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const services = freight.services.map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.title,
  description: s.body,
  serviceType: "Freight forwarding",
  areaServed: "Worldwide",
  provider: { "@id": `${absoluteUrl(freight.path)}#organization` },
}));

export default function FreightLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-logistics-freight ${freightFonts} min-h-dvh bg-bg font-sans text-fg overflow-x-clip`}>
      <JsonLd
        data={[
          businessSchema({
            type: "Organization",
            path: freight.path,
            description: freight.description,
            email: freight.email,
            phone: freight.phone,
            street: freight.street,
            city: freight.city,
            postalCode: freight.postalCode,
            countryCode: freight.countryCode,
            services: freight.services.map((s) => s.title),
          }),
          webPageSchema({ path: freight.path, name: "Your Brand", description: freight.description, sectorName: "Logistics & Industrial", sector: "logistics" }),
          faqSchema(freight.faqs),
          ...services,
        ]}
      />
      {children}
    </div>
  );
}
