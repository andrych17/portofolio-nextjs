import "./theme.css";
import { kilnFonts } from "@/fonts/ecommerce-kiln";

export default function KilnLayout({ children }: { children: React.ReactNode }) {
  return <div className={`theme-ecommerce-kiln ${kilnFonts} min-h-dvh bg-bg font-sans text-fg`}>{children}</div>;
}
