# UI Refactor Plan — Editorial / Kinetic-Type Direction

**Reference:** https://catalinvintila.design/
**Target repo:** `portofolio-nextjs` (Next.js 16 App Router, React 19, Tailwind v4, framer-motion)
**Hard constraint:** **no copywriting changes.** Every visible string in `src/components/*` and `src/context/LanguageContext.tsx` moves as-is (EN + ID variants both preserved). This refactor changes layout, type, color, motion, and DOM structure only.

---

## 1. What the reference actually is

Extracted from the live site's CSS and DOM (not guessed):

| Token | Value |
|---|---|
| Background | `#0c0c0c` (near-black), second surface `#151515` |
| Foreground | `#d8d8d4` (warm off-white), secondary `#c8c8c3` |
| Muted | `#7b7b76` / `#6e6e68` |
| Accent | `#ff4d00` (single hot orange — used sparingly) |
| Hairline | `rgba(216,216,212,0.15)` on dark, `rgba(12,12,12,0.22)` on light |
| Ease | `cubic-bezier(0.83, 0, 0.17, 1)` (expo in-out) everywhere |
| Type | Switzer Variable (single family, whole site) |

Structural DNA (class names from the DOM):

- `noise` — full-viewport grain overlay
- `wipe` / `page -active` — full-screen wipe transitions + numeric preloader (`0%` → `100%`)
- `mq`, `mq -rev`, `mq__in` — marquee strips running both directions
- `roll`, `roll__a`, `roll__b`, `roll__in` — text roll-up on hover (two stacked copies, `translateY`)
- `wirow__idx / __name / __cat / __year / __thumb` — work presented as **index rows**, not cards; thumbnail appears on hover
- `srv__idx / __name / __count / __chips` — services as numbered accordion rows (`01`, `02`, …)
- `rrow__dot / __name / __for` — recognition list, one line per award
- `stats` + `num` — counting-up numerals
- `lbl`, `chip`, `badge`, `-ghost` — small mono-ish labels, uppercase, letterspaced

**The whole aesthetic is:** one typeface, two neutrals, one accent, hairline rules, enormous uppercase display type, everything as a *list* rather than a *card grid*, and motion driven by scroll position with a single easing curve.

**What the current site is:** `#030014` deep-space background, aurora gradient animation, 7 neon colors, gradient-clipped text on nearly every heading, glass cards with glow shadows, Three.js galaxy, matrix rain / hex / particles / scan lines / cursor trail, glitch text, and per-section colored dividers. It reads as "cyber template," which is exactly the anti-pattern the design rules ban. It's also the entire performance problem: `ThreeBackground.tsx` + `CodeAnimations.tsx` + `AnimationEffects.tsx` = ~720 lines of continuous animation on the main page.

---

## 2. Design system (write once, in `globals.css`)

Replace the whole `:root` block. Single dark theme — the reference has no light mode, and adding one is scope nobody asked for.

```css
:root {
  /* surface */
  --bg:        #0c0c0c;
  --bg-2:      #151515;
  --fg:        #d8d8d4;
  --fg-2:      #c8c8c3;
  --mut:       #7b7b76;
  --line:      rgba(216, 216, 212, 0.15);
  --accent:    #ff4d00;

  /* type scale — fluid, clamp-based */
  --t-display: clamp(3.5rem, 1rem + 11vw, 12rem);   /* hero words */
  --t-h2:      clamp(2.25rem, 1rem + 5vw, 6rem);    /* section heads */
  --t-h3:      clamp(1.5rem, 1rem + 2vw, 2.75rem);
  --t-body:    clamp(1rem, 0.94rem + 0.3vw, 1.125rem);
  --t-lbl:     0.6875rem;                            /* uppercase labels */

  /* rhythm — deliberately uneven, not one padding everywhere */
  --pad-x:     clamp(1.25rem, 4vw, 5rem);
  --sec-lg:    clamp(7rem, 5rem + 9vw, 16rem);
  --sec-sm:    clamp(3.5rem, 3rem + 4vw, 7rem);

  /* motion */
  --ease:      cubic-bezier(0.83, 0, 0.17, 1);
  --d-fast:    280ms;
  --d-norm:    620ms;
  --d-slow:    1100ms;
}
```

**Typography.** Keep `Geist` + `Geist_Mono` from `next/font/google` (already wired in `layout.tsx`) — Geist is a close grotesk substitute for Switzer, it self-hosts, and it costs zero new dependencies. Display headings: Geist at `font-weight: 500`, `letter-spacing: -0.03em`, `line-height: 0.88`, `text-transform: uppercase`. Labels/indices: Geist Mono, `0.6875rem`, `letter-spacing: 0.18em`, uppercase, color `--mut`. That's the entire pairing strategy — two roles, one family + its mono sibling.

