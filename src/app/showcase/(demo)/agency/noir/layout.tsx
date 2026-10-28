import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { NoirCursor } from "@/components/noir/NoirCursor";
import { NoirFooter } from "@/components/noir/NoirFooter";
import { NoirHeader } from "@/components/noir/NoirHeader";
import { noir } from "@/content/noir";
import { noirFonts } from "@/fonts/noir";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { template: `%s · ${noir.name}`, default: noir.name },
  description: noir.description,
};

export default function NoirLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-noir noir-grain ${noirFonts} min-h-dvh bg-bg font-sans text-fg`}>
      <JsonLd data={[organizationSchema(noir), websiteSchema(noir)]} />
      <NoirCursor />
      <NoirHeader />
      <main id="main">{children}</main>
      <NoirFooter />
    </div>
  );
}
