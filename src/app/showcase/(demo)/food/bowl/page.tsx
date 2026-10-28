import { JsonLd } from "@/components/JsonLd";
import { BowlBuilder } from "@/components/food/bowl/BowlBuilder";
import { BowlContactForm } from "@/components/food/bowl/BowlContactForm";
import { BowlFaq } from "@/components/food/bowl/BowlFaq";
import { BowlHero } from "@/components/food/bowl/BowlHero";
import { BowlPots } from "@/components/food/bowl/BowlPots";
import { BowlSignature } from "@/components/food/bowl/BowlSignature";
import { BowlStory } from "@/components/food/bowl/BowlStory";
import { BowlStrip } from "@/components/food/bowl/BowlStrip";
import { bowl } from "@/content/food/bowl";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { templateMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export const metadata = templateMetadata({
  sector: "food",
  slug: "bowl",
  title: bowl.title,
  description: bowl.description,
});

const menuList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Organic Signature Bowls",
  itemListElement: bowl.signatureBowls.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "MenuItem",
      name: item.name,
      description: item.desc,
      image: `${siteUrl}${item.image}`,
      offers: {
        "@type": "Offer",
        price: item.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
  })),
};

export default function BowlPage() {
  return (
    <>
      <JsonLd
        data={[
          businessSchema({
            type: "Restaurant",
            description: bowl.description,
            path: bowl.path,
            street: bowl.street,
            city: bowl.city,
            postalCode: bowl.postalCode,
            countryCode: bowl.countryCode,
            email: bowl.email,
            phone: bowl.phone,
            services: ["Organic grain bowls", "Custom nutrition builder", "Breakfast pots", "Cold-pressed elixirs"],
          }),
          webPageSchema({
            path: bowl.path,
            name: bowl.title,
            description: bowl.description,
            sectorName: "Food & Beverage",
            sector: "food",
          }),
          faqSchema(bowl.faqs),
          menuList,
        ]}
      />

      <BowlHero />
      <BowlStrip />
      <BowlSignature />
      <BowlBuilder />
      <BowlPots />
      <BowlStory />
      <BowlFaq />
      <BowlContactForm />
    </>
  );
}
