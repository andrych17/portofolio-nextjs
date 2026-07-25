import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // AI agent/tool config directories, not part of the app source:
    ".agents/**",
    ".augment/**",
    ".claude/**",
    ".codebuddy/**",
    ".codewhale/**",
    ".codex/**",
    ".continue/**",
    ".cursor/**",
    ".factory/**",
    ".gemini/**",
    ".opencode/**",
    ".github/prompts/**",
  ]),
]);

export default eslintConfig;
