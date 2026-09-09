"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Heart,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Plus,
  Trash2,
  Printer,
  Calendar,
  User,
  Crown,
  DollarSign,
  Tag,
  PenTool,
  PartyPopper,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SignaturePad from "./SignaturePad";
import LoveAnimation from "./LoveAnimation";

export interface ItemPengajuan {
  id: string;
  nama: string;
  spesifikasi?: string;
  qty: number;
  harga: number;
  subtotal: number;
}

export interface PengajuanDocument {
  id: string;
  nomor_pengajuan: string;
  pemohon: string;
  approver: string;
  judul: string;
  keperluan: string;
  items: ItemPengajuan[];
  total_harga: number;
  tanda_tangan: string;
  catatan_cinta: string;
  approved_at: string;
}

const DEFAULT_ITEMS: ItemPengajuan[] = [
  {
    id: "item-1",
    nama: "Mechanical Keyboard Ergonomis ⌨️",
    spesifikasi: "Biar ketikan coding makin empuk, ga pegal, dan makin semangat cari cuan",
    qty: 1,
    harga: 350000,
    subtotal: 350000,
  },
  {
    id: "item-2",
    nama: "Kipas Meja USB / Desk Cooler ❄️",
    spesifikasi: "Biar meja kerja tetap sejuk, adem, dan kepala ga panas waktu mikir logic",
    qty: 1,
    harga: 150000,
    subtotal: 150000,
  },
];

const STORAGE_KEY = "pengajuan_gracia_tersayang";
const COOKIE_NAME = "gracia_approval_status";

