import { NextRequest, NextResponse } from "next/server";
import {
  getAllPengajuan,
  getPengajuanById,
  createPengajuan,
  deletePengajuan,
} from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (idParam) {
      const item = getPengajuanById(Number(idParam));
      if (!item) {
        return NextResponse.json({ error: "Pengajuan tidak ditemukan" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: item });
    }

    const list = getAllPengajuan();
    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    console.error("Error in GET /api/pengajuan:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data pengajuan" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nomor_pengajuan,
      pemohon,
      divisi,
      judul,
      keperluan,
      items,
      total_harga,
      tanda_tangan,
      nama_penandatangan,
      jabatan_penandatangan,
      status,
      catatan,
    } = body;

    if (!nomor_pengajuan || !pemohon || !judul || !items || !total_harga || !tanda_tangan || !nama_penandatangan) {
      return NextResponse.json(
        { error: "Data formulir dan tanda tangan wajib diisi lengkap" },
        { status: 400 }
      );
    }

    const itemsStr = typeof items === "string" ? items : JSON.stringify(items);

    const result = createPengajuan({
      nomor_pengajuan,
      pemohon,
      divisi: divisi || "Engineering",
      judul,
      keperluan: keperluan || "",
      items: itemsStr,
      total_harga: Number(total_harga),
      tanda_tangan,
      nama_penandatangan,
      jabatan_penandatangan: jabatan_penandatangan || "Pemohon / Approver",
      status: status || "Disetujui",
      catatan: catatan || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pengajuan berhasil disimpan ke database SQLite",
        id: result.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/pengajuan:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan pengajuan ke SQLite" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json({ error: "ID pengajuan diperlukan" }, { status: 400 });
    }

    deletePengajuan(Number(idParam));
    return NextResponse.json({ success: true, message: "Pengajuan berhasil dihapus" });
  } catch (error) {
    console.error("Error in DELETE /api/pengajuan:", error);
    return NextResponse.json(
      { error: "Gagal menghapus data pengajuan" },
      { status: 500 }
    );
  }
}
