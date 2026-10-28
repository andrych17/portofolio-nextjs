// Checks that every way of reaching /#contact ends with the Contact section at the top of the viewport,
// not partway through the Works track.
// Usage: node scripts/test-hash-scroll.mjs [baseUrl]   (default http://localhost:3000)
// Set CHROMIUM_PATH if Playwright's bundled browser is not installed.
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const viewports = [
  { width: 1440, height: 900 },
  { width: 1366, height: 768 },
  { width: 1920, height: 1080 },
  { width: 390, height: 844 },
];

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
let failed = 0;

const check = async (page, label) => {
  await page.waitForTimeout(3000);
  const s = await page.evaluate(() => ({
    path: location.pathname + location.hash,
    scrollY: Math.round(scrollY),
    contactTop: Math.round(document.getElementById("contact").getBoundingClientRect().top),
  }));
  const ok = s.path === "/#contact" && Math.abs(s.contactTop) <= 2;
  if (!ok) failed++;
  console.log(`${ok ? "ok  " : "FAIL"} ${label.padEnd(40)} ${JSON.stringify(s)}`);
};

for (const viewport of viewports) {
  const page = await (await browser.newContext({ viewport })).newPage();
  const size = `${viewport.width}x${viewport.height}`;

  // First visit: the loader plays, then the hash is honoured.
  await page.goto(base + "/#contact", { waitUntil: "networkidle" });
  await page.waitForTimeout(5000);
  await check(page, `${size} first visit`);

  // Returning visit: the loader is skipped and the jump fires right after mount. A full load is needed;
  // goto("/#contact") from "/" would only be a same-document hash change.
  await page.goto("about:blank");
  await page.goto(base + "/#contact", { waitUntil: "networkidle" });
  await check(page, `${size} returning visit`);

  // From another page, through the header link (the menu on small screens, where the bar has no links).
  await page.goto(base + "/portofolio", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const quick = page.locator('header a[href="/#contact"]').first();
  if (await quick.isVisible()) await quick.click();
  else {
    await page.locator('button[aria-controls="v2-menu"]').click();
    await page.locator('#v2-menu a[href="/#contact"]').click();
  }
  await page.waitForURL("**/#contact");
  await page.waitForLoadState("networkidle");
  await check(page, `${size} archive -> Contact`);

  await page.context().close();
}

await browser.close();
console.log(failed ? `${failed} check(s) failed` : "all checks passed");
process.exit(failed ? 1 : 0);
