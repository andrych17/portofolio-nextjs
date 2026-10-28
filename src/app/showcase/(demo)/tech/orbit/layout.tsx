import "./theme.css";
import { OrbitFooter } from "@/components/tech/orbit/OrbitFooter";
import { OrbitHeader } from "@/components/tech/orbit/OrbitHeader";
import { orbitFonts } from "@/fonts/tech-orbit";

export default function OrbitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-tech-orbit ${orbitFonts} min-h-dvh bg-orbit-bg font-sans text-orbit-fg selection:bg-orbit-accent/30 selection:text-white`}>
      <OrbitHeader />
      <main id="main">{children}</main>
      <OrbitFooter />
    </div>
  );
}
