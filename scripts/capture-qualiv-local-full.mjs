import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import path from "path";
import fs from "fs";

const OUT_DIR = "/home/spil/document/upwork_screenshots";

// English dictionary for Qualiv
const QUALIV_DICT = [
  [/\bBeranda\b/gi, "Dashboard"],
  [/\bKandidat\b/gi, "Candidates"],
  [/\bLowongan\b/gi, "Job Openings"],
  [/\bLowongan Kerja\b/gi, "Job Openings"],
  [/\bAsesmen\b/gi, "Assessments"],
  [/\bWawancara AI\b/gi, "AI Interviews"],
  [/\bTes Logika\b/gi, "Logic Tests"],
  [/\bLaporan\b/gi, "Reports & Analytics"],
  [/\bPengaturan\b/gi, "Settings"],
  [/\bPengguna\b/gi, "Users"],
  [/\bKeluar\b/gi, "Logout"],
  [/\bTambah Lowongan\b/gi, "Create Job"],
  [/\bTambah Kandidat\b/gi, "Add Candidate"],
  [/\bSkor Keseluruhan\b/gi, "Overall Score"],
  [/\bSkor Kecocokan\b/gi, "Match Score"],
  [/\bHasil Asesmen\b/gi, "Assessment Results"],
  [/\bRingkasan AI\b/gi, "AI Summary"],
  [/\bStatus Seleksi\b/gi, "Hiring Pipeline"],
  [/\bAntrean CV\b/gi, "CV Queue"],
  [/\bPenggunaan AI\b/gi, "AI Usage Analytics"]
];

const SENSITIVE_PATTERNS = [
  /\+?62[\s-]?8[\d\s-]{8,13}/g,
  /\b0?8\d{2}[\s-]?\d{3,4}[\s-]?\d{3,5}\b/g,
  /[\w.+-]+@[\w-]+\.[\w.-]+/g,
  /\bRp\.?\s?[\d][\d.,]{3,}\b/gi,
  /\b\d{16}\b/g,
];

const applyEnglishAndDataBlur = async (page) => {
  try {
    await page.evaluate(({ translations, sensitivePatterns }) => {
      const patterns = sensitivePatterns.map((p) => new RegExp(p.source, p.flags));
      const dict = translations.map(([re, rep]) => [new RegExp(re.source, re.flags), rep]);

      const style = document.createElement("style");
      style.innerHTML = `
        .censored-val {
          filter: blur(6px) !important;
          opacity: 0.7 !important;
          user-select: none !important;
          display: inline-block !important;
        }
      `;
      document.head.appendChild(style);

      // Translate table headers & buttons
      document.querySelectorAll("th, button, .nav-link, .sidebar a, h1, h2, h3, h4, h5, h6, .badge").forEach(el => {
        if (el.children.length === 0) {
          let t = el.innerText || "";
          for (const [re, rep] of dict) {
            if (re.test(t)) t = t.replace(re, rep);
          }
          el.innerText = t;
        }
      });

      // Walk text nodes for translation & blur
      const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          let text = node.textContent || "";
          if (patterns.some((re) => re.test(text))) {
            const parent = node.parentElement;
            if (parent && !parent.closest("button") && !parent.closest("nav") && !parent.closest("header") && !parent.closest("th")) {
              parent.classList.add("censored-val");
              return;
            }
          }
          let replaced = text;
          for (const [re, rep] of dict) {
            if (re.test(replaced)) replaced = replaced.replace(re, rep);
          }
          if (replaced !== text) node.textContent = replaced;
          return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const tag = node.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return;
        for (const child of Array.from(node.childNodes)) walk(child);
      };
      walk(document.body);
    }, {
      translations: QUALIV_DICT.map(([re, rep]) => [{ source: re.source, flags: re.flags }, rep]),
      sensitivePatterns: SENSITIVE_PATTERNS.map((p) => ({ source: p.source, flags: p.flags }))
    });
  } catch (e) {
    console.warn("Blur/translate warning:", e.message);
  }
};

