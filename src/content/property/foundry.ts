// Photos: picsum ids 331, 358, 133, 134, 101, 297, 1063, 1058, 1026, 389, 378, 214
import type { Faq, Stat, Testimonial } from "@/content/types";

const img = (name: string) => `/template/images/property/foundry/${name}.webp`;

export const foundry = {
  key: "property/foundry",
  path: "/property/foundry",
  name: "Your Brand",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  street: "Unit 4, 88 Ironworks Road",
  city: "Steelport",
  postalCode: "00000",
  countryCode: "US",
  country: "United States",
  hours: ["Monday to Friday, 7:00 to 17:00", "Site office staffed 24/7 on live projects"],
  title: "Your Brand | Industrial Builder and General Contractor",
  description:
    "Your Brand is a design-build general contractor for warehouses, plants and civil works. Fixed-price bids, a 0.38 TRIR safety record and one site team.",
  answer:
    "Your Brand is a licensed general contractor that designs and builds warehouses, factories and civil works for owners and developers, on fixed-price contracts with its own safety-trained crews.",
  hero: {
    src: img("hero"),
    alt: "A worker in silhouette standing inside a vast steel-trussed hall with lamps hanging from the roof beams",
  },
  manifesto:
    "We started in 1994 with two excavators and a rented yard. We still price the job ourselves, run it with our own crews, and walk the site every morning before the first lift. No sub-sub-contractors, no surprises in month eight.",
  facts: [
    { k: "Founded", v: "1994" },
    { k: "Licence", v: "Class A, unlimited" },
    { k: "Crew", v: "640 on payroll" },
    { k: "Base", v: "Steelport, 4 yards" },
  ],
  aboutImages: [
    { src: img("site"), alt: "Silhouetted workers on an upper floor of a steel-framed building with the city skyline behind" },
    { src: img("city"), alt: "An aerial view of a dense grey city grid seen from above" },
  ],
  strip: ["ISO 9001", "ISO 45001", "ISO 14001", "Class A licence", "Design-build", "Fixed-price bids", "24/7 site cover", "Own crews"],
  capabilities: [
    {
      n: "01",
      title: "Structural steel and concrete",
      body: "Portal frames, trussed halls and post-tensioned slabs, fabricated and erected by one team.",
      specs: ["Spans to 60 m", "Tilt-up panels", "Crane up to 220 t"],
      image: img("steel"),
      alt: "A black-and-white close view of a riveted steel tower against a white sky",
    },
    {
      n: "02",
      title: "Design-build",
      body: "One contract covers design, permits and construction, so the person who drew it is the person who answers for it.",
      specs: ["Single point of contact", "Value engineering at day 1"],
    },
    {
      n: "03",
      title: "Warehouses and cold storage",
      body: "Racking-ready floors laid to FM2 flatness, insulated panels, dock levellers and fire systems commissioned before handover.",
      specs: ["FM2 floors", "Down to minus 25 C", "Dock packages"],
    },
    {
      n: "04",
      title: "Civil and earthworks",
      body: "Bulk excavation, piling, drainage, rail sidings and tunnel linings, with our own plant fleet.",
      specs: ["Piling to 40 m", "Rail sidings", "Tunnel linings"],
      image: img("tunnel"),
      alt: "An aerial view of a road tunnel mouth cut into a dense green hillside",
    },
    {
      n: "05",
      title: "Industrial fit-out",
      body: "Process lines, mezzanines, plant rooms and clean zones installed around a running operation.",
      specs: ["Live-site works", "Clean zones"],
    },
    {
      n: "06",
      title: "Shutdowns and maintenance",
      body: "Planned outages scoped, staffed and finished inside the window you give us. Call-out crews stay on retainer for the rest of the year.",
      specs: ["72-hour mobilisation", "Annual retainers"],
    },
  ],
  projects: [
    {
      year: "2025",
      name: "Meridian Cold Store",
      type: "Warehouse and cold storage",
      size: "38,000 m²",
      value: "$41M",
      image: img("depot"),
      alt: "Two yellow roller doors on a white loading bay with a pair of parked vintage cars in front",
      note: "Built in 14 months, with the racking supplier on site from week 20.",
    },
    {
      year: "2023",
      name: "Harbour Rail Yard Upgrade",
      type: "Civil and rail",
      size: "11 km of track",
      value: "$67M",
      image: img("railyard"),
      alt: "A rail yard at sunrise with long lines of freight wagons stretching toward the horizon",
      note: "Eleven possessions, each handed back to the operator on schedule.",
    },
    {
      year: "2021",
      name: "Northgate Processing Plant",
      type: "Industrial and process",
      size: "22,500 m²",
      value: "$58M",
      image: img("plant"),
      alt: "A food-grade processing plant with steel pipework, storage silos and a tall brick chimney",
      note: "Fit out around a running line, with no lost production days.",
    },
    {
      year: "2019",
      name: "Kestrel Bridge Retrofit",
      type: "Structural steel",
      size: "420 m span",
      value: "$29M",
      image: img("bridge"),
      alt: "Looking up at the curved steel girders and masonry arches of a large bridge",
      note: "New steel bracing fitted without closing the road for more than a weekend at a time.",
    },
    {
      year: "2016",
      name: "Riverside Stadium Roof",
      type: "Steel and cladding",
      size: "52,000 seats",
      value: "$84M",
      image: img("stadium"),
      alt: "An aerial view of a stadium roof structure over a green pitch",
      note: "Roof trusses lifted in 36 sections over a single close season.",
    },
    {
      year: "2009",
      name: "Fort Street Conversion",
      type: "Heavy concrete refurbishment",
      size: "9,800 m²",
      value: "$18M",
      image: img("bunker"),
      alt: "A massive weathered concrete bunker tower under a pale blue sky",
      note: "A 1940s concrete tower, opened up and fitted out as a data hall.",
    },
  ],
  stats: [
    { value: 312, label: "Projects handed over" },
    { value: 28, label: "Years on the same yard roads" },
    { value: 640, label: "People on our own payroll" },
    { value: 98, suffix: "%", label: "Finished on or before programme" },
  ] satisfies Stat[],
  safety: {
    days: 412,
    image: img("safety"),
    alt: "A boot stepping up a concrete staircase edged with bright yellow safety stripes",
    trir: [
      { year: "2019", v: 1.4 },
      { year: "2020", v: 1.1 },
      { year: "2021", v: 0.9 },
      { year: "2022", v: 0.7 },
      { year: "2023", v: 0.6 },
      { year: "2024", v: 0.45 },
      { year: "2025", v: 0.38 },
    ],
    industry: 2.8,
    pillars: [
      { title: "Permit to work", body: "No hot work, lift or excavation starts without a signed permit that the crew has walked through." },
      { title: "Daily toolbox talks", body: "Ten minutes before shift, led by the foreman, with the day's hazards on a whiteboard." },
      { title: "A safety officer on every site", body: "Full time, on payroll, and with the authority to stop any task." },
      { title: "Near-miss reporting", body: "Logged from a phone in under a minute and reviewed every Friday with the whole crew." },
    ],
  },
  process: [
    { n: "01", title: "Brief and site survey", time: "Week 1", body: "We walk the site with you, check ground, access and services, and write down what you actually need on day one.", outputs: ["Site report", "Risk register"] },
    { n: "02", title: "Estimate and programme", time: "Weeks 2 to 4", body: "A fixed-price bid with a line-by-line breakdown and a programme you can hold us to.", outputs: ["Fixed price", "Gantt programme", "Value options"] },
    { n: "03", title: "Mobilise", time: "2 weeks", body: "Permits, welfare units, plant and crews are booked. The safety plan is signed off before a shovel moves.", outputs: ["Safety plan", "Site setup"] },
    { n: "04", title: "Build and report", time: "Project length", body: "A weekly report with photos, cost to date and the next three weeks of work. Monthly walk-round with your team.", outputs: ["Weekly report", "Monthly walk-round"] },
    { n: "05", title: "Handover and warranty", time: "30 days, then 10 years", body: "Commissioning, training and as-built drawings, followed by a 10 year structural warranty and a named service contact.", outputs: ["As-built set", "10-year warranty"] },
  ],
  testimonials: [
    {
      quote:
        "They told us in week two that the foundation design would cost more than budgeted, and showed us why. It was the only bad news we had on the whole job.",
      name: "Dana",
      role: "Plant manager, food manufacturer",
    },
    {
      quote: "Programme said 14 months. We got keys in 13.",
      name: "Tomas",
      role: "Property developer",
    },
    {
      quote: "They rebuilt a dock line while trucks kept loading around them. I still do not know how.",
      name: "Irene",
      role: "Operations lead, logistics operator",
    },
  ] satisfies Testimonial[],
  faqs: [
    {
      q: "How long does a quote take?",
      a: "A budget estimate takes about a week from the site visit. A full fixed-price bid with programme usually takes two to four weeks, depending on how complete the design is.",
    },
    {
      q: "Can you work with our architect and engineers?",
      a: "Yes. We build from your drawings, or we design and build for you. If you bring a design team, we join as early as you want, and we price constructability at no charge before you commit.",
    },
    {
      q: "Do you quote fixed price or cost plus?",
      a: "Fixed price is our default. For work with unknown ground or an existing structure we can offer a target-cost contract with a shared saving, and we say clearly which parts are provisional.",
    },
    {
      q: "What does your safety record actually measure?",
      a: "Our TRIR counts recordable injuries per 200,000 hours worked, averaged across all sites. Our current figure is 0.38, against an industry average of 2.8, and we publish it every year.",
    },
    {
      q: "Can you build around a live operation?",
      a: "Yes, and a good share of our work is exactly that. We plan around your shifts, segregate the site with hoarding and traffic routes, and agree hold points with your operations team.",
    },
    {
      q: "Which regions do you cover?",
      a: "We work within about 400 km of our four yards, and take larger projects farther out with a site office and a dedicated crew. Tell us where the site is and we will tell you how we would staff it.",
    },
  ] satisfies Faq[],
  quote: {
    types: ["Warehouse or logistics", "Factory or plant", "Civil and infrastructure", "Commercial building", "Fit-out or refurbishment", "Not sure yet"],
    sizes: ["Under 2,000 m²", "2,000 to 10,000 m²", "10,000 to 30,000 m²", "Over 30,000 m²"],
    timelines: ["Start in 3 months", "In 3 to 6 months", "In 6 to 12 months", "Still planning"],
    budgets: ["Under $5M", "$5M to $20M", "$20M to $60M", "Over $60M"],
  },
  nav: [
    { label: "Capabilities", href: "#capabilities" },
    { label: "Projects", href: "#projects" },
    { label: "Safety", href: "#safety" },
    { label: "Process", href: "#process" },
  ],
};
