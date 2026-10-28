import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { salt } from "@/content/fashion/salt";

const TILT = ["md:-rotate-2", "md:rotate-1 md:mt-14", "md:-rotate-1 md:mt-5"];
const MONTHS = ["JUN", "AUG", "JUL"];

function Stamp({ month }: { month: string }) {
  return (
    <svg viewBox="0 0 96 96" aria-hidden className="size-20 shrink-0 text-[var(--l-ink)]/70">
      <circle cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 4" />
      <circle cx="48" cy="48" r="31" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="48" y="43" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="2" fill="currentColor">
        COSTA
      </text>
      <text x="48" y="57" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="2" fill="currentColor">
        {month}
      </text>
      <path d="M12 74 C 30 66, 36 82, 54 74 S 78 66, 90 74" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Customer notes as postcards: paper grain, a postmark, a slight tilt that straightens on hover. */
export function SaltNotes() {
  return (
    <section id="notes" aria-labelledby="notes-title" className="bg-surface">
      <div className="mx-auto max-w-[1700px] px-5 py-24 md:px-10 md:py-36">
      <p className="salt-caps text-muted">06 · Postcards</p>
      <MaskText
        as="h2"
        id="notes-title"
        className="mt-5 max-w-3xl font-display text-[clamp(2.8rem,7vw,7rem)]"
        lines={["Sent back", <span key="s" className="text-accent">from the road.</span>]}
      />
      <ul className="mt-16 grid gap-8 md:mt-24 md:grid-cols-3 md:gap-10">
        {salt.notes.map((n, i) => (
          <li key={n.name}>
            <Reveal y={50} delay={i * 0.12} amount={0.2}>
              <figure
                className={`salt-paper flex min-h-[22rem] flex-col justify-between rounded-[1.4rem] p-7 shadow-[0_34px_60px_-34px_rgb(0_0_0/0.7)] transition-transform duration-700 ease-studio hover:rotate-0 md:p-8 ${TILT[i % TILT.length]}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="salt-caps opacity-60">Postcard {String(i + 1).padStart(2, "0")}</p>
                  <Stamp month={MONTHS[i % MONTHS.length]} />
                </div>
                <blockquote className="mt-4 font-display text-[1.65rem] !leading-[1.22] !tracking-normal">&ldquo;{n.quote}&rdquo;</blockquote>
                <figcaption className="mt-8 border-t border-[var(--l-ink)]/20 pt-4">
                  <span className="font-display text-xl">{n.name}</span>
                  <span className="salt-caps ml-3 opacity-60">{n.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
