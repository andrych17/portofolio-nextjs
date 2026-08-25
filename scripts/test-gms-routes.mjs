import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";

async function testGmsRoutes() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Login to GMS
  await page.goto("https://gms.connectgroup.id/login");
  await page.fill('input[type="email"], input[name="email"]', "admin@connectgroup.id");
  await page.fill('input[type="password"], input[name="password"]', "password123");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  const routes = [
    "/admin",
    "/admin/houses",
    "/admin/requests",
    "/admin/contracts",
    "/admin/surveyors",
    "/portal",
    "/portal/requests",
    "/portal/houses"
  ];

  for (const r of routes) {
    await page.goto("https://gms.connectgroup.id" + r);
    await page.waitForTimeout(1500);
    const title = await page.title();
    const body = (await page.innerText("body")).substring(0, 150);
    const is404 = body.includes("404") || title.includes("404") || body.includes("Not Found");
    console.log(`Route: ${r} -> 404: ${is404} | Title: ${title}`);
  }

  await browser.close();
}

testGmsRoutes();
