"use client";

import React, { useState, useEffect } from "react";
import {
  Heart,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Plus,
  Trash2,
  Printer,
  User,
  Crown,
  DollarSign,
  Tag,
  PenTool,
  PartyPopper,
  Keyboard,
  Fan,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import SignaturePad from "./SignaturePad";
import LoveAnimation from "./LoveAnimation";

export interface ItemPengajuan {
  id: string;
  nama: string;
  spesifikasi?: string;
  qty: number;
  harga: number;
  subtotal: number;
  iconType?: "keyboard" | "fan" | "custom";
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
    nama: "Mechanical Keyboard (TKL Ergonomis)",
    spesifikasi: "Switch tactile empuk, jari ga pegal saat coding harian (Max 400rb)",
    qty: 1,
    harga: 385000,
    subtotal: 385000,
    iconType: "keyboard",
  },
  {
    id: "item-2",
    nama: "USB Desk Fan / Workstation Air Cooler",
    spesifikasi: "3-speed silent motor, meja kerja adem & kepala sejuk waktu mikir",
    qty: 1,
    harga: 115000,
    subtotal: 115000,
    iconType: "fan",
  },
];

const STORAGE_KEY = "pengajuan_gracia_tersayang_v4";
const COOKIE_NAME = "gracia_approval_status";

