import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { KineticFooter } from "@/components/kinetic/KineticFooter";
import { KineticHeader } from "@/components/kinetic/KineticHeader";
import { kinetic } from "@/content/kinetic";
import { kineticFonts } from "@/fonts/kinetic";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { template: `%s · ${kinetic.name}`, default: kinetic.name },
  description: kinetic.description,
};

export default function KineticLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-kinetic ${kineticFonts} min-h-dvh overflow-x-clip bg-bg font-sans text-fg`}>
      <JsonLd data={[organizationSchema(kinetic), websiteSchema(kinetic)]} />
      <KineticHeader />
      <main id="main">{children}</main>
      <KineticFooter />
    </div>
  );
}
