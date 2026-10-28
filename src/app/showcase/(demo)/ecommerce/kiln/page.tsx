import { JsonLd } from "@/components/JsonLd";
import { KilnStorefront } from "@/components/ecommerce/kiln/KilnStorefront";
import { kiln } from "@/content/ecommerce/kiln";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { templateMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = templateMetadata({
  sector: "ecommerce",
  slug: "kiln",
  title: kiln.title,
  description: kiln.description,
});

export default function KilnPage() {
  return (
    <>
      <JsonLd
        data={[
          businessSchema({
            type: "HobbyShop",
            path: kiln.path,
            description: kiln.description,
            email: kiln.email,
            phone: kiln.phone,
            street: kiln.street,
            city: kiln.city,
            postalCode: kiln.postalCode,
            countryCode: kiln.countryCode,
            services: [
              "Stoneware clay & mineral glazes",
              "Pottery wheel & trimming tools",
              "Open-wheel studio pass",
              "Kiln firing service",
            ],
          }),
          webPageSchema({
            path: kiln.path,
            name: kiln.title,
            description: kiln.description,
            sectorName: "E-Commerce & Retail",
            sector: "ecommerce",
          }),
          faqSchema(kiln.faqs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Your Brand ceramic & craft catalog",
            itemListElement: kiln.products.map((p, i) => ({
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
                  price: String(p.price),
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                },
              },
            })),
          },
        ]}
      />
      <KilnStorefront />
    </>
  );
}
