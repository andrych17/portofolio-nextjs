"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getYearsOfExperience } from "@/utils/experience";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

function parseFormattedMarkdown(text: string) {
  const lines = text.split("\n");
  return lines.map((line, lIdx) => {
    const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return (
      <span key={lIdx} className="block min-h-[1.2em]">
        {parts.map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={pIdx} className="font-semibold text-[var(--fg)]">
                {part.slice(2, -2)}
              </strong>
            );
          }
          const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
          if (linkMatch) {
            return (
              <a
                key={pIdx}
                href={linkMatch[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:opacity-80 underline underline-offset-2 font-medium transition-opacity"
              >
                {linkMatch[1]}
              </a>
            );
          }
          return part;
        })}
      </span>
    );
  });
}

export default function AIChatbot() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(1);
  const yearsExp = getYearsOfExperience();

  const buildWelcomeMessage = useCallback(
    (currentLang: string): Message => ({
      id: "1",
      sender: "bot",
      text:
        currentLang === "id"
          ? `Halo! Saya **Andry AI Assistant** 🤖. Tanya saya apa saja tentang **Andry Huang** (pengalaman ${yearsExp}+ tahun, keahlian teknis, platform AI Qualiv, atau cara berkolaborasi)!`
          : `Hi there! I am **Andry AI Assistant** 🤖. Ask me anything about **Andry Huang** (${yearsExp}+ years exp, tech stack, Qualiv AI platform, or how to get in touch)!`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }),
    [yearsExp],
  );

  const [messages, setMessages] = useState<Message[]>(() => [buildWelcomeMessage(lang)]);
  const [prevLang, setPrevLang] = useState(lang);

  // Refresh the welcome message if language switches and only 1 message exists.
  // Adjusted during render (per https://react.dev/learn/you-might-not-need-an-effect)
  // instead of an effect, to avoid an extra render pass.
  if (lang !== prevLang) {
    setPrevLang(lang);
    if (messages.length === 1) {
      setMessages([buildWelcomeMessage(lang)]);
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const quickPromptsId = [
    "🚀 Siapa itu Andry Huang?",
    "🧠 Ceritakan tentang Qualiv AI Platform",
    "💻 Apa saja Tech Stack utama Andry?",
    "⛪ Apa itu project CG Home Sharing?",
    "📱 Bagaimana cara menghubungi Andry?",
  ];

  const quickPromptsEn = [
    "🚀 Who is Andry Huang?",
    "🧠 Tell me about Qualiv AI Platform",
    "💻 What is Andry's primary Tech Stack?",
    "⛪ What is CG Home Sharing project?",
    "📱 How can I contact Andry?",
  ];

  const quickPrompts = lang === "id" ? quickPromptsId : quickPromptsEn;

  function generateAnswer(query: string, currentLang: string): string {
    const q = query.toLowerCase();

    if (q.includes("siapa") || q.includes("who is") || q.includes("profil") || q.includes("about")) {
      return currentLang === "id"
        ? `👨‍💻 **Andry Huang** adalah **Senior Full-Stack & AI Systems Developer** berlokasi di **Surabaya, Indonesia** dengan **${yearsExp}+ tahun pengalaman**.\n\nSaat ini beliau bekerja sebagai Fullstack Developer di **MRI Software, Singapura (Remote)** dan juga merupakan **Founder & Lead Architect Qualiv** (qualiv.id).`
        : `👨‍💻 **Andry Huang** is a **Senior Full-Stack & AI Systems Developer** based in **Surabaya, Indonesia** with **${yearsExp}+ years of experience**.\n\nHe currently works as a Fullstack Developer at **MRI Software, Singapore (Remote)** and is the **Founder & Lead Architect of Qualiv** (qualiv.id).`;
    }

    if (q.includes("qualiv")) {
      return currentLang === "id"
        ? `🧠 **Qualiv (qualiv.id)** adalah platform SaaS rekruitmen berbasis AI multi-tenant yang didirikan dan dirancang oleh Andry Huang dari nol.\n\n✨ **Fitur Utama Qualiv**:\n• Screening & Parsing CV otomatis berbasis LLM (PDF/Docx)\n• Simulasi Wawancara AI Chat & Video Interview (LLM Interviewer)\n• Tes Logika & Asesmen Keterampilan Kandidat Otomatis\n• Redis Queue untuk pemrosesan masal\n• Billing Midtrans & Cloudflare R2 storage.`
        : `🧠 **Qualiv (qualiv.id)** is a multi-tenant AI recruitment SaaS platform founded & architected by Andry Huang from scratch.\n\n✨ **Key Features**:\n• LLM CV Screening & Parsing (PDF/Docx)\n• AI Chat & Video Interview Simulations (LLM Interviewer)\n• Automated Candidate Logic & Skill Testing\n• Redis Queue mass background processing\n• Midtrans Billing & Cloudflare R2 storage.`;
    }

    if (q.includes("tech") || q.includes("stack") || q.includes("keahlian") || q.includes("skills")) {
      return currentLang === "id"
        ? `⚡ **Tech Stack & Keahlian Utama Andry**:\n\n• **Backend**: .NET Core 9, C#, Node.js, NestJS, Laravel, REST APIs & GraphQL\n• **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, Flutter\n• **AI & Automation**: OpenAI GPT-4o API, Anthropic Claude 3.7, Model Context Protocol (MCP), AI Agents, Selenium Automation\n• **Database & Cloud**: PostgreSQL, MySQL, SQL Server, Redis, Prisma, Docker, Cloudflare R2, AWS.`
        : `⚡ **Andry's Core Tech Stack & Skills**:\n\n• **Backend**: .NET Core 9, C#, Node.js, NestJS, Laravel, REST APIs & GraphQL\n• **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, Flutter\n• **AI & Automation**: OpenAI GPT-4o API, Anthropic Claude 3.7, Model Context Protocol (MCP), AI Agents, Selenium\n• **Database & Cloud**: PostgreSQL, MySQL, SQL Server, Redis, Prisma, Docker, Cloudflare R2, AWS.`;
    }

    if (q.includes("cg") || q.includes("church") || q.includes("gereja") || q.includes("booking") || q.includes("sharing")) {
      return currentLang === "id"
        ? `🏡 **CG Home Sharing & Booking Platform** adalah proyek pelayanan volunteer untuk komunitas gereja.\n\nFitur-fiturnya meliputi listing rumah/ruangan kegiatan CG gaya Airbnb, peta interaktif Leaflet dengan filter wilayah BPS, workflow inspeksi kelayakan oleh Surveyor, verifikasi Nomor Induk Jemaat (NIJ), dan kalender peminjaman.`
        : `🏡 **CG Home Sharing & Booking Platform** is a volunteer church project for church communities.\n\nKey features include Airbnb-style Connect Group house listing, Leaflet interactive map with BPS regional filters, Surveyor inspection workflow, Member ID (NIJ) verification, and booking calendars.`;
    }

    if (q.includes("kontak") || q.includes("contact") || q.includes("hubungi") || q.includes("email") || q.includes("whatsapp")) {
      return currentLang === "id"
        ? `📱 **Cara Menghubungi Andry Huang**:\n\n• **WhatsApp**: +62 81-357-296-386\n• **GitHub**: [github.com/andrych17](https://github.com/andrych17)\n• **LinkedIn**: [linkedin.com/in/andry-huang-ba410a170](https://linkedin.com/in/andry-huang-ba410a170)\n• **Lokasi**: Surabaya, Indonesia`
        : `📱 **How to Contact Andry Huang**:\n\n• **WhatsApp**: +62 81-357-296-386\n• **GitHub**: [github.com/andrych17](https://github.com/andrych17)\n• **LinkedIn**: [linkedin.com/in/andry-huang-ba410a170](https://linkedin.com/in/andry-huang-ba410a170)\n• **Location**: Surabaya, Indonesia`;
    }

    return currentLang === "id"
      ? `Terima kasih atas pertanyaannya! Andry Huang adalah Fullstack & AI Systems Engineer berpengalaman ${yearsExp}+ tahun. Silakan tanyakan seputar portofolio, keahlian .NET/Next.js/AI, atau langsung hubungi via WhatsApp di +62 81-357-296-386!`
      : `Thanks for asking! Andry Huang is a Fullstack & AI Systems Engineer with ${yearsExp}+ years experience. Feel free to ask about his portfolio, .NET/Next.js/AI skills, or connect directly via WhatsApp at +62 81-357-296-386!`;
  }

  const MAX_MESSAGE_LENGTH = 300;

  async function fetchAIReply(history: Message[], textToSend: string): Promise<string> {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lang,
        messages: [...history, { sender: "user", text: textToSend }].map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Chat API responded with ${response.status}`);
    }

    const data = await response.json();
    if (typeof data.reply !== "string" || !data.reply.trim()) {
      throw new Error("Empty reply from chat API");
    }

    return data.reply;
  }

  async function handleSend(userText?: string) {
    if (isTyping) return;
    const textToSend = (userText || input).slice(0, MAX_MESSAGE_LENGTH);
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `msg-${messageIdRef.current++}`,
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const history = messages;
    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput("");
    setIsTyping(true);

    let botResponseText: string;
    try {
      botResponseText = await fetchAIReply(history, textToSend);
    } catch (error) {
      console.error("AI chat request failed, falling back to local answer", error);
      botResponseText = generateAnswer(textToSend, lang);
    }

    const botMsg: Message = {
      id: `msg-${messageIdRef.current++}`,
      sender: "bot",
      text: botResponseText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  }

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[90] flex items-center gap-2.5 px-4 py-3 rounded-full bg-[var(--accent)] text-[var(--bg)] font-medium shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Assistant"
      >
        <div className="relative">
          <Bot className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--bg)] rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--bg)] rounded-full" />
        </div>
        <span className="text-sm font-semibold tracking-wide hidden sm:inline">
          {lang === "id" ? "Tanya AI" : "Ask AI"}
        </span>
      </motion.button>

      {/* Chat Dialog Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-22 right-4 sm:right-6 z-[95] w-[92vw] sm:w-[400px] h-[520px] max-h-[80vh] bg-[var(--bg-2)]/98 backdrop-blur-xl border border-[var(--line)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-[var(--line)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[var(--accent)]">
                  <Bot className="w-5 h-5 text-[var(--bg)]" />
                </div>
                <div>
                  <h3 className="text-[var(--fg)] font-semibold text-sm flex items-center gap-1.5">
                    Andry AI Assistant
                    <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                  </h3>
                  <p className="text-[11px] text-[var(--mut)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    Online & Ready
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[var(--mut)] hover:text-[var(--fg)] hover:bg-[var(--line)] transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === "user"
                        ? "bg-[var(--accent)] text-[var(--bg)]"
                        : "bg-[var(--line)] text-[var(--fg)]"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-[var(--accent)] text-[var(--bg)] rounded-tr-none"
                        : "bg-white/5 border border-[var(--line)] text-[var(--fg-2)] rounded-tl-none"
                    }`}
                  >
                    <div className="leading-relaxed space-y-1">
                      {parseFormattedMarkdown(msg.text)}
                    </div>
                    <span className="text-[10px] mt-1 block text-right opacity-70">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 items-center">
                  <div className="w-7 h-7 rounded-full bg-[var(--line)] text-[var(--fg)] flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-[var(--line)] text-[var(--mut)] text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 bg-white/[0.02] border-t border-[var(--line)] flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  disabled={isTyping}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-[var(--line)] text-[11px] text-[var(--fg-2)] whitespace-nowrap transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="p-3 bg-[var(--bg-2)] border-t border-[var(--line)] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                maxLength={MAX_MESSAGE_LENGTH}
                disabled={isTyping}
                placeholder={lang === "id" ? "Tanyakan sesuatu tentang Andry..." : "Ask something about Andry..."}
                className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-[var(--line)] text-[var(--fg)] placeholder:text-[var(--mut)] text-xs focus:outline-none focus:border-[var(--accent)] transition-colors disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="p-2 rounded-xl bg-[var(--accent)] text-[var(--bg)] disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
