import type { ReactNode } from "react";
import { ArrowIsland } from "@/components/ArrowIsland";

type Props = { href: string; children: ReactNode; variant?: "solid" | "ghost"; className?: string };

/** Pill link with the arrow in its own island, per the house style. */
export function EmberButton({ href, children, variant = "solid", className = "" }: Props) {
  const solid = variant === "solid";
  return (
    <a
      href={href}
      className={`group inline-flex min-h-12 items-center gap-4 rounded-full py-1.5 pl-7 pr-1.5 text-[15px] font-medium transition-[transform,box-shadow] duration-500 ease-studio active:scale-[0.98] ${
        solid
          ? "bg-accent text-accent-fg shadow-[0_14px_40px_-12px_rgb(255_106_31/0.65),inset_0_1px_0_rgb(255_255_255/0.35)] hover:shadow-[0_18px_50px_-10px_rgb(255_106_31/0.8),inset_0_1px_0_rgb(255_255_255/0.35)]"
          : "text-fg ring-1 ring-fg/25 hover:ring-fg/60"
      } ${className}`}
    >
      {children}
      <ArrowIsland className={`size-10 ${solid ? "bg-accent-fg/12" : "bg-fg/10"}`} />
    </a>
  );
}
