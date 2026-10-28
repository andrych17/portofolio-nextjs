"use client";

import { useEffect, useState } from "react";

/** Live clock for the studio's city. Renders a placeholder on the server. */
export function LocalTime({ timeZone, className }: { timeZone: string; className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const timer = setInterval(tick, 15_000);
    return () => clearInterval(timer);
  }, [timeZone]);

  return (
    <time className={className} suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
}
