import "./theme.css";
import { JsonLd } from "@/components/JsonLd";
import { SaltFooter } from "@/components/fashion/salt/SaltFooter";
import { SaltHeader } from "@/components/fashion/salt/SaltHeader";
import { SaltShadeProvider } from "@/components/fashion/salt/SaltShade";
import { salt } from "@/content/fashion/salt";
import { saltFonts } from "@/fonts/fashion-salt";
import { businessSchema } from "@/lib/jsonld";

export default function SaltLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-fashion-salt ${saltFonts} min-h-dvh bg-bg font-sans text-fg transition-colors duration-300`}>
      <JsonLd
        data={businessSchema({
          type: "ClothingStore",
          path: salt.path,
          description: salt.description,
          email: salt.email,
          phone: salt.phone,
          street: salt.street,
          city: salt.city,
          postalCode: salt.postalCode,
          countryCode: salt.countryCode,
          services: ["Linen shirts and dresses", "Resort trousers", "Swimwear", "Free mending for life", "Styling calls"],
        })}
      />
      <SaltShadeProvider>
        <SaltHeader />
        <main id="main">{children}</main>
        <SaltFooter />
      </SaltShadeProvider>
    </div>
  );
}
