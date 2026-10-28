"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { easeSnap, easeStudio } from "@/components/motion/ease";
import { estate } from "@/content/property/estate";
import { useMenu } from "@/lib/use-menu";

const links = estate.footerNav.slice(0, 4);

function Mark() {
  return (
    <span aria-hidden className="relative inline-block size-2.5 rotate-45 bg-accent">
      <span className="absolute inset-[3px] bg-[#0f2a20]" />
    </span>
  );
}

export function EstateHeader() {
  const { open, setOpen, closeRef } = useMenu();
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 60));

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-700 ease-studio ${
          solid ? "bg-[#f6f2ea]/85 text-fg shadow-[0_1px_0_var(--t-line)] backdrop-blur-xl" : "text-[#f6f2ea]"
        }`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-3 md:px-10 md:py-4">
          <Link href="/showcase/property/estate" className="flex items-center gap-3 whitespace-nowrap font-display text-[1.65rem] leading-none" aria-label="Your Brand home">
            <Mark />
            Your Brand
          </Link>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[12px] font-semibold uppercase tracking-[0.18em]">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group relative block py-2">
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-500 ease-studio group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-accent px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.16em] text-accent-fg transition-colors duration-500 hover:bg-[#c29d57] lg:inline-block"
            >
              Book a viewing
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="estate-menu"
              className="flex h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-[12px] font-bold uppercase tracking-[0.18em] ring-1 ring-current/30 lg:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="estate-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "circle(0% at 88% 4%)" }}
            animate={{ clipPath: "circle(150% at 88% 4%)" }}
            exit={{ clipPath: "circle(0% at 88% 4%)" }}
            transition={{ duration: 0.9, ease: easeSnap }}
            className="fixed inset-0 z-[70] flex flex-col bg-[#0f2a20] px-5 pb-24 pt-3 text-[#f6f2ea]"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-3 font-display text-[1.65rem] leading-none">
                <Mark />
                Your Brand
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 cursor-pointer items-center rounded-full px-4 text-[12px] font-bold uppercase tracking-[0.18em] ring-1 ring-white/30"
              >
                Close
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-auto">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {estate.footerNav.map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, ease: easeStudio, delay: 0.3 + i * 0.06 }}
                    >
                      <a href={l.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-3 font-display text-[2.6rem] leading-none">
                        {l.label}
                        <span className="text-xs font-semibold tracking-[0.2em] text-[#d6b571]">0{i + 1}</span>
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="mt-8 text-sm text-[#f6f2ea]/70">
              {estate.email}
              <br />
              {estate.phone}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
