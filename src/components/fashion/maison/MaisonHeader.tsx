"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { easeSnap, easeStudio } from "@/components/motion/ease";
import { maison } from "@/content/fashion/maison";
import { useMenu } from "@/lib/use-menu";
import { useAnchorScroll } from "./anchor";

export function MaisonHeader() {
  const { open, setOpen, closeRef } = useMenu();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const go = useAnchorScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 48));

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-700 ease-studio ${
          scrolled ? "bg-bg/85 shadow-[0_1px_0_var(--t-line)] backdrop-blur-md" : ""
        }`}
      >
        <div className="mx-auto grid max-w-[1700px] grid-cols-[1fr_auto_1fr] items-center px-5 py-1.5 md:px-10 md:py-3">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {maison.nav.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => go(e, link.href)} className="maison-caps group relative block py-3">
                    {link.label}
                    <span className="absolute inset-x-0 bottom-2 h-px origin-right scale-x-0 bg-current transition-transform duration-700 ease-studio group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="maison-menu"
            className="maison-caps min-h-11 cursor-pointer justify-self-start pr-4 md:hidden"
          >
            Menu
          </button>
          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            aria-label="Your Brand, back to top"
            className="flex min-h-11 items-center font-display text-[1.05rem] uppercase tracking-[0.32em] sm:text-xl md:text-[1.7rem]"
          >
            Your Brand
          </a>
          <a
            href="#appointments"
            onClick={(e) => go(e, "#appointments")}
            className="maison-caps group relative flex min-h-11 items-center justify-self-end"
          >
            <span className="relative">
              <span className="hidden sm:inline">Book a fitting</span>
              <span className="sm:hidden">Book</span>
              <span className="absolute inset-x-0 -bottom-1 h-px bg-accent" />
            </span>
          </a>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="maison-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.9, ease: easeSnap }}
            className="fixed inset-0 z-[70] flex flex-col bg-accent px-5 py-3 text-accent-fg"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-[1.05rem] uppercase tracking-[0.32em]">Your Brand</span>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="maison-caps min-h-11 cursor-pointer pl-4">
                Close
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-auto">
              <ul>
                {maison.nav.map((link, i) => (
                  <li key={link.href} className="overflow-hidden border-t border-accent-fg/20">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, ease: easeStudio, delay: 0.3 + i * 0.07 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          go(e, link.href, 140);
                          setOpen(false);
                        }}
                        className="flex items-baseline gap-4 py-3.5 font-display text-[2.9rem] font-light leading-none"
                      >
                        <span className="maison-caps w-6 text-accent-fg/60">{String(i + 1).padStart(2, "0")}</span>
                        {link.label}
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="maison-caps mt-8 flex flex-wrap justify-between gap-3 pb-4 text-accent-fg/80">
              <span>{maison.email}</span>
              <span>{maison.city}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
