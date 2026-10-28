import type { StudioKey } from "@/lib/contact";

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: number;
  summary: string;
  result: string;
  image: string;
  tags: string[];
};

export type Service = { title: string; body: string; deliverables: string[] };
export type Stat = { value: number; suffix?: string; prefix?: string; label: string };
export type Testimonial = { quote: string; name: string; role: string };
export type Person = { name: string; role: string; fact?: string };
export type Value = { title: string; body: string };
export type Step = { title: string; duration: string; body: string; outputs: string[] };
export type Faq = { q: string; a: string };
export type Milestone = { year: string; text: string };

export type Studio = {
  key: StudioKey;
  name: string;
  tagline: string;
  /** Meta description, 140-160 characters. */
  description: string;
  intro: string;
  manifesto: string;
  city: string;
  country: string;
  countryCode: string;
  street: string;
  postalCode: string;
  timeZone: string;
  email: string;
  phone: string;
  founded: number;
  hours: string;
  services: Service[];
  projects: Project[];
  stats: Stat[];
  clients: string[];
  testimonials: Testimonial[];
  team: Person[];
  values: Value[];
  process: Step[];
  faqs: Faq[];
  milestones: Milestone[];
  socials: { label: string; href: string }[];
};

export const pages = [
  { label: "Home", slug: "" },
  { label: "Work", slug: "work" },
  { label: "About", slug: "about" },
  { label: "Process", slug: "process" },
  { label: "Contact", slug: "contact" },
] as const;

export function pagePath(studio: StudioKey, slug: string) {
  return slug ? `/template/agency/${studio}/${slug}` : `/template/agency/${studio}`;
}
