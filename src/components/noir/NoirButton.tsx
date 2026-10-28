import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIsland } from "@/components/ArrowIsland";

type NoirButtonProps = { href: string; children: ReactNode; variant?: "accent" | "ghost"; size?: "md" | "lg" };

export function NoirButton({ href, children, variant = "accent", size = "md" }: NoirButtonProps) {
  const tone =
    variant === "accent"
      ? "bg-accent text-accent-fg"
      : "bg-fg/[0.06] text-fg ring-1 ring-fg/10 hover:bg-fg/[0.1]";
  const scale = size === "lg" ? "py-2.5 pl-8 pr-2.5 text-base" : "py-2 pl-6 pr-2 text-sm";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-4 rounded-full font-medium transition-colors duration-500 ease-studio ${tone} ${scale}`}
    >
      {children}
      <ArrowIsland className={`${size === "lg" ? "size-11" : "size-9"} ${variant === "accent" ? "bg-black/10" : "bg-fg/10"}`} />
    </Link>
  );
}
