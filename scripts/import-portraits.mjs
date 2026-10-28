import sharp from "sharp";
import fs from "node:fs/promises";

// Pass the folder your photos were downloaded to as an argument, e.g.
//   node scripts/import-portraits.mjs "C:/Users/you/Downloads"
// The path is deliberately not stored in the repo.
const SRC = process.argv[2];
if (!SRC) {
  console.error("usage: node scripts/import-portraits.mjs <folder containing the source photos>");
  process.exit(1);
}

const jobs = [
  {
    from: `${SRC}/WhatsApp Image 2026-10-28 at 2.42.04 PM.jpeg`,
    to: "public/images/portraits/hashir-candid.jpg",
    max: 1600,
  },
  {
    from: `${SRC}/WhatsApp Image 2026-10-28 at 2.42.22 PM.jpeg`,
    to: "public/images/portraits/hashir-portrait.jpg",
    max: 1600,
  },
  {
    from: `${SRC}/WhatsApp Image 2026-10-28 at 2.41.53 PM.jpeg`,
    to: "public/images/portraits/hashir-speaking.jpg",
    max: 1800,
  },
];

await fs.mkdir("public/images/portraits", { recursive: true });
for (const job of jobs) {
  const info = await sharp(job.from, { animated: false })
    .rotate()
    .resize({ width: job.max, withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true, progressive: true })
    .toFile(job.to);
  console.log(`${job.to}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
}
