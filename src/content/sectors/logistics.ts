import type { TemplateMeta } from "@/lib/registry";

// Owned by the logistics agent. Add one entry per template you build (3 total).
export const logistics: TemplateMeta[] = [
  { sector: "logistics", slug: "freight", name: "Freight", tagline: "Global forwarder, live route map", description: "A deep navy global freight forwarder site with an animated route map, a shipment tracking widget, mode tabs for air, sea, road and rail, and live counters.", palette: ["#07142b", "#eaf0fa", "#ff4b1f"], motion: ["Animated route map", "Tracking timeline", "Horizontal lane cases", "Scroll-drawn process"], pages: 1 },
  { sector: "logistics", slug: "fleet", name: "Fleet", tagline: "Dedicated express road & cold-chain fleet", description: "An asset-owned motor carrier site with an interactive corridor transit calculator, telematics status feed, and instant lane rate requests.", palette: ["#f5f6f9", "#0f1722", "#e65100"], motion: ["Interactive lane transit calculator", "Clip-path highway reveals", "Telemetry stats counters", "Division capability cards"], pages: 1 },
  { sector: "logistics", slug: "forge", name: "Forge", tagline: "Engineered heavy haulage & project cargo", description: "An industrial dark titanium heavy transport template featuring multi-axle Goldhofer hydraulic configurations, interactive axle load calculator, and engineered rigging planning.", palette: ["#101317", "#f3f4f6", "#f59e0b"], motion: ["Interactive axle load calculator", "Hydraulic SPMT simulation", "Terminal laydown yard tracker", "Project cargo case carousel"], pages: 1 },
];
