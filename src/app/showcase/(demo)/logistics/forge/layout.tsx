import "./theme.css";
import { ForgeFooter } from "@/components/logistics/forge/ForgeFooter";
import { ForgeHeader } from "@/components/logistics/forge/ForgeHeader";
import { forgeFonts } from "@/fonts/logistics-forge";

export default function ForgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-logistics-forge ${forgeFonts} min-h-dvh bg-forge-bg font-sans text-forge-text`}>
      <ForgeHeader />
      <main id="main">{children}</main>
      <ForgeFooter />
    </div>
  );
}
