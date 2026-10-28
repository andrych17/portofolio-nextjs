"use client";

import { useState, type FormEvent } from "react";
import { validateContact, type ContactErrors, type StudioKey } from "./contact";

export type FormStatus = "idle" | "sending" | "sent" | "error";

export function useContactForm(studio: StudioKey) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [notice, setNotice] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = { ...Object.fromEntries(new FormData(form)), studio };

    const check = validateContact(payload);
    if (!check.ok) {
      setErrors(check.errors);
      setStatus("idle");
      const first = Object.keys(check.errors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setNotice("");
    setStatus("sending");
    try {
      const res = await fetch("/template/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: { message?: string; fields?: ContactErrors } };
      if (!res.ok) {
        setErrors(json.error?.fields ?? {});
        setNotice(json.error?.message ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setNotice("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  return { status, errors, notice, onSubmit, reset: () => setStatus("idle") };
}
