import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const TARGET_DIRS = [
  "/home/spil/Downloads/upwork_portfolio/03_knitandcro_yarn_erp",
  "/home/spil/projects/personal/portofolio-nextjs/public/projects",
  "/home/spil/document/upwork_screenshots"
];

const KNIT_DICT = [
  [/\bToko Benang Rajut & Crochet Jakarta\b/gi, "Premium Yarn & Crochet Store Jakarta"],
  [/\bTentang Kami\b/gi, "About Us"],
  [/\bKontak\b/gi, "Contact"],
  [/\bMasuk\b/gi, "Sign In"],
  [/\bRegister\b/gi, "Register"],
  [/\bPembayaran aman\b/gi, "Secure Payment"],
  [/\bPengiriman cepat\b/gi, "Fast Nationwide Delivery"],
  [/\bPengembalian mudah\b/gi, "Easy Returns"],
  [/\bKoleksi Terbaru\b/gi, "New Arrivals"],
  [/\bBelanja Sekarang\b/gi, "Shop Now"],
  [/\bLihat Produk\b/gi, "Explore Collection"],
  [/\bBenang Katun\b/gi, "Cotton Yarn"],
  [/\bBenang Wol\b/gi, "Wool & Acrylic Yarn"],
  [/\bJarum Rajut\b/gi, "Crochet & Knitting Hooks"],
  [/\bAksesoris\b/gi, "Knitting Accessories"],
  [/\bSemua Produk\b/gi, "All Products"],
  [/\bKategori\b/gi, "Categories"],
  [/\bCari produk\b/gi, "Search yarn & tools..."],
  [/\bKeranjang\b/gi, "Cart"],
  [/\bGratis Ongkir\b/gi, "Free Shipping Available"]
];

async function captureStorefront() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "en-US"
  });

  const page = await context.newPage();

  const pagesToCapture = [
    { url: "https://knitandcro.com/", file: "knitandcro_storefront_01_hero_home_en.png", label: "Storefront Home Hero" },
    { url: "https://knitandcro.com/studio", file: "knitandcro_storefront_02_studio_collection_en.png", label: "Studio Yarn Collection" },
    { url: "https://knitandcro.com/about", file: "knitandcro_storefront_03_about_us_en.png", label: "Storefront About Us" },
    { url: "https://knitandcro.com/contact", file: "knitandcro_storefront_04_contact_location_en.png", label: "Storefront Contact & Location" }
  ];

  for (const item of pagesToCapture) {
    try {
      console.log(`Navigating to ${item.label} (${item.url})...`);
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(2000);

      // Translate DOM
      await page.evaluate(({ translations }) => {
        const dict = translations.map(([re, rep]) => [new RegExp(re.source, re.flags), rep]);
        const walk = (node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            let text = node.textContent || "";
            let replaced = text;
            for (const [re, rep] of dict) if (re.test(replaced)) replaced = replaced.replace(re, rep);
            if (replaced !== text) node.textContent = replaced;
            return;
          }
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const tag = node.tagName;
          if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return;
          for (const child of Array.from(node.childNodes)) walk(child);
        };
        walk(document.body);
      }, { translations: KNIT_DICT.map(([re, rep]) => [{ source: re.source, flags: re.flags }, rep]) });

      await page.waitForTimeout(500);

      for (const tDir of TARGET_DIRS) {
        fs.mkdirSync(tDir, { recursive: true });
        const outP = path.join(tDir, item.file);
        await page.screenshot({ path: outP });
      }
      console.log(`>>> Saved Storefront Image: [${item.file}]`);
    } catch (e) {
      console.error(`Error on ${item.label}:`, e.message);
    }
  }

  await browser.close();
  console.log("=== KNITANDCRO STOREFRONT CAPTURE COMPLETE! ===");
}

captureStorefront();
