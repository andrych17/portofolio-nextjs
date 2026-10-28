"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { salt } from "@/content/fashion/salt";

const WARP = 15;
const WEFT = 15;
const STEP = 400 / (WARP + 1);

/** Weft threads that draw themselves across a fixed warp as the section scrolls in. */
function Thread({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const y = STEP * (index + 1);
  const start = (index / WEFT) * 0.55;
  const length = useTransform(progress, [start, start + 0.45], [0, 1]);
  // Alternate the over and under of the weave by flipping the wave phase per row.
  const sign = index % 2 === 0 ? -1 : 1;
  let d = `M0 ${y}`;
  for (let i = 0; i <= WARP; i++) d += ` Q${STEP * (i + 0.5)} ${y + sign * (i % 2 === 0 ? 7 : -7)} ${STEP * (i + 1)} ${y}`;
  return <motion.path d={d} fill="none" stroke="var(--t-accent)" strokeWidth="3.4" style={{ pathLength: length }} />;
}

function Weave({ progress }: { progress: MotionValue<number> }) {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Flax threads weaving into cloth" className="w-full">
      <g stroke="var(--t-fg)" strokeOpacity="0.38" strokeWidth="3.4" strokeLinecap="round">
        {Array.from({ length: WARP }, (_, i) => (
          <line key={i} x1={STEP * (i + 1)} y1="8" x2={STEP * (i + 1)} y2="392" />
        ))}
      </g>
      {Array.from({ length: WEFT }, (_, i) => (
        <Thread key={i} index={i} progress={progress} />
      ))}
    </svg>
  );
}

/** Fresh versus fortieth-wash comparison. A real range input drives it, so keyboard and touch both work. */
export function SaltWash() {
  const [pos, setPos] = useState(55);
  const [reduce, setReduce] = useState(false);
  const rangeId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const prefers = useReducedMotion();
  const done = useMotionValue(1);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 80%", "end 45%"] });

  useEffect(() => setReduce(!!prefers), [prefers]);

  return (
    <section ref={sectionRef} id="fabric" aria-labelledby="fabric-title" className="mx-auto max-w-[1700px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="salt-caps text-muted">04 · Fabric</p>
          <MaskText
            as="h2"
            id="fabric-title"
            className="mt-5 font-display text-[clamp(2.8rem,6.4vw,6.4rem)]"
            lines={["Forty washes", <span key="s" className="text-accent">later.</span>]}
          />
          <Reveal y={20}>
            <p className="mt-8 max-w-md text-[1.1rem] leading-relaxed text-fg/90">
              Linen gets better with age and the colour softens with it. Drag across the photo to see the same linen new and after forty washes at 30 degrees.
            </p>
          </Reveal>
          <div className="mt-10 hidden max-w-xs lg:block">
            <Weave progress={reduce ? done : scrollYProgress} />
            <p className="salt-caps mt-3 text-muted">185 grams to the square metre</p>
          </div>
        </div>

        <Reveal y={40} className="lg:col-span-7" amount={0.15}>
          <div className="relative aspect-[7/5] select-none lg:aspect-[5/4] overflow-hidden rounded-[2rem] bg-surface">
            <Image src={salt.wash.src} alt={salt.wash.alt} fill sizes="(min-width: 1024px) 56vw, 92vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
              <Image
                src={salt.wash.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 56vw, 92vw"
                className="object-cover [filter:saturate(.55)_contrast(.9)_brightness(1.1)_sepia(.22)]"
              />
            </div>
            <span className="salt-caps absolute left-4 top-4 rounded-full bg-[var(--l-paper)] px-3 py-1.5 text-[var(--l-ink)]">{salt.wash.before}</span>
            <span className="salt-caps absolute right-4 top-4 rounded-full bg-[var(--l-ink)] px-3 py-1.5 text-[var(--l-paper)]">{salt.wash.after}</span>

            <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-[var(--l-paper)]" style={{ left: `${pos}%` }}>
              <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--l-paper)] text-[var(--l-ink)] shadow-[0_10px_24px_-8px_rgb(0_0_0/0.55)]">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
                </svg>
              </span>
            </div>

            <label htmlFor={rangeId} className="sr-only">
              Compare first wash and fortieth wash
            </label>
            <input
              id={rangeId}
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-valuetext={`${pos}% first wash`}
              className="absolute inset-0 size-full cursor-ew-resize opacity-0 [touch-action:pan-y]"
            />
          </div>
          <p className="salt-caps mt-4 text-muted">Same shirt, photographed before and after forty cycles</p>
        </Reveal>
      </div>
    </section>
  );
}
