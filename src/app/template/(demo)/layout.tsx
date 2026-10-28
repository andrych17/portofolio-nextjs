import type { Metadata } from "next";
import { DemoBar } from "@/components/gallery/DemoBar";

// Demo pages hold fictional "Your Brand" copy. Keep them out of the index; the gallery and sector pages carry the SEO.
export const metadata: Metadata = { robots: { index: false, follow: true } };

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <DemoBar />
    </>
  );
}
