import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const TARGET_DIR = "/home/spil/Downloads/upwork_portfolio/12_andryhuang_portfolio_ai_chatbot";
const PUBLIC_PROJECTS = "/home/spil/projects/personal/portofolio-nextjs/public/projects";
const DOC_SCREENSHOTS = "/home/spil/document/upwork_screenshots";

fs.mkdirSync(TARGET_DIR, { recursive: true });

async function captureAndryHuangPortfolio() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "en-US"
  });

  const page = await context.newPage();

  console.log("Navigating to http://localhost:3020 ...");
  await page.goto("http://localhost:3020", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Ensure English mode is active
  try {
    const enBtn = await page.$('button:has-text("EN")');
    if (enBtn) {
      await enBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {
    console.log("Language toggle not needed:", e.message);
  }

  // 1. Capture Hero Section
  console.log("Capturing Hero & Profile...");
  const heroPath = path.join(TARGET_DIR, "andryhuang_01_portfolio_hero_en.png");
  await page.screenshot({ path: heroPath });
  fs.copyFileSync(heroPath, path.join(PUBLIC_PROJECTS, "andryhuang_01_portfolio_hero_en.png"));
  fs.copyFileSync(heroPath, path.join(DOC_SCREENSHOTS, "andryhuang_01_portfolio_hero_en.png"));
  console.log(">>> Saved: andryhuang_01_portfolio_hero_en.png");

  // 2. Open AI Chatbot
  console.log("Opening AI Chatbot widget...");
  const chatTrigger = await page.$('button[aria-label="Open AI Assistant"]') || await page.$('button:has(svg.lucide-bot)');
  if (chatTrigger) {
    await chatTrigger.click();
    await page.waitForTimeout(1500);

    // Capture Chatbot open initial state
    const chatOpenPath = path.join(TARGET_DIR, "andryhuang_02_ai_assistant_chatbot_en.png");
    await page.screenshot({ path: chatOpenPath });
    fs.copyFileSync(chatOpenPath, path.join(PUBLIC_PROJECTS, "andryhuang_02_ai_assistant_chatbot_en.png"));
    fs.copyFileSync(chatOpenPath, path.join(DOC_SCREENSHOTS, "andryhuang_02_ai_assistant_chatbot_en.png"));
    console.log(">>> Saved: andryhuang_02_ai_assistant_chatbot_en.png");

    // Click a quick prompt chip
    const promptChip = await page.$('button:has-text("Who is Andry")') || await page.$('button:has-text("Siapa itu Andry")') || await page.$('button:has-text("Tech Stack")');
    if (promptChip) {
      console.log("Clicking quick prompt chip...");
      await promptChip.click();
      await page.waitForTimeout(4000); // wait for AI reply
    } else {
      // Type a message
      const input = await page.$('input[placeholder*="Ask"], input[placeholder*="Tanya"], textarea');
      if (input) {
        await input.fill("What is Andry Huang's core technical stack and experience in AI systems?");
        await page.keyboard.press("Enter");
        await page.waitForTimeout(4000);
      }
    }

    // Capture interactive dialogue
    const chatDialoguePath = path.join(TARGET_DIR, "andryhuang_03_ai_chatbot_interactive_dialogue_en.png");
    await page.screenshot({ path: chatDialoguePath });
    fs.copyFileSync(chatDialoguePath, path.join(PUBLIC_PROJECTS, "andryhuang_03_ai_chatbot_interactive_dialogue_en.png"));
    fs.copyFileSync(chatDialoguePath, path.join(DOC_SCREENSHOTS, "andryhuang_03_ai_chatbot_interactive_dialogue_en.png"));
    console.log(">>> Saved: andryhuang_03_ai_chatbot_interactive_dialogue_en.png");

    // Close chatbot
    const closeBtn = await page.$('button:has(svg.lucide-x)');
    if (closeBtn) await closeBtn.click();
    await page.waitForTimeout(1000);
  }

  // 4. Scroll to Projects Matrix
  console.log("Scrolling to Projects Matrix...");
  const projectsSec = await page.$('#projects') || await page.$('section:has-text("Selected Projects")') || await page.$('section:has-text("Karya")');
  if (projectsSec) {
    await projectsSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const projPath = path.join(TARGET_DIR, "andryhuang_04_featured_projects_gallery_en.png");
    await page.screenshot({ path: projPath });
    fs.copyFileSync(projPath, path.join(PUBLIC_PROJECTS, "andryhuang_04_featured_projects_gallery_en.png"));
    fs.copyFileSync(projPath, path.join(DOC_SCREENSHOTS, "andryhuang_04_featured_projects_gallery_en.png"));
    console.log(">>> Saved: andryhuang_04_featured_projects_gallery_en.png");
  }

  // 5. Scroll to Skills & Architecture
  console.log("Scrolling to Skills & Architecture...");
  const skillsSec = await page.$('#skills') || await page.$('section:has-text("Technical Skills")') || await page.$('section:has-text("Keahlian")');
  if (skillsSec) {
    await skillsSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const skillsPath = path.join(TARGET_DIR, "andryhuang_05_technical_skills_architecture_en.png");
    await page.screenshot({ path: skillsPath });
    fs.copyFileSync(skillsPath, path.join(PUBLIC_PROJECTS, "andryhuang_05_technical_skills_architecture_en.png"));
    fs.copyFileSync(skillsPath, path.join(DOC_SCREENSHOTS, "andryhuang_05_technical_skills_architecture_en.png"));
    console.log(">>> Saved: andryhuang_05_technical_skills_architecture_en.png");
  }

  await browser.close();
  console.log("=== ANDRYHUANG PORTFOLIO & AI CHATBOT CAPTURE COMPLETE! ===");
}

captureAndryHuangPortfolio();
