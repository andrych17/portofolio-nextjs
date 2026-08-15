import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://andryhuang.com";

export const metadata: Metadata = {
  title: "Archive & Portfolio (30+ Projects) — Andry Huang",
  description:
    "Explore 30+ enterprise SaaS platforms, AI agent architectures, retail POS systems, and full-stack web applications engineered by Andry Huang with 7+ years of experience.",
  alternates: {
    canonical: `${SITE_URL}/portofolio`,
  },
  openGraph: {
    title: "Archive & Portfolio — Andry Huang",
    description:
      "Complete archive of 30+ software engineering projects spanning .NET Core, Next.js, AI MCP, POS, and PostgreSQL.",
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
