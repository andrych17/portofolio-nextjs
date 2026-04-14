import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Andry Huang | Full-Stack Developer Portfolio",
  description: "Full-stack developer with 6+ years building enterprise SaaS platforms, POS systems, and cloud-integrated web apps. Specializing in Next.js, .NET Core, Node.js, React, and TypeScript.",
  keywords: [
    "Full-Stack Developer", "Next.js", ".NET Core", "Node.js", "React", "TypeScript",
    "Web Developer", "Software Engineer", "Portfolio", "Andry Huang",
    "Surabaya", "Indonesia", "Remote Developer", "SaaS Developer",
    "Laravel", "Docker", "AWS", "Azure", "PostgreSQL",
  ],
  authors: [{ name: "Andry Huang", url: "https://andrych17.github.io" }],
  creator: "Andry Huang",
  alternates: {
    canonical: "https://andrych17.github.io",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://andrych17.github.io",
    title: "Andry Huang | Full-Stack Developer Portfolio",
    description: "Full-stack developer with 6+ years building enterprise SaaS platforms, POS systems, and cloud-integrated web apps using Next.js, .NET Core, Node.js, and TypeScript.",
    siteName: "Andry Huang Portfolio",
    images: [
      {
        url: "/img/foto.jpg",
        width: 800,
        height: 800,
        alt: "Andry Huang - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andry Huang | Full-Stack Developer Portfolio",
    description: "Full-stack developer with 6+ years building enterprise SaaS platforms, POS systems, and cloud-integrated web apps.",
    images: ["/img/foto.jpg"],
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
  "@type": "Person",
  name: "Andry Huang",
  url: "https://andrych17.github.io",
  image: "https://andrych17.github.io/img/foto.jpg",
  sameAs: [
    "https://github.com/andrych17",
    "https://linkedin.com/in/andry-huang-ba410a170",
  ],
  jobTitle: "Full-Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "MRI Software",
  },
  description: "Full-stack developer with 6+ years building enterprise SaaS platforms, POS systems, and cloud-integrated web apps.",
  knowsAbout: ["Next.js", ".NET Core", "Node.js", "React", "TypeScript", "Laravel", "Docker", "AWS", "Azure", "PostgreSQL"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Surabaya",
    addressCountry: "ID",
  },
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
        {children}
      </body>
    </html>
  );
}
