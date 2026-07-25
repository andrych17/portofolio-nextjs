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
- Senior Full-Stack & AI Systems Developer based in Surabaya, Indonesia, with ${yearsExp}+ years of experience.
- Currently a Fullstack Developer at MRI Software, Singapore (Remote), and Founder & Lead Architect of Qualiv (qualiv.id), a multi-tenant AI recruitment SaaS platform he built from scratch.
- Qualiv features: LLM-based CV screening & parsing (PDF/Docx), AI chat & video interview simulations, automated candidate logic/skill testing, BullMQ + Redis queues, Midtrans billing, Cloudflare R2 storage.
- Tech stack: .NET Core 9, C#, Node.js, NestJS, Laravel, REST/GraphQL APIs, Next.js, React, TypeScript, Tailwind CSS, Flutter, OpenAI GPT-4o, Anthropic Claude, Model Context Protocol (MCP), PostgreSQL, MySQL, SQL Server, Redis, Prisma, Docker, Cloudflare R2, AWS.
- Also built "CG Home Sharing & Booking Platform", a volunteer project for church communities: Airbnb-style house/room listings, Leaflet interactive map with BPS regional filters, surveyor inspection workflow, Member ID (NIJ) verification, booking calendars.
- Contact: WhatsApp +62 81-357-296-386, GitHub github.com/andrych17, LinkedIn linkedin.com/in/andry-huang-ba410a170.

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
