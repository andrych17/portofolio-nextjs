"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { easeSnap, easeStudio } from "@/components/motion/ease";
import { atrium } from "@/content/property/atrium";
import { useMenu } from "@/lib/use-menu";
import { AtriumButton } from "./AtriumButton";

export function AtriumMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden>
      <rect x="0.75" y="0.75" width="26.5" height="26.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="9" width="10" height="10" fill="var(--t-accent)" />
    </svg>
  );
}

export function AtriumHeader() {
  const { open, setOpen, closeRef } = useMenu();
  return (
    <>
      <a href="#main" className="sr-only z-[100] bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-fg/15 bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[4.25rem] max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
          <Link href="#top" className="flex items-center gap-3 font-display text-[1.55rem] font-medium leading-none tracking-[-0.03em]" aria-label="Your Brand home">
            <AtriumMark />
            Your Brand
          </Link>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {atrium.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="group flex min-h-11 items-center gap-2 text-[14.5px] text-fg/75 transition-colors hover:text-fg">
                    <span className="font-mono text-[10.5px] text-fg/45 transition-colors group-hover:text-[var(--a-text)]">{n.level}</span>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <AtriumButton href="#viewing" variant="ink">
                Book a viewing
              </AtriumButton>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="atrium-menu"
              className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-2 px-2 font-mono text-[12px] uppercase tracking-[0.12em] lg:hidden"
            >
              Menu
              <span aria-hidden className="grid gap-[5px]">
                <span className="block h-px w-5 bg-fg" />
                <span className="block h-px w-3 bg-fg" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="atrium-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            exit={{ clipPath: "inset(0 0 0 100%)" }}
            transition={{ duration: 0.75, ease: easeSnap }}
            className="atrium-cols-dark fixed inset-0 z-[70] flex flex-col bg-[var(--a-ink)] px-5 pb-28 text-bg"
          >
            <div className="flex h-[4.25rem] items-center justify-between">
              <span className="flex items-center gap-3 font-display text-[1.55rem] font-medium leading-none tracking-[-0.03em]">
                <AtriumMark />
                Your Brand
              </span>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="min-h-11 min-w-11 cursor-pointer px-2 font-mono text-[12px] uppercase tracking-[0.12em]">
                Close
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-auto">
              <ul className="border-t border-white/20">
                {atrium.nav.map((n, i) => (
                  <li key={n.href} className="overflow-hidden border-b border-white/20">
                    <motion.div initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.75, ease: easeStudio, delay: 0.2 + i * 0.06 }}>
                      <a href={n.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-3.5 font-display text-[clamp(2.8rem,14vw,4.6rem)] leading-none">
                        <span className="w-9 font-mono text-[12px] tracking-[0.1em] text-accent">{n.level}</span>
                        {n.label}
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8" onClick={() => setOpen(false)}>
              <AtriumButton href="#viewing" size="lg">
                Book a viewing
              </AtriumButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
