"use client";

import { Award, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHead, Index } from "./ui/Label";
import { Reveal } from "./ui/Reveal";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Certificate of completion: AI Capabilities and Limitations",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "exhhy4ripy8p",
    link: "https://verify.skilljar.com/c/exhhy4ripy8p",
  },
  {
    id: 2,
    title: "Certificate of completion: Introduction to subagents",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "ziob4haqtfxa",
    link: "https://verify.skilljar.com/c/ziob4haqtfxa",
  },
  {
    id: 3,
    title: "Certificate of completion: Introduction to agent skills",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "9d6emc43e68b",
    link: "https://verify.skilljar.com/c/9d6emc43e68b",
  },
  {
    id: 4,
    title: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "nucfxrj2cxoy",
    link: "https://verify.skilljar.com/c/nucfxrj2cxoy",
  },
  {
    id: 5,
    title: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "hdv4nqhaequh",
    link: "https://verify.skilljar.com/c/hdv4nqhaequh",
  },
  {
    id: 6,
    title: "Building with the Claude API",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "3ik737t8atvf",
    link: "https://verify.skilljar.com/c/3ik737t8atvf",
  },
  {
    id: 7,
    title: "AI Agents with Model Context Protocol",
    issuer: "Vanderbilt University",
    date: "Jun 2026",
    credentialId: "ZI2P1DZ8J56C",
    link: "https://www.coursera.org/account/accomplishments/records/ZI2P1DZ8J56C",
  },
  {
    id: 8,
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "Jun 2026",
    credentialId: "opzctbnhdmcs",
    link: "https://verify.skilljar.com/c/opzctbnhdmcs",
  },
  {
    id: 9,
    title: "Certificate of completion: Introduction to Claude Cowork",
    issuer: "Anthropic",
    date: "Jun 2026",
    credentialId: "zydanea62pwv",
    link: "https://verify.skilljar.com/c/zydanea62pwv",
  },
  {
    id: 10,
    title: "Certificate of completion: Claude 101",
    issuer: "Anthropic",
    date: "Jun 2026",
    credentialId: "fyrqffssmxur",
    link: "https://verify.skilljar.com/c/fyrqffssmxur",
  },
  {
    id: 11,
    title: "Software Architecture & Design of Modern Large Scale Systems",
    issuer: "Udemy",
    date: "Feb 2026",
    credentialId: "UC-ff06e4f9-87de-44cd-b029-c7ad33e03e80",
    link: "https://www.udemy.com/certificate/UC-ff06e4f9-87de-44cd-b029-c7ad33e03e80/",
  },
];

export default function Certifications() {
  const { lang } = useLanguage();

  return (
    <section id="certifications" className="relative">
      <SectionHead index="03" label={lang === "id" ? "Sertifikasi & Penghargaan" : "Certifications & Awards"} />

      <div className="px-[var(--pad-x)] py-[var(--sec-sm)]">
        {certifications.length === 0 ? (
          <Reveal className="max-w-xl">
            <Award className="w-8 h-8 text-[var(--mut)] mb-4" aria-hidden />
            <h3 className="text-xl font-medium text-[var(--fg)] mb-2">
              {lang === "id" ? "Sertifikasi Segera Hadir" : "Certifications Coming Soon"}
            </h3>
            <p className="text-[var(--mut)]">
              {lang === "id"
                ? "Sertifikasi profesional dan penghargaan akan ditampilkan di sini."
                : "Professional certifications and awards will be displayed here."}
              <br />
              {lang === "id" ? "Nantikan pembaruannya!" : "Stay tuned for updates!"}
            </p>
          </Reveal>
        ) : (
          <div className="border-t border-[var(--line)]">
            {certifications.map((cert, index) => (
              <Reveal key={cert.id} delay={Math.min(index * 0.03, 0.3)}>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 border-b border-[var(--line)] py-5 sm:flex-row sm:items-center sm:gap-6"
                >
                  <Index n={index + 1} className="w-8 shrink-0" />
                  <span className="flex-1 text-base font-medium text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                    {cert.title}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--mut)] shrink-0">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-xs tabular-nums text-[var(--mut)] shrink-0">{cert.date}</span>
                  {cert.link && (
                    <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-[var(--mut)] shrink-0 group-hover:text-[var(--accent)]">
                      {lang === "id" ? "Lihat Sertifikat" : "View Certificate"}
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                    </span>
                  )}
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
