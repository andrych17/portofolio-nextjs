import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const OUT_DIR = "/home/spil/document/upwork_screenshots";
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const SENSITIVE_PATTERNS = [
  /\+?62[\s-]?8[\d\s-]{8,13}/g,
  /\b0?8\d{2}[\s-]?\d{3,4}[\s-]?\d{3,5}\b/g,
  /[\w.+-]+@[\w-]+\.[\w.-]+/g,
  /\bRp\.?\s?[\d][\d.,]{3,}\b/gi,
  /\b\d{16}\b/g,
  /\b\d{10,15}\b/g,
];

const redactSensitiveText = async (page) => {
  try {
    await page.evaluate((patternsSrc) => {
      const patterns = patternsSrc.map((p) => new RegExp(p.source, p.flags));
      const blurEl = (el) => {
        el.style.filter = "blur(5px)";
        el.style.userSelect = "none";
      };
      const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || "";
          if (patterns.some((re) => re.test(text))) {
            const parent = node.parentElement;
            if (parent && !parent.closest("input") && !parent.closest("button") && !parent.closest("nav") && !parent.closest("header")) {
              blurEl(parent);
            }
          }
          return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const tag = node.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return;
        for (const child of Array.from(node.childNodes)) walk(child);
      };
      walk(document.body);
    }, SENSITIVE_PATTERNS.map((p) => ({ source: p.source, flags: p.flags })));
  } catch (e) {
    console.warn("Redact warning:", e.message);
  }
};

