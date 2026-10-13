import type { Metadata } from "next";
import Chrome from "@/components/v2/Chrome";
import Footer from "@/components/v2/Footer";
import Projects from "@/components/Projects";
import { OG_IMAGES } from "@/lib/og";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://andryhuang.com";

export const metadata: Metadata = {
  title: "Portofolio Lengkap (20+ Proyek) • Andry Huang",
  description:
    "20+ proyek oleh Andry Huang: enterprise SaaS, AI agents, sistem POS ritel, dan full-stack web apps dari 7+ tahun pengalaman.",
  alternates: { canonical: `${SITE_URL}/portofolio` },
  // The root layout's openGraph is replaced wholesale here, so type, siteName and images are repeated.
  openGraph: {
    type: "website",
    url: `${SITE_URL}/portofolio`,
    title: "Portofolio Lengkap • Andry Huang",
    description: "Koleksi 20+ proyek di .NET Core, Next.js, AI/MCP, POS, dan PostgreSQL.",
    siteName: "Andry Huang Portfolio",
    images: OG_IMAGES,
  },
};

// The portfolio catalog inside the v2 shell (see .v2-archive in v2-sections.css).
export default function PortfolioPage() {
  return (
    <>
      <Chrome />
      <main className="v2-archive ah-home ah-archive" id="archive" data-section="dark">
        <Projects />
      </main>
      <Footer />
    </>
  );
}
