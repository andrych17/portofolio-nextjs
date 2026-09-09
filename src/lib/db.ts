import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

export interface ItemPengajuan {
  id: string;
  nama: string;
  spesifikasi?: string;
  qty: number;
  harga: number;
  subtotal: number;
}

export interface PengajuanRecord {
  id?: number;
  nomor_pengajuan: string;
  pemohon: string;
  divisi: string;
  judul: string;
  keperluan: string;
  items: string; // JSON string of ItemPengajuan[]
  total_harga: number;
  tanda_tangan: string; // Base64 data URL
  nama_penandatangan: string;
  jabatan_penandatangan: string;
  status: string;
  catatan?: string;
  created_at?: string;
}

let dbInstance: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (!dbInstance) {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.join(dataDir, "pengajuan.db");
    const db = new DatabaseSync(dbPath);

    // ponytail: simple single-table sqlite schema for purchase approval & signature
    db.exec(`
      CREATE TABLE IF NOT EXISTS pengajuan (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomor_pengajuan TEXT NOT NULL,
        pemohon TEXT NOT NULL,
        divisi TEXT NOT NULL,
        judul TEXT NOT NULL,
        keperluan TEXT,
        items TEXT NOT NULL,
        total_harga INTEGER NOT NULL,
        tanda_tangan TEXT NOT NULL,
        nama_penandatangan TEXT NOT NULL,
        jabatan_penandatangan TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'Disetujui',
        catatan TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    dbInstance = db;
  }
  return dbInstance;
}

export function getAllPengajuan(): PengajuanRecord[] {
  const db = getDb();
  const stmt = db.prepare(`SELECT * FROM pengajuan ORDER BY id DESC`);
  return stmt.all() as unknown as PengajuanRecord[];
}

export function getPengajuanById(id: number): PengajuanRecord | undefined {
  const db = getDb();
  const stmt = db.prepare(`SELECT * FROM pengajuan WHERE id = ?`);
  return stmt.get(id) as unknown as PengajuanRecord | undefined;
}

export function createPengajuan(data: Omit<PengajuanRecord, "id" | "created_at">): { id: number } {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO pengajuan (
      nomor_pengajuan, pemohon, divisi, judul, keperluan,
      items, total_harga, tanda_tangan, nama_penandatangan,
      jabatan_penandatangan, status, catatan
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    data.nomor_pengajuan,
    data.pemohon,
    data.divisi,
    data.judul,
    data.keperluan,
    data.items,
    data.total_harga,
    data.tanda_tangan,
    data.nama_penandatangan,
    data.jabatan_penandatangan,
    data.status || "Disetujui",
    data.catatan || ""
  );

  const lastRow = db.prepare(`SELECT last_insert_rowid() as id`).get() as { id: number };
  return { id: Number(lastRow.id) };
}

export function deletePengajuan(id: number): boolean {
  const db = getDb();
  const stmt = db.prepare(`DELETE FROM pengajuan WHERE id = ?`);
  stmt.run(id);
  return true;
}
