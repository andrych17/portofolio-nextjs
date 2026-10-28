"use client";

import { AnimatePresence, motion, useSpring } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import { maison } from "@/content/fashion/maison";
import { useMediaQuery } from "@/lib/use-media-query";

/** Four services as large serif rows. On a mouse, a picture follows the cursor. Touch gets plain, open rows. */
export function MaisonAtelier() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(0, { stiffness: 180, damping: 24, mass: 0.6 });
  const y = useSpring(0, { stiffness: 180, damping: 24, mass: 0.6 });

  return (
    <>
      <ul
        className="border-b border-line"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          x.set(e.clientX + 36);
          y.set(e.clientY - 150);
        }}
        onPointerLeave={() => setActive(null)}
      >
        {maison.services.map((service, i) => (
          <li
            key={service.n}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
            className={`border-t border-line transition-opacity duration-700 ease-studio ${active !== null && active !== i ? "opacity-40" : ""}`}
          >
            <div className="grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-6 md:py-12">
              <span className="maison-caps text-muted md:col-span-1">{service.n}</span>
              <h3
                className={`font-display text-[clamp(2.4rem,5.2vw,5.4rem)] font-light leading-none tracking-[-0.01em] transition-[transform,color] duration-700 ease-studio md:col-span-6 ${
                  active === i ? "translate-x-4 italic text-accent" : ""
                }`}
              >
                {service.title}
              </h3>
              <p className="max-w-sm text-[15px] leading-relaxed text-fg/70 md:col-span-3">{service.body}</p>
              <p className="maison-caps text-muted md:col-span-2 md:text-right">{service.time}</p>
            </div>
          </li>
        ))}
      </ul>

      {fine && (
        <AnimatePresence>
          {active !== null && (
            <motion.div
              aria-hidden
              style={{ x, y }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: easeStudio }}
              className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[250px] md:block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-surface shadow-[0_30px_60px_-24px_rgba(60,20,20,0.45)] ring-1 ring-fg/10">
                {maison.services.map((service, i) => (
                  <Image
                    key={service.n}
                    src={service.image}
                    alt=""
                    fill
                    sizes="250px"
                    loading="eager"
                    className={`object-cover transition-opacity duration-500 ease-studio ${active === i ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