export default function PengajuanClient() {
  const [showLoveAnimation, setShowLoveAnimation] = useState(false);
  const [savedDocument, setSavedDocument] = useState<PengajuanDocument | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Form State
  const [nomorPengajuan, setNomorPengajuan] = useState("");
  const [pemohon, setPemohon] = useState("Andry Huang (Suami/Pasangan Rajin Coding 👨‍💻)");
  const [approver, setApprover] = useState("Gracia Tersayang ❤️ (Head of Budget & Love 👑)");
  const [judul, setJudul] = useState("Surat Pengajuan Pembelian Keyboard & Kipas Meja");
  const [keperluan, setKeperluan] = useState(
    "Agar ketikan coding harian empuk tanpa bikin jari pegal dan meja kerja tetap sejuk dingin. Dengan disetujuinya pengajuan ini (keyboard max 400rb & kipas 115rb), pemohon berjanji akan semakin rajin, produktif, dan makin sayang Gracia selamanya! 🥰"
  );
  const [items, setItems] = useState<ItemPengajuan[]>(DEFAULT_ITEMS);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [catatanCinta, setCatatanCinta] = useState("Disetujui dengan penuh cinta! Jangan lupa istirahat & rajin temenin jalan-jalan yaa 💕");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize data from LocalStorage
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
      iconType: "custom",
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
      setErrorMessage("Silakan Gracia bubuhkan tanda tangan cinta di dalam kotak tanda tangan yaa sayang 💕");
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

    // Save to localStorage & cookie
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(doc));
      document.cookie = `${COOKIE_NAME}=approved; max-age=31536000; path=/; SameSite=Lax`;
    } catch (err) {
      console.error("Gagal simpan ke storage:", err);
    }

    setSavedDocument(doc);

    // Trigger Heart Animation
    setShowLoveAnimation(true);
    setTimeout(() => {
      setShowLoveAnimation(false);
    }, 6500);

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
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-6 py-6 sm:py-12 relative selection:bg-rose-200 selection:text-rose-900">
      {/* Love Floating Particles Engine */}
      <LoveAnimation trigger={showLoveAnimation} />

      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 sm:mb-10 space-y-2.5 sm:space-y-4"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold tracking-wide shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse shrink-0" />
          <span>Surat Pengajuan untuk Gracia Tersayang ❤️</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-stone-900 font-sans leading-tight">
          Permohonan Izin & E-Restu Pembelian
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed px-2">
          Pengadaan Keyboard (Budget Max Rp 400.000) & Kipas Meja USB seharga total <strong className="text-rose-600 font-bold">Rp 500.000</strong> dengan persetujuan resmi dan tanda tangan cinta dari Gracia.
        </p>
      </motion.div>

      {/* JIKA SUDAH DISETUJUI & TERSIMPAN DI COOKIE/STORAGE */}
      {savedDocument ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Banner Selamat & Approved */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-rose-200 bg-gradient-to-br from-rose-50 via-white to-pink-50/70 p-5 sm:p-8 text-center shadow-xl shadow-rose-100/70">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-200 mb-3 animate-bounce">
              <PartyPopper className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Disetujui 100% oleh Gracia! ❤️
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
              Makasih banyaaak Gracia tersayang! Tanda tangan restu telah tersimpan di browser. Keyboard & Kipas siap meluncur!
            </p>

            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5">
              <button
                onClick={() => window.print()}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-rose-200 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Cetak / Simpan Surat Restu PDF
              </button>
              <button
                onClick={handleResetApproval}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-xs sm:text-sm font-medium text-stone-700 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                Tanda Tangan Ulang
              </button>
            </div>
          </div>

          {/* Lembar Dokumen Surat Resmi (Paper Certificate Style) */}
          <div className="bg-white border border-stone-200 rounded-2xl sm:rounded-3xl p-4 sm:p-10 space-y-5 sm:space-y-6 shadow-xl shadow-rose-100/40 text-stone-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 gap-2">
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-600 block">
                  Surat Resmi Pengesahan Workstation
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-stone-900 mt-0.5">{savedDocument.judul}</h3>
              </div>
              <div className="self-start sm:self-auto font-mono text-xs bg-rose-50 text-rose-700 px-3 py-1 rounded-lg border border-rose-200 font-semibold">
                {savedDocument.nomor_pengajuan}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm bg-stone-50 p-3.5 sm:p-4 rounded-2xl border border-stone-200">
              <div>
                <span className="text-stone-500 block text-[11px]">Pemohon:</span>
                <strong className="text-stone-900">{savedDocument.pemohon}</strong>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Yang Menyetujui (Approver):</span>
                <strong className="text-rose-700 flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  {savedDocument.approver}
                </strong>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-stone-200">
                <span className="text-stone-500 block text-[11px]">Alasan & Keperluan:</span>
                <p className="text-stone-700 mt-0.5 leading-relaxed text-xs">{savedDocument.keperluan}</p>
              </div>
            </div>

            {/* Rincian Barang — Mobile Responsive Card View + Desktop Table */}
            <div>
              <div className="text-xs font-bold uppercase text-stone-600 mb-2.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-rose-500" /> Rincian Barang yang Disetujui:
              </div>

              {/* Mobile Card List (Screen < sm) */}
              <div className="space-y-2.5 sm:hidden">
                {savedDocument.items.map((it, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                        {it.iconType === "keyboard" && <Keyboard className="w-4 h-4 text-rose-500 shrink-0" />}
                        {it.iconType === "fan" && <Fan className="w-4 h-4 text-sky-500 shrink-0" />}
                        <span>{it.nama}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-stone-200/80 text-stone-800 text-xs font-mono font-bold shrink-0">
                        {it.qty}x
                      </span>
                    </div>
                    {it.spesifikasi && (
                      <p className="text-[11px] text-stone-500">{it.spesifikasi}</p>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
                      <span className="text-stone-500">Harga: {formatRupiah(it.harga)}</span>
                      <span className="font-mono font-bold text-stone-900 text-sm">{formatRupiah(it.subtotal)}</span>
                    </div>
                  </div>
                ))}
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between font-bold text-sm">
                  <span className="text-stone-700">TOTAL ANGGARAN:</span>
                  <span className="font-mono text-rose-600 text-base">{formatRupiah(savedDocument.total_harga)}</span>
                </div>
              </div>

              {/* Desktop Table View (Screen >= sm) */}
              <div className="hidden sm:block border border-stone-200 rounded-2xl overflow-hidden bg-white">
                <table className="w-full text-xs sm:text-sm text-left">
                  <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 font-semibold">
                    <tr>
                      <th className="p-3.5">Nama Barang</th>
                      <th className="p-3.5 text-center w-16">Qty</th>
                      <th className="p-3.5 text-right w-32">Harga Satuan</th>
                      <th className="p-3.5 text-right w-32">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {savedDocument.items.map((it, idx) => (
                      <tr key={idx} className="hover:bg-rose-50/30 transition-colors">
                        <td className="p-3.5">
                          <div className="font-semibold text-stone-900 flex items-center gap-2">
                            {it.iconType === "keyboard" && <Keyboard className="w-4 h-4 text-rose-500" />}
                            {it.iconType === "fan" && <Fan className="w-4 h-4 text-sky-500" />}
                            {it.nama}
                          </div>
                          {it.spesifikasi && (
                            <div className="text-[11px] text-stone-500 mt-0.5">{it.spesifikasi}</div>
                          )}
                        </td>
                        <td className="p-3.5 text-center font-mono text-stone-700">{it.qty}</td>
                        <td className="p-3.5 text-right font-mono text-stone-700">{formatRupiah(it.harga)}</td>
                        <td className="p-3.5 text-right font-mono font-bold text-stone-900">
                          {formatRupiah(it.subtotal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-stone-50/90 border-t-2 border-stone-200 font-bold">
                    <tr>
                      <td colSpan={3} className="p-3.5 text-right text-stone-600">
                        TOTAL ANGGARAN:
                      </td>
                      <td className="p-3.5 text-right font-mono text-rose-600 text-base font-extrabold">
                        {formatRupiah(savedDocument.total_harga)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Kotak Pengesahan & Tanda Tangan */}
            <div className="border-2 border-rose-200 rounded-2xl p-4 sm:p-6 bg-gradient-to-r from-rose-50 via-white to-pink-50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1.5 text-xs w-full sm:max-w-sm text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" /> Disahkan dengan Penuh Kasih Sayang
                </div>
                <div className="text-stone-500 text-[11px]">
                  Waktu: <span className="text-stone-900 font-medium">{savedDocument.approved_at}</span>
                </div>
                {savedDocument.catatan_cinta && (
                  <div className="p-3 rounded-xl bg-white border border-rose-200 text-rose-800 text-xs italic mt-1 shadow-sm text-left">
                    &ldquo;{savedDocument.catatan_cinta}&rdquo;
                  </div>
                )}
              </div>

              <div className="text-center sm:text-right w-full sm:w-auto">
                <div className="text-xs text-stone-500 mb-1 font-medium flex items-center justify-center sm:justify-end gap-1">
                  <Award className="w-3.5 h-3.5 text-rose-500" /> Tanda Tangan Resmi Gracia:
                </div>
                {savedDocument.tanda_tangan ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={savedDocument.tanda_tangan}
                    alt="Tanda Tangan Cinta Gracia"
                    className="h-16 sm:h-20 max-w-[180px] object-contain mx-auto sm:ml-auto border-b-2 border-rose-300 pb-1"
                  />
                ) : (
                  <div className="h-16 flex items-center justify-center text-xs text-stone-400">
                    (Belum ada tanda tangan)
                  </div>
                )}
                <span className="text-[10px] font-mono text-rose-600 font-bold block mt-1">
                  Official Love Signature Verified 💕
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* FORMULIR PENGAJUAN BELUM DI-APPROVE */
        <form onSubmit={handleApproveAndSave} className="space-y-4 sm:space-y-6">
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 sm:p-4 rounded-2xl border border-rose-300 bg-rose-50 text-rose-800 text-xs sm:text-sm flex items-center gap-2.5 shadow-sm"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Card 1: Data Pengajuan */}
          <div className="bg-white border border-stone-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-3.5 sm:space-y-4 shadow-xl shadow-rose-100/30">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-sm sm:text-lg font-bold text-stone-900 flex items-center gap-1.5 sm:gap-2">
                <Tag className="w-4 h-4 text-rose-500 shrink-0" />
                1. Data Pengajuan & Alasan
              </h2>
              <span className="text-[11px] sm:text-xs font-mono font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg border border-rose-200">
                {nomorPengajuan}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-rose-500" /> Pemohon (Yang Butuh Keyboard)
                </label>
                <input
                  type="text"
                  value={pemohon}
                  onChange={(e) => setPemohon(e.target.value)}
                  required
                  className="min-h-[44px] w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-sm text-stone-900 focus:bg-white focus:border-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-500" /> Penerima / Approver (Gracia)
                </label>
                <input
                  type="text"
                  value={approver}
                  onChange={(e) => setApprover(e.target.value)}
                  required
                  className="min-h-[44px] w-full bg-rose-50/50 border border-rose-200 rounded-xl px-3.5 py-2 text-sm text-rose-900 font-medium focus:bg-white focus:border-rose-400 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Judul Pengajuan
                </label>
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  required
                  className="min-h-[44px] w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-sm text-stone-900 focus:bg-white focus:border-rose-400 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Alasan & Rayuan untuk Gracia Tersayang ❤️
                </label>
                <textarea
                  rows={3}
                  value={keperluan}
                  onChange={(e) => setKeperluan(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-rose-400 focus:outline-none resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Rincian Barang & Anggaran — Mobile-First Cards & Responsive Table */}
          <div className="bg-white border border-stone-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-4 shadow-xl shadow-rose-100/30">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h2 className="text-sm sm:text-lg font-bold text-stone-900 flex items-center gap-1.5 sm:gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                  2. Rincian Barang & Biaya
                </h2>
                <p className="text-[11px] text-stone-500 mt-0.5">Keyboard Max Rp 400.000 + Kipas ~Rp 115.000</p>
              </div>
              <button
                type="button"
                onClick={addItem}
                className="min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-rose-600" />
                Tambah
              </button>
            </div>

            {/* MOBILE ITEM CARDS (Screen < sm) */}
            <div className="space-y-3 sm:hidden">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2.5 relative shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-600 font-mono">
                      Item #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length <= 1}
                      className="p-1 text-stone-400 hover:text-rose-600 disabled:opacity-20 transition-colors"
                      title="Hapus barang"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Nama Barang Mobile */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Nama Barang:
                    </label>
                    <input
                      type="text"
                      value={item.nama}
                      onChange={(e) => handleItemChange(item.id, "nama", e.target.value)}
                      placeholder="Nama barang..."
                      required
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm font-semibold text-stone-900 focus:border-rose-400 focus:outline-none"
                    />
                  </div>

                  {/* Spesifikasi / Alasan Mobile */}
                  <div>
                    <label className="block text-[10px] font-medium text-stone-500 mb-0.5">
                      Catatan / Fungsi:
                    </label>
                    <input
                      type="text"
                      value={item.spesifikasi || ""}
                      onChange={(e) => handleItemChange(item.id, "spesifikasi", e.target.value)}
                      placeholder="Catatan..."
                      className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1 text-xs text-stone-600 focus:border-rose-400 focus:outline-none"
                    />
                  </div>

                  {/* Qty & Harga Mobile */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="block text-[10px] font-medium text-stone-500 mb-0.5">
                        Jumlah (Qty):
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => handleItemChange(item.id, "qty", Math.max(1, parseInt(e.target.value) || 1))}
                        required
                        className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-center font-bold text-stone-900 focus:border-rose-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-stone-500 mb-0.5">
                        Harga (Rp):
                      </label>
                      <input
                        type="number"
                        step="1000"
                        min="0"
                        value={item.harga}
                        onChange={(e) => handleItemChange(item.id, "harga", Math.max(0, parseInt(e.target.value) || 0))}
                        required
                        className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-right font-mono font-bold text-stone-900 focus:border-rose-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Subtotal Mobile */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs font-semibold">
                    <span className="text-stone-500">Subtotal Item:</span>
                    <span className="font-mono text-rose-600 font-bold text-sm">
                      {formatRupiah(item.subtotal)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Total Card Mobile */}
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between font-bold">
                <span className="text-xs text-stone-700">TOTAL ESTIMASI:</span>
                <span className="font-mono text-rose-600 text-base font-extrabold">
                  {formatRupiah(totalHarga)}
                </span>
              </div>
            </div>

            {/* DESKTOP TABLE VIEW (Screen >= sm) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500 font-semibold">
                    <th className="py-2.5 px-2">Nama Barang & Fungsi</th>
                    <th className="py-2.5 px-2 w-16 text-center">Qty</th>
                    <th className="py-2.5 px-2 w-32 text-right">Harga Satuan</th>
                    <th className="py-2.5 px-2 w-36 text-right">Subtotal</th>
                    <th className="py-2.5 px-2 w-8 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-rose-50/20 transition-colors">
                      <td className="py-3 px-2 space-y-1">
                        <input
                          type="text"
                          value={item.nama}
                          onChange={(e) => handleItemChange(item.id, "nama", e.target.value)}
                          placeholder="Nama Barang"
                          required
                          className="min-h-[38px] w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-rose-400 focus:outline-none font-medium"
                        />
                        <input
                          type="text"
                          value={item.spesifikasi || ""}
                          onChange={(e) => handleItemChange(item.id, "spesifikasi", e.target.value)}
                          placeholder="Catatan / fungsi barang"
                          className="w-full bg-transparent border-0 text-[11px] text-stone-500 px-1 focus:outline-none focus:text-rose-600"
                        />
                      </td>
                      <td className="py-3 px-2 align-top">
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => handleItemChange(item.id, "qty", Math.max(1, parseInt(e.target.value) || 1))}
                          required
                          className="min-h-[38px] w-full text-center bg-stone-50 border border-stone-200 rounded-lg px-2 py-1.5 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-rose-400 focus:outline-none"
                        />
                      </td>
                      <td className="py-3 px-2 align-top">
                        <input
                          type="number"
                          step="1000"
                          min="0"
                          value={item.harga}
                          onChange={(e) => handleItemChange(item.id, "harga", Math.max(0, parseInt(e.target.value) || 0))}
                          required
                          className="min-h-[38px] w-full text-right bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-rose-400 focus:outline-none font-mono font-semibold"
                        />
                      </td>
                      <td className="py-3 px-2 text-right font-mono font-bold text-stone-900 align-top pt-4">
                        {formatRupiah(item.subtotal)}
                      </td>
                      <td className="py-3 px-2 text-center align-top pt-3.5">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length <= 1}
                          className="min-h-[32px] min-w-[32px] flex items-center justify-center p-1 text-stone-400 hover:text-rose-600 disabled:opacity-20 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-stone-200 font-bold text-sm">
                    <td colSpan={3} className="py-3.5 px-2 text-right text-stone-600">
                      Total Estimasi Biaya:
                    </td>
                    <td className="py-3.5 px-2 text-right text-rose-600 font-mono text-base font-extrabold">
                      {formatRupiah(totalHarga)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Card 3: Kotak Tanda Tangan Khusus Gracia */}
          <div className="bg-white border-2 border-rose-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-3.5 sm:space-y-4 shadow-xl shadow-rose-100/70">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-sm sm:text-lg font-bold text-rose-800 flex items-center gap-1.5 sm:gap-2">
                <PenTool className="w-4 h-4 text-rose-500 shrink-0" />
                3. Kotak Tanda Tangan Restu Gracia 💕
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Silakan Gracia tanda tangan langsung di dalam kotak berikut menggunakan jari di layar HP:
            </p>

            {/* Signature Canvas Pad */}
            <SignaturePad onSignatureChange={setSignatureData} height={180} strokeColor="#be123c" />

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" /> Pesan Cinta / Syarat dari Gracia:
              </label>
              <input
                type="text"
                value={catatanCinta}
                onChange={(e) => setCatatanCinta(e.target.value)}
                placeholder="Misal: Boleh beli, tapi temenin jalan-jalan yaa ❤️"
                className="min-h-[44px] w-full bg-rose-50/50 border border-rose-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-rose-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Tombol Eksekusi Beri Restu */}
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="min-h-[52px] w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-sm sm:text-lg shadow-xl shadow-rose-300/80 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-spin shrink-0" />
              <span>Beri Restu & Tanda Tangani Pengajuan ❤️</span>
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white shrink-0" />
            </motion.button>
          </div>
        </form>
      )}

      {/* Footer Minimalis */}
      <div className="text-center text-xs text-stone-400 mt-8 sm:mt-12 space-y-1">
        <p className="flex items-center justify-center gap-1">
          Dibuat dengan <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" /> khusus untuk Gracia Tersayang
        </p>
        <p className="text-[10px] text-stone-400">
          Andry Huang Workstation Upgrade Approval • {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
