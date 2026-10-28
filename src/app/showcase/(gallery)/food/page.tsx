import { SectorView, sectorMetadata } from "@/components/gallery/SectorView";

export const metadata = sectorMetadata("food");

export default function Page() {
  return <SectorView slug="food" />;
}
