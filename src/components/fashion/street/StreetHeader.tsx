"use client";

import { AnimatePresence, motion } from "motion/react";
import { easeSnap, easeStudio } from "@/components/motion/ease";
import { Marquee } from "@/components/motion/Marquee";
import { street } from "@/content/fashion/street";
import { useMenu } from "@/lib/use-menu";
import { useAnchorScroll } from "./anchor";
import { useBag } from "./StreetBag";

export function StreetHeader() {
  const { open, setOpen, closeRef } = useMenu();
  const bag = useBag();
  const go = useAnchorScroll();

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <div className="bg-accent text-accent-fg">
        <Marquee speed={-1.6} className="py-2">
          {street.announce.map((item) => (
            <span key={item} className="street-tag flex items-center gap-6 pr-6">
              {item}
              <span aria-hidden className="size-1.5 rotate-45 bg-accent-fg" />
            </span>
          ))}
        </Marquee>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
        <div className="mx-auto grid max-w-[1700px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-10">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {street.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => go(e, link.href)} className="street-tag group relative block py-5">
                    {link.label}
                    <span className="absolute inset-x-0 bottom-3.5 h-0.5 origin-right scale-x-0 bg-accent transition-transform duration-500 ease-studio group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="street-menu"
            className="street-tag min-h-14 cursor-pointer justify-self-start pr-4 md:hidden"
          >
            Menu
          </button>

          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            aria-label="Your Brand, back to top"
            className="flex min-h-14 items-center font-display text-xl uppercase leading-none tracking-[-0.01em] md:text-2xl"
          >
            Your Brand<span className="text-accent">*</span>
          </a>

          <button
            type="button"
            onClick={() => bag.setOpen(true)}
            aria-haspopup="dialog"
            aria-controls="street-bag"
            className="street-tag group flex min-h-14 cursor-pointer items-center gap-2 justify-self-end"
          >
            Bag
            <span
              aria-label={`${bag.count} items in bag`}
              className={`flex min-w-7 items-center justify-center px-1.5 py-1 transition-colors duration-500 ${bag.count > 0 ? "bg-accent text-accent-fg" : "bg-fg/10"}`}
            >
              {bag.count}
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="street-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: easeSnap }}
            className="fixed inset-0 z-[70] flex flex-col bg-accent px-5 py-3 text-accent-fg"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl uppercase">Your Brand*</span>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="street-tag min-h-11 cursor-pointer pl-4">
                Close
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-auto">
              <ul>
                {street.nav.map((link, i) => (
                  <li key={link.href} className="overflow-hidden border-t-2 border-accent-fg">
                    <motion.div initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.8, ease: easeStudio, delay: 0.25 + i * 0.07 }}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          go(e, link.href, 140);
                          setOpen(false);
                        }}
                        className="flex items-baseline justify-between py-3 font-display text-[3.2rem] uppercase leading-none"
                      >
                        {link.label}
                        <span className="street-tag">0{i + 1}</span>
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="street-tag mt-8 flex flex-wrap justify-between gap-3 pb-4">
              <span>{street.email}</span>
              <span>{street.nextDrop}: Friday 18:00</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
