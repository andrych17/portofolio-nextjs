import { test } from "node:test";
import assert from "node:assert/strict";
import { validateContact } from "./contact.ts";

const valid = {
  studio: "ecommerce/kiln",
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "We need a five page website by March.",
};

test("accepts a complete message and trims fields", () => {
  const result = validateContact({ ...valid, name: "  Ada Lovelace  " });
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.data.name, "Ada Lovelace");
});

test("rejects bad email, short message and unknown studio", () => {
  const result = validateContact({ studio: "!", name: "A", email: "nope", message: "hi" });
  assert.equal(result.ok, false);
  if (!result.ok) assert.deepEqual(Object.keys(result.errors).sort(), ["email", "message", "name", "studio"]);
});

test("ignores non-string values and caps length", () => {
  const result = validateContact({ ...valid, company: 42, message: "x".repeat(5000) });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.company, "");
    assert.equal(result.data.message.length, 4000);
  }
});

test("handles non-object payloads", () => {
  assert.equal(validateContact(null).ok, false);
  assert.equal(validateContact("hello").ok, false);
});
