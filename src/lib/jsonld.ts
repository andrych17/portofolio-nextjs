import { absoluteUrl } from "./site";

type Json = Record<string, unknown>;

/** schema.org Organization / LocalBusiness subtype for a single-page template. `path` is e.g. "/fashion/maison". */
export function businessSchema(o: {
  type: string; // "Organization" | "ClothingStore" | "Restaurant" | "Dentist" | "GeneralContractor" | ...
  path: string;
  description: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  countryCode: string;
  services: string[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": o.type,
    "@id": `${absoluteUrl(o.path)}#organization`,
    name: "Your Brand",
    description: o.description,
    url: absoluteUrl(o.path),
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl(`/thumbs/${o.path.slice(1).replace("/", "-")}.webp`),
    email: o.email,
    telephone: o.phone,
    address: { "@type": "PostalAddress", streetAddress: o.street, postalCode: o.postalCode, addressLocality: o.city, addressCountry: o.countryCode },
    knowsAbout: o.services,
  };
}

export function webPageSchema(o: { path: string; name: string; description: string; sectorName: string; sector: string }): Json {
  const url = absoluteUrl(o.path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: o.name,
    description: o.description,
    about: { "@id": `${url}#organization` },
    // Speakable: put data-speakable on the one-sentence answer under the hero.
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "[data-speakable]"] },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Templates", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: o.sectorName, item: absoluteUrl(`/${o.sector}`) },
        { "@type": "ListItem", position: 3, name: o.name, item: url },
      ],
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
