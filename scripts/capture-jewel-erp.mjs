import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import path from "path";

const BASE_DL = "/home/spil/Downloads/upwork_portfolio";

const JEWEL_DICT = [
  [/\bBeranda\b/gi, "Dashboard"],
  [/\bMitra\b/gi, "VIP Customers & Suppliers"],
  [/\bPelanggan\b/gi, "Customers"],
  [/\bPenjualan\b/gi, "Gold Sales Invoices"],
  [/\bProduk\b/gi, "Gold & Jewelry Inventory (RFID)"],
  [/\bBarang\b/gi, "Jewelry Items"],
  [/\bKategori\b/gi, "Karat / Category"],
  [/\bStok\b/gi, "Weight & Stock"],
  [/\bHarga Jual\b/gi, "Gold Price (per gram)"],
  [/\bTambah\b/gi, "Add Item"],
  [/\bCari\b/gi, "Search RFID"],
  [/\bStatus\b/gi, "Status"],
  [/\bKode\b/gi, "Tag Code"],
  [/\bNama\b/gi, "Item Name"],
  [/\bAlamat\b/gi, "Address"],
  [/\bTelepon\b/gi, "Phone"]
];

async function captureJewel() {
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

  console.log("Logging into NusaEvo for Jewel ERP...");
  await page.goto("https://app.nusaevo.com/login", { waitUntil: "networkidle", timeout: 20000 });
  await page.fill('input[name="code"]', "andryhuang");
  await page.fill('input[name="password"]', "password123");
  await Promise.all([
    page.waitForNavigation({ timeout: 15000 }).catch(() => {}),
    page.click('button[type="submit"]')
  ]);
  await page.waitForTimeout(3000);

  const jewelTargetDir = path.join(BASE_DL, "06_software_agency_erp_solutions");
  const jewelPages = [
    { url: "https://app.nusaevo.com/TrdJewel1/Home", file: "jewel_01_wijayamas_dashboard_en.png", label: "Jewelry Retail Dashboard" },
    { url: "https://app.nusaevo.com/TrdJewel1/Master/Material", file: "jewel_02_gold_rfid_inventory_en.png", label: "Gold & Diamond RFID Inventory" },
    { url: "https://app.nusaevo.com/TrdJewel1/Master/Partner", file: "jewel_03_vip_clients_directory_en.png", label: "VIP Clients Directory" },
    { url: "https://app.nusaevo.com/TrdJewel1/Transaction/SalesOrder", file: "jewel_04_pos_gold_sales_invoices_en.png", label: "Gold POS Invoices" }
  ];

  for (const item of jewelPages) {
    try {
      console.log(`Capturing ${item.label}...`);
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(3000);

      await page.evaluate(({ translations }) => {
        const style = document.createElement("style");
        style.innerHTML = `
          .censor-blur {
            filter: blur(8px) !important;
            opacity: 0.65 !important;
            user-select: none !important;
            display: inline-block !important;
          }
        `;
        document.head.appendChild(style);
        const dict = translations.map(([re, rep]) => [new RegExp(re.source, re.flags), rep]);

        document.querySelectorAll("th").forEach(th => {
          let t = th.innerText || "";
          for (const [re, rep] of dict) if (re.test(t)) t = t.replace(re, rep);
          th.innerText = t;
        });

        document.querySelectorAll("nav a, .navbar a, .sidebar a, button, h1, h2, h3, h4, h5, .breadcrumb").forEach(el => {
          if (el.children.length === 0) {
            let t = el.innerText || "";
            for (const [re, rep] of dict) if (re.test(t)) t = t.replace(re, rep);
            el.innerText = t;
          }
        });

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
      await page.screenshot({ path: path.join(jewelTargetDir, item.file) });
      console.log(`>>> Saved ${item.file}`);
    } catch (e) {
      console.error("Jewel capture error:", e.message);
    }
  }

  await browser.close();
}

captureJewel();
