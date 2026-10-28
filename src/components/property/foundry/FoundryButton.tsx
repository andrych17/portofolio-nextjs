import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIsland } from "@/components/ArrowIsland";

type Props = { href: string; children: ReactNode; variant?: "signal" | "ink" | "line"; size?: "md" | "lg" };

export function FoundryButton({ href, children, variant = "signal", size = "md" }: Props) {
  const tone = {
    signal: "bg-accent text-accent-fg hover:bg-fg hover:text-accent",
    ink: "bg-fg text-bg hover:bg-accent hover:text-accent-fg",
    line: "bg-transparent text-fg ring-1 ring-fg/35 hover:bg-fg hover:text-bg hover:ring-fg",
  }[variant];
  const island = { signal: "bg-fg/10", ink: "bg-white/15", line: "bg-fg/10" }[variant];
  const scale = size === "lg" ? "py-2 pl-7 pr-2 text-[15px]" : "py-1.5 pl-5 pr-1.5 text-sm";
  return (
    <Link href={href} className={`group inline-flex min-h-11 items-center gap-3 rounded-full font-semibold uppercase tracking-[0.06em] transition-colors duration-500 ease-studio ${tone} ${scale}`}>
      {children}
      <ArrowIsland className={`${size === "lg" ? "size-10" : "size-8"} ${island}`} size={size === "lg" ? 16 : 14} />
    </Link>
  );
}
