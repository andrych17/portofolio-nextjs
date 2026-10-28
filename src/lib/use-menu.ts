"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";

/** Full-screen menu state: Escape closes it, focus moves in, page scroll pauses. */
export function useMenu() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  return { open, setOpen, closeRef };
}
