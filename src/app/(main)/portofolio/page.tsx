import type { Metadata } from "next";
import Chrome from "@/components/v2/Chrome";
import Footer from "@/components/v2/Footer";
import Projects from "@/components/Projects";
import { OG_IMAGES } from "@/lib/og";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://andryhuang.com";

export const metadata: Metadata = {
  title: "Archive & Portfolio (20+ Projects) • Andry Huang",
  description:
    "20+ projects by Andry Huang: enterprise SaaS, AI agents, retail POS systems, and full-stack web apps from 7+ years of work.",
  alternates: { canonical: `${SITE_URL}/portofolio` },
  // The root layout's openGraph is replaced wholesale here, so type, siteName and images are repeated.
  openGraph: {
    type: "website",
    url: `${SITE_URL}/portofolio`,
    title: "Archive & Portfolio • Andry Huang",
    description: "Archive of 20+ projects in .NET Core, Next.js, AI/MCP, POS, and PostgreSQL.",
    siteName: "Andry Huang Portfolio",
    images: OG_IMAGES,
  },
};

// The archive itself is still the original component, set inside the v2 shell (see .v2-archive in v2-sections.css).
export default function ArchivePage() {
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
