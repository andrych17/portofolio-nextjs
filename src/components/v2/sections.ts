import { CAREER } from "@/components/Career";
import { certifications } from "@/components/Certifications";
import { faqItems } from "@/components/FAQ";
import { projects } from "@/components/Projects";
import { ARCHIVE } from "@/lib/v2/routes";
import { FEATURED } from "./featured";

type Text = { en: string; id: string };

export interface SectionLink {
  /** Home section id, or a route when `href` is set. */
  section: string;
  href?: string;
  no: string;
  label: Text;
  hint: Text;
}

/** One list for the header, the menu and the footer, numbered like the section eyebrows. */
export const SECTIONS: SectionLink[] = [
  { section: "career", no: "01", label: { en: "Career", id: "Karier" }, hint: { en: `${CAREER.length} roles since 2019`, id: `${CAREER.length} peran sejak 2019` } },
  { section: "work", no: "02", label: { en: "Works", id: "Karya" }, hint: { en: `${FEATURED.length} featured, Qualiv first`, id: `${FEATURED.length} unggulan, Qualiv pertama` } },
  { section: "skills", no: "03", label: { en: "Stack", id: "Stack" }, hint: { en: ".NET · Next.js · NestJS · AI", id: ".NET · Next.js · NestJS · AI" } },
  { section: "certifications", no: "04", label: { en: "Credentials", id: "Sertifikasi" }, hint: { en: `${certifications.length} certificates`, id: `${certifications.length} sertifikat` } },
  { section: "faq", no: "05", label: { en: "FAQ", id: "FAQ" }, hint: { en: `${faqItems.length} answers`, id: `${faqItems.length} jawaban` } },
  { section: "contact", no: "06", label: { en: "Contact", id: "Kontak" }, hint: { en: "Email · WhatsApp · CV", id: "Email · WhatsApp · CV" } },
  { section: "archive", href: ARCHIVE, no: "07", label: { en: "Archive", id: "Arsip" }, hint: { en: `All ${projects.length} projects, search and case studies`, id: `Semua ${projects.length} proyek, pencarian dan studi kasus` } },
];

export const CONTACTS = {
  email: "andrych17@gmail.com",
  whatsapp: "https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you",
  linkedin: "https://linkedin.com/in/andry-huang-ba410a170",
  github: "https://github.com/andrych17",
  cv: "/Andry_Huang_CV.pdf",
};
