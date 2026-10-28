import "./theme.css";
import { JsonLd } from "@/components/JsonLd";
import { Curtain } from "@/components/motion/Curtain";
import { EstateFooter } from "@/components/property/estate/EstateFooter";
import { EstateHeader } from "@/components/property/estate/EstateHeader";
import { estate, listings } from "@/content/property/estate";
import { estateFonts } from "@/fonts/property-estate";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { absoluteUrl, siteUrl } from "@/lib/site";

const path = "/property/estate";
const itemType = { Villa: "House", Townhouse: "House", Estate: "House", Apartment: "Apartment" } as const;

const agent = {
  ...businessSchema({
    type: "RealEstateAgent",
    path,
    description: estate.description,
    email: estate.email,
    phone: estate.phone,
    street: estate.street,
    city: estate.city,
    postalCode: estate.postalCode,
    countryCode: estate.countryCode,
    services: ["Luxury villas", "Townhouses", "Apartments", "Private estates", "Off-plan development sales", "Buyer advisory"],
  }),
  priceRange: "$1,150,000 - $9,200,000",
  areaServed: ["Hillcrest", "Old Harbour", "Lakeside", "City Centre"].map((name) => ({ "@type": "Place", name })),
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "18:00" },
  ],
};

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Homes for sale",
  numberOfItems: listings.length,
  itemListElement: listings.map((l, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Offer",
      name: l.name,
      url: `${absoluteUrl(path)}#collection`,
      price: l.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@id": `${absoluteUrl(path)}#organization` },
      itemOffered: {
        "@type": itemType[l.type],
        name: l.name,
        description: l.blurb,
        image: `${siteUrl}${l.image}`,
        numberOfBedrooms: l.beds,
        numberOfBathroomsTotal: l.baths,
        floorSize: { "@type": "QuantitativeValue", value: l.size, unitCode: "MTK" },
        address: { "@type": "PostalAddress", addressLocality: l.area, addressCountry: estate.countryCode },
      },
    },
  })),
};

export default function EstateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-property-estate ${estateFonts} min-h-dvh bg-bg font-sans text-fg`}>
      <JsonLd
        data={[
          agent,
          webPageSchema({ path, name: "Your Brand", description: estate.description, sectorName: "Property & Construction", sector: "property" }),
          faqSchema(estate.faqs),
          itemList,
        ]}
      />
      <Curtain className="bg-[#0f2a20]" />
      <EstateHeader />
      <main id="main">{children}</main>
      <EstateFooter />
    </div>
  );
}
