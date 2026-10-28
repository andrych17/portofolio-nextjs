import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowIsland } from "@/components/ArrowIsland";
import { galleryFonts } from "@/fonts/gallery";
import "./gallery.css";

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`theme-gallery ${galleryFonts} min-h-dvh font-sans text-fg`}>
      <header className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-10 md:py-7">
        <Link href="/" className="flex items-center gap-3" aria-label="Andry Huang, home">
          <span className="wide grid size-10 place-items-center rounded-full bg-accent font-display text-[13px] font-extrabold text-accent-fg">AH</span>
          <span className="wide hidden font-display text-[17px] font-extrabold uppercase tracking-wide sm:block">Andry Huang</span>
        </Link>
        <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]">
          <Link href="/" className="rounded-full px-4 py-2.5 transition-colors duration-500 ease-studio hover:bg-fg/10">← Portfolio</Link>
          <Link href="/#contact" className="group flex items-center gap-2 rounded-full bg-accent py-1.5 pl-4 pr-1.5 font-semibold text-accent-fg">
            Hire me
            <ArrowIsland className="size-7 bg-black/15" size={13} />
          </Link>
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
