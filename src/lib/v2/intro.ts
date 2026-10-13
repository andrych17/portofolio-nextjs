import { useSyncExternalStore } from "react";

// "The loader is done": the hero waits for this before it plays its entrance.

let ready = false;
const subs = new Set<() => void>();

export const intro = {
  isReady: () => ready,
  set(next: boolean) {
    if (next === ready) return;
    ready = next;
    subs.forEach((f) => f());
  },
  subscribe(f: () => void) {
    subs.add(f);
    return () => {
      subs.delete(f);
    };
  },
};

export const useIntroReady = (): boolean => useSyncExternalStore(intro.subscribe, intro.isReady, () => false);
