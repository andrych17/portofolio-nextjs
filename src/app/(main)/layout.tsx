import { Archivo } from "next/font/google";
import "lenis/dist/lenis.css";
import "./v2.css";
import "./v2-sections.css";
import AIChatbot from "@/components/AIChatbot";
import { INTRO_KEY } from "@/lib/v2/seen";

// Upright, with the width axis driven by font-variation-settings (see .v2-h in v2.css).
const archivo = Archivo({ variable: "--font-archivo-wide", subsets: ["latin"], axes: ["wdth"], display: "swap" });

// Runs while the HTML streams in, before first paint: a returning visitor never sees the loader cover.
const SKIP_LOADER = `try{if(localStorage.getItem(${JSON.stringify(INTRO_KEY)})==="1")document.currentScript.parentElement.setAttribute("data-seen","")}catch(e){}`;

// Metadata comes from the root layout (home) and from each page (archive).
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
