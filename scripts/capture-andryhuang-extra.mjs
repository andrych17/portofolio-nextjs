import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const TARGET_DIR = "/home/spil/Downloads/upwork_portfolio/12_andryhuang_portfolio_ai_chatbot";
const PUBLIC_PROJECTS = "/home/spil/projects/personal/portofolio-nextjs/public/projects";
const DOC_SCREENSHOTS = "/home/spil/document/upwork_screenshots";

async function captureProjectsAndContact() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "en-US"
  });

  const page = await context.newPage();
  await page.goto("http://localhost:3020", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Scroll to projects
  await page.evaluate(() => {
    window.scrollTo(0, 1100);
  });
  await page.waitForTimeout(1000);
  const projPath = path.join(TARGET_DIR, "andryhuang_04_featured_projects_showcase_en.png");
  await page.screenshot({ path: projPath });
  fs.copyFileSync(projPath, path.join(PUBLIC_PROJECTS, "andryhuang_04_featured_projects_showcase_en.png"));
  fs.copyFileSync(projPath, path.join(DOC_SCREENSHOTS, "andryhuang_04_featured_projects_showcase_en.png"));
  console.log(">>> Saved: andryhuang_04_featured_projects_showcase_en.png");

  // Scroll to contact
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(1000);
  const contactPath = path.join(TARGET_DIR, "andryhuang_06_contact_collaboration_en.png");
  await page.screenshot({ path: contactPath });
  fs.copyFileSync(contactPath, path.join(PUBLIC_PROJECTS, "andryhuang_06_contact_collaboration_en.png"));
  fs.copyFileSync(contactPath, path.join(DOC_SCREENSHOTS, "andryhuang_06_contact_collaboration_en.png"));
  console.log(">>> Saved: andryhuang_06_contact_collaboration_en.png");

  await browser.close();
}

captureProjectsAndContact();
