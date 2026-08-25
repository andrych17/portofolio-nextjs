import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";

async function testClickDropdown() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("1. Logging in with andryhuang...");
  await page.goto("https://app.nusaevo.com/login", { waitUntil: "domcontentloaded" });
  await page.fill('#username', "andryhuang");
  await page.fill('#password', "password123");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  console.log("Logged in URL:", page.url());

  // Click app dropdown button
  console.log("Clicking app dropdown button...");
  await page.click('.app-dropdown-container button, .app-dropdown-container [data-bs-toggle="dropdown"], .app-dropdown-container');
  await page.waitForTimeout(1000);

  // Click Wijaya Mas option
  console.log("Clicking Wijaya Mas option...");
  await page.click('text="Wijaya Mas"');
  await page.waitForTimeout(3000);
  console.log("URL after switching to Wijaya Mas:", page.url());

  // Check Master Material
  console.log("Navigating to TrdJewel1/Master/Material...");
  await page.goto("https://app.nusaevo.com/TrdJewel1/Master/Material", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  console.log("Material URL:", page.url());
  console.log("Material Title:", await page.title());
  const materialBody = (await page.innerText("body")).substring(0, 400);
  console.log("Material Body snippet:\n", materialBody);

  await browser.close();
}

testClickDropdown();
