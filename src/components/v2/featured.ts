import { WORKS, type Shot, type Work } from "@/data/works";

/** A featured build on the v2 home: the curated v1 entry, its archive id (for the case-study link) and optional extra screens. */
export type Featured = Work & { caseId: number; extra?: Shot; lead?: boolean };

const v1 = (name: string): Work => {
  const work = WORKS.find((w) => w.name === name);
  if (!work) throw new Error(`Featured work "${name}" is missing from WORKS`);
  return work;
};

// Two builds that are only in the archive so far; copy follows their archive entries (ids 502 and 505).
const NAGAMASBAN: Work = {
  name: "Nagamasban AI Sales",
  role: { en: "AI assistant · tire distributor", id: "Asisten AI · distributor ban" },
  line: {
    en: "Lets new sales staff recommend the right tire for a customer's car and budget.",
    id: "Sales baru bisa merekomendasikan ban yang cocok dengan kendaraan dan budget pelanggan.",
  },
  parts: {
    en: ["Semantic search over the tire catalogue (OpenAI embeddings + pgvector)", "Spec matching by car make, type and rim size", "Interactive training and sales scripts for new staff"],
    id: ["Rekomendasi ban lewat semantic search (OpenAI embeddings + pgvector)", "Pencocokan spesifikasi ban berdasarkan merk/tipe mobil dan ukuran velg", "Modul training dan script sales interaktif untuk staf baru"],
  },
  stack: ["Next.js 16", "NestJS", "OpenAI API", "pgvector", "TypeScript"],
  url: "https://katalog.nagamasban.com",
  shots: {
    main: { src: "/projects/nagamasban_01_katalog_en.png", label: "katalog.nagamasban.com", zoom: 1.04, origin: "50% 0" },
    sub: { src: "/projects/ban2.png", label: "Brand catalogue", zoom: 1.08, origin: "50% 0" },
  },
};

const STOCKS: Work = {
  name: "Stock Portfolio AI",
  role: { en: "Personal tool · equities", id: "Tool pribadi · saham" },
  line: {
    en: "Holdings, allocation and AI summaries of company reports in one place for daily decisions.",
    id: "Data emiten, posisi, dan ringkasan AI di satu tempat untuk keputusan trading harian.",
  },
  parts: {
    en: ["Holdings and allocation tracking", "AI summaries of financial reports and news sentiment", "Charts with risk exposure and margin-of-safety calculators", "LLM chat assistant for stock analysis"],
    id: ["Pelacakan kepemilikan dan alokasi portofolio", "Ringkasan AI laporan keuangan dan sentimen berita", "Grafik dengan kalkulator risk exposure dan margin of safety", "Chatbot asisten analisis saham berbasis LLM"],
  },
  stack: ["Next.js 16", "NestJS", "FastAPI", "GPT-4o", "PostgreSQL"],
  shots: {
    main: { src: "/projects/saham_01_market_dashboard_en.png", label: "Market dashboard", zoom: 1.04, origin: "50% 0" },
    sub: { src: "/projects/saham_03_ai_financial_analyst_chat_en.png", label: "AI analyst chat", zoom: 1.06, origin: "50% 0" },
  },
};

// Qualiv leads; the two enterprise builds without screenshots are spread out so the track keeps its pictures.
export const FEATURED: Featured[] = [
  {
    ...v1("Qualiv"),
    caseId: 504,
    lead: true,
    extra: { src: "/projects/qualiv_11_ai_interview_simulation_en.png", label: "AI interview", zoom: 1.06, origin: "50% 0" },
  },
  { ...v1("SMRT Tenant System"), caseId: 302 },
  { ...v1("Retail ERP & POS"), caseId: 402 },
  { ...v1("OpenClaw"), caseId: 506 },
  { ...NAGAMASBAN, caseId: 502 },
  { ...v1("Wonderful Works"), caseId: 509 },
  { ...STOCKS, caseId: 505 },
  { ...v1("Simplicity"), caseId: 303 },
];
