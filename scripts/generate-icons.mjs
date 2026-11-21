/**
 * Generates the browser-tab icon set from the JCNL logo artwork.
 *
 *   node scripts/generate-icons.mjs
 *
 * The full logo is 1991x789 and carries small text (the RC number and the
 * "Logistics & Business Service Company" line), so it is unreadable at 16-32px.
 * The icon therefore uses the left-hand mark — glossy globe, red orbit ring and
 * the J it overlaps — cropped square and centred on a solid white field, which
 * keeps the sky-blue/red artwork exactly as drawn and stays legible in both
 * light and dark browser chrome.
 *
 * `sharp` is already in the tree as a dependency of Next's image pipeline; no
 * extra package is installed. Output is committed, so this only needs running
 * when `public/logos/logo.png` changes.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "public/logos/logo.png");

/** Square crop of the mark, in source pixels. */
const CROP = { left: 40, top: 60, width: 590, height: 590 };

/** Breathing room between the mark and the edge of the icon. */
const PADDING = 0.08;

/** PWA maskable icons are cropped to a circle, so they need a wider safe zone. */
const MASKABLE_PADDING = 0.2;

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

async function markCrop() {
  return sharp(SOURCE).extract(CROP).png().toBuffer();
}

/**
 * A square icon: the mark scaled to fit the padded area, centred on white.
 * `opaque` flattens the alpha channel (Apple touch icons must not be
 * transparent — iOS paints them black).
 */
async function icon(mark, size, padding, opaque = false) {
  const inner = Math.max(1, Math.round(size * (1 - padding * 2)));
  const scaled = await sharp(mark)
    .resize(inner, inner, {
      fit: "contain",
      background: { ...WHITE, alpha: 0 },
    })
    .png()
    .toBuffer();

  let image = sharp({
    create: { width: size, height: size, channels: 4, background: WHITE },
  }).composite([{ input: scaled, gravity: "center" }]);

  if (opaque) image = image.flatten({ background: WHITE });

  // The artwork is glossy, so lossless 512px PNGs land around 220 kB. Paletting
  // takes that to about 55 kB with no banding visible at any icon size.
  const png =
    size >= 180
      ? { palette: true, quality: 82, effort: 10 }
      : { compressionLevel: 9 };

  return image.png(png).toBuffer();
}

/**
 * ICO container with PNG-compressed frames (supported by every browser that
 * renders favicons today). 48px covers Windows taskbar and bookmark surfaces.
 */
function ico(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(frames.length, 4);

  const directory = Buffer.alloc(16 * frames.length);
  let offset = header.length + directory.length;

  frames.forEach(({ size, data }, index) => {
    const entry = index * 16;
    directory.writeUInt8(size >= 256 ? 0 : size, entry + 0); // width
    directory.writeUInt8(size >= 256 ? 0 : size, entry + 1); // height
    directory.writeUInt8(0, entry + 2); // palette size
    directory.writeUInt8(0, entry + 3); // reserved
    directory.writeUInt16LE(1, entry + 4); // colour planes
    directory.writeUInt16LE(32, entry + 6); // bits per pixel
    directory.writeUInt32LE(data.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });

  return Buffer.concat([header, directory, ...frames.map((frame) => frame.data)]);
}

async function main() {
  const mark = await markCrop();

  const appDir = path.join(ROOT, "src/app");
  const iconDir = path.join(ROOT, "public/icons");
  await mkdir(iconDir, { recursive: true });

  // Browser tab: multi-resolution .ico, wired by the App Router convention.
  const frames = [];
  for (const size of [16, 32, 48]) {
    frames.push({ size, data: await icon(mark, size, PADDING) });
  }
  await writeFile(path.join(appDir, "favicon.ico"), ico(frames));

  // High-resolution tab icon for browsers that prefer PNG.
  await writeFile(path.join(appDir, "icon.png"), await icon(mark, 512, PADDING));

  // iOS home screen: opaque white, its own corner mask.
  await writeFile(
    path.join(appDir, "apple-icon.png"),
    await icon(mark, 180, PADDING, true),
  );

  // Web app manifest.
  await writeFile(path.join(iconDir, "icon-192.png"), await icon(mark, 192, PADDING));
  await writeFile(path.join(iconDir, "icon-512.png"), await icon(mark, 512, PADDING));
  await writeFile(
    path.join(iconDir, "icon-512-maskable.png"),
    await icon(mark, 512, MASKABLE_PADDING),
  );

  console.log("icons written from", path.relative(ROOT, SOURCE));
}

await main();
