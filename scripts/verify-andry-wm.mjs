import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";

async function verifyLogin() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("Navigating to login...");
  await page.goto("https://app.nusaevo.com/login", { waitUntil: "domcontentloaded" });
  await page.fill('#username', "andryhuang");
  await page.fill('#password', "password123");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  console.log("Logged in URL:", page.url());
  console.log("Title:", await page.title());

  // Check TrdJewel1/Home
  console.log("Going to TrdJewel1/Home...");
  await page.goto("https://app.nusaevo.com/TrdJewel1/Home", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);
  console.log("TrdJewel1 URL:", page.url());
  console.log("TrdJewel1 Title:", await page.title());
  const bodyText = (await page.innerText("body")).substring(0, 300);
  console.log("TrdJewel1 Body:", bodyText);

  await browser.close();
}

verifyLogin();
