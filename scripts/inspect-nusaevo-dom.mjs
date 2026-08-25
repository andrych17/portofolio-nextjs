import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";

async function inspectNusaEvoDOM() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto("https://app.nusaevo.com/login", { waitUntil: "networkidle" });
  await page.fill('input[name="code"]', "knc2");
  await page.fill('input[name="password"]', "password123");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2500);

  await page.goto("https://app.nusaevo.com/TrdRetail1/Master/Partner", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  const tableInfo = await page.evaluate(() => {
    const tables = document.querySelectorAll("table");
    const trs = document.querySelectorAll("tbody tr");
    const tds = document.querySelectorAll("tbody td");
    const samples = Array.from(tds).slice(0, 10).map(t => ({
      tagName: t.tagName,
      className: t.className,
      text: t.innerText,
      parentTag: t.parentElement ? t.parentElement.tagName : null,
      children: Array.from(t.children).map(c => c.tagName + "." + c.className)
    }));
    return { tableCount: tables.length, trCount: trs.length, tdCount: tds.length, samples };
  });

  console.log("Partner Table DOM Info:", JSON.stringify(tableInfo, null, 2));
  await browser.close();
}

inspectNusaEvoDOM();
