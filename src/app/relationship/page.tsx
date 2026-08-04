"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Heart,
  Sparkles,
  ArrowLeft,
  Lock,
  Stars,
  Flame,
  Music,
  Smile,
  Sun,
  Crown,
  Quote,
} from "lucide-react";

export default function RelationshipPage() {
  const [likes, setLikes] = useState(999);
  const [hasLiked, setHasLiked] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loveNotes = [
    "Senyumanmu selalu jadi alasan terbaik buat tersenyum setiap hari. ✨",
    "Terima kasih sudah selalu jadi tempat pulang yang paling hangat dan nyaman, sayang. 🏡❤️",
    "Setiap langkah, mimpi, dan masa depan terasa jauh lebih indah karena ada kamu di sisiku. 💫",
    "Kamu bukan cuma pasangan, tapi sahabat terbaik dan berkah terindah dalam hidupku. 🌹",
  ];

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const nextNote = () => {
    setCurrentNoteIndex((prev) => (prev + 1) % loveNotes.length);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#060010] text-white selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden relative">
      {/* Ambient Romantic Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[35rem] h-[35rem] bg-gradient-to-tr from-rose-600/30 via-pink-500/20 to-purple-600/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-10 -left-20 w-96 h-96 bg-rose-500/20 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[130px]" />
      </div>

      {/* Top Navbar */}
      <nav className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm text-gray-300 hover:text-white transition-all backdrop-blur"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Portfolio</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono tracking-wider backdrop-blur shadow-[0_0_15px_rgba(244,63,94,0.2)]">
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 animate-pulse" />
          <span>SECRET LOVE VAULT</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 pt-10 pb-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-purple-500/20 border border-rose-400/40 text-rose-200 text-xs sm:text-sm font-medium mb-6 backdrop-blur shadow-[0_0_25px_rgba(244,63,94,0.3)]"
        >
          <Sparkles className="w-4 h-4 text-rose-400 animate-spin" style={{ animationDuration: "6s" }} />
          <span>For My Dearest Gracia Violeta</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-purple-200 mb-4"
        >
          I Love You, Sayang ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-light"
        >
          Halaman rahasia ini khusus buat kamu. Tempat pengingat betapa berharganya kamu dalam hidupku, hari ini dan selamanya.
        </motion.p>
      </section>

      {/* Main Romantic Photo & Love Letter Card */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-rose-500/30 backdrop-blur-xl shadow-[0_0_50px_rgba(244,63,94,0.15)] relative overflow-hidden"
        >
          {/* Subtle Heart Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5">
            <Heart className="w-96 h-96 text-rose-500 fill-rose-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Real Gracia Photo */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl p-2 bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-500 shadow-[0_0_40px_rgba(244,63,94,0.4)] group">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-950">
                  <Image
                    src="/gracia.jpg"
                    alt="Gracia Violeta"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="px-3 py-1 rounded-full bg-rose-500/80 backdrop-blur text-xs font-semibold text-white tracking-wide shadow-lg inline-flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>Gracia Violeta</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Romantic Message Letter */}
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>My Queen • My Favorite Person</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Terima Kasih Sudah Hadir dalam Hidupku ✨
              </h2>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Makasih ya sayang sudah selalu sabar, nemenin, kasih perhatian, dan selalu jadi energi positif buat aku. Bersamamu buat segalanya terasa lebih ringan dan bermakna.
              </p>

              <p className="text-rose-200 text-sm sm:text-base font-medium leading-relaxed italic">
                "Setiap hari bersamamu adalah berkah terbaik yang selalu aku syukuri. I'm so proud of you & I love you more than words can say!"
              </p>

              <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                {["Sayangku", "Cintaku", "My Happiness", "Forever & Always"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs font-medium"
                  >
                    ❤️ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Love Notes Carousel / Card */}
      <section className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur text-center relative overflow-hidden"
        >
          <Quote className="w-8 h-8 text-rose-400/40 mx-auto mb-2" />
          
          <AnimatePresence mode="wait">
            <motion.p
              key={currentNoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-base sm:text-lg font-medium text-rose-100 min-h-[4rem] flex items-center justify-center px-4"
            >
              "{loveNotes[currentNoteIndex]}"
            </motion.p>
          </AnimatePresence>

          <button
            onClick={nextNote}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-mono border border-rose-400/30 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            <span>Baca Pesan Lainnya</span>
          </button>
        </motion.div>
      </section>

      {/* Interactive Love Button */}
      <section className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 py-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="p-8 rounded-3xl bg-gradient-to-r from-rose-950/50 via-pink-950/40 to-purple-950/50 border border-rose-500/40 backdrop-blur-xl shadow-[0_0_40px_rgba(244,63,94,0.25)]"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Love Counter
          </h3>
          <p className="text-rose-200 text-xs sm:text-sm mb-6">
            Klik tombol di bawah ini buat kirim cinta untuk kita berdua ❤️
          </p>

          <button
            onClick={handleLike}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base sm:text-lg transition-all transform active:scale-95 shadow-xl ${
              hasLiked
                ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-rose-600/50 scale-105"
                : "bg-white/10 hover:bg-rose-500/20 text-rose-200 border border-rose-400/40 shadow-rose-500/20"
            }`}
          >
            <Heart
              className={`w-6 h-6 transition-transform ${
                hasLiked ? "fill-white scale-125 animate-ping" : "text-rose-400"
              }`}
            />
            <span>{hasLiked ? "I Love You Too, Sayang! ❤️" : "Kirim Love (I Love You)"}</span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-mono">
              {likes}
            </span>
          </button>
        </motion.div>
      </section>

      {/* Romantic Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-gray-500 text-xs font-mono">
        <p className="flex items-center justify-center gap-1.5 text-rose-300">
          <span>Made with endless love</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline animate-bounce" />
          <span>by Andry Huang for Gracia Violeta</span>
        </p>
        <p className="mt-1 text-gray-600">Hidden Love Page • andryhuang.com/relationship</p>
      </footer>
    </div>
  );
}
