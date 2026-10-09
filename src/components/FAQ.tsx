"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Title } from "./ui/Title";

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
  const [open, setOpen] = useState<number | null>(0);
  const id = lang === "id";

  return (
    <section id="faq" data-stage="faq" className="ah-sec ah-side-left">
      <Title no="05" meta={id ? "Keahlian, ketersediaan, proyek" : "Skills, availability, projects"}>
        FAQ
      </Title>

      <div className="ah-faq">
        {faqItems.map((item, i) => {
          const on = open === i;
          return (
            // Closed answers stay in the DOM (collapsed in CSS) so the FAQPage JSON-LD matches visible content.
            <div key={item.questionEn} className="ah-qa" data-on={on || undefined}>
              <h3>
                <button
                  type="button"
                  className="ah-q"
                  aria-expanded={on}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(on ? null : i)}
                >
                  <span className="ah-mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ah-q-text">{id ? item.questionId : item.questionEn}</span>
                  <span className="ah-q-sign" aria-hidden="true" />
                </button>
              </h3>
              <div className="ah-a" id={`faq-${i}`}>
                <div>
                  <p>{id ? item.answerId : item.answerEn}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
