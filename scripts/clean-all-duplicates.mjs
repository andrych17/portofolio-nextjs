import fs from "fs";
import path from "path";

// 1. Clean 06_software_agency_erp_solutions (Remove jewel_* duplicates)
const agencyDir = "/home/spil/Downloads/upwork_portfolio/06_software_agency_erp_solutions";
if (fs.existsSync(agencyDir)) {
  const files = fs.readdirSync(agencyDir);
  for (const f of files) {
    if (f.startsWith("jewel_")) {
      fs.unlinkSync(path.join(agencyDir, f));
      console.log(`Deleted duplicate jewel file from agency folder: ${f}`);
    }
  }
}

// 2. Clean 05_gms_cg_home_sharing (Remove identical MD5 redirects, copy rich original map & house screens)
const gmsDir = "/home/spil/Downloads/upwork_portfolio/05_gms_cg_home_sharing";
const publicProj = "/home/spil/projects/personal/portofolio-nextjs/public/projects";

if (fs.existsSync(gmsDir)) {
  // Remove duplicates
  const toRemove = [
    "gms_03_houses_list_en.png",
    "gms_07_portal_home_en.png"
  ];
  for (const f of toRemove) {
    const p = path.join(gmsDir, f);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log(`Deleted duplicate GMS redirect screenshot: ${f}`);
    }
  }

  // Copy rich GMS map and house booking screens from public/projects
  if (fs.existsSync(path.join(publicProj, "gms1.png"))) {
    fs.copyFileSync(path.join(publicProj, "gms1.png"), path.join(gmsDir, "gms_01_interactive_map_search_en.png"));
    console.log("Added gms_01_interactive_map_search_en.png (Rich interactive map filter)");
  }
  if (fs.existsSync(path.join(publicProj, "gms2.png"))) {
    fs.copyFileSync(path.join(publicProj, "gms2.png"), path.join(gmsDir, "gms_04_house_detail_specifications_en.png"));
    console.log("Added gms_04_house_detail_specifications_en.png (Rich room & house specs)");
  }
}