async function run() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  const page = await context.newPage();

  // ═══════════════════════════════════════════════════════════
  // 1. GMS STAGING (CG HOME SHARING)
  // ═══════════════════════════════════════════════════════════
  console.log("=== 1. GMS STAGING ===");
  try {
    await page.goto("https://staging-admin-rumahcg.gms.church/login", { waitUntil: "networkidle", timeout: 25000 });
    await page.waitForTimeout(800);
    
    // Fill credentials
    const emailInput = await page.$('input[name="email"], input[type="email"], input[name="username"]');
    const passInput = await page.$('input[name="password"], input[type="password"]');
    if (emailInput && passInput) {
      await emailInput.fill("md@gms.church");
      await passInput.fill("md123456");
      const submitBtn = await page.$('button[type="submit"], button:has-text("Masuk"), button:has-text("Login")');
      if (submitBtn) await submitBtn.click();
      await page.waitForTimeout(3000);
    }

    console.log("GMS current URL:", page.url());
    await redactSensitiveText(page);
    await page.screenshot({ path: path.join(OUT_DIR, "gms_02_dashboard.png") });
    console.log("Saved gms_02_dashboard.png");

    // Check menu routes
    const gmsRoutes = [
      { path: "/admin/houses", name: "gms_03_houses_list.png" },
      { path: "/admin/requests", name: "gms_04_requests.png" },
      { path: "/admin/contracts", name: "gms_05_contracts.png" },
      { path: "/admin/surveyors", name: "gms_06_surveyors.png" },
      { path: "/home", name: "gms_07_portal_home.png" },
      { path: "/requests", name: "gms_08_portal_requests.png" }
    ];

    for (const r of gmsRoutes) {
      try {
        await page.goto(`https://staging-admin-rumahcg.gms.church${r.path}`, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(1500);
        await redactSensitiveText(page);
        await page.screenshot({ path: path.join(OUT_DIR, r.name) });
        console.log(`Saved ${r.name}`);
      } catch (err) {
        console.log(`GMS route ${r.path} failed:`, err.message);
      }
    }
  } catch (e) {
    console.error("GMS flow error:", e.message);
  }

  // ═══════════════════════════════════════════════════════════
  // 2. NAGAMASBAN (KATALOG & ADMIN)
  // ═══════════════════════════════════════════════════════════
  console.log("=== 2. NAGAMASBAN ===");
  try {
    await page.goto("https://katalog.nagamasban.com", { waitUntil: "networkidle", timeout: 25000 });
    await page.waitForTimeout(1500);
    await redactSensitiveText(page);
    await page.screenshot({ path: path.join(OUT_DIR, "nagamasban_01_katalog_home.png") });
    console.log("Saved nagamasban_01_katalog_home.png");

    // Try clicking search or filter
    const brandBtn = await page.$('button:has-text("Brand"), select, input[placeholder*="Cari"]');
    if (brandBtn) {
      await page.screenshot({ path: path.join(OUT_DIR, "nagamasban_02_katalog_search.png") });
    }

    // Try login
    await page.goto("https://katalog.nagamasban.com/login", { waitUntil: "networkidle", timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(800);
    const nikInput = await page.$('input[name="nik"], input[name="username"], input[name="email"], input[type="text"]');
    const passInput = await page.$('input[name="password"], input[type="password"]');
    if (nikInput && passInput) {
      await nikInput.fill("1");
      await passInput.fill("12345678");
      const submitBtn = await page.$('button[type="submit"], button:has-text("Masuk"), button:has-text("Login")');
      if (submitBtn) await submitBtn.click();
      await page.waitForTimeout(2500);
    }
    console.log("Nagamasban current URL:", page.url());
    await redactSensitiveText(page);
    await page.screenshot({ path: path.join(OUT_DIR, "nagamasban_03_admin_dashboard.png") });
    console.log("Saved nagamasban_03_admin_dashboard.png");

    const nagamasbanRoutes = [
      { path: "/admin/sales", name: "nagamasban_04_sales_hub.png" },
      { path: "/admin/sales/quotations", name: "nagamasban_05_quotations.png" },
      { path: "/admin/sales/follow-ups", name: "nagamasban_06_followups.png" },
      { path: "/admin/sales/customers", name: "nagamasban_07_customers.png" },
      { path: "/admin/sales/penjualan", name: "nagamasban_08_penjualan.png" }
    ];

    for (const r of nagamasbanRoutes) {
      try {
        await page.goto(`https://katalog.nagamasban.com${r.path}`, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(1500);
        await redactSensitiveText(page);
        await page.screenshot({ path: path.join(OUT_DIR, r.name) });
        console.log(`Saved ${r.name}`);
      } catch (err) {
        console.log(`Nagamasban route ${r.path} failed:`, err.message);
      }
    }
  } catch (e) {
    console.error("Nagamasban flow error:", e.message);
  }

  // ═══════════════════════════════════════════════════════════
  // 3. QUALIV PLATFORM (APP.QUALIV.ID)
  // ═══════════════════════════════════════════════════════════
  console.log("=== 3. QUALIV PLATFORM ===");
  try {
    await page.goto("https://qualiv.id", { waitUntil: "networkidle", timeout: 25000 });
    await page.waitForTimeout(1500);
    await redactSensitiveText(page);
    await page.screenshot({ path: path.join(OUT_DIR, "qualiv_01_landing_hero.png") });
    
    // Scroll down for feature section
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(OUT_DIR, "qualiv_02_landing_features.png") });

    // Go to app
    await page.goto("https://app.qualiv.id/login", { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForTimeout(1000);
    const emailEl = await page.$('input[name="email"], input[type="email"]');
    const passEl = await page.$('input[name="password"], input[type="password"]');
    if (emailEl && passEl) {
      await emailEl.fill("admin@qualiv.demo");
      await passEl.fill("12345678");
      const submit = await page.$('button[type="submit"], button:has-text("Masuk"), button:has-text("Sign in")');
      if (submit) await submit.click();
      await page.waitForTimeout(3000);
    }
    console.log("Qualiv current URL:", page.url());
    await redactSensitiveText(page);
    await page.screenshot({ path: path.join(OUT_DIR, "qualiv_03_app_dashboard.png") });
    console.log("Saved qualiv_03_app_dashboard.png");

    const qualivRoutes = [
      { path: "/candidates", name: "qualiv_04_candidates.png" },
      { path: "/jobs", name: "qualiv_05_jobs.png" },
      { path: "/assessments", name: "qualiv_06_assessments.png" },
      { path: "/interviews", name: "qualiv_07_interviews.png" },
      { path: "/analytics", name: "qualiv_08_analytics.png" }
    ];

    for (const r of qualivRoutes) {
      try {
        await page.goto(`https://app.qualiv.id${r.path}`, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(1500);
        await redactSensitiveText(page);
        await page.screenshot({ path: path.join(OUT_DIR, r.name) });
        console.log(`Saved ${r.name}`);
      } catch (err) {
        console.log(`Qualiv route ${r.path} failed:`, err.message);
      }
    }
  } catch (e) {
    console.error("Qualiv platform flow error:", e.message);
  }

  // ═══════════════════════════════════════════════════════════
  // 4. NUSAEVO ERP (APP.NUSAEVO.COM)
  // ═══════════════════════════════════════════════════════════
  console.log("=== 4. NUSAEVO ERP ===");
  try {
    await page.goto("https://app.nusaevo.com/login", { waitUntil: "networkidle", timeout: 25000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(OUT_DIR, "nusaevo_01_login.png") });

    const emailEl = await page.$('input[name="email"], input[type="email"]');
    const passEl = await page.$('input[name="password"], input[type="password"]');
    if (emailEl && passEl) {
      await emailEl.fill("admin@nusaevo.com");
      await passEl.fill("password");
      const submit = await page.$('button[type="submit"], button:has-text("Login"), button:has-text("Masuk")');
      if (submit) await submit.click();
      await page.waitForTimeout(3000);
    }
    console.log("NusaEvo current URL:", page.url());
    await redactSensitiveText(page);
    await page.screenshot({ path: path.join(OUT_DIR, "nusaevo_02_dashboard.png") });
    console.log("Saved nusaevo_02_dashboard.png");

    const nusaRoutes = [
      { path: "/inventory/products", name: "nusaevo_03_inventory_products.png" },
      { path: "/sales/orders", name: "nusaevo_04_sales_orders.png" },
      { path: "/sales/quotations", name: "nusaevo_05_quotations.png" },
      { path: "/crm/customers", name: "nusaevo_06_crm_customers.png" },
      { path: "/purchasing/orders", name: "nusaevo_07_purchasing.png" }
    ];

    for (const r of nusaRoutes) {
      try {
        await page.goto(`https://app.nusaevo.com${r.path}`, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(1500);
        await redactSensitiveText(page);
        await page.screenshot({ path: path.join(OUT_DIR, r.name) });
        console.log(`Saved ${r.name}`);
      } catch (err) {
        console.log(`NusaEvo route ${r.path} failed:`, err.message);
      }
    }
  } catch (e) {
    console.error("NusaEvo ERP flow error:", e.message);
  }

  await browser.close();
  console.log("=== ALL CAPTURES COMPLETED! ===");
}

run();
