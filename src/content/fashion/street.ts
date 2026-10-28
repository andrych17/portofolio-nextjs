// Photos: no picsum ids on record (the files in public/images/fashion/street were added before this file was written)
import type { Faq, Stat, Testimonial } from "@/content/types";

const img = (name: string) => `/template/images/fashion/street/${name}.webp`;

export type Product = {
  id: string;
  name: string;
  kind: string;
  price: number;
  colour: string;
  tag?: string;
  sizes: string[];
  images: [{ src: string; alt: string }, { src: string; alt: string }];
};

export const street = {
  key: "fashion/street",
  path: "/fashion/street",
  name: "Your Brand",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  street: "Unit 9, Dock Yard, 41 Pier Street",
  city: "Portside",
  postalCode: "00000",
  country: "United States",
  countryCode: "US",
  hours: ["Pick-up window: Thursday and Friday, 12:00 to 19:00", "Email replies within one working day"],
  title: "Your Brand | Streetwear Label, Limited Drops of 24 Pieces",
  description:
    "Your Brand is a streetwear label that releases one drop of 24 pieces every six weeks, made in factories it visits and never restocked. Drop 07 is live.",
  answer:
    "Your Brand is a streetwear label that releases one drop of twenty-four pieces every six weeks, made in three factories we visit, shipped within 48 hours and never restocked.",
  nav: [
    { label: "Shop", href: "#shop" },
    { label: "Archive", href: "#archive" },
    { label: "Studio", href: "#studio" },
    { label: "Wholesale", href: "#wholesale" },
  ],
  announce: ["Drop 07 is live, 24 pieces", "Drop 08 opens Friday 18:00", "Free returns for 30 days", "Ships in 48 hours"],
  nextDrop: "Drop 08",
  hero: {
    src: img("hero"),
    alt: "A skater mid-jump over a set of concrete stairs beneath palm trees on a hazy afternoon",
  },
  strip: ["24 pieces a drop", "Three factories we visit", "460 gsm fleece", "Ships in 48 hours", "Free returns", "Spare button in every box", "Never restocked"],
  manifesto:
    "We started in 2016 with twenty-four tees and a borrowed loading dock. We still cap every drop at twenty-four pieces, still count the boxes ourselves and still mean it when we say there is no second run. If you missed it, you missed it. The next one is better.",
  facts: [
    { k: "Started", v: "2016, one loading dock" },
    { k: "Cadence", v: "A drop every 6 weeks" },
    { k: "Run size", v: "24 pieces, never more" },
    { k: "Returns", v: "30 days, free" },
  ],
  aboutImages: [
    { src: img("p2b"), alt: "A flat lay on a wooden desk with a graphic tee, a pennant, a notebook and a white swirl logo block" },
    { src: img("p4a"), alt: "A hand holding a silver film camera, with a shearling cuff and a denim jacket" },
  ],
  products: [
    {
      id: "curb-low",
      name: "Curb Low",
      kind: "Canvas sneaker",
      price: 148,
      colour: "Black, gum sole",
      tag: "New",
      sizes: ["39", "40", "41", "42", "43", "44"],
      images: [
        { src: img("p1a"), alt: "A rubber-soled shoe stepping up a concrete staircase edged with bright yellow stripes" },
        { src: img("p1b"), alt: "A pair of black canvas sneakers pointing at the sky on a dry grass field" },
      ],
    },
    {
      id: "calendar-tee",
      name: "Calendar Tee",
      kind: "Heavy cotton tee",
      price: 52,
      colour: "Bone, teal, orange",
      tag: "Low stock",
      sizes: ["S", "M", "L", "XL"],
      images: [
        { src: img("p2a"), alt: "A rack of tees on wooden hangers in teal, orange, green and grey below a wall calendar" },
        { src: img("p2b"), alt: "A flat lay on a wooden desk with a graphic tee, a pennant, a notebook and a white swirl logo block" },
      ],
    },
    {
      id: "tide-hoodie",
      name: "Tide Hoodie",
      kind: "460 gsm fleece hoodie",
      price: 138,
      colour: "Slate, navy",
      sizes: ["S", "M", "L", "XL"],
      images: [
        { src: img("p3a"), alt: "A person in a grey knit hoodie facing the grey sea" },
        { src: img("p3b"), alt: "A person in a navy hoodie and glasses sitting among white daisies at dusk" },
      ],
    },
    {
      id: "chambray-shirt",
      name: "Chambray Work Shirt",
      kind: "Washed chambray shirt",
      price: 98,
      colour: "Light indigo",
      sizes: ["S", "M", "L", "XL"],
      images: [
        { src: img("p4b"), alt: "A person in a chambray shirt holding a black film camera against dark jeans" },
        { src: img("p4a"), alt: "A hand holding a silver film camera, with a shearling cuff and a denim jacket" },
      ],
    },
    {
      id: "courier-bag",
      name: "Courier Bag",
      kind: "Waxed leather messenger",
      price: 214,
      colour: "Oxblood brown",
      tag: "Low stock",
      sizes: ["One size"],
      images: [
        { src: img("p5b"), alt: "A brown leather bag on a wooden table beside a notebook, a coffee cup and a phone" },
        { src: img("p5a"), alt: "A grey flat lay of a wallet, sunglasses, a tweed bow tie, a pen, a phone, a watch and glasses" },
      ],
    },
    {
      id: "ridge-boot",
      name: "Ridge Boot",
      kind: "Lug-sole leather boot",
      price: 236,
      colour: "Tan, black",
      sizes: ["39", "40", "41", "42", "43", "44"],
      images: [
        { src: img("p6b"), alt: "Two boots and grey jeans standing on a rocky ridge in mist" },
        { src: img("p6a"), alt: "A person in a tan cardigan and denim pulling up an ankle boot" },
      ],
    },
  ] satisfies Product[],
  archive: [
    {
      n: "04",
      name: "Alarm",
      date: "March",
      pieces: 24,
      soldOut: "Sold out in 14 minutes",
      body: "A boxy work jacket and a red alarm-box print taken from the wall outside the old tram depot. The first drop we had to put a queue in front of.",
      image: img("d1"),
      alt: "A red wall-mounted alarm box on a tiled wall covered in black and white graffiti",
    },
    {
      n: "05",
      name: "Garage",
      date: "May",
      pieces: 24,
      soldOut: "Sold out in 11 minutes",
      body: "Yellow shutters, two old cars and a shop coat to match. Shot on a Sunday when the lot was empty, which is the only time it is.",
      image: img("d2"),
      alt: "Two vintage cars parked in front of yellow roller shutters",
    },
    {
      n: "06",
      name: "Van",
      date: "July",
      pieces: 24,
      soldOut: "Sold out in 9 minutes",
      body: "A pale blue camper that lives behind our studio. Washed denim, a pocket tee and a tote with the number plate on it.",
      image: img("d3"),
      alt: "A pale blue vintage camper van parked on a dark street",
    },
  ],
  band: [
    { src: img("s1"), alt: "A blurred subway platform with a poster on the wall and streaking train lights" },
    { src: img("s2"), alt: "Two cyclists blurred by motion in black and white" },
  ],
  stats: [
    { value: 24, label: "Pieces in every drop" },
    { value: 14, suffix: " min", label: "Average time to sell out" },
    { value: 3, label: "Factories we visit each season" },
    { value: 0, label: "Restocks, ever" },
  ] satisfies Stat[],
  week: [
    { day: "Mon", time: "09:00", title: "Count", body: "The factory sends final counts. If a size comes in short, we say so on the page before anyone can buy it." },
    { day: "Tue", time: "12:00", title: "Shoot", body: "Everything is photographed on real people on the street outside the studio, in whatever light we have." },
    { day: "Wed", time: "18:00", title: "Preview", body: "The mailing list gets a first look and the sizing sheet. Nobody gets early access to buy. Ever." },
    { day: "Thu", time: "23:59", title: "Pack", body: "Three of us pack every box the night before, with a spare button and a card with the batch number." },
    { day: "Fri", time: "18:00", title: "Drop", body: "The store opens. Twenty-four pieces. Most are gone in under fifteen minutes." },
  ],
  notes: [
    {
      quote: "Bought the Tide hoodie on a Friday and wore it forty days in a row. It is softer now than it was out of the box.",
      name: "Kofi",
      role: "Skate coach",
    },
    {
      quote: "Sold out before my coffee got cold. The box came with a spare button. Who does that.",
      name: "Lena",
      role: "Bought in Drop 05",
    },
    {
      quote: "They told me the Ridge Boot runs half a size small before I even asked.",
      name: "Marcus",
      role: "Customer since Drop 02",
    },
  ] satisfies Testimonial[],
  faqs: [
    {
      q: "When does the next drop go live?",
      a: "Every drop opens on a Friday at 18:00 local time, roughly every six weeks. Join the mailing list and you get the date, the lookbook and the sizing sheet on the Wednesday before.",
    },
    {
      q: "Will sold-out pieces come back?",
      a: "No. Each drop is capped at 24 pieces and we do not restock or remake any of them. A few items return as a new colourway or a new fit, but they are treated as a different product.",
    },
    {
      q: "How do your sizes run?",
      a: "Tees and hoodies fit true to size with a relaxed cut, so size down if you want it closer. The Ridge Boot runs about half a size small. Every product page has measurements in centimetres.",
    },
    {
      q: "How fast do orders ship?",
      a: "Within 48 hours of the drop closing, in recycled card packaging. Tracked delivery to most countries takes three to seven working days, and you get the tracking number by email.",
    },
    {
      q: "Can I return something that does not fit?",
      a: "Yes, free for 30 days from delivery, as long as it is unworn with the tags on. Exchanges are available while stock lasts. Because pieces are never restocked, a refund is the usual outcome for sold-out sizes.",
    },
    {
      q: "Do you work with stockists and press?",
      a: "We open a small number of wholesale accounts each season, mostly independent shops. Send the form below with your shop or title and we will reply within one working day.",
    },
  ] satisfies Faq[],
  enquiry: {
    types: ["Wholesale", "Press", "Collab", "Order help"],
  },
  bagNote: "Demo store. Checkout is not connected.",
};
