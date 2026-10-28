import "./theme.css";
import { BowlFooter } from "@/components/food/bowl/BowlFooter";
import { BowlHeader } from "@/components/food/bowl/BowlHeader";
import { bowlFonts } from "@/fonts/food-bowl";

export default function BowlLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-food-bowl ${bowlFonts} min-h-dvh bg-bg font-sans text-fg`}>
      <BowlHeader />
      <main id="main">{children}</main>
      <BowlFooter />
    </div>
  );
}
