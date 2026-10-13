import type { Metadata } from "next";
import Chrome from "@/components/v2/Chrome";
import Footer from "@/components/v2/Footer";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Archive & Portfolio (20+ Projects) • Andry Huang",
  description: "20+ projects by Andry Huang: enterprise SaaS, AI agents, retail POS systems, and full-stack web apps. Preview of the v2 archive.",
  robots: { index: false, follow: false }, // preview; the canonical archive is /portofolio
};

// The archive itself is still the original component, set inside the v2 shell (see .v2-archive in v2-sections.css).
export default function V2ArchivePage() {
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
