import "./theme.css";
import { bloomFonts } from "@/fonts/ecommerce-bloom";

export default function BloomLayout({ children }: { children: React.ReactNode }) {
  return <div className={`theme-ecommerce-bloom ${bloomFonts} min-h-dvh bg-bg font-sans text-fg`}>{children}</div>;
}
