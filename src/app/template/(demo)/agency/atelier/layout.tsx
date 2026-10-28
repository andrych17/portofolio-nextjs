import type { Metadata } from "next";
import { AtelierFooter } from "@/components/atelier/AtelierFooter";
import { AtelierHeader } from "@/components/atelier/AtelierHeader";
import { JsonLd } from "@/components/JsonLd";
import { atelier } from "@/content/atelier";
import { atelierFonts } from "@/fonts/atelier";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { template: `%s · ${atelier.name}`, default: atelier.name },
  description: atelier.description,
};

export default function AtelierLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-atelier atelier-grid ${atelierFonts} min-h-dvh bg-bg font-sans text-fg`}>
      <JsonLd data={[organizationSchema(atelier), websiteSchema(atelier)]} />
      <AtelierHeader />
      <main id="main">{children}</main>
      <AtelierFooter />
    </div>
  );
}
