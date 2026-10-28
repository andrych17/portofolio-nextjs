"use client";

import type { ReactNode } from "react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { useAnchorScroll } from "./anchor";

type StreetButtonProps = { href: string; children: ReactNode; variant?: "lime" | "paper" | "line"; className?: string };

/** Hard-edged label button with the arrow in its own square island. Hash links scroll smoothly. */
export function StreetButton({ href, children, variant = "lime", className = "" }: StreetButtonProps) {
  const go = useAnchorScroll();
  const tone = {
    lime: "bg-accent text-accent-fg hover:bg-[var(--s-paper)]",
    paper: "bg-[var(--s-paper)] text-accent-fg hover:bg-accent",
    line: "text-fg ring-1 ring-fg/30 hover:bg-fg hover:text-bg",
  }[variant];
  return (
    <a
      href={href}
      onClick={(e) => go(e, href)}
      className={`street-tag group inline-flex min-h-12 items-center gap-4 py-1.5 pl-6 pr-1.5 transition-colors duration-500 ease-studio ${tone} ${className}`}
    >
      {children}
      <ArrowIsland className={`size-9 rounded-none ${variant === "line" ? "bg-fg/10" : "bg-black/15"}`} size={14} />
    </a>
  );
}
