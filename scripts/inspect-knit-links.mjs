import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";

async function inspectLinks() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://knitandcro.com", { waitUntil: "networkidle" });

  const links = await page.$$eval("a", els => els.map(e => ({ text: e.innerText.trim(), href: e.href })));
  console.log("=== KNITANDCRO.COM LINKS ===");
  links.filter(l => l.href.includes("knitandcro.com")).forEach(l => {
    if (l.text) console.log(`- ${l.text} -> ${l.href}`);
  });

  await browser.close();
}

inspectLinks();
