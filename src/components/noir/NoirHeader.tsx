"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LocalTime } from "@/components/LocalTime";
import { easeSnap, easeStudio } from "@/components/motion/ease";
import { noir } from "@/content/noir";
import { pagePath, pages } from "@/content/types";
import { useMenu } from "@/lib/use-menu";

export function NoirHeader() {
  const pathname = usePathname();
  const { open, setOpen, closeRef } = useMenu();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > previous && y > 240);
  });

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <motion.header
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.7, ease: easeStudio }}
        className="fixed inset-x-0 top-0 z-50 text-[#ece7dd] mix-blend-difference"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 md:px-10 md:py-7">
          <Link href="/showcase/agency/noir" className="font-display text-[1.9rem] leading-none tracking-tight" aria-label="Your Brand home">
            Your Brand<sup className="ml-0.5 font-sans text-[9px]">®</sup>
          </Link>
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-9 text-[12px] uppercase tracking-[0.2em]">
              {pages.map((page) => {
                const href = pagePath("noir", page.slug);
                const active = pathname === href;
                return (
                  <li key={page.slug}>
                    <Link href={href} aria-current={active ? "page" : undefined} className="group relative block py-1">
                      {page.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px w-full bg-current transition-transform duration-500 ease-studio ${
                          active ? "scale-x-100" : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-5">
            <p className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] lg:flex">
              <span className="size-1.5 animate-blink rounded-full bg-current" />
              {noir.city} <LocalTime timeZone={noir.timeZone} />
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="noir-menu"
              className="cursor-pointer text-[12px] uppercase tracking-[0.2em] md:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="noir-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: easeSnap }}
            className="fixed inset-0 z-[70] flex flex-col bg-accent px-5 py-5 text-accent-fg"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-[1.9rem] leading-none">Your Brand</span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer text-[12px] uppercase tracking-[0.2em]"
              >
                Close
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-auto">
              <ul>
                {pages.map((page, i) => (
                  <li key={page.slug} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, ease: easeStudio, delay: 0.25 + i * 0.06 }}
                    >
                      <Link
                        href={pagePath("noir", page.slug)}
                        onClick={() => setOpen(false)}
                        className="block font-display text-[17vw] leading-[0.95]"
                      >
                        {page.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="mt-10 text-sm">{noir.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
