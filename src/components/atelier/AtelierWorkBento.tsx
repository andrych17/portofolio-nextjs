import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import type { Project } from "@/content/types";

const layout = [
  "md:col-span-8 aspect-[16/10]",
  "md:col-span-4 aspect-[4/5] md:aspect-auto",
  "md:col-span-4 aspect-[4/5] md:aspect-auto",
  "md:col-span-8 aspect-[16/10]",
];

/** Asymmetric 8/4 then 4/8 grid of featured projects. */
export function AtelierWorkBento({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-12 md:gap-5">
      {projects.slice(0, 4).map((project, i) => (
        <Reveal key={project.slug} delay={(i % 2) * 0.12} className={layout[i].split(" ")[0]}>
          <article className="h-full">
            <Link href={`/agency/atelier/work#${project.slug}`} className="group flex h-full flex-col rounded-[2rem] bg-white/45 p-1.5 ring-1 ring-black/[0.06]">
              <div className={`relative overflow-hidden rounded-[calc(2rem-0.375rem)] md:flex-1 ${layout[i].split(" ").slice(1).join(" ")}`}>
                <Image
                  src={project.image}
                  alt={`${project.title}, ${project.summary}`}
                  fill
                  sizes={i === 0 || i === 3 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                  className="object-cover transition-transform duration-[1.4s] ease-studio group-hover:scale-[1.04]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-bg/85 px-3 py-1 text-[11px] uppercase tracking-[0.16em] backdrop-blur">
                  {project.category}
                </span>
              </div>
              <div className="flex items-end justify-between gap-4 px-4 pb-3 pt-4">
                <div>
                  <h3 className="font-display text-2xl leading-tight md:text-3xl">{project.title}</h3>
                  <p className="mt-1 text-sm text-muted">{project.result}</p>
                </div>
                <span className="text-sm tabular-nums text-muted">{project.year}</span>
              </div>
            </Link>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
