import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import path from "path";

const OUT_DIR = "/home/spil/document/upwork_screenshots";

async function testTireAndJewel() {
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

  console.log("Logging into NusaEvo as andryhuang...");
  await page.goto("https://app.nusaevo.com/login", { waitUntil: "networkidle", timeout: 20000 });
  await page.fill('input[name="code"]', "andryhuang");
  await page.fill('input[name="password"]', "password123");
  await Promise.all([
    page.waitForNavigation({ timeout: 15000 }).catch(() => {}),
    page.click('button[type="submit"]')
  ]);
  await page.waitForTimeout(2000);
  console.log("Logged in url:", page.url());

  // Check TrdTire1 routes
  const tireRoutes = [
    { url: "https://app.nusaevo.com/TrdTire1/Home", name: "tire_01_dashboard_en.png" },
    { url: "https://app.nusaevo.com/TrdTire1/Master/Material", name: "tire_02_inventory_specs_en.png" },
    { url: "https://app.nusaevo.com/TrdTire1/Master/Partner", name: "tire_03_dealers_suppliers_en.png" },
    { url: "https://app.nusaevo.com/TrdTire1/Transaction/SalesOrder", name: "tire_04_sales_wholesale_en.png" },
    { url: "https://app.nusaevo.com/TrdTire1/Transaction/PurchaseOrder", name: "tire_05_purchase_orders_en.png" }
  ];

  // Check TrdJewel1 routes
  const jewelRoutes = [
    { url: "https://app.nusaevo.com/TrdJewel1/Home", name: "jewel_01_dashboard_en.png" },
    { url: "https://app.nusaevo.com/TrdJewel1/Master/Material", name: "jewel_02_gold_inventory_rfid_en.png" },
    { url: "https://app.nusaevo.com/TrdJewel1/Master/Partner", name: "jewel_03_customers_vip_en.png" },
    { url: "https://app.nusaevo.com/TrdJewel1/Transaction/SalesOrder", name: "jewel_04_sales_invoices_en.png" }
  ];

  for (const r of [...tireRoutes, ...jewelRoutes]) {
    try {
      console.log(`Checking ${r.url}...`);
      await page.goto(r.url, { waitUntil: "networkidle", timeout: 15000 });
      await page.waitForTimeout(1500);
      console.log(`Loaded ${r.url}, title: ${await page.title()}`);
    } catch (e) {
      console.error(`Error loading ${r.url}:`, e.message);
    }
  }

  await browser.close();
}

testTireAndJewel();
