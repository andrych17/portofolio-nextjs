"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import { pulse } from "@/content/tech/pulse";

const VISUALS = [
  <pre key="a" className="overflow-x-auto font-mono text-[12.5px] leading-relaxed text-fg/80">
    <span className="text-muted">{"<!-- before </body> -->"}</span>
    {"\n"}
    {"<script async "}
    <span className="text-accent">src</span>
    {"="}
    <span className="text-accent">&quot;https://cdn.yourbrand.com/p.js&quot;</span>
    {"\n  "}
    <span className="text-accent">data-key</span>
    {"="}
    <span className="text-accent">&quot;pk_live_example&quot;</span>
    {"></script>"}
  </pre>,
  <pre key="b" className="overflow-x-auto font-mono text-[12.5px] leading-relaxed text-fg/80">
    <span className="text-muted">$ </span>git push origin main{"\n"}
    <span className="text-accent">ok </span>deploy v2.14 detected{"\n"}
    <span className="text-accent">ok </span>marker added to 6 charts{"\n"}
    <span className="text-accent">ok </span>first events in 38 s
  </pre>,
  <div key="c" className="font-mono text-[12.5px]">
    <p className="text-fg/80">&gt; did checkout v2 help mobile?</p>
    <div className="mt-3 flex items-center gap-3">
      <span className="h-2 w-full overflow-hidden rounded-full bg-fg/10">
        <i className="block h-full w-[72%] rounded-full bg-accent" />
      </span>
      <span className="shrink-0 text-accent">+18%</span>
    </div>
    <p className="mt-2 text-muted">Yes. Mobile gained most, desktop is flat.</p>
  </div>,
];

export function PulseProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.65"] });
  const n = pulse.process.length;
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(Math.min(n - 1, Math.max(0, Math.floor(v * n * 0.999)))));

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute bottom-0 left-[22px] top-3 w-px bg-fg/10 md:left-[27px]">
        <motion.div className="h-full origin-top bg-accent" style={{ scaleY: scrollYProgress }} />
      </div>
      <ol className="space-y-16 md:space-y-24">
        {pulse.process.map((s, i) => (
          <li key={s.title} className="relative grid grid-cols-[minmax(0,1fr)] gap-6 pl-16 md:grid-cols-12 md:gap-12 md:pl-24">
            <span
              aria-hidden
              className={`absolute left-0 top-0 flex size-11 items-center justify-center rounded-full font-mono text-sm transition-colors duration-700 ease-studio md:size-14 ${i <= step ? "bg-accent text-accent-fg" : "bg-[var(--p-panel-2)] text-muted ring-1 ring-fg/10"}`}
            >
              0{i + 1}
            </span>
            <div className="md:col-span-6">
              <h3 className={`font-display text-[clamp(2rem,4vw,3.6rem)] leading-[0.95] transition-opacity duration-700 ${i <= step ? "opacity-100" : "opacity-45"}`}>{s.title}</h3>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-fg/65">{s.body}</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: easeStudio }}
              className="self-start rounded-2xl bg-[var(--p-panel)] p-5 ring-1 ring-fg/10 md:col-span-6"
            >
              {VISUALS[i]}
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  );
}
