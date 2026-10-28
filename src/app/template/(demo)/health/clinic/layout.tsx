import "./theme.css";
import type { Metadata } from "next";
import { ClinicFooter } from "@/components/health/clinic/ClinicFooter";
import { ClinicHeader } from "@/components/health/clinic/ClinicHeader";
import { clinic } from "@/content/health/clinic";
import { clinicFonts } from "@/fonts/health-clinic";

export const metadata: Metadata = { description: clinic.description };

export default function ClinicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-health-clinic ${clinicFonts} min-h-dvh bg-bg font-sans text-fg`}>
      <ClinicHeader />
      <main id="main">{children}</main>
      <ClinicFooter />
    </div>
  );
}
