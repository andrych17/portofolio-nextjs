"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
    answerEn: "Andry Huang specializes in Senior Full-Stack Engineering (.NET Core, Next.js, React, Node.js, TypeScript, PostgreSQL) and AI Systems Integration (Model Context Protocol/MCP, OpenAI GPT-4o, Claude AI Agents, and custom SaaS platforms).",
    answerId: "Andry Huang berfokus pada Senior Full-Stack Engineering (.NET Core, Next.js, React, Node.js, TypeScript, PostgreSQL) dan Integrasi AI Systems (Model Context Protocol/MCP, OpenAI GPT-4o, Claude AI Agents, serta pengembangan platform SaaS).",
  },
  {
    questionEn: "Is Andry Huang available for project collaboration or full-time roles?",
    questionId: "Apakah Andry Huang terbuka untuk proyek freelance, konsultasi, atau peran full-time?",
    answerEn: "Yes! Andry is available for high-impact software engineering projects, technical architecture consulting, and remote enterprise roles.",
    answerId: "Ya! Andry terbuka untuk proyek rekayasa perangkat lunak berdampak tinggi, konsultasi arsitektur sistem teknis, dan peluang kolaborasi tim enterprise secara remote.",
  },
  {
    questionEn: "Where is Andry Huang located and can he work remotely?",
    questionId: "Di mana lokasi Andry Huang dan apakah bisa bekerja secara remote?",
    answerEn: "Andry is based in Surabaya, East Java, Indonesia, and has extensive experience working with distributed global teams across different time zones.",
    answerId: "Andry berdomisili di Surabaya, Jawa Timur, Indonesia, dan berpengalaman bekerja secara remote dengan tim terdistribusi lintas zona waktu.",
  },
  {
    questionEn: "What is Qualiv and what is Andry Huang's role in it?",
    questionId: "Apa itu Qualiv dan apa peran Andry Huang di dalamnya?",
    answerEn: "Qualiv is an AI-powered recruitment platform engineered by Andry Huang, featuring automated candidate evaluation pipelines, background analysis, and AI workflows.",
    answerId: "Qualiv adalah platform rekrutmen berbasis AI yang dirancang oleh Andry Huang dengan pipeline evaluasi kandidat otomatis dan alur kerja AI canggih.",
  },
];

export default function FAQ() {
  const { lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={ref} className="py-20 relative overflow-hidden bg-[#030014]">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] opacity-20"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.3), rgba(6,182,212,0.2), transparent 70%)" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{lang === "id" ? "PERTANYAAN UMUM" : "FREQUENTLY ASKED QUESTIONS"}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {lang === "id" ? "Pertanyaan " : "Common "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              {lang === "id" ? "Yang Sering Diajukan" : "Questions & Answers"}
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            {lang === "id"
              ? "Informasi ringkas mengenai keahlian, ketersediaan kerja, dan proyek utama Andry Huang."
              : "Quick answers regarding Andry Huang's expertise, work availability, and featured projects."}
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const question = lang === "id" ? item.questionId : item.questionEn;
            const answer = lang === "id" ? item.answerId : item.answerEn;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-purple-950/20 border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.15)]"
                    : "bg-gray-900/40 border-gray-800 hover:border-gray-700"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-white text-base md:text-lg flex items-center gap-3">
                    <span className="text-purple-400 font-mono text-sm">0{index + 1}.</span>
                    {question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-2 rounded-lg bg-gray-800/60 text-purple-400 shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-6 pt-0 text-gray-300 text-sm md:text-base leading-relaxed border-t border-purple-500/10">
                        <p className="mt-4">{answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
