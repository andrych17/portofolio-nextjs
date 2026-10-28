import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIsland } from "@/components/ArrowIsland";

type Props = { href: string; children: ReactNode; variant?: "ink" | "signal" | "line"; size?: "md" | "lg" };

export function GridButton({ href, children, variant = "ink", size = "md" }: Props) {
  const tone = {
    ink: "bg-fg text-bg hover:bg-accent",
    signal: "bg-accent text-accent-fg hover:bg-fg",
    line: "bg-transparent text-fg ring-1 ring-fg/25 hover:ring-fg",
  }[variant];
  const island = { ink: "bg-white/15", signal: "bg-white/20", line: "bg-fg/10" }[variant];
  const scale = size === "lg" ? "py-2 pl-7 pr-2 text-[15px]" : "py-1.5 pl-5 pr-1.5 text-sm";
  return (
    <Link href={href} className={`group inline-flex min-h-11 items-center gap-3 rounded-full font-medium transition-colors duration-500 ease-studio ${tone} ${scale}`}>
      {children}
      <ArrowIsland className={`${size === "lg" ? "size-10" : "size-8"} ${island}`} size={size === "lg" ? 16 : 14} />
    </Link>
  );
}
