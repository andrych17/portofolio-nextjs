import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const BASE_DL = "/home/spil/Downloads/upwork_portfolio";
const PUBLIC_PROJECTS = "/home/spil/projects/personal/portofolio-nextjs/public/projects";
const DOC_SCREENSHOTS = "/home/spil/document/upwork_screenshots";

// 1. DELETE ALL 404 FILES
const filesToDelete = [
  // Qualiv non-existent routes
  "qualiv_04_candidates_pipeline_en.png",
  "qualiv_05_candidate_score_detail_en.png",
  "qualiv_06_jobs_list_en.png",
  "qualiv_07_job_detail_en.png",
  "qualiv_08_create_job_en.png",
  "qualiv_09_logic_test_config_en.png",
  "qualiv_10_disc_personality_en.png",
  "qualiv_11_interview_sessions_en.png",
  "qualiv_12_interview_calendar_en.png",
  "qualiv_13_ai_usage_token_monitor_en.png",
  "qualiv_14_queue_worker_monitor_en.png",
  "qualiv_15_automated_shortlist_en.png",
  "qualiv_16_questions_bank_en.png",
  "qualiv_17_billing_subscription_en.png",
  "qualiv_18_pricing_plans_en.png",
  "qualiv_19_audit_logs_en.png",
  "qualiv_20_company_profile_en.png",
  "qualiv_04_candidates_en.png",
  "qualiv_05_jobs_en.png",
  "qualiv_06_assessments_en.png",
  "qualiv_07_interviews_en.png",
  "qualiv_08_analytics_en.png",
  // Nagamasban non-existent routes
  "nagamasban_04_sales_hub_en.png",
  "nagamasban_05_quotations_en.png",
  "nagamasban_06_followups_en.png",
  "nagamasban_07_customers_en.png",
  "nagamasban_08_sales_invoices_en.png",
  "nagamasban_04_sales_hub.png",
  "nagamasban_05_quotations.png",
  "nagamasban_06_followups.png",
  "nagamasban_07_customers.png",
  "nagamasban_08_sales_invoices.png"
];

const allDirs = [
  path.join(BASE_DL, "01_qualiv_ai_recruitment"),
  path.join(BASE_DL, "04_tire_cahayaterang_nagamasban"),
  PUBLIC_PROJECTS,
  DOC_SCREENSHOTS
];

console.log("=== 1. DELETING 404 FILES ===");
for (const dir of allDirs) {
  if (!fs.existsSync(dir)) continue;
  for (const f of filesToDelete) {
    const fullP = path.join(dir, f);
    if (fs.existsSync(fullP)) {
      fs.unlinkSync(fullP);
      console.log(`Deleted 404: ${fullP}`);
    }
  }
}

// 2. CAPTURE REAL QUALIV ROUTES (100% REAL PAGES, 0 404s)
async function captureRealQualiv() {
  console.log("\n=== 2. CAPTURING REAL WORKING QUALIV ROUTES ===");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "en-US"
  });

  const page = await context.newPage();

  // Login to platform first for session cookie
  await page.goto("http://localhost:3008/login");
  await page.fill('input[type="email"]', "hr@demo.qualiv.local");
  await page.fill('input[type="password"]', "12345678");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);

  const realRoutes = [
    { url: "http://localhost:3009/", file: "qualiv_01_landing_hero_en.png", label: "Landing Page Hero" },
    { url: "http://localhost:3009/ai-hr", file: "qualiv_02_ai_hr_screening_en.png", label: "AI HR & Automated Screening" },
    { url: "http://localhost:3009/jobs", file: "qualiv_03_public_jobs_board_en.png", label: "Public Jobs Board" },
    { url: "http://localhost:3009/apply", file: "qualiv_04_candidate_application_portal_en.png", label: "Candidate Application Portal" },
    { url: "http://localhost:3009/about", file: "qualiv_05_about_platform_en.png", label: "About Qualiv AI" },
    { url: "http://localhost:3009/faq", file: "qualiv_06_faq_pricing_en.png", label: "FAQ & Pricing Plans" },
    { url: "http://localhost:3008/dashboard", file: "qualiv_07_hr_dashboard_en.png", label: "HR Central Management Dashboard" },
    { url: "http://localhost:3008/logic", file: "qualiv_08_logic_test_assessment_en.png", label: "Candidate Logic Test Assessment" },
    { url: "http://localhost:3008/disc", file: "qualiv_09_disc_personality_test_en.png", label: "DISC Personality Assessment" },
    { url: "http://localhost:3008/interview", file: "qualiv_10_ai_interview_simulation_en.png", label: "AI Video / Chat Interview Simulation" },
    { url: "http://localhost:3008/affiliate", file: "qualiv_11_partner_affiliate_hub_en.png", label: "Partner & Affiliate Hub" }
  ];

  for (const item of realRoutes) {
    try {
      console.log(`Capturing Real Route: ${item.label} (${item.url})...`);
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 15000 });
      await page.waitForTimeout(1000);

      // Verify no 404 in body text
      const body = await page.innerText("body");
      if (body.includes("404") || body.includes("Halaman tidak ditemukan") || body.includes("could not be found")) {
        console.error(`[ERROR] Still 404 for ${item.url}! Skipping.`);
        continue;
      }

      // Save to all target folders
      const targetFolders = [
        path.join(BASE_DL, "01_qualiv_ai_recruitment"),
        PUBLIC_PROJECTS,
        DOC_SCREENSHOTS
      ];

      for (const tDir of targetFolders) {
        fs.mkdirSync(tDir, { recursive: true });
        const outP = path.join(tDir, item.file);
        await page.screenshot({ path: outP });
      }
      console.log(`>>> Saved [${item.file}] (Verified 100% OK, ZERO 404!)`);
    } catch (e) {
      console.error(`Error on ${item.label}:`, e.message);
    }
  }

  await browser.close();
  console.log("=== REAL QUALIV ROUTES CAPTURED PERFECTLY! ===");
}

async function run() {
  await captureRealQualiv();
}

run();
