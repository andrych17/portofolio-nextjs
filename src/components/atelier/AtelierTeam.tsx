import { Reveal } from "@/components/motion/Reveal";
import type { Person } from "@/content/types";

const tiles = ["bg-[#dde4d3]", "bg-[#efdcc6]", "bg-[#e9e2d6]", "bg-accent text-accent-fg", "bg-[#f3e3b5]", "bg-[#dcd6e4]"];

/** Monogram cards in a staggered three-column grid. */
export function AtelierTeam({ people }: { people: Person[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
      {people.map((person, i) => (
        <li key={person.name} className={i % 3 === 1 ? "md:translate-y-16" : ""}>
          <Reveal delay={(i % 3) * 0.1}>
            <div className="group rounded-[2rem] bg-white/45 p-1.5 ring-1 ring-black/[0.06]">
              <div className={`flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[calc(2rem-0.375rem)] ${tiles[i % tiles.length]}`}>
                <span
                  aria-hidden
                  className="font-display text-[clamp(4rem,10vw,8.5rem)] italic leading-none transition-transform duration-[1.2s] ease-studio group-hover:-rotate-6 group-hover:scale-110"
                >
                  {person.name.split(" ").map((p) => p[0]).join("")}
                </span>
              </div>
            </div>
            <p className="mt-4 px-2 font-display text-2xl leading-tight">{person.name}</p>
            <p className="px-2 text-sm text-muted">{person.role}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
