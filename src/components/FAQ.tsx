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
      "Full-stack work in .NET Core, Next.js, React, Node.js, TypeScript, and PostgreSQL, plus AI integration: Model Context Protocol (MCP), the OpenAI and Claude APIs, and agent workflows. Andry also builds custom SaaS platforms.",
    answerId:
      "Full-stack dengan .NET Core, Next.js, React, Node.js, TypeScript, dan PostgreSQL, serta integrasi AI: Model Context Protocol (MCP), API OpenAI dan Claude, dan agent workflow. Andry juga membangun platform SaaS custom.",
  },
  {
    questionEn: "Is Andry Huang available for project collaboration or full-time roles?",
    questionId: "Apakah Andry Huang terbuka untuk proyek freelance, konsultasi, atau peran full-time?",
    answerEn:
      "Yes. Andry is open to remote full-time roles, freelance projects, and architecture consulting.",
    answerId:
      "Ya. Andry terbuka untuk peran full-time remote, proyek freelance, dan konsultasi arsitektur sistem.",
  },
  {
    questionEn: "Where is Andry Huang located and can he work remotely?",
    questionId: "Di mana lokasi Andry Huang dan apakah bisa bekerja secara remote?",
    answerEn:
      "Andry lives in Surabaya, East Java, Indonesia, and worked remotely for MRI Software in Singapore for more than 3 years.",
    answerId:
      "Andry tinggal di Surabaya, Jawa Timur, dan pernah bekerja remote selama lebih dari 3 tahun untuk MRI Software di Singapura.",
  },
  {
    questionEn: "How many years of experience does Andry Huang have and what is his track record?",
    questionId: "Berapa tahun pengalaman Andry Huang dan bagaimana rekam jejak profesionalnya?",
    answerEn:
      "7+ years, starting September 2019. The work covers enterprise SaaS for MRI Software (.NET Core, Next.js), retail POS systems with RFID hardware, and AI automation such as Qualiv. This site lists 20+ of those projects.",
    answerId:
      "7+ tahun, sejak September 2019. Pengalamannya mencakup SaaS enterprise untuk MRI Software (.NET Core, Next.js), sistem POS retail dengan hardware RFID, dan otomasi AI seperti Qualiv. Lebih dari 20 project tersebut ada di website ini.",
  },
  {
    questionEn: "What is Qualiv and what is Andry Huang's role in it?",
    questionId: "Apa itu Qualiv dan apa peran Andry Huang di dalamnya?",
    answerEn:
      "Qualiv is a multi-tenant AI recruitment SaaS that Andry founded and built as Lead Architect. It screens CVs (PDF/DOCX) with an LLM, runs candidate logic tests and AI chat/video interview simulations, processes jobs on a BullMQ/Redis queue, and bills through Midtrans.",
    answerId:
      "Qualiv adalah SaaS rekrutmen multi-tenant berbasis AI yang didirikan dan dirancang Andry sebagai Lead Architect. Qualiv menyaring CV (PDF/DOCX) dengan LLM, menjalankan tes logika dan simulasi wawancara chat/video AI, memproses antrean dengan BullMQ/Redis, dan menagih lewat Midtrans.",
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
              : "Short answers about Andry's skills, availability, and main projects."}
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
