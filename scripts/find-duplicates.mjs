import fs from "fs";
import path from "path";
import crypto from "crypto";

const base = "/home/spil/Downloads/upwork_portfolio";
const dirs = fs.readdirSync(base);

const hashes = new Map();

for (const d of dirs) {
  const fullD = path.join(base, d);
  if (!fs.statSync(fullD).isDirectory()) continue;
  const files = fs.readdirSync(fullD);
  for (const f of files) {
    const fullP = path.join(fullD, f);
    const buf = fs.readFileSync(fullP);
    const hash = crypto.createHash("md5").update(buf).digest("hex");
    if (hashes.has(hash)) {
      hashes.get(hash).push({ folder: d, file: f, path: fullP });
    } else {
      hashes.set(hash, [{ folder: d, file: f, path: fullP }]);
    }
  }
}

console.log("=== DUPLICATE ANALYSIS (EXACT MD5 MATCH) ===");
let dupCount = 0;
for (const [hash, list] of hashes.entries()) {
  if (list.length > 1) {
    dupCount++;
    console.log(`\nDuplicate Group #${dupCount} (MD5: ${hash}):`);
    list.forEach(item => console.log(`  - [${item.folder}] ${item.file}`));
  }
}
if (dupCount === 0) {
  console.log("Zero byte-for-byte duplicate files found!");
}