> If you want the exact reference feel, Switzer Variable is on Fontshare (free) and can be self-hosted in `src/app/fonts/`. Optional; Geist ships today.

**Color rules.**
- `--accent` appears on: active nav state, the hovered work row, the counting numerals, the contact CTA. Nowhere else.
- **Kill every gradient-clipped heading.** `animated-gradient-text`, `neon-text-*`, `neon-glow-*`, `.glass-card` gradients all go.
- Contrast: `--fg` on `--bg` = 12.8:1, `--mut` on `--bg` = 5.2:1, `--accent` on `--bg` = 5.1:1. All ≥ 4.5:1. Do not use `--accent` for body text under 18px on `--bg-2`.

---

## 3. Motion spec

One curve (`--ease`), three durations, scroll-driven. Rules:

1. **Reveal:** headings and rows enter with `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)` plus `translateY(0.4em)`, `--d-norm`, stagger 60 ms. Use `whileInView` from framer-motion (already installed) — no new library.
2. **Text roll on hover:** two stacked copies of the label, parent `overflow: hidden`, `transform: translateY(-100%)` on hover, `--d-fast`. Pure CSS.
3. **Sticky section headers:** `position: sticky; top: 0` on section labels so the section name pins while its rows scroll past.
4. **Marquee:** CSS `@keyframes` translating `-50%` on a duplicated track. No JS.
5. **Counters:** `IntersectionObserver` + `requestAnimationFrame` count-up, ~1.2 s. One small hook, `src/hooks/useCountUp.ts`.
6. **Do NOT add** GSAP, Lenis, or Locomotive. Native smooth scroll + framer-motion covers all of the above. The reference uses GSAP; we don't need it for this feature set, and it's 70 kB we'd have to justify.
7. Compositor-only properties: `transform`, `opacity`, `clip-path`. Nothing animating `width`/`height`/`top`.
8. `@media (prefers-reduced-motion: reduce)` — marquees stop, counters snap to final value, reveals become instant opacity, sticky stays.

---

## 4. Section-by-section mapping

Copy stays byte-identical. Only the container changes.

### 4.1 Preloader + page frame — **new**, `src/components/Preloader.tsx`
Reference has a numeric `0% → 100%` counter over a full-bleed wipe. Ours: a fixed overlay showing `ANDRY HUANG` (existing string) + counter, wiping upward on load. Runs once per session (`sessionStorage`), skipped entirely under reduced-motion. Also add a `noise` overlay div in `layout.tsx` replacing the aurora div:

```tsx
<div aria-hidden className="fixed inset-0 -z-10 bg-[var(--bg)]" />
<div aria-hidden className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay
                            bg-[url('/img/noise.png')] bg-repeat" />
```
(One 128×128 tiling PNG in `public/img/`, ~2 kB. Replaces a 187-line Three.js scene.)

### 4.2 Navbar — `src/components/Navbar.tsx`
Same nav items, same EN/ID labels, same language toggle. Restyle:
- Fixed, transparent, hairline bottom border only after scroll (`border-color: var(--line)`).
- Left: wordmark `Portfolio` (existing string) in mono uppercase — drop `animated-gradient-text`.
- Right: nav items as mono uppercase labels with the roll-up hover; active item in `--accent`.
- Language pill → plain `ID / EN` mono text, active in `--fg`, inactive `--mut`. Keeps the 44 px touch target via padding.
- Mobile menu → full-screen overlay, items at `--t-h3`, staggered clip reveal.

### 4.3 Hero — `src/components/Hero.tsx`
Currently: centered stack, Three.js galaxy, glitch name, typewriter, badge, two glowing buttons.
Becomes: **left-aligned editorial masthead**, full viewport.

