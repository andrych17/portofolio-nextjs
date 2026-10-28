import type { ReactNode } from "react";
import Link from "next/link";
import { galleryFonts } from "@/fonts/gallery";
import "./gallery.css";

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`theme-gallery ${galleryFonts} min-h-dvh font-sans text-fg`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-semibold focus:text-accent-fg"
      >
        Skip to content
      </a>
      <header className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-10 md:py-7">
        <Link href="/" className="flex items-center gap-3" aria-label="Andry Huang, home">
          <span className="wide grid size-10 place-items-center rounded-full bg-accent font-display text-[13px] font-extrabold text-accent-fg">AH</span>
          <span className="hidden sm:block">
            <span className="wide block font-display text-[16px] font-extrabold uppercase leading-none tracking-wide">Andry Huang</span>
            <span className="mt-0.5 block font-mono text-[10px] tracking-[0.14em] text-muted">andryhuang.com</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]">
          <Link href="/" className="rounded-full bg-fg px-4 py-2.5 font-semibold text-bg transition-colors duration-500 ease-studio hover:bg-accent hover:text-accent-fg">← Back to Portfolio</Link>
        </nav>
      </header>
      <main id="main">{children}</main>
      <footer className="mx-auto mt-24 flex max-w-[1400px] flex-col gap-3 border-t border-line px-5 py-10 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:flex-row md:justify-between md:px-10">
        <span>Built by Andry Huang · Surabaya, Indonesia</span>
        <span>Demo content is fictional. Brand: Your Brand.</span>
      </footer>
    </div>
  );
}
