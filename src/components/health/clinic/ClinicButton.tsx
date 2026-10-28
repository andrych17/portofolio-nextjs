import type { ReactNode } from "react";
import { ArrowIsland } from "@/components/ArrowIsland";

type Variant = "deep" | "coral" | "ghost" | "light";

const shell: Record<Variant, string> = {
  deep: "bg-fg text-bg",
  coral: "bg-accent text-fg",
  ghost: "text-fg ring-1 ring-fg/25 hover:ring-fg/60",
  light: "bg-bg text-fg",
};
const island: Record<Variant, string> = {
  deep: "bg-accent text-fg",
  coral: "bg-fg text-bg",
  ghost: "bg-fg/10",
  light: "bg-accent text-fg",
};

export function ClinicButton({
  href,
  children,
  variant = "deep",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-12 items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-[15px] font-semibold transition-transform duration-500 ease-studio active:scale-[0.97] ${shell[variant]} ${className}`}
    >
      {children}
      <ArrowIsland className={`size-10 ${island[variant]}`} />
    </a>
  );
}
