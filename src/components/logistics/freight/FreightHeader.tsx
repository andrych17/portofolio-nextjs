"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { easeSnap, easeStudio } from "@/components/motion/ease";
import { freight } from "@/content/logistics/freight";
import { useMenu } from "@/lib/use-menu";

export function FreightHeader() {
  const { open, setOpen, closeRef } = useMenu();
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-full bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 ease-studio ${solid ? "bg-bg/80 backdrop-blur-xl ring-1 ring-line" : ""}`}>
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-3.5 md:px-10 md:py-4">
          <a href="#top" className="flex items-center gap-2.5 font-display text-[1.45rem] font-semibold leading-none" aria-label="Your Brand home">
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
              <circle cx="13" cy="13" r="12" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M3 17C8 6 18 6 23 17" fill="none" stroke="var(--t-accent)" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="23" cy="17" r="2.4" fill="var(--t-accent)" />
            </svg>
            Your Brand
          </a>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[13px] tracking-wide text-fg/80">
              {freight.nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group relative block py-2 transition-colors hover:text-fg">
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-500 ease-studio group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#track" className="hidden rounded-full px-4 py-2.5 text-[13px] text-fg/80 ring-1 ring-line transition-colors hover:text-fg hover:ring-fg/40 sm:block">
              Track a shipment
            </a>
            <a href="#contact" className="hidden rounded-full bg-accent px-5 py-2.5 text-[13px] font-semibold text-accent-fg transition-transform duration-500 ease-studio hover:scale-[1.04] md:block">
              Get a quote
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="freight-menu"
              aria-label="Open menu"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full ring-1 ring-line lg:hidden"
            >
              <ListIcon size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="freight-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: easeSnap }}
            className="fixed inset-0 z-[70] flex flex-col bg-surface px-5 pb-24 pt-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-[1.45rem] font-semibold">Your Brand</span>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="flex size-11 cursor-pointer items-center justify-center rounded-full ring-1 ring-line">
                <XIcon size={20} />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-auto">
              <ul>
                {freight.nav.map((l, i) => (
                  <li key={l.href} className="overflow-hidden border-t border-line">
                    <motion.div initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.7, ease: easeStudio, delay: 0.2 + i * 0.05 }}>
                      <a href={l.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-3.5 font-display text-[2.6rem] font-semibold leading-none">
                        {l.label}
                        <span className="font-mono text-xs text-muted">0{i + 1}</span>
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <a href="#contact" onClick={() => setOpen(false)} className="rounded-full bg-accent py-4 text-center font-semibold text-accent-fg">
                Get a quote
              </a>
              <a href="#track" onClick={() => setOpen(false)} className="rounded-full py-4 text-center ring-1 ring-line">
                Track a shipment
              </a>
            </div>
            <p className="mt-6 pb-2 font-mono text-xs text-muted">{freight.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
