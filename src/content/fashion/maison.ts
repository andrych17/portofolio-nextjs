// Photos: picsum ids 1027, 656, 21, 497, 1014, 399, 1005, 1059, 546, 22, 276, 78
import type { Faq, Stat, Testimonial } from "@/content/types";

const img = (name: string) => `/template/images/fashion/maison/${name}.webp`;

export const maison = {
  key: "fashion/maison",
  path: "/fashion/maison",
  title: "Your Brand | Luxury Tailoring and Ready-to-Wear Atelier",
  description:
    "Your Brand is an independent luxury label for coats, tailoring and knitwear, cut in small runs in its own atelier. Book a private fitting or view Collection 07.",
  answer:
    "Your Brand is an independent luxury label that cuts coats, tailoring and knitwear in runs of fifty or fewer, for people who would rather own a few excellent things than many forgettable ones.",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  street: "14 Rue des Orfevres",
  postalCode: "00000",
  city: "Paris",
  country: "France",
  countryCode: "FR",
  hours: "Tuesday to Saturday, 10:00 to 18:30. Private fittings by appointment only.",
  nav: [
    { label: "Collection", href: "#collection" },
    { label: "The house", href: "#house" },
    { label: "Atelier", href: "#atelier" },
    { label: "Lookbook", href: "#lookbook" },
    { label: "Questions", href: "#faq" },
  ],
  marquee: ["Italian wool", "Hand-finished buttonholes", "Cut in runs of fifty", "Lifetime repairs", "Japanese cotton poplin", "Undyed horn buttons", "Made in Paris"],
  manifesto:
    "We design six pieces a season and no more. Each one is cut from cloth we have walked the mill floor for, sewn by the same hands from first fitting to last stitch, and finished so that it looks better at year ten than at day one.",
  facts: [
    { k: "Founded", v: "2009" },
    { k: "Atelier", v: "Paris, 4th" },
    { k: "Makers", v: "Eighteen" },
  ],
  collection: [
    { n: "01", name: "The Dune Slip", kind: "Silk crepe dress", note: "Bias cut, hand-rolled hem. Moves like water, weighs almost nothing.", image: img("c1"), alt: "A woman in a white slip dress walking barefoot across a pink-brown desert plain" },
    { n: "02", name: "The Court Pump", kind: "Calf leather shoe", note: "Resoled in the atelier for as long as you own them.", image: img("c2"), alt: "A pair of white leather court shoes with a tapered heel on a painted wooden floor in front of a red wall" },
    { n: "03", name: "The Charcoal Shell", kind: "Cashmere roll-neck", note: "Four-ply, knitted loose, finished with a cut-and-linked neckline.", image: img("c3"), alt: "A dark-haired person seen from behind in a charcoal knit against a pale grey backdrop" },
    { n: "04", name: "The Chalk Poplin", kind: "Cotton shirt", note: "Japanese poplin, 120 stitches per inch, mother-of-pearl buttons.", image: img("c4"), alt: "A woman in a white shirt facing the sea with a pale blue sash tied across her eyes" },
    { n: "05", name: "The Check Overcoat", kind: "Wool overcoat", note: "Brushed Shetland check, half-canvassed, lined in silk twill.", image: img("c5"), alt: "A woman in a red and brown checked coat looking toward a glowing sunset" },
    { n: "06", name: "The Blouson", kind: "Leather and merino", note: "Lambskin blouson with a hand-knotted merino scarf in saffron.", image: img("c6"), alt: "A person in a black leather jacket and saffron wool scarf looking out at the sea" },
  ],
  services: [
    { n: "01", title: "Made to measure", time: "Six to eight weeks", body: "Three fittings, one pattern drawn for you alone, kept on file so a second piece takes half the time.", image: img("door"), alt: "A weathered stone doorway with a carved wooden double door" },
    { n: "02", title: "Alterations and repair", time: "Two weeks", body: "Every piece we have ever made, repaired for life. We re-line, re-sole, re-knit and re-cut for a changed silhouette.", image: img("atelier"), alt: "A black blazer hanging on a plank wall above folded shirts on a shelf" },
    { n: "03", title: "Private styling", time: "Ninety minutes", body: "A quiet hour with the whole archive and a stylist who will tell you honestly what not to buy.", image: img("c5"), alt: "A woman in a checked wool overcoat at sunset" },
    { n: "04", title: "Ceremony", time: "Ten to twelve weeks", body: "Evening and occasion pieces, from a single dress to a wedding party, designed around the day and the room.", image: img("c1"), alt: "A woman in a white slip dress in a desert landscape" },
  ],
  lookbook: {
    wide: img("arch"),
    wideAlt: "A long vaulted stone cloister lit by low amber light from tall windows",
    looks: [
      { n: "Look 12", image: img("l2"), alt: "A man in a dark suit crossing a grey road marked with white lines", caption: "Single-breasted suit in navy hopsack" },
      { n: "Look 17", image: img("l3"), alt: "A wide grey stone staircase disappearing into pale mist", caption: "Wool-silk scarf, seen in morning fog" },
    ],
  },
  stats: [
    { value: 62, label: "Hours of hand work in every overcoat" },
    { value: 18, label: "Makers in the Paris atelier" },
    { value: 14, suffix: " yrs", label: "Average age of a piece still being worn" },
    { value: 50, prefix: "Max ", label: "Pieces cut of any one style" },
  ] satisfies Stat[],
  process: [
    { title: "Conversation", body: "We start with how you live, not what you want to wear. Where you go, how you travel, what you already own and never reach for." },
    { title: "Pattern and toile", body: "A pattern is drawn for you and cut first in cotton. You come in, we pin, we argue politely, we adjust." },
    { title: "Cloth and cut", body: "The final cloth is cut in one day by one cutter. Nothing is machine-pressed. Canvas, padding and linings are all sewn by hand." },
    { title: "Final fitting", body: "A last fitting, a last small correction, and then the piece is yours. Your pattern stays on file for the next one." },
  ],
  testimonials: [
    { quote: "I have owned the overcoat for eleven winters. The lining has been replaced once, for free, and the shoulders still sit exactly where the cutter put them.", name: "Camille", role: "Architect, client since 2014" },
    { quote: "They told me the first jacket I chose was wrong for my posture. They were right, and it cost them a sale. That is why I went back.", name: "Rafael", role: "Gallery director" },
    { quote: "I wore the dress for a registry office and a garden party, in that order, and nobody could tell it was the same dress. It is that kind of design.", name: "Ines", role: "Bride, autumn 2025" },
  ] satisfies Testimonial[],
  faqs: [
    { q: "How long does a made-to-measure piece take?", a: "Most pieces take six to eight weeks from the first conversation to the final fitting. Ceremony pieces take ten to twelve weeks, because the cloth is often woven to order." },
    { q: "Do you ship outside France?", a: "Ready-to-wear ships worldwide, insured and in recycled tissue and linen wrap. Made-to-measure pieces need at least one in-person fitting, but we can arrange a travelling fitting in major cities twice a year." },
    { q: "What does lifetime repair cover?", a: "It covers wear, never accidents. We re-line, re-sole, re-button, re-knit and let out or take in any piece we have made, for as long as you own it. You pay only for postage and, for large re-cuts, the cloth." },
    { q: "Can I return a ready-to-wear piece?", a: "Yes. Unworn pieces can be returned within twenty-one days for a full refund or an exchange. Made-to-measure pieces are cut for one person and cannot be returned, but we alter them until they fit." },
    { q: "Where does the cloth come from?", a: "Wool from two mills in Biella and Yorkshire, poplin from a family weaver in Okayama, silk from Como. We visit each mill every year and publish the mill name on the care label of every piece." },
    { q: "What should I bring to a first appointment?", a: "Bring one piece you love and one you never wear, and shoes you would wear with the new piece. We take care of the rest, including coffee and a quiet room." },
  ] satisfies Faq[],
  appointmentTypes: ["Private fitting", "Made to measure", "Styling hour", "Ceremony"],
  preferredDays: ["Weekday morning", "Weekday afternoon", "Saturday"],
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Pinterest", href: "#" },
    { label: "Journal", href: "#" },
  ],
};