export default function PengajuanClient() {
  const [showLoveAnimation, setShowLoveAnimation] = useState(false);
  const [savedDocument, setSavedDocument] = useState<PengajuanDocument | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Form State
  const [nomorPengajuan, setNomorPengajuan] = useState("");
  const [pemohon, setPemohon] = useState("Andry Huang 👨‍💻");
  const [approver, setApprover] = useState("Gracia Tersayang ❤️ (Head of Finance & Love)");
  const [judul, setJudul] = useState("Surat Pengajuan Pembelian Keyboard & Kipas Meja");
  const [keperluan, setKeperluan] = useState(
    "Untuk kenyamanan ergonomi saat coding harian dan menjaga sirkulasi udara workstation tetap sejuk. Dengan disetujuinya pengajuan ini, pemohon berjanji akan semakin rajin dan sayang kepada Gracia selamanya! 🥰"
  );
  const [items, setItems] = useState<ItemPengajuan[]>(DEFAULT_ITEMS);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [catatanCinta, setCatatanCinta] = useState("Disetujui dengan penuh cinta & kasih sayang! Jangan lupa istirahat yaa sayang 💕");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize data from Cookie/LocalStorage
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
    setNomorPengajuan(`LOVE-REQ-${dateStr}-001`);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSavedDocument(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const totalHarga = items.reduce((sum, it) => sum + (it.subtotal || 0), 0);

  const handleItemChange = (id: string, field: keyof ItemPengajuan, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === "qty" || field === "harga") {
          const qty = field === "qty" ? Number(value) : item.qty;
          const harga = field === "harga" ? Number(value) : item.harga;
          updated.subtotal = (qty || 0) * (harga || 0);
        }
        return updated;
      })
    );
  };

  const addItem = () => {
    const newItem: ItemPengajuan = {
      id: `item-${Date.now()}`,
      nama: "",
      spesifikasi: "",
      qty: 1,
      harga: 0,
      subtotal: 0,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleApproveAndSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!signatureData) {
      setErrorMessage("Mohon bubuhkan tanda tangan cinta dari Gracia pada kotak tanda tangan terlebih dahulu 💕");
      return;
    }

    const doc: PengajuanDocument = {
      id: `doc-${Date.now()}`,
      nomor_pengajuan: nomorPengajuan,
      pemohon,
      approver,
      judul,
      keperluan,
      items,
      total_harga: totalHarga,
      tanda_tangan: signatureData,
      catatan_cinta: catatanCinta,
      approved_at: new Date().toLocaleString("id-ID", {
        dateStyle: "full",
        timeStyle: "short",
      }),
    };

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(doc));
      // Save cookie (1 year expiry)
      document.cookie = `${COOKIE_NAME}=approved; max-age=31536000; path=/; SameSite=Lax`;
    } catch (err) {
      console.error("Gagal simpan ke storage:", err);
    }

    setSavedDocument(doc);

    // Trigger Heart Animation
    setShowLoveAnimation(true);
    setTimeout(() => {
      setShowLoveAnimation(false);
    }, 6000);

    // Scroll smoothly to result
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetApproval = () => {
    if (!confirm("Buka kembali formulir untuk tanda tangan ulang?")) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      document.cookie = `${COOKIE_NAME}=; max-age=0; path=/`;
    } catch {
      // ignore
    }
    setSavedDocument(null);
    setSignatureData(null);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
      {/* Love Floating Particles */}
      <LoveAnimation trigger={showLoveAnimation} />

      {/* Hero Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/60 border border-pink-500/40 text-pink-300 text-xs font-medium tracking-wide shadow-[0_0_15px_rgba(244,114,182,0.2)]">
          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
          Dokumen Khusus untuk Gracia Tersayang ❤️
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
          Pengajuan Pembelian & E-Restu
        </h1>
        <p className="text-sm text-[var(--mut)] max-w-xl mx-auto">
          Formulir pengadaan perlengkapan workstation (Keyboard & Kipas Meja) seharga total kisaran <strong className="text-pink-400 font-mono">Rp 500.000</strong> dengan persetujuan resmi dan tanda tangan cinta dari Gracia.
        </p>
      </div>

      {/* JIKA SUDAH DISETUJUI & TERSIMPAN DI COOKIE/STORAGE */}
      {savedDocument ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Banner Selamat */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-pink-500/50 bg-gradient-to-br from-pink-950/40 via-[#181216] to-[#121212] p-6 sm:p-8 text-center shadow-[0_0_40px_rgba(236,72,153,0.2)]">
            <div className="absolute top-2 right-3 text-2xl opacity-40">✨</div>
            <div className="absolute bottom-2 left-3 text-2xl opacity-40">💖</div>

            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/40 mb-4 shadow-inner">
              <PartyPopper className="w-8 h-8 animate-bounce" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-pink-200">
              Yaaay! Pengajuan Telah Disetujui 100%! ❤️
            </h2>
            <p className="text-sm text-pink-100/80 mt-2 max-w-lg mx-auto">
              Terima kasih banyak Gracia tersayang! Tanda tangan restu telah tersimpan manis di memori peramban (Cookie & LocalStorage).
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Cetak / Simpan Surat Restu PDF
              </button>
              <button
                onClick={handleResetApproval}
                className="px-4 py-2.5 rounded-lg bg-[var(--bg-2)] hover:bg-[#252525] border border-[var(--line)] text-xs text-[var(--fg-2)] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Tanda Tangan Ulang
              </button>
            </div>
          </div>

          {/* Lembar Dokumen Resmi */}
          <div className="bg-[#141414] border border-[var(--line-strong)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex flex-wrap items-center justify-between border-b border-[var(--line)] pb-4 gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-pink-400 block">
                  Surat Resmi Izin Pengadaan
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">{savedDocument.judul}</h3>
              </div>
              <div className="font-mono text-xs bg-black/60 px-3 py-1.5 rounded-md border border-pink-500/30 text-pink-300">
                {savedDocument.nomor_pengajuan}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-black/30 p-4 rounded-xl border border-[var(--line)]">
              <div>
                <span className="text-[var(--mut)] block">Pemohon:</span>
                <strong className="text-white text-sm">{savedDocument.pemohon}</strong>
              </div>
              <div>
                <span className="text-[var(--mut)] block">Yang Menyetujui (Approver):</span>
                <strong className="text-pink-300 text-sm flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-yellow-400" />
                  {savedDocument.approver}
                </strong>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-[var(--line)]/50">
                <span className="text-[var(--mut)] block">Alasan & Keperluan:</span>
                <p className="text-[var(--fg-2)] mt-0.5 leading-relaxed">{savedDocument.keperluan}</p>
              </div>
            </div>

            {/* Rincian Barang Table */}
            <div>
              <div className="text-xs font-mono uppercase text-[var(--mut)] mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-pink-400" /> Rincian Barang yang Disetujui:
              </div>
              <div className="border border-[var(--line)] rounded-lg overflow-hidden bg-[#0d0d0d]">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#1a1a1a] text-[var(--mut)] border-b border-[var(--line)]">
                    <tr>
                      <th className="p-3">Nama Barang</th>
                      <th className="p-3 text-center w-16">Qty</th>
                      <th className="p-3 text-right w-28">Harga</th>
                      <th className="p-3 text-right w-28">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    {savedDocument.items.map((it, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02]">
                        <td className="p-3">
                          <div className="font-semibold text-white">{it.nama}</div>
                          {it.spesifikasi && (
                            <div className="text-[11px] text-[var(--mut)] mt-0.5">{it.spesifikasi}</div>
                          )}
                        </td>
                        <td className="p-3 text-center font-mono">{it.qty}</td>
                        <td className="p-3 text-right font-mono">{formatRupiah(it.harga)}</td>
                        <td className="p-3 text-right font-mono font-medium text-white">
                          {formatRupiah(it.subtotal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-black/50 border-t-2 border-[var(--line)] font-bold">
                    <tr>
                      <td colSpan={3} className="p-3 text-right text-[var(--fg-2)]">
                        TOTAL ANGGARAN:
                      </td>
                      <td className="p-3 text-right font-mono text-pink-400 text-base">
                        {formatRupiah(savedDocument.total_harga)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Kotak Pengesahan & Tanda Tangan */}
            <div className="border-2 border-pink-500/30 rounded-xl p-5 bg-gradient-to-r from-pink-950/20 via-black to-pink-950/20 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1.5 text-xs max-w-sm">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-pink-900/60 text-pink-300 border border-pink-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Disetujui dengan Penuh Cinta
                </div>
                <div className="text-[var(--mut)] text-[11px]">
                  Disahkan pada: <span className="text-white">{savedDocument.approved_at}</span>
                </div>
                {savedDocument.catatan_cinta && (
                  <div className="p-2.5 rounded bg-pink-950/40 border border-pink-800/50 text-pink-200 text-xs italic mt-2">
                    &ldquo;{savedDocument.catatan_cinta}&rdquo;
                  </div>
                )}
              </div>

              <div className="text-center sm:text-right">
                <div className="text-[11px] text-[var(--mut)] mb-1">Tanda Tangan Gracia Tersayang:</div>
                {savedDocument.tanda_tangan ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={savedDocument.tanda_tangan}
                    alt="Tanda Tangan Cinta Gracia"
                    className="h-20 max-w-[180px] object-contain filter invert mx-auto sm:ml-auto border-b-2 border-pink-500/50 pb-1"
                  />
                ) : (
                  <div className="h-20 flex items-center justify-center text-xs text-[var(--mut)]">
                    (Belum ada tanda tangan)
                  </div>
                )}
                <span className="text-[10px] font-mono text-pink-400/80 block mt-1">
                  Verified Love Signature 💕
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* FORMULIR PENGAJUAN BELUM DI-APPROVE */
        <form onSubmit={handleApproveAndSave} className="space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-xl border border-red-800/80 bg-red-950/50 text-red-300 text-sm flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Card 1: Data Pengajuan */}
          <div className="bg-[var(--bg-2)] border border-[var(--line)] rounded-xl p-5 sm:p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-pink-400" />
                1. Data Pengajuan & Alasan
              </h2>
              <span className="text-xs font-mono text-pink-400 bg-pink-950/40 px-2.5 py-1 rounded border border-pink-800/50">
                {nomorPengajuan}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--fg-2)] mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-pink-400" /> Pemohon (Yang Butuh Keyboard & Kipas)
                </label>
                <input
                  type="text"
                  value={pemohon}
                  onChange={(e) => setPemohon(e.target.value)}
                  required
                  className="w-full bg-[#111111] border border-[var(--line)] rounded-md px-3 py-2 text-sm text-[var(--fg)] focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--fg-2)] mb-1 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-yellow-400" /> Penerima / Approver (Pengambil Keputusan)
                </label>
                <input
                  type="text"
                  value={approver}
                  onChange={(e) => setApprover(e.target.value)}
                  required
                  className="w-full bg-[#111111] border border-[var(--line)] rounded-md px-3 py-2 text-sm text-[var(--fg)] focus:border-pink-500 focus:outline-none font-medium text-pink-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[var(--fg-2)] mb-1">
                  Judul Pengajuan
                </label>
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  required
                  className="w-full bg-[#111111] border border-[var(--line)] rounded-md px-3 py-2 text-sm text-[var(--fg)] focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[var(--fg-2)] mb-1">
                  Alasan & Rayuan untuk Gracia Tersayang ❤️
                </label>
                <textarea
                  rows={3}
                  value={keperluan}
                  onChange={(e) => setKeperluan(e.target.value)}
                  className="w-full bg-[#111111] border border-[var(--line)] rounded-md px-3 py-2 text-sm text-[var(--fg)] focus:border-pink-500 focus:outline-none resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Rincian Barang & Anggaran ~500rb an */}
          <div className="bg-[var(--bg-2)] border border-[var(--line)] rounded-xl p-5 sm:p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                2. Rincian Barang & Anggaran
              </h2>
              <button
                type="button"
                onClick={addItem}
                className="px-2.5 py-1 text-xs rounded border border-[var(--line)] bg-[#111111] hover:border-pink-400 text-[var(--fg)] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3 text-pink-400" />
                Tambah Item
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--mut)]">
                    <th className="py-2 px-2">Nama Barang & Alasan</th>
                    <th className="py-2 px-2 w-16 text-center">Qty</th>
                    <th className="py-2 px-2 w-28 text-right">Harga Satuan</th>
                    <th className="py-2 px-2 w-32 text-right">Subtotal</th>
                    <th className="py-2 px-2 w-8 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]/50">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02]">
                      <td className="py-2 px-2 space-y-1">
                        <input
                          type="text"
                          value={item.nama}
                          onChange={(e) => handleItemChange(item.id, "nama", e.target.value)}
                          placeholder="Nama Barang"
                          required
                          className="w-full bg-[#111111] border border-[var(--line)] rounded px-2.5 py-1.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={item.spesifikasi || ""}
                          onChange={(e) => handleItemChange(item.id, "spesifikasi", e.target.value)}
                          placeholder="Catatan / spesifikasi"
                          className="w-full bg-transparent border-0 text-[11px] text-[var(--mut)] px-1 focus:outline-none focus:text-pink-300"
                        />
                      </td>
                      <td className="py-2 px-2 align-top">
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => handleItemChange(item.id, "qty", Math.max(1, parseInt(e.target.value) || 1))}
                          required
                          className="w-full text-center bg-[#111111] border border-[var(--line)] rounded px-2 py-1.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 align-top">
                        <input
                          type="number"
                          step="1000"
                          min="0"
                          value={item.harga}
                          onChange={(e) => handleItemChange(item.id, "harga", Math.max(0, parseInt(e.target.value) || 0))}
                          required
                          className="w-full text-right bg-[#111111] border border-[var(--line)] rounded px-2 py-1.5 text-xs text-white focus:border-pink-500 focus:outline-none font-mono"
                        />
                      </td>
                      <td className="py-2 px-2 text-right font-mono font-medium text-white align-top pt-3">
                        {formatRupiah(item.subtotal)}
                      </td>
                      <td className="py-2 px-2 text-center align-top pt-2.5">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length <= 1}
                          className="p-1 text-[var(--mut)] hover:text-red-400 disabled:opacity-20 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-[var(--line)] font-semibold text-sm">
                    <td colSpan={3} className="py-3 px-2 text-right text-[var(--fg-2)]">
                      Total Estimasi Biaya:
                    </td>
                    <td className="py-3 px-2 text-right text-pink-400 font-mono text-base font-bold">
                      {formatRupiah(totalHarga)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Card 3: Kotak Tanda Tangan Khusus Gracia */}
          <div className="bg-[var(--bg-2)] border-2 border-pink-500/40 rounded-xl p-5 sm:p-6 space-y-4 shadow-[0_0_25px_rgba(236,72,153,0.15)]">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <h2 className="text-base font-semibold text-pink-200 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-pink-400" />
                3. Kotak Tanda Tangan & Restu dari Gracia Tersayang 💕
              </h2>
            </div>

            <p className="text-xs text-[var(--fg-2)]">
              Silakan Gracia tanda tangan langsung di dalam kotak berikut menggunakan jari di layar HP / mouse:
            </p>

            {/* Signature Canvas */}
            <SignaturePad onSignatureChange={setSignatureData} height={190} />

            <div>
              <label className="block text-xs font-medium text-[var(--fg-2)] mb-1 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" /> Pesan Cinta / Syarat dari Gracia:
              </label>
              <input
                type="text"
                value={catatanCinta}
                onChange={(e) => setCatatanCinta(e.target.value)}
                placeholder="Misal: Boleh beli, tapi jangan lupa temenin jalan-jalan yaa ❤️"
                className="w-full bg-[#111111] border border-[var(--line)] rounded-md px-3 py-2 text-sm text-[var(--fg)] focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Tombol Eksekusi Beri Restu */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 hover:from-pink-500 hover:to-rose-400 text-white font-bold text-base shadow-[0_0_30px_rgba(244,114,182,0.4)] hover:shadow-[0_0_40px_rgba(244,114,182,0.6)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 animate-spin" />
              Beri Restu & Tanda Tangani Pengajuan ❤️
              <Heart className="w-5 h-5 fill-white" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
