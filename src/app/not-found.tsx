"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, SearchX } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#030014] px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.15), transparent 70%)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-md"
      >
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.4)]">
          <SearchX className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent mb-3">
          404
        </h1>

        <p className="text-white text-lg font-semibold mb-2">
          {lang === "id" ? "Halaman Tidak Ditemukan" : "Page Not Found"}
        </p>
        <p className="text-gray-400 text-sm mb-8">
          {lang === "id"
            ? "Halaman yang kamu cari tidak ada atau sudah dipindahkan."
            : "The page you're looking for doesn't exist or has been moved."}
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white text-sm font-medium shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
        >
          <Home className="w-4 h-4" />
          {lang === "id" ? "Kembali ke Beranda" : "Back to Home"}
        </Link>
      </motion.div>
    </main>
  );
}
