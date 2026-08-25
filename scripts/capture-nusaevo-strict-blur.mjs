import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const OUT_DIR = "/home/spil/document/upwork_screenshots";

// Complete English Dictionary
const DICT = [
  // Navigation
  [/\bBeranda\b/gi, "Dashboard"],
  [/\bMitra\b/gi, "Partners & Vendors"],
  [/\bOnline Shop\b/gi, "Online Store"],
  [/\bSales Order OnlineShop\b/gi, "E-Commerce Orders"],
  [/\bPenjualan\b/gi, "Sales & POS"],
  [/\bProduk\b/gi, "Products & Inventory"],
  [/\bLaporan\b/gi, "Reports & Analytics"],
  [/\bPengaturan Akun\b/gi, "Account Settings"],
  [/\bPengaturan\b/gi, "Settings"],
  [/\bPengguna\b/gi, "Users & RBAC"],
  [/\bHak Akses\b/gi, "Access Rights"],
  [/\bKeluar\b/gi, "Sign Out"],
  [/\bMasuk\b/gi, "Sign In"],
  [/\bNotifikasi\b/gi, "Notifications"],
  [/\bnotifikasi belum dibaca\b/gi, "unread notifications"],
  [/\bEdit Profile\b/gi, "Profile Settings"],
  [/\bUpdate your personal information\b/gi, "Manage Account Information"],

  // Table Headers & Filters
  [/\bTambah Mitra\b/gi, "Add Partner"],
  [/\bTambah Produk\b/gi, "Add Product"],
  [/\bTambah Penjualan\b/gi, "New Sales Order"],
  [/\bSemua Tipe\b/gi, "All Types"],
  [/\bSemua Status\b/gi, "All Statuses"],
  [/\bPelanggan\b/gi, "Customer"],
  [/\bPemasok\b/gi, "Supplier"],
  [/\bCari\b/gi, "Search"],
  [/\bReset\b/gi, "Reset"],
  [/\bAksi\b/gi, "Actions"],
  [/\bStatus\b/gi, "Status"],
  [/\bKode\b/gi, "Code"],
  [/\bTipe\b/gi, "Type"],
  [/\bNama\b/gi, "Name / Title"],
  [/\bAlamat\b/gi, "Address"],
  [/\bTelepon\b/gi, "Phone"],
  [/\bEmail\b/gi, "Email"],
  [/\bDibuat\b/gi, "Created Date"],
  [/\bTanggal\b/gi, "Date"],
  [/\bNomor Nota\b/gi, "Invoice No"],
  [/\bNomor Pesanan\b/gi, "Order No"],
  [/\bTotal\b/gi, "Total Amount"],
  [/\bHarga\b/gi, "Price"],
  [/\bKuantitas\b/gi, "Quantity"],
  [/\bStok\b/gi, "Stock"],
  [/\bVarian\b/gi, "Variants"],
  [/\bKategori\b/gi, "Category"],
  [/\bSatuan\b/gi, "Unit"],
  [/\bKeterangan\b/gi, "Notes"]
];

