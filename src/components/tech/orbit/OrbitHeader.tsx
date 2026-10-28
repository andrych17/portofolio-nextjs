"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { easeSnap } from "@/components/motion/ease";
import { orbit } from "@/content/tech/orbit";

export function OrbitHeader() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-orbit-border bg-orbit-bg/80 backdrop-blur-xl transition-colors">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link href="#top" className="flex items-center gap-3 group">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orbit-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orbit-accent" />
            </span>
            <span className="font-heading text-lg font-bold tracking-tight text-orbit-fg group-hover:text-orbit-accent transition-colors">
              {orbit.name}
            </span>
            <span className="hidden sm:inline-flex items-center rounded-full bg-orbit-surface px-2.5 py-0.5 text-[11px] font-mono text-orbit-muted border border-orbit-border">
              v2.4-edge
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-orbit-muted">
            {orbit.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-orbit-fg transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#cluster"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-orbit-accent px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:bg-orbit-accent/90 transition-all hover:scale-[1.02]"
            >
              <span>Deploy Cluster</span>
              <ArrowUpRightIcon size={14} weight="bold" />
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="orbit-menu"
              aria-label="Open navigation menu"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-orbit-border bg-orbit-surface text-orbit-fg lg:hidden hover:bg-orbit-surface-hover"
            >
              <ListIcon size={20} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="orbit-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: easeSnap }}
            className="fixed inset-0 z-[70] flex flex-col bg-orbit-bg/98 px-6 py-6 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-orbit-border pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orbit-accent" />
                <span className="font-heading font-bold text-orbit-fg">{orbit.name}</span>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-orbit-border text-orbit-fg hover:bg-orbit-surface"
              >
                <XIcon size={20} aria-hidden />
              </button>
            </div>

            <nav aria-label="Mobile Navigation" className="my-auto py-8">
              <ul className="space-y-5 text-center">
                {orbit.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-heading text-2xl font-semibold text-orbit-fg hover:text-orbit-accent transition-colors block py-2"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-orbit-border pt-6 pb-4">
              <a
                href="#cluster"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-orbit-accent py-3.5 text-sm font-semibold text-white shadow-lg shadow-orbit-accent/25"
              >
                <span>Deploy GPU Cluster</span>
                <ArrowUpRightIcon size={16} weight="bold" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
