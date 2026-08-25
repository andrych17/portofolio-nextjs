import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";

async function debugLogin() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("Navigating to login...");
  await page.goto("https://app.nusaevo.com/login", { waitUntil: "networkidle" });
  await page.fill('input[name="code"]', "andryhuang");
  await page.fill('input[name="password"]', "password123");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  console.log("Current URL after submit:", page.url());

  const cookies = await context.cookies();
  console.log("Cookies:", cookies.map(c => ({ name: c.name, value: c.value.substring(0, 15) })));

  // Try to go to TrdJewel1/Home
  console.log("Going to TrdJewel1/Home...");
  const response = await page.goto("https://app.nusaevo.com/TrdJewel1/Home", { waitUntil: "networkidle" });
  console.log("Response status:", response ? response.status() : "null");
  console.log("Final URL:", page.url());
  console.log("Title:", await page.title());
  console.log("Body text snippet:", (await page.innerText("body")).substring(0, 300));

  await browser.close();
}

debugLogin();
