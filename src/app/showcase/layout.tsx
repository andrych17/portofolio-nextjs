import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/motion/Providers";
import { basePath, noIndex, siteUrl } from "@/lib/site";
import "./templates.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}${basePath}`),
  title: { default: "Website Templates · Andry Huang", template: "%s" },
  description:
    "Animated, SEO-ready website templates by sector: agency, fashion, tech, food, property, health and logistics. Built with Next.js.",
  applicationName: "Website Templates",
  authors: [{ name: "Andry Huang", url: "https://andryhuang.com" }],
  robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
};

export default function TemplateRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="templates-root min-h-dvh">
      <Providers>{children}</Providers>
    </div>
  );
}
