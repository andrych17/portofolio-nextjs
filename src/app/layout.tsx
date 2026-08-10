import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://andryhuang.com"),
  title: "Andry Huang — Senior Full-Stack & AI Developer",
  description: "Andry Huang is a Senior Full-Stack & AI Engineer in Surabaya, Indonesia with 6+ years experience in SaaS platforms, AI tools, POS, and cloud architecture.",
  keywords: [
    "Full-Stack Developer Indonesia", "Senior Web Developer Surabaya", "Fullstack Engineer Indonesia",
    "AI Agent Engineer", "Model Context Protocol", "Next.js Developer", ".NET Core Developer",
    "React Architect", "Node.js Engineer", "Software Engineer Surabaya", "SaaS Developer",
    "Qualiv Founder", "Andry Huang", "Andry Huang Portfolio", "Indonesia Tech Talent",
  ],
  authors: [{ name: "Andry Huang", url: "https://andryhuang.com" }],
  creator: "Andry Huang",
  alternates: {
    canonical: "https://andryhuang.com",
    languages: {
      "en-US": "https://andryhuang.com",
      "id-ID": "https://andryhuang.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://andryhuang.com",
    title: "Andry Huang — Senior Full-Stack & AI Developer",
    description: "Senior Full-Stack & AI Engineer with 6+ years experience building enterprise SaaS platforms, AI systems, and POS apps using Next.js, .NET Core, Node.js, and TypeScript.",
    siteName: "Andry Huang Portfolio",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Andry Huang - Senior Full-Stack & AI Developer from Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andry Huang — Senior Full-Stack & AI Developer from Indonesia",
    description: "Senior Full-Stack & AI Engineer with 6+ years experience building enterprise SaaS platforms, AI systems, and POS apps.",
    creator: "@andryhuang",
    images: ["/img/og-image.jpg"],
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
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://andrych17.github.io/#webpage",
      "url": "https://andrych17.github.io",
      "name": "Andry Huang — Senior Full-Stack & AI Developer",
      "description": "Official portfolio of Andry Huang, Senior Full-Stack & AI Systems Developer.",
      "mainEntity": { "@id": "https://andrych17.github.io/#person" }
    },
    {
      "@type": "Person",
      "@id": "https://andrych17.github.io/#person",
      "name": "Andry Huang",
      "url": "https://andrych17.github.io",
      "image": "https://andrych17.github.io/img/foto.jpg",
      "sameAs": [
        "https://github.com/andrych17",
        "https://linkedin.com/in/andry-huang-ba410a170"
      ],
      "jobTitle": "Senior Full-Stack & AI Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "MRI Software"
      },
      "knowsLanguage": ["en", "id"],
      "description": "Senior Full-Stack & AI Systems Developer based in Surabaya, Indonesia with 6+ years experience building enterprise SaaS platforms, POS systems, and AI workflows.",
      "knowsAbout": [
        "Next.js", ".NET Core", "Node.js", "React", "TypeScript",
        "AI Agents", "Model Context Protocol", "OpenAI GPT-4o", "Claude 3.7",
        "PostgreSQL", "Docker", "REST API", "Microservices"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Surabaya",
        "addressRegion": "East Java",
        "addressCountry": "ID"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://andrych17.github.io/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What primary tech stack and services does Andry Huang specialize in?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Andry Huang specializes in Senior Full-Stack Engineering (.NET Core, Next.js, React, Node.js, TypeScript, PostgreSQL) and AI Systems Integration (Model Context Protocol/MCP, OpenAI GPT-4o, Claude AI Agents, and custom SaaS platforms)."
          }
        },
        {
          "@type": "Question",
          "name": "Is Andry Huang available for project collaboration or full-time roles?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Andry is available for high-impact software engineering projects, technical architecture consulting, and remote enterprise roles."
          }
        },
        {
          "@type": "Question",
          "name": "Where is Andry Huang located and can he work remotely?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Andry is based in Surabaya, East Java, Indonesia, and has extensive experience working with distributed global teams across different time zones."
          }
        },
        {
          "@type": "Question",
          "name": "What is Qualiv and what is Andry Huang's role in it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Qualiv is an AI-powered recruitment platform engineered by Andry Huang, featuring automated candidate evaluation pipelines, background analysis, and AI workflows."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030014] text-white`}
      >
        {/* Single animated aurora background — one instance for the entire page */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            background:
              "linear-gradient(-45deg, #030014, #1a0533, #0c1445, #041c2c, #0a2614, #1a0533)",
            backgroundSize: "400% 400%",
            animation: "aurora 15s ease infinite",
          }}
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
