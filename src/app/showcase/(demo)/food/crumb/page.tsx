import { JsonLd } from "@/components/JsonLd";
import { CrumbBakes } from "@/components/food/crumb/CrumbBakes";
import { CrumbCoffee } from "@/components/food/crumb/CrumbCoffee";
import { CrumbContactForm } from "@/components/food/crumb/CrumbContactForm";
import { CrumbFaq } from "@/components/food/crumb/CrumbFaq";
import { CrumbHero } from "@/components/food/crumb/CrumbHero";
import { CrumbSchedule } from "@/components/food/crumb/CrumbSchedule";
import { CrumbStory } from "@/components/food/crumb/CrumbStory";
import { CrumbStrip } from "@/components/food/crumb/CrumbStrip";
import { crumb } from "@/content/food/crumb";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { templateMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export const metadata = templateMetadata({
  sector: "food",
  slug: "crumb",
  title: crumb.title,
  description: crumb.description,
});

const menuList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Daily Artisan Bakes",
  itemListElement: crumb.bakes.map((item, i) => ({
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

export default function CrumbPage() {
  return (
    <>
      <JsonLd
        data={[
          businessSchema({
            type: "Bakery",
            description: crumb.description,
            path: crumb.path,
            street: crumb.street,
            city: crumb.city,
            postalCode: crumb.postalCode,
            countryCode: crumb.countryCode,
            email: crumb.email,
            phone: crumb.phone,
            services: ["Wild sourdough loaves", "Laminated viennoiserie", "Specialty coffee", "Morning bread pre-orders"],
          }),
          webPageSchema({
            path: crumb.path,
            name: crumb.title,
            description: crumb.description,
            sectorName: "Food & Beverage",
            sector: "food",
          }),
          faqSchema(crumb.faqs),
          menuList,
        ]}
      />

      <CrumbHero />
      <CrumbStrip />
      <CrumbBakes />
      <CrumbSchedule />
      <CrumbCoffee />
      <CrumbStory />
      <CrumbFaq />
      <CrumbContactForm />
    </>
  );
}