const applyEnglishAndStrictCensorship = async (page) => {
  await page.evaluate(({ translations }) => {
    // 1. Inject strong blur stylesheet
    const style = document.createElement("style");
    style.innerHTML = `
      .censor-blur {
        filter: blur(8px) !important;
        opacity: 0.65 !important;
        user-select: none !important;
        pointer-events: none !important;
        display: inline-block !important;
      }
      .censor-box {
        filter: blur(10px) !important;
        user-select: none !important;
      }
    `;
    document.head.appendChild(style);

    const dict = translations.map(([re, rep]) => [new RegExp(re.source, re.flags), rep]);

    // 2. Translate table headers (th)
    document.querySelectorAll("th").forEach(th => {
      let t = th.innerText || "";
      for (const [re, rep] of dict) {
        if (re.test(t)) t = t.replace(re, rep);
      }
      th.innerText = t;
    });

    // 3. Translate navigation, buttons, badges, breadcrumbs
    document.querySelectorAll("nav a, .navbar a, .sidebar a, button, h1, h2, h3, h4, h5, h6, .breadcrumb, label, .nav-link").forEach(el => {
      if (el.children.length === 0) {
        let t = el.innerText || "";
        for (const [re, rep] of dict) {
          if (re.test(t)) t = t.replace(re, rep);
        }
        el.innerText = t;
      }
    });

    // 4. Translate text nodes in main containers
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

    // 5. CENSOR ALL SENSITIVE TABLE DATA
    // In every table body, blur all data cells (except code badge and action buttons)
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach(tr => {
      const tds = tr.querySelectorAll("td");
      const totalCols = tds.length;
      tds.forEach((td, idx) => {
        // Skip first col (Code) and last col (Action buttons) if multi-column
        const isActionCol = (idx === totalCols - 1) && (td.querySelector("button, a, svg") !== null);
        const isCodeCol = (idx === 0) && (td.innerText.trim().length <= 5);
        
        if (!isActionCol && !isCodeCol) {
          // Blur everything inside this data cell (Names, Phones, Emails, Addresses, Prices, Dates, Totals)
          td.innerHTML = `<span class="censor-blur">${td.innerHTML}</span>`;
        }
      });
    });

    // 6. Censor card stats with specific customer amounts or metric values
    const statsCards = document.querySelectorAll(".card-body, .stat-value, .metric-value, .total-amount, [data-stat]");
    statsCards.forEach(card => {
      const text = card.innerText || "";
      if (/\bRp\b|\b\d{6,}\b/i.test(text) && !card.closest("table")) {
        card.classList.add("censor-box");
      }
    });

  }, { translations: DICT.map(([re, rep]) => [{ source: re.source, flags: re.flags }, rep]) });
};

async function run() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "en-US",
    extraHTTPHeaders: {
      "Accept-Language": "en-US,en;q=0.9"
    }
  });

  const page = await context.newPage();

  console.log("Navigating to NusaEvo...");
  await page.goto("https://app.nusaevo.com/login", { waitUntil: "networkidle", timeout: 25000 });
  await page.waitForTimeout(1000);

  // Check if login form is present
  const codeInput = await page.$('input[name="code"]');
  if (codeInput) {
    console.log("Submitting login form...");
    await codeInput.fill("knc2");
    await page.fill('input[name="password"]', "password123");
    await Promise.all([
      page.waitForNavigation({ timeout: 15000 }).catch(() => {}),
      page.click('button[type="submit"]')
    ]);
    await page.waitForTimeout(2000);
  }

  console.log("Logged in state at:", page.url());

  const pagesToCapture = [
    {
      url: "https://app.nusaevo.com/TrdRetail1/Home",
      file: "nusaevo_02_retail_home_en.png",
      label: "Retail Dashboard"
    },
    {
      url: "https://app.nusaevo.com/TrdRetail1/Master/Partner",
      file: "nusaevo_05_vendors_partners_en.png",
      label: "Partners & Vendors Master"
    },
    {
      url: "https://app.nusaevo.com/TrdRetail1/Transaction/SalesOrderOnlineShop",
      file: "nusaevo_07_ecommerce_orders_en.png",
      label: "E-Commerce Orders & Shipments"
    },
    {
      url: "https://app.nusaevo.com/TrdRetail1/Transaction/SalesOrder",
      file: "nusaevo_08_pos_sales_history_en.png",
      label: "POS Sales Transactions"
    },
    {
      url: "https://app.nusaevo.com/TrdRetail1/Master/Material",
      file: "nusaevo_09_product_master_en.png",
      label: "Product & Dye Lot Master"
    },
    {
      url: "https://app.nusaevo.com/TrdRetail1/notifications",
      file: "nusaevo_11_notifications_center_en.png",
      label: "Notifications Center"
    },
    {
      url: "https://app.nusaevo.com/SysConfig1/AccountSetting/Detail/00CO2VMYJN57/1D6F43KJ6WSW",
      file: "nusaevo_10_account_settings_en.png",
      label: "Account Settings & Permissions"
    }
  ];

  for (const item of pagesToCapture) {
    try {
      console.log(`Capturing ${item.label} (${item.url})...`);
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(1500);
      await applyEnglishAndStrictCensorship(page);
      await page.waitForTimeout(500);
      const outPath = path.join(OUT_DIR, item.file);
      await page.screenshot({ path: outPath });
      console.log(`>>> Successfully saved censored EN screenshot: ${item.file}`);
    } catch (e) {
      console.error(`Error capturing ${item.label}:`, e.message);
    }
  }

  await browser.close();
  console.log("=== STRICT CENSORED NUSAEVO SCREENSHOTS COMPLETED! ===");
}

run();
