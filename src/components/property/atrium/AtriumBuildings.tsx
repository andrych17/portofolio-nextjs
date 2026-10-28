"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { easeStudio } from "@/components/motion/ease";
import { atrium } from "@/content/property/atrium";
import { useMediaQuery } from "@/lib/use-media-query";

const { buildings } = atrium;

/** An index of buildings set as large type. On a mouse, a photo follows the cursor and the other rows dim. On touch, each row carries its own photo. */
export function AtriumBuildings() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.5 });

  function onMove(e: PointerEvent<HTMLUListElement>) {
    x.set(e.clientX + 28);
    y.set(e.clientY - 150);
  }

  return (
    <>
      <ul onPointerMove={fine ? onMove : undefined} onPointerLeave={() => setActive(null)} className="border-t border-fg">
        {buildings.map((b, i) => (
          <motion.li
            key={b.n}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: easeStudio, delay: 0.04 * (i % 3) }}
          >
            <a
              href="#viewing"
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className={`group block border-b border-fg/20 py-6 transition-opacity duration-500 ease-studio md:py-7 ${active !== null && active !== i ? "opacity-35" : ""}`}
            >
              <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3">
                <span className="col-span-2 font-mono text-[11.5px] text-fg/55 md:col-span-1">{b.n}</span>
                <span className="col-span-10 flex justify-end md:order-last md:col-span-2">
                  <span
                    className={`px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] ${b.open ? "bg-accent text-accent-fg" : "text-fg/65 ring-1 ring-fg/30"}`}
                  >
                    {b.status}
                  </span>
                </span>
                <h3 className="col-span-12 font-display text-[clamp(2.4rem,5.6vw,5.6rem)] leading-[0.95] transition-transform duration-700 ease-studio md:col-span-5 md:group-hover:translate-x-3">
                  {b.name}
                </h3>
                <p className="col-span-12 text-[15px] leading-snug text-fg/75 md:col-span-2">
                  {b.kind}
                  <span className="block text-fg/55">{b.district}</span>
                </p>
                <p className="col-span-12 font-mono text-[11.5px] uppercase leading-snug tracking-[0.08em] text-fg/65 md:col-span-2">
                  {b.floors} floors · {b.size}
                  <span className="block normal-case tracking-normal text-fg/55">{b.spaces}</span>
                </p>
              </div>
              <div className="relative mt-5 aspect-[16/9] overflow-hidden md:[@media(hover:hover)_and_(pointer:fine)]:hidden">
                <Image src={b.image} alt={b.alt} fill sizes="(min-width: 768px) 80vw, 92vw" className="object-cover" />
              </div>
            </a>
          </motion.li>
        ))}
      </ul>

      {fine && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[4/5] w-[19rem] overflow-hidden bg-[var(--a-ink)] shadow-[0_40px_70px_-30px_rgb(11_19_25/0.6)] md:block"
          style={{ x: sx, y: sy }}
          animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.9 : 1 }}
          transition={{ duration: 0.45, ease: easeStudio }}
        >
          {buildings.map((b, i) => (
            <motion.div key={b.n} className="absolute inset-0" animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.12 }} transition={{ duration: 0.6, ease: easeStudio }}>
              <Image src={b.image} alt="" fill sizes="304px" className="object-cover" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
