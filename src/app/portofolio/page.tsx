import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://andryhuang.com";

export const metadata: Metadata = {
  title: "Archive & Portfolio (20+ Projects) • Andry Huang",
  description:
    "20+ projects by Andry Huang: enterprise SaaS, AI agents, retail POS systems, and full-stack web apps from 7+ years of work.",
  alternates: {
    canonical: `${SITE_URL}/portofolio`,
  },
  openGraph: {
    title: "Archive & Portfolio • Andry Huang",
    description:
      "Archive of 20+ projects in .NET Core, Next.js, AI/MCP, POS, and PostgreSQL.",
    url: `${SITE_URL}/portofolio`,
  },
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen min-h-[100dvh] bg-[var(--bg)] text-[var(--fg)]">
      <Navbar />
      <div className="pt-20">
        <Projects />
      </div>
      <Footer />
      <AIChatbot />
    </main>
  );
}
