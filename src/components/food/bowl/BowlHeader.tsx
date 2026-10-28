"use client";

import { ArrowUpRightIcon, ListIcon, PlantIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { easeSnap, easeStudio } from "@/components/motion/ease";
import { bowl } from "@/content/food/bowl";
import { useMenu } from "@/lib/use-menu";

export function BowlHeader() {
  const { open, setOpen, closeRef } = useMenu();
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 30));

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 transition-all duration-300">
        <span
          aria-hidden
          className={`absolute inset-0 bg-bg/90 shadow-[0_1px_0_0_var(--t-line)] backdrop-blur-md transition-opacity duration-300 ${
            solid ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="relative mx-auto flex max-w-[1500px] items-center justify-between px-5 py-3 md:px-10 md:py-4">
          <a href="#top" className="flex min-h-11 items-center gap-2.5" aria-label="Your Brand, back to top">
            <span className="flex size-9 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30">
              <PlantIcon size={20} weight="fill" aria-hidden />
            </span>
            <span className="font-display text-[1.65rem] font-semibold leading-none tracking-tight">Your Brand</span>
          </a>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-8 text-[14px] font-medium text-fg/80">
              {bowl.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="group relative block py-2 transition-colors hover:text-accent">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-300 ease-studio group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#builder"
              className="hidden min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-[14px] font-semibold text-accent-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] transition-transform duration-300 ease-studio hover:scale-[1.03] sm:inline-flex"
            >
              <span>Build Bowl</span>
              <ArrowUpRightIcon size={16} weight="bold" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="bowl-menu"
              aria-label="Open navigation menu"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full ring-1 ring-fg/20 md:hidden"
            >
              <ListIcon size={22} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="bowl-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: easeSnap }}
            className="fixed inset-0 z-[70] flex flex-col bg-bg/98 px-6 py-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="font-display text-[1.5rem] font-semibold">Your Brand</span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full ring-1 ring-fg/20"
              >
                <XIcon size={20} aria-hidden />
              </button>
            </div>
            <nav aria-label="Mobile" className="my-auto py-6">
              <ul className="space-y-4">
                {bowl.nav.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block font-display text-[2rem] font-medium text-fg transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-line pt-4 text-sm text-muted">
              <p>{bowl.hours[0].days}: {bowl.hours[0].time}</p>
              <p className="mt-1">{bowl.street}, {bowl.city}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
