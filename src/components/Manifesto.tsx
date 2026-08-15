"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getYearsOfExperience } from "@/utils/experience";
import { Reveal } from "./ui/Reveal";

export default function Manifesto() {
  const { lang } = useLanguage();
  const yearsOfExperience = getYearsOfExperience();

  return (
    <section className="bg-[var(--bg-2)] py-[var(--sec-sm)] px-[var(--pad-x)]">
      <Reveal>
        <p
          className="mx-auto max-w-5xl font-medium tracking-[-0.02em] text-[var(--fg)]"
          style={{ fontSize: "var(--t-h2)", lineHeight: 1.05 }}
        >
          {lang === "id" ? (
            <>
              Halo! Saya <span className="text-[var(--accent)]">Andry Huang</span>, seorang Fullstack Engineer
              dengan {yearsOfExperience}+ tahun pengalaman dalam membangun & mengelola platform SaaS berskala
              besar, aplikasi web modern, serta solusi terintegrasi cloud & AI.
            </>
          ) : (
            <>
              Hi! I&apos;m <span className="text-[var(--accent)]">Andry Huang</span>, a Fullstack Engineer with{" "}
              {yearsOfExperience}+ years of experience building and maintaining large-scale SaaS platforms, web
              applications, and cloud-integrated solutions.
            </>
          )}
        </p>
      </Reveal>
    </section>
  );
}
