import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import path from "path";

const OUT_DIR = "/home/spil/document/upwork_screenshots";

const ID_TO_EN = [
  [/\bPenjualan\b/gi, "Sales Invoices"],
  [/\bPenawaran\b/gi, "Quotations"],
  [/\bTindak Lanjut\b/gi, "Follow-ups"],
  [/\bPelanggan\b/gi, "Customers"],
  [/\bPengguna\b/gi, "Users"],
  [/\bHub Sales\b/gi, "Sales Hub"],
  [/\bKatalog\b/gi, "Catalogue"],
  [/\bKeluar\b/gi, "Logout"],
  [/\bMasuk\b/gi, "Sign In"],
  [/\bSimpan\b/gi, "Save"],
  [/\bTambah\b/gi, "Add New"]
];

const SENSITIVE_PATTERNS = [
  /\+?62[\s-]?8[\d\s-]{8,13}/g,
  /\b0?8\d{2}[\s-]?\d{3,4}[\s-]?\d{3,5}\b/g,
  /[\w.+-]+@[\w-]+\.[\w.-]+/g,
  /\bRp\.?\s?[\d][\d.,]{3,}\b/gi,
  /\b\d{16}\b/g,
  /\b\d{10,15}\b/g,
];

async function captureNagamasbanAdminEN() {
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

  const applyEN = async () => {
    await page.evaluate(({ translations, sensitivePatterns }) => {
      const patterns = sensitivePatterns.map((p) => new RegExp(p.source, p.flags));
      const dict = translations.map(([re, rep]) => [new RegExp(re.source, re.flags), rep]);
      const blurEl = (el) => { el.style.filter = "blur(5px)"; el.style.userSelect = "none"; };

      document.querySelectorAll("td, .table-cell").forEach(cell => {
        if (patterns.some(p => p.test(cell.innerText || ""))) blurEl(cell);
      });

      const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          let text = node.textContent || "";
          if (patterns.some((re) => re.test(text))) {
            const parent = node.parentElement;
            if (parent && !parent.closest("button") && !parent.closest("nav") && !parent.closest("header") && !parent.closest("th")) {
              blurEl(parent);
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
      translations: ID_TO_EN.map(([re, rep]) => [{ source: re.source, flags: re.flags }, rep]),
      sensitivePatterns: SENSITIVE_PATTERNS.map((p) => ({ source: p.source, flags: p.flags }))
    });
  };

  try {
    await page.goto("https://katalog.nagamasban.com", { waitUntil: "networkidle", timeout: 20000 });
    // Click login button in navbar if exists
    const loginLink = await page.$('a[href*="login"], button:has-text("Masuk"), button:has-text("Login")');
    if (loginLink) await loginLink.click();
    await page.waitForTimeout(1000);

    const nikInput = await page.$('input[name="nik"], input[name="username"], input[type="text"]');
    const passInput = await page.$('input[name="password"], input[type="password"]');
    if (nikInput && passInput) {
      await nikInput.fill("1");
      await passInput.fill("12345678");
      const submitBtn = await page.$('button[type="submit"]');
      if (submitBtn) await submitBtn.click();
      await page.waitForTimeout(2500);
    }

    const routes = [
      { path: "/admin/sales", name: "nagamasban_04_sales_hub_en.png" },
      { path: "/admin/sales/quotations", name: "nagamasban_05_quotations_en.png" },
      { path: "/admin/sales/follow-ups", name: "nagamasban_06_followups_en.png" },
      { path: "/admin/sales/customers", name: "nagamasban_07_customers_en.png" },
      { path: "/admin/sales/penjualan", name: "nagamasban_08_sales_invoices_en.png" }
    ];

    for (const r of routes) {
      try {
        await page.goto(`https://katalog.nagamasban.com${r.path}`, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(1500);
        await applyEN();
        await page.screenshot({ path: path.join(OUT_DIR, r.name) });
        console.log(`Saved ${r.name}`);
      } catch (_) {}
    }
  } catch (e) {
    console.error("Nagamasban Admin error:", e.message);
  }

  await browser.close();
}

captureNagamasbanAdminEN();
