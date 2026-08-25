import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const OUT_DIR = "/home/spil/document/upwork_screenshots";

// Blur sensitive numbers, rupiah amounts, names, phones, etc.
const redactSensitiveData = async (page) => {
  try {
    await page.evaluate(() => {
      const patterns = [
        /\+?62[\s-]?8[\d\s-]{8,13}/g,
        /\b0?8\d{2}[\s-]?\d{3,4}[\s-]?\d{3,5}\b/g,
        /[\w.+-]+@[\w-]+\.[\w.-]+/g,
        /\bRp\.?\s?[\d][\d.,]{3,}\b/gi,
        /\b\d{16}\b/g,
        /\b\d{10,15}\b/g,
        /\b\d{4,9}\b/g // numbers / quantities / prices in table cells
      ];

      const blurEl = (el) => {
        el.style.filter = "blur(5px)";
        el.style.userSelect = "none";
      };

      // Target table cells with numbers/amounts specifically
      const cells = document.querySelectorAll("td, .table-cell, [role='cell']");
      cells.forEach((cell) => {
        const text = cell.innerText || "";
        if (/\d/.test(text) || patterns.some(p => p.test(text))) {
          blurEl(cell);
        }
      });

      // Walk text nodes for other elements
      const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || "";
          if (patterns.some((re) => re.test(text))) {
            const parent = node.parentElement;
            if (parent && !parent.closest("button") && !parent.closest("nav") && !parent.closest("header") && !parent.closest("th")) {
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
    });
  } catch (e) {
    console.warn("Redact error:", e.message);
  }
};

async function captureNusaEvoFull() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  const page = await context.newPage();

  console.log("=== CAPTURING APP.NUSAEVO.COM (Logged in) ===");
  try {
    await page.goto("https://app.nusaevo.com/login", { waitUntil: "networkidle", timeout: 20000 });
    await page.fill('input[name="code"]', "knc2");
    await page.fill('input[name="password"]', "password123");
    await Promise.all([
      page.waitForNavigation({ timeout: 15000 }).catch(() => {}),
      page.click('button[type="submit"]')
    ]);
    await page.waitForTimeout(2000);

    console.log("Logged in URL:", page.url());
    await redactSensitiveData(page);
    await page.screenshot({ path: path.join(OUT_DIR, "nusaevo_02_retail_home.png") });
    console.log("Saved nusaevo_02_retail_home.png");

    // Discover links in navbar / menu
    const menuLinks = await page.$$eval('a[href]', (els) => 
      els.map(e => ({ href: e.href, text: e.innerText.trim() }))
         .filter(e => e.href.includes("app.nusaevo.com") && !e.href.includes("logout") && e.text.length > 1)
    );
    console.log("Discovered menu links:", JSON.stringify(menuLinks));

    // Capture each unique section
    const visited = new Set();
    let idx = 3;
    for (const item of menuLinks) {
      if (visited.has(item.href) || visited.size > 8) continue;
      visited.add(item.href);
      try {
        console.log(`Navigating to ${item.text} (${item.href})...`);
        await page.goto(item.href, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(1500);
        await redactSensitiveData(page);
        const slug = item.text.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase().slice(0, 20);
        const outName = `nusaevo_${String(idx).padStart(2, "0")}_${slug}.png`;
        await page.screenshot({ path: path.join(OUT_DIR, outName) });
        console.log(`Saved ${outName}`);
        idx++;
      } catch (err) {
        console.log(`Failed navigating to ${item.href}:`, err.message);
      }
    }
  } catch (e) {
    console.error("app.nusaevo.com capture error:", e.message);
  }

  // Also check erp.nusaevo.com
  console.log("=== CAPTURING ERP.NUSAEVO.COM ===");
  try {
    await page.goto("https://erp.nusaevo.com/login", { waitUntil: "networkidle", timeout: 15000 }).catch(() => {});
    const emailEl = await page.$('input[name="email"], input[type="email"]');
    const passEl = await page.$('input[name="password"], input[type="password"]');
    if (emailEl && passEl) {
      await emailEl.fill("admin@nusaevo.com");
      await passEl.fill("password");
      const submit = await page.$('button[type="submit"]');
      if (submit) await submit.click();
      await page.waitForTimeout(2500);
      console.log("erp.nusaevo.com logged in URL:", page.url());
      if (!page.url().includes("/login")) {
        await redactSensitiveData(page);
        await page.screenshot({ path: path.join(OUT_DIR, "nusaevo_erp_modular_dashboard.png") });
        console.log("Saved nusaevo_erp_modular_dashboard.png");
      }
    }
  } catch (e) {
    console.error("erp.nusaevo.com error:", e.message);
  }

  await browser.close();
  console.log("=== NUSAEVO RE-SCREENSHOT COMPLETED! ===");
}

captureNusaEvoFull();
