import "./theme.css";
import { SereneFooter } from "@/components/health/serene/SereneFooter";
import { SereneHeader } from "@/components/health/serene/SereneHeader";
import { sereneFonts } from "@/fonts/health-serene";

export default function SereneLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-health-serene ${sereneFonts} min-h-dvh bg-bg font-sans text-fg`}>
      <SereneHeader />
      <main id="main">{children}</main>
      <SereneFooter />
    </div>
  );
}
