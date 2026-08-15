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
  metadataBase: new URL("https://andrych17.github.io"),
  title: {
    default: "Andry Huang — Senior Full-Stack & AI Systems Developer (7+ Years Exp)",
    template: "%s | Andry Huang",
  },
  description:
    "Official portfolio of Andry Huang, Senior Full-Stack & AI Systems Engineer based in Surabaya, Indonesia with 7+ years of continuous experience (since September 2019). Specializing in .NET Core, Next.js, AI Agents, Model Context Protocol (MCP), and PostgreSQL.",
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
  authors: [{ name: "Andry Huang", url: "https://andrych17.github.io" }],
  creator: "Andry Huang",
  publisher: "Andry Huang",
  category: "technology",
  classification: "Software Engineering & AI Architecture",
  alternates: {
    canonical: "https://andrych17.github.io",
    languages: {
      "en-US": "https://andrych17.github.io",
      "id-ID": "https://andrych17.github.io",
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    url: "https://andrych17.github.io",
    title: "Andry Huang — Senior Full-Stack & AI Developer (7+ Years Exp)",
    description:
      "Senior Full-Stack & AI Engineer with 7+ years of continuous experience (since September 2019) building 30+ enterprise SaaS platforms, AI systems, and POS apps using Next.js, .NET Core, Node.js, and TypeScript.",
    siteName: "Andry Huang Portfolio",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Andry Huang - Senior Full-Stack & AI Developer (7+ Years Experience)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andry Huang — Senior Full-Stack & AI Developer from Indonesia",
    description:
      "Senior Full-Stack & AI Engineer with 7+ years experience (since Sept 2019) building enterprise SaaS platforms, AI systems, and POS apps.",
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
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  other: {
    "color-scheme": "dark",
    "theme-color": "#0c0c0c",
    "format-detection": "telephone=no",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://andrych17.github.io/#website",
      "url": "https://andrych17.github.io",
      "name": "Andry Huang Portfolio",
      "description": "Senior Full-Stack & AI Systems Developer portfolio featuring 30+ enterprise SaaS and AI systems.",
      "publisher": { "@id": "https://andrych17.github.io/#person" },
      "inLanguage": ["en", "id"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://andrych17.github.io/portofolio?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://andrych17.github.io/#webpage",
      "url": "https://andrych17.github.io",
      "name": "Andry Huang — Senior Full-Stack & AI Developer",
      "description": "Official portfolio of Andry Huang, Senior Full-Stack & AI Systems Developer with 7+ years of experience since September 2019.",
      "mainEntity": { "@id": "https://andrych17.github.io/#person" },
      "isPartOf": { "@id": "https://andrych17.github.io/#website" },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["#home h1", "#home p"]
      }
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
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Senior Full-Stack Developer",
        "occupationLocation": {
          "@type": "AdministrativeArea",
          "name": "Surabaya, East Java, Indonesia"
        },
        "skills": ".NET Core, Next.js, React, Node.js, AI Agents, Model Context Protocol (MCP), PostgreSQL, Docker, SaaS Architecture"
      },
      "knowsLanguage": ["en", "id"],
      "description": "Senior Full-Stack & AI Systems Developer based in Surabaya, Indonesia with 7+ years of continuous experience (starting September 2019) building enterprise SaaS platforms, POS systems, and AI workflows.",
      "knowsAbout": [
        "Next.js", ".NET Core", "Node.js", "React", "TypeScript",
        "AI Agents", "Model Context Protocol", "OpenAI GPT-4o", "Claude 3.7",
        "PostgreSQL", "Docker", "REST API", "Microservices", "POS Hardware Integration"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "AI Capabilities and Limitations",
          "credentialCategory": "Certificate of Completion",
          "recognizedBy": { "@type": "Organization", "name": "Anthropic" },
          "url": "https://verify.skilljar.com/c/exhhy4ripy8p"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Introduction to subagents",
          "credentialCategory": "Certificate of Completion",
          "recognizedBy": { "@type": "Organization", "name": "Anthropic" },
          "url": "https://verify.skilljar.com/c/ziob4haqtfxa"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Introduction to agent skills",
          "credentialCategory": "Certificate of Completion",
          "recognizedBy": { "@type": "Organization", "name": "Anthropic" },
          "url": "https://verify.skilljar.com/c/9d6emc43e68b"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Model Context Protocol: Advanced Topics",
          "credentialCategory": "Certificate of Completion",
          "recognizedBy": { "@type": "Organization", "name": "Anthropic" },
          "url": "https://verify.skilljar.com/c/nucfxrj2cxoy"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Introduction to Model Context Protocol",
          "credentialCategory": "Certificate of Completion",
          "recognizedBy": { "@type": "Organization", "name": "Anthropic" },
          "url": "https://verify.skilljar.com/c/hdv4nqhaequh"
        }
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Enterprise Full-Stack Web Development (.NET Core / Next.js / TypeScript)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Agent & MCP Architecture Integration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "POS & ERP System Engineering with Hardware Integration"
          }
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Surabaya",
        "addressRegion": "East Java",
        "addressCountry": "ID"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://andrych17.github.io/#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://andrych17.github.io"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Portfolio & Archive",
          "item": "https://andrych17.github.io/portofolio"
        }
      ]
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
          "name": "How many years of experience does Andry Huang have and what is his track record?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Andry Huang has 7+ years of professional software engineering experience (starting continuously since September 2019). He has architected and delivered 30+ production systems spanning enterprise SaaS (.NET Core, Next.js), large-scale retail POS with hardware/RFID, and AI-driven automation pipelines."
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--bg)] text-[var(--fg)]`}
      >
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-[var(--bg)] focus:font-mono focus:text-xs focus:font-bold focus:rounded-lg focus:shadow-xl"
        >
          Skip to content
        </a>
        <div aria-hidden="true" className="fixed inset-0 -z-10 bg-[var(--bg)]" />
        <div
          aria-hidden="true"
          className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay"
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
