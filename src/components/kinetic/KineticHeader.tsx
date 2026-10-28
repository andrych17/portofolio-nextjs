"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { easeStudio } from "@/components/motion/ease";
import { kinetic } from "@/content/kinetic";
import { pagePath, pages } from "@/content/types";
import { useMenu } from "@/lib/use-menu";
import { Scoop } from "./Scoop";

const menuColors = ["bg-k-yellow", "bg-k-pink", "bg-k-lime", "bg-k-blue text-white", "bg-accent"];

export function KineticHeader() {
  const pathname = usePathname();
  const { open, setOpen, closeRef } = useMenu();
  const nav = pages.filter((p) => p.slug && p.slug !== "contact");

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-full border-2 border-k-ink bg-k-yellow px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 rounded-full border-2 border-k-ink bg-white py-1.5 pl-3 pr-1.5 shadow-[4px_4px_0_0_#121212]">
          <Link href="/template/agency/kinetic" className="group flex items-center gap-2" aria-label={`${kinetic.name} home`}>
            <Scoop className="h-9 w-8 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-12 group-hover:scale-110" />
            <span className="font-display text-xl font-black uppercase tracking-tight">{kinetic.name}</span>
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((page) => {
                const href = pagePath("kinetic", page.slug);
                const active = pathname === href;
                return (
                  <li key={page.slug} className="relative">
                    {active && <motion.span layoutId="kinetic-nav" className="absolute inset-0 rounded-full bg-k-ink" transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`relative block rounded-full px-5 py-2 font-display text-sm font-bold uppercase transition-colors ${active ? "text-white" : "hover:bg-k-yellow"}`}
                    >
                      {page.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href="/template/agency/kinetic/contact"
              className="hidden rounded-full border-2 border-k-ink bg-accent px-5 py-2 font-display text-sm font-extrabold uppercase transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-rotate-3 hover:scale-105 sm:block"
            >
              Let&apos;s talk
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="kinetic-menu"
              className="flex size-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border-2 border-k-ink bg-k-yellow md:hidden"
            >
              <span className="sr-only">Open menu</span>
              <span className="h-0.5 w-5 bg-k-ink" />
              <span className="h-0.5 w-5 bg-k-ink" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="kinetic-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[70] flex flex-col bg-bg p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.25 } }}
          >
            <div className="flex items-center justify-between rounded-full border-2 border-k-ink bg-white py-1.5 pl-4 pr-1.5">
              <span className="font-display text-xl font-black uppercase">{kinetic.name}</span>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="cursor-pointer rounded-full border-2 border-k-ink bg-k-ink px-4 py-2 text-sm font-bold uppercase text-white">
                Close
              </button>
            </div>
            <ul className="mt-3 flex flex-1 flex-col gap-2">
              {pages.map((page, i) => (
                <motion.li
                  key={page.slug}
                  className="flex-1"
                  initial={{ x: "-110%", rotate: -4 }}
                  animate={{ x: 0, rotate: 0 }}
                  exit={{ x: "110%", rotate: 4 }}
                  transition={{ duration: 0.6, ease: easeStudio, delay: i * 0.05 }}
                >
                  <Link
                    href={pagePath("kinetic", page.slug)}
                    onClick={() => setOpen(false)}
                    className={`flex h-full items-center justify-between rounded-[1.5rem] border-2 border-k-ink px-5 font-display text-4xl font-black uppercase ${menuColors[i]}`}
                  >
                    {page.label}
                    <span className="text-base">0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
