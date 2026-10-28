import { SectorView, sectorMetadata } from "@/components/gallery/SectorView";

export const metadata = sectorMetadata("logistics");

export default function Page() {
  return <SectorView slug="logistics" />;
}
