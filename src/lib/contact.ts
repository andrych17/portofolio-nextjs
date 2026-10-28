/** Template key: "noir" for the agency templates, "sector/slug" (e.g. "fashion/maison") for the rest. */
export type StudioKey = string;
const STUDIO = /^[a-z0-9-]{2,30}(\/[a-z0-9-]{2,30})?$/;

export type ContactInput = {
  studio: StudioKey;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  /** Honeypot. Real visitors never see or fill it. */
  website: string;
};

export type ContactErrors = Partial<Record<"name" | "email" | "message" | "studio", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(
  raw: unknown,
): { ok: true; data: ContactInput } | { ok: false; errors: ContactErrors } {
  const source = typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>) : {};
  const text = (key: string, max: number) => {
    const value = source[key];
    return typeof value === "string" ? value.trim().slice(0, max) : "";
  };

  const studio = text("studio", 20);
  const data = {
    studio: studio as StudioKey,
    name: text("name", 120),
    email: text("email", 200),
    company: text("company", 160),
    service: text("service", 80),
    budget: text("budget", 40),
    message: text("message", 4000),
    website: text("website", 200),
  };

  const errors: ContactErrors = {};
  if (!STUDIO.test(data.studio)) errors.studio = "Unknown template.";
  if (data.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(data.email)) errors.email = "That email address doesn't look right.";
  if (data.message.length < 10) errors.message = "A few more words about the project, please.";

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, data };
}
