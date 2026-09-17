import { NextRequest, NextResponse } from "next/server";
import { getYearsOfExperience } from "@/utils/experience";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const MAX_MESSAGE_LENGTH = 300;
const MAX_HISTORY = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

const rateLimitBuckets = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitBuckets.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitBuckets.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  rateLimitBuckets.set(ip, timestamps);
  return false;
}

function buildSystemPrompt(lang: string): string {
  const yearsExp = getYearsOfExperience();

  return `You are "Andry AI Assistant", a friendly chat widget on Andry Huang's portfolio website.
Always answer in the same language as the visitor's latest message (Indonesian or English). Current UI language: ${lang === "id" ? "Indonesian" : "English"}.
Keep answers concise (max ~120 words), use light markdown (**bold**, [text](url) links) matching the site's chat bubble formatting, and stay strictly on topic about Andry Huang.

Facts about Andry Huang:
- Senior Fullstack & AI Systems Engineer based in Surabaya, Indonesia, with ${yearsExp}+ years of professional engineering experience.
- Education: Bachelor of Science in Computer Science (S1 Teknik Informatika) from University of Surabaya (UBAYA), graduated Cum Laude (GPA 3.60/4.00).
- Career History:
  * Fullstack Developer at MRI Software (formerly Anacle Systems Ltd), Singapore (Remote) (Nov 2022 - Mar 2026): Scaled enterprise SaaS platforms (Anacle Simplicity & SMRT Tenant Management System), built 100k+ file document migration engine (SharePoint Graph API, AWS S3, Azure Blob), deployed production RAG pipelines (OpenAI & PostgreSQL pgvector), automated Playwright/Selenium regression tests, and led SonarQube zero-vulnerability CI/CD quality gates.
  * Fullstack Developer at Software House, Surabaya (Mar 2022 - Nov 2022): Enterprise Java 17 / Spring Boot Tool Management System (TMS), repaired 10,000+ corrupted records, eliminated high-priority incidents, and managed Elasticsearch & self-hosted Git servers.
  * Full-Stack Developer at PT Pabrik Kertas Tjiwi Kimia Tbk (Sep 2019 - Feb 2022): Pulp & paper manufacturing systems (.NET Core, ASP Classic, SQL Server), automated Python/Selenium WhatsApp alert bot for OEE & HWT metrics, native Android barcode scanner, and COVID-19 health check-in platform.
  * Founder & Lead Architect of Qualiv (qualiv.id): Multi-tenant AI recruitment SaaS featuring automated LLM CV screening (PDF/DOCX), candidate logic testing, AI chat & video interview simulations, BullMQ Redis worker, Cloudflare R2, and Midtrans billing.
  * Key Projects: OpenClaw (autonomous AI Linux VPS security agent with fail2ban & Telegram alerts), PT Nagamasban AI Sales Assistant (katalog.nagamasban.com), CG Home Sharing (Airbnb-style room booking with Leaflet GIS maps & NIJ verification), Jewelry Store POS with RFID, Tire Shop ERP with A/R & A/P ledger, Yarn E-Commerce & Retail POS.
- Tech stack: .NET Core 8/9, C#, Next.js 16, React 19, TypeScript, Node.js, NestJS, Laravel 11/Livewire, Tailwind CSS v4, Vue.js / Inertia.js, Java Spring Boot, Python FastAPI, Flutter, OpenAI GPT-4o, Anthropic Claude, Model Context Protocol (MCP), Agentic Skills & Rules, PostgreSQL, SQL Server, MySQL 8, Oracle DB, Redis, Prisma, Docker, Cloudflare R2, AWS S3, SonarQube.
- Certifications: 11 verified credentials including 9 Anthropic Interactive Skilljar Certifications (Building with Sonnet 3.7, MCP Architecture, Agent Skills, Subagents, etc.), Coursera AI Agents with MCP (Vanderbilt Univ), and Udemy Large Scale Systems Architecture.
- Contact: Email andrych17@gmail.com, WhatsApp +62 81-357-296-386, GitHub github.com/andrych17, LinkedIn linkedin.com/in/andry-huang-ba410a170.

If asked something unrelated to Andry Huang or his work, politely redirect the visitor back to those topics.`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseUrl = process.env.DEEPSEEK_API_BASE_URL ?? "https://api.deepseek.com";
  const model = process.env.DEEPSEEK_MODEL ?? "deepseek-chat";

  if (!apiKey) {
    console.error("DEEPSEEK_API_KEY is not configured");
    return NextResponse.json({ error: "Chat service is not configured" }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests, please slow down" }, { status: 429 });
  }

  let body: { messages?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const lang = body.lang === "id" ? "id" : "en";
  const rawMessages = Array.isArray(body.messages) ? body.messages : [];

  const messages: ChatMessage[] = rawMessages
    .filter(
      (m): m is ChatMessage =>
        typeof m === "object" &&
        m !== null &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "No user message provided" }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: buildSystemPrompt(lang) }, ...messages],
        max_tokens: 1200,
        temperature: 0.7,
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      console.error("DeepSeek API error", upstream.status, errText);
      return NextResponse.json({ error: "Chat service is unavailable" }, { status: 502 });
    }

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (typeof reply !== "string" || !reply.trim()) {
      return NextResponse.json({ error: "Empty response from chat service" }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Failed to reach DeepSeek API", error);
    return NextResponse.json({ error: "Chat service is unavailable" }, { status: 502 });
  }
}
