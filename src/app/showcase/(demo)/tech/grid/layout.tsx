import "./theme.css";
import { JsonLd } from "@/components/JsonLd";
import { GridFooter } from "@/components/tech/grid/GridFooter";
import { GridHeader } from "@/components/tech/grid/GridHeader";
import { grid } from "@/content/tech/grid";
import { gridFonts } from "@/fonts/tech-grid";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const app = {
  ...businessSchema({
    type: "SoftwareApplication",
    path: grid.path,
    description: grid.description,
    email: grid.email,
    phone: grid.phone,
    street: grid.street,
    city: grid.city,
    postalCode: grid.postalCode,
    countryCode: grid.countryCode,
    services: ["Webhook delivery", "Event retries", "Payload signing", "Delivery logs", "Event replay"],
  }),
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web, REST API",
  offers: grid.plans.names.slice(0, 3).map((name, i) => ({
    "@type": "Offer",
    name,
    price: grid.plans.price[i].replace("$", ""),
    priceCurrency: "USD",
    url: absoluteUrl(`${grid.path}#pricing`),
    availability: "https://schema.org/InStock",
  })),
};

export default function GridLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="top" className={`theme-tech-grid ${gridFonts} min-h-dvh bg-bg font-sans text-fg`}>
      <JsonLd
        data={[
          app,
          webPageSchema({ path: grid.path, name: grid.title, description: grid.description, sectorName: "Tech & SaaS", sector: "tech" }),
          faqSchema(grid.faqs),
        ]}
      />
      <GridHeader />
      <main id="main">{children}</main>
      <GridFooter />
    </div>
  );
}
