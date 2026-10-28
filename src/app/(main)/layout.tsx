import { Archivo } from "next/font/google";
import "lenis/dist/lenis.css";
import "./v2.css";
import "./v2-sections.css";
import AIChatbot from "@/components/AIChatbot";
import { INTRO_KEY } from "@/lib/v2/seen";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://andryhuang.com";

// Upright, with the width axis driven by font-variation-settings (see .v2-h in v2.css).
const archivo = Archivo({ variable: "--font-archivo-wide", subsets: ["latin"], axes: ["wdth"], display: "swap" });

// Runs while the HTML streams in, before first paint: a returning visitor never sees the loader cover.
const SKIP_LOADER = `try{if(localStorage.getItem(${JSON.stringify(INTRO_KEY)})==="1")document.currentScript.parentElement.setAttribute("data-seen","")}catch(e){}`;

const mainJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "Andry Huang Portfolio",
      "description": "Portfolio of Andry Huang, Senior Full-Stack & AI Engineer: 20+ SaaS, AI, POS, and interactive web showcase projects.",
      "publisher": { "@id": `${SITE_URL}/#person` },
      "inLanguage": ["en", "id"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${SITE_URL}/portofolio?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#webpage`,
      "url": SITE_URL,
      "name": "Andry Huang • Senior Full-Stack & AI Engineer",
      "description": "Portfolio of Andry Huang, Senior Full-Stack & AI Engineer with 7+ years of experience since September 2019.",
      "mainEntity": { "@id": `${SITE_URL}/#person` },
      "isPartOf": { "@id": `${SITE_URL}/#website` },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["#home h1", "#home p"]
      }
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      "name": "Andry Huang",
      "url": SITE_URL,
      "image": `${SITE_URL}/img/foto.jpg`,
      "sameAs": [
        "https://github.com/andrych17",
        "https://linkedin.com/in/andry-huang-ba410a170",
        "https://www.upwork.com/freelancers/~010b8007dbf51d6f3c"
      ],
      "jobTitle": "Senior Full-Stack & AI Engineer",
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
      "description": "Senior Full-Stack & AI Engineer in Surabaya, Indonesia, working since September 2019 on enterprise SaaS, POS systems, and AI workflows.",
      "knowsAbout": [
        "Next.js", ".NET Core", "Node.js", "React", "TypeScript",
        "AI Agents", "Model Context Protocol", "OpenAI GPT-4o", "Anthropic Claude API",
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
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Building with the Claude API",
          "credentialCategory": "Certificate of Completion",
          "recognizedBy": { "@type": "Organization", "name": "Anthropic" },
          "url": "https://verify.skilljar.com/c/3ik737t8atvf"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Claude Code in Action",
          "credentialCategory": "Certificate of Completion",
          "recognizedBy": { "@type": "Organization", "name": "Anthropic" },
          "url": "https://verify.skilljar.com/c/opzctbnhdmcs"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Introduction to Claude Cowork",
          "credentialCategory": "Certificate of Completion",
          "recognizedBy": { "@type": "Organization", "name": "Anthropic" },
          "url": "https://verify.skilljar.com/c/zydanea62pwv"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Claude 101",
          "credentialCategory": "Certificate of Completion",
          "recognizedBy": { "@type": "Organization", "name": "Anthropic" },
          "url": "https://verify.skilljar.com/c/fyrqffssmxur"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "AI Agents with Model Context Protocol",
          "credentialCategory": "Course Certificate",
          "recognizedBy": { "@type": "Organization", "name": "Vanderbilt University" },
          "url": "https://www.coursera.org/account/accomplishments/records/ZI2P1DZ8J56C"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Software Architecture & Design of Modern Large Scale Systems",
          "credentialCategory": "Certificate of Completion",
          "recognizedBy": { "@type": "Organization", "name": "Udemy" },
          "url": "https://www.udemy.com/certificate/UC-ff06e4f9-87de-44cd-b029-c7ad33e03e80/"
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
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Interactive Brand & E-Commerce Web Engineering",
            "url": `${SITE_URL}/showcase`
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
      "@type": "Organization",
      "@id": "https://qualiv.id/#organization",
      "name": "Qualiv",
      "url": "https://qualiv.id",
      "description": "Multi-tenant AI recruitment & candidate assessment SaaS platform",
      "founder": { "@id": `${SITE_URL}/#person` }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://qualiv.id/#app",
      "name": "Qualiv",
      "url": "https://qualiv.id",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "creator": { "@id": `${SITE_URL}/#person` }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumbs`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": SITE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Portfolio",
          "item": `${SITE_URL}/portofolio`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Web Showcase",
          "item": `${SITE_URL}/showcase`
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What primary tech stack and services does Andry Huang specialize in?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Full-stack work in .NET Core, Next.js, React, Node.js, TypeScript, and PostgreSQL, plus AI integration: Model Context Protocol (MCP), the OpenAI and Claude APIs, and agent workflows. Andry also builds custom SaaS platforms and interactive web showcases."
          }
        },
        {
          "@type": "Question",
          "name": "How many years of experience does Andry Huang have and what is his track record?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "7+ years, starting September 2019. The work covers enterprise SaaS for Anacle Systems Ltd (.NET Core, Next.js), retail POS systems with RFID hardware, and AI automation such as Qualiv. This site lists 20+ production projects plus 24 interactive web showcase builds across 8 sectors."
          }
        },
        {
          "@type": "Question",
          "name": "Is Andry Huang available for project collaboration or full-time roles?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Andry is open to remote full-time roles, client projects, and architecture consulting."
          }
        },
        {
          "@type": "Question",
          "name": "Where is Andry Huang located and can he work remotely?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Andry lives in Surabaya, East Java, Indonesia, and worked remotely for Anacle Systems Ltd in Singapore for more than 3 years."
          }
        },
        {
          "@type": "Question",
          "name": "What is Qualiv and what is Andry Huang's role in it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Qualiv is a multi-tenant AI recruitment SaaS that Andry founded and built as Lead Architect. It screens CVs (PDF/DOCX) with an LLM, runs candidate logic tests and AI chat/video interview simulations, processes jobs on a BullMQ/Redis queue, and bills through Midtrans."
          }
        }
      ]
    }
  ]
};

// Metadata comes from the root layout (home) and from each page (archive).
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mainJsonLd) }}
      />
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
      <div className={`v2 ${archivo.variable}`} suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: SKIP_LOADER }} />
        {children}
      </div>
      {/* Outside .v2 on purpose: the assistant keeps the site-wide dark theme, whichever section is behind it. */}
      <AIChatbot />
    </>
  );
}
