import { BrowserIcon, FilmSlateIcon, MegaphoneIcon, PaintBrushBroadIcon } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import type { Service } from "@/content/types";

const icons = [PaintBrushBroadIcon, BrowserIcon, FilmSlateIcon, MegaphoneIcon];
const looks = [
  "md:col-span-7 bg-k-pink",
  "md:col-span-5 bg-white",
  "md:col-span-5 bg-k-lime",
  "md:col-span-7 bg-k-yellow",
];

/** Asymmetric 7/5 then 5/7 bento; cards tilt toward the pointer. */
export function KineticServices({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-12">
      {services.map((service, i) => {
        const Icon = icons[i % icons.length];
        const [span, bg] = looks[i % looks.length].split(" ");
        return (
          <Reveal key={service.title} delay={(i % 2) * 0.1} className={span}>
            <Tilt max={5} className="h-full">
              <article className={`flex h-full flex-col justify-between gap-12 rounded-[2rem] border-2 border-k-ink p-7 shadow-[6px_6px_0_0_#121212] md:p-9 ${bg}`}>
                <div className="flex items-start justify-between gap-6">
                  <span className="flex size-16 items-center justify-center rounded-full border-2 border-k-ink bg-k-ink text-white">
                    <Icon size={30} weight="bold" />
                  </span>
                  <span className="font-display text-6xl font-black leading-none text-k-ink/15">0{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-display text-[clamp(2rem,3.6vw,3.4rem)] font-black uppercase leading-[0.9]">{service.title}</h3>
                  <p className="mt-4 max-w-lg text-lg leading-snug">{service.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.deliverables.map((d) => (
                      <li key={d} className="rounded-full border-2 border-k-ink bg-white px-3 py-1 text-sm font-bold">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Tilt>
          </Reveal>
        );
      })}
    </div>
  );
}
