// Photos: picsum ids 490, 548, 23, 674, 546, 195, 766, 835, 292, 137
import { absoluteUrl } from "@/lib/site";

const img = (name: string) => `/template/images/food/ember/${name}.webp`;

export type MenuItem = {
  id: string;
  name: string;
  note: string;
  price: number;
  tags?: ("V" | "GF")[];
  image: string;
  alt: string;
};
export type MenuSection = { id: string; title: string; blurb: string; items: MenuItem[] };

export const ember = {
  path: "/food/ember",
  key: "food/ember",
  name: "Your Brand",
  tagline: "Wood-fired steakhouse",
  title: "Wood-fired steakhouse and tasting menu · Your Brand",
  description:
    "Your Brand is a wood-fired steakhouse serving 45-day dry-aged beef, line-caught fish and a seven-course tasting menu. Reserve a table online in a minute.",
  answer:
    "Your Brand is a wood-fired steakhouse for couples, families and small celebrations, cooking dry-aged beef, line-caught fish and seasonal vegetables over oak and cherry wood, six nights a week.",
  street: "12 Cinder Lane",
  city: "Oakhaven",
  postalCode: "00000",
  countryCode: "US",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  hours: [
    { days: "Tuesday to Thursday", time: "18:00 to 22:30", open: "18:00", close: "22:30", schema: ["Tuesday", "Wednesday", "Thursday"] },
    { days: "Friday and Saturday", time: "17:30 to 23:30", open: "17:30", close: "23:30", schema: ["Friday", "Saturday"] },
    { days: "Sunday", time: "17:00 to 21:30", open: "17:00", close: "21:30", schema: ["Sunday"] },
    { days: "Monday", time: "Closed", open: "", close: "", schema: [] },
  ],
  slots: ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"],
  nav: [
    { href: "#menu", label: "Menu" },
    { href: "#tasting", label: "Tasting" },
    { href: "#story", label: "Story" },
    { href: "#visit", label: "Visit" },
  ],
  proof: ["Wood-fired since 2016", "45-day dry-aged beef", "Oak and cherry, no gas", "A cellar of 400 labels", "Family farms within 120 km", "Seven-course long table"],
  manifesto:
    "We cook the way people did before kitchens had dials. One hearth, split oak, a pile of coals that tells us when it is ready. The beef has hung for six weeks, the fish was in the sea yesterday, and nothing leaves the pass until somebody has tasted it.",
  heroImage: img("hero"),
  fireImage: img("fire"),
  sections: [
    {
      id: "begin",
      title: "To begin",
      blurb: "Small plates, cold and warm.",
      items: [
        { id: "tartare", name: "Beef tartare", note: "Hand-cut chuck, cured yolk, rye crisp, pickled shallot.", price: 19, image: img("hero"), alt: "Dark wooden board with spices and a mortar, the prep table before service" },
        { id: "leeks", name: "Charred leeks", note: "Burnt leek ash, hazelnut romesco, aged sherry vinegar.", price: 15, tags: ["V", "GF"], image: img("board"), alt: "Root vegetables and peppercorns on a wooden chopping board" },
        { id: "oysters", name: "Oysters on the coals", note: "Six oysters warmed in the shell, brown butter, lemon.", price: 24, tags: ["GF"], image: img("lights"), alt: "A narrow street at night under strings of warm lights" },
        { id: "marrow", name: "Bone marrow", note: "Roasted split bone, parsley and caper salad, grilled sourdough.", price: 17, image: img("forks"), alt: "Three dark forks fanned out in low light" },
      ],
    },
    {
      id: "fire",
      title: "From the fire",
      blurb: "Everything here sees the hearth.",
      items: [
        { id: "ribeye", name: "Dry-aged ribeye", note: "400 g bone-in, 45 days on the bone, finished over cherry wood and carved at the table.", price: 68, tags: ["GF"], image: img("fire"), alt: "Flames glowing in the dark behind a silhouetted figure" },
        { id: "filet", name: "Filet, black garlic", note: "220 g from the heart of the tenderloin, black garlic butter, marrow jus.", price: 54, image: img("glow"), alt: "A tunnel of warm amber light" },
        { id: "lamb", name: "Lamb shoulder", note: "Eight hours in the low oven, a hard sear on the grill, mint salsa verde.", price: 46, tags: ["GF"], image: img("hall"), alt: "A vaulted stone hall lit by warm window light" },
        { id: "fish", name: "Whole fish for two", note: "Line-caught, scaled and cooked in the coals, charred lemon, brown butter.", price: 79, tags: ["GF"], image: img("lights"), alt: "A narrow street at night under strings of warm lights" },
        { id: "mushroom", name: "Mushroom steak", note: "King oyster scored and seared, miso butter, pickled walnut.", price: 32, tags: ["V"], image: img("grapes"), alt: "Two hands holding a bunch of dark grapes" },
      ],
    },
    {
      id: "finish",
      title: "To finish",
      blurb: "Sweet, smoked or cheese.",
      items: [
        { id: "tart", name: "Burnt honey tart", note: "Cultured cream, bee pollen, a pinch of sea salt.", price: 14, tags: ["V"], image: img("dessert"), alt: "Small baked cookies in a dark bowl beside yellow flowers and lemon slices" },
        { id: "chocolate", name: "Smoked chocolate pot", note: "Cream smoked over embers, olive oil, flaky salt.", price: 15, tags: ["V", "GF"], image: img("beans"), alt: "Dark roasted coffee beans filling the frame" },
        { id: "cheese", name: "Cheese from the cellar", note: "Three farm cheeses, quince paste, toasted walnut bread.", price: 18, tags: ["V"], image: img("grapes"), alt: "Two hands holding a bunch of dark grapes" },
      ],
    },
  ] satisfies MenuSection[],
  tasting: {
    price: 95,
    pairing: 65,
    intro: "One table, one pace, seven courses over about three hours. The kitchen decides the order of the evening, you decide when to stop talking.",
    courses: [
      { time: "19:30", name: "Arrival", body: "Smoked almonds and a glass of something sparkling at the hearth while the table is set." },
      { time: "19:50", name: "Oyster, charred cucumber", body: "Warmed in the shell on the coals, finished with cucumber water and dill oil." },
      { time: "20:10", name: "Beef tartare, smoked yolk", body: "Cut by hand an hour before service, served with a rye crisp that is still warm." },
      { time: "20:35", name: "Leek, hazelnut, brown butter", body: "Whole leek burnt black on the outside, soft and sweet inside, with a spoon of romesco." },
      { time: "21:00", name: "Fish from the coals", body: "Whatever the boat brought that morning, cooked whole and portioned at the table." },
      { time: "21:30", name: "Dry-aged ribeye", body: "Forty-five days of age, carved in front of you, with bone marrow jus and charred greens." },
      { time: "22:15", name: "Burnt honey, then coffee", body: "A tart that leans bitter, a small cup of coffee, and no rush to leave." },
    ],
  },
  stats: [
    { value: 45, label: "Days every ribeye hangs before it meets the fire" },
    { value: 400, label: "Labels in the cellar, from five euros a glass to a lifetime" },
    { value: 7, label: "Courses on the long table, every night it is served" },
    { value: 12, label: "Seats at the counter, facing the hearth" },
  ],
  gallery: [
    { image: img("hall"), alt: "A vaulted stone dining hall lit by warm window light", title: "The dining room", note: "Forty covers under old stone arches." },
    { image: img("fire"), alt: "Flames glowing in the dark behind a silhouetted figure", title: "The hearth", note: "Oak to start, cherry to finish." },
    { image: img("lights"), alt: "A narrow street at night under strings of warm lights", title: "The lane", note: "Lanterns on from five o'clock." },
    { image: img("glow"), alt: "A tunnel of warm amber light", title: "The cellar stair", note: "Four hundred labels down these steps." },
    { image: img("board"), alt: "Root vegetables and peppercorns on a wooden chopping board", title: "The prep table", note: "Where the morning's deliveries get a name." },
  ],
  process: [
    { n: "01", title: "Sourced close", body: "Beef comes from three family farms inside 120 km. We visit each one twice a year and pay for the animal, not the cut, so nothing is rushed to market.", facts: [["3", "family farms"], ["120 km", "furthest we buy from"]] },
    { n: "02", title: "Aged in salt", body: "Primals hang in a salt-lined chamber for 45 days. The outside is trimmed away, which is why we buy more beef than we serve.", facts: [["45", "days in the salt room"], ["1 in 3", "kilos trimmed away"]] },
    { n: "03", title: "Cooked on coals", body: "Oak builds the bed, cherry finishes it. We cook over embers rather than flame, because coals hold a steady heat and flame only looks good.", facts: [["4 h", "to build the coal bed"], ["2", "woods, oak and cherry"]] },
    { n: "04", title: "Rested, then carved", body: "Every steak rests ten minutes under foil. It comes to the table whole, and one of us carves it in front of you.", facts: [["10 min", "rest under foil"], ["1", "knife, at your table"]] },
  ],
  testimonials: [
    { quote: "We booked for our tenth anniversary and I expected a loud steakhouse. It was the opposite. Low light, quiet staff, and the ribeye was carved at the table like a small ceremony.", name: "Ines", role: "Anniversary dinner" },
    { quote: "The tasting menu paced itself perfectly. I never once felt rushed or stuffed.", name: "Tomas", role: "Regular since 2019" },
    { quote: "They booked the private table for twelve of us and handled my mother's allergies without any fuss.", name: "Hannah", role: "Family birthday" },
  ],
  faqs: [
    { q: "Do you take walk-ins?", a: "We keep eight seats at the counter for walk-ins every night, released at the door from opening time. For tables and for the tasting menu we recommend booking at least a week ahead, and two weeks for weekends." },
    { q: "Can you cater for dietary needs?", a: "Yes. Tell us about allergies, vegetarian or pescatarian needs in the reservation form and the kitchen will adapt the menu or the tasting menu for that guest. Gluten-free and vegetarian dishes are marked on the menu." },
    { q: "What is your cancellation policy?", a: "You can cancel or move a reservation free of charge up to 48 hours before. After that, and for no-shows, we charge 30 dollars per guest, and 60 per guest for the tasting menu." },
    { q: "Can we book the private table?", a: "The private table seats up to twelve in a room beside the hearth, with its own menu and a minimum spend of 900 dollars. Write to us with a date and group size and we will reply within a working day." },
    { q: "Is there a dress code?", a: "No dress code. Most guests come smart casual. The room stays warm because of the fire, so you will not need a coat at the table." },
    { q: "Are children welcome?", a: "Children are welcome at the early sittings, before 19:00, and we serve a short menu for under-twelves. The seven-course tasting menu is for guests aged twelve and over." },
  ],
  footerLinks: [
    { href: "#menu", label: "Menu" },
    { href: "#tasting", label: "Tasting menu" },
    { href: "#story", label: "Our story" },
    { href: "#faq", label: "Questions" },
    { href: "#visit", label: "Reserve" },
  ],
};

export function menuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${absoluteUrl(ember.path)}#menu`,
    name: "Dinner menu",
    inLanguage: "en",
    hasMenuSection: ember.sections.map((s) => ({
      "@type": "MenuSection",
      name: s.title,
      description: s.blurb,
      hasMenuItem: s.items.map((i) => ({
        "@type": "MenuItem",
        name: i.name,
        description: i.note,
        offers: { "@type": "Offer", price: i.price.toFixed(2), priceCurrency: "USD" },
        ...(i.tags?.includes("V") ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}),
        ...(i.tags?.includes("GF") && !i.tags.includes("V") ? { suitableForDiet: "https://schema.org/GlutenFreeDiet" } : {}),
      })),
    })),
  };
}

export function restaurantExtras() {
  return {
    servesCuisine: ["Steakhouse", "Wood-fired", "Seasonal"],
    priceRange: "$$$",
    acceptsReservations: true,
    hasMenu: { "@id": `${absoluteUrl(ember.path)}#menu` },
    openingHoursSpecification: ember.hours
      .filter((h) => h.schema.length > 0)
      .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.schema, opens: h.open, closes: h.close })),
  };
}
