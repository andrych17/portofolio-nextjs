"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Database,
  Printer,
  Calendar,
  User,
  Building2,
  DollarSign,
  Tag,
  PenTool,
  Loader2,
  RefreshCw,
  Eye,
  ExternalLink,
} from "lucide-react";
import SignaturePad from "./SignaturePad";
import { ItemPengajuan, PengajuanRecord } from "@/lib/db";

const DEFAULT_ITEMS: ItemPengajuan[] = [
  {
    id: "item-1",
    nama: "Mechanical Keyboard (TKL / Ergonomic)",
    spesifikasi: "Koneksi USB/Wireless, tactile switches, wrist rest support",
    qty: 1,
    harga: 350000,
    subtotal: 350000,
  },
  {
    id: "item-2",
    nama: "USB Desk Fan / Workstation Mini Cooler",
    spesifikasi: "3-speed, silent motor 5V, sudut rotasi adjustable",
    qty: 1,
    harga: 150000,
    subtotal: 150000,
  },
];

export default function PengajuanClient() {
  const [activeTab, setActiveTab] = useState<"form" | "history">("form");

  // Form State
  const [nomorPengajuan, setNomorPengajuan] = useState("");
  const [pemohon, setPemohon] = useState("Andry Huang");
  const [divisi, setDivisi] = useState("Software Engineering");
  const [judul, setJudul] = useState("Pengadaan Keyboard & Kipas Meja Workstation");
  const [keperluan, setKeperluan] = useState(
    "Penggantian perangkat input keyboard kerja dan penambahan kipas workstation untuk meningkatkan kenyamanan, ergonomi, dan sirkulasi udara saat coding harian."
  );
  const [items, setItems] = useState<ItemPengajuan[]>(DEFAULT_ITEMS);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [namaPenandatangan, setNamaPenandatangan] = useState("Andry Huang");
  const [jabatanPenandatangan, setJabatanPenandatangan] = useState("Lead Developer / Pemohon");
  const [catatan, setCatatan] = useState("Target pembelian dari official store marketplace lokal (estimasi tiba 1-2 hari).");

  // Status & List State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [records, setRecords] = useState<PengajuanRecord[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PengajuanRecord | null>(null);

  // Generate unique nomor pengajuan on mount
  useEffect(() => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setNomorPengajuan(`REQ-${dateStr}-${randomSuffix}`);
  }, []);

  // Fetch records from SQLite
  const fetchRecords = useCallback(async () => {
    setIsLoadingRecords(true);
    try {
      const res = await fetch("/api/pengajuan");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setRecords(json.data);
      }
    } catch (err) {
      console.error("Gagal memuat data dari SQLite:", err);
    } finally {
      setIsLoadingRecords(false);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // Recalculate item totals
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!signatureData) {
      setFeedback({
        type: "error",
        message: "Silakan bubuhkan tanda tangan digital pada area tanda tangan sebelum submit.",
      });
      return;
    }

    if (!nomorPengajuan || !pemohon || !judul || items.length === 0) {
      setFeedback({
        type: "error",
        message: "Mohon lengkapi semua rincian data formulir pengajuan.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/pengajuan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomor_pengajuan: nomorPengajuan,
          pemohon,
          divisi,
          judul,
          keperluan,
          items,
          total_harga: totalHarga,
          tanda_tangan: signatureData,
          nama_penandatangan: namaPenandatangan,
          jabatan_penandatangan: jabatanPenandatangan,
          status: "Disetujui",
          catatan,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gagal menyimpan pengajuan");
      }

      setFeedback({
        type: "success",
        message: `Pengajuan ${nomorPengajuan} berhasil disimpan ke database SQLite!`,
      });

      // Refresh data list and auto switch to history
      await fetchRecords();
      setTimeout(() => {
        setActiveTab("history");
      }, 1200);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      setFeedback({ type: "error", message: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus data pengajuan ini dari SQLite?")) return;
    try {
      const res = await fetch(`/api/pengajuan?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setRecords((prev) => prev.filter((r) => r.id !== id));
        if (selectedRecord?.id === id) {
          setSelectedRecord(null);
        }
      }
    } catch (err) {
      console.error("Gagal menghapus record:", err);
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="mb-8 border-b border-[var(--line)] pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              Sistem Persetujuan & Tanda Tangan Digital
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--fg)]">
              Pengajuan Pembelian & E-Signature
            </h1>
            <p className="text-sm text-[var(--mut)] mt-1.5 max-w-2xl">
              Modul formulir pengadaan barang (Keyboard & Kipas ~Rp 500.000) dengan tanda tangan kanvas online langsung tersimpan ke database lokal SQLite (<code className="text-[var(--accent)] font-mono text-xs">node:sqlite</code>).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[var(--bg-2)] p-1 rounded-lg border border-[var(--line)]">
            <button
              onClick={() => setActiveTab("form")}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === "form"
                  ? "bg-[var(--accent)] text-black font-semibold shadow"
                  : "text-[var(--fg-2)] hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Buat Pengajuan
            </button>
            <button
              onClick={() => {
                setActiveTab("history");
                fetchRecords();
              }}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === "history"
                  ? "bg-[var(--accent)] text-black font-semibold shadow"
                  : "text-[var(--fg-2)] hover:text-white"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Data SQLite ({records.length})
            </button>
          </div>
        </div>
      </div>

      {feedback && (
        <div
          className={`mb-6 p-4 rounded-lg border flex items-start gap-3 transition-all ${
            feedback.type === "success"
              ? "bg-emerald-950/40 border-emerald-800 text-emerald-300"
              : "bg-red-950/40 border-red-800 text-red-300"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          )}
          <div className="text-sm flex-1">{feedback.message}</div>
          <button
            onClick={() => setFeedback(null)}
            className="text-xs opacity-60 hover:opacity-100 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* TAB 1: FORMULIR PENGAJUAN */}
      {activeTab === "form" && (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Card 1: Informasi Dokumen */}
          <div className="bg-[var(--bg-2)] border border-[var(--line)] rounded-xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <h2 className="text-base font-semibold text-[var(--fg)] flex items-center gap-2">
                <Tag className="w-4 h-4 text-[var(--accent)]" />
                1. Informasi Dasar Dokumen
              </h2>
              <span className="text-xs font-mono text-[var(--mut)] bg-black/40 px-2.5 py-1 rounded border border-[var(--line)]">
                {nomorPengajuan || "Membuat Nomor..."}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--fg-2)] mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[var(--mut)]" /> Nama Pemohon
                </label>
                <input
                  type="text"
                  value={pemohon}
                  onChange={(e) => setPemohon(e.target.value)}
                  required
                  className="w-full bg-[#111111] border border-[var(--line)] rounded-md px-3 py-2 text-sm text-[var(--fg)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--fg-2)] mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[var(--mut)]" /> Divisi / Departemen
                </label>
                <input
                  type="text"
                  value={divisi}
                  onChange={(e) => setDivisi(e.target.value)}
                  required
                  className="w-full bg-[#111111] border border-[var(--line)] rounded-md px-3 py-2 text-sm text-[var(--fg)] focus:border-[var(--accent)] focus:outline-none"
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
                  className="w-full bg-[#111111] border border-[var(--line)] rounded-md px-3 py-2 text-sm text-[var(--fg)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[var(--fg-2)] mb-1">
                  Latar Belakang / Keperluan Pengadaan
                </label>
                <textarea
                  rows={2}
                  value={keperluan}
                  onChange={(e) => setKeperluan(e.target.value)}
                  className="w-full bg-[#111111] border border-[var(--line)] rounded-md px-3 py-2 text-sm text-[var(--fg)] focus:border-[var(--accent)] focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Rincian Barang & Anggaran */}
          <div className="bg-[var(--bg-2)] border border-[var(--line)] rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <h2 className="text-base font-semibold text-[var(--fg)] flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[var(--accent)]" />
                2. Rincian Barang & Estimasi Biaya
              </h2>
              <button
                type="button"
                onClick={addItem}
                className="px-2.5 py-1 text-xs rounded border border-[var(--line)] bg-[#111111] hover:border-[var(--accent)] text-[var(--fg)] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3 text-[var(--accent)]" />
                Tambah Item
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--mut)]">
                    <th className="py-2 px-2">Nama Barang & Spek</th>
                    <th className="py-2 px-2 w-20 text-center">Qty</th>
                    <th className="py-2 px-2 w-32 text-right">Harga Satuan</th>
                    <th className="py-2 px-2 w-32 text-right">Subtotal</th>
                    <th className="py-2 px-2 w-10 text-center">Aksi</th>
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
                          className="w-full bg-[#111111] border border-[var(--line)] rounded px-2 py-1 text-xs text-[var(--fg)] focus:border-[var(--accent)] focus:outline-none"
                        />
                        <input
                          type="text"
                          value={item.spesifikasi || ""}
                          onChange={(e) => handleItemChange(item.id, "spesifikasi", e.target.value)}
                          placeholder="Spesifikasi / Catatan (opsional)"
                          className="w-full bg-transparent border-0 text-[11px] text-[var(--mut)] px-1 focus:outline-none focus:text-[var(--fg)]"
                        />
                      </td>
                      <td className="py-2 px-2 align-top">
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => handleItemChange(item.id, "qty", Math.max(1, parseInt(e.target.value) || 1))}
                          required
                          className="w-full text-center bg-[#111111] border border-[var(--line)] rounded px-2 py-1 text-xs text-[var(--fg)] focus:border-[var(--accent)] focus:outline-none"
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
                          className="w-full text-right bg-[#111111] border border-[var(--line)] rounded px-2 py-1 text-xs text-[var(--fg)] focus:border-[var(--accent)] focus:outline-none font-mono"
                        />
                      </td>
                      <td className="py-2 px-2 text-right font-mono font-medium text-[var(--fg)] align-top pt-3">
                        {formatRupiah(item.subtotal)}
                      </td>
                      <td className="py-2 px-2 text-center align-top pt-2">
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
                      Total Estimasi Anggaran:
                    </td>
                    <td className="py-3 px-2 text-right text-[var(--accent)] font-mono text-base">
                      {formatRupiah(totalHarga)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Card 3: Tanda Tangan Digital & Otorisasi */}
          <div className="bg-[var(--bg-2)] border border-[var(--line)] rounded-xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <h2 className="text-base font-semibold text-[var(--fg)] flex items-center gap-2">
                <PenTool className="w-4 h-4 text-[var(--accent)]" />
                3. Otorisasi & Tanda Tangan Digital (Canvas Pad)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--fg-2)] mb-1">
                  Nama Penandatangan
                </label>
                <input
                  type="text"
                  value={namaPenandatangan}
                  onChange={(e) => setNamaPenandatangan(e.target.value)}
                  required
                  className="w-full bg-[#111111] border border-[var(--line)] rounded-md px-3 py-2 text-sm text-[var(--fg)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--fg-2)] mb-1">
                  Jabatan / Peran
                </label>
                <input
                  type="text"
                  value={jabatanPenandatangan}
                  onChange={(e) => setJabatanPenandatangan(e.target.value)}
                  required
                  className="w-full bg-[#111111] border border-[var(--line)] rounded-md px-3 py-2 text-sm text-[var(--fg)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
            </div>

            {/* Signature Canvas */}
            <div className="pt-2">
              <SignaturePad onSignatureChange={setSignatureData} height={180} />
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--fg-2)] mb-1">
                Catatan Tambahan (Opsional)
              </label>
              <input
                type="text"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Misal: Link toko, opsi warna, atau urgensi pengiriman"
                className="w-full bg-[#111111] border border-[var(--line)] rounded-md px-3 py-2 text-sm text-[var(--fg)] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-lg bg-[var(--accent)] text-black font-semibold text-sm hover:brightness-110 active:scale-98 transition-all flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan ke SQLite...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Simpan & Tanda Tangani Pengajuan
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: RIWAYAT & DATABASE SQLITE */}
      {activeTab === "history" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-xs text-[var(--mut)]">
              Tersimpan secara lokal di <code className="text-[var(--accent)] font-mono">data/pengajuan.db</code>
            </div>
            <button
              onClick={fetchRecords}
              disabled={isLoadingRecords}
              className="px-3 py-1.5 text-xs rounded border border-[var(--line)] bg-[var(--bg-2)] hover:border-[var(--fg-2)] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingRecords ? "animate-spin" : ""}`} />
              Refresh Data
            </button>
          </div>

          {records.length === 0 ? (
            <div className="border border-dashed border-[var(--line-strong)] rounded-xl p-12 text-center bg-[var(--bg-2)]/40">
              <Database className="w-10 h-10 text-[var(--mut)] mx-auto mb-3 opacity-60" />
              <p className="text-sm font-medium text-[var(--fg)]">Belum ada pengajuan tersimpan di SQLite</p>
              <p className="text-xs text-[var(--mut)] mt-1">
                Silakan buat pengajuan pertama Anda dengan tanda tangan digital.
              </p>
              <button
                onClick={() => setActiveTab("form")}
                className="mt-4 px-4 py-2 text-xs font-semibold rounded-md bg-[var(--accent)] text-black hover:brightness-110 cursor-pointer"
              >
                Buat Pengajuan Sekarang
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {records.map((rec) => {
                let parsedItems: ItemPengajuan[] = [];
                try {
                  parsedItems = JSON.parse(rec.items);
                } catch {
                  parsedItems = [];
                }

                return (
                  <div
                    key={rec.id}
                    className="bg-[var(--bg-2)] border border-[var(--line)] hover:border-[var(--line-strong)] rounded-xl p-5 space-y-4 flex flex-col justify-between transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-xs text-[var(--accent)] bg-black/50 px-2 py-0.5 rounded border border-[var(--line)]">
                          {rec.nomor_pengajuan}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                          {rec.status}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-[var(--fg)] leading-snug">
                        {rec.judul}
                      </h3>

                      <div className="text-xs space-y-1 text-[var(--mut)]">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3 h-3" /> Pemohon: <strong className="text-[var(--fg-2)]">{rec.pemohon}</strong> ({rec.divisi})
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" /> Waktu: {rec.created_at || "Baru saja"}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-3 h-3" /> Total: <span className="font-mono text-[var(--accent)] font-semibold">{formatRupiah(rec.total_harga)}</span>
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="bg-black/30 rounded p-2 text-[11px] space-y-1 border border-[var(--line)]/50">
                        <div className="text-[10px] uppercase font-mono text-[var(--mut)]">Item ({parsedItems.length}):</div>
                        {parsedItems.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-[var(--fg-2)]">
                            <span className="truncate max-w-[200px]">{it.qty}x {it.nama}</span>
                            <span className="font-mono">{formatRupiah(it.subtotal)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Signature Preview */}
                      <div className="border border-[var(--line)] rounded bg-[#0e0e0e] p-2 flex items-center justify-between">
                        <div className="text-[10px] text-[var(--mut)]">
                          <div>Tanda Tangan Digital:</div>
                          <div className="font-medium text-[var(--fg-2)]">{rec.nama_penandatangan}</div>
                        </div>
                        {rec.tanda_tangan ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={rec.tanda_tangan}
                            alt="Tanda tangan"
                            className="h-10 max-w-[120px] object-contain filter invert opacity-90"
                          />
                        ) : (
                          <span className="text-[10px] text-[var(--mut)]">Tidak ada tanda tangan</span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedRecord(rec)}
                        className="px-3 py-1.5 text-xs rounded bg-[#1f1f1f] hover:bg-[#282828] text-[var(--fg)] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[var(--accent)]" />
                        Lihat Dokumen
                      </button>

                      <button
                        onClick={() => rec.id && handleDelete(rec.id)}
                        className="p-1.5 text-[var(--mut)] hover:text-red-400 transition-colors cursor-pointer"
                        title="Hapus record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* MODAL / DOCUMENT PREVIEW */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[var(--line-strong)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-4 right-4 text-[var(--mut)] hover:text-white text-lg p-1 cursor-pointer"
            >
              ✕
            </button>

            {/* Document Header */}
            <div className="border-b-2 border-[var(--line-strong)] pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
                  Dokumen Permohonan Pengadaan
                </div>
                <div className="font-mono text-xs bg-black px-2.5 py-1 rounded border border-[var(--line)]">
                  {selectedRecord.nomor_pengajuan}
                </div>
              </div>
              <h2 className="text-xl font-bold text-white">{selectedRecord.judul}</h2>
              <p className="text-xs text-[var(--mut)] mt-1">
                Dibuat pada: {selectedRecord.created_at || "N/A"}
              </p>
            </div>

            {/* Submitter & Department Info */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-black/40 p-3 rounded-lg border border-[var(--line)]">
              <div>
                <span className="text-[var(--mut)] block">Pemohon:</span>
                <span className="font-semibold text-white">{selectedRecord.pemohon}</span>
              </div>
              <div>
                <span className="text-[var(--mut)] block">Divisi:</span>
                <span className="font-semibold text-white">{selectedRecord.divisi}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[var(--mut)] block">Keperluan:</span>
                <span className="text-[var(--fg-2)]">{selectedRecord.keperluan || "-"}</span>
              </div>
            </div>

            {/* Items Table */}
            <div>
              <div className="text-xs font-mono uppercase text-[var(--mut)] mb-2">
                Rincian Barang & Biaya:
              </div>
              <div className="border border-[var(--line)] rounded-lg overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#1a1a1a] text-[var(--mut)] border-b border-[var(--line)]">
                    <tr>
                      <th className="p-2.5">Item</th>
                      <th className="p-2.5 text-center w-16">Qty</th>
                      <th className="p-2.5 text-right w-28">Harga</th>
                      <th className="p-2.5 text-right w-28">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    {(() => {
                      try {
                        const itemsList: ItemPengajuan[] = JSON.parse(selectedRecord.items);
                        return itemsList.map((it, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.02]">
                            <td className="p-2.5">
                              <div className="font-medium text-white">{it.nama}</div>
                              {it.spesifikasi && (
                                <div className="text-[10px] text-[var(--mut)]">{it.spesifikasi}</div>
                              )}
                            </td>
                            <td className="p-2.5 text-center font-mono">{it.qty}</td>
                            <td className="p-2.5 text-right font-mono">{formatRupiah(it.harga)}</td>
                            <td className="p-2.5 text-right font-mono font-medium text-white">
                              {formatRupiah(it.subtotal)}
                            </td>
                          </tr>
                        ));
                      } catch {
                        return (
                          <tr>
                            <td colSpan={4} className="p-2.5 text-center text-[var(--mut)]">
                              {selectedRecord.items}
                            </td>
                          </tr>
                        );
                      }
                    })()}
                  </tbody>
                  <tfoot className="bg-[#1a1a1a] border-t-2 border-[var(--line)] font-bold">
                    <tr>
                      <td colSpan={3} className="p-2.5 text-right text-[var(--fg-2)]">
                        TOTAL:
                      </td>
                      <td className="p-2.5 text-right font-mono text-[var(--accent)] text-sm">
                        {formatRupiah(selectedRecord.total_harga)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Signature & Approval Block */}
            <div className="border border-[var(--line)] rounded-xl p-4 bg-black/30 flex items-center justify-between">
              <div className="text-xs space-y-1">
                <div className="text-[10px] font-mono uppercase text-[var(--mut)]">Status & Pengesahan:</div>
                <div className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Disetujui Secara Digital
                </div>
                <div className="text-[var(--mut)] text-[11px] pt-1">
                  Penandatangan: <strong className="text-white">{selectedRecord.nama_penandatangan}</strong>
                </div>
                <div className="text-[10px] text-[var(--mut)]">{selectedRecord.jabatan_penandatangan}</div>
              </div>

              <div className="text-center">
                {selectedRecord.tanda_tangan ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedRecord.tanda_tangan}
                    alt="Tanda Tangan Digital"
                    className="h-16 max-w-[160px] object-contain filter invert border-b border-[var(--line)] pb-1"
                  />
                ) : (
                  <div className="h-16 flex items-center justify-center text-xs text-[var(--mut)]">
                    (Tidak ada ttd)
                  </div>
                )}
                <span className="text-[9px] font-mono text-[var(--mut)]">Digital Signature Verified</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 text-xs rounded-md bg-[#222222] hover:bg-[#2c2c2c] text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                Cetak / Simpan PDF
              </button>
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 text-xs rounded-md bg-[var(--accent)] text-black font-semibold hover:brightness-110 transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
