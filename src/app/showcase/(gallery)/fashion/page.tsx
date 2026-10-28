import { SectorView, sectorMetadata } from "@/components/gallery/SectorView";

export const metadata = sectorMetadata("fashion");

export default function Page() {
  return <SectorView slug="fashion" />;
}