```
┌───────────────────────────────────────────────────────────┐
│ ANDRY HUANG — FULLSTACK DEVELOPER        [6+ YEARS ...]    │  ← mono labels, top rail
│                                                           │
│ HELLO, I'M                                                │  ← existing "Hello, I'm" / "Halo, Saya"
│ A N D R Y                                                 │
│ H U A N G                                                 │  ← --t-display, 0.88 line-height
│                    ┌──────────────────────────────────┐   │
│                    │ Building large-scale SaaS ...    │   │  ← existing paragraph, max-w-[42ch],
│                    │ (unchanged copy)                 │   │    offset right — breaks the grid
│                    └──────────────────────────────────┘   │
│ SCROLL ↓          GITHUB  LINKEDIN  WHATSAPP    VIEW MY... │  ← existing labels, text links
└───────────────────────────────────────────────────────────┘
```
- Keep the typewriter role cycle — it's real content (`rolesEn` / `rolesId`) — but render it in mono at `--t-lbl` in the top rail, not as a gradient headline. Same strings, same rotation.
- Keep the `{years}+ Years of Experience` / `{years}+ Tahun Pengalaman` badge string; render as a mono label, no glow, no float animation.
- Social links become underlined text labels (GitHub / LinkedIn / WhatsApp), not glass tiles. Roll-up hover.
- `View My Projects` / `Lihat Portofolio Saya` → large text link with `→`, accent on hover. `Let's Talk` / `Hubungi Saya` → secondary text link.
- **Delete** `<ThreeBackground />` from this component.

### 4.4 Manifesto strip — **new**, reuses existing copy
Reference has a single oversized statement between hero and work. We already have the line: the About intro paragraph (`Hi! I'm Andry Huang, a Fullstack Engineer with N+ years…` / ID equivalent). Pull that **existing** paragraph up into a `--t-h2` full-bleed statement block on `--bg-2`, and let the About section keep only its second paragraph. No new words written; one existing paragraph is promoted.

### 4.5 Featured work — **new on the homepage**, `src/components/FeaturedWork.tsx`
Today the homepage has no work section at all; projects live only on `/portofolio`. The reference's strongest section is featured work, so surface the existing `featured: true` projects from `Projects.tsx` (data already flagged — no new data, no new copy).

Layout: **index rows**, not cards.

```
FEATURED WORK                                   03 — SELECTED
─────────────────────────────────────────────────────────────
01   INTERNAL REPORTING SYSTEM      ASP CLASSIC · SQL   2017–2021  →
─────────────────────────────────────────────────────────────
02   QUALIV                          NEXT.JS · AI        2024      →
─────────────────────────────────────────────────────────────
03   SMRT TENANT MANAGEMENT          .NET · SAAS         2023      →
─────────────────────────────────────────────────────────────
                                              ALL WORK (05) →
```
- Row height ≥ 88 px, hairline separators, index in mono.
- Hover: row background → `--bg-2`, name shifts `translateX(0.5rem)`, tags fade in, and the project image (`project.images[0]`) follows the cursor as a `240×160` thumbnail with `clip-path` reveal. Desktop only (`pointer: fine`); on touch the thumbnail renders inline at the row's right edge.
- Extract the row into `src/components/work/WorkRow.tsx` so `/portofolio` reuses it.

### 4.6 About — `src/components/About.tsx` (451 → ~180 lines)
- Photo: full-bleed left column, `grayscale(1)` → `grayscale(0)` on scroll-in. Drop the rotating gradient border and the two pulsing dots.
- Bio paragraphs: unchanged text, `--t-body`, `max-w-[52ch]`, right column.
- Location + education badges: unchanged strings, mono labels on a hairline row. **Replace the 📍 and 🎓 emoji with Lucide `MapPin` / `GraduationCap`** — emoji-as-icon is banned by the UX standard; the text after them is untouched.
- Stats rail: reuse the existing numbers (`{years}+ years`, project count from `projects.length`, certification count) as count-up numerals with mono captions. No new labels — reuse the strings already present.
- **Experience timeline → experience index.** Drop the center line, the alternating left/right layout, and the glass cards. Each role becomes a full-width row: `period` (mono, left, sticky within its block) · `title` + `company` + `description` + achievement list (right column, `max-w-[60ch]`). All four entries, both languages, verbatim. Hairline between roles.

### 4.7 Skills — `src/components/Skills.tsx`
Restructure to the reference's **numbered services rows** (`01 / 02 / 03 / 04`): category name at `--t-h3`, tech chips as mono uppercase labels on hairline pills, per-row index and item count. Same category names and same tech lists as today. First row open by default; rows expand on click (`<details>`-backed for keyboard/AT support, styled). No progress bars, no colored glow tiles.

### 4.8 Certifications → recognition list — `src/components/Certifications.tsx`
Reference's `recog` block: one line per item — `● NAME · ISSUER · YEAR`. Convert the existing certification cards to that list. Credential links become `→` text links. Same titles, issuers, years.

### 4.9 FAQ — `src/components/FAQ.tsx`
Already an accordion; restyle only: hairline rows, `+` / `−` glyph rotation, question at `--t-h3`, answer `max-w-[60ch]` in `--mut`. Keep the JSON-LD FAQPage schema in `layout.tsx` in sync (it already mirrors these strings — verify after the edit).

