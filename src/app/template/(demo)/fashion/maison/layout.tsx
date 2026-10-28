import "./theme.css";
import { JsonLd } from "@/components/JsonLd";
import { MaisonFooter } from "@/components/fashion/maison/MaisonFooter";
import { MaisonHeader } from "@/components/fashion/maison/MaisonHeader";
import { maison } from "@/content/fashion/maison";
import { maisonFonts } from "@/fonts/fashion-maison";
import { businessSchema } from "@/lib/jsonld";

export default function MaisonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-fashion-maison ${maisonFonts} min-h-dvh bg-bg font-sans text-fg`}>
      <JsonLd
        data={businessSchema({
          type: "ClothingStore",
          path: maison.path,
          description: maison.description,
          email: maison.email,
          phone: maison.phone,
          street: maison.street,
          city: maison.city,
          postalCode: maison.postalCode,
          countryCode: maison.countryCode,
          services: ["Made-to-measure tailoring", "Ready-to-wear", "Knitwear", "Garment repair", "Private styling"],
        })}
      />
      <MaisonHeader />
      <main id="main">{children}</main>
      <MaisonFooter />
    </div>
  );
}
