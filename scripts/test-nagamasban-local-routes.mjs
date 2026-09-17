import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";

async function testNagamasbanRoutes() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const routes = [
    "/",
    "/admin/dashboard",
    "/admin/sales/catalogue",
    "/admin/sales/recommendation",
    "/admin/sales/quotations",
    "/admin/sales/customers",
    "/admin/sales/follow-ups",
    "/admin/sales/penjualan"
  ];

  for (const r of routes) {
    try {
      await page.goto("http://localhost:3015" + r, { waitUntil: "domcontentloaded", timeout: 8000 });
      await page.waitForTimeout(500);
      const title = await page.title();
      const body = (await page.innerText("body")).substring(0, 100).replace(/\n/g, " ");
      const is404 = body.includes("404") || body.includes("This page could not be found");
      console.log(`Route: ${r.padEnd(32)} -> 404: ${is404} | Title: ${title} | Body: ${body.substring(0, 50)}`);
    } catch (e) {
      console.log(`Route: ${r.padEnd(32)} -> ERROR: ${e.message}`);
    }
  }

  await browser.close();
}

testNagamasbanRoutes();
