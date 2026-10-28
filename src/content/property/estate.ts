// Photos: picsum ids 116, 142, 193, 164, 1081, 1076, 49, 1065, 42, 311, 305, 128, 398, 369
import type { Faq, Stat, Testimonial } from "@/content/types";

const img = (name: string) => `/template/images/property/estate/${name}.webp`;

export type ListingType = "Villa" | "Townhouse" | "Apartment" | "Estate";
export type ListingArea = "Hillcrest" | "Old Harbour" | "Lakeside" | "City Centre";

export type Listing = {
  id: string;
  name: string;
  type: ListingType;
  area: ListingArea;
  price: number;
  beds: number;
  baths: number;
  size: number;
  image: string;
  alt: string;
  blurb: string;
};

export const listingTypes: ListingType[] = ["Villa", "Townhouse", "Apartment", "Estate"];
export const listingAreas: ListingArea[] = ["Hillcrest", "Old Harbour", "Lakeside", "City Centre"];

export const listings: Listing[] = [
  {
    id: "cypress-villa",
    name: "Cypress Villa",
    type: "Villa",
    area: "Hillcrest",
    price: 4850000,
    beds: 5,
    baths: 4,
    size: 612,
    image: img("hero"),
    alt: "A stone villa on a hillside at golden hour, with a line of cypress trees leading up to the entrance",
    blurb: "Limestone walls, a south terrace and an olive grove that comes with the land.",
  },
  {
    id: "long-gallery",
    name: "The Long Gallery",
    type: "Estate",
    area: "Hillcrest",
    price: 9200000,
    beds: 9,
    baths: 8,
    size: 1840,
    image: img("long-gallery"),
    alt: "A grand stone manor with turrets at the end of a straight gravel drive under a cloudy sky",
    blurb: "A restored manor with a 40 metre gallery, staff wing and eleven acres.",
  },
  {
    id: "lawn-house",
    name: "Lawn House",
    type: "Estate",
    area: "Lakeside",
    price: 6400000,
    beds: 7,
    baths: 6,
    size: 1260,
    image: img("lawn-house"),
    alt: "A long gothic-style stone house behind a freshly mown striped lawn",
    blurb: "Collegiate stonework, a walled kitchen garden and a boat house on the water.",
  },
  {
    id: "canal-terrace",
    name: "Canal Terrace",
    type: "Townhouse",
    area: "Old Harbour",
    price: 2350000,
    beds: 4,
    baths: 3,
    size: 286,
    image: img("canal-terrace"),
    alt: "A row of tall pastel townhouses along a canal with small boats moored in front",
    blurb: "Four floors on the water, with a private mooring and a roof terrace.",
  },
  {
    id: "whitewash-penthouse",
    name: "The Whitewash Penthouse",
    type: "Apartment",
    area: "City Centre",
    price: 1900000,
    beds: 3,
    baths: 2,
    size: 214,
    image: img("penthouse"),
    alt: "A white stepped apartment building seen from below against a pale sky",
    blurb: "Top two floors of The Lantern, with a wraparound terrace and a lift to the door.",
  },
  {
    id: "timber-tower",
    name: "Timber Tower Residence",
    type: "Apartment",
    area: "City Centre",
    price: 1150000,
    beds: 2,
    baths: 2,
    size: 138,
    image: img("timber-tower"),
    alt: "A tall building clad in timber fins photographed from the street looking straight up",
    blurb: "Floor 14, oak joinery throughout and a concierge on the ground floor.",
  },
  {
    id: "aegean-house",
    name: "Terrace House",
    type: "Villa",
    area: "Lakeside",
    price: 3100000,
    beds: 4,
    baths: 4,
    size: 398,
    image: img("aegean"),
    alt: "White cube houses stacked on a hillside with a windmill and the sea behind them",
    blurb: "Whitewashed volumes stepping down to the water, with a plunge pool on each level.",
  },
  {
    id: "lane-house",
    name: "Lane House",
    type: "Townhouse",
    area: "Old Harbour",
    price: 1620000,
    beds: 3,
    baths: 2,
    size: 204,
    image: img("lane-house"),
    alt: "A narrow stone lane between old houses opening onto a view of the sea",
    blurb: "A quiet stone house at the end of a lane, forty steps from the water.",
  },
];

