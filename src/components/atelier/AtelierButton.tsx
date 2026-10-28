import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIsland } from "@/components/ArrowIsland";

type AtelierButtonProps = { href: string; children: ReactNode; variant?: "accent" | "ghost" | "light" };

export function AtelierButton({ href, children, variant = "accent" }: AtelierButtonProps) {
  const tone = {
    accent: "bg-accent text-accent-fg hover:bg-[#264d3a]",
    ghost: "bg-white/50 text-fg ring-1 ring-black/[0.07] hover:bg-white",
    light: "bg-bg text-fg hover:bg-white",
  }[variant];
  const island = variant === "accent" ? "bg-white/15" : "bg-black/[0.06]";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-4 rounded-full py-2 pl-6 pr-2 text-[15px] font-medium transition-colors duration-500 ease-studio ${tone}`}
    >
      {children}
      <ArrowIsland className={`size-9 ${island}`} />
    </Link>
  );
}
