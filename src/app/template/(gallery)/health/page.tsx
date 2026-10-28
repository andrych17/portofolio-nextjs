import { SectorView, sectorMetadata } from "@/components/gallery/SectorView";

export const metadata = sectorMetadata("health");

export default function Page() {
  return <SectorView slug="health" />;
}
