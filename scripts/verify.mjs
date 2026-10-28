import { chromium } from "playwright-core";

const exe = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.env.BASE || "http://localhost:3000/";
const results = [];
const ok = (name, pass, detail = "") =>
  results.push({ name, pass: !!pass, detail: String(detail).slice(0, 220) });

const browser = await chromium.launch({ executablePath: exe });

/* ---------------------------------- desktop */
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  ok("desktop: no console errors", errors.length === 0, errors.join(" | "));
  ok(
    "desktop: no horizontal overflow",
    (await page.evaluate(
      () =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth
    )) === 0
  );
  ok("desktop: exactly one h1", (await page.locator("h1").count()) === 1);

  const badLinks = await page.evaluate(() =>
    [...document.querySelectorAll('a[target="_blank"]')]
      .filter((a) => !/noopener/.test(a.rel))
      .map((a) => a.href)
  );
  ok("desktop: external links use rel=noopener", badLinks.length === 0, badLinks.join(" "));

  const hosts = await page.evaluate(
    () =>
      new Set(
        [...document.querySelectorAll("#projects a[href^='http']")].map(
          (a) => new URL(a.href).host
        )
      ).size
  );
  ok("desktop: archive links distinct live hosts", hosts >= 10, `hosts=${hosts}`);

  // theme toggle + persistence
  const before = await page.evaluate(() => document.documentElement.dataset.theme);
  await page.getByRole("button", { name: /toggle colour theme/i }).click();
  await page.waitForTimeout(400);
  const after = await page.evaluate(() => document.documentElement.dataset.theme);
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  const persisted = await page.evaluate(() => document.documentElement.dataset.theme);
  ok(
    "desktop: theme toggles and persists across reload",
    before === "dark" && after === "light" && persisted === "light",
    `${before} -> ${after} -> ${persisted}`
  );

  // filters
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    localStorage.setItem("mh-theme", "dark");
    scrollTo(0, document.getElementById("projects").offsetTop);
  });
  await page.waitForTimeout(900);
  const ROWS = "#projects a[aria-label^='View ']";
  const counts = [];
  for (const label of [
    "Web Applications",
    "Business Websites",
    "Tools & Platforms",
    "Other Projects",
    "All Projects",
  ]) {
    await page.getByRole("button", { name: new RegExp(`^${label}`, "i") }).click();
    await page.waitForTimeout(650);
    const n = await page.locator(ROWS).count();
    const live = await page.locator("#projects [aria-live]").first().innerText().catch(() => "?");
    counts.push(`${label}=${n}|${live.replace(/\s+/g, " ")}`);
  }
  const filterRows = counts.map((c) => c.split("=")[1].split("|")[0]);
  ok(
    "desktop: filters change the row set",
    filterRows.every((n) => +n > 0) && new Set(filterRows).size > 1,
    counts.join("  ")
  );
  ok(
    "desktop: aria-live announces the count",
    /12 of 12 shown/i.test(counts[4].split("|")[1]),
    counts[4]
  );

  await page.locator(ROWS).first().hover();
  await page.waitForTimeout(600);
  const preview = await page.evaluate(() => {
    const panel = document.querySelector("#projects [data-on]");
    return {
      on: panel?.dataset.on,
      display: panel ? getComputedStyle(panel).display : "missing",
      img: panel?.querySelector("img")?.getAttribute("src") || "",
    };
  });
  ok(
    "desktop: row hover shows the preview panel",
    preview.on === "true" && preview.display !== "none" && !!preview.img,
    JSON.stringify(preview)
  );

  const focus = await page.evaluate(async () => {
    const rows = document.querySelectorAll("#projects a[aria-label^='View ']");
    rows[1].focus();
    await new Promise((res) => setTimeout(res, 450));
    const panel = document.querySelector("#projects [data-on]");
    return { on: panel?.dataset.on, img: panel?.querySelector("img")?.getAttribute("src") || "" };
  });
  ok(
    "desktop: keyboard focus drives the same preview",
    focus.on === "true" && !!focus.img,
    JSON.stringify(focus)
  );

  // enquiry form
  await page.evaluate(() => scrollTo(0, document.getElementById("contact").offsetTop));
  await page.waitForTimeout(700);
  await page.fill("#name", "Test Visitor");
  await page.fill("#message", "I need a website for my shop.");
  await page.click('#contact button[type="submit"]');
  await page.waitForTimeout(1000);
  const wa = await page.evaluate(() => {
    const s = document.getElementById("form-status");
    return { text: s?.innerText?.trim() || "", href: s?.querySelector("a")?.href || "" };
  });
  ok(
    "contact: enquiry builds a real WhatsApp draft without posting data",
    /wa\.me\/919207072726/.test(wa.href) &&
      /Test(%20|\+)Visitor/.test(wa.href) &&
      /need(\s|%20)a(\s|%20)website/i.test(decodeURIComponent(wa.href)),
    decodeURIComponent(wa.href).slice(0, 170) || wa.text
  );

  const copied = await page.evaluate(async () => {
    const btn = [...document.querySelectorAll("#contact button")].find((b) =>
      /copy/i.test(b.textContent)
    );
    if (!btn) return "no-button";
    btn.click();
    await new Promise((r) => setTimeout(r, 700));
    try {
      return await navigator.clipboard.readText();
    } catch {
      return `read-failed(label:${btn.textContent.trim()})`;
    }
  });
  ok("contact: copy-email writes the address", copied === "hashimhr3454@gmail.com", copied);

  await ctx.close();
}

