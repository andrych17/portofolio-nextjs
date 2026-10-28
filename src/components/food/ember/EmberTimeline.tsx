"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

type Course = { time: string; name: string; body: string };

/** Course list with a line that draws itself as the page scrolls; each course lights up when the line reaches it. */
export function EmberTimeline({ courses }: { courses: Course[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const draw = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute bottom-3 left-[13px] top-3 w-px bg-fg/15 md:left-[17px]" />
      <motion.span
        aria-hidden
        style={{ scaleY: draw }}
        className="absolute bottom-3 left-[13px] top-3 w-px origin-top bg-accent shadow-[0_0_14px_2px_rgb(255_106_31/0.6)] md:left-[17px]"
      />
      {courses.map((course, i) => (
        <CourseRow key={course.name} course={course} index={i} count={courses.length} progress={draw} />
      ))}
    </ol>
  );
}

function CourseRow({ course, index, count, progress }: { course: Course; index: number; count: number; progress: MotionValue<number> }) {
  const at = (index + 0.4) / count;
  const lit = useTransform(progress, [at - 0.08, at], [0, 1]);
  const text = useTransform(lit, [0, 1], [0.4, 1]);
  const numColor = useTransform(lit, [0, 1], ["#f2e8d8", "#14100e"]);
  return (
    <li className="relative grid grid-cols-[28px_1fr] gap-x-5 pb-12 last:pb-0 md:grid-cols-[36px_1fr] md:gap-x-8 md:pb-16">
      <span className="relative mt-1.5 flex size-[27px] items-center justify-center rounded-full bg-bg ring-1 ring-fg/25 md:size-[35px]">
        <motion.span style={{ opacity: lit }} className="absolute inset-0 rounded-full bg-accent shadow-[0_0_18px_2px_rgb(255_106_31/0.55)]" />
        <motion.span style={{ color: numColor }} className="relative text-[10px] font-semibold">
          {index + 1}
        </motion.span>
      </span>
      <motion.div style={{ opacity: text }}>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">{course.time}</p>
        <h3 className="mt-1 font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.05]">{course.name}</h3>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-fg/70">{course.body}</p>
      </motion.div>
    </li>
  );
}
