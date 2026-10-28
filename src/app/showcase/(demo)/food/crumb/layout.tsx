import "./theme.css";
import { CrumbFooter } from "@/components/food/crumb/CrumbFooter";
import { CrumbHeader } from "@/components/food/crumb/CrumbHeader";
import { crumbFonts } from "@/fonts/food-crumb";

export default function CrumbLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-food-crumb ${crumbFonts} min-h-dvh bg-bg font-sans text-fg`}>
      <CrumbHeader />
      <main id="main">{children}</main>
      <CrumbFooter />
    </div>
  );
}
