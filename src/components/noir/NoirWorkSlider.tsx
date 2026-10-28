import Image from "next/image";
import Link from "next/link";
import { ArrowIsland } from "@/components/ArrowIsland";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import type { Project } from "@/content/types";

/** Pinned horizontal strip of featured projects. */
export function NoirWorkSlider({ projects }: { projects: Project[] }) {
  return (
    <HorizontalScroll trackClassName="items-center gap-6 px-5 md:gap-10 md:px-10">
      {projects.map((project, i) => (
        <Link
          key={project.slug}
          href={`/agency/noir/work#${project.slug}`}
          data-cursor="View"
          className={`group block shrink-0 ${i % 2 ? "w-[72vw] md:mt-40 md:w-[34vw]" : "w-[80vw] md:-mt-24 md:w-[42vw]"}`}
        >
          <div className={`relative overflow-hidden rounded-[1.25rem] ${i % 2 ? "aspect-[4/5]" : "aspect-[16/11]"}`}>
            <Image
              src={project.image}
              alt={`${project.title} project`}
              fill
              sizes="(min-width: 768px) 42vw, 80vw"
              className="object-cover grayscale transition-[transform,filter] duration-[1.2s] ease-studio group-hover:scale-[1.06] group-hover:grayscale-0"
            />
          </div>
          <div className="mt-5 flex items-start justify-between gap-6">
            <div>
              <h3 className="font-display text-3xl leading-none md:text-4xl">{project.title}</h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {project.category} · {project.year}
              </p>
            </div>
            <p className="max-w-[14rem] text-right text-sm text-accent">{project.result}</p>
          </div>
        </Link>
      ))}
      <Link
        href="/template/agency/noir/work"
        className="group flex size-[60vw] shrink-0 flex-col items-center justify-center gap-4 rounded-full border border-line text-center transition-colors duration-700 ease-studio hover:bg-accent hover:text-accent-fg md:size-[22vw]"
      >
        <span className="font-display text-4xl italic md:text-5xl">All work</span>
        <ArrowIsland className="size-12 bg-fg/10 group-hover:bg-black/10" size={18} />
      </Link>
    </HorizontalScroll>
  );
}
