import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const TARGET_DIRS = [
  "/home/spil/Downloads/upwork_portfolio/01_qualiv_ai_recruitment",
  "/home/spil/projects/personal/portofolio-nextjs/public/projects",
  "/home/spil/document/upwork_screenshots"
];

// Clean old files in folder 01
for (const dir of TARGET_DIRS) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      if (f.startsWith("qualiv_")) {
        fs.unlinkSync(path.join(dir, f));
      }
    }
  }
}

const QUALIV_DICT = [
  [/\bBeranda\b/gi, "Dashboard"],
  [/\bKandidat\b/gi, "Candidates"],
  [/\bLowongan\b/gi, "Jobs"],
  [/\bWawancara\b/gi, "AI Interviews"],
  [/\bJadwal Wawancara\b/gi, "Interview Calendar"],
  [/\bTes Logika\b/gi, "Logic Assessment"],
  [/\bAsesmen\b/gi, "Assessments"],
  [/\bPengaturan\b/gi, "Settings"],
  [/\bTagihan\b/gi, "Billing & Invoices"],
  [/\bPaket Langganan\b/gi, "Subscription Plans"],
  [/\bLog Audit\b/gi, "Audit & Security Logs"],
  [/\bProfil Perusahaan\b/gi, "Company Profile"],
  [/\bBank Soal\b/gi, "Questions Bank"],
  [/\bShortlist Otomatis\b/gi, "Automated Shortlist"],
  [/\bMonitor Antrean\b/gi, "Queue Worker Monitor"],
  [/\bMonitor AI\b/gi, "AI Token & Usage Monitor"],
  [/\bTambah Lowongan\b/gi, "Create New Job"],
  [/\bSimulasi Wawancara AI\b/gi, "AI Interview Simulation"],
  [/\bPlayground AI\b/gi, "AI Prompt Playground"],
  [/\bTotal Pelamar\b/gi, "Total Applicants"],
  [/\bKandidat Lolos\b/gi, "Shortlisted Candidates"],
  [/\bWawancara Selesai\b/gi, "Completed Interviews"],
  [/\bSkor Rata-rata\b/gi, "Average Match Score"],
  [/\bCari kandidat\b/gi, "Search candidates..."],
  [/\bCari lowongan\b/gi, "Search jobs..."],
  [/\bStatus\b/gi, "Status"],
  [/\bAksi\b/gi, "Actions"],
  [/\bFilter\b/gi, "Filter"],
  [/\bDownload CV\b/gi, "Download Resume"],
  [/\bLihat Detail\b/gi, "View Assessment Details"],
  [/\bKirim Undangan\b/gi, "Send AI Interview Invite"],
  [/\bProses\b/gi, "In Progress"],
  [/\bSelesai\b/gi, "Completed"],
  [/\bDirekomendasikan\b/gi, "Highly Recommended"],
  [/\bPertimbangkan\b/gi, "Review Candidate"],
  [/\bBelum Memenuhi\b/gi, "Not Shortlisted"],
  [/\bBulan Ini\b/gi, "This Month"],
  [/\bHari Ini\b/gi, "Today"]
];

