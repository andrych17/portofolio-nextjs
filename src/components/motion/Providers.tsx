"use client";

import "lenis/dist/lenis.css";
import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  const resetPathRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  useEffect(() => {
    if (resetPathRef.current === pathname) return;
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(0, { immediate: true, force: true });
        resetPathRef.current = pathname;
      }
    } else if (lenis) {
      resetPathRef.current = pathname;
    }
  }, [pathname, lenis]);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
      {!reduce && (
        <ReactLenis
          root
          options={{ lerp: 0.11, wheelMultiplier: 1, stopInertiaOnNavigate: true }}
        />
      )}
      <ScrollReset />
      {children}
    </MotionConfig>
  );
}
