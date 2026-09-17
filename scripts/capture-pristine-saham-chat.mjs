import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const targets = [
  "/home/spil/Downloads/upwork_portfolio/02_saham_ai_portfolio/saham_03_ai_financial_analyst_chat_en.png",
  "/home/spil/projects/personal/portofolio-nextjs/public/projects/saham_03_ai_financial_analyst_chat_en.png",
  "/home/spil/document/upwork_screenshots/saham_03_ai_financial_analyst_chat_en.png"
];

async function capturePristineChat() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "en-US"
  });

  const page = await context.newPage();
  await page.goto("http://localhost:3005/chat", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Translate sidebar & headers to English
  const dict = [
    [/\bPortofolio\b/g, "Portfolio"],
    [/\bKonsultasi\b/g, "AI Financial Analyst"],
    [/\bSetelan\b/g, "Settings"],
    [/\bRadar Gorengan\b/g, "Momentum & Volatility Radar"],
    [/\bCrypto & Emas\b/g, "Crypto & Gold Macro"],
    [/\bKomoditas\b/g, "Commodities & FX"],
    [/\bBerita\b/g, "Market News & Sentiment"],
    [/\bKalender\b/g, "Dividend & Corp Actions"],
    [/\bAlat\b/g, "Quant Tools & Calculator"],
    [/\bChat baru\b/g, "New Chat Session"],
    [/\bKetik pertanyaan atau minta review\b/g, "Ask AI analyst or request portfolio review..."]
  ];

  await page.evaluate(({ translations }) => {
    const d = translations.map(([re, rep]) => [new RegExp(re.source, re.flags), rep]);
    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        let text = node.textContent || "";
        let replaced = text;
        for (const [re, rep] of d) if (re.test(replaced)) replaced = replaced.replace(re, rep);
        if (replaced !== text) node.textContent = replaced;
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const tag = node.tagName;
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return;
      for (const child of Array.from(node.childNodes)) walk(child);
    };
    walk(document.body);
  }, { translations: dict.map(([re, rep]) => [{ source: re.source, flags: re.flags }, rep]) });

  await page.waitForTimeout(500);

  for (const t of targets) {
    fs.mkdirSync(path.dirname(t), { recursive: true });
    await page.screenshot({ path: t });
    console.log(`Saved pristine screenshot: ${t}`);
  }

  await browser.close();
}

capturePristineChat();