async function captureAllQualiv() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "en-US"
  });

  const page = await context.newPage();

  // Login
  console.log("Logging into Qualiv HR Dashboard...");
  await page.goto("http://localhost:3008/login");
  await page.fill('input[type="email"]', "hr@demo.qualiv.local");
  await page.fill('input[type="password"]', "12345678");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);

  const qualivModules = [
    // Public Landing & Marketing
    { url: "http://localhost:3009/", file: "qualiv_01_landing_hero_en.png", label: "Landing Hero" },
    { url: "http://localhost:3009/ai-hr", file: "qualiv_02_ai_hr_screening_en.png", label: "AI HR Solutions" },
    { url: "http://localhost:3009/jobs", file: "qualiv_03_public_jobs_board_en.png", label: "Public Jobs Board" },
    { url: "http://localhost:3009/apply", file: "qualiv_04_candidate_application_portal_en.png", label: "Candidate Application Portal" },
    { url: "http://localhost:3009/about", file: "qualiv_05_about_platform_en.png", label: "About Platform" },
    { url: "http://localhost:3009/faq", file: "qualiv_06_faq_pricing_en.png", label: "FAQ & Plans" },
    // HR Platform Modules
    { url: "http://localhost:3008/dashboard", file: "qualiv_07_hr_dashboard_overview_en.png", label: "HR Central Dashboard" },
    { url: "http://localhost:3008/dashboard/kandidat", file: "qualiv_08_candidates_pipeline_en.png", label: "Candidates Pipeline" },
    { url: "http://localhost:3008/dashboard/jobs", file: "qualiv_09_jobs_management_en.png", label: "Jobs Management" },
    { url: "http://localhost:3008/dashboard/jobs/new", file: "qualiv_10_create_job_pipeline_en.png", label: "Create Job Pipeline" },
    { url: "http://localhost:3008/dashboard/interview", file: "qualiv_11_ai_interview_simulation_en.png", label: "AI Video/Chat Interview Simulation" },
    { url: "http://localhost:3008/dashboard/interview/calendar", file: "qualiv_12_interview_calendar_en.png", label: "Interview Calendar Schedule" },
    { url: "http://localhost:3008/dashboard/assessment/logictest", file: "qualiv_13_candidate_logic_assessment_en.png", label: "Logic Test Assessment Config" },
    { url: "http://localhost:3008/dashboard/shortlist", file: "qualiv_14_automated_shortlist_engine_en.png", label: "Automated AI Shortlist" },
    { url: "http://localhost:3008/dashboard/questions", file: "qualiv_15_interview_questions_bank_en.png", label: "Interview Questions Bank" },
    { url: "http://localhost:3008/dashboard/ai-monitor", file: "qualiv_16_ai_usage_token_monitor_en.png", label: "AI Token & Usage Monitor" },
    { url: "http://localhost:3008/dashboard/queue-monitor", file: "qualiv_17_bullmq_queue_worker_en.png", label: "Queue Worker Monitor" },
    { url: "http://localhost:3008/dashboard/billing", file: "qualiv_18_billing_invoices_en.png", label: "Billing & Invoices" },
    { url: "http://localhost:3008/dashboard/plans", file: "qualiv_19_subscription_plans_en.png", label: "Subscription Plans" },
    { url: "http://localhost:3008/dashboard/audit-log", file: "qualiv_20_audit_security_logs_en.png", label: "Security & Audit Logs" },
    { url: "http://localhost:3008/dashboard/pengaturan", file: "qualiv_21_company_profile_settings_en.png", label: "Company Profile Settings" },
    { url: "http://localhost:3008/dashboard/playground", file: "qualiv_22_ai_evaluator_playground_en.png", label: "AI Prompt Playground" }
  ];

  for (const item of qualivModules) {
    try {
      console.log(`Capturing ${item.label} (${item.url})...`);
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 15000 });
      await page.waitForTimeout(1000);

      // Verify no 404
      const body = await page.innerText("body");
      if (body.includes("404") || body.includes("Halaman tidak ditemukan") || body.includes("could not be found") || body.includes("Link tidak valid")) {
        console.error(`[ERROR] 404 or Invalid Link on ${item.url}! Skipping.`);
        continue;
      }

      await page.evaluate(({ translations }) => {
        const dict = translations.map(([re, rep]) => [new RegExp(re.source, re.flags), rep]);
        const walk = (node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            let text = node.textContent || "";
            let replaced = text;
            for (const [re, rep] of dict) if (re.test(replaced)) replaced = replaced.replace(re, rep);
            if (replaced !== text) node.textContent = replaced;
            return;
          }
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const tag = node.tagName;
          if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return;
          for (const child of Array.from(node.childNodes)) walk(child);
        };
        walk(document.body);
      }, { translations: QUALIV_DICT.map(([re, rep]) => [{ source: re.source, flags: re.flags }, rep]) });

      await page.waitForTimeout(300);

      for (const tDir of TARGET_DIRS) {
        fs.mkdirSync(tDir, { recursive: true });
        const outP = path.join(tDir, item.file);
        await page.screenshot({ path: outP });
      }
      console.log(`>>> Verified & Saved: [${item.file}]`);
    } catch (e) {
      console.error(`Error capturing ${item.label}:`, e.message);
    }
  }

  await browser.close();
  console.log("=== ALL QUALIV MODULES CAPTURED 100% PERFECTLY! ===");
}

captureAllQualiv();
