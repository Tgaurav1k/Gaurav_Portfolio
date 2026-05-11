// One-off image optimiser. Run with: npm run optimize-images
//
// For every .png in img/ and assets/:
//   1) Re-compress the PNG in place (8-bit palette, max compression).
//      Same filename, same format, just smaller. No HTML changes needed.
//   2) Also write a .webp sibling at quality 82. Hero <picture> tags
//      can prefer the WebP for browsers that support it.
//
// Targets large screenshots; preserves visual quality.

import { readdir, stat } from "node:fs/promises";
import { extname, join } from "node:path";
import sharp from "sharp";

const DIRS = ["img", "assets"];
const PNG_QUALITY = 90;       // pngQuant-like quality for adaptive palette
const WEBP_QUALITY = 82;      // visually lossless for screenshots
const SIZE_THRESHOLD = 50 * 1024; // skip files already < 50 KB

async function* walkPng(dir) {
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry);
    const s = await stat(full);
    if (s.isDirectory()) yield* walkPng(full);
    else if (extname(entry).toLowerCase() === ".png") yield { full, size: s.size };
  }
}

function fmt(bytes) {
  return (bytes / 1024).toFixed(0) + " KB";
}

let totalBefore = 0;
let totalAfterPng = 0;
let totalAfterWebp = 0;

for (const dir of DIRS) {
  for await (const { full, size } of walkPng(dir)) {
    if (size < SIZE_THRESHOLD) {
      console.log(`skip  ${full} (already ${fmt(size)})`);
      continue;
    }
    totalBefore += size;

    // 1) Re-compress PNG in place via temp file
    const tmpPng = full + ".tmp";
    const pngBuf = await sharp(full)
      .png({ compressionLevel: 9, palette: true, quality: PNG_QUALITY, effort: 10 })
      .toBuffer();
    await sharp(pngBuf).toFile(tmpPng);
    const pngStats = await stat(tmpPng);
    totalAfterPng += pngStats.size;

    // Only replace if smaller (sometimes already optimal)
    if (pngStats.size < size) {
      const { rename } = await import("node:fs/promises");
      await rename(tmpPng, full);
      console.log(`png   ${full}: ${fmt(size)} -> ${fmt(pngStats.size)}  (-${Math.round((1 - pngStats.size / size) * 100)}%)`);
    } else {
      const { unlink } = await import("node:fs/promises");
      await unlink(tmpPng);
      totalAfterPng -= pngStats.size;
      totalAfterPng += size;
      console.log(`png   ${full}: already optimal at ${fmt(size)}`);
    }

    // 2) Write WebP sibling
    const webpPath = full.replace(/\.png$/i, ".webp");
    await sharp(full).webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(webpPath);
    const webpStats = await stat(webpPath);
    totalAfterWebp += webpStats.size;
    console.log(`webp  ${webpPath}: ${fmt(webpStats.size)}  (-${Math.round((1 - webpStats.size / size) * 100)}% vs original png)`);
  }
}

console.log("");
console.log(`Total before:        ${fmt(totalBefore)}`);
console.log(`Total after (PNG):   ${fmt(totalAfterPng)}  (-${Math.round((1 - totalAfterPng / totalBefore) * 100)}%)`);
console.log(`Total WebP siblings: ${fmt(totalAfterWebp)}  (-${Math.round((1 - totalAfterWebp / totalBefore) * 100)}% vs original)`);
