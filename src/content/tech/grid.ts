// Photos: none. Every screen on this template is drawn in HTML, CSS and SVG.
import type { Faq } from "@/content/types";

export const grid = {
  key: "tech/grid",
  path: "/tech/grid",
  title: "Your Brand · Reliable webhook delivery API for developers",
  description:
    "Your Brand is a webhook delivery API that signs, retries, logs and replays every event, with SDKs for Node and Python and a free plan to start building today.",
  answer:
    "Your Brand is a webhook delivery API for developers: you send one event, and it signs the payload, retries on failure for 72 hours and logs every attempt, so a customer's server being down never costs you data.",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  street: "14 Lattice Row",
  city: "Northfield",
  postalCode: "00000",
  country: "United States",
  countryCode: "US",
  hours: "Mon to Fri, 08:00 to 17:00 UTC",
  nav: [
    { label: "Product", href: "#product" },
    { label: "Docs", href: "#docs" },
    { label: "Changelog", href: "#changelog" },
    { label: "Status", href: "#status" },
    { label: "Pricing", href: "#pricing" },
  ],
  ticker: ["payment.succeeded", "invoice.paid", "user.created", "order.shipped", "subscription.renewed", "refund.issued", "ticket.closed", "deploy.finished", "file.scanned", "usage.threshold"],
  figures: [
    { k: "99.99%", v: "delivered, last 90 days" },
    { k: "41 ms", v: "median to first attempt" },
    { k: "3", v: "active-active regions" },
    { k: "72 h", v: "automatic retry window" },
  ],
  story: {
    lead: "A webhook is a promise your server makes to someone else's. Most teams keep it with a cron job and a prayer.",
    points: [
      { title: "Your customers' servers go down.", body: "Deploys, certificates, a Friday afternoon. Events should wait, not vanish." },
      { title: "You should not own a queue.", body: "Retries, backoff, signing and logs are the same work for every team. Do it once, somewhere else." },
      { title: "Support needs a receipt.", body: "When a customer says they never got it, you can show the exact request, response and time." },
    ],
  },
  samples: {
    curl: `curl https://api.yourbrand.com/v1/events \\
  -H "Authorization: Bearer sk_test_4eC39" \\
  -d type="invoice.paid" \\
  -d endpoint="ep_checkout" \\
  -d data[amount]=4900`,
    node: `import { YourBrand } from "@yourbrand/node";

const yb = new YourBrand("sk_test_4eC39");

await yb.events.send({
  type: "invoice.paid",
  endpoint: "ep_checkout",
  data: { amount: 4900 },
});`,
    python: `from yourbrand import YourBrand

yb = YourBrand("sk_test_4eC39")

yb.events.send(
    type="invoice.paid",
    endpoint="ep_checkout",
    data={"amount": 4900},
)`,
  },
  response: [
    { t: "202 Accepted", meta: "38 ms", strong: true },
    { t: '{ "id": "evt_9f2a1c", "status": "queued" }', meta: "" },
    { t: "attempt 1  shop.example.com/hooks", meta: "200 · 112 ms" },
  ],
  features: [
    { n: "01", title: "One event in, every endpoint out", body: "Send once. Fan out to as many endpoints as the customer has, each with its own queue, retries and secret." },
    { n: "02", title: "Signed, and easy to check", body: "Every request carries a timestamped HMAC signature. Verifying it takes five lines." },
    { n: "03", title: "Retries that back off", body: "Failed deliveries retry on a widening schedule for 72 hours, then land in a dead-letter list you can replay." },
    { n: "04", title: "Replay anything", body: "Press one button, or call one endpoint, and any past event goes out again with the same ID and a fresh signature." },
    { n: "05", title: "Logs you can hand to a customer", body: "Request, response, headers, timing and the exact error. Searchable for up to 90 days." },
  ],
  retries: [
    { at: "0 s", h: 8 },
    { at: "30 s", h: 14 },
    { at: "5 m", h: 24 },
    { at: "30 m", h: 38 },
    { at: "2 h", h: 54 },
    { at: "8 h", h: 74 },
    { at: "24 h", h: 100 },
  ],
  replayRows: [
    { id: "evt_9f2a1c", type: "invoice.paid", status: "200", ago: "2 s ago" },
    { id: "evt_9f2a0b", type: "user.created", status: "410", ago: "1 m ago" },
    { id: "evt_9f29f4", type: "order.shipped", status: "503", ago: "4 m ago" },
    { id: "evt_9f29d8", type: "refund.issued", status: "200", ago: "9 m ago" },
  ],
  logs: [
    "09:41:02.118  evt_9f2a1c  invoice.paid       POST shop.example.com/hooks     200   112 ms",
    "09:41:01.904  evt_9f2a1b  user.created       POST app.example.org/yb         200    64 ms",
    "09:40:58.372  evt_9f2a0b  order.shipped      POST erp.example.net/inbound    503  3012 ms  retry in 30 s",
    "09:40:51.019  evt_9f29f4  refund.issued      POST shop.example.com/hooks     200    98 ms",
    "09:40:44.560  evt_9f29e0  usage.threshold    POST ops.example.io/alerts      200    71 ms",
  ],
  docs: [
    {
      id: "quickstart",
      label: "Quickstart",
      title: "Send your first event",
      body: "Install the SDK, set a secret key and call send. The event is accepted in a few milliseconds and delivered in the background.",
      lang: "bash",
      code: `npm install @yourbrand/node
export YB_SECRET=sk_test_4eC39`,
    },
    {
      id: "auth",
      label: "Authentication",
      title: "Keys and environments",
      body: "Test keys start with sk_test and never leave the sandbox. Live keys start with sk_live. Rotate either from the dashboard; the old one keeps working for 24 hours.",
      lang: "http",
      code: `Authorization: Bearer sk_live_••••••••
Idempotency-Key: 7d1c0b52-order-1042`,
    },
    {
      id: "verify",
      label: "Verify signatures",
      title: "Check every request",
      body: "Each delivery has an X-YB-Signature header with a timestamp and an HMAC of the raw body. Reject anything older than five minutes.",
      lang: "node",
      code: `import { verify } from "@yourbrand/node";

const ok = verify(rawBody, req.headers["x-yb-signature"], secret, {
  tolerance: 300,
});
if (!ok) return res.status(400).end();`,
    },
    {
      id: "retries",
      label: "Retries",
      title: "What happens on failure",
      body: "Any response outside 2xx, or no answer in 10 seconds, counts as a failure. Retries follow the schedule below, then the event moves to the dead-letter list.",
      lang: "text",
      code: `attempt 1   now
attempt 2   +30 s
attempt 3   +5 min
attempt 4   +30 min
attempt 5   +2 h
attempt 6   +8 h
attempt 7   +24 h   then dead-letter`,
    },
  ],
  uptime: [
    { name: "Events API", pct: "99.99%", seed: 11, bad: [23, 61] },
    { name: "Delivery workers", pct: "99.98%", seed: 29, bad: [14, 47, 72] },
    { name: "Dashboard", pct: "100%", seed: 43, bad: [] as number[] },
  ],
  changelog: [
    { date: "2026-10-14", v: "2.14", tag: "New", title: "Replay from the dashboard", body: "Select any event or a whole filtered list and replay it to one endpoint or all of them. Replays keep the original event ID so your handlers stay idempotent." },
    { date: "2026-09-30", v: "2.13", tag: "Improved", title: "Signing secrets rotate without downtime", body: "Rotating a secret now keeps the previous one valid for 24 hours. Requests carry both signatures during the overlap." },
    { date: "2026-09-11", v: "2.12", tag: "New", title: "Async client for the Python SDK", body: "The Python SDK ships an asyncio client with the same surface as the sync one. Type hints cover every method." },
    { date: "2026-08-26", v: "2.11.3", tag: "Fix", title: "Retries resumed after an endpoint answers 410", body: "Endpoints that returned 410 Gone were paused for good. They now pause for an hour and get retried once before being disabled." },
    { date: "2026-08-05", v: "2.11", tag: "New", title: "Regional endpoints in eu-west", body: "Pin an endpoint to a region so payloads and logs stay inside it. Existing endpoints are unchanged." },
    { date: "2026-07-22", v: "2.10", tag: "Improved", title: "Delivery log search", body: "Filter by status, endpoint, event type or any field of the payload. Scale plans keep 90 days of history." },
  ],
  stats: [
    { value: 41, suffix: " ms", label: "median time to first attempt" },
    { value: 8200, suffix: " M", label: "events delivered every month" },
    { value: 72, suffix: " h", label: "retry window for every event" },
    { value: 99, suffix: "%", label: "delivered on the first attempt" },
  ],
  process: [
    { n: "01", title: "Create an endpoint", body: "Give us a URL. We hand back a signing secret. Test it with the built-in tunnel before it ever sees production.", code: "yb endpoints create \\\n  --url https://shop.example.com/hooks" },
    { n: "02", title: "Send an event", body: "Call send from your backend when something happens. We return in milliseconds and take it from there.", code: "await yb.events.send({\n  type: \"invoice.paid\",\n})" },
    { n: "03", title: "Watch it arrive", body: "Every attempt shows up in the log with its status, timing and response. Replay with one click if you need to.", code: "attempt 1  200  112 ms\nstatus     delivered" },
  ],
  plans: {
    names: ["Free", "Pro", "Scale", "Enterprise"],
    price: ["$0", "$29", "$199", "Custom"],
    cadence: ["forever", "per month", "per month", "per year"],
    featured: 1,
    rows: [
      { label: "Events per month", v: ["50,000", "2 million", "50 million", "Unlimited"] },
      { label: "Endpoints", v: ["5", "100", "1,000", "Unlimited"] },
      { label: "Log history", v: ["3 days", "30 days", "90 days", "Custom"] },
      { label: "Retry window", v: ["24 h", "72 h", "72 h", "Custom"] },
      { label: "Regions", v: ["1", "2", "3", "Dedicated"] },
      { label: "SSO and audit log", v: ["No", "No", "Yes", "Yes"] },
      { label: "Uptime SLA", v: ["None", "99.9%", "99.99%", "99.99% with credits"] },
      { label: "Support", v: ["Community", "Email", "Priority chat", "Named engineer"] },
    ],
    cta: ["Start free", "Start 14-day trial", "Start 14-day trial", "Talk to us"],
  },
  testimonials: [
    { quote: "We deleted 1,400 lines of retry code and a Redis instance. Support tickets about missing webhooks went to zero.", name: "Amara", role: "Staff engineer, Halden Pay" },
    { quote: "The signature check is five lines. I have reviewed a lot of webhook libraries, and that never happens.", name: "Kofi", role: "Security lead, Tessel" },
    { quote: "Replay saved a launch. A partner was down for two hours and we pressed one button when they came back.", name: "Ilse", role: "CTO, Brightmoor" },
    { quote: "The logs are what I show customers now. It ends the conversation in under a minute.", name: "Raoul", role: "Head of support, Quillon" },
  ],
  faqs: [
    { q: "How are payloads signed?", a: "Every delivery carries an X-YB-Signature header with a Unix timestamp and an HMAC-SHA256 of the raw request body, keyed with the endpoint's secret. The SDKs verify it for you and reject requests older than your chosen tolerance." },
    { q: "What happens when my customer's endpoint is down?", a: "We keep retrying on a widening schedule for 72 hours: 30 seconds, 5 minutes, 30 minutes, 2 hours, 8 hours and 24 hours. After that the event moves to a dead-letter list where you can replay it manually or by API." },
    { q: "Do you guarantee delivery order?", a: "No. Events are delivered at least once and usually in order, but retries can reorder them. Every payload has a monotonic sequence number and a created-at timestamp so your handler can sort them if it needs to." },
    { q: "Can I replay an event?", a: "Yes. Any event from the log can be replayed to one endpoint or all of them from the dashboard or with a single API call. The replay keeps the original event ID, so a handler that is idempotent will not do the work twice." },
    { q: "Where are payloads stored, and for how long?", a: "Payloads and logs live in the region you pick for each endpoint, in the United States or the EU. Retention is 3 days on Free, 30 on Pro and 90 on Scale, and you can delete an event by ID at any time." },
    { q: "Is there a free plan I can build on?", a: "Yes. Free includes 50,000 events a month and 5 endpoints with no card and no time limit. Nothing is switched off when you hit the cap; we email you first and then queue events for 24 hours." },
  ] satisfies Faq[],
  interests: ["Get an API key", "Pricing question", "Migrating from my own queue"],
  volumes: ["Under 1 M", "1 to 50 M", "50 M+"],
  socials: [
    { label: "GitHub", href: "#" },
    { label: "X", href: "#" },
    { label: "Discord", href: "#" },
    { label: "RSS changelog", href: "#" },
  ],
};
