import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

async function scanAllPortfolioRoutes() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log("=== CHECKING ALL QUALIV LOCAL ROUTES (localhost:3008) ===");
  // Login to qualiv
  await page.goto("http://localhost:3008/login");
  await page.fill('input[type="email"]', "hr@demo.qualiv.local");
  await page.fill('input[type="password"]', "12345678");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);

  const qualivRoutes = [
    { file: "qualiv_03_app_dashboard_en.png", url: "http://localhost:3008/dashboard" },
    { file: "qualiv_03_dashboard_en.png", url: "http://localhost:3008/dashboard" },
    { file: "qualiv_04_candidates_pipeline_en.png", url: "http://localhost:3008/candidates" },
    { file: "qualiv_05_candidate_score_detail_en.png", url: "http://localhost:3008/candidates/eval-001" },
    { file: "qualiv_06_jobs_list_en.png", url: "http://localhost:3008/jobs" },
    { file: "qualiv_07_job_detail_en.png", url: "http://localhost:3008/jobs/job-001" },
    { file: "qualiv_08_create_job_en.png", url: "http://localhost:3008/jobs/create" },
    { file: "qualiv_09_logic_test_config_en.png", url: "http://localhost:3008/assessments/logic-test" },
    { file: "qualiv_10_disc_personality_en.png", url: "http://localhost:3008/assessments/disc" },
    { file: "qualiv_11_interview_sessions_en.png", url: "http://localhost:3008/interviews" },
    { file: "qualiv_12_interview_calendar_en.png", url: "http://localhost:3008/interviews/calendar" },
    { file: "qualiv_13_ai_usage_token_monitor_en.png", url: "http://localhost:3008/analytics/tokens" },
    { file: "qualiv_14_queue_worker_monitor_en.png", url: "http://localhost:3008/analytics/queue" },
    { file: "qualiv_15_automated_shortlist_en.png", url: "http://localhost:3008/candidates/shortlist" },
    { file: "qualiv_16_questions_bank_en.png", url: "http://localhost:3008/jobs/questions" },
    { file: "qualiv_17_billing_subscription_en.png", url: "http://localhost:3008/billing" },
    { file: "qualiv_18_pricing_plans_en.png", url: "http://localhost:3008/billing/plans" },
    { file: "qualiv_19_audit_logs_en.png", url: "http://localhost:3008/settings/audit-log" },
    { file: "qualiv_20_company_profile_en.png", url: "http://localhost:3008/settings/company" }
  ];

  const qualiv404s = [];
  for (const item of qualivRoutes) {
    await page.goto(item.url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    const body = await page.innerText("body");
    const is404 = body.includes("404") || body.includes("Halaman tidak ditemukan") || body.includes("could not be found");
    if (is404) {
      console.log(`[QUALIV 404 FOUND] ${item.file} -> ${item.url}`);
      qualiv404s.push(item.file);
    } else {
      console.log(`[QUALIV OK] ${item.file} -> ${item.url}`);
    }
  }

  console.log("\n=== CHECKING NAGAMASBAN ROUTES ===");
  const nagamasbanRoutes = [
    { file: "nagamasban_01_katalog_en.png", url: "https://katalog.nagamasban.com" },
    { file: "nagamasban_04_sales_hub_en.png", url: "https://katalog.nagamasban.com/sales-hub" },
    { file: "nagamasban_05_quotations_en.png", url: "https://katalog.nagamasban.com/quotations" },
    { file: "nagamasban_06_followups_en.png", url: "https://katalog.nagamasban.com/followups" },
    { file: "nagamasban_07_customers_en.png", url: "https://katalog.nagamasban.com/customers" },
    { file: "nagamasban_08_sales_invoices_en.png", url: "https://katalog.nagamasban.com/invoices" }
  ];

  const nagamasban404s = [];
  for (const item of nagamasbanRoutes) {
    try {
      await page.goto(item.url, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(500);
      const body = await page.innerText("body");
      const is404 = body.includes("404") || body.includes("could not be found");
      if (is404) {
        console.log(`[NAGAMASBAN 404 FOUND] ${item.file} -> ${item.url}`);
        nagamasban404s.push(item.file);
      } else {
        console.log(`[NAGAMASBAN OK] ${item.file} -> ${item.url}`);
      }
    } catch (e) {
      console.log(`[NAGAMASBAN ERROR] ${item.file}:`, e.message);
      nagamasban404s.push(item.file);
    }
  }

  await browser.close();
  console.log("\n=== SUMMARY OF 404 FILES TO DELETE ===");
  console.log("Qualiv 404s:", qualiv404s);
  console.log("Nagamasban 404s:", nagamasban404s);
}

scanAllPortfolioRoutes();
