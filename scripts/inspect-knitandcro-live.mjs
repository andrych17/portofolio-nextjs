import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";

async function inspectKnitAndCroLive() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log("Navigating to https://knitandcro.com ...");
    await page.goto("https://knitandcro.com", { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(3000);
    const title = await page.title();
    console.log("Page title:", title);
    const url = page.url();
    console.log("Current URL:", url);
  } catch (e) {
    console.error("Error connecting to knitandcro.com:", e.message);
  }

  await browser.close();
}

inspectKnitAndCroLive();
