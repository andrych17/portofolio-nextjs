import assert from "node:assert/strict";
import { getDb, createPengajuan, getAllPengajuan, getPengajuanById, deletePengajuan } from "../db";

console.log("Running DB self-check...");

// 1. Check DB instance
const db = getDb();
assert.ok(db, "Database instance should exist");

// 2. Insert test pengajuan
const testPayload = {
  nomor_pengajuan: "TEST-001",
  pemohon: "Tester",
  divisi: "IT",
  judul: "Test Pengajuan Keyboard",
  keperluan: "Testing purposes",
  items: JSON.stringify([{ id: "1", nama: "Keyboard Test", qty: 1, harga: 300000, subtotal: 300000 }]),
  total_harga: 300000,
  tanda_tangan: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  nama_penandatangan: "Tester Signer",
  jabatan_penandatangan: "QA",
  status: "Disetujui",
  catatan: "Self-check",
};

const { id } = createPengajuan(testPayload);
assert.ok(id > 0, "Inserted ID should be greater than 0");

// 3. Fetch single
const fetched = getPengajuanById(id);
assert.ok(fetched, "Fetched record should not be null");
assert.equal(fetched.nomor_pengajuan, "TEST-001");
assert.equal(fetched.total_harga, 300000);

// 4. Fetch all
const all = getAllPengajuan();
assert.ok(all.some((r) => r.id === id), "Inserted record should exist in all list");

// 5. Delete test record
const deleted = deletePengajuan(id);
assert.equal(deleted, true);
assert.equal(getPengajuanById(id), undefined, "Deleted record should no longer exist");

console.log("✅ DB self-check passed successfully!");
