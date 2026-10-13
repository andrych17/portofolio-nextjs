/** localStorage flag: the loader plays on the first visit only (the layout reads the key too, before paint). */
export const INTRO_KEY = "v2-seen";

export function introSeen(): boolean {
  try {
    return localStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false; // storage blocked: behave like a first visit
  }
}

export function markIntroSeen(): void {
  try {
    localStorage.setItem(INTRO_KEY, "1");
  } catch {
    // storage blocked: the loader just plays again next time
  }
}
