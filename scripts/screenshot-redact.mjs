// One-off utility: headless screenshot with sensitive-text redaction.
// Usage: node scripts/screenshot-redact.mjs <url> <outputPath> [waitSelector]
import { chromium } from "playwright";

const [, , url, outPath, waitSelector] = process.argv;

if (!url || !outPath) {
  console.error("Usage: node screenshot-redact.mjs <url> <outputPath> [waitSelector]");
  process.exit(1);
}

const SENSITIVE_PATTERNS = [
  /\+?62[\s-]?8[\d\s-]{8,13}/g, // Indonesian phone numbers
  /\b0?8\d{2}[\s-]?\d{3,4}[\s-]?\d{3,5}\b/g, // local phone formats
  /[\w.+-]+@[\w-]+\.[\w.-]+/g, // emails
  /\bRp\.?\s?[\d][\d.,]{3,}\b/gi, // rupiah amounts
  /\b\d{16}\b/g, // NIK / 16-digit ids
  /\b\d{10,15}\b/g, // long account/reference numbers
];

const page_script = (patternsSrc) => {
  const patterns = patternsSrc.map((p) => new RegExp(p.source, p.flags));
  const blurEl = (el) => {
    el.style.filter = "blur(6px)";
    el.style.userSelect = "none";
  };
  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (patterns.some((re) => re.test(text))) {
        const parent = node.parentElement;
        if (parent) blurEl(parent);
      }
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const tag = node.tagName;
    if (tag === "SCRIPT" || tag === "STYLE") return;
    for (const child of Array.from(node.childNodes)) walk(child);
  };
  walk(document.body);
};

const run = async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
  if (waitSelector) {
    await page.waitForSelector(waitSelector, { timeout: 10000 }).catch(() => {});
  }
  await page.waitForTimeout(800);
  await page.evaluate(page_script, SENSITIVE_PATTERNS.map((p) => ({ source: p.source, flags: p.flags })));
  await page.waitForTimeout(200);
  await page.screenshot({ path: outPath });
  await browser.close();
  console.log(`Saved ${outPath}`);
};

run();
