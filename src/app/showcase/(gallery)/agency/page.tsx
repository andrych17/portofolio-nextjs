import { SectorView, sectorMetadata } from "@/components/gallery/SectorView";

export const metadata = sectorMetadata("agency");

export default function Page() {
  return <SectorView slug="agency" />;
}
