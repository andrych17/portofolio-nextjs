import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import path from "path";

const OUT_DIR = "/home/spil/document/upwork_screenshots";

async function testBlurNusaEvo() {
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

  await page.goto("https://app.nusaevo.com/login", { waitUntil: "networkidle" });
  await page.fill('input[name="code"]', "knc2");
  await page.fill('input[name="password"]', "password123");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2500);

  await page.goto("https://app.nusaevo.com/TrdRetail1/Master/Partner", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  // Apply strict censorship and English translation
  await page.evaluate(() => {
    // 1. Inject CSS for bulletproof blurring
    const style = document.createElement("style");
    style.innerHTML = `
      .censored-data {
        filter: blur(7px) !important;
        opacity: 0.7 !important;
        user-select: none !important;
        display: inline-block !important;
      }
    `;
    document.head.appendChild(style);

    // 2. English translation mapping
    const dict = [
      [/\bMitra\b/gi, "Partners & Vendors"],
      [/\bPelanggan\b/gi, "Customer"],
      [/\bPemasok\b/gi, "Supplier"],
      [/\bTambah Mitra\b/gi, "Add Partner"],
      [/\bSemua Tipe\b/gi, "All Types"],
      [/\bCari\b/gi, "Search"],
      [/\bReset\b/gi, "Reset"],
      [/\bAksi\b/gi, "Actions"],
      [/\bStatus\b/gi, "Status"],
      [/\bKode\b/gi, "Code"],
      [/\bTipe\b/gi, "Type"],
      [/\bNama\b/gi, "Name"],
      [/\bAlamat\b/gi, "Address"],
      [/\bTelepon\b/gi, "Phone"],
      [/\bEmail\b/gi, "Email"],
      [/\bDibuat\b/gi, "Created At"],
      [/\bBeranda\b/gi, "Dashboard"],
      [/\bPenjualan\b/gi, "Sales"],
      [/\bProduk\b/gi, "Products"],
      [/\bOnline Shop\b/gi, "Online Shop"]
    ];

    // Translate table headers (th)
    document.querySelectorAll("th").forEach(th => {
      let t = th.innerText || "";
      for (const [re, rep] of dict) {
        if (re.test(t)) t = t.replace(re, rep);
      }
      th.innerText = t;
    });

    // Translate menus & navigation
    document.querySelectorAll("nav a, .navbar a, .sidebar a, button, h1, h2, h3, h4, h5, .breadcrumb").forEach(el => {
      if (el.children.length === 0) {
        let t = el.innerText || "";
        for (const [re, rep] of dict) {
          if (re.test(t)) t = t.replace(re, rep);
        }
        el.innerText = t;
      }
    });

    // 3. Censor sensitive table data (Names, Phones, Emails, Addresses)
    // In Partner table, columns index: 2 (Name), 3 (Address), 4 (Phone), 5 (Email)
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach(tr => {
      const tds = tr.querySelectorAll("td");
      tds.forEach((td, idx) => {
        // Exclude Code (0), Type (1), Actions (8), Status/Icons
        const text = td.innerText.trim();
        // If it's a name, phone, email, address, or long text/number
        if (idx === 2 || idx === 3 || idx === 4 || idx === 5 || /\d{6,}/.test(text) || /@/.test(text)) {
          td.innerHTML = `<span class="censored-data">${td.innerHTML}</span>`;
        }
      });
    });
  });

  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT_DIR, "nusaevo_05_vendors_partners_en.png") });
  console.log("Saved test censored nusaevo_05_vendors_partners_en.png");

  await browser.close();
}

testBlurNusaEvo();
