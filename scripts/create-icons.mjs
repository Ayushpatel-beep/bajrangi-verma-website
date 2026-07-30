import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const input = path.resolve("public/icons/logo.svg");
const output = path.resolve("public");

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 }
];

await fs.mkdir(output, { recursive: true });

for (const icon of sizes) {
  const out = path.join(output, icon.name);

  await sharp(input)
    .resize(icon.size, icon.size, {
      fit: "contain",
      background: { r: 11, g: 11, b: 11, alpha: 1 }
    })
    .png()
    .toFile(out);

  console.log(`✔ ${icon.name}`);
}

console.log("✅ Icons created successfully");