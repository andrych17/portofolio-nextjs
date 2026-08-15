/**
 * Dynamically calculates years of experience from September 2019 to current date.
 * Starting career date: September 2019 (7+ years of continuous experience).
 */
export function getYearsOfExperience(): number {
  const startDate = new Date(2019, 8, 1); // September 1, 2019
  const now = new Date();
  const diffInMs = now.getTime() - startDate.getTime();
  const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(7, Math.round(diffInYears));
}
