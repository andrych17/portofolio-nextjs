import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";

async function testDashboardRoutes() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Login
  await page.goto("http://localhost:3008/login");
  await page.fill('input[type="email"]', "hr@demo.qualiv.local");
  await page.fill('input[type="password"]', "12345678");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);

  const routes = [
    "/dashboard",
    "/dashboard/jobs",
    "/dashboard/jobs/new",
    "/dashboard/kandidat",
    "/dashboard/interview",
    "/dashboard/interview/calendar",
    "/dashboard/assessment/logictest",
    "/dashboard/assessment/disc",
    "/dashboard/ai-monitor",
    "/dashboard/queue-monitor",
    "/dashboard/shortlist",
    "/dashboard/questions",
    "/dashboard/billing",
    "/dashboard/plans",
    "/dashboard/audit-log",
    "/dashboard/pengaturan",
    "/dashboard/playground"
  ];

  for (const r of routes) {
    await page.goto("http://localhost:3008" + r, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    const body = await page.innerText("body");
    const is404 = body.includes("404") || body.includes("Halaman tidak ditemukan") || body.includes("could not be found") || body.includes("Link tidak valid");
    const heading = (await page.innerText("h1, h2, .font-semibold, .text-xl")).substring(0, 80).replace(/\n/g, " ");
    console.log(`Route: ${r.padEnd(35)} -> 404/Error: ${is404} | Heading: ${heading}`);
  }

  await browser.close();
}

testDashboardRoutes();
