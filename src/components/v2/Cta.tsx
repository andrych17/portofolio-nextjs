import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import TransitionLink from "./TransitionLink";

interface CtaProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "accent";
  /** Opens in a new tab (files and other sites). */
  external?: boolean;
  small?: boolean;
}

/** Pill button with its arrow nested in a round island (the island sits flush with the pill's padding). */
export default function Cta({ href, children, variant = "solid", external = false, small = false }: CtaProps) {
  const className = `v2-btn v2-btn-${variant}${small ? " v2-btn-sm" : ""}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className="v2-btn-ico" aria-hidden="true">
        <ArrowUpRight size={small ? 14 : 16} strokeWidth={1.75} />
      </span>
    </>
  );

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  if (href.startsWith("/")) {
    return (
      <TransitionLink className={className} href={href}>
        {inner}
      </TransitionLink>
    );
  }
  return (
    <a className={className} href={href}>
      {inner}
    </a>
  );
}
