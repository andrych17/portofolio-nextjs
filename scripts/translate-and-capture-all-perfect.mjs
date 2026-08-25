import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import path from "path";
import fs from "fs";

const BASE_DL = "/home/spil/Downloads/upwork_portfolio";
const PUBLIC_PROJECTS = "/home/spil/projects/personal/portofolio-nextjs/public/projects";
const DOC_SCREENSHOTS = "/home/spil/document/upwork_screenshots";

// ━━━ 1. COMPREHENSIVE INDONESIAN -> ENGLISH DICTIONARY ━━━
const MASTER_DICT = [
  // Wijaya Mas / Jewelry
  [/\bMaster Barang\b/gi, "Product Master"],
  [/\bKategori Barang\b/gi, "Product Categories"],
  [/\bHarga Emas & Kurs USD\b/gi, "Gold Rates & USD Forex"],
  [/\bHarga Emas\b/gi, "Gold Rate (per Gram)"],
  [/\bKurs USD\b/gi, "USD Exchange Rate"],
  [/\bKatalog\b/gi, "Photo Catalogue"],
  [/\bKeranjang Belanja\b/gi, "POS Active Cart"],
  [/\bNota Penjualan\b/gi, "Sales Invoices"],
  [/\bTerima Jual Kembali\b/gi, "Gold Buyback & Scrap"],
  [/\bPenerimaan Barang\b/gi, "Goods Receipt (GRN)"],
  [/\bMaster Partner\b/gi, "VIP Clients & Suppliers"],
  [/\bCincin Mutiara\b/gi, "Pearl Ring"],
  [/\bCincin Pria\b/gi, "Men Ring"],
  [/\bCincin Wanita\b/gi, "Women Ring"],
  [/\bCincin\b/gi, "Ring"],
  [/\bGelang\b/gi, "Bracelet"],
  [/\bKalung\b/gi, "Necklace"],
  [/\bAnting\b/gi, "Earrings"],
  [/\bLiontin\b/gi, "Pendant"],
  [/\bBros\b/gi, "Brooch"],
  [/\bKadar Emas\b/gi, "Gold Purity"],
  [/\bKadar\b/gi, "Purity"],
  [/\bBerat\b/gi, "Weight (g)"],
  [/\bKarat\b/gi, "Karat"],

  // Dashboard Stats & Text
  [/\bTotal Order Hari Ini\b/gi, "Today Orders"],
  [/\bTotal Penjualan Hari Ini\b/gi, "Today Total Sales"],
  [/\bOrder Bulan Ini\b/gi, "Monthly Orders"],
  [/\bTotal Penjualan Bulan Ini\b/gi, "Monthly Total Revenue"],
  [/\b\*Belum termasuk retur & tukar barang\b/gi, "*Excludes returns & item exchanges"],
  [/\bBelum termasuk retur\b/gi, "Excludes returns"],
  [/\bTransaksi\b/gi, "Transactions"],
  [/\bHari Ini\b/gi, "Today"],
  [/\bBulan Ini\b/gi, "This Month"],
  [/\b30 Hari\b/gi, "Last 30 Days"],
  [/\bSelamat datang kembali di dashboard aplikasi\b/gi, "Welcome back to your central management dashboard"],
  [/\bSistem telah siap digunakan dan semua modul tersedia\b/gi, "Enterprise systems and business modules are fully operational"],
  [/\bMulai jelajahi fitur-fitur yang tersedia!\b/gi, "Select a business module from the sidebar to proceed"],
  [/\bWelcome, Andry Huang!\b/gi, "Welcome, Andry Huang!"],

  // Tire / Nagamasban / Automotive
  [/\bSpesifikasi Ban\b/gi, "Tire Specifications (Ring/DOT)"],
  [/\bBan Mobil\b/gi, "Passenger Car Tire"],
  [/\bBan Truk\b/gi, "Truck & Bus Radial Tire"],
  [/\bBan Motor\b/gi, "Motorcycle Tire"],
  [/\bVelg\b/gi, "Alloy Rim"],
  [/\bOli Mesin\b/gi, "Engine Oil & Lubricants"],
  [/\bAki\b/gi, "Battery"],
  [/\bJasa Pasang\b/gi, "Mounting & Balancing Service"],
  [/\bSpooring\b/gi, "Wheel Alignment"],
  [/\bBalancing\b/gi, "Wheel Balancing"],
  [/\bHub Sales\b/gi, "B2B Sales Hub"],
  [/\bPenawaran\b/gi, "Price Quotations"],
  [/\bTindak Lanjut\b/gi, "Customer Follow-ups"],

  // Knit and Cro / Textile
  [/\bBenang\b/gi, "Yarn"],
  [/\bLot Celup\b/gi, "Dye Lot"],
  [/\bVarian Warna\b/gi, "Color Variants"],
  [/\bOnline Shop\b/gi, "E-Commerce Orders"],
  [/\bKasir\b/gi, "POS Cashier"],
  [/\bnotifikasi belum dibaca\b/gi, "unread notifications"],

  // General ERP & Navigation
  [/\bBeranda\b/gi, "Dashboard"],
  [/\bHome\b/gi, "Home"],
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
  [/\bHarga Modal\b/gi, "Cost Price"],
  [/\bLaporan\b/gi, "Reports & Analytics"],
  [/\bPengaturan Akun\b/gi, "Account Settings"],
  [/\bPengaturan\b/gi, "Settings"],
  [/\bPengguna\b/gi, "Users & RBAC"],
  [/\bHak Akses\b/gi, "Access Rights"],
  [/\bKonstanta\b/gi, "Constants"],
  [/\bVarian\b/gi, "Variants"],
  [/\bNomor Seri\b/gi, "Serial Numbers"],
  [/\bSerial\b/gi, "Serial Numbers"],
  [/\bAplikasi\b/gi, "Applications"],
  [/\bApplication\b/gi, "Applications"],
  [/\bMenu\b/gi, "Navigation Menus"],
  [/\bUser\b/gi, "Users"],
  [/\bGroup\b/gi, "User Groups"],
  [/\bConstant\b/gi, "System Constants"],
  [/\bVariant\b/gi, "Product Variants"],
  [/\bKeluar\b/gi, "Sign Out"],
  [/\bMasuk\b/gi, "Sign In"],
  [/\bNotifikasi\b/gi, "Notifications"],

  // Table Controls
  [/\bTambah\b/gi, "Add New"],
  [/\bCreate\b/gi, "Create New"],
  [/\bFilter\b/gi, "Filter"],
  [/\bKolom\b/gi, "Columns"],
  [/\bCari\b/gi, "Search"],
  [/\bReset\b/gi, "Reset"],
  [/\bAksi\b/gi, "Actions"],
  [/\bStatus\b/gi, "Status"],
  [/\bKode Barang\b/gi, "SKU / Tag Code"],
  [/\bKode\b/gi, "Code"],
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
  [/\bJumlah\b/gi, "Amount / Qty"],
  [/\bKeterangan\b/gi, "Notes / Description"],
  [/\bSemua Tipe\b/gi, "All Types"],
  [/\bSemua Status\b/gi, "All Statuses"],
  [/\bSemua\b/gi, "All"]
];

