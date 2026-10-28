"use client";

import type { ReactNode } from "react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { useAnchorScroll } from "./anchor";

type MaisonButtonProps = { href: string; children: ReactNode; variant?: "solid" | "line"; className?: string };

/** Pill link with the arrow in its own circle. Hash links scroll smoothly. */
export function MaisonButton({ href, children, variant = "solid", className = "" }: MaisonButtonProps) {
  const go = useAnchorScroll();
  const tone =
    variant === "solid"
      ? "bg-accent text-accent-fg hover:bg-fg"
      : "text-fg ring-1 ring-fg/25 hover:bg-fg hover:text-bg";
  return (
    <a
      href={href}
      onClick={(e) => go(e, href)}
      className={`maison-caps group inline-flex min-h-12 items-center gap-4 rounded-full py-1.5 pl-7 pr-1.5 transition-colors duration-700 ease-studio ${tone} ${className}`}
    >
      {children}
      <ArrowIsland className={`size-9 ${variant === "solid" ? "bg-black/20" : "bg-fg/10"}`} size={14} />
    </a>
  );
}
