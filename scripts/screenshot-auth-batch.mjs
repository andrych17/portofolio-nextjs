// Batch authenticated screenshots with sensitive-text redaction.
// Usage: node scripts/screenshot-auth-batch.mjs <baseUrl> <loginPath> <email> <password> <outDir> <route1=name1> <route2=name2> ...
import { chromium } from "playwright";
import path from "path";

const [, , baseUrl, loginPath, email, password, outDir, ...routeArgs] = process.argv;

const SENSITIVE_PATTERNS = [
  /\+?62[\s-]?8[\d\s-]{8,13}/g,
  /\b0?8\d{2}[\s-]?\d{3,4}[\s-]?\d{3,5}\b/g,
  /[\w.+-]+@[\w-]+\.[\w.-]+/g,
  /\bRp\.?\s?[\d][\d.,]{3,}\b/gi,
  /\b\d{16}\b/g,
  /\b\d{10,15}\b/g,
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

  const resp = await page.request.post(`${baseUrl}${loginPath}`, {
    data: { email, password },
  });
  console.log("login status:", resp.status());

  for (const arg of routeArgs) {
    const [route, name] = arg.split("=");
    const outPath = path.join(outDir, name);
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 30000 }).catch((e) => console.log("nav err", route, e.message));
    await page.waitForTimeout(900);
    await page.evaluate(page_script, SENSITIVE_PATTERNS.map((p) => ({ source: p.source, flags: p.flags })));
    await page.waitForTimeout(200);
    await page.screenshot({ path: outPath });
    console.log(`Saved ${outPath} (${route})`);
  }

  await browser.close();
};

run();
