import { SectorView, sectorMetadata } from "@/components/gallery/SectorView";

export const metadata = sectorMetadata("property");

export default function Page() {
  return <SectorView slug="property" />;
}
