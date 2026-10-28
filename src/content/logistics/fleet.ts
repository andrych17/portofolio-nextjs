// Photos: logistics road fleet set: aerial, bay, city, road, trails
import type { Faq, Stat } from "@/content/types";

const img = (name: string) => `/template/images/logistics/fleet/${name}.webp`;

export type FleetCapability = {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  capacity: string;
  tempRange: string;
  telematics: string;
  features: string[];
};

export type TransitLane = {
  origin: string;
  destination: string;
  distance: string;
  transitHours: string;
  departures: string;
  status: "High Capacity" | "Guaranteed Daily" | "Express Priority";
};

export const fleet = {
  key: "logistics/fleet",
  path: "/logistics/fleet",
  name: "Your Brand",
  tagline: "Dedicated express road & cold-chain fleet",
  title: "Your Brand | Dedicated Express Truckload & Cold-Chain Fleet",
  description:
    "Your Brand operates an asset-owned carrier fleet of four hundred satellite-monitored tractors delivering temperature-controlled and dry van highway freight.",
  answer:
    "Your Brand operates a dedicated carrier fleet of over four hundred temperature-monitored trucks delivering guaranteed next-day freight across regional industrial hubs.",
  street: "880 Freightway Boulevard",
  city: "Metro Logistics Park",
  postalCode: "00000",
  countryCode: "US",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  hours: [
    { days: "Central Dispatch Desk", time: "24 Hours / 7 Days a week" },
    { days: "Terminal Cross-Dock Gates", time: "05:00 to 23:00 Daily" },
  ],
  nav: [
    { href: "#capabilities", label: "Capabilities" },
    { href: "#lanes", label: "Transit Calculator" },
    { href: "#telematics", label: "Telematics" },
    { href: "#hubs", label: "Terminal Hubs" },
    { href: "#faq", label: "FAQ" },
    { href: "#quote", label: "Request Rate" },
  ],
  proof: [
    "450+ Asset-owned tractor units",
    "Sub-zero multi-zone reefer monitoring",
    "99.4% On-time delivery SLA",
    "Direct carrier with zero broker splits",
    "Live API sensor & GPS webhooks",
    "SmartWay certified low-emission fleet",
  ],
  manifesto:
    "Supply chains fail when freight is brokered into black holes. We own our trucks, employ our drivers, and monitor every trailer door and axle with live satellite telemetry. When you book capacity with us, you are speaking directly to the team holding the steering wheel.",
  heroImage: img("road"),
  heroAlt: "Long-haul highway tractor trailer cruising smoothly along open interstate corridor at dawn",
  capabilities: [
    {
      id: "cold-chain",
      name: "Pharmaceutical & Food Cold-Chain",
      tagline: "Multi-temperature reefer units from -25°C to +20°C",
      desc: "Continuous independent thermograph sensors log temperatures every three minutes with remote override alerts and pre-cooling verification.",
      capacity: "44,000 lbs max payload",
      tempRange: "-25°C to +20°C (Dual-Zone)",
      telematics: "Live NIST-calibrated temp stream",
      features: ["FSMA compliant sanitization", "Continuous temperature printout at receiver", "Backup generator fail-safes"],
    },
    {
      id: "dry-van",
      name: "High-Cube 53ft Air-Ride Dry Van",
      tagline: "High-security logistics-track dry freight",
      desc: "Air-ride suspension equipped with interior horizontal logistics tracks, roll-up security sensors and tamper-evident digital seals.",
      capacity: "46,500 lbs max payload",
      tempRange: "Ambient dry freight",
      telematics: "Door-open satellite alerts",
      features: ["E-track load bars & tie-offs", "Reinforced hardwood flooring", "Smooth interior scuff-liners"],
    },
    {
      id: "team-expedited",
      name: "Non-Stop Two-Driver Team Transit",
      tagline: "Coast-to-coast delivery within 44 continuous hours",
      desc: "Two vetted CDL-A drivers operating in shifts to keep your mission-critical or high-value freight moving non-stop without overnight terminal layovers.",
      capacity: "Full truckload priority",
      tempRange: "Dry or refrigerated options",
      telematics: "15-minute driver milestone pings",
      features: ["Geofenced route compliance", "Immediate priority terminal cross-docking", "Dedicated account dispatcher"],
    },
    {
      id: "dedicated-contract",
      name: "Private Dedicated Fleet Operations",
      tagline: "Branded trucks and trailers exclusively for your enterprise",
      desc: "Contract capacity models providing guaranteed daily equipment allocation, custom liveried trailers, and integrated yard management.",
      capacity: "Scalable 5 to 50 dedicated units",
      tempRange: "Customized to customer cargo",
      telematics: "Custom enterprise TMS integration",
      features: ["Guaranteed surge capacity buffers", "Fixed quarterly cost modeling", "On-site dispatch liaison"],
    },
  ] satisfies FleetCapability[],
  lanes: [
    { origin: "Chicago, IL", destination: "Dallas, TX", distance: "925 mi", transitHours: "18 hrs (Solo) / 14 hrs (Team)", departures: "4x Daily Scheduled", status: "Guaranteed Daily" },
    { origin: "Los Angeles, CA", destination: "Phoenix, AZ", distance: "375 mi", transitHours: "6.5 hrs Direct Express", departures: "6x Daily Scheduled", status: "High Capacity" },
    { origin: "Atlanta, GA", destination: "Newark, NJ", distance: "865 mi", transitHours: "16 hrs (Solo) / 13 hrs (Team)", departures: "3x Daily Scheduled", status: "Express Priority" },
    { origin: "Dallas, TX", destination: "Los Angeles, CA", distance: "1,435 mi", transitHours: "26 hrs (Team Transit)", departures: "2x Daily Scheduled", status: "Guaranteed Daily" },
  ] satisfies TransitLane[],
  stats: [
    { value: 450, suffix: "+", label: "Company-owned modern highway tractors in active service" },
    { value: 99.4, suffix: "%", label: "On-time delivery record maintained across all major corridors" },
    { value: 8, suffix: " min", label: "Average rate quote and capacity confirmation response" },
    { value: 0, label: "Brokered handoffs—we haul every mile on our own authority" },
  ] satisfies Stat[],
  faqs: [
    {
      q: "Are all shipments hauled exclusively by company-employed drivers?",
      a: "Yes. We operate as an asset-based motor carrier. We do not re-broker your freight to unknown third-party carriers or spot-market load boards, eliminating double-brokering security risks.",
    },
    {
      q: "How do you verify and document temperature integrity for cold-chain loads?",
      a: "Our reefers carry calibrated digital thermographs that transmit data every three minutes to our dispatch center. Drivers provide a full time-stamped temperature graph printout directly at the receiver dock.",
    },
    {
      q: "Can customers access live GPS tracking and estimated arrival times?",
      a: "Yes. Every client receives a secure tracking link upon dispatch, displaying live satellite coordinates, trailer interior temperature, door status, and predictive AI estimated arrival calculations.",
    },
    {
      q: "What safety ratings and insurance coverage do you maintain?",
      a: "We maintain a Satisfactory safety rating with the Federal Motor Carrier Safety Administration (FMCSA), backed by $10 million in primary liability coverage and $500,000 standard cargo insurance per load.",
    },
    {
      q: "Do you offer drop-and-hook trailer spotting at distribution centers?",
      a: "Yes. For high-volume manufacturing facilities and retail distribution hubs, we provide drop trailer pools to eliminate driver wait times and streamline live warehouse loading.",
    },
    {
      q: "What is your protocol if a mechanical delay occurs on the highway?",
      a: "Our 24/7 internal maintenance command center coordinates with mobile service response trucks stationed along every primary interstate corridor, supported by backup replacement tractors within sixty miles.",
    },
  ] satisfies Faq[],
  testimonials: [
    {
      quote:
        "Switching our temperature-sensitive produce from brokers to Your Brand cut our cargo spoilage claims to zero. The live sensor feed gives our inventory managers complete peace of mind.",
      author: "Robert Kowalski",
      role: "VP Supply Chain, National Grocers",
    },
    {
      quote:
        "Their expedited two-driver teams moved our automotive components from Michigan to Texas without a single minute of delay. Direct communication with actual dispatchers makes all the difference.",
      author: "Sarah Henderson",
      role: "Logistics Director, Precision Auto Parts",
    },
  ],
};
