"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type Part = { text: string; accent?: boolean };

const COPY: Record<"id" | "en", Part[]> = {
  id: [
    { text: "Backend yang tahan di production," },
    { text: "antarmuka web yang cepat", accent: true },
    { text: ", dan AI yang mengerjakan pekerjaan nyata, seperti menyaring CV atau mencocokkan ban dengan mobil pelanggan." },
  ],
  en: [
    { text: "Backends that hold up in production," },
    { text: "web interfaces that load fast", accent: true },
    { text: ", and AI that does real work, like screening CVs or matching tires to a customer's car." },
  ],
};

const STACK = [".NET Core", "Next.js", "Node.js", "RAG / AI Agents", "PostgreSQL", "Cloud"];

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    // .scroll-word is forced to full opacity under prefers-reduced-motion (globals.css).
    <motion.span style={{ opacity }} className={`scroll-word${accent ? " serif-accent text-[var(--accent)]" : ""}`}>
      {children}
    </motion.span>
  );
}

export default function Manifesto() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  const words = COPY[lang].flatMap((p) => p.text.split(" ").filter(Boolean).map((w) => ({ w, accent: p.accent })));

  return (
    <section className="relative border-t border-[var(--line)]">
      <div className="px-[var(--pad-x)] py-[var(--sec-sm)]">
        <span className="block font-mono text-xs uppercase tracking-[0.12em] text-[var(--mut)]">
          {lang === "id" ? "// YANG SAYA BANGUN" : "// WHAT I BUILD"}
        </span>

        <p
          ref={ref}
          className="mt-8 max-w-[22ch] font-medium leading-[1.02] tracking-[-0.035em] text-[var(--fg)] md:max-w-[18ch]"
          style={{ fontSize: "clamp(2.25rem, 1rem + 5.2vw, 6.5rem)" }}
        >
          {words.map(({ w, accent }, i) => {
            // No space before punctuation that starts a new part (", serta …").
            const space = i < words.length - 1 && !/^[,.]/.test(words[i + 1].w) ? " " : "";
            return (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={accent}>
                {w + space}
              </Word>
            );
          })}
        </p>
      </div>

      {/* Stack marquee — decorative duplicate of the hero stack line */}
      <div aria-hidden className="marquee overflow-hidden border-y border-[var(--line)] py-6">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {STACK.map((t, i) => (
                <span key={t} className="flex items-center">
                  <span
                    className="display px-8 text-[clamp(2.5rem,1.5rem+4vw,5.5rem)]"
                    style={i % 2 ? { color: "transparent", WebkitTextStroke: "1px var(--mut)" } : { color: "var(--fg)" }}
                  >
                    {t}
                  </span>
                  <span className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
