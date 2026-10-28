import Image from "next/image";
import Link from "next/link";
import { StackCards } from "@/components/motion/StackCards";
import type { Project } from "@/content/types";

export const cardTones = ["bg-k-yellow", "bg-k-pink", "bg-k-lime", "bg-k-blue text-white", "bg-accent", "bg-white"];

/** Big colour cards that pile up as you scroll. */
export function KineticWorkStack({ projects }: { projects: Project[] }) {
  return (
    <StackCards top={100} step={14} minScale={0.88} gapClassName="mb-[10vh]">
      {projects.map((project, i) => (
        <article
          key={project.slug}
          className={`grid gap-6 rounded-[2rem] border-2 border-k-ink p-4 shadow-[8px_8px_0_0_#121212] md:min-h-[72svh] md:grid-cols-12 md:gap-10 md:p-6 ${cardTones[i % cardTones.length]}`}
        >
          <Link href={`/agency/kinetic/work#${project.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-[1.4rem] border-2 border-k-ink md:col-span-7 md:aspect-auto">
            <Image
              src={project.image}
              alt={`${project.title}: ${project.summary}`}
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover transition-transform duration-700 ease-studio group-hover:scale-105 group-hover:rotate-1"
            />
            <span className="absolute left-3 top-3 rounded-full border-2 border-k-ink bg-white px-3 py-1 font-display text-xs font-black uppercase text-k-ink">
              {project.category} · {project.year}
            </span>
          </Link>
          <div className="flex flex-col justify-between gap-8 md:col-span-5 md:py-4 md:pr-4">
            <span className="font-display text-sm font-black">0{i + 1} / 0{projects.length}</span>
            <div>
              <h3 className="font-display text-[clamp(2.4rem,5vw,4.8rem)] font-black uppercase leading-[0.88] tracking-tight">{project.title}</h3>
              <p className="mt-5 max-w-md text-lg leading-snug">{project.summary}</p>
            </div>
            <div>
              <p className="inline-block -rotate-2 rounded-xl border-2 border-k-ink bg-white px-4 py-2 font-display text-xl font-black uppercase text-k-ink">{project.result}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full border-2 border-current px-3 py-1 text-sm font-bold">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </StackCards>
  );
}
