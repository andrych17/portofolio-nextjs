import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const OUT_DIR = "/home/spil/document/upwork_screenshots";
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Indonesian to English dictionary for business UI
const ID_TO_EN = [
  // Navigation & Headers
  [/\bBeranda\b/gi, "Dashboard"],
  [/\bPenjualan\b/gi, "Sales"],
  [/\bPembelian\b/gi, "Purchasing"],
  [/\bMitra\b/gi, "Partners & Vendors"],
  [/\bProduk\b/gi, "Products"],
  [/\bKategori\b/gi, "Categories"],
  [/\bLaporan\b/gi, "Reports"],
  [/\bPengaturan Akun\b/gi, "Account Settings"],
  [/\bPengaturan\b/gi, "Settings"],
  [/\bPengguna\b/gi, "Users"],
  [/\bHak Akses\b/gi, "Access Rights / RBAC"],
  [/\bNotifikasi\b/gi, "Notifications"],
  [/\bKeluar\b/gi, "Logout"],
  [/\bMasuk\b/gi, "Sign In"],
  [/\bDaftar\b/gi, "Register"],
  [/\bTambah\b/gi, "Add New"],
  [/\bSimpan\b/gi, "Save"],
  [/\bBatal\b/gi, "Cancel"],
  [/\bHapus\b/gi, "Delete"],
  [/\bUbah\b/gi, "Edit"],
  [/\bCari\b/gi, "Search"],
  [/\bFilter\b/gi, "Filter"],
  [/\bStatus\b/gi, "Status"],
  [/\bSemua\b/gi, "All"],
  [/\bAksi\b/gi, "Actions"],
  [/\bDetail\b/gi, "Details"],
  [/\bRiwayat\b/gi, "History"],
  
  // GMS / Booking terms
  [/\bDaftar Rumah\b/gi, "Properties & Houses"],
  [/\bPendaftaran Rumah\b/gi, "House Registration"],
  [/\bPeminjaman Ruangan\b/gi, "Room Booking"],
  [/\bPengajuan Peminjaman\b/gi, "Booking Requests"],
  [/\bKontrak Peminjaman\b/gi, "Booking Contracts"],
  [/\bTugas Survey\b/gi, "Survey Tasks"],
  [/\bSurveyor\b/gi, "Field Surveyor"],
  [/\bWilayah\b/gi, "Regions"],
  [/\bFasilitas\b/gi, "Amenities & Facilities"],
  [/\bKapasitas\b/gi, "Capacity"],
  [/\bDisetujui\b/gi, "Approved"],
  [/\bMenunggu\b/gi, "Pending"],
  [/\bDitolak\b/gi, "Rejected"],
  
  // Nagamasban / Sales terms
  [/\bPenawaran\b/gi, "Quotations"],
  [/\bNota Penjualan\b/gi, "Sales Invoices"],
  [/\bTarget Penjualan\b/gi, "Sales Targets"],
  [/\bUkuran Ban\b/gi, "Tire Size"],
  [/\bMerk Ban\b/gi, "Tire Brand"],
  [/\bPola Tapak\b/gi, "Tread Pattern"],
  [/\bStok Tersedia\b/gi, "Stock Available"],
  [/\bPelanggan B2B\b/gi, "B2B Clients"],
  [/\bPelanggan\b/gi, "Customers"],
  [/\bHub Sales\b/gi, "Sales Hub"],
  [/\bTindak Lanjut\b/gi, "Follow-ups"],
  
  // Qualiv / HR Tech
  [/\bKandidat\b/gi, "Candidates"],
  [/\bLowongan Kerja\b/gi, "Job Openings"],
  [/\bLowongan\b/gi, "Jobs"],
  [/\bAsesmen\b/gi, "Assessments"],
  [/\bWawancara AI\b/gi, "AI Interviews"],
  [/\bTes Logika\b/gi, "Logic Tests"],
  [/\bSkor Kecocokan\b/gi, "Match Score"],
  [/\bRingkasan AI\b/gi, "AI Summary"],
  [/\bHasil Tes\b/gi, "Test Results"]
];

const SENSITIVE_PATTERNS = [
  /\+?62[\s-]?8[\d\s-]{8,13}/g,
  /\b0?8\d{2}[\s-]?\d{3,4}[\s-]?\d{3,5}\b/g,
  /[\w.+-]+@[\w-]+\.[\w.-]+/g,
  /\bRp\.?\s?[\d][\d.,]{3,}\b/gi,
  /\b\d{16}\b/g,
  /\b\d{10,15}\b/g,
];

