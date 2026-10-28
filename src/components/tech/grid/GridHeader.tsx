"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { easeSnap, easeStudio } from "@/components/motion/ease";
import { grid } from "@/content/tech/grid";
import { useMenu } from "@/lib/use-menu";
import { GridButton } from "./GridButton";

export function GridMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="0.75" y="0.75" width="22.5" height="22.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 .75v22.5M16 .75v22.5M.75 8h22.5M.75 16h22.5" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <rect x="8" y="8" width="8" height="8" fill="var(--t-accent)" />
    </svg>
  );
}

export function GridHeader() {
  const { open, setOpen, closeRef } = useMenu();
  return (
    <>
      <a href="#main" className="sr-only z-[100] bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
          <Link href="#top" className="flex items-center gap-3 text-[1.15rem] font-bold leading-none tracking-tight" aria-label="Your Brand home">
            <GridMark />
            Your Brand
          </Link>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {grid.nav.map((n, i) => (
                <li key={n.href}>
                  <a href={n.href} className="group mono flex min-h-11 items-center gap-2 text-fg/70 transition-colors hover:text-fg">
                    <span className="text-fg/35 transition-colors group-hover:text-accent">0{i + 1}</span>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <p className="mono hidden items-center gap-2 text-fg/60 xl:flex">
              <span className="size-1.5 bg-fg" aria-hidden />
              All systems operational
            </p>
            <div className="hidden sm:block">
              <GridButton href="#contact">Get an API key</GridButton>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="grid-menu"
              className="mono flex min-h-11 min-w-11 cursor-pointer items-center justify-center px-2 lg:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="grid-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: easeSnap }}
            className="fixed inset-0 z-[70] flex flex-col bg-bg px-5 pb-28 pt-0"
          >
            <div className="flex h-16 items-center justify-between">
              <span className="flex items-center gap-3 text-[1.15rem] font-bold leading-none">
                <GridMark />
                Your Brand
              </span>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="mono min-h-11 min-w-11 cursor-pointer px-2">
                Close
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-auto">
              <ul className="border-t border-line">
                {grid.nav.map((n, i) => (
                  <li key={n.href} className="overflow-hidden border-b border-line">
                    <motion.div initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.7, ease: easeStudio, delay: 0.2 + i * 0.05 }}>
                      <a href={n.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-4 text-[clamp(2.6rem,13vw,4rem)] font-extrabold leading-none tracking-[-0.04em]">
                        <span className="mono w-6 text-accent">0{i + 1}</span>
                        {n.label}
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8" onClick={() => setOpen(false)}>
              <GridButton href="#contact" size="lg">
                Get an API key
              </GridButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
