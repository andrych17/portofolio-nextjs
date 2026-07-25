/**
 * Dynamically calculates years of experience from September 2019 to current date.
 * Automatically increments when crossing September 1st of each year.
 */
export function getYearsOfExperience(): number {
  const startDate = new Date(2019, 8, 1); // September 1, 2019 (month index 8)
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  const monthDiff = now.getMonth() - startDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < startDate.getDate())) {
    years--;
  }

  return Math.max(1, years);
}
