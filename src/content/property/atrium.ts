// Photos: no picsum ids on record (the twelve files in public/images/property/atrium were added before this file was written)
import type { Faq, Stat, Testimonial } from "@/content/types";

const img = (name: string) => `/template/images/property/atrium/${name}.webp`;

export type FloorState = "open" | "full" | "shared";

export const atrium = {
  key: "property/atrium",
  path: "/property/atrium",
  name: "Your Brand",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  street: "12 Lantern Row",
  city: "Northquay",
  postalCode: "00000",
  countryCode: "GB",
  country: "United Kingdom",
  hours: ["Viewings: Monday to Friday, 8:00 to 18:00", "Saturday viewings by appointment, 9:00 to 13:00"],
  title: "Your Brand | Offices and Studios in the City Centre",
  description:
    "Your Brand manages 14 city-centre buildings with offices, studios and ground-floor shops on flexible leases, and a station seven minutes' walk away on average.",
  answer:
    "Your Brand owns and manages fourteen buildings in the city centre and leases offices, studios and ground-floor shops to small and mid-size teams, from six months and with every service included in the rent.",
  hero: {
    src: img("canyon"),
    alt: "Looking straight up between four glass office towers to a pale sky",
  },
  manifesto:
    "A building should be good to walk through even if you never rent a desk in it. So we keep the lobbies open, put a café on every ground floor and leave the light well in the middle where the architect drew it. Tenants tell us the difference is mostly that people stay for lunch.",
  facts: [
    { k: "Founded", v: "2006" },
    { k: "Buildings", v: "14 in the centre" },
    { k: "Leases from", v: "6 months" },
    { k: "Walk to a station", v: "7 min average" },
  ],
  aboutImages: [
    { src: img("steps"), alt: "A pale stone embankment stairway beside the water with two figures sitting on the steps" },
    { src: img("window"), alt: "A black-framed window grid looking out onto spring trees" },
  ],
  strip: [
    "Offices from 18 m²",
    "Six-month leases",
    "Service charge included",
    "Fibre on day one",
    "Roof terraces",
    "Secure bike stores",
    "Step-free entrances",
    "A café on every ground floor",
  ],
  lightwell: {
    src: img("shaft"),
    alt: "Looking up a green-draped atrium to a bright square of sky",
    lines: ["Every building has", "a void in its middle.", "We keep it open."],
    note: "Light wells, atriums and courtyards stay unleased. They cost us 6% of lettable area, and in the tenant survey they are the most common reason people renew.",
  },
  buildings: [
    {
      n: "01",
      name: "The Cartwright",
      kind: "Glass tower",
      district: "Financial Row",
      floors: 24,
      size: "38,000 m²",
      spaces: "Offices from 40 m²",
      status: "2 floors open",
      open: true,
      image: img("tower"),
      alt: "A glass tower seen from the pavement, its facade lines converging toward the sky",
    },
    {
      n: "02",
      name: "Station Row",
      kind: "Transit hall",
      district: "Central Station",
      floors: 6,
      size: "21,500 m²",
      spaces: "Suites and shops",
      status: "Waitlist",
      open: false,
      image: img("station"),
      alt: "A dark station concourse with two escalators and warm strip lights running toward a glass wall",
    },
    {
      n: "03",
      name: "Quay House",
      kind: "Waterfront block",
      district: "Old Harbour",
      floors: 9,
      size: "14,200 m²",
      spaces: "Offices and a café",
      status: "1 floor open",
      open: true,
      image: img("deck"),
      alt: "A timber boardwalk with two benches beside calm harbour water",
    },
    {
      n: "04",
      name: "Lantern Works",
      kind: "1960s refurbishment",
      district: "Cannery Lane",
      floors: 7,
      size: "11,800 m²",
      spaces: "Studios from 18 m²",
      status: "5 studios open",
      open: true,
      image: img("facade"),
      alt: "A weathered concrete facade with a patchwork of small windows",
    },
    {
      n: "05",
      name: "The Lightwell",
      kind: "Courtyard block",
      district: "Marlow Yard",
      floors: 12,
      size: "19,600 m²",
      spaces: "Full floors",
      status: "Opens 2027",
      open: false,
      image: img("shaft"),
      alt: "Looking up a green-draped atrium to a bright square of sky",
    },
    {
      n: "06",
      name: "Foggate Steps",
      kind: "Mixed use",
      district: "Foggate",
      floors: 5,
      size: "6,400 m²",
      spaces: "Shops and small offices",
      status: "1 shop open",
      open: true,
      image: img("stairs"),
      alt: "A wide stone staircase rising into mist between old buildings",
    },
  ],
  stack: {
    building: "The Cartwright",
    floors: [
      {
        level: "Roof",
        name: "Roof terrace",
        use: "Shared by every tenant",
        size: "900 m²",
        status: "Shared",
        state: "shared",
        rent: "Included",
        note: "Open from 7:00 to 22:00 with a kitchen garden and fire pits. Tenants can book it for events at no charge.",
      },
      {
        level: "L20 to L23",
        name: "Sky floors",
        use: "Full-floor offices",
        size: "1,400 m² each",
        status: "2 of 4 open",
        state: "open",
        rent: "$64 per m² a month",
        note: "Open plan with 3.4 m ceilings and a corner terrace on every floor. Fit-out allowance up to $120 per m².",
      },
      {
        level: "L14 to L19",
        name: "Team floors",
        use: "Offices, 150 to 700 m²",
        size: "Six floors",
        status: "Fully let",
        state: "full",
        rent: "Waitlist open",
        note: "Mid-size teams, most of them on their second lease with us. The waitlist moves about four times a year.",
      },
      {
        level: "L08 to L13",
        name: "Studio floors",
        use: "Small offices, 40 to 150 m²",
        size: "Thirty-one suites",
        status: "3 suites open",
        state: "open",
        rent: "$71 per m² a month",
        note: "Glass-fronted suites on a central corridor, with six-month terms and a one-page lease.",
      },
      {
        level: "L04 to L07",
        name: "Maker floors",
        use: "Workshops and studios",
        size: "4.2 m ceilings",
        status: "1 suite open",
        state: "open",
        rent: "$58 per m² a month",
        note: "A goods lift, floor loading for light machinery and a loading bay shared with the café below.",
      },
      {
        level: "L02 to L03",
        name: "Shared floors",
        use: "Meeting rooms and a quiet room",
        size: "Twelve rooms",
        status: "Shared",
        state: "shared",
        rent: "Hours included",
        note: "Bookable by the hour from your phone. Every tenant gets a monthly allowance, and extra hours cost $12.",
      },
      {
        level: "L01",
        name: "Ground floor",
        use: "Café, shop and reception",
        size: "1,100 m²",
        status: "Fully let",
        state: "full",
        rent: "Street-level rents",
        note: "Open to the public. A café, a bakery counter and a florist hold the lowest rents in the building on purpose.",
      },
      {
        level: "B1 and B2",
        name: "Bikes and plant",
        use: "Bike store and showers",
        size: "300 bike spaces",
        status: "Shared",
        state: "shared",
        rent: "Included",
        note: "Secure bike store, drying room, lockers and showers for 40 people. No car parking, by design.",
      },
    ] satisfies {
      level: string;
      name: string;
      use: string;
      size: string;
      status: string;
      state: FloorState;
      rent: string;
      note: string;
    }[],
  },
  ground: {
    items: [
      { src: img("cafe"), alt: "Silhouettes of people at long tables in a bright café with tall windows and pendant lamps", caption: "Café, Quay House", note: "Open to the street from 7:00." },
      { src: img("bench"), alt: "A green park bench in front of a whitewashed wall with an anchor plaque", caption: "Courtyard bench, Marlow Yard", note: "One of forty, all repaired in-house." },
      { src: img("tunnel"), alt: "A dark underpass opening onto a sunlit city street", caption: "Service lane, Station Row", note: "Lit and cleaned like the lobby." },
    ],
    tally: [
      { value: 14, label: "Cafés on ground floors" },
      { value: 40, label: "Public benches we maintain" },
      { value: 0, label: "Locked lobbies" },
    ],
  },
  stats: [
    { value: 14, label: "Buildings in the city centre" },
    { value: 190, suffix: "k", label: "Square metres under management" },
    { value: 94, suffix: "%", label: "Average occupancy over five years" },
    { value: 7, suffix: " min", label: "Average walk to a station" },
  ] satisfies Stat[],
  process: [
    {
      n: "01",
      title: "Tell us about the team",
      time: "Day 1",
      body: "Send headcount, desks and a move date. You get up to three matching floors with real prices back within a working day, not a brochure.",
      outputs: ["Shortlist of three", "Price per m²"],
    },
    {
      n: "02",
      title: "Walk the floor",
      time: "Week 1",
      body: "A viewing with the building manager, not a salesperson. If you ask to see the plant room or the roof, we open the door.",
      outputs: ["Private viewing", "Floor plan with services"],
    },
    {
      n: "03",
      title: "Agree the terms",
      time: "Week 2",
      body: "One page covering rent, term, break clause and deposit. Service charge sits inside the rent, so the number does not move after you sign.",
      outputs: ["One-page terms", "Fit-out allowance"],
    },
    {
      n: "04",
      title: "Move in",
      time: "Weeks 3 to 6",
      body: "Keys, fibre and a building induction on the first morning. Our fit-out crew can finish a small suite in ten working days.",
      outputs: ["Fibre live on day one", "Ten-day fit-out", "Named building manager"],
    },
  ],
  testimonials: [
    {
      quote:
        "We outgrew two floors in three years and never had to move out. The building manager opened the next suite and swapped the keys on a Friday afternoon.",
      name: "Maren",
      role: "Co-founder, architecture practice",
    },
    {
      quote: "Candidates ask about the roof terrace before they ask about salary.",
      name: "Joss",
      role: "Head of people, design agency",
    },
    {
      quote:
        "Service charge sits inside the rent. We learned what that was worth the year they replaced both lifts and our invoice stayed exactly where it was.",
      name: "Priya",
      role: "Practice manager, physiotherapy clinic",
    },
  ] satisfies Testimonial[],
  faqs: [
    {
      q: "What is the shortest lease you offer?",
      a: "Six months for suites under 150 m² in most of our buildings. Full floors start at three years with a break clause at the end of year two, and the break is written on the first page of the terms.",
    },
    {
      q: "What does the rent include?",
      a: "Rent covers service charge, property taxes, utilities, cleaning, building fibre, reception and use of the shared floors. You pay separately for your own phone lines and for meeting-room hours beyond your monthly allowance.",
    },
    {
      q: "Can we change the layout of our suite?",
      a: "Yes. Every suite carries a fit-out allowance of up to $120 per m², and our own crew builds partitions, kitchenettes and cabling in about ten working days. Joinery and partitions stay for the next tenant unless you ask us to remove them.",
    },
    {
      q: "Can we take more space later?",
      a: "Usually. We hold a few suites back on each floor for growth, so a team that doubles can move next door, often in the same building, without a new deposit.",
    },
    {
      q: "Are the buildings step-free and bike friendly?",
      a: "All fourteen buildings have step-free entrances and lifts to every floor. Each has a secure bike store with showers, and eleven allow dogs on the upper floors by agreement with neighbouring tenants.",
    },
    {
      q: "How do viewings work?",
      a: "Book any weekday between 8:00 and 18:00, or a Saturday morning. A building manager meets you in the lobby and walks you through the floor you asked about, plus one you did not.",
    },
  ] satisfies Faq[],
  viewing: {
    types: ["Studio or single desk", "Small office, under 150 m²", "Team floor, 150 to 700 m²", "Full floor", "Ground-floor shop or café"],
    sizes: ["1 to 5 people", "6 to 20 people", "21 to 60 people", "More than 60"],
    timelines: ["This month", "In 1 to 3 months", "In 3 to 6 months", "Just looking"],
  },
  nav: [
    { label: "Buildings", href: "#buildings", level: "L04" },
    { label: "Floors", href: "#floors", level: "L05" },
    { label: "Street level", href: "#street", level: "L07" },
    { label: "Leasing", href: "#leasing", level: "L08" },
  ],
};
