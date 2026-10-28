import "./theme.css";
import { JsonLd } from "@/components/JsonLd";
import { StreetBagProvider } from "@/components/fashion/street/StreetBag";
import { StreetFooter } from "@/components/fashion/street/StreetFooter";
import { StreetHeader } from "@/components/fashion/street/StreetHeader";
import { street } from "@/content/fashion/street";
import { streetFonts } from "@/fonts/fashion-street";
import { businessSchema } from "@/lib/jsonld";

export default function StreetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-fashion-street ${streetFonts} min-h-dvh bg-bg font-sans text-fg`}>
      <JsonLd
        data={businessSchema({
          type: "ClothingStore",
          path: street.path,
          description: street.description,
          email: street.email,
          phone: street.phone,
          street: street.street,
          city: street.city,
          postalCode: street.postalCode,
          countryCode: street.countryCode,
          services: ["Limited streetwear drops", "Footwear", "Heavyweight basics", "Leather goods", "Wholesale for independent shops"],
        })}
      />
      <StreetBagProvider>
        <StreetHeader />
        <main id="main">{children}</main>
        <StreetFooter />
      </StreetBagProvider>
    </div>
  );
}
