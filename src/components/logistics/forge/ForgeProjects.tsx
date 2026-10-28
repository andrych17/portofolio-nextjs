import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { forge } from "@/content/logistics/forge";

export function ForgeProjects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Execution Evidence</Eyebrow>
            <h2 id="projects-heading" className="mt-3 font-display text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-tight text-fg">
              Project Cargo Case Studies
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Recent heavy-lift turbine and industrial stamping press deployments delivered directly to foundation.
            </p>
          </div>
          <div className="text-sm font-medium text-muted">
            100% on-schedule foundation sets
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {forge.projects.map((proj) => (
            <div
              key={proj.title}
              className="group flex flex-col justify-between rounded-[2rem] bg-surface p-2 ring-1 ring-line transition-all duration-300 hover:ring-accent/40"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.6rem] bg-bg">
                  <Image
                    src={proj.image}
                    alt={proj.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 ease-studio group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-bg/90 px-3 py-1 font-mono text-xs font-bold text-accent backdrop-blur-sm">
                    {proj.weight}
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <h3 className="font-display text-2xl font-semibold text-fg md:text-3xl">{proj.title}</h3>
                  <p className="mt-2 text-xs font-mono text-accent">{proj.payload}</p>
                  <p className="mt-4 text-sm text-muted leading-relaxed">
                    <span className="font-semibold text-fg">Route: </span>{proj.route}
                  </p>
                </div>
              </div>

              <div className="border-t border-line/60 px-5 py-4 text-xs font-mono text-muted md:px-6">
                <span>{proj.equipment}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
