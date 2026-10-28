"use client";

import { FlameIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { easeSnap, easeStudio } from "@/components/motion/ease";
import { ember } from "@/content/food/ember";
import { useMenu } from "@/lib/use-menu";

export function EmberHeader() {
  const { open, setOpen, closeRef } = useMenu();
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 48));

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50">
        <span
          aria-hidden
          className={`absolute inset-0 bg-bg/85 shadow-[0_1px_0_0_var(--t-line)] backdrop-blur-md transition-opacity duration-500 ease-studio ${
            solid ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="relative mx-auto flex max-w-[1500px] items-center justify-between px-5 py-3 md:px-10 md:py-4">
          <a href="#top" className="flex min-h-11 items-center gap-2.5" aria-label="Your Brand, back to top">
            <span className="flex size-9 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/40">
              <FlameIcon size={18} weight="fill" aria-hidden />
            </span>
            <span className="font-display text-[1.75rem] leading-none tracking-tight">Your Brand</span>
          </a>
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-10 text-[13px] font-medium uppercase tracking-[0.18em] text-fg/80">
              {ember.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="group relative block py-3 transition-colors hover:text-fg">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-500 ease-studio group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#visit"
              className="hidden min-h-11 items-center rounded-full bg-accent px-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-accent-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-transform duration-500 ease-studio hover:scale-[1.03] sm:inline-flex"
            >
              Reserve
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="ember-menu"
              aria-label="Open menu"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full ring-1 ring-fg/25 md:hidden"
            >
              <ListIcon size={20} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="ember-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "circle(0% at 90% 4%)" }}
            animate={{ clipPath: "circle(150% at 90% 4%)" }}
            exit={{ clipPath: "circle(0% at 90% 4%)" }}
            transition={{ duration: 0.8, ease: easeSnap }}
            className="fixed inset-0 z-[70] flex flex-col bg-surface px-5 py-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-[1.75rem] leading-none">Your Brand</span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full ring-1 ring-fg/25"
              >
                <XIcon size={20} aria-hidden />
              </button>
            </div>
            <nav aria-label="Mobile" className="my-auto">
              <ul>
                {[...ember.nav, { href: "#faq", label: "Questions" }].map((link, i) => (
                  <li key={link.href} className="overflow-hidden border-b border-line">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, ease: easeStudio, delay: 0.25 + i * 0.06 }}
                    >
                      <a href={link.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-3.5 font-display text-[3.2rem] leading-none">
                        <span className="font-sans text-xs text-accent">0{i + 1}</span>
                        {link.label}
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="space-y-4 pb-24">
              <a
                href="#visit"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-full bg-accent text-[15px] font-semibold text-accent-fg"
              >
                Reserve a table
              </a>
              <p className="text-center text-sm text-muted">{ember.phone} · {ember.email}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
