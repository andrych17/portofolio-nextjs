import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";

async function inspectNavbar() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("Logging in with andryhuang...");
  await page.goto("https://app.nusaevo.com/login", { waitUntil: "domcontentloaded" });
  await page.fill('#username', "andryhuang");
  await page.fill('#password', "password123");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  console.log("Logged in URL:", page.url());

  const links = await page.evaluate(() => {
    const allLinks = Array.from(document.querySelectorAll("a")).map(a => ({
      href: a.href,
      text: a.innerText.trim(),
      className: a.className
    }));
    return allLinks.filter(l => l.text.length > 0 || l.href.includes("Jewel") || l.href.includes("Retail") || l.href.includes("Tire"));
  });

  console.log("Found links / menus:", JSON.stringify(links, null, 2));

  await browser.close();
}

inspectNavbar();
