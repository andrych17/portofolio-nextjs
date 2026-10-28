import { JsonLd } from "@/components/JsonLd";
import { PlayStorefront } from "@/components/ecommerce/play/PlayStorefront";
import { play } from "@/content/ecommerce/play";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { templateMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = templateMetadata({
  sector: "ecommerce",
  slug: "play",
  title: play.title,
  description: play.description,
});

export default function PlayPage() {
  return (
    <>
      <JsonLd
        data={[
          businessSchema({
            type: "ComputerStore",
            path: play.path,
            description: play.description,
            email: play.email,
            phone: play.phone,
            street: play.street,
            city: play.city,
            postalCode: play.postalCode,
            countryCode: play.countryCode,
            services: [
              "CNC aluminum mechanical keyboard kits",
              "Factory-lubed linear and tactile switches",
              "Dye-sublimated PBT keycap sets",
              "Custom keyboard assembly and tuning",
            ],
          }),
          webPageSchema({
            path: play.path,
            name: play.title,
            description: play.description,
            sectorName: "E-Commerce & Retail",
            sector: "ecommerce",
          }),
          faqSchema(play.faqs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Your Brand mechanical keyboard hardware catalog",
            itemListElement: play.products.map((p, i) => ({
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
      <PlayStorefront />
    </>
  );
}
