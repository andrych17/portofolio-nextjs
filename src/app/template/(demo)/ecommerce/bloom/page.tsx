import { JsonLd } from "@/components/JsonLd";
import { BloomStorefront } from "@/components/ecommerce/bloom/BloomStorefront";
import { bloom } from "@/content/ecommerce/bloom";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { templateMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = templateMetadata({
  sector: "ecommerce",
  slug: "bloom",
  title: bloom.title,
  description: bloom.description,
});

export default function BloomPage() {
  return (
    <>
      <JsonLd
        data={[
          businessSchema({
            type: "HealthAndBeautyBusiness",
            path: bloom.path,
            description: bloom.description,
            email: bloom.email,
            phone: bloom.phone,
            street: bloom.street,
            city: bloom.city,
            postalCode: bloom.postalCode,
            countryCode: bloom.countryCode,
            services: [
              "Cold-pressed botanical skincare",
              "Zero-waste aluminum refill pouches",
              "In-store botanical refill tap bar",
              "Hydrosol linen and room mists",
            ],
          }),
          webPageSchema({
            path: bloom.path,
            name: bloom.title,
            description: bloom.description,
            sectorName: "E-Commerce & Retail",
            sector: "ecommerce",
          }),
          faqSchema(bloom.faqs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Your Brand botanical apothecary catalog",
            itemListElement: bloom.products.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Product",
                name: p.name,
                sku: p.sku,
                description: p.subtitle,
                image: absoluteUrl(p.image),
                offers: {
                  "@type": "Offer",
                  price: String(p.bottlePrice),
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                },
              },
            })),
          },
        ]}
      />
      <BloomStorefront />
    </>
  );
}
