import "./theme.css";
import { FleetFooter } from "@/components/logistics/fleet/FleetFooter";
import { FleetHeader } from "@/components/logistics/fleet/FleetHeader";
import { fleetFonts } from "@/fonts/logistics-fleet";

export default function FleetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`theme-logistics-fleet ${fleetFonts} min-h-dvh bg-bg font-sans text-fg`}>
      <FleetHeader />
      <main id="main">{children}</main>
      <FleetFooter />
    </div>
  );
}
