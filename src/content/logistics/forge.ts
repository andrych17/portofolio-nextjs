// Photos: logistics heavy industrial forge set: hall, lattice, plant, tools, truss
import type { Faq, Stat } from "@/content/types";

const img = (name: string) => `/template/images/logistics/forge/${name}.webp`;

export type IndustrialCapability = {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  maxWeight: string;
  equipment: string;
  engineering: string;
  highlights: string[];
};

export type ProjectCase = {
  title: string;
  payload: string;
  weight: string;
  route: string;
  equipment: string;
  image: string;
  alt: string;
};

export const forge = {
  key: "logistics/forge",
  path: "/logistics/forge",
  name: "Your Brand",
  tagline: "Heavy haulage & project cargo logistics",
  title: "Your Brand | Engineered Heavy Haul & Project Cargo Logistics",
  description:
    "Your Brand delivers engineered heavy-haul transport, multi-axle platform trailers, crane rigging and superload route engineering across North America.",
  answer:
    "Your Brand provides engineered heavy-haul transport, multi-axle modular trailers, crane rigging and super-load route surveying for industrial machinery and energy infrastructure.",
  street: "420 Industrial Pkwy, Berth 18",
  city: "Ironport Terminal",
  postalCode: "00000",
  countryCode: "US",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  hours: [
    { days: "Engineering Command Center", time: "24 Hours / 7 Days a week" },
    { days: "Terminal Rigging Yard", time: "06:00 to 22:00 Daily" },
  ],
  nav: [
    { href: "#capabilities", label: "Capabilities" },
    { href: "#calculator", label: "Axle Calculator" },
    { href: "#projects", label: "Project Cargo" },
    { href: "#rigging", label: "Rigging Yard" },
    { href: "#faq", label: "FAQ" },
    { href: "#quote", label: "Engineered Quote" },
  ],
  proof: [
    "600+ Ton Goldhofer hydraulic platform capacity",
    "Self-propelled modular transporters (SPMT)",
    "Certified PE bridge structural stress modeling",
    "Turnkey utility wire and police escort permits",
    "Heavy-lift dual gantry and crane tandem lifts",
    "Deepwater roll-on/roll-off barge transloading",
  ],
  manifesto:
    "When cargo exceeds standard highway tolerances, transport becomes civil engineering. We simulate bridge shear stresses, analyze turning radiuses down to the centimeter, and design custom multi-axle modular configurations to move multi-million dollar machinery safely to foundation.",
  heroImage: img("truss"),
  heroAlt: "Massive industrial steel truss framework illuminated under work lights during nighttime transport prep",
  capabilities: [
    {
      id: "modular-spmt",
      name: "Hydraulic Multi-Axle & SPMT Transport",
      tagline: "Self-propelled electronic steering platforms",
      desc: "Synchronized Goldhofer and Scheuerle hydraulic platform trailers capable of 360-degree carousel steering and millimeter-accurate foundation positioning.",
      maxWeight: "Up to 1,200 Tons combined",
      equipment: "SPMT 48-axle lines + Power Pack Units",
      engineering: "3D CAD swept-path & turning simulation",
      highlights: ["Wireless belly-pack remote operation", "Hydraulic three-point suspension leveling", "Zero ground distortion loading"],
    },
    {
      id: "power-energy",
      name: "Power Generation & Turbines",
      tagline: "Generator stators, transformers & wind blades",
      desc: "Comprehensive logistics for utility substations, nuclear facilities, and wind farms. Specialized girder frames and dual-drop vessel decks.",
      maxWeight: "Up to 550 Tons single piece",
      equipment: "Dual-lane schnabel & high-girder frames",
      engineering: "DOT multi-state superload permitting",
      highlights: ["Clearance lidar route surveys", "Bridge reinforcement plate installation", "Police escort coordination"],
    },
    {
      id: "industrial-rigging",
      name: "Heavy Industrial Crane & Gantry Rigging",
      tagline: "Hydraulic gantry jacking, skidding & tandem lifts",
      desc: "Internal plant rigging through low-headroom doorways. We jack, slide and rotate heavy stamp presses, autoclaves and refinery vessels onto foundations.",
      maxWeight: "Up to 800 Tons jacking capacity",
      equipment: "Enerpac hydraulic gantries & slide tracks",
      engineering: "Engineered rigging plans with PE stamp",
      highlights: ["Confined-space indoor jacking", "Precision optical leveling alignment", "Turnkey foundation anchoring"],
    },
    {
      id: "intermodal-barge",
      name: "Rail, Ocean & Ro-Ro Barge Transload",
      tagline: "Seamless multimodal water-to-highway logistics",
      desc: "Direct roll-on roll-off ramp access at our private port terminal. Heavy cargo transfers between deepwater barges, heavy-duty railcars, and highway transporters.",
      maxWeight: "Unlimited barge displacement",
      equipment: "Private 1,000-ton ro-ro bulkhead",
      engineering: "Ballast pump & tidal drift calculations",
      highlights: ["Tide-compensated ramp bridge", "Secured 20-acre outdoor heavy laydown", "On-site maritime surveyors"],
    },
  ] satisfies IndustrialCapability[],
  projects: [
    {
      title: "Combined Cycle Gas Turbine Stator",
      payload: "Industrial Siemens SGT6-5000F Stator",
      weight: "385 Tons",
      route: "Great Lakes Port to Ohio Valley Power Station (140 Miles)",
      equipment: "24-Axle Goldhofer Dual-Lane Platform with 2x Western Star Pushers",
      image: img("plant"),
      alt: "Industrial manufacturing plant with heavy steel reactors and piping",
    },
    {
      title: "Automotive Stamping Press Crown",
      payload: "Monolithic Cast Steel Stamping Crown",
      weight: "260 Tons",
      route: "Detroit Rail Siding into Assembly Plant Clean Bay",
      equipment: "Hydraulic Gantry Jacking System & Self-Propelled Roll Skids",
      image: img("hall"),
      alt: "Vast industrial manufacturing hall with heavy overhead cranes and concrete foundations",
    },
  ] satisfies ProjectCase[],
  stats: [
    { value: 600, suffix: "+ T", label: "Maximum single-piece road transport capacity" },
    { value: 100, suffix: "%", label: "Bridge stress and turn sweep engineering approval" },
    { value: 25, label: "Registered Professional Engineers & certified master riggers" },
    { value: 0, label: "Bridge structural or foundation incidents in company history" },
  ] satisfies Stat[],
  faqs: [
    {
      q: "What defines a superload requiring engineered transport?",
      a: "Generally, any load exceeding 16 feet in width, 16 feet in height, 150 feet in length, or 200,000 lbs gross vehicle weight requires specialized multi-axle configurations, bridge engineering stress analysis, and municipal police escorts.",
    },
    {
      q: "How long does the superload route permitting process take?",
      a: "Routine overweight permits take three to five business days. Superloads requiring bridge structural calculations, utility line lifts, and railway crossing approvals typically require four to eight weeks of advance engineering.",
    },
    {
      q: "Do you supply licensed Professional Engineers (PE) for rigging plans?",
      a: "Yes. Our internal engineering department includes licensed structural and mechanical PEs who generate stamped lift calculations, rigging sling angle charts, and foundation load distribution plans.",
    },
    {
      q: "Can you manage indoor plant rigging with low ceiling clearances?",
      a: "Yes. Our hydraulic gantry systems and hydraulic skate tracks operate in spaces where conventional cranes cannot fit, allowing us to roll, jack, and set multi-hundred ton machines inside active manufacturing plants.",
    },
    {
      q: "What insurance coverage is provided for multi-million dollar machinery?",
      a: "We carry $25 million in primary riggers and motor carrier liability, with custom excess umbrella policies up to $100 million per single project cargo shipment.",
    },
    {
      q: "What is your terminal laydown and storage capacity?",
      a: "Our Ironport Terminal features twenty acres of reinforced concrete heavy-duty outdoor laydown and a climate-controlled 80,000 sq ft high-bay warehouse equipped with dual 60-ton overhead bridge cranes.",
    },
  ] satisfies Faq[],
  testimonials: [
    {
      quote:
        "Moving our 380-ton turbine across two states required coordinating eleven utility districts and forty bridge stress tests. Your Brand delivered onto our foundation four hours ahead of schedule.",
      author: "Douglas Reed",
      role: "Project Director, Apex Energy Infrastructure",
    },
    {
      quote:
        "Their indoor hydraulic gantry crew placed our 200-ton stamping press with sub-millimeter precision without disrupting ongoing vehicle production on the adjacent bay.",
      author: "Kenji Takahashi",
      role: "Plant Operations Manager, Global Motor Works",
    },
  ],
};