### 4.10 Contact — `src/components/Contact.tsx`
Reference footer CTA is one enormous line. Ours:
- `Get In Touch` / `Hubungi Saya` at `--t-display`, hover fills with `--accent`, links to the existing WhatsApp URL.
- The existing supporting paragraph below, `max-w-[48ch]`, `--mut`.
- LinkedIn / GitHub / WhatsApp: three hairline rows with labels and existing sub-text (`Connect with me`, `View repositories`, `+62 81-357-296-386`) — not gradient cards. Delete the cyber corners and scan-line sweeps.

### 4.11 Footer — `src/components/Footer.tsx`
Sitemap column + elsewhere column + back-to-top `↑` + copyright, all mono uppercase on hairlines. Optional: one slow marquee of the existing wordmark strings above the footer rule.

### 4.12 `/portofolio` — `src/components/Projects.tsx` (1553 lines)
Out of scope for a full rewrite in phase 1, but it must not look like a different website. Minimum:
- Swap the color/glow/gradient classes for the new tokens (the `color: "from-amber-500 to-orange-500"` field per project becomes unused — leave the data, stop rendering it as a gradient).
- Filter pills → mono uppercase labels with an accent underline on active.
- Grid → the same `WorkRow` index rows from 4.5, grouped by `GroupKey` with a sticky group label.
- Modal → full-screen takeover, hairline meta table, image strip. Keep every string.

Phase 1 can ship 4.1–4.11 with `Projects.tsx` receiving only the token swap; the row conversion is phase 3.

---

## 5. Files: add / change / delete

**Add**
| File | Purpose |
|---|---|
| `src/components/Preloader.tsx` | numeric counter + wipe, once per session |
| `src/components/FeaturedWork.tsx` | homepage work index |
| `src/components/work/WorkRow.tsx` | shared row (home + `/portofolio`) |
| `src/components/ui/Label.tsx` | mono uppercase label / index / chip |
| `src/components/ui/RollLink.tsx` | roll-up hover text link |
| `src/components/ui/Reveal.tsx` | clip-path scroll reveal wrapper |
| `src/hooks/useCountUp.ts` | IO + rAF counter |
| `public/img/noise.png` | 128×128 grain tile |
| `src/components/__checks__/tokens.check.ts` | assert contrast ratios + token presence (see §8) |

**Rewrite** `globals.css`, `layout.tsx` (background + noise), `Navbar`, `Hero`, `About`, `Skills`, `Certifications`, `FAQ`, `Contact`, `Footer`, `page.tsx`.

**Delete outright**
| File | Why |
|---|---|
| `src/components/ThreeBackground.tsx` (187 l) | galaxy replaced by flat bg + grain; drops `three` + `@types/three` (~600 kB installed, ~150 kB gzipped shipped) |
| `src/components/CodeAnimations.tsx` (378 l) | matrix rain, hex rise, scan lines, glitch, cursor trail, terminal window, cyber grid — all off-direction |
| `src/components/AnimationEffects.tsx` (156 l) | spotlight cards die with the glass cards |
| `src/components/SectionDivider.tsx` (70 l) | replaced by hairline + sticky mono section label |

Also remove from `page.tsx`: `<TerminalWindow />`, `<CursorTrail />`, all `<SectionDivider>` calls, and the `lucide-react` imports that go with them. **Keep** `AIChatbot` (real feature) — restyle it to the token set.

Then: `npm uninstall three @types/three`.

Net: roughly **−790 lines and one heavy dependency**, before the About/Skills/Contact simplifications land.

---

## 6. Page composition after refactor

```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-[100dvh] bg-[var(--bg)] text-[var(--fg)]">
      <Preloader />
      <Navbar />
      <Hero />
      <Manifesto />       {/* promoted existing About paragraph */}
      <FeaturedWork />
      <About />
      <Skills />
      <Certifications />
      <FAQ />
      <Contact />
      <Footer />
      <AIChatbot />
    </main>
  );
}
```

Every section renders `<SectionHead label="…" index="01" />` — a sticky mono label + hairline. Same section names as the current `SectionDivider` labels (`ABOUT ME`, `SKILLS & STACK`, `CERTIFICATIONS & CREDENTIALS`, `FREQUENTLY ASKED QUESTIONS`, `CONTACT & INQUIRIES`), reused verbatim.

---

## 7. Non-negotiables carried through

