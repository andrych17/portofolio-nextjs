"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { easeSnap, easeStudio } from "@/components/motion/ease";
import { foundry } from "@/content/property/foundry";
import { useMenu } from "@/lib/use-menu";
import { FoundryButton } from "./FoundryButton";

export function FoundryMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden>
      <rect width="28" height="28" fill="var(--t-accent)" />
      <path d="M0 28 28 0v8L8 28ZM12 28 28 12v8L20 28Z" fill="var(--t-fg)" />
    </svg>
  );
}

export function FoundryHeader() {
  const { open, setOpen, closeRef } = useMenu();
  return (
    <>
      <a href="#main" className="sr-only z-[100] bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-fg/25 bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-[4.25rem] max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
          <Link href="#top" className="flex items-center gap-3 font-display text-[1.7rem] leading-none" aria-label="Your Brand home">
            <FoundryMark />
            Your Brand
          </Link>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {foundry.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="flex min-h-11 items-center font-mono text-[11.5px] uppercase tracking-[0.14em] text-fg/70 transition-colors hover:text-fg">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <p className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg/60 xl:flex">
              <span className="size-2 animate-blink bg-accent ring-1 ring-fg" aria-hidden />
              24/7 on live sites
            </p>
            <div className="hidden sm:block">
              <FoundryButton href="#quote">Request a quote</FoundryButton>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="foundry-menu"
              className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center px-2 font-mono text-[12px] uppercase tracking-[0.14em] lg:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="foundry-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: easeSnap }}
            className="foundry-grid-dark fixed inset-0 z-[70] flex flex-col bg-[var(--f-char)] px-5 pb-28 text-bg"
          >
            <div className="flex h-[4.25rem] items-center justify-between">
              <span className="flex items-center gap-3 font-display text-[1.7rem] leading-none">
                <FoundryMark />
                Your Brand
              </span>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="min-h-11 min-w-11 cursor-pointer px-2 font-mono text-[12px] uppercase tracking-[0.14em]">
                Close
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-auto">
              <ul className="border-t border-white/20">
                {foundry.nav.map((n, i) => (
                  <li key={n.href} className="overflow-hidden border-b border-white/20">
                    <motion.div initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.7, ease: easeStudio, delay: 0.2 + i * 0.06 }}>
                      <a href={n.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-3 font-display text-[clamp(3.4rem,17vw,5.4rem)] leading-[0.95]">
                        <span className="w-8 font-mono text-[12px] tracking-[0.14em] text-accent">0{i + 1}</span>
                        {n.label}
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8" onClick={() => setOpen(false)}>
              <FoundryButton href="#quote" size="lg">
                Request a quote
              </FoundryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
