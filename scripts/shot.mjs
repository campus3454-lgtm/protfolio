import { chromium } from "playwright-core";

const [width = "1440", height = "900", ids = "top", url = "http://localhost:3001/"] =
  process.argv.slice(2);
const exe = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await chromium.launch({ executablePath: exe });
const ctx = await browser.newContext({
  viewport: { width: +width, height: +height },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
await page.addInitScript(
  (theme) => localStorage.setItem("mh-theme", theme),
  process.env.THEME || "dark"
);
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(2600);

for (const id of ids.split(",")) {
  if (id !== "top") {
    await page.evaluate((i) => {
      document.documentElement.style.scrollBehavior = "auto";
      const el = document.getElementById(i);
      if (i === "end") {
        scrollTo(0, document.documentElement.scrollHeight);
        return;
      }
      if (el) scrollTo(0, el.offsetTop - 90);
    }, id);
  }
  await page.waitForTimeout(1900);
  await page.screenshot({ path: `scripts/.audit/w${width}-${id}.png` });
}

const metrics = await page.evaluate(() => {
  const img = document.querySelector('img[src*="portraits"]');
  const r = img?.getBoundingClientRect();
  const hero = document.getElementById("home");
  return {
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    heroHeight: Math.round(hero?.getBoundingClientRect().height || 0),
    photo: r
      ? { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), natural: `${img.naturalWidth}x${img.naturalHeight}` }
      : null,
    h1: document.querySelectorAll("h1").length,
  };
});
console.log(JSON.stringify(metrics));
console.log("console errors:", errors.length ? errors : "none");
await browser.close();
