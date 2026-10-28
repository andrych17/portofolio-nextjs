"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { easeSnap, easeStudio } from "@/components/motion/ease";
import { pulse } from "@/content/tech/pulse";
import { useMenu } from "@/lib/use-menu";
import { PulseButton } from "./PulseButton";

export function PulseMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden>
      <rect width="28" height="28" rx="9" fill="var(--t-accent)" />
      <path d="M3.5 15h5l2.8-7 4 12.5 2.6-5.5h6.6" fill="none" stroke="var(--t-accent-fg)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PulseHeader() {
  const { open, setOpen, closeRef } = useMenu();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-full bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between rounded-full bg-[#0a0a08]/75 py-1.5 pl-4 pr-1.5 ring-1 ring-fg/10 backdrop-blur-xl">
          <Link href="#top" className="flex items-center gap-2.5 font-display text-[1.35rem] leading-none" aria-label="Your Brand home">
            <PulseMark />
            Your Brand
          </Link>
          <nav aria-label="Main" className="hidden md:block" onPointerLeave={() => setHovered(null)}>
            <ul className="flex items-center">
              {pulse.nav.map((item) => (
                <li key={item.href} className="relative">
                  <a href={item.href} onPointerEnter={() => setHovered(item.href)} onFocus={() => setHovered(item.href)} onBlur={() => setHovered(null)} className="relative block px-4 py-2.5 text-[13px] text-fg/70 transition-colors hover:text-fg">
                    {hovered === item.href && (
                      <motion.span layoutId="pulse-nav" className="absolute inset-0 rounded-full bg-fg/[0.07]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <PulseButton href="#contact">Book a demo</PulseButton>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="pulse-menu"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-fg/[0.07] md:hidden"
              aria-label="Open menu"
            >
              <span className="flex w-4 flex-col gap-[5px]" aria-hidden>
                <i className="h-[1.5px] bg-fg" />
                <i className="h-[1.5px] w-2/3 bg-fg" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="pulse-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: easeSnap }}
            className="fixed inset-0 z-[70] flex flex-col bg-bg px-5 pb-28 pt-4"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 font-display text-[1.35rem] leading-none">
                <PulseMark />
                Your Brand
              </span>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-fg/[0.07] text-sm" aria-label="Close menu">
                <span className="relative size-4" aria-hidden>
                  <i className="absolute inset-x-0 top-1/2 h-[1.5px] rotate-45 bg-fg" />
                  <i className="absolute inset-x-0 top-1/2 h-[1.5px] -rotate-45 bg-fg" />
                </span>
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-auto">
              <ul className="divide-y divide-line border-y border-line">
                {pulse.nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.7, ease: easeStudio, delay: 0.2 + i * 0.06 }}>
                      <a href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-5 font-display text-5xl leading-none">
                        {item.label}
                        <span className="font-mono text-xs text-muted">0{i + 1}</span>
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8" onClick={() => setOpen(false)}>
              <PulseButton href="#contact" size="lg">
                Book a demo
              </PulseButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