export const estate = {
  name: "Your Brand",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  street: "12 Linden Court",
  city: "Brookmere",
  postalCode: "00000",
  countryCode: "US",
  country: "United States",
  hours: ["Monday to Saturday, 9:00 to 18:00", "Sunday by appointment"],
  title: "Your Brand | Luxury Homes and Private Estates for Sale",
  description:
    "Your Brand is a luxury property developer and sales agency. Browse villas, townhouses and apartments, run the numbers and book a private viewing.",
  answer:
    "Your Brand develops and sells luxury villas, townhouses and apartments, and advises private buyers and investors from the first viewing to the day the keys change hands.",
  about: {
    manifesto:
      "We build fewer homes than we could. Each one gets a site we have walked in every season, an architect who lives nearby, and materials that will look better in thirty years than they do on handover day.",
    facts: [
      { k: "Founded", v: "2011" },
      { k: "Delivered", v: "38 homes" },
      { k: "Aftercare", v: "In house" },
    ],
    imageA: { src: img("about-a"), alt: "A balcony table with a glass vase of greenery and trees beyond the railing" },
    imageB: { src: img("about-b"), alt: "A wooden chair beside a curtained window with the sea beyond" },
  },
  stripWords: ["Villas", "Townhouses", "Apartments", "Private estates", "Off-market homes", "Land with views"],
  tour: {
    heading: "Walk the house before you drive there.",
    body: "Pick a room and drag to look around. The full tour covers every floor of Cypress Villa and takes about nine minutes.",
    rooms: [
      { id: "dining", label: "Dining room", src: img("room-dining"), alt: "A long wooden dining table by a window, with a cup of coffee and chairs along the side" },
      { id: "study", label: "Study", src: img("room-study"), alt: "A quiet study with a wooden chair beside a curtained window and sea beyond" },
      { id: "terrace", label: "Terrace", src: img("room-terrace"), alt: "Terrace balcony with a table, a vase of greenery and trees beyond the rail" },
      { id: "view", label: "Garden view", src: img("room-view"), alt: "A wide lake with mountains in soft haze, seen across tall reeds" },
    ],
  },
  finance: {
    heading: "Run the numbers first.",
    body: "Slide the price, deposit, term and rate to see a monthly installment. It takes ten seconds and no email address.",
    note: "Indicative only. This is not a loan offer, and your lender sets the final terms.",
  },
  developments: [
    {
      name: "Cypress Ridge",
      units: "12 villas",
      area: "Hillcrest",
      status: "Delivered 2024",
      image: img("dev-ridge"),
      alt: "Stone villa on a hill with a row of cypress trees",
      body: "Twelve villas on a single ridge, each with its own olive terrace and no neighbour in sight.",
    },
    {
      name: "Harbour Row",
      units: "18 townhouses",
      area: "Old Harbour",
      status: "Delivered 2025",
      image: img("dev-harbour"),
      alt: "A street of old stone buildings with shuttered windows",
      body: "Eighteen narrow houses on the old customs quay, built in reclaimed brick and lime render.",
    },
    {
      name: "The Lantern",
      units: "46 apartments",
      area: "City Centre",
      status: "Completing 2027",
      image: img("dev-lantern"),
      alt: "A tall apartment street with iron balconies on both sides",
      body: "Forty-six apartments with deep balconies, a roof garden and parking under the courtyard.",
    },
    {
      name: "Lakeshore Gardens",
      units: "9 estates",
      area: "Lakeside",
      status: "Launching 2027",
      image: img("dev-lakeshore"),
      alt: "A calm lake with distant mountains and reeds in the foreground",
      body: "Nine houses on two-acre plots with water frontage. Registration of interest is open now.",
    },
  ],
  stats: [
    { value: 38, label: "Homes delivered since 2011" },
    { value: 14, suffix: " yrs", label: "Of building in the same four districts" },
    { value: 96, suffix: "%", label: "Sold before the keys were handed over" },
    { value: 940, prefix: "$", suffix: "M", label: "In completed sales" },
  ] satisfies Stat[],
  process: [
    { title: "Private viewing", body: "We meet you at the property, never in a showroom. Bring your questions and your architect if you have one." },
    { title: "Reserve", body: "A refundable deposit takes the home off the market for 14 days while you read the contract and the survey." },
    { title: "Contract and finance", body: "Our legal team and your lawyer agree terms. We introduce lenders if you want options, and step back if you do not." },
    { title: "Build or handover", body: "Finished homes complete in about six weeks. Off-plan homes get monthly site visits and photo reports." },
    { title: "Move in, then aftercare", body: "A named contact, a snagging round at 30 days and a free service visit at the end of year one." },
  ],
  testimonials: [
    {
      quote:
        "We saw four houses in a weekend and only one felt finished in the right way. They did not rush us, and the survey notes were better than our own surveyor's.",
      name: "Hannah and Luka",
      role: "Bought Canal Terrace",
    },
    {
      quote:
        "I bought off-plan from another country. The monthly photo reports meant I never once wondered what was happening on site.",
      name: "Omar",
      role: "Bought at The Lantern",
    },
    {
      quote:
        "Eleven months after we moved in, a window seal failed. Someone was at the door in two days. That is the part you only learn about later.",
      name: "Priya",
      role: "Cypress Ridge owner",
    },
  ] satisfies Testimonial[],
  faqs: [
    {
      q: "Can I view a home before it is finished?",
      a: "Yes. Off-plan homes can be seen as a furnished show unit and a site walk, booked by appointment. Finished homes can be viewed any day of the week, including evenings in summer.",
    },
    {
      q: "Do you arrange mortgage finance?",
      a: "We introduce three lenders who know our buildings, but you are free to use any bank or pay in cash. We never take a fee from the lender, and you are not required to use them to buy.",
    },
    {
      q: "Are the listed prices negotiable?",
      a: "Finished homes are priced at what we expect to sell for, and offers are always welcome. Off-plan prices rise in stages as a development fills, so earlier reservations pay less.",
    },
    {
      q: "Can I buy from overseas?",
      a: "Yes. Foreign buyers can purchase freehold property, and most of our overseas clients complete without travelling. We handle identity checks, translations and remote signing through our legal team.",
    },
    {
      q: "What does aftercare include?",
      a: "Every home comes with a 10 year structural warranty, a snagging round after 30 days and a free service visit at 12 months. After that, a named contact stays with the property for as long as you own it.",
    },
    {
      q: "How does the virtual tour work?",
      a: "It is a set of 360 degree photographs taken at standing height, one per room. You can drag to look around on a phone or desktop, and a guided video version is available on request.",
    },
  ] satisfies Faq[],
  budgets: ["Under $1.5M", "$1.5M to $3M", "$3M to $6M", "Above $6M"],
  interests: ["Villa", "Townhouse", "Apartment", "Estate", "Not sure yet"],
  footerNav: [
    { label: "Collection", href: "#collection" },
    { label: "Developments", href: "#developments" },
    { label: "Virtual tour", href: "#tour" },
    { label: "Finance", href: "#finance" },
    { label: "Contact", href: "#contact" },
  ],
};

export const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
