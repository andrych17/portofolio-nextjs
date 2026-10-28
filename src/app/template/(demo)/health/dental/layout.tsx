import "./theme.css";
import { DentalFooter } from "@/components/health/dental/DentalFooter";
import { DentalHeader } from "@/components/health/dental/DentalHeader";
import { dentalFonts } from "@/fonts/health-dental";

export default function DentalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-health-dental ${dentalFonts} min-h-dvh bg-bg font-sans text-fg`}>
      <DentalHeader />
      <main id="main">{children}</main>
      <DentalFooter />
    </div>
  );
}
