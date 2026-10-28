import { chromium } from "playwright-core";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const PROJECTS = [
  { id: "01-markaz-bilal-results", title: "Markaz Bilal Results", url: "https://markazbilal-results.web.app/" },
  { id: "02-score-table", title: "Score Table", url: "https://scoretablefb1.vercel.app/" },
  { id: "03-mbp-sports", title: "MBP Sports", url: "https://Mbp-sports.vercel.app" },
  { id: "04-digilocker-issues", title: "DigiLocker Issues", url: "https://digilocker-issues809.vercel.app/" },
  { id: "05-emaron-mp3", title: "Emmaron MP3", url: "https://emaronmp3.vercel.app" },
  { id: "06-emw-hub", title: "EMW Hub", url: "https://Emw-hub.vercel.app" },
  { id: "07-campus-hub", title: "Campus Hub", url: "https://hubcampus.vercel.app" },
  { id: "08-mizan-forum", title: "Mizan Forum", url: "https://mizanforum.vercel.app" },
  { id: "09-hptyws911-admin", title: "HPTYWS911 Admin", url: "https://hptyws911.vercel.app/admin" },
  { id: "10-deyanza", title: "Deyanza", url: "https://deyanza.vercel.app/" },
  { id: "11-knk-cement-store", title: "KNK Cement Store", url: "https://knkcementstore.vercel.app" },
  { id: "12-haxflow-overview", title: "Haxflow Overview", url: "https://haxflow.vercel.app/overview" },
];

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const RAW_DIR = path.resolve("scripts/.shots");
const OUT_DIR = path.resolve("public/images/projects");
const SHEET = path.resolve("scripts/.shots/contact-sheet.jpg");

await fs.mkdir(RAW_DIR, { recursive: true });
await fs.mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const results = [];

for (const project of PROJECTS) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    locale: "en-US",
    colorScheme: "light",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();
  const result = { ...project, status: null, finalUrl: null, pageTitle: null, ok: false, note: "" };
  try {
    const response = await page.goto(project.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    result.status = response?.status() ?? null;
    await page.waitForTimeout(3500);
    result.finalUrl = page.url();
    result.pageTitle = (await page.title()).slice(0, 160);
    const rawPath = path.join(RAW_DIR, `${project.id}.png`);
    await page.screenshot({ path: rawPath, animations: "disabled" });
    await sharp(rawPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(OUT_DIR, `${project.id}.webp`));
    const html = await page.content();
    result.frameworks = [
      html.includes("/_next/") || html.includes("__NEXT_DATA__") ? "Next.js" : "",
      html.includes("_app-") || html.includes("data-reactroot") ? "React" : "",
      html.includes("firebase") || project.url.includes(".web.app") ? "Firebase" : "",
    ].filter(Boolean);
    result.ok = true;
  } catch (error) {
    result.note = String(error).split("\n")[0].slice(0, 200);
    try {
      await page.screenshot({ path: path.join(RAW_DIR, `${project.id}-error.png`) });
    } catch {}
  } finally {
    await context.close();
  }
  results.push(result);
  console.log(`${result.ok ? "OK " : "ERR"} ${project.id} [${result.status}] ${result.note}`);
}

await browser.close();
await fs.writeFile(path.join(RAW_DIR, "results.json"), JSON.stringify(results, null, 2));

const okShots = results.filter((r) => r.ok).map((r) => r.id);
if (okShots.length) {
  const tileW = 480;
  const tileH = 300;
  const labelH = 34;
  const cols = 3;
  const rows = Math.ceil(okShots.length / cols);
  const composites = [];
  for (let i = 0; i < okShots.length; i++) {
    const id = okShots[i];
    const buf = await sharp(path.join(OUT_DIR, `${id}.webp`))
      .resize(tileW, tileH, { fit: "cover", position: "top" })
      .toBuffer();
    const x = (i % cols) * tileW;
    const y = Math.floor(i / cols) * (tileH + labelH);
    const label = Buffer.from(
      `<svg width="${tileW}" height="${labelH}"><rect width="100%" height="100%" fill="#0b0b10"/><text x="12" y="23" font-family="Segoe UI, Arial" font-size="16" fill="#ffffff">${id}</text></svg>`
    );
    composites.push({ input: buf, left: x, top: y + labelH });
    composites.push({ input: label, left: x, top: y });
  }
  await sharp({
    create: {
      width: cols * tileW,
      height: rows * (tileH + labelH),
      channels: 3,
      background: "#0b0b10",
    },
  })
    .composite(composites)
    .jpeg({ quality: 82 })
    .toFile(SHEET);
  console.log(`Contact sheet: ${SHEET}`);
}

console.log(JSON.stringify(results.map(({ id, status, ok, finalUrl, pageTitle, frameworks }) => ({ id, status, ok, finalUrl, pageTitle, frameworks })), null, 2));
