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
  [/\bMitra\b/gi, "VIP Clients & Suppliers"],
  [/\bPelanggan\b/gi, "Customers"],
  [/\bPemasok\b/gi, "Suppliers"],
  [/\bPenjualan\b/gi, "Gold Sales Invoices"],
  [/\bPembelian\b/gi, "Gold Buyback & PO"],
  [/\bProduk\b/gi, "Gold & Jewelry RFID Master"],
  [/\bBarang\b/gi, "Jewelry Items"],
  [/\bKategori\b/gi, "Karat & Category"],
  [/\bSatuan\b/gi, "Units"],
  [/\bStok\b/gi, "Weight (Grams) & Stock"],
  [/\bHarga Jual\b/gi, "Gold Price (per gram)"],
  [/\bHarga Beli\b/gi, "Buyback Price"],
  [/\bLaporan\b/gi, "Gold Analytics"],
  [/\bPengaturan\b/gi, "Settings"],
  [/\bTambah\b/gi, "Add Item"],
  [/\bCari\b/gi, "Search RFID"],
  [/\bReset\b/gi, "Reset"],
  [/\bAksi\b/gi, "Actions"],
  [/\bStatus\b/gi, "Status"],
  [/\bKode\b/gi, "Tag Code"],
  [/\bNama\b/gi, "Item Name"],
  [/\bAlamat\b/gi, "Address"],
  [/\bTelepon\b/gi, "Phone"],
  [/\bTotal\b/gi, "Total Amount"],
  [/\bTotal Order Hari Ini\b/gi, "Today Orders"],
  [/\bTotal Penjualan Hari Ini\b/gi, "Today Gold Sales Revenue"],
  [/\bOrder Bulan Ini\b/gi, "Monthly Orders"],
  [/\bTotal Penjualan Bulan Ini\b/gi, "Monthly Gold Sales Revenue"],
  [/\bTransaksi\b/gi, "Transactions"]
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
  console.log("Logged in state at:", page.url());

  const routes = [
    {
      url: "https://app.nusaevo.com/TrdJewel1/Home",
      file: "jewel_01_wijayamas_dashboard_en.png",
      label: "Wijaya Mas Jewelry Dashboard"
    },
    {
      url: "https://app.nusaevo.com/TrdJewel1/Master/Material",
      file: "jewel_02_gold_rfid_inventory_en.png",
      label: "Gold & Diamond RFID Inventory"
    },
    {
      url: "https://app.nusaevo.com/TrdJewel1/Master/Partner",
      file: "jewel_03_vip_clients_directory_en.png",
      label: "VIP Clients Directory"
    },
    {
      url: "https://app.nusaevo.com/TrdJewel1/Transaction/SalesOrder",
      file: "jewel_04_pos_gold_sales_invoices_en.png",
      label: "Gold POS Sales Invoices"
    },
    {
      url: "https://app.nusaevo.com/TrdJewel1/Transaction/PurchaseOrder",
      file: "jewel_05_gold_buyback_po_en.png",
      label: "Gold Scrap & Buyback Orders"
    }
  ];

  for (const item of routes) {
    try {
      console.log(`Capturing ${item.label} (${item.url})...`);
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(2500);

      // Check if page loaded correctly
      const url = page.url();
      if (url.includes("/login")) {
        console.warn(`[WARNING] Redirected to login for ${item.url}! Re-authenticating...`);
        await page.fill('#username', "andryhuang");
        await page.fill('#password', "password123");
        await page.click('button[type="submit"]');
        await page.waitForTimeout(2500);
        await page.goto(item.url, { waitUntil: "networkidle", timeout: 20000 });
        await page.waitForTimeout(2000);
      }

      // Apply English translations & strict table data blur
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

        // Translate table headers (th)
        document.querySelectorAll("th").forEach(th => {
          let t = th.innerText || "";
          for (const [re, rep] of dict) {
            if (re.test(t)) t = t.replace(re, rep);
          }
          th.innerText = t;
        });

        // Translate navigation, buttons, badges, titles
        document.querySelectorAll("nav a, .navbar a, .sidebar a, button, h1, h2, h3, h4, h5, .breadcrumb, label, .card-title, .fs-2").forEach(el => {
          if (el.children.length === 0) {
            let t = el.innerText || "";
            for (const [re, rep] of dict) {
              if (re.test(t)) t = t.replace(re, rep);
            }
            el.innerText = t;
          }
        });

        // Walk text nodes for card labels
        const walk = (node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            let text = node.textContent || "";
            let replaced = text;
            for (const [re, rep] of dict) {
              if (re.test(replaced)) replaced = replaced.replace(re, rep);
            }
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

      // Save to all target folders
      for (const tDir of TARGET_DIRS) {
        fs.mkdirSync(tDir, { recursive: true });
        const outPath = path.join(tDir, item.file);
        await page.screenshot({ path: outPath });
      }
      console.log(`>>> Successfully captured and saved: ${item.file} across all destination directories!`);
    } catch (e) {
      console.error(`Error capturing ${item.label}:`, e.message);
    }
  }

  await browser.close();
  console.log("=== WIJAYAMAS PROPER CAPTURE COMPLETED! ===");
}

run();
