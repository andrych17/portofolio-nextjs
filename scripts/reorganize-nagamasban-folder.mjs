import fs from "fs";
import path from "path";

const BASE_DL = "/home/spil/Downloads/upwork_portfolio";
const PUBLIC_PROJECTS = "/home/spil/projects/personal/portofolio-nextjs/public/projects";

// Clean old folder 04
const old04 = path.join(BASE_DL, "04_tire_cahayaterang_nagamasban");
if (fs.existsSync(old04)) {
  fs.rmSync(old04, { recursive: true, force: true });
}

// 1. Create dedicated Nagamasban folder
const nagamasDir = path.join(BASE_DL, "04_nagamasban_tire_ai_catalogue");
fs.mkdirSync(nagamasDir, { recursive: true });

fs.copyFileSync(path.join(PUBLIC_PROJECTS, "nagamasban_01_katalog_en.png"), path.join(nagamasDir, "nagamasban_01_online_catalogue_en.png"));
fs.copyFileSync(path.join(PUBLIC_PROJECTS, "ban1.png"), path.join(nagamasDir, "nagamasban_02_ai_sales_recommendation_en.png"));
fs.copyFileSync(path.join(PUBLIC_PROJECTS, "ban2.png"), path.join(nagamasDir, "nagamasban_03_sales_matrix_specs_en.png"));

// 2. Create dedicated Cahaya Terang Tire ERP folder
const cahayaDir = path.join(BASE_DL, "05_cahayaterang_tire_pos_erp");
fs.mkdirSync(cahayaDir, { recursive: true });

const tireFiles = [
  "tire_01_cahayaterang_dashboard_en.png",
  "tire_02_inventory_specs_ring_dot_en.png",
  "tire_03_fleet_dealers_suppliers_en.png",
  "tire_04_sales_wholesale_orders_en.png"
];
for (const f of tireFiles) {
  if (fs.existsSync(path.join(PUBLIC_PROJECTS, f))) {
    fs.copyFileSync(path.join(PUBLIC_PROJECTS, f), path.join(cahayaDir, f));
  }
}

// 3. Rename subsequent folders if needed
const renameMap = [
  ["05_gms_cg_home_sharing", "06_gms_cg_home_sharing"],
  ["06_software_agency_erp_solutions", "07_software_agency_erp_solutions"],
  ["07_wijayamas_jewel_rfid_erp", "08_wijayamas_jewel_rfid_erp"],
  ["08_gms_community_quiz_app", "09_gms_community_quiz_app"],
  ["09_tigaputra_snack_grocery_erp", "10_tigaputra_snack_grocery_erp"]
];

for (const [oldName, newName] of renameMap.reverse()) {
  const oldP = path.join(BASE_DL, oldName);
  const newP = path.join(BASE_DL, newName);
  if (fs.existsSync(oldP)) {
    if (fs.existsSync(newP) && oldP !== newP) {
      fs.rmSync(newP, { recursive: true, force: true });
    }
    fs.renameSync(oldP, newP);
    console.log(`Renamed [${oldName}] -> [${newName}]`);
  }
}

console.log("=== FOLDER REORGANIZATION COMPLETED! ===");
