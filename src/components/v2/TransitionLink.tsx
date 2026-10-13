"use client";

import type { ComponentProps, MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap, reducedMotion } from "@/lib/v2/motion";

/**
 * Link to another route that closes a circular wipe over the page first (the .v2-trans cover lives in the v2 page).
 * The cover goes away with the page, so only the closing half is animated.
 */
export default function TransitionLink({ href, onClick, ...rest }: ComponentProps<typeof Link>) {
  const router = useRouter();
  const target = typeof href === "string" ? href : (href.pathname ?? "/");

  const handle = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    const cover = document.querySelector<HTMLElement>(".v2-trans");
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0 || reducedMotion() || !cover) return;
    event.preventDefault();
    gsap
      .timeline({ onComplete: () => router.push(target) })
      .set(cover, { autoAlpha: 1 })
      .fromTo(cover.querySelector(".v2-trans-clip"), { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", duration: 0.85, ease: "circ.inOut" }, 0)
      .fromTo(cover.querySelectorAll(".v2-trans-rings i"), { scale: 0.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.8, ease: "circ.out", stagger: 0.08 }, 0.1);
  };

  return <Link href={href} onClick={handle} {...rest} />;
}
