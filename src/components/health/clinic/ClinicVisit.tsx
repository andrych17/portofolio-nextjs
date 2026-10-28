"use client";

import { motion } from "motion/react";
import { easeStudio } from "@/components/motion/ease";
import { clinic } from "@/content/health/clinic";

/** Four steps; each hairline draws across as the step scrolls into view. */
export function ClinicVisit() {
  return (
    <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
      {clinic.visit.map((step, i) => (
        <motion.li
          key={step.title}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delayChildren: i * 0.12 }}
        >
          <div className="relative h-px bg-fg/12">
            <motion.span
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
              transition={{ duration: 1.4, ease: easeStudio, delay: i * 0.12 }}
              className="absolute inset-0 origin-left bg-fg"
            />
            <motion.span
              variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
              transition={{ duration: 0.6, ease: easeStudio, delay: 0.3 + i * 0.12 }}
              className="absolute -top-[5px] left-0 size-[11px] rounded-full bg-accent"
            />
          </div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: easeStudio, delay: 0.15 + i * 0.12 }}
          >
            <p className="mt-8 font-display text-[4.5rem] leading-none text-fg/15">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-4 font-display text-[1.75rem] leading-[1.02]">{step.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.body}</p>
          </motion.div>
        </motion.li>
      ))}
    </ol>
  );
}
