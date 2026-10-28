import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIsland } from "@/components/ArrowIsland";

type Props = { href: string; children: ReactNode; variant?: "accent" | "ghost" | "light" | "dark"; size?: "md" | "lg" };

export function PulseButton({ href, children, variant = "accent", size = "md" }: Props) {
  const tone = {
    accent: "bg-accent text-accent-fg hover:bg-[#d8f770]",
    light: "bg-fg text-bg hover:bg-white",
    dark: "bg-[#0a0a08] text-fg hover:bg-black",
    ghost: "bg-fg/[0.05] text-fg ring-1 ring-fg/15 hover:bg-fg/[0.1]",
  }[variant];
  const island = { accent: "bg-black/10", light: "bg-bg/10", ghost: "bg-fg/10", dark: "bg-white/10" }[variant];
  const scale = size === "lg" ? "py-2 pl-7 pr-2 text-[15px]" : "py-1.5 pl-5 pr-1.5 text-sm";
  return (
    <Link href={href} className={`group inline-flex min-h-11 items-center gap-3 rounded-full font-medium transition-colors duration-500 ease-studio ${tone} ${scale}`}>
      {children}
      <ArrowIsland className={`${size === "lg" ? "size-10" : "size-8"} ${island}`} size={size === "lg" ? 16 : 14} />
    </Link>
  );
}