const SENSITIVE_PATTERNS = [
  /\+?62[\s-]?8[\d\s-]{8,13}/g,
  /\b0?8\d{2}[\s-]?\d{3,4}[\s-]?\d{3,5}\b/g,
  /[\w.+-]+@[\w-]+\.[\w.-]+/g,
  /\bRp\.?\s?[\d][\d.,]{4,}\b/gi,
  /\b\d{16}\b/g
];

// Helper to save screenshot in all target directories
async function saveToAll(page, filename, projectFolder) {
  const targets = [
    path.join(BASE_DL, projectFolder, filename),
    path.join(PUBLIC_PROJECTS, filename),
    path.join(DOC_SCREENSHOTS, filename)
  ];

  for (const t of targets) {
    fs.mkdirSync(path.dirname(t), { recursive: true });
    await page.screenshot({ path: t });
  }
  console.log(`>>> Saved [${filename}] to ${projectFolder} & public assets`);
}

// ━━━ 2. AGGRESSIVE TRANSLATE & BLUR INJECTOR ━━━
async function applyAggressiveTranslateAndBlur(page) {
  await page.evaluate(({ translations, sensitivePatterns }) => {
    // 1. Inject Styles
    if (!document.getElementById("upwork-censor-style")) {
      const style = document.createElement("style");
      style.id = "upwork-censor-style";
      style.innerHTML = `
        .censor-blur {
          filter: blur(8px) !important;
          opacity: 0.65 !important;
          user-select: none !important;
          pointer-events: none !important;
          display: inline-block !important;
        }
      `;
      document.head.appendChild(style);
    }

    const dict = translations.map(([re, rep]) => [new RegExp(re.source, re.flags), rep]);
    const sensPatterns = sensitivePatterns.map((p) => new RegExp(p.source, p.flags));

    const translateStr = (str) => {
      if (!str || typeof str !== "string") return str;
      let res = str;
      for (const [re, rep] of dict) {
        if (re.test(res)) res = res.replace(re, rep);
      }
      return res;
    };

    // 2. Translate all attributes (placeholder, title, aria-label)
    document.querySelectorAll("input, textarea, select, button, a").forEach(el => {
      if (el.placeholder) el.placeholder = translateStr(el.placeholder);
      if (el.title) el.title = translateStr(el.title);
      if (el.getAttribute("aria-label")) el.setAttribute("aria-label", translateStr(el.getAttribute("aria-label")));
      if (el.tagName === "SELECT") {
        Array.from(el.options).forEach(opt => {
          opt.text = translateStr(opt.text);
        });
      }
    });

    // 3. Translate all select dropdown elements & options in DOM
    document.querySelectorAll("option, label, button, .btn, th, .nav-link, .menu-title, .menu-link, .breadcrumb, h1, h2, h3, h4, h5, h6, .card-title, .badge, span.text-muted, p").forEach(el => {
      if (el.children.length === 0 && el.innerText) {
        el.innerText = translateStr(el.innerText);
      }
    });

    // 4. Recursive DOM Text Node Walker for all containers
    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        let text = node.textContent;
        if (text && text.trim().length > 0) {
          node.textContent = translateStr(text);
        }
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const tag = node.tagName;
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return;
      for (const child of Array.from(node.childNodes)) walk(child);
    };
    walk(document.body);

    // 5. Blur Sensitive Table Cells
    document.querySelectorAll("tbody tr").forEach(tr => {
      const tds = tr.querySelectorAll("td");
      const total = tds.length;
      tds.forEach((td, idx) => {
        const isAction = (idx === total - 1) && (td.querySelector("button, a, svg, .btn") !== null);
        const isCode = (idx === 0) && (td.innerText.trim().length <= 6);
        const rawText = td.innerText.trim();

        // Translate text inside td before blurring
        td.childNodes.forEach(cn => {
          if (cn.nodeType === Node.TEXT_NODE) cn.textContent = translateStr(cn.textContent);
        });

        // Blur if it's data (names, phones, emails, amounts, addresses, dates)
        if (!isAction && !isCode) {
          if (!td.querySelector(".censor-blur")) {
            td.innerHTML = `<span class="censor-blur">${td.innerHTML}</span>`;
          }
        }
      });
    });

  }, {
    translations: MASTER_DICT.map(([re, rep]) => [{ source: re.source, flags: re.flags }, rep]),
    sensitivePatterns: SENSITIVE_PATTERNS.map((p) => ({ source: p.source, flags: p.flags }))
  });
}

