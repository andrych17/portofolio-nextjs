"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHead, Index } from "./ui/Label";
import { Reveal } from "./ui/Reveal";

export interface FAQItem {
  questionEn: string;
  questionId: string;
  answerEn: string;
  answerId: string;
}

export const faqItems: FAQItem[] = [
  {
    questionEn: "What primary tech stack and services does Andry Huang specialize in?",
    questionId: "Apa keahlian utama dan layanan teknis yang ditawarkan Andry Huang?",
    answerEn:
      "Andry Huang specializes in Senior Full-Stack Engineering (.NET Core, Next.js, React, Node.js, TypeScript, PostgreSQL) and AI Systems Integration (Model Context Protocol/MCP, OpenAI GPT-4o, Claude AI Agents, and custom SaaS platforms).",
    answerId:
      "Andry Huang berfokus pada Senior Full-Stack Engineering (.NET Core, Next.js, React, Node.js, TypeScript, PostgreSQL) dan Integrasi AI Systems (Model Context Protocol/MCP, OpenAI GPT-4o, Claude AI Agents, serta pengembangan platform SaaS).",
  },
  {
    questionEn: "Is Andry Huang available for project collaboration or full-time roles?",
    questionId: "Apakah Andry Huang terbuka untuk proyek freelance, konsultasi, atau peran full-time?",
    answerEn:
      "Yes! Andry is available for high-impact software engineering projects, technical architecture consulting, and remote enterprise roles.",
    answerId:
      "Ya! Andry terbuka untuk proyek rekayasa perangkat lunak berdampak tinggi, konsultasi arsitektur sistem teknis, dan peluang kolaborasi tim enterprise secara remote.",
  },
  {
    questionEn: "Where is Andry Huang located and can he work remotely?",
    questionId: "Di mana lokasi Andry Huang dan apakah bisa bekerja secara remote?",
    answerEn:
      "Andry is based in Surabaya, East Java, Indonesia, and has extensive experience working with distributed global teams across different time zones.",
    answerId:
      "Andry berdomisili di Surabaya, Jawa Timur, Indonesia, dan berpengalaman bekerja secara remote dengan tim terdistribusi lintas zona waktu.",
  },
  {
    questionEn: "How many years of experience does Andry Huang have and what is his track record?",
    questionId: "Berapa tahun pengalaman Andry Huang dan bagaimana rekam jejak profesionalnya?",
    answerEn:
      "Andry Huang has 7+ years of professional software engineering experience (starting continuously since September 2019). He has architected and delivered 30+ production systems spanning enterprise SaaS (.NET Core, Next.js), large-scale retail POS with hardware/RFID, and AI-driven automation pipelines.",
    answerId:
      "Andry Huang memiliki 7+ tahun pengalaman rekayasa perangkat lunak profesional (dimulai sejak September 2019). Beliau telah merancang dan meluncurkan 30+ sistem produksi mulai dari SaaS enterprise (.NET Core, Next.js), retail POS skala besar dengan hardware/RFID, hingga pipeline otomatisasi berbasis AI.",
  },
  {
    questionEn: "What is Qualiv and what is Andry Huang's role in it?",
    questionId: "Apa itu Qualiv dan apa peran Andry Huang di dalamnya?",
    answerEn:
      "Qualiv is an AI-powered recruitment platform engineered by Andry Huang, featuring automated candidate evaluation pipelines, background analysis, and AI workflows.",
    answerId:
      "Qualiv adalah platform rekrutmen berbasis AI yang dirancang oleh Andry Huang dengan pipeline evaluasi kandidat otomatis dan alur kerja AI canggih.",
  },
];

export default function FAQ() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative">
      <SectionHead index="04" label={lang === "id" ? "Pertanyaan Yang Sering Diajukan" : "Frequently Asked Questions"} />

      <div className="px-[var(--pad-x)] py-[var(--sec-sm)]">
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-[var(--mut)] text-sm md:text-base">
            {lang === "id"
              ? "Informasi ringkas mengenai keahlian, ketersediaan kerja, dan proyek utama Andry Huang."
              : "Quick answers regarding Andry Huang's expertise, work availability, and featured projects."}
          </p>
        </Reveal>

        <div className="border-t border-[var(--line)]">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const question = lang === "id" ? item.questionId : item.questionEn;
            const answer = lang === "id" ? item.answerId : item.answerEn;

            return (
              <div key={index} className="border-b border-[var(--line)]">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <Index n={index + 1} className="w-8 shrink-0" />
                  <span className="flex-1 text-base md:text-lg font-medium text-[var(--fg)]">{question}</span>
                  {isOpen ? (
                    <Minus className="w-4 h-4 shrink-0 text-[var(--accent)]" aria-hidden />
                  ) : (
                    <Plus className="w-4 h-4 shrink-0 text-[var(--mut)]" aria-hidden />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.83, 0, 0.17, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-prose pb-6 pl-12 text-sm md:text-base leading-relaxed text-[var(--fg-2)]">
                        {answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
