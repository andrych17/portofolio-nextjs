"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Heart,
  Sparkles,
  ExternalLink,
  Award,
  GraduationCap,
  Briefcase,
  ArrowLeft,
  Lock,
  Star,
  MapPin,
} from "lucide-react";

export default function RelationshipPage() {
  const [likes, setLikes] = useState(100);
  const [hasLiked, setHasLiked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#030014] text-white selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden">
      {/* Background Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-purple-600/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-[28rem] h-[28rem] bg-cyan-600/20 rounded-full blur-[130px]" />
      </div>

      {/* Top Navbar */}
      <nav className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm text-gray-300 hover:text-white transition-all backdrop-blur"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono tracking-wider backdrop-blur">
          <Lock className="w-3.5 h-3.5 text-rose-400" />
          <span>CONFIDENTIAL • HIDDEN VAULT</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 pt-12 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500/20 via-purple-500/20 to-cyan-500/20 border border-rose-400/30 text-rose-200 text-xs sm:text-sm font-medium mb-6 backdrop-blur shadow-[0_0_20px_rgba(244,63,94,0.2)]"
        >
          <Sparkles className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>Special Appreciation & Relationship Story</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-purple-200 to-cyan-200 mb-4"
        >
          Andry Huang & Gracia Violeta
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Celebrating love, mutual growth, shared ambition, and continuous encouragement in career & life.
        </motion.p>
      </section>

      {/* Profile Card Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          {/* Subtle card glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-2 border-rose-400/40 p-1.5 bg-gradient-to-b from-rose-500/30 to-purple-500/30 shadow-[0_0_30px_rgba(244,63,94,0.3)] group">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/gracia.jpg"
                    alt="Gracia Violeta"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/80 backdrop-blur text-[11px] font-semibold text-white tracking-wide">
                      ★ Lulusan Terbaik UNAIR
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-[11px] font-mono text-cyan-200 border border-cyan-400/30">
                      IPK 3.69
                    </span>
                  </div>
                </div>
              </div>

              {/* LinkedIn Action Button */}
              <a
                href="https://www.linkedin.com/in/gracia-violeta-483b11313/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full max-w-xs flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-600 hover:from-rose-500 hover:to-cyan-500 text-white font-medium text-sm shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all transform hover:-translate-y-0.5"
              >
                <span>View Gracia's LinkedIn</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Profile Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono uppercase tracking-wider mb-2">
                  <Star className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                  <span>Featured Partner Profile</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                  Gracia Violeta, S.Pi.
                </h2>
                <p className="text-rose-300 text-sm sm:text-base font-medium mt-1">
                  Staff Admin Marketing Export Udang • PT. Bumi Menara Internusa
                </p>
                <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>Surabaya & Depok, Indonesia</span>
                </p>
              </div>

              <div className="space-y-3 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-b border-white/10 py-4">
                <div className="flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">Pendidikan:</strong> Sarjana Akuakultur (S1) — Universitas Airlangga (IPK 3.69 / 4.00, Predikat Lulusan Terbaik).
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Briefcase className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">Pengalaman Karir:</strong> Admin Marketing Export Udang & Admin Produksi di PT. Bumi Menara Internusa (Mengelola Proforma Invoice, Sales Order ekspor internasional, laporan biaya operasional, dan KPI).
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">Keahlian Utama:</strong> Dokumen Ekspor & Perdagangan Internasional, Microsoft Office, Analytics Biaya Produksi, Relationship Building, & Berpikir Logis.
                  </div>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400">
                  Key Skills & Competencies
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Export Trade Admin",
                    "Proforma Invoice",
                    "Sales Order Processing",
                    "Operational Costing",
                    "Relationship Building",
                    "Cross-Division Coordination",
                    "Logical Thinking",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Shared Values & Story Highlights */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Key Highlights & Shared Strengths
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            Complementary expertise across Software Engineering & International Trade Operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur hover:border-rose-400/40 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300 mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Academic Excellence</h4>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Lulusan Terbaik S1 Akuakultur Universitas Airlangga dengan IPK 3.69/4.00, membuktikan ketelitian, dedikasi, dan standar kerja yang tinggi.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur hover:border-purple-400/40 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-4 group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Export Operations</h4>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Mengelola dokumen perdagangan internasional dan aliran operasional ekspor udang secara sistematis dan berstandar global di PT Bumi Menara Internusa.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur hover:border-cyan-400/40 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-4 group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Mutual Support & Growth</h4>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Saling mendukung dalam membangun karir, cita-cita, serta pengembangan diri baik di industri teknologi maupun administrasi bisnis internasional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Love & Appreciation Counter */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="p-8 rounded-3xl bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-cyan-950/40 border border-rose-500/30 backdrop-blur-xl shadow-2xl"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Send Love & Appreciation
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm mb-6 max-w-md mx-auto">
            Click the heart button below to leave a token of love and encouragement for Gracia Violeta & Andry Huang.
          </p>

          <button
            onClick={handleLike}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base sm:text-lg transition-all transform active:scale-95 shadow-lg ${
              hasLiked
                ? "bg-rose-600 text-white shadow-rose-600/50"
                : "bg-white/10 hover:bg-rose-500/20 text-rose-200 border border-rose-400/40 shadow-rose-500/20"
            }`}
          >
            <Heart
              className={`w-6 h-6 transition-transform ${
                hasLiked ? "fill-white scale-125 animate-bounce" : "text-rose-400"
              }`}
            />
            <span>{hasLiked ? "Appreciated!" : "Show Appreciation"}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-mono">
              {likes}
            </span>
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-gray-500 text-xs font-mono">
        <p className="flex items-center justify-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
          <span>by Andry Huang for Gracia Violeta</span>
        </p>
        <p className="mt-1 text-gray-600">Hidden Page • andryhuang.com/relationship</p>
      </footer>
    </div>
  );
}
