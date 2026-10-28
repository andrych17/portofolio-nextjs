import { SectorView, sectorMetadata } from "@/components/gallery/SectorView";

export const metadata = sectorMetadata("ecommerce");

export default function Page() {
  return <SectorView slug="ecommerce" />;
}
