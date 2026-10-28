export type BookDetail = { doctor?: string; dept?: string };

/** Lets any section preselect a doctor or department in the booking widget, then scrolls to it. */
export function openBooking(detail: BookDetail) {
  window.dispatchEvent(new CustomEvent<BookDetail>("clinic:book", { detail }));
  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
