import { Reveal } from "@/components/motion/Reveal";
import type { Service } from "@/content/types";

export function NoirServices({ services }: { services: Service[] }) {
  return (
    <ol className="border-t border-line">
      {services.map((service, i) => (
        <li key={service.title} className="group border-b border-line">
          <Reveal y={24} className="grid gap-4 py-10 transition-colors duration-700 ease-studio md:grid-cols-12 md:py-14 md:group-hover:bg-fg/[0.025]">
            <span className="font-mono text-xs text-muted md:col-span-1 md:pl-4">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="font-display text-5xl leading-none transition-[transform,color] duration-700 ease-studio md:col-span-4 md:text-6xl md:group-hover:translate-x-4 md:group-hover:text-accent">
              {service.title}
            </h3>
            <p className="max-w-md text-fg/75 md:col-span-4">{service.body}</p>
            <ul className="flex flex-wrap gap-2 md:col-span-3 md:flex-col md:gap-1.5">
              {service.deliverables.map((item) => (
                <li key={item} className="text-sm text-muted md:before:mr-2 md:before:text-accent md:before:content-['/']">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
