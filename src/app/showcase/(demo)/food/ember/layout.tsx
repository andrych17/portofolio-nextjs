import "./theme.css";
import { EmberFooter } from "@/components/food/ember/EmberFooter";
import { EmberHeader } from "@/components/food/ember/EmberHeader";
import { emberFonts } from "@/fonts/food-ember";

export default function EmberLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-food-ember ${emberFonts} min-h-dvh bg-bg font-sans text-fg`}>
      <EmberHeader />
      <main id="main">{children}</main>
      <EmberFooter />
    </div>
  );
}
