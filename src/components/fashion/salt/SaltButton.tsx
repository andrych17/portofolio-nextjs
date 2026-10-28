"use client";

import type { ReactNode } from "react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { useAnchorScroll } from "./anchor";

type SaltButtonProps = { href: string; children: ReactNode; variant?: "solid" | "line" | "paper"; className?: string };

/** Pill link with the arrow in its own circle. Hash links scroll smoothly. */
export function SaltButton({ href, children, variant = "solid", className = "" }: SaltButtonProps) {
  const go = useAnchorScroll();
  const tone = {
    solid: "bg-accent text-accent-fg hover:bg-[var(--l-paper)] hover:text-[var(--l-ink)]",
    paper: "bg-[var(--l-paper)] text-[var(--l-ink)] hover:bg-accent hover:text-accent-fg",
    line: "text-fg ring-1 ring-fg/40 hover:bg-fg hover:text-bg",
  }[variant];
  return (
    <a
      href={href}
      onClick={(e) => go(e, href)}
      className={`salt-caps group inline-flex min-h-12 items-center gap-4 rounded-full py-1.5 pl-7 pr-1.5 transition-colors duration-500 ease-studio ${tone} ${className}`}
    >
      {children}
      <ArrowIsland className={`size-9 ${variant === "line" ? "bg-fg/10" : "bg-black/15"}`} size={14} />
    </a>
  );
}
