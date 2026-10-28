import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";
import "./stage.css";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face: black italic with the width axis pushed fully expanded (see .ah-x in stage.css).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  style: ["italic"],
  axes: ["wdth"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://andryhuang.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Andry Huang • Senior Full-Stack & AI Engineer (7+ Years)",
    template: "%s | Andry Huang",
  },
  description:
    "Portfolio of Andry Huang, Senior Full-Stack & AI Engineer in Surabaya, Indonesia, working since September 2019. .NET Core, Next.js, PostgreSQL, AI agents, and Model Context Protocol (MCP).",
  keywords: [
    "Full-Stack Developer Indonesia",
    "Senior Web Developer Surabaya",
    "Fullstack Engineer Indonesia",
    "AI Agent Engineer",
    "Model Context Protocol",
    "Next.js Developer",
    ".NET Core Developer",
    "React Architect",
    "Node.js Engineer",
    "Software Engineer Surabaya",
    "SaaS Developer",
    "Qualiv Founder",
    "Andry Huang",
    "Andry Huang Portfolio",
    "Indonesia Tech Talent",
    "7 Years Experience Developer",
    "Anthropic Certified Developer",
  ],
  authors: [{ name: "Andry Huang", url: SITE_URL }],
  creator: "Andry Huang",
  publisher: "Andry Huang",
  category: "technology",
  classification: "Software Engineering & AI Architecture",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
      "id-ID": SITE_URL,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    url: SITE_URL,
    title: "Andry Huang • Senior Full-Stack & AI Engineer (7+ Years)",
    description:
      "Senior Full-Stack & AI Engineer, working since September 2019. Enterprise SaaS for Anacle Systems Ltd, the Qualiv AI recruitment platform, and retail POS systems, built with Next.js, .NET Core, Node.js, and TypeScript.",
    siteName: "Andry Huang Portfolio",
    images: [
      {
        url: "/img/og-image.jpg?v=2",
        width: 1200,
        height: 630,
        alt: "Andry Huang, Senior Full-Stack & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andry Huang • Senior Full-Stack & AI Engineer from Indonesia",
    description:
      "Senior Full-Stack & AI Engineer in Indonesia. 7+ years building enterprise SaaS, AI tools, and POS systems.",
    creator: "@andryhuang",
    images: ["/img/og-image.jpg?v=2"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "color-scheme": "dark",
    "theme-color": "#0c0c0c",
    "format-detection": "telephone=no",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} antialiased bg-[var(--bg)] text-[var(--fg)]`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
