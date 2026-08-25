import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const OUT_DIR = "/home/spil/document/upwork_screenshots";
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const SENSITIVE_PATTERNS = [
  /\+?62[\s-]?8[\d\s-]{8,13}/g,
  /\b0?8\d{2}[\s-]?\d{3,4}[\s-]?\d{3,5}\b/g,
  /[\w.+-]+@[\w-]+\.[\w.-]+/g,
  /\bRp\.?\s?[\d][\d.,]{3,}\b/gi,
  /\b\d{16}\b/g,
  /\b\d{10,15}\b/g,
];

const redactSensitiveText = async (page) => {
  await page.evaluate((patternsSrc) => {
    const patterns = patternsSrc.map((p) => new RegExp(p.source, p.flags));
    const blurEl = (el) => {
      el.style.filter = "blur(5px)";
      el.style.userSelect = "none";
    };
    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        if (patterns.some((re) => re.test(text))) {
          const parent = node.parentElement;
          if (parent && !parent.closest("input") && !parent.closest("button")) {
            blurEl(parent);
          }
        }
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const tag = node.tagName;
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return;
      for (const child of Array.from(node.childNodes)) walk(child);
    };
    walk(document.body);
  }, SENSITIVE_PATTERNS.map((p) => ({ source: p.source, flags: p.flags })));
};

async function run() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  const page = await context.newPage();

  console.log("1. Testing Qualiv Landing...");
  try {
    await page.goto("https://qualiv.id", { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForTimeout(1000);
    await redactSensitiveText(page);
    await page.screenshot({ path: path.join(OUT_DIR, "qualiv_01_landing.png") });
    console.log("Saved qualiv_01_landing.png");
  } catch (e) {
    console.error("Qualiv landing error:", e.message);
  }

  console.log("2. Testing Nagamasban Katalog...");
  try {
    await page.goto("https://katalog.nagamasban.com", { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForTimeout(1000);
    await redactSensitiveText(page);
    await page.screenshot({ path: path.join(OUT_DIR, "nagamasban_01_katalog.png") });
    console.log("Saved nagamasban_01_katalog.png");
  } catch (e) {
    console.error("Nagamasban error:", e.message);
  }

  console.log("3. Testing GMS Staging...");
  try {
    await page.goto("https://staging-admin-rumahcg.gms.church/login", { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(OUT_DIR, "gms_01_login.png") });
    console.log("Saved gms_01_login.png");
  } catch (e) {
    console.error("GMS login error:", e.message);
  }

  console.log("4. Testing NusaEvo Login...");
  try {
    await page.goto("https://app.nusaevo.com/login", { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(OUT_DIR, "nusaevo_01_login.png") });
    console.log("Saved nusaevo_01_login.png");
  } catch (e) {
    console.error("NusaEvo login error:", e.message);
  }

  await browser.close();
  console.log("Test finished!");
}

run();
