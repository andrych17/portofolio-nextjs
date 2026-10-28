"use client";

import { AnimatePresence, motion } from "motion/react";
import { easeSnap, easeStudio } from "@/components/motion/ease";
import { salt } from "@/content/fashion/salt";
import { useMenu } from "@/lib/use-menu";
import { useAnchorScroll } from "./anchor";
import { ShadeDots, useShade } from "./SaltShade";

export function SaltHeader() {
  const { open, setOpen, closeRef } = useMenu();
  const go = useAnchorScroll();
  const { next } = useShade();

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-full bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
        <div className="mx-auto grid max-w-[1700px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-10">
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {salt.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => go(e, link.href)} className="salt-caps group relative block py-5">
                    {link.label}
                    <span className="absolute inset-x-0 bottom-3.5 h-px origin-right scale-x-0 bg-current transition-transform duration-500 ease-studio group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="salt-menu"
            className="salt-caps min-h-14 cursor-pointer justify-self-start pr-4 lg:hidden"
          >
            Menu
          </button>

          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            aria-label="Your Brand, back to top"
            className="flex min-h-14 items-center font-display text-[1.45rem] leading-none md:text-[1.75rem]"
          >
            Your Brand
          </a>

          <div className="flex items-center justify-self-end">
            <ShadeDots className="hidden md:flex" size="size-5" />
            <button
              type="button"
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                next({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
              }}
              className="salt-caps min-h-14 cursor-pointer pl-3 md:hidden"
            >
              Shade
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="salt-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "circle(0% at 12% 4%)" }}
            animate={{ clipPath: "circle(150% at 12% 4%)" }}
            exit={{ clipPath: "circle(0% at 12% 4%)" }}
            transition={{ duration: 0.9, ease: easeSnap }}
            className="fixed inset-0 z-[70] flex flex-col bg-[var(--l-paper)] px-5 py-3 text-[var(--l-ink)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-[1.45rem]">Your Brand</span>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="salt-caps min-h-11 cursor-pointer pl-4">
                Close
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-auto">
              <ul>
                {salt.nav.map((link, i) => (
                  <li key={link.href} className="overflow-hidden border-t border-[var(--l-ink)]/20">
                    <motion.div initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.8, ease: easeStudio, delay: 0.3 + i * 0.07 }}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          go(e, link.href, 140);
                          setOpen(false);
                        }}
                        className="flex items-baseline justify-between py-3 font-display text-[2.9rem] leading-none"
                      >
                        {link.label}
                        <span className="salt-caps">0{i + 1}</span>
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="salt-caps mt-8 flex flex-wrap justify-between gap-3 pb-4">
              <span>{salt.email}</span>
              <span>{salt.city}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
