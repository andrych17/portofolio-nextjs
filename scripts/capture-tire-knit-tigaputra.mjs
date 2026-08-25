import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import path from "path";
import fs from "fs";

const BASE_DL = "/home/spil/Downloads/upwork_portfolio";

// Global English dictionary for ERP modules
const ERP_DICT = [
  [/\bBeranda\b/gi, "Dashboard"],
  [/\bMitra\b/gi, "Partners & Vendors"],
  [/\bPelanggan\b/gi, "Customers"],
  [/\bPemasok\b/gi, "Suppliers"],
  [/\bPenjualan\b/gi, "Sales Orders"],
  [/\bPembelian\b/gi, "Purchase Orders"],
  [/\bProduk\b/gi, "Products & Inventory"],
  [/\bBarang\b/gi, "Inventory Items"],
  [/\bKategori\b/gi, "Categories"],
  [/\bSatuan\b/gi, "Units"],
  [/\bStok\b/gi, "Stock Balance"],
  [/\bHarga Jual\b/gi, "Selling Price"],
  [/\bHarga Beli\b/gi, "Cost Price"],
  [/\bKasir\b/gi, "POS Cashier"],
  [/\bLaporan\b/gi, "Reports"],
  [/\bPengaturan\b/gi, "Settings"],
  [/\bTambah\b/gi, "Add New"],
  [/\bCari\b/gi, "Search"],
  [/\bReset\b/gi, "Reset"],
  [/\bAksi\b/gi, "Actions"],
  [/\bStatus\b/gi, "Status"],
  [/\bKode\b/gi, "Code"],
  [/\bNama\b/gi, "Name"],
  [/\bAlamat\b/gi, "Address"],
  [/\bTelepon\b/gi, "Phone"],
  [/\bTanggal\b/gi, "Date"],
  [/\bNomor\b/gi, "Number"],
  [/\bTotal\b/gi, "Total Amount"],
  [/\bKadaluwarsa\b/gi, "Expiry Date (FIFO)"],
  [/\bToko\b/gi, "Store / Branch"],
  [/\bGudang\b/gi, "Warehouse"]
];

const applyERPCensorshipAndEN = async (page) => {
  try {
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

      // Translate table headers (th)
      document.querySelectorAll("th").forEach(th => {
        let t = th.innerText || "";
        for (const [re, rep] of dict) {
          if (re.test(t)) t = t.replace(re, rep);
        }
        th.innerText = t;
      });

      // Translate navigation, buttons, badges
      document.querySelectorAll("nav a, .navbar a, .sidebar a, button, h1, h2, h3, h4, h5, .breadcrumb, label").forEach(el => {
        if (el.children.length === 0) {
          let t = el.innerText || "";
          for (const [re, rep] of dict) {
            if (re.test(t)) t = t.replace(re, rep);
          }
          el.innerText = t;
        }
      });

      // Blur table data cells
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
    }, { translations: ERP_DICT.map(([re, rep]) => [{ source: re.source, flags: re.flags }, rep]) });
  } catch (e) {
    console.warn("DOM translate warn:", e.message);
  }
};

async function main() {
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

  // === 1. TIRE ERP (Cahaya Terang / TrdTire1 & TrdTire2) ===
  console.log("1. Capturing Tire ERP (Cahaya Terang)...");
  try {
    await page.goto("https://app.nusaevo.com/login", { waitUntil: "networkidle", timeout: 20000 });
    await page.fill('input[name="code"]', "andryhuang");
    await page.fill('input[name="password"]', "password123");
    await Promise.all([
      page.waitForNavigation({ timeout: 15000 }).catch(() => {}),
      page.click('button[type="submit"]')
    ]);
    await page.waitForTimeout(3000);

    const tireTargetDir = path.join(BASE_DL, "04_tire_cahayaterang_nagamasban");
    const tirePages = [
      { url: "https://app.nusaevo.com/TrdTire1/Home", file: "tire_01_cahayaterang_dashboard_en.png", label: "Tire Retail Dashboard" },
      { url: "https://app.nusaevo.com/TrdTire1/Master/Material", file: "tire_02_inventory_specs_ring_dot_en.png", label: "Tire Master & Rim Specs" },
      { url: "https://app.nusaevo.com/TrdTire1/Master/Partner", file: "tire_03_fleet_dealers_suppliers_en.png", label: "Fleet & Tire Suppliers" },
      { url: "https://app.nusaevo.com/TrdTire1/Transaction/SalesOrder", file: "tire_04_sales_wholesale_orders_en.png", label: "Tire Wholesale Sales Orders" }
    ];

    for (const item of tirePages) {
      console.log(`Capturing ${item.label}...`);
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(2500);
      await applyERPCensorshipAndEN(page);
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(tireTargetDir, item.file) });
      console.log(`>>> Saved ${item.file}`);
    }
  } catch (e) {
    console.error("Tire ERP capture error:", e.message);
  }

  // === 2. KNIT AND CRO YARN ERP (TrdRetail1) ===
  console.log("2. Capturing Knit and Cro Yarn ERP...");
  try {
    const knitTargetDir = path.join(BASE_DL, "03_knitandcro_yarn_erp");
    const knitPages = [
      { url: "https://app.nusaevo.com/TrdRetail1/Home", file: "knitandcro_01_retail_dashboard_en.png", label: "Yarn Retail Dashboard" },
      { url: "https://app.nusaevo.com/TrdRetail1/Master/Partner", file: "knitandcro_02_vendors_buyers_en.png", label: "Partners & Buyers Directory" },
      { url: "https://app.nusaevo.com/TrdRetail1/Transaction/SalesOrderOnlineShop", file: "knitandcro_03_ecommerce_marketplace_orders_en.png", label: "E-Commerce & Online Store Orders" },
      { url: "https://app.nusaevo.com/TrdRetail1/Transaction/SalesOrder", file: "knitandcro_04_pos_invoices_history_en.png", label: "POS Sales Invoices & Cashier History" },
      { url: "https://app.nusaevo.com/TrdRetail1/Master/Material", file: "knitandcro_05_yarn_dye_lot_variants_en.png", label: "Yarn Dye Lot & Product Inventory" },
      { url: "https://app.nusaevo.com/TrdRetail1/notifications", file: "knitandcro_06_realtime_notifications_en.png", label: "Order Notifications Center" },
      { url: "https://app.nusaevo.com/SysConfig1/AccountSetting/Detail/00CO2VMYJN57/1D6F43KJ6WSW", file: "knitandcro_07_rbac_account_settings_en.png", label: "RBAC & Permissions" }
    ];

    for (const item of knitPages) {
      console.log(`Capturing ${item.label}...`);
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(2500);
      await applyERPCensorshipAndEN(page);
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(knitTargetDir, item.file) });
      console.log(`>>> Saved ${item.file}`);
    }
  } catch (e) {
    console.error("Knit and Cro capture error:", e.message);
  }

  await browser.close();
  console.log("=== TIRE AND KNITANDCRO CAPTURES COMPLETED! ===");
}

main();
