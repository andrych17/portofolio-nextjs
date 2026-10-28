"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowIsland } from "@/components/ArrowIsland";
import { easeStudio } from "@/components/motion/ease";
import { atelier } from "@/content/atelier";
import { pagePath, pages } from "@/content/types";
import { useMenu } from "@/lib/use-menu";

export function AtelierHeader() {
  const pathname = usePathname();
  const { open, setOpen, closeRef } = useMenu();
  const nav = pages.filter((p) => p.slug !== "contact");

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 rounded-full bg-bg/75 py-2 pl-5 pr-2 ring-1 ring-black/[0.06] backdrop-blur-xl">
          <Link href="/showcase/agency/atelier" className="flex items-baseline gap-2" aria-label="Your Brand home">
            <span className="font-display text-2xl italic leading-none tracking-tight">Your Brand</span>
            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-muted sm:inline">est. {atelier.founded}</span>
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center rounded-full bg-surface/80 p-1 ring-1 ring-black/[0.04]">
              {nav.map((page) => {
                const href = pagePath("atelier", page.slug);
                const active = pathname === href;
                return (
                  <li key={page.slug} className="relative">
                    {active && (
                      <motion.span
                        layoutId="atelier-nav"
                        className="absolute inset-0 rounded-full bg-bg shadow-[0_1px_2px_rgba(28,27,24,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`relative block rounded-full px-5 py-2 text-sm transition-colors ${active ? "text-fg" : "text-fg/65 hover:text-fg"}`}
                    >
                      {page.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/showcase/agency/atelier/contact"
              className="group hidden items-center gap-3 rounded-full bg-accent py-1.5 pl-5 pr-1.5 text-sm font-medium text-accent-fg sm:inline-flex"
            >
              Book a visit
              <ArrowIsland className="size-8 bg-white/15" size={14} />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="atelier-menu"
              className="flex size-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full bg-surface md:hidden"
            >
              <span className="sr-only">Open menu</span>
              <span className="h-[1.5px] w-5 bg-fg" />
              <span className="h-[1.5px] w-5 bg-fg" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="atelier-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[70] bg-fg/30 p-3 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: "-105%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-105%" }}
              transition={{ duration: 0.7, ease: easeStudio }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-[2rem] bg-bg p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl italic">Your Brand</span>
                <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="cursor-pointer rounded-full bg-surface px-4 py-2 text-sm">
                  Close
                </button>
              </div>
              <ul className="mt-10 space-y-1">
                {pages.map((page, i) => (
                  <motion.li
                    key={page.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: easeStudio, delay: 0.15 + i * 0.05 }}
                  >
                    <Link
                      href={pagePath("atelier", page.slug)}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between border-b border-line py-3 font-display text-4xl"
                    >
                      {page.label}
                      <span className="font-sans text-xs text-muted">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
