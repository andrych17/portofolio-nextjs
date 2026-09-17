"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getYearsOfExperience } from "@/utils/experience";
import { Reveal } from "./ui/Reveal";

export default function Manifesto() {
  const { lang } = useLanguage();
  const yearsOfExperience = getYearsOfExperience();

  return (
    <section className="relative py-[var(--sec-sm)] px-[var(--pad-x)] overflow-hidden">
      <div className="glow-orb-orange w-[380px] h-[380px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
      <div className="max-w-5xl mx-auto p-8 md:p-12 rounded-3xl glass-panel border border-white/10 shadow-2xl relative z-10">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] font-semibold block mb-4">
            {lang === "id" ? "// FILOSOFI & PENDEKATAN" : "// PHILOSOPHY & CRAFT"}
          </span>
          <p
            className="font-semibold tracking-tight text-[var(--fg)] leading-[1.15]"
            style={{ fontSize: "var(--t-h3)" }}
          >
            {lang === "id" ? (
              <>
                Merancang arsitektur backend yang{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--fg)] via-[var(--accent)] to-[var(--accent)]">
                  stabil di production, antarmuka web yang cepat dan presisi
                </span>
                , serta solusi AI yang langsung memecahkan masalah operasional nyata.
              </>
            ) : (
              <>
                Engineering reliable backend systems in production,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--fg)] via-[var(--accent)] to-[var(--accent)]">
                  fast and responsive web interfaces
                </span>
                , and pragmatic AI pipelines that solve real operational bottlenecks.
              </>
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
