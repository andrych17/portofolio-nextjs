import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import PengajuanClient from "@/components/pengajuan/PengajuanClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://andryhuang.com";

export const metadata: Metadata = {
  title: "Surat Pengajuan Keyboard & Kipas untuk Gracia Tersayang ❤️ • Andry Huang",
  description:
    "Surat permohonan izin pengadaan keyboard & kipas kerja (~Rp 500.000) dengan tanda tangan cinta online dari Gracia Tersayang.",
  alternates: {
    canonical: `${SITE_URL}/pengajuan`,
  },
};

export default function PengajuanPage() {
  return (
    <main className="min-h-screen min-h-[100dvh] bg-[var(--bg)] text-[var(--fg)] flex flex-col justify-between">
      <Navbar />
      <div className="pt-24 pb-12 flex-1">
        <PengajuanClient />
      </div>
      <Footer />
      <AIChatbot />
    </main>
  );
}
