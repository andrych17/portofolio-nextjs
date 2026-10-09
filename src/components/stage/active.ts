import { useSyncExternalStore } from "react";

// Which home-page section sits in the middle of the viewport. Stage.tsx writes it,
// the bust, the band and the navbar read it.

export type SectionId = "home" | "career" | "work" | "skills" | "certifications" | "faq" | "contact";

let active: SectionId = "home";
let pulses = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((f) => f());

export const stage = {
  active: () => active,
  pulses: () => pulses,
  setActive(id: SectionId) {
    if (id === active) return;
    active = id;
    pulses++;
    emit();
  },
  /** Run the scan line down the bust once. */
  sweep() {
    pulses++;
    emit();
  },
  subscribe(f: () => void) {
    listeners.add(f);
    return () => {
      listeners.delete(f);
    };
  },
};

export function useActiveSection(): SectionId {
  return useSyncExternalStore(stage.subscribe, stage.active, () => "home");
}
