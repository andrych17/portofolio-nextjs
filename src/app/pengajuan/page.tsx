import type { Metadata } from "next";
import PengajuanClient from "@/components/pengajuan/PengajuanClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://andryhuang.com";

export const metadata: Metadata = {
  title: "Surat Pengajuan Keyboard & Kipas untuk Gracia Tersayang ❤️",
  description:
    "Surat permohonan izin pengadaan keyboard & kipas kerja (~Rp 500.000) dengan tanda tangan cinta online dari Gracia Tersayang.",
  alternates: {
    canonical: `${SITE_URL}/pengajuan`,
  },
};

export default function PengajuanPage() {
  return (
    <main className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-[#fff1f5] via-[#faf8f5] to-[#ffe4e8] text-stone-900 selection:bg-rose-200 selection:text-rose-900">
      <PengajuanClient />
    </main>
  );
}
