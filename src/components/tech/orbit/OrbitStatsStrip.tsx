import { orbit } from "@/content/tech/orbit";

export function OrbitStatsStrip() {
  return (
    <section className="border-y border-orbit-border bg-orbit-surface/40 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {orbit.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="p-5 rounded-xl border border-orbit-border/60 bg-orbit-surface/60 transition-all hover:border-orbit-accent/40 hover:bg-orbit-surface"
            >
              <div className="flex items-baseline gap-1 font-heading text-3xl sm:text-4xl font-extrabold text-orbit-fg">
                <span>{stat.value}</span>
                {stat.suffix && (
                  <span className="text-xl sm:text-2xl font-bold text-orbit-accent">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-orbit-muted font-sans leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
