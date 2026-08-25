import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import path from "path";
import fs from "fs";

const OUT_DIR = "/home/spil/document/upwork_screenshots";

const SAHAM_DICT = [
  [/\bRingkasan Portofolio\b/gi, "Portfolio Summary"],
  [/\bAlokasi Sektor\b/gi, "Sector Allocation"],
  [/\bKepemilikan Saham\b/gi, "Holdings & Positions"],
  [/\bAnalisis Broker\b/gi, "Broker Summary (Bandarmology)"],
  [/\bAnalisis Sentimen\b/gi, "AI Sentiment Analysis"],
  [/\bKalender Dividen\b/gi, "Dividend Calendar"],
  [/\bKomoditas\b/gi, "Commodities Index"],
  [/\bKripto\b/gi, "Crypto & Macro"],
  [/\bKalkulator Nilai Wajar\b/gi, "Fair Value Calculator"],
  [/\bAsisten AI Saham\b/gi, "AI Financial Analyst Bot"],
  [/\bTanya AI\b/gi, "Ask AI Analyst"],
  [/\bKirim\b/gi, "Send Prompt"],
  [/\bNilai Pasar\b/gi, "Market Value"],
  [/\bKeuntungan \/ Kerugian\b/gi, "Unrealized P&L"],
  [/\bHarga Beli\b/gi, "Avg Buy Price"],
  [/\bHarga Terkini\b/gi, "Current Price"],
  [/\bJumlah Lembar\b/gi, "Shares / Lots"],
  [/\bRadar Momentum\b/gi, "High Volatility Radar"]
];

const SENSITIVE_PATTERNS = [
  /\+?62[\s-]?8[\d\s-]{8,13}/g,
  /\b0?8\d{2}[\s-]?\d{3,4}[\s-]?\d{3,5}\b/g,
  /[\w.+-]+@[\w-]+\.[\w.-]+/g,
  /\bRp\.?\s?[\d][\d.,]{5,}\b/gi,
  /\b\d{10,15}\b/g,
];

const applySahamENAndBlur = async (page) => {
  try {
    await page.evaluate(({ translations, sensitivePatterns }) => {
      const patterns = sensitivePatterns.map((p) => new RegExp(p.source, p.flags));
      const dict = translations.map(([re, rep]) => [new RegExp(re.source, re.flags), rep]);

      const style = document.createElement("style");
      style.innerHTML = `
        .censored-money {
          filter: blur(5px) !important;
          opacity: 0.7 !important;
          user-select: none !important;
          display: inline-block !important;
        }
      `;
      document.head.appendChild(style);

      // Translate headings, buttons, nav
      document.querySelectorAll("h1, h2, h3, h4, h5, h6, button, .nav-link, a, th, .badge").forEach(el => {
        if (el.children.length === 0) {
          let t = el.innerText || "";
          for (const [re, rep] of dict) {
            if (re.test(t)) t = t.replace(re, rep);
          }
          el.innerText = t;
        }
      });

      // Walk text nodes for translation & blur
      const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          let text = node.textContent || "";
          if (patterns.some((re) => re.test(text))) {
            const parent = node.parentElement;
            if (parent && !parent.closest("button") && !parent.closest("nav") && !parent.closest("header") && !parent.closest("th")) {
              parent.classList.add("censored-money");
              return;
            }
          }
          let replaced = text;
          for (const [re, rep] of dict) {
            if (re.test(replaced)) replaced = replaced.replace(re, rep);
          }
          if (replaced !== text) node.textContent = replaced;
          return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const tag = node.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return;
        for (const child of Array.from(node.childNodes)) walk(child);
      };
      walk(document.body);
    }, {
      translations: SAHAM_DICT.map(([re, rep]) => [{ source: re.source, flags: re.flags }, rep]),
      sensitivePatterns: SENSITIVE_PATTERNS.map((p) => ({ source: p.source, flags: p.flags }))
    });
  } catch (e) {
    console.warn("Saham DOM warn:", e.message);
  }
};

async function run() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "en-US"
  });

  const page = await context.newPage();

  const routes = [
    { path: "/", file: "saham_01_market_dashboard_en.png", label: "Market Overview & Watchlist" },
    { path: "/portfolio", file: "saham_02_portfolio_allocation_en.png", label: "Holdings & Portfolio Allocation" },
    { path: "/chat", file: "saham_03_ai_financial_analyst_chat_en.png", label: "AI Financial Analyst Chat" },
    { path: "/broksum", file: "saham_04_broker_summary_bandarmology_en.png", label: "Broker Summary & Flow" },
    { path: "/stock/BBCA", file: "saham_05_stock_chart_fundamentals_en.png", label: "Stock Detail & Fundamentals" },
    { path: "/gorengan", file: "saham_06_momentum_radar_en.png", label: "High Volatility & Momentum Radar" },
    { path: "/news", file: "saham_07_market_news_ai_sentiment_en.png", label: "News & AI Market Sentiment" },
    { path: "/calendar", file: "saham_08_dividend_corporate_calendar_en.png", label: "Dividend & Corporate Calendar" },
    { path: "/commodities", file: "saham_09_commodities_gold_oil_en.png", label: "Commodities & Precious Metals" },
    { path: "/crypto", file: "saham_10_crypto_macro_tracker_en.png", label: "Crypto & Macro Index" }
  ];

  for (const r of routes) {
    try {
      console.log(`Capturing ${r.label} (http://localhost:3005${r.path})...`);
      await page.goto(`http://localhost:3005${r.path}`, { waitUntil: "networkidle", timeout: 15000 });
      await page.waitForTimeout(1500);

      // Check if 404
      const body = await page.innerText("body");
      if (body.includes("404") && body.includes("This page could not be found")) {
        console.warn(`[404 WARNING] Route ${r.path} not found!`);
        continue;
      }

      await applySahamENAndBlur(page);
      await page.waitForTimeout(500);
      const outPath = path.join(OUT_DIR, r.file);
      await page.screenshot({ path: outPath });
      console.log(`>>> Successfully captured: ${r.file}`);
    } catch (e) {
      console.error(`Error capturing ${r.label}:`, e.message);
    }
  }

  await browser.close();
  console.log("=== ALL SAHAM SCREENSHOTS COMPLETED! ===");
}

run();
