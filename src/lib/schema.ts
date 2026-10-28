import type { Faq, Studio } from "@/content/types";
import { pagePath } from "@/content/types";
import { absoluteUrl } from "./site";

type Json = Record<string, unknown>;

const orgId = (s: Studio) => absoluteUrl(`/agency/${s.key}#organization`);

export function organizationSchema(s: Studio): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": orgId(s),
    name: s.name,
    slogan: s.tagline,
    description: s.description,
    url: absoluteUrl(`/agency/${s.key}`),
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl(`/thumbs/agency-${s.key}.webp`),
    email: s.email,
    telephone: s.phone,
    foundingDate: String(s.founded),
    numberOfEmployees: s.team.length,
    priceRange: "$$$",
    openingHours: s.hours,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.street,
      postalCode: s.postalCode,
      addressLocality: s.city,
      addressCountry: s.countryCode,
    },
    areaServed: "Worldwide",
    knowsAbout: s.services.map((service) => service.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.name} services`,
      itemListElement: s.services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title, description: service.body },
      })),
    },
  };
}

export function websiteSchema(s: Studio): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl(`/agency/${s.key}#website`),
    name: s.name,
    url: absoluteUrl(`/agency/${s.key}`),
    description: s.description,
    inLanguage: "en",
    publisher: { "@id": orgId(s) },
  };
}

export function webPageSchema(
  s: Studio,
  page: { type: string; name: string; description: string; slug: string },
): Json {
  const url = absoluteUrl(pagePath(s.key, page.slug));
  const crumbs = [{ name: s.name, slug: "" }, ...(page.slug ? [{ name: page.name, slug: page.slug }] : [])];
  return {
    "@context": "https://schema.org",
    "@type": page.type,
    "@id": `${url}#webpage`,
    url,
    name: page.name,
    description: page.description,
    isPartOf: { "@id": absoluteUrl(`/agency/${s.key}#website`) },
    about: { "@id": orgId(s) },
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "[data-speakable]"] },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: absoluteUrl(pagePath(s.key, crumb.slug)),
      })),
    },
  };
}

export function faqSchema(faqs: Faq[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function workSchema(s: Studio): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${s.name} selected work`,
    itemListElement: s.projects.map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: `${project.summary} ${project.result}.`,
        dateCreated: String(project.year),
        genre: project.category,
        image: absoluteUrl(project.image),
        creator: { "@id": orgId(s) },
      },
    })),
  };
}

export function processSchema(s: Studio): Json {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How a project with ${s.name} works`,
    step: s.process.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: `${step.body} (${step.duration})`,
    })),
  };
}