const applyEnglishAndRedact = async (page) => {
  try {
    // 1. Check if there is an in-page language switcher first
    const langButtons = await page.$$('button:has-text("EN"), button:has-text("English"), a:has-text("EN"), [data-lang="en"]');
    for (const btn of langButtons) {
      try {
        await btn.click({ timeout: 1000 });
        await page.waitForTimeout(600);
      } catch (_) {}
    }

    // 2. DOM text replacement & smart blur in browser context
    await page.evaluate(({ translations, sensitivePatterns }) => {
      const patterns = sensitivePatterns.map((p) => new RegExp(p.source, p.flags));
      const dict = translations.map(([re, rep]) => [new RegExp(re.source, re.flags), rep]);

      const blurEl = (el) => {
        el.style.filter = "blur(5px)";
        el.style.userSelect = "none";
      };

      // Blur sensitive table cells (numbers, quantities, phone numbers)
      const cells = document.querySelectorAll("td, .table-cell, [role='cell']");
      cells.forEach((cell) => {
        const text = cell.innerText || "";
        if (patterns.some(p => p.test(text))) {
          blurEl(cell);
        }
      });

      // Walk DOM to translate UI text and blur remaining sensitive strings
      const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          let text = node.textContent || "";
          
          // Check sensitive blur
          if (patterns.some((re) => re.test(text))) {
            const parent = node.parentElement;
            if (parent && !parent.closest("button") && !parent.closest("nav") && !parent.closest("header") && !parent.closest("th")) {
              blurEl(parent);
              return;
            }
          }

          // Translate text
          let replaced = text;
          for (const [re, rep] of dict) {
            if (re.test(replaced)) {
              replaced = replaced.replace(re, rep);
            }
          }
          if (replaced !== text) {
            node.textContent = replaced;
          }
          return;
        }

        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const tag = node.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return;

        // Also translate placeholders
        if (node.placeholder) {
          let ph = node.placeholder;
          for (const [re, rep] of dict) {
            if (re.test(ph)) ph = ph.replace(re, rep);
          }
          node.placeholder = ph;
        }

        for (const child of Array.from(node.childNodes)) walk(child);
      };

      walk(document.body);
    }, {
      translations: ID_TO_EN.map(([re, rep]) => [{ source: re.source, flags: re.flags }, rep]),
      sensitivePatterns: SENSITIVE_PATTERNS.map((p) => ({ source: p.source, flags: p.flags }))
    });
  } catch (e) {
    console.warn("DOM transformation warning:", e.message);
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
    locale: "en-US",
    extraHTTPHeaders: {
      "Accept-Language": "en-US,en;q=0.9"
    }
  });

  const page = await context.newPage();

  // ═══════════════════════════════════════════════════════════
  // 1. QUALIV PLATFORM (ENGLISH)
  // ═══════════════════════════════════════════════════════════
  console.log("=== 1. QUALIV PLATFORM (EN) ===");
  try {
    await page.goto("https://qualiv.id", { waitUntil: "networkidle", timeout: 25000 });
    await page.waitForTimeout(1000);
    await applyEnglishAndRedact(page);
    await page.screenshot({ path: path.join(OUT_DIR, "qualiv_01_landing_hero_en.png") });
    console.log("Saved qualiv_01_landing_hero_en.png");

    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(1000);
    await applyEnglishAndRedact(page);
    await page.screenshot({ path: path.join(OUT_DIR, "qualiv_02_landing_features_en.png") });
    console.log("Saved qualiv_02_landing_features_en.png");

    // Login to app
    await page.goto("https://app.qualiv.id/login", { waitUntil: "networkidle", timeout: 20000 });
    await page.fill('input[name="email"]', "admin@qualiv.demo");
    await page.fill('input[name="password"]', "12345678");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    await applyEnglishAndRedact(page);
    await page.screenshot({ path: path.join(OUT_DIR, "qualiv_03_app_dashboard_en.png") });
    console.log("Saved qualiv_03_app_dashboard_en.png");

    const qualivRoutes = [
      { path: "/candidates", name: "qualiv_04_candidates_en.png" },
      { path: "/jobs", name: "qualiv_05_jobs_en.png" },
      { path: "/assessments", name: "qualiv_06_assessments_en.png" },
      { path: "/interviews", name: "qualiv_07_interviews_en.png" },
      { path: "/analytics", name: "qualiv_08_analytics_en.png" }
    ];

    for (const r of qualivRoutes) {
      try {
        await page.goto(`https://app.qualiv.id${r.path}`, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(1500);
        await applyEnglishAndRedact(page);
        await page.screenshot({ path: path.join(OUT_DIR, r.name) });
        console.log(`Saved ${r.name}`);
      } catch (_) {}
    }
  } catch (e) {
    console.error("Qualiv EN error:", e.message);
  }

  // ═══════════════════════════════════════════════════════════
  // 2. CG HOME SHARING (GMS STAGING - ENGLISH)
  // ═══════════════════════════════════════════════════════════
  console.log("=== 2. GMS STAGING (EN) ===");
  try {
    await page.goto("https://staging-admin-rumahcg.gms.church/login", { waitUntil: "networkidle", timeout: 25000 });
    await page.fill('input[name="email"], input[name="username"]', "md@gms.church");
    await page.fill('input[name="password"]', "md123456");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    await applyEnglishAndRedact(page);
    await page.screenshot({ path: path.join(OUT_DIR, "gms_02_dashboard_en.png") });
    console.log("Saved gms_02_dashboard_en.png");

    const gmsRoutes = [
      { path: "/admin/houses", name: "gms_03_houses_list_en.png" },
      { path: "/admin/requests", name: "gms_04_requests_en.png" },
      { path: "/admin/contracts", name: "gms_05_contracts_en.png" },
      { path: "/admin/surveyors", name: "gms_06_surveyors_en.png" },
      { path: "/home", name: "gms_07_portal_home_en.png" },
      { path: "/requests", name: "gms_08_portal_requests_en.png" }
    ];

    for (const r of gmsRoutes) {
      try {
        await page.goto(`https://staging-admin-rumahcg.gms.church${r.path}`, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(1500);
        await applyEnglishAndRedact(page);
        await page.screenshot({ path: path.join(OUT_DIR, r.name) });
        console.log(`Saved ${r.name}`);
      } catch (_) {}
    }
  } catch (e) {
    console.error("GMS EN error:", e.message);
  }

  // ═══════════════════════════════════════════════════════════
  // 3. NAGAMASBAN KATALOG & SALES (ENGLISH)
  // ═══════════════════════════════════════════════════════════
  console.log("=== 3. NAGAMASBAN (EN) ===");
  try {
    await page.goto("https://katalog.nagamasban.com", { waitUntil: "networkidle", timeout: 25000 });
    await page.waitForTimeout(1500);
    await applyEnglishAndRedact(page);
    await page.screenshot({ path: path.join(OUT_DIR, "nagamasban_01_katalog_en.png") });
    console.log("Saved nagamasban_01_katalog_en.png");

    await page.goto("https://katalog.nagamasban.com/login", { waitUntil: "networkidle", timeout: 15000 });
    await page.fill('input[name="nik"], input[name="username"], input[type="text"]', "1");
    await page.fill('input[name="password"]', "12345678");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2500);

    const nagamasbanRoutes = [
      { path: "/admin/sales", name: "nagamasban_04_sales_hub_en.png" },
      { path: "/admin/sales/quotations", name: "nagamasban_05_quotations_en.png" },
      { path: "/admin/sales/follow-ups", name: "nagamasban_06_followups_en.png" },
      { path: "/admin/sales/customers", name: "nagamasban_07_customers_en.png" },
      { path: "/admin/sales/penjualan", name: "nagamasban_08_sales_invoices_en.png" }
    ];

    for (const r of nagamasbanRoutes) {
      try {
        await page.goto(`https://katalog.nagamasban.com${r.path}`, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(1500);
        await applyEnglishAndRedact(page);
        await page.screenshot({ path: path.join(OUT_DIR, r.name) });
        console.log(`Saved ${r.name}`);
      } catch (_) {}
    }
  } catch (e) {
    console.error("Nagamasban EN error:", e.message);
  }

  // ═══════════════════════════════════════════════════════════
  // 4. NUSAEVO ERP (LOGGED IN - ENGLISH)
  // ═══════════════════════════════════════════════════════════
  console.log("=== 4. NUSAEVO ERP (EN) ===");
  try {
    await page.goto("https://app.nusaevo.com/login", { waitUntil: "networkidle", timeout: 20000 });
    await page.fill('input[name="code"]', "knc2");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2500);

    await applyEnglishAndRedact(page);
    await page.screenshot({ path: path.join(OUT_DIR, "nusaevo_02_retail_home_en.png") });
    console.log("Saved nusaevo_02_retail_home_en.png");

    const nusaRoutes = [
      { path: "/TrdRetail1/Master/Partner", name: "nusaevo_05_vendors_partners_en.png" },
      { path: "/TrdRetail1/Transaction/SalesOrderOnlineShop", name: "nusaevo_07_ecommerce_orders_en.png" },
      { path: "/TrdRetail1/Transaction/SalesOrder", name: "nusaevo_08_pos_sales_history_en.png" },
      { path: "/TrdRetail1/Master/Material", name: "nusaevo_09_product_master_en.png" },
      { path: "/TrdRetail1/notifications", name: "nusaevo_11_notifications_center_en.png" }
    ];

    for (const r of nusaRoutes) {
      try {
        await page.goto(`https://app.nusaevo.com${r.path}`, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(1500);
        await applyEnglishAndRedact(page);
        await page.screenshot({ path: path.join(OUT_DIR, r.name) });
        console.log(`Saved ${r.name}`);
      } catch (_) {}
    }
  } catch (e) {
    console.error("NusaEvo EN error:", e.message);
  }

  await browser.close();
  console.log("=== ALL ENGLISH SCREENSHOTS COMPLETE! ===");
}

run();
