import sharp from "sharp";
import fs from "node:fs/promises";

const portraitPath = "public/images/portraits/hashir-portrait.jpg";
const size = 460;
const mask = Buffer.from(
  `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`
);

const portrait = await sharp(portraitPath)
  .resize(size, size, { fit: "cover", position: "top" })
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();

const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="violet" cx="82%" cy="18%" r="60%">
      <stop offset="0%" stop-color="#d1783a" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="#6b3f1c" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#0a0908" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ice" cx="6%" cy="100%" r="70%">
      <stop offset="0%" stop-color="#9dc6e0" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#0a0908" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" x2="1">
      <stop offset="0%" stop-color="#e9a86a" stop-opacity="0"/>
      <stop offset="50%" stop-color="#e9a86a" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#e9a86a" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0a0908"/>
  <rect width="1200" height="630" fill="url(#violet)"/>
  <rect width="1200" height="630" fill="url(#ice)"/>
  <g stroke="#ffffff" stroke-opacity="0.055" stroke-width="1">
    <path d="M80 0V630 M160 0V630 M240 0V630 M320 0V630 M400 0V630 M480 0V630 M560 0V630 M640 0V630 M720 0V630 M800 0V630 M880 0V630 M960 0V630 M1040 0V630 M1120 0V630"/>
    <path d="M0 90H1200 M0 180H1200 M0 270H1200 M0 360H1200 M0 450H1200 M0 540H1200"/>
  </g>

  <g font-family="Segoe UI, Arial, sans-serif">
    <text x="72" y="70" font-size="13" letter-spacing="4.5" fill="#e9a86a">MUHAMMED HASHIR</text>
    <text x="1128" y="70" text-anchor="end" font-size="12" letter-spacing="3.2" fill="#a8a29a">PORTFOLIO / 2026</text>

    <text x="72" y="252" font-size="66" font-weight="600" letter-spacing="-2.4" fill="#f6f3ec">Web Designer</text>
    <text x="70" y="332" font-family="Georgia, Times New Roman, serif" font-style="italic" font-size="76" letter-spacing="-1.5" fill="#e9a86a">&amp; Developer.</text>

    <line x1="72" y1="384" x2="632" y2="384" stroke="url(#rule)" stroke-width="1"/>

    <text x="72" y="427" font-size="12.5" letter-spacing="3.4" fill="#8f887d">DESIGNING DIGITAL EXPERIENCES.</text>
    <text x="72" y="453" font-size="12.5" letter-spacing="3.4" fill="#8f887d">BUILDING WHAT MATTERS.</text>

    <circle cx="72" cy="531" r="4" fill="#e9a86a"/>
    <text x="90" y="536" font-size="13" letter-spacing="0.4" fill="#ded7cb">Available for select projects</text>

    <text x="72" y="590" font-size="13" letter-spacing="0.6" fill="#8f887d">hashimhr3454@gmail.com</text>
    <text x="272" y="590" font-size="13" letter-spacing="0.6" fill="#8f887d">@4_shir_fz</text>
    <text x="416" y="590" font-size="13" letter-spacing="0.6" fill="#8f887d">India</text>
  </g>

  <circle cx="898" cy="315" r="234" fill="#13110e"/>
  <circle cx="898" cy="315" r="234" fill="none" stroke="#ffffff" stroke-opacity="0.18"/>
  <circle cx="898" cy="315" r="252" fill="none" stroke="#e9a86a" stroke-opacity="0.28" stroke-dasharray="2 9"/>
  <circle cx="898" cy="64" r="4" fill="#e9a86a"/>
  <g font-family="Segoe UI, Arial, sans-serif" font-size="11" letter-spacing="3" fill="#a8a29a">
    <text x="898" y="587" text-anchor="middle">WEB DESIGN &amp; DEVELOPMENT</text>
  </g>
</svg>`;

const base = sharp(Buffer.from(ogSvg));
const composed = await base
  .composite([{ input: portrait, left: 668, top: 85 }])
  .jpeg({ quality: 90, mozjpeg: true })
  .toBuffer();
await fs.writeFile("public/og.jpg", composed);

const iconSvg = `
<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" rx="40" fill="#0a0908"/>
  <rect x="6" y="6" width="168" height="168" rx="35" fill="none" stroke="#ffffff" stroke-opacity="0.16"/>
  <text x="90" y="112" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="700" letter-spacing="-3" fill="#f6f3ec">MH</text>
  <circle cx="137" cy="47" r="7" fill="#e9a86a"/>
</svg>`;
await sharp(Buffer.from(iconSvg)).png().toFile("public/apple-icon.png");

await fs.writeFile(
  "src/app/icon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0a0908"/>
  <rect x="2.5" y="2.5" width="59" height="59" rx="12" fill="none" stroke="#fff" stroke-opacity=".18"/>
  <text x="32" y="41" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="-1" fill="#f6f3ec">MH</text>
  <circle cx="49" cy="16" r="3.4" fill="#e9a86a"/>
</svg>`
);

console.log("Wrote public/og.jpg, public/apple-icon.png, src/app/icon.svg");
