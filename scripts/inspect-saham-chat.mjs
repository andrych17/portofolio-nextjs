import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";

async function inspectChat() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("http://localhost:3005/chat", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const bodyText = await page.innerText("body");
  console.log("=== CHAT PAGE BODY TEXT ===");
  console.log(bodyText);

  await browser.close();
}

inspectChat();
