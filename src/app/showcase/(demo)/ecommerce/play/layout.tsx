import "./theme.css";
import { playFonts } from "@/fonts/ecommerce-play";

export default function PlayLayout({ children }: { children: React.ReactNode }) {
  return <div className={`theme-ecommerce-play ${playFonts} min-h-dvh bg-bg font-sans text-fg`}>{children}</div>;
}
