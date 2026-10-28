import { validateContact } from "@/lib/contact";

const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const MAX_BODY_BYTES = 16_000;
// Best effort per instance. Put a shared limiter (Upstash, Vercel WAF) in front for real traffic.
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number) {
  if (hits.size > 5_000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.set(ip, [...recent, now]);
  return recent.length >= MAX_PER_WINDOW;
}

function error(status: number, code: string, message: string, extra?: Record<string, unknown>) {
  return Response.json({ ok: false, error: { code, message, ...extra } }, { status });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip, Date.now())) {
    return error(429, "RATE_LIMITED", "Too many messages. Please try again in a few minutes.");
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return error(413, "PAYLOAD_TOO_LARGE", "Message is too long.");

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return error(400, "INVALID_JSON", "Invalid request.");
  }

  const result = validateContact(body);
  if (!result.ok) return error(422, "VALIDATION_FAILED", "Please check the highlighted fields.", { fields: result.errors });

  const { website, ...lead } = result.data;
  // Honeypot filled: answer like a success so bots learn nothing.
  if (website) return Response.json({ ok: true });

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    console.info(`[contact] ${lead.studio}: message received, CONTACT_WEBHOOK_URL not set (demo mode)`);
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (err) {
    console.error("[contact] delivery failed", err instanceof Error ? err.message : err);
    return error(502, "DELIVERY_FAILED", "We couldn't send that just now. Please email us instead.");
  }
  return Response.json({ ok: true, delivered: true });
}