/* ----------------------------------- mobile */
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.addInitScript(() => localStorage.setItem("mh-theme", "dark"));
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1300);

  ok("mobile: no console errors", errors.length === 0, errors.join(" | "));
  ok(
    "mobile: no horizontal overflow",
    (await page.evaluate(
      () =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth
    )) === 0
  );

  await page.getByRole("button", { name: /open menu/i }).click();
  await page.waitForTimeout(600);
  const menu = await page.evaluate(() => {
    const m = document.getElementById("mobile-menu");
    return {
      open: m?.dataset.open,
      inert: m?.hasAttribute("inert"),
      links: m?.querySelectorAll("a").length,
      visible: m ? getComputedStyle(m).display !== "none" : false,
    };
  });
  ok(
    "mobile: menu opens with real links",
    menu.open === "true" && menu.inert === false && menu.links >= 6,
    JSON.stringify(menu)
  );
  await page.locator("#mobile-menu a").nth(2).click();
  await page.waitForTimeout(1400);
  const closed = await page.evaluate(() => ({
    open: document.getElementById("mobile-menu").dataset.open,
    y: Math.round(window.scrollY),
    hash: location.hash,
  }));
  ok(
    "mobile: menu closes and navigates to the section",
    closed.open === "false" && closed.y > 200 && closed.hash === "#projects",
    JSON.stringify(closed)
  );

  const small = await page.evaluate(() =>
    [...document.querySelectorAll('a[href], button')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.height < 40;
      })
      .map(
        (el) =>
          `${el.tagName}.${(el.className || "").toString().split("__").pop()}=${Math.round(
            el.getBoundingClientRect().height
          )}`
      )
  );
  ok("mobile: tap targets are at least 40px tall", small.length === 0, small.slice(0, 8).join(" "));

  const dominance = await page.evaluate(() => {
    const img = document.querySelector('img[src*="portraits"]');
    const r = img.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height), vw: innerWidth, vh: innerHeight };
  });
  ok(
    "mobile: portrait is a major element of the fold",
    dominance.w >= dominance.vw * 0.9 && dominance.h >= dominance.vh * 0.35,
    JSON.stringify(dominance)
  );

  await ctx.close();
}

/* ----------------------- reduced motion + tablet */
{
  const ctx = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.addInitScript(() => localStorage.setItem("mh-theme", "dark"));
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    scrollTo(0, document.getElementById("work").offsetTop);
  });
  await page.waitForTimeout(1200);
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll("[data-reveal]")]
      .filter((e) => {
        const s = getComputedStyle(e);
        const r = e.getBoundingClientRect();
        const inView = r.top < innerHeight && r.bottom > 0;
        const clipped = [...e.children].some(
          (c) => getComputedStyle(c).clipPath !== "none" && !/^inset\(0px( 0px 0px 0px)?\)$/.test(getComputedStyle(c).clipPath)
        );
        return inView && (Number(s.opacity) < 1 || clipped);
      })
      .map((e) => e.className.split("__").pop())
  );
  ok("reduced motion: nothing in view stays hidden", hidden.length === 0, hidden.join(" "));
  ok(
    "tablet 768: no horizontal overflow",
    (await page.evaluate(
      () =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth
    )) === 0
  );
  await ctx.close();
}

await browser.close();
const failed = results.filter((r) => !r.pass);
for (const r of results)
  console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}${r.detail ? `  — ${r.detail}` : ""}`);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