**Accessibility**
- Touch targets ≥ 44 px — work rows are 88 px, nav items get `py-3`.
- Visible focus: `:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }`. The old design had none.
- Icons are SVG (Lucide) only — the two emoji in `About.tsx` are the last ones; they go.
- Preloader carries `aria-hidden` and never traps focus; content is in the DOM behind it.
- Marquees `aria-hidden` (decorative duplicate text) — the real string stays in a readable element.
- Accordions use `<details>/<summary>` or a proper `aria-expanded` button.
- `prefers-reduced-motion` honored per §3.8 — note the current blanket `[style*="animation"] { animation: none !important }` hack in `globals.css` disappears with the inline-style animations it was patching.

**Performance** (landing budget: JS < 150 kB gz, CSS < 30 kB)
- Dropping `three` alone should put the homepage under budget.
- Hero has no image; the About portrait is the only `priority` image, with explicit dimensions.
- Work thumbnails: `loading="lazy"`, fixed `width`/`height`, AVIF/WebP via `next/image`.
- Targets unchanged: LCP < 2.5 s, INP < 200 ms, CLS < 0.1.

**SEO** — headings keep their semantic level (`h1` hero, `h2` per section, `h3` per row). The JSON-LD graph, metadata, sitemap, robots, and manifest are untouched. FAQ answers in `layout.tsx` must still match `FAQ.tsx` after restyling.

---

## 8. The one runnable check

Non-trivial logic here is the token/contrast contract — everything else is markup a screenshot can verify. Add `src/components/__checks__/tokens.check.ts`, runnable with `npx tsx`:

```ts
// Asserts the palette actually meets WCAG AA against the real background,
// so a future token tweak can't silently ship unreadable text.
import assert from "node:assert/strict";

const hex = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
const lum = (h: string) =>
  hex(h).map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
        .reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a: string, b: string) =>
  (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);

const BG = "#0c0c0c", BG2 = "#151515";
for (const [name, fg, min] of [
  ["fg/bg", "#d8d8d4", 4.5], ["mut/bg", "#7b7b76", 4.5],
  ["accent/bg", "#ff4d00", 4.5], ["fg/bg2", "#d8d8d4", 4.5],
] as const) {
  const bg = name.endsWith("bg2") ? BG2 : BG;
  const r = ratio(fg, bg);
  assert.ok(r >= min, `${name} contrast ${r.toFixed(2)} < ${min}`);
}
console.log("tokens ok");
```

Plus the visual pass (per the web testing rules): Playwright screenshots at 320 / 375 / 768 / 1024 / 1440 / 1920 on `/` and `/portofolio`, keyboard tab-through of nav → work rows → accordions → contact, and one Lighthouse run against `/`. `playwright` is already a devDependency.

---

## 9. Phases

**Phase 1 — foundation** (no visual regressions allowed to leak): rewrite `globals.css` tokens, `layout.tsx` background + noise, add `ui/Label`, `ui/RollLink`, `ui/Reveal`, add the contrast check. Delete `ThreeBackground`, `CodeAnimations`, `AnimationEffects`, `SectionDivider` and every reference to them; `npm uninstall three @types/three`. Build must stay green.

**Phase 2 — above the fold:** `Navbar`, `Hero`, `Preloader`, `Manifesto`. This is where the direction becomes visible; screenshot-review before continuing.

**Phase 3 — content sections:** `FeaturedWork` + `WorkRow`, `About`, `Skills`, `Certifications`, `FAQ`, `Contact`, `Footer`.

**Phase 4 — `/portofolio`:** token swap first, then convert the grid to `WorkRow` and the modal to a full-screen takeover.

**Phase 5 — verification:** responsive screenshots, keyboard pass, reduced-motion pass, Lighthouse, bundle check against budget.

---

## 10. Design-quality self-check (per the anti-template policy)

The result should hit these, and it's worth re-reading them at review time rather than after launch:

- [x] Hierarchy through scale contrast — `--t-display` at 12rem against `--t-lbl` at 11px
- [x] Uneven rhythm — `--sec-lg` vs `--sec-sm`, offset hero paragraph, sticky labels
- [x] Depth without shadows — grain, `--bg-2` steps, sticky layering, cursor-follow thumbnails
- [x] Deliberate typography — one family, two roles, real tracking/leading decisions
- [x] Semantic color — a single accent reserved for state and CTA
- [x] Designed hover/focus/active — roll-up, row fill, thumbnail reveal, accent focus ring
- [x] Grid-breaking editorial composition — index rows, offset columns
- [x] Motion that clarifies — scroll reveals track reading order; nothing decorative loops forever

**And the thing being fixed:** the current build is a dark gradient template with seven accent colors and five simultaneous particle systems. The refactor's whole value is subtraction — one font, two neutrals, one accent, no WebGL. If a phase adds files without deleting more than it adds, it has drifted.
