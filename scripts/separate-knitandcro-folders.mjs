import fs from "fs";
import path from "path";

const BASE_DL = "/home/spil/Downloads/upwork_portfolio";
const PUBLIC_PROJECTS = "/home/spil/projects/personal/portofolio-nextjs/public/projects";

// Clean existing knitandcro folder if needed
const oldKnit = path.join(BASE_DL, "03_knitandcro_yarn_erp");
if (fs.existsSync(oldKnit)) {
  fs.rmSync(oldKnit, { recursive: true, force: true });
}

// Clear and recreate clean structure
const folderSetup = [
  {
    dirName: "03_knitandcro_ecommerce_storefront",
    files: [
      "knitandcro_storefront_01_hero_home_en.png",
      "knitandcro_storefront_02_studio_collection_en.png",
      "knitandcro_storefront_03_about_us_en.png",
      "knitandcro_storefront_04_contact_location_en.png"
    ]
  },
  {
    dirName: "04_knitandcro_retail_pos_erp",
    files: [
      "knitandcro_01_retail_dashboard_en.png",
      "knitandcro_02_vendors_buyers_en.png",
      "knitandcro_03_ecommerce_marketplace_orders_en.png",
      "knitandcro_04_pos_invoices_history_en.png",
      "knitandcro_05_yarn_dye_lot_variants_en.png",
      "knitandcro_06_realtime_notifications_en.png",
      "knitandcro_07_rbac_account_settings_en.png"
    ]
  }
];

for (const item of folderSetup) {
  const fullDir = path.join(BASE_DL, item.dirName);
  fs.mkdirSync(fullDir, { recursive: true });
  for (const f of item.files) {
    const src = path.join(PUBLIC_PROJECTS, f);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(fullDir, f));
      console.log(`Copied [${f}] -> [${item.dirName}]`);
    }
  }
}

// Rename the remaining numbered folders sequentially
const renamePlan = [
  ["04_nagamasban_tire_ai_catalogue", "05_nagamasban_tire_ai_catalogue"],
  ["05_cahayaterang_tire_pos_erp", "06_cahayaterang_tire_pos_erp"],
  ["06_gms_cg_home_sharing", "07_gms_cg_home_sharing"],
  ["07_software_agency_erp_solutions", "08_software_agency_erp_solutions"],
  ["08_wijayamas_jewel_rfid_erp", "09_wijayamas_jewel_rfid_erp"],
  ["09_gms_community_quiz_app", "10_gms_community_quiz_app"],
  ["10_tigaputra_snack_grocery_erp", "11_tigaputra_snack_grocery_erp"]
];

for (const [oldName, newName] of renamePlan.reverse()) {
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

console.log("=== KNITANDCRO FOLDER SEPARATION COMPLETED! ===");
