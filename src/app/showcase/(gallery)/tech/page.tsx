import { SectorView, sectorMetadata } from "@/components/gallery/SectorView";

export const metadata = sectorMetadata("tech");

export default function Page() {
  return <SectorView slug="tech" />;
}
