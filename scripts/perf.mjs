import { chromium } from "playwright-core";
const b = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const c = await b.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 2,
});
const p = await c.newPage();
let bytes = 0;
const byType = {};
p.on("response", async (r) => {
  try {
    const len = Number(r.headers()["content-length"] || 0);
    bytes += len;
    const t = r.request().resourceType();
    byType[t] = (byType[t] || 0) + len;
  } catch {}
});
await p.goto(process.env.BASE || "http://localhost:3000/", { waitUntil: "load" });
const t0 = Date.now();
await p.waitForLoadState("networkidle");
const metrics = await p.evaluate(() => {
  const nav = performance.getEntriesByType("navigation")[0];
  const paint = performance
    .getEntriesByType("paint")
    .map((e) => `${e.name}=${Math.round(e.startTime)}`);
  return {
    ttfb: Math.round(nav?.responseStart || 0),
    domContentLoaded: Math.round(nav?.domContentLoadedEventEnd || 0),
    load: Math.round(nav?.loadEventEnd || 0),
    paint: paint.join(" "),
    scripts: document.querySelectorAll("script").length,
    js: performance
      .getEntriesByType("resource")
      .filter((e) => e.name.endsWith(".js") || e.name.includes("_next/static"))
      .reduce((s, e) => s + (e.transferSize || 0), 0),
  };
});
// scroll the whole page to force image loads, then report weight
await p.evaluate(async () => {
  document.documentElement.style.scrollBehavior = "auto";
  for (let y = 0; y < document.body.scrollHeight; y += 600) {
    scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
});
await p.waitForTimeout(2500);
console.log(
  JSON.stringify(
    {
      ...metrics,
      totalBytesKB: Math.round(bytes / 1024),
      jsKB: Math.round(metrics.js / 1024),
      byTypeKB: Object.fromEntries(
        Object.entries(byType).map(([k, v]) => [k, Math.round(v / 1024)])
      ),
      idleMs: Date.now() - t0,
    },
    null,
    1
  )
);
await b.close();
