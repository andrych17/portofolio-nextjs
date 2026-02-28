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
  title: "Andry Huang | Full-Stack Developer Portfolio",
  description: "Full-stack developer specializing in Next.js, .NET Core, Node.js, and cloud solutions. Building enterprise SaaS platforms, POS systems, and modern web applications with 6+ years of experience.",
  keywords: ["Full-Stack Developer", "Next.js", ".NET Core", "Node.js", "React", "TypeScript", "Web Developer", "Software Engineer", "Portfolio"],
  authors: [{ name: "Andry Huang" }],
  creator: "Andry Huang",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://andrych17.github.io",
    title: "Andry Huang | Full-Stack Developer Portfolio",
    description: "Full-stack developer specializing in Next.js, .NET Core, Node.js, and cloud solutions.",
    siteName: "Andry Huang Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andry Huang | Full-Stack Developer Portfolio",
    description: "Full-stack developer specializing in Next.js, .NET Core, Node.js, and cloud solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030014] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
