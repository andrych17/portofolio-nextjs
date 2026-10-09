"use client";

import { useSyncExternalStore } from "react";
import { SINCE } from "./data";
import { level, local, moon, moonPath } from "./clock";

const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 1000);
  return () => window.clearInterval(id);
};

// null on the server so the first client render can't mismatch on the time.
export function useNow(): Date | null {
  const s = useSyncExternalStore(subscribe, () => Math.floor(Date.now() / 1000), () => 0);
  return s ? new Date(s * 1000) : null;
}

export function Player() {
  const now = useNow();
  const lv = now && level(now, SINCE);
  return (
    <div className="pl-player">
      <p className="pl-player-name">Andry Huang</p>
      <p className="pl-mono">Full-stack · AI systems</p>
      {lv && (
        <div className="pl-xp">
          <span className="pl-xp-lv">LV {lv.lv}</span>
          <span className="pl-xp-bar" role="img" aria-label={`${Math.round(lv.progress * 100)}% to level ${lv.lv + 1}`}>
            <span style={{ transform: `scaleX(${lv.progress})` }} />
          </span>
          <span className="pl-mono">next lv in {lv.daysToNext}d</span>
        </div>
      )}
    </div>
  );
}

export function Calendar() {
  const now = useNow();
  if (!now) return null;
  const t = local(now);
  const m = moon(now);
  const full = m.name === "Full" ? "full moon tonight" : `full moon in ${m.daysToFull}d`;
  return (
    <div className="pl-cal" aria-label={`Surabaya, ${t.weekday} ${t.day}/${t.month} ${t.hhmm}`}>
      <div className="pl-cal-date">
        <span className="pl-cal-md">{t.month}/{t.day}</span>
        <span className="pl-cal-wd">{t.weekday}</span>
      </div>
      <p className={`pl-cal-period${t.hour === 0 ? " pl-dark" : ""}`}>{t.period}</p>
      <p className="pl-mono">Surabaya {t.hhmm} WIB</p>
      <div className="pl-moon">
        <svg viewBox="-11 -11 22 22" width="22" height="22" aria-hidden="true">
          <circle r="9.5" className="pl-moon-dark" />
          <path d={moonPath(m.phase, 9.5)} className="pl-moon-lit" />
        </svg>
        <span className="pl-mono">{m.name} · {full}</span>
      </div>
    </div>
  );
}
