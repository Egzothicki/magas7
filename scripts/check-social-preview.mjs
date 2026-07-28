import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imageName = "magas7-social-card-v2.png";
const imagePath = path.join(projectRoot, "public", imageName);
const layoutPath = path.join(projectRoot, "app", "layout.tsx");

const fail = (message) => {
  console.error(`Social preview check failed: ${message}`);
  process.exit(1);
};

let image;
try {
  image = await readFile(imagePath);
} catch {
  fail(`public/${imageName} is missing`);
}

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (image.length < 24 || !image.subarray(0, 8).equals(pngSignature)) {
  fail(`public/${imageName} is not a valid PNG`);
}

const width = image.readUInt32BE(16);
const height = image.readUInt32BE(20);
if (width !== 1200 || height !== 630) {
  fail(`public/${imageName} must be 1200x630, received ${width}x${height}`);
}

const layout = await readFile(layoutPath, "utf8");
if (!layout.includes(`const SOCIAL_IMAGE = "/${imageName}"`)) {
  fail(`app/layout.tsx must use the versioned /${imageName} asset`);
}

if (!layout.includes('card: "summary_large_image"')) {
  fail("Twitter metadata must use summary_large_image");
}

console.log(`Social preview OK: ${imageName} (${width}x${height}, ${image.length} bytes)`);
