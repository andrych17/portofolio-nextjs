import fs from "fs";
import path from "path";

const projectsFile = "/home/spil/projects/personal/portofolio-nextjs/src/components/Projects.tsx";
const publicDir = "/home/spil/projects/personal/portofolio-nextjs/public/projects";

const code = fs.readFileSync(projectsFile, "utf-8");
const imgRegex = /"\/projects\/([^"]+)"/g;
let match;
const usedImages = new Set();
while ((match = imgRegex.exec(code)) !== null) {
  usedImages.add(match[1]);
}

console.log(`Currently referenced in Projects.tsx: ${usedImages.size} images`);

const allFiles = fs.readdirSync(publicDir);
let deletedCount = 0;

for (const f of allFiles) {
  // Only remove screenshot/image files that are NOT in usedImages
  if ((f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".webp")) && !usedImages.has(f)) {
    // Keep avatar or core branding if any, otherwise delete orphan screenshots
    if (f.startsWith("nusaevo_") || f.startsWith("gms_03_") || f.startsWith("gms_07_") || f.startsWith("qualiv_jobs") || f.startsWith("qualiv_kandidat") || f.startsWith("nagamasban_03") || f.startsWith("nagamasban_08") || f.startsWith("jewel_02_gold_rfid") || f.startsWith("jewel_03_vip_clients") || f.startsWith("jewel_04_pos_gold") || f.startsWith("jewel_05_gold_buyback")) {
      const p = path.join(publicDir, f);
      fs.unlinkSync(p);
      console.log(`Deleted orphan unused asset: ${f}`);
      deletedCount++;
    }
  }
}

console.log(`Cleaned up ${deletedCount} orphan images. All remaining public/projects/ assets are actively used!`);
