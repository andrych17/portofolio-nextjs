// Photos: picsum ids 1083 (hero), 1011, 1001, 1012, 65, 203, 218, 1080, 103, 1049, 1065, 77, 199, 1068, 49, 64
import type { Faq, Stat, Testimonial } from "@/content/types";

const img = (name: string) => `/template/images/fashion/salt/${name}.webp`;

export type Shade = { id: "tomato" | "sea" | "butter" | "chalk"; name: string; bg: string; fg: string };

export type Piece = {
  id: string;
  name: string;
  kind: string;
  price: number;
  fabric: string;
  /** Weight in kilograms, used by the packing planner. */
  weight: number;
  colours: { name: string; hex: string }[];
  image: { src: string; alt: string };
};

const SHIRT_COLOURS = [
  { name: "Tomato", hex: "#cc3a16" },
  { name: "Sea", hex: "#0f4c5c" },
  { name: "Butter", hex: "#f5d36a" },
  { name: "Chalk", hex: "#efe7d8" },
];

export const salt = {
  key: "fashion/salt",
  path: "/fashion/salt",
  name: "Your Brand",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  street: "Rua das Redes 18",
  city: "Costa Branca",
  postalCode: "00000",
  country: "Portugal",
  countryCode: "PT",
  hours: ["Studio shop: Tuesday to Saturday, 10:00 to 18:00", "Email replies within one working day"],
  title: "Your Brand | Linen Resort Clothing Made in Portugal",
  description:
    "Your Brand makes linen shirts, dresses, trousers and swimwear in Portugal, in four colours a season, cut to pack into one carry-on and mended free for life.",
  answer:
    "Your Brand is a resort clothing label that makes linen shirts, dresses, trousers and swimwear in Portugal, sells four colours a season and cuts every piece to pack into one carry-on.",
  nav: [
    { label: "Pieces", href: "#pieces" },
    { label: "Packing", href: "#packing" },
    { label: "Looks", href: "#looks" },
    { label: "Fabric", href: "#fabric" },
    { label: "Studio", href: "#visit" },
  ],
  shades: [
    { id: "tomato", name: "Tomato", bg: "#cc3a16", fg: "#fff4e4" },
    { id: "sea", name: "Sea", bg: "#0f4c5c", fg: "#f6eddc" },
    { id: "butter", name: "Butter", bg: "#f5d36a", fg: "#2a1a12" },
    { id: "chalk", name: "Chalk", bg: "#efe7d8", fg: "#1c2a24" },
  ] satisfies Shade[],
  hero: {
    src: img("hero"),
    alt: "Two people lying in a white rowing boat seen from above, floating on dark teal water",
  },
  strip: ["Portuguese linen", "Four colours a season", "Fits a carry-on", "Mended free for life", "Dyed in small batches", "Ships in three days"],
  manifesto:
    "We make clothes for people who pack light and stay long. Every piece is cut from European flax linen woven an hour from our studio, dyed one colour at a time and sewn by a family workshop of nineteen. We sell four colours a season because four is what fits in one bag.",
  facts: [
    { k: "Started", v: "2014, one cutting table" },
    { k: "Woven in", v: "Guimarães, Portugal" },
    { k: "Fabric", v: "185 gsm European flax" },
    { k: "Mending", v: "Free, for life" },
  ],
  aboutImages: [
    { src: img("about1"), alt: "A woman in an orange jacket paddling a canoe across a turquoise lake at dusk" },
    { src: img("about2"), alt: "A man in a checked shirt carrying a child along a sandy path beside a beach" },
  ],
  pieces: [
    {
      id: "salt-shirt",
      name: "Salt Shirt",
      kind: "Relaxed linen shirt",
      price: 128,
      fabric: "185 gsm flax linen",
      weight: 0.22,
      colours: SHIRT_COLOURS,
      image: { src: img("p1"), alt: "A man in a red checked shirt sitting in tall grass beside a spotted dog" },
    },
    {
      id: "noon-dress",
      name: "Noon Dress",
      kind: "Tiered midi dress",
      price: 196,
      fabric: "185 gsm flax linen",
      weight: 0.36,
      colours: SHIRT_COLOURS,
      image: { src: img("p2"), alt: "A woman with long hair seen from behind in a golden field at sunset" },
    },
    {
      id: "harbour-trouser",
      name: "Harbour Trouser",
      kind: "Wide drawstring trouser",
      price: 142,
      fabric: "185 gsm flax linen",
      weight: 0.38,
      colours: SHIRT_COLOURS,
      image: { src: img("p3"), alt: "A person standing beside a bench and a white bicycle on a harbour front in low sun" },
    },
    {
      id: "tide-swim",
      name: "Tide Swim",
      kind: "Quick-dry swim set",
      price: 96,
      fabric: "Recycled nylon",
      weight: 0.14,
      colours: SHIRT_COLOURS.slice(0, 3),
      image: { src: img("p4"), alt: "A calm turquoise sea under a heavy grey sky with a rock edge at the left" },
    },
    {
      id: "lawn-plimsoll",
      name: "Lawn Plimsoll",
      kind: "Canvas lace-up shoe",
      price: 84,
      fabric: "Cotton canvas, natural rubber",
      weight: 0.5,
      colours: [SHIRT_COLOURS[1], SHIRT_COLOURS[3]],
      image: { src: img("p6"), alt: "A person's feet in canvas lace-up shoes resting on dry grass in a park" },
    },
    {
      id: "market-tote",
      name: "Market Tote",
      kind: "Waxed canvas tote",
      price: 74,
      fabric: "Organic cotton canvas",
      weight: 0.3,
      colours: [SHIRT_COLOURS[0], SHIRT_COLOURS[3]],
      image: { src: img("p5"), alt: "A tray of ripe red strawberries packed close together" },
    },
  ] satisfies Piece[],
  planner: {
    min: 2,
    max: 14,
    start: 7,
    trips: [
      { id: "city", label: "City", note: "Walking, dinners, one wedding." },
      { id: "coast", label: "Coast", note: "Beach in the morning, harbour at night." },
      { id: "country", label: "Country", note: "Long lunches and longer walks." },
    ],
  },
  looks: [
    { n: "01", name: "Low tide", place: "Alentejo coast", body: "Salt Shirt in Chalk, Harbour Trouser in Sea. Shot at six in the morning because that is when the water goes still.", image: img("l1"), alt: "A dark rocky island reflected in a still, shallow sea" },
    { n: "02", name: "Back street", place: "Old town", body: "The Noon Dress in Tomato, worn with the Lawn Plimsoll. Walked from the studio to the water in four minutes.", image: img("l2"), alt: "A narrow stone street opening onto the sea between two sun-faded buildings" },
    { n: "03", name: "Last pier", place: "Ria Formosa", body: "Everything in Butter, which looks different in every hour of the day. That is why we dye it last.", image: img("l3"), alt: "A long wooden pier running out to a thatched pavilion over pale water" },
    { n: "04", name: "Dune steps", place: "Comporta", body: "Tide Swim under an open Salt Shirt. The walkway is the only way down and nobody minds the queue.", image: img("l4"), alt: "A wooden walkway down a dune to an empty beach under a soft grey sky" },
    { n: "05", name: "Blue wall", place: "Our own back yard", body: "We painted the wall the colour of the Sea shade so the clothes had something honest to sit against.", image: img("l5"), alt: "A pale blue table holding a jar and a small vase with one branch, against a blue wall" },
    { n: "06", name: "Windmill hour", place: "Cyclades, a trip for the team", body: "Chalk linen turns the colour of the buildings by evening. We stopped fighting it.", image: img("l6"), alt: "White houses and a windmill on a hillside under a clear sky" },
  ],
  wash: {
    src: img("wash"),
    alt: "A woman in round sunglasses holding a bunch of daisies in front of a pale field",
    before: "First wash",
    after: "Fortieth wash",
  },
  stats: [
    { value: 19, label: "People in the workshop" },
    { value: 4, label: "Colours a season" },
    { value: 100, suffix: "%", label: "European flax linen" },
    { value: 0, prefix: "$", label: "To mend it, for life" },
  ] satisfies Stat[],
  route: [
    { stop: "Field", place: "Normandy, France", body: "Flax is pulled, not cut, then left in the field for three weeks to dew-ret." },
    { stop: "Mill", place: "Flanders, Belgium", body: "Fibres are scutched and spun into a long, slightly uneven yarn. The unevenness is the point." },
    { stop: "Loom", place: "Guimarães, Portugal", body: "Woven an hour from our studio on shuttle looms, at 185 grams to the square metre." },
    { stop: "Dye house", place: "Porto", body: "One colour a day, in small baths, so a batch never has to match a batch from last year." },
    { stop: "Studio", place: "Costa Branca", body: "Cut, sewn and packed by nineteen people. Each box has the name of whoever finished it." },
  ],
  notes: [
    { quote: "Eleven days in Sicily with two shirts and the trousers. Nobody could tell, which was the whole point.", name: "Marta", role: "Lisbon" },
    { quote: "I sent a shirt back for a new button. It came home with a handwritten note and a spare.", name: "Joel", role: "Customer since 2016" },
    { quote: "The Tomato dress still looks right after four summers. I have stopped looking at other dresses.", name: "Amara", role: "Porto" },
  ] satisfies Testimonial[],
  faqs: [
    {
      q: "How does the linen fit and how should I size?",
      a: "Everything is cut relaxed and true to size, with room for a layer underneath. If you sit between two sizes, take the smaller one, because linen loosens a little after the first few washes. Every product page lists measurements in centimetres.",
    },
    {
      q: "Does linen always look creased?",
      a: "It creases, and we think it looks better for it. Our 185 gsm weight is heavy enough to drape rather than crumple. Shake it out, hang it damp and it settles in an hour.",
    },
    {
      q: "How do I wash it?",
      a: "Machine wash at 30 degrees on a gentle cycle, with no tumble dryer. Line dry in the shade. Each wash softens the fabric and lightens the colour slightly, which is why the shades are chosen to age well.",
    },
    {
      q: "How fast do orders ship and can I return them?",
      a: "Orders leave the studio within three working days in recycled card boxes. You have 30 days to return anything unworn, and the first exchange is free.",
    },
    {
      q: "What does free mending cover?",
      a: "Buttons, seams, hems and small tears on any piece you bought from us, for as long as you own it. Send it to the studio or drop it in during shop hours and we return it within two weeks.",
    },
    {
      q: "Will you bring back a colour that sold out?",
      a: "Sometimes. We dye four colours each season and keep a short waiting list for the ones that go first. Join the list on a product page and we write when the next bath is booked.",
    },
  ] satisfies Faq[],
  enquiry: { types: ["Styling call", "Order help", "Stockist", "Press"] },
};
