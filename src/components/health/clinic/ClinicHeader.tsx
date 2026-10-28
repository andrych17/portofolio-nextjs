"use client";

import { PhoneCallIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { easeSnap, easeStudio } from "@/components/motion/ease";
import { clinic } from "@/content/health/clinic";
import { useMenu } from "@/lib/use-menu";

const tel = clinic.emergencyPhone.replace(/\s/g, "");

export function ClinicHeader() {
  const { open, setOpen, closeRef } = useMenu();

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <div className="relative z-[60] bg-accent text-fg">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-2 text-[13px] font-semibold md:px-8">
          <p className="flex items-center gap-2.5 whitespace-nowrap">
            <span aria-hidden className="relative flex size-2 text-fg">
              <span className="clinic-ring" />
              <span className="relative size-2 rounded-full bg-fg" />
            </span>
            <span className="sm:hidden">Emergency desk 24/7</span>
            <span className="hidden sm:inline">Emergency desk open 24 hours</span>
          </p>
          <a href={`tel:${tel}`} className="flex items-center gap-2 whitespace-nowrap underline-offset-4 hover:underline">
            <PhoneCallIcon size={16} weight="bold" aria-hidden />
            <span className="hidden sm:inline">Call</span> {clinic.emergencyPhone}
          </a>
        </div>
      </div>

      <header className="sticky top-3 z-50 px-3 md:px-6">
        <div className="mx-auto mt-3 flex max-w-[1180px] items-center justify-between rounded-full bg-[#fffdf8]/85 py-1.5 pl-5 pr-1.5 shadow-[0_18px_40px_-22px_rgba(14,53,53,0.45)] ring-1 ring-fg/10 backdrop-blur-xl">
          <a href="#top" className="flex items-center gap-2.5 font-display text-[1.45rem] font-semibold leading-none" aria-label="Your Brand home">
            <Mark />
            Your Brand
          </a>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1 text-[14px] font-semibold">
              {clinic.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="rounded-full px-4 py-2.5 transition-colors hover:bg-fg/[0.07]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1.5">
            <a
              href="#booking"
              className="hidden min-h-11 items-center rounded-full bg-fg px-5 text-[14px] font-semibold text-bg transition-transform duration-500 ease-studio hover:scale-[1.03] sm:inline-flex"
            >
              Book a visit
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="clinic-menu"
              className="min-h-11 cursor-pointer rounded-full bg-fg/[0.07] px-5 text-[14px] font-semibold lg:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="clinic-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.8, ease: easeSnap }}
            className="fixed inset-0 z-[90] flex flex-col bg-fg px-5 pb-24 pt-5 text-bg"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 font-display text-[1.45rem] font-semibold leading-none">
                <Mark />
                Your Brand
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-12 cursor-pointer place-items-center rounded-full bg-white/10"
              >
                <XIcon size={20} weight="bold" aria-hidden />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-auto">
              <ul>
                {[...clinic.nav, { label: "Book a visit", href: "#booking" }].map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-t border-white/10">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, ease: easeStudio, delay: 0.25 + i * 0.06 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex min-h-14 items-center justify-between py-3 font-display text-[2.4rem] leading-none ${
                          item.label === "Book a visit" ? "text-accent" : ""
                        }`}
                      >
                        {item.label}
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <a href={`tel:${tel}`} className="mt-8 flex items-center gap-3 rounded-2xl bg-accent px-5 py-4 text-fg">
              <PhoneCallIcon size={22} weight="bold" aria-hidden />
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.14em]">Emergency desk, 24 hours</span>
                <span className="text-lg font-bold">{clinic.emergencyPhone}</span>
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Mark() {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className="size-8">
      <rect width="32" height="32" rx="11" className="fill-current text-accent" />
      <path d="M13 8h6v5h5v6h-5v5h-6v-5H8v-6h5z" className="fill-[#0e3535]" />
    </svg>
  );
}