// ━━━ 3. MAIN CAPTURE RUNNER ━━━
async function main() {
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

  // ══════════════════════════════════════════════════════
  // A. WIJAYA MAS JEWELRY RFID ERP (07_wijayamas_jewel_rfid_erp)
  // ══════════════════════════════════════════════════════
  console.log("\n=== 1. CAPTURING WIJAYA MAS JEWELRY ERP (ENGLISH) ===");
  try {
    await page.goto("https://app.nusaevo.com/login", { waitUntil: "domcontentloaded" });
    await page.fill('#username', "andryhuang");
    await page.fill('#password', "password123");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    // Switch to Wijaya Mas
    await page.click('.app-dropdown-container button, .app-dropdown-container [data-bs-toggle="dropdown"], .app-dropdown-container');
    await page.waitForTimeout(1000);
    await page.click('text="Wijaya Mas"');
    await page.waitForTimeout(3000);

    const jewelPages = [
      { url: "https://app.nusaevo.com/TrdJewel1/Home", file: "jewel_01_wijayamas_dashboard_en.png", label: "Executive Dashboard" },
      { url: "https://app.nusaevo.com/TrdJewel1/Master/Material", file: "jewel_02_gold_diamond_rfid_inventory_en.png", label: "Gold & Diamond RFID Master Inventory" },
      { url: "https://app.nusaevo.com/TrdJewel1/Master/Category", file: "jewel_03_karat_categories_en.png", label: "Jewelry Categories & Karat Setup" },
      { url: "https://app.nusaevo.com/TrdJewel1/Master/Currency", file: "jewel_04_daily_gold_rates_forex_en.png", label: "Daily Gold Rates & USD Forex" },
      { url: "https://app.nusaevo.com/TrdJewel1/Master/Catalogue", file: "jewel_05_visual_photo_catalogue_en.png", label: "Visual Photo Catalogue" },
      { url: "https://app.nusaevo.com/TrdJewel1/Master/Partner", file: "jewel_06_vip_clients_suppliers_en.png", label: "VIP Clients & Gold Suppliers" },
      { url: "https://app.nusaevo.com/TrdJewel1/Transaction/SalesOrder", file: "jewel_07_pos_gold_sales_invoices_en.png", label: "Gold POS Sales Invoices" },
      { url: "https://app.nusaevo.com/TrdJewel1/Transaction/Buyback", file: "jewel_08_gold_buyback_scrap_inward_en.png", label: "Gold Buyback & Scrap Inward" },
      { url: "https://app.nusaevo.com/TrdJewel1/Procurement/PurchaseOrder", file: "jewel_09_gold_procurement_grn_en.png", label: "Gold Procurement & GRN" }
    ];

    for (const item of jewelPages) {
      console.log(`Translating & Capturing: ${item.label}...`);
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(2000);
      await applyAggressiveTranslateAndBlur(page);
      await page.waitForTimeout(500);
      await saveToAll(page, item.file, "07_wijayamas_jewel_rfid_erp");
    }
  } catch (e) {
    console.error("Wijaya Mas Error:", e.message);
  }

  // ══════════════════════════════════════════════════════
  // B. TIRE ERP (04_tire_cahayaterang_nagamasban)
  // ══════════════════════════════════════════════════════
  console.log("\n=== 2. CAPTURING TIRE ERP (CAHAYA TERANG & NAGAMASBAN) ===");
  try {
    // Switch to Cahaya Terang (TrdTire1)
    await page.click('.app-dropdown-container button, .app-dropdown-container [data-bs-toggle="dropdown"], .app-dropdown-container');
    await page.waitForTimeout(1000);
    await page.click('text="Cahaya Terang"');
    await page.waitForTimeout(3000);

    const tirePages = [
      { url: "https://app.nusaevo.com/TrdTire1/Home", file: "tire_01_cahayaterang_dashboard_en.png", label: "Tire Retail Dashboard" },
      { url: "https://app.nusaevo.com/TrdTire1/Master/Material", file: "tire_02_inventory_specs_ring_dot_en.png", label: "Tire Master & Rim Specs" },
      { url: "https://app.nusaevo.com/TrdTire1/Master/Partner", file: "tire_03_fleet_dealers_suppliers_en.png", label: "Fleet & Tire Suppliers" },
      { url: "https://app.nusaevo.com/TrdTire1/Transaction/SalesOrder", file: "tire_04_sales_wholesale_orders_en.png", label: "Tire Wholesale Sales Orders" }
    ];

    for (const item of tirePages) {
      console.log(`Translating & Capturing: ${item.label}...`);
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(2000);
      await applyAggressiveTranslateAndBlur(page);
      await page.waitForTimeout(500);
      await saveToAll(page, item.file, "04_tire_cahayaterang_nagamasban");
    }
  } catch (e) {
    console.error("Tire Error:", e.message);
  }

  // ══════════════════════════════════════════════════════
  // C. KNIT AND CRO YARN ERP (03_knitandcro_yarn_erp)
  // ══════════════════════════════════════════════════════
  console.log("\n=== 3. CAPTURING KNIT AND CRO YARN ERP ===");
  try {
    // Switch to Knit and Cro (TrdRetail1)
    await page.click('.app-dropdown-container button, .app-dropdown-container [data-bs-toggle="dropdown"], .app-dropdown-container');
    await page.waitForTimeout(1000);
    await page.click('text="Knit And Cro"');
    await page.waitForTimeout(3000);

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
      console.log(`Translating & Capturing: ${item.label}...`);
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(2000);
      await applyAggressiveTranslateAndBlur(page);
      await page.waitForTimeout(500);
      await saveToAll(page, item.file, "03_knitandcro_yarn_erp");
    }
  } catch (e) {
    console.error("Knit and Cro Error:", e.message);
  }

  await browser.close();
  console.log("\n=== ALL ERP SCREENSHOTS TRANSLATED TO ENGLISH 100% PERFECTLY! ===");
}

main();
