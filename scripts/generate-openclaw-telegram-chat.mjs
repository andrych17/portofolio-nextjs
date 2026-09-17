import { chromium } from "/home/spil/projects/personal/portofolio-nextjs/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const TARGET_DIR = "/home/spil/Downloads/upwork_portfolio/13_openclaw_ai_vps_security_agent";
const PUBLIC_PROJECTS = "/home/spil/projects/personal/portofolio-nextjs/public/projects";
const DOC_SCREENSHOTS = "/home/spil/document/upwork_screenshots";

fs.mkdirSync(TARGET_DIR, { recursive: true });

const TELEGRAM_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Telegram Web - OpenClaw Ops Agent</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
    body {
      font-family: 'Inter', sans-serif;
      background-color: #0e1621;
      color: #f5f5f5;
    }
    .mono {
      font-family: 'JetBrains Mono', monospace;
    }
    .telegram-bg {
      background-color: #0e1621;
      background-image: radial-gradient(#17212b 1px, transparent 1px);
      background-size: 20px 20px;
    }
    .msg-bot {
      background-color: #182533;
      border: 1px solid #242f3d;
    }
    .msg-user {
      background-color: #2b5278;
    }
    .btn-tg {
      background-color: #242f3d;
      border: 1px solid #2b5278;
      transition: all 0.2s;
    }
    .btn-tg:hover {
      background-color: #2b5278;
    }
  </style>
</head>
<body class="h-screen w-screen flex flex-col bg-[#0e1621] text-gray-100 overflow-hidden">
  
  <!-- Header Bar -->
  <div class="h-16 bg-[#17212b] border-b border-[#242f3d] flex items-center justify-between px-6 z-10 shadow-md">
    <div class="flex items-center gap-4">
      <div class="relative">
        <div class="w-11 h-11 rounded-full bg-gradient-to-tr from-lime-600 to-emerald-500 flex items-center justify-center text-2xl shadow-lg border border-lime-400/30">
          🦞
        </div>
        <div class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#17212b]"></div>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-base text-white tracking-wide">OpenClaw • AI VPS Security Agent</span>
          <span class="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">BOT</span>
          <span class="text-xs text-blue-400">✓</span>
        </div>
        <div class="text-xs text-emerald-400 font-medium">● 24/7 Server Shield & AI Log Anomaly Monitor</div>
      </div>
    </div>
    <div class="flex items-center gap-4 text-gray-400 text-sm">
      <div class="flex items-center gap-2 bg-[#242f3d]/60 px-3 py-1.5 rounded-lg border border-[#242f3d]">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="mono text-xs text-gray-300">vps-node-01 (198.51.100.24)</span>
      </div>
      <div class="w-9 h-9 rounded-full bg-[#242f3d] flex items-center justify-center text-gray-300 hover:text-white cursor-pointer">
        🔍
      </div>
      <div class="w-9 h-9 rounded-full bg-[#242f3d] flex items-center justify-center text-gray-300 hover:text-white cursor-pointer">
        ⋮
      </div>
    </div>
  </div>

  <!-- Chat Content -->
  <div class="flex-1 telegram-bg overflow-y-auto px-6 py-6 flex flex-col gap-5 max-w-5xl mx-auto w-full">

    <!-- Date Divider -->
    <div class="flex justify-center">
      <span class="bg-[#17212b]/80 border border-[#242f3d] px-3.5 py-1 rounded-full text-xs text-gray-400 font-medium shadow-sm">
        Today, August 25, 2026
      </span>
    </div>

    <!-- User Command -->
    <div class="flex justify-end">
      <div class="msg-user text-white px-4 py-2.5 rounded-2xl rounded-tr-sm shadow-md max-w-md">
        <p class="text-sm font-medium">/status</p>
        <span class="block text-[10px] text-blue-200/80 text-right mt-1">19:14 · Read ✓✓</span>
      </div>
    </div>

    <!-- Bot Response: System Health Report -->
    <div class="flex justify-start">
      <div class="msg-bot text-gray-200 p-4 rounded-2xl rounded-tl-sm shadow-lg max-w-2xl w-full">
        <div class="flex items-center justify-between border-b border-gray-700/60 pb-2.5 mb-3">
          <div class="flex items-center gap-2">
            <span class="text-lg">🦞</span>
            <span class="font-bold text-sm text-lime-400 tracking-wide uppercase">OpenClaw System Health Report</span>
          </div>
          <span class="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">ALL SYSTEMS NOMINAL</span>
        </div>

        <div class="grid grid-cols-2 gap-3 mb-3 text-xs">
          <div class="bg-[#0e1621]/80 p-2.5 rounded-lg border border-gray-800">
            <div class="text-gray-400 mb-1">Host & Uptime</div>
            <div class="mono font-semibold text-gray-200">vps-node-01 (42 days up)</div>
            <div class="text-gray-400 text-[10px] mt-0.5">Ubuntu 24.04 LTS (Kernel 6.8.0)</div>
          </div>
          <div class="bg-[#0e1621]/80 p-2.5 rounded-lg border border-gray-800">
            <div class="text-gray-400 mb-1">CPU Load & Cores</div>
            <div class="mono font-semibold text-emerald-400">14.2% <span class="text-gray-400 font-normal">(4 vCPU Cloud Cluster)</span></div>
            <div class="w-full bg-gray-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div class="bg-emerald-500 h-full w-[14.2%]"></div>
            </div>
          </div>
          <div class="bg-[#0e1621]/80 p-2.5 rounded-lg border border-gray-800">
            <div class="text-gray-400 mb-1">RAM Utilization</div>
            <div class="mono font-semibold text-sky-400">3.8 GB / 16.0 GB <span class="text-gray-400 font-normal">(23.7%)</span></div>
            <div class="w-full bg-gray-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div class="bg-sky-500 h-full w-[23.7%]"></div>
            </div>
          </div>
          <div class="bg-[#0e1621]/80 p-2.5 rounded-lg border border-gray-800">
            <div class="text-gray-400 mb-1">NVMe Disk Storage</div>
            <div class="mono font-semibold text-amber-400">42.1 GB / 200 GB <span class="text-gray-400 font-normal">(21.0%)</span></div>
            <div class="w-full bg-gray-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div class="bg-amber-500 h-full w-[21.0%]"></div>
            </div>
          </div>
        </div>

        <div class="bg-[#0e1621]/60 p-2.5 rounded-lg border border-gray-800 mb-3">
          <div class="text-xs font-semibold text-gray-300 mb-1.5 flex items-center justify-between">
            <span>🐳 Active Docker Services (12/12 Running)</span>
            <span class="text-[10px] text-emerald-400 mono">0 Restarts</span>
          </div>
          <div class="grid grid-cols-3 gap-1.5 text-[11px] mono text-gray-300">
            <div class="flex items-center gap-1.5">🟢 <span>app-backend</span></div>
            <div class="flex items-center gap-1.5">🟢 <span>web-frontend</span></div>
            <div class="flex items-center gap-1.5">🟢 <span>queue-worker</span></div>
            <div class="flex items-center gap-1.5">🟢 <span>postgres-16</span></div>
            <div class="flex items-center gap-1.5">🟢 <span>redis-cluster</span></div>
            <div class="flex items-center gap-1.5">🟢 <span>traefik-ssl</span></div>
          </div>
        </div>

        <!-- Inline Buttons -->
        <div class="grid grid-cols-2 gap-2 mt-2">
          <button class="btn-tg py-2 px-3 rounded-lg text-xs font-semibold text-gray-200 flex items-center justify-center gap-1.5">
            🔄 Refresh Status
          </button>
          <button class="btn-tg py-2 px-3 rounded-lg text-xs font-semibold text-gray-200 flex items-center justify-center gap-1.5">
            📜 View Live Logs
          </button>
        </div>
        <span class="block text-[10px] text-gray-500 text-right mt-2">19:14</span>
      </div>
    </div>

    <!-- Security Incident Alert Message -->
    <div class="flex justify-start">
      <div class="msg-bot text-gray-200 p-4 rounded-2xl rounded-tl-sm shadow-lg max-w-2xl w-full border-l-4 border-l-rose-500">
        <div class="flex items-center justify-between border-b border-gray-700/60 pb-2.5 mb-3">
          <div class="flex items-center gap-2">
            <span class="text-lg">🚨</span>
            <span class="font-bold text-sm text-rose-400 tracking-wide uppercase">Security Threat Blocked (SSH Brute Force)</span>
          </div>
          <span class="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-semibold border border-rose-500/30">MITIGATED</span>
        </div>

        <div class="space-y-2 text-xs mb-3">
          <div class="flex items-start gap-2">
            <span class="text-gray-400 min-w-28 font-medium">Attacker IP:</span>
            <span class="mono text-rose-300 font-bold bg-rose-950/40 px-2 py-0.5 rounded border border-rose-800/40">203.0.113.88 (ASN Dummy Botnet)</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-gray-400 min-w-28 font-medium">Target Port:</span>
            <span class="mono text-gray-200">Port 22 (SSH OpenSSH_8.9p1)</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-gray-400 min-w-28 font-medium">Attack Pattern:</span>
            <span class="mono text-gray-200">84 invalid user auth attempts within 45s (admin, root, test)</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-gray-400 min-w-28 font-medium">Action Taken:</span>
            <span class="text-emerald-400 font-semibold">🛡️ IP banned for 72 hours via fail2ban iptables chain</span>
          </div>
        </div>

        <!-- AI Anomaly Diagnosis Box -->
        <div class="bg-[#0e1621] p-3 rounded-xl border border-indigo-500/30 mb-3">
          <div class="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1.5">
            <span>🧠</span>
            <span>OpenClaw AI Diagnosis (LLM Log Analyzer)</span>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed">
            "Automated credential-stuffing botnet identified. Attack vector is completely isolated from application ports (443/80). Public key authentication remains enforced. Zero breach risk."
          </p>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <button class="btn-tg py-2 px-3 rounded-lg text-xs font-semibold text-rose-300 flex items-center justify-center gap-1.5">
            🚫 Permanent IP Ban
          </button>
          <button class="btn-tg py-2 px-3 rounded-lg text-xs font-semibold text-gray-200 flex items-center justify-center gap-1.5">
            📊 View Security Audit
          </button>
        </div>
        <span class="block text-[10px] text-gray-500 text-right mt-2">19:28</span>
      </div>
    </div>

    <!-- Daily AI Ops Summary Message -->
    <div class="flex justify-start">
      <div class="msg-bot text-gray-200 p-4 rounded-2xl rounded-tl-sm shadow-lg max-w-2xl w-full">
        <div class="flex items-center justify-between border-b border-gray-700/60 pb-2.5 mb-3">
          <div class="flex items-center gap-2">
            <span class="text-lg">🤖</span>
            <span class="font-bold text-sm text-lime-400 tracking-wide uppercase">AI Daily Ops & Anomaly Summary</span>
          </div>
          <span class="text-xs text-gray-400 mono">19:40 UTC+7</span>
        </div>

        <p class="text-xs text-gray-300 leading-relaxed mb-3">
          ✅ <strong>24,850 Syslog Lines Processed</strong>: Analyzed via GPT-4o Mini with zero unhandled runtime crashes.<br>
          ✅ <strong>Database Backups</strong>: Automated pg_dump completed and synced to Cloudflare R2 (842 MB).<br>
          ✅ <strong>SSL Certificates</strong>: Auto-renewed for <code class="mono text-lime-300">production-node.internal</code> (valid for 89 days).
        </p>

        <div class="flex items-center gap-2 text-[11px] text-gray-400 mono bg-[#0e1621]/60 px-3 py-1.5 rounded-lg border border-gray-800">
          <span>⚡ API Response P95: <strong class="text-emerald-400">42ms</strong></span>
          <span>•</span>
          <span>🛡️ Firewall Drops: <strong class="text-gray-200">142 IPs</strong></span>
          <span>•</span>
          <span>💰 AI Ops Cost: <strong class="text-lime-400">$0.0042</strong></span>
        </div>

        <span class="block text-[10px] text-gray-500 text-right mt-2">19:40</span>
      </div>
    </div>

  </div>

  <!-- Bottom Input Bar -->
  <div class="h-16 bg-[#17212b] border-t border-[#242f3d] flex items-center gap-3 px-6 z-10 max-w-5xl mx-auto w-full">
    <button class="text-gray-400 hover:text-white text-xl">📎</button>
    <div class="flex-1 bg-[#242f3d] rounded-xl px-4 py-2 text-sm text-gray-200 placeholder-gray-500 flex items-center justify-between border border-gray-700/50">
      <span class="text-gray-400">Write a command (/status, /tail, /restart)...</span>
      <span class="text-gray-400 text-lg">😊</span>
    </div>
    <button class="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
      ✈️
    </button>
  </div>

</body>
</html>
`;

async function generateTelegramScreenshots() {
  console.log("Generating 100% Mock & Dummy IP Telegram for OpenClaw...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 950 },
    deviceScaleFactor: 2,
    locale: "en-US"
  });

  const page = await context.newPage();
  await page.setContent(TELEGRAM_HTML, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // 1. Capture Full Telegram Overview
  const fullPath = path.join(TARGET_DIR, "openclaw_01_telegram_ops_alerts_en.png");
  await page.screenshot({ path: fullPath });
  fs.copyFileSync(fullPath, path.join(PUBLIC_PROJECTS, "openclaw_01_telegram_ops_alerts_en.png"));
  fs.copyFileSync(fullPath, path.join(PUBLIC_PROJECTS, "openclaw.png"));
  fs.copyFileSync(fullPath, path.join(DOC_SCREENSHOTS, "openclaw_01_telegram_ops_alerts_en.png"));
  console.log(">>> Saved: openclaw_01_telegram_ops_alerts_en.png");

  // 2. Capture Security Alert Zoom
  const secPath = path.join(TARGET_DIR, "openclaw_02_telegram_security_incident_en.png");
  await page.screenshot({ path: secPath });
  fs.copyFileSync(secPath, path.join(PUBLIC_PROJECTS, "openclaw_02_telegram_security_incident_en.png"));
  fs.copyFileSync(secPath, path.join(DOC_SCREENSHOTS, "openclaw_02_telegram_security_incident_en.png"));
  console.log(">>> Saved: openclaw_02_telegram_security_incident_en.png");

  // 3. Capture AI Daily Summary Zoom
  const aiPath = path.join(TARGET_DIR, "openclaw_03_telegram_ai_daily_summary_en.png");
  await page.screenshot({ path: aiPath });
  fs.copyFileSync(aiPath, path.join(PUBLIC_PROJECTS, "openclaw_03_telegram_ai_daily_summary_en.png"));
  fs.copyFileSync(aiPath, path.join(DOC_SCREENSHOTS, "openclaw_03_telegram_ai_daily_summary_en.png"));
  console.log(">>> Saved: openclaw_03_telegram_ai_daily_summary_en.png");

  await browser.close();
  console.log("=== OPENCLAW RE-GENERATED WITH 100% SANITIZED DUMMY DATA! ===");
}

generateTelegramScreenshots();
