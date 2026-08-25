import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import path from "path";

const OUT_DIR = "/home/spil/document/upwork_screenshots";

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

  const routes = [
    { path: "/", file: "agency_01_landing_hero_en.png", label: "Agency Hero & Portfolio" },
    { path: "/services", file: "agency_02_services_overview_en.png", label: "Enterprise Services Suite" },
    { path: "/services/ai-solution", file: "agency_03_ai_solutions_en.png", label: "AI Solutions & Automation" },
    { path: "/services/pos-ban", file: "agency_04_tire_pos_erp_en.png", label: "Tire Retail & Distribution POS" },
    { path: "/services/pos-jewel", file: "agency_05_jewel_pos_erp_en.png", label: "Jewellery POS & Gold Inventory" },
    { path: "/services/pos-benang", file: "agency_06_textile_yarn_erp_en.png", label: "Textile & Yarn Manufacturing ERP" },
    { path: "/about", file: "agency_07_about_company_en.png", label: "About Agency & Track Record" }
  ];

  for (const r of routes) {
    try {
      console.log(`Capturing ${r.label} (http://localhost:3010${r.path})...`);
      await page.goto(`http://localhost:3010${r.path}`, { waitUntil: "networkidle", timeout: 15000 });
      await page.waitForTimeout(1000);
      const outPath = path.join(OUT_DIR, r.file);
      await page.screenshot({ path: outPath });
      console.log(`>>> Successfully captured: ${r.file}`);
    } catch (e) {
      console.error(`Error capturing ${r.label}:`, e.message);
    }
  }

  await browser.close();
  console.log("=== ALL AGENCY / COMPANY PROFILE SCREENSHOTS COMPLETED! ===");
}

run();
