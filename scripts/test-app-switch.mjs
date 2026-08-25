import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";

async function testAppSwitch() {
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

  // Check select or dropdown in navbar
  const selects = await page.evaluate(() => {
    const selects = Array.from(document.querySelectorAll("select, .dropdown, [wire\\:id]")).map(el => ({
      tagName: el.tagName,
      id: el.id,
      className: el.className,
      text: el.innerText.trim(),
      options: el.tagName === "SELECT" ? Array.from(el.options).map(o => ({ value: o.value, text: o.text })) : null
    }));
    return selects;
  });

  console.log("Selects/Dropdowns:", JSON.stringify(selects, null, 2));

  // Try selecting Wijaya Mas (TrdJewel1) in select
  const hasSelect = await page.$('select');
  if (hasSelect) {
    console.log("Found select! Selecting TrdJewel1...");
    await page.selectOption('select', 'TrdJewel1');
    await page.waitForTimeout(3000);
    console.log("URL after select:", page.url());
  }

  // Check TrdJewel1/Master/Material
  console.log("Going to TrdJewel1/Master/Material...");
  await page.goto("https://app.nusaevo.com/TrdJewel1/Master/Material", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  console.log("Material URL:", page.url());
  console.log("Material Title:", await page.title());
  console.log("Material Body snippet:", (await page.innerText("body")).substring(0, 300));

  await browser.close();
}

testAppSwitch();
