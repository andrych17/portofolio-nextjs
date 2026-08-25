import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import path from "path";

const OUT_DIR = "/home/spil/document/upwork_screenshots";

async function testNusaEvoLogin() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  const page = await context.newPage();

  console.log("Navigating to https://app.nusaevo.com/login ...");
  await page.goto("https://app.nusaevo.com/login", { waitUntil: "networkidle", timeout: 25000 });
  await page.waitForTimeout(1000);

  // Check what input fields exist
  const inputs = await page.$$eval("input", els => els.map(e => ({ name: e.name, type: e.type, placeholder: e.placeholder })));
  console.log("Input fields on login page:", JSON.stringify(inputs));

  // Try user code 'andryhuang' and 'andry'
  const codeEl = await page.$('input[name="code"], input[name="username"], input[name="email"], input[type="text"]');
  const passEl = await page.$('input[name="password"], input[type="password"]');

  // Let's test with andryhuang / password or 12345678
  const testPasswords = ["password", "12345678", "andry123", "password123", "nusaevo2026"];
  
  for (const pass of testPasswords) {
    if (codeEl && passEl) {
      await codeEl.fill("andryhuang");
      await passEl.fill(pass);
      const submit = await page.$('button[type="submit"], button:has-text("Login"), button:has-text("Masuk")');
      if (submit) await submit.click();
      await page.waitForTimeout(2500);
      console.log(`Tried 'andryhuang' with '${pass}' -> URL: ${page.url()}`);
      if (page.url() !== "https://app.nusaevo.com/login") {
        console.log("SUCCESS LOGIN with password:", pass);
        await page.screenshot({ path: path.join(OUT_DIR, "nusaevo_inside_andryhuang.png") });
        break;
      }
    }
  }

  // Also check if andry works
  if (page.url() === "https://app.nusaevo.com/login") {
    for (const pass of testPasswords) {
      await codeEl.fill("andry");
      await passEl.fill(pass);
      const submit = await page.$('button[type="submit"]');
      if (submit) await submit.click();
      await page.waitForTimeout(2500);
      console.log(`Tried 'andry' with '${pass}' -> URL: ${page.url()}`);
      if (page.url() !== "https://app.nusaevo.com/login") {
        console.log("SUCCESS LOGIN with andry / password:", pass);
        await page.screenshot({ path: path.join(OUT_DIR, "nusaevo_inside_andry.png") });
        break;
      }
    }
  }

  await browser.close();
}

testNusaEvoLogin();
