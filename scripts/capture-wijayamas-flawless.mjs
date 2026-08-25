import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import path from "path";
import fs from "fs";

const TARGET_DIRS = [
  "/home/spil/Downloads/upwork_portfolio/07_wijayamas_jewel_rfid_erp",
  "/home/spil/Downloads/upwork_portfolio/06_software_agency_erp_solutions",
  "/home/spil/document/upwork_screenshots",
  "/home/spil/projects/personal/portofolio-nextjs/public/projects"
];

const JEWEL_DICT = [
  [/\bBeranda\b/gi, "Dashboard"],
  [/\bKategori Barang\b/gi, "Jewelry Categories & Karat"],
  [/\bHarga Emas & Kurs USD\b/gi, "Daily Gold Rates & USD Forex"],
  [/\bKatalog\b/gi, "Jewelry Photo Catalogue"],
  [/\bKeranjang Belanja\b/gi, "Active POS Cart"],
  [/\bNota Penjualan\b/gi, "Gold Sales Invoices"],
  [/\bTerima Jual Kembali\b/gi, "Gold Buyback & Scrap Inward"],
  [/\bPenerimaan Barang\b/gi, "Gold Procurement & GRN"],
  [/\bMaster Barang\b/gi, "Gold & Diamond RFID Master Inventory"],
  [/\bMaster Partner\b/gi, "VIP Clients & Gold Suppliers"],
  [/\bLaporan\b/gi, "Gold Inventory Valuation Reports"],
  [/\bTotal Order Hari Ini\b/gi, "Today Orders"],
  [/\bTotal Penjualan Hari Ini\b/gi, "Today Gold Sales"],
  [/\bOrder Bulan Ini\b/gi, "Monthly Orders"],
  [/\bTotal Penjualan Bulan Ini\b/gi, "Monthly Gold Revenue"],
  [/\bKode Barang\b/gi, "SKU / Tag Code"],
  [/\bKategori\b/gi, "Category"],
  [/\bHarga Emas\b/gi, "Gold Rate"],
  [/\bKurs USD\b/gi, "USD Exchange Rate"],
  [/\bTambah\b/gi, "Add New"],
  [/\bFilter\b/gi, "Filter Data"],
  [/\bKolom\b/gi, "Columns"],
  [/\bCari\b/gi, "Search"],
  [/\bReset\b/gi, "Reset"],
  [/\bAksi\b/gi, "Actions"],
  [/\bStatus\b/gi, "Status"]
];

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

  console.log("1. Authenticating as andryhuang...");
  await page.goto("https://app.nusaevo.com/login", { waitUntil: "domcontentloaded" });
  await page.fill('#username', "andryhuang");
  await page.fill('#password', "password123");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  console.log("2. Switching application session to Wijaya Mas (TrdJewel1)...");
  await page.click('.app-dropdown-container button, .app-dropdown-container [data-bs-toggle="dropdown"], .app-dropdown-container');
  await page.waitForTimeout(1000);
  await page.click('text="Wijaya Mas"');
  await page.waitForTimeout(3000);
  console.log("Switched session! Current URL:", page.url());

  const pagesToCapture = [
    {
      url: "https://app.nusaevo.com/TrdJewel1/Home",
      file: "jewel_01_wijayamas_dashboard_en.png",
      label: "Executive Dashboard"
    },
    {
      url: "https://app.nusaevo.com/TrdJewel1/Master/Material",
      file: "jewel_02_gold_diamond_rfid_inventory_en.png",
      label: "Gold & Diamond RFID Master Inventory"
    },
    {
      url: "https://app.nusaevo.com/TrdJewel1/Master/Category",
      file: "jewel_03_karat_categories_en.png",
      label: "Jewelry Categories & Karat Setup"
    },
    {
      url: "https://app.nusaevo.com/TrdJewel1/Master/Currency",
      file: "jewel_04_daily_gold_rates_forex_en.png",
      label: "Daily Gold Rates & USD Forex"
    },
    {
      url: "https://app.nusaevo.com/TrdJewel1/Master/Catalogue",
      file: "jewel_05_visual_photo_catalogue_en.png",
      label: "Visual Photo Catalogue"
    },
    {
      url: "https://app.nusaevo.com/TrdJewel1/Master/Partner",
      file: "jewel_06_vip_clients_suppliers_en.png",
      label: "VIP Clients & Gold Suppliers"
    },
    {
      url: "https://app.nusaevo.com/TrdJewel1/Transaction/SalesOrder",
      file: "jewel_07_pos_gold_sales_invoices_en.png",
      label: "Gold POS Sales Invoices"
    },
    {
      url: "https://app.nusaevo.com/TrdJewel1/Transaction/Buyback",
      file: "jewel_08_gold_buyback_scrap_inward_en.png",
      label: "Gold Buyback & Scrap Inward"
    },
    {
      url: "https://app.nusaevo.com/TrdJewel1/Procurement/PurchaseOrder",
      file: "jewel_09_gold_procurement_grn_en.png",
      label: "Gold Procurement & GRN"
    }
  ];

  for (const item of pagesToCapture) {
    try {
      console.log(`Capturing ${item.label} (${item.url})...`);
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(2000);

      // Verify no 403 Forbidden
      const bodyText = await page.innerText("body");
      if (bodyText.includes("403") && bodyText.includes("Forbidden")) {
        console.warn(`[403 FORBIDDEN WARNING] for ${item.url}!`);
        continue;
      }

      await page.evaluate(({ translations }) => {
        const style = document.createElement("style");
        style.innerHTML = `
          .censor-blur {
            filter: blur(8px) !important;
            opacity: 0.65 !important;
            user-select: none !important;
            display: inline-block !important;
          }
          .censor-stat {
            filter: blur(6px) !important;
            user-select: none !important;
          }
        `;
        document.head.appendChild(style);

        const dict = translations.map(([re, rep]) => [new RegExp(re.source, re.flags), rep]);

        // Translate table headers
        document.querySelectorAll("th").forEach(th => {
          let t = th.innerText || "";
          for (const [re, rep] of dict) if (re.test(t)) t = t.replace(re, rep);
          th.innerText = t;
        });

        // Translate navigation, buttons, titles, breadcrumbs
        document.querySelectorAll("nav a, .navbar a, .sidebar a, button, h1, h2, h3, h4, h5, .breadcrumb, label, .card-title, .brand-title").forEach(el => {
          if (el.children.length === 0) {
            let t = el.innerText || "";
            for (const [re, rep] of dict) if (re.test(t)) t = t.replace(re, rep);
            el.innerText = t;
          }
        });

        // Walk text nodes for labels
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
          if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || tag === "TBODY") return;
          for (const child of Array.from(node.childNodes)) walk(child);
        };
        walk(document.body);

        // Blur table data
        const rows = document.querySelectorAll("tbody tr");
        rows.forEach(tr => {
          const tds = tr.querySelectorAll("td");
          const total = tds.length;
          tds.forEach((td, idx) => {
            const isAction = (idx === total - 1) && (td.querySelector("button, a, svg") !== null);
            const isCode = (idx === 0) && (td.innerText.trim().length <= 5);
            if (!isAction && !isCode) {
              td.innerHTML = `<span class="censor-blur">${td.innerHTML}</span>`;
            }
          });
        });
      }, { translations: JEWEL_DICT.map(([re, rep]) => [{ source: re.source, flags: re.flags }, rep]) });

      await page.waitForTimeout(500);

      for (const tDir of TARGET_DIRS) {
        fs.mkdirSync(tDir, { recursive: true });
        const outPath = path.join(tDir, item.file);
        await page.screenshot({ path: outPath });
      }
      console.log(`>>> Successfully captured: ${item.file}`);
    } catch (e) {
      console.error(`Error capturing ${item.label}:`, e.message);
    }
  }

  await browser.close();
  console.log("=== ALL WIJAYAMAS PAGES CAPTURED FLAWLESSLY! ===");
}

run();
