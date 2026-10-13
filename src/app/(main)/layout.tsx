import { Archivo } from "next/font/google";
import "lenis/dist/lenis.css";
import "./v2.css";
import "./v2-sections.css";
import AIChatbot from "@/components/AIChatbot";

// Upright, with the width axis driven by font-variation-settings (see .v2-h in v2.css).
const archivo = Archivo({ variable: "--font-archivo-wide", subsets: ["latin"], axes: ["wdth"], display: "swap" });

// Metadata comes from the root layout (home) and from each page (archive).
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={`v2 ${archivo.variable}`}>{children}</div>
      {/* Outside .v2 on purpose: the assistant keeps the site-wide dark theme, whichever section is behind it. */}
      <AIChatbot />
    </>
  );
}