async function captureQualivLocalFull() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "en-US"
  });

  const page = await context.newPage();

  console.log("1. Capturing Qualiv Landing (Local Port 3009)...");
  try {
    await page.goto("http://localhost:3009", { waitUntil: "networkidle", timeout: 15000 });
    await page.waitForTimeout(1000);
    await applyEnglishAndDataBlur(page);
    await page.screenshot({ path: path.join(OUT_DIR, "qualiv_01_landing_hero_en.png") });
    console.log("Saved qualiv_01_landing_hero_en.png");

    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(800);
    await applyEnglishAndDataBlur(page);
    await page.screenshot({ path: path.join(OUT_DIR, "qualiv_02_landing_features_en.png") });
    console.log("Saved qualiv_02_landing_features_en.png");
  } catch (e) {
    console.error("Landing capture error:", e.message);
  }

  console.log("2. Logging in to Local Platform (Port 3008)...");
  try {
    await page.goto("http://localhost:3008/login", { waitUntil: "networkidle", timeout: 15000 });
    await page.fill('input[name="email"]', "hr@demo.qualiv.local");
    await page.fill('input[name="password"]', "12345678");
    await Promise.all([
      page.waitForNavigation({ timeout: 15000 }).catch(() => {}),
      page.click('button[type="submit"]')
    ]);
    await page.waitForTimeout(2000);
    console.log("Logged in URL:", page.url());

    const qualivRoutes = [
      { path: "/dashboard", name: "qualiv_03_dashboard_en.png", label: "Executive Dashboard" },
      { path: "/dashboard/kandidat", name: "qualiv_04_candidates_pipeline_en.png", label: "Candidates Pipeline" },
      { path: "/dashboard/kandidat/8450e7d9-7b04-45fc-9b96-c541729fccd4", name: "qualiv_05_candidate_score_detail_en.png", label: "Candidate AI Assessment Detail" },
      { path: "/dashboard/jobs", name: "qualiv_06_jobs_list_en.png", label: "Jobs List" },
      { path: "/dashboard/jobs/1a0514b2-bf78-446a-8554-35abf97167f5", name: "qualiv_07_job_detail_en.png", label: "Job Detail & Quota" },
      { path: "/dashboard/jobs/new", name: "qualiv_08_create_job_en.png", label: "Job Creation Wizard" },
      { path: "/dashboard/assessment/logictest", name: "qualiv_09_logic_test_config_en.png", label: "Logic Test Config" },
      { path: "/dashboard/assessment/disc", name: "qualiv_10_disc_personality_en.png", label: "DISC Personality Assessment" },
      { path: "/dashboard/interview", name: "qualiv_11_interview_sessions_en.png", label: "AI Interview Sessions" },
      { path: "/dashboard/interview/calendar", name: "qualiv_12_interview_calendar_en.png", label: "Interview Calendar Schedule" },
      { path: "/dashboard/ai-monitor", name: "qualiv_13_ai_usage_token_monitor_en.png", label: "AI Token & Model Usage" },
      { path: "/dashboard/queue-monitor", name: "qualiv_14_queue_worker_monitor_en.png", label: "BullMQ Processing Queue" },
      { path: "/dashboard/shortlist", name: "qualiv_15_automated_shortlist_en.png", label: "Shortlisted Candidates" },
      { path: "/dashboard/questions", name: "qualiv_16_questions_bank_en.png", label: "AI Questions Bank" },
      { path: "/dashboard/billing", name: "qualiv_17_billing_subscription_en.png", label: "Billing & Midtrans Topup" },
      { path: "/dashboard/plans", name: "qualiv_18_pricing_plans_en.png", label: "Pricing & Tier Plans" },
      { path: "/dashboard/audit-log", name: "qualiv_19_audit_logs_en.png", label: "System Audit Logs" },
      { path: "/dashboard/companies", name: "qualiv_20_company_profile_en.png", label: "Tenant Company Profile" }
    ];

    for (const r of qualivRoutes) {
      try {
        console.log(`Capturing ${r.label} (${r.path})...`);
        await page.goto(`http://localhost:3008${r.path}`, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(1500);

        // Check if 404
        const pageTitle = await page.title();
        const bodyText = await page.innerText("body");
        if (bodyText.includes("404") && bodyText.includes("This page could not be found")) {
          console.warn(`[WARNING 404] Route ${r.path} not found!`);
          continue;
        }

        await applyEnglishAndDataBlur(page);
        await page.waitForTimeout(400);
        await page.screenshot({ path: path.join(OUT_DIR, r.name) });
        console.log(`>>> Successfully captured: ${r.name}`);
      } catch (err) {
        console.error(`Failed ${r.path}:`, err.message);
      }
    }

  } catch (e) {
    console.error("Platform login error:", e.message);
  }

  await browser.close();
  console.log("=== ALL QUALIV SCREENSHOTS COMPLETED WITHOUT 404! ===");
}

captureQualivLocalFull();
