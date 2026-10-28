import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/motion/Providers";
import { basePath, noIndex, siteUrl } from "@/lib/site";
import "./templates.css";

const title = "Web Showcase · Andry Huang";
const description =
  "24 interactive, mobile-first website builds across 8 sectors: e-commerce, agency, fashion, tech, food, property, health and logistics. Built with Next.js by Andry Huang.";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}${basePath}`),
  title: { default: title, template: "%s" },
  description,
  applicationName: "Web Showcase",
  authors: [{ name: "Andry Huang", url: "https://andryhuang.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Andry Huang",
    title,
    description,
    images: [{ url: `${siteUrl}/img/og-image.jpg?v=2`, width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/img/og-image.jpg?v=2`],
  },
  robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
};

export default function TemplateRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="templates-root min-h-dvh">
      <Providers>{children}</Providers>
    </div>
  );
}
