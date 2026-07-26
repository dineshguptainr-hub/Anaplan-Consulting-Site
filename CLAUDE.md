# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — Next.js dev server (Turbopack) on http://localhost:3000
- `npm run build` — production build; **also type-checks, so treat any failure as blocking**
- `npm run start` — serve the production build (run `build` first)
- `npm run lint` — no ESLint config exists in this repo yet, so the first run prompts interactively to create one. In a non-interactive/agent context that prompt is expected, not a failure.
- No test suite is configured.

## Architecture

Multi-page Next.js (App Router, TypeScript) marketing site for **EPM Journey**, an Anaplan Connected Planning consultancy positioned as a Certified Master Anaplanner leading a team of enterprise practitioners. There is no CMS, database, or content layer — all copy lives inline in the component files.

### Page composition

Three routes compose section components from `components/`; every page shares `Header`/`Footer`:

| Route | Sections |
|---|---|
| [app/page.tsx](app/page.tsx) | `Hero → CredentialCarousel → CredentialStrip → ConnectedHoneycomb → WorkflowDemo → Authority → CtaBand` |
| [app/services/page.tsx](app/services/page.tsx) | `PainPleasure → ServicesGrid → Capabilities → CtaBand` |
| [app/contact/page.tsx](app/contact/page.tsx) | `ContactSection` |

The two interactive proof pieces (`ConnectedHoneycomb`, `WorkflowDemo`) live on the **home** page deliberately — they are the site's main differentiator and were placed there so visitors reach them without a click. Don't relocate them to `/services` without a reason.

**Route-based nav**: `NAV_LINKS` in [components/Header.tsx](components/Header.tsx) and the array in [components/Footer.tsx](components/Footer.tsx) both use `next/link` to `/`, `/services`, `/contact` — real navigations, not hash anchors. Moving a section between pages means updating both nav arrays and the page imports.

**Content-as-data**: each section keeps repeatable content in a top-of-file array that JSX maps over (`BEFORE_ITEMS`/`AFTER_ITEMS`, `CAPABILITIES`, `SERVICES`, `MODELS`, `LEDGER`, `TOOL_OPTIONS`, …). Edit those arrays to change copy rather than touching the surrounding markup.

**Client vs server components**: most sections are server components. The client ones (`"use client"`) are `Header` (mobile menu + `usePathname`), `Reveal`, `CredentialCarousel`, `ConnectedHoneycomb`, `WorkflowDemo`, and `ContactForm`. Keep new sections server-rendered unless they genuinely need state.

### Contact form → Google Sheets

[components/ContactForm.tsx](components/ContactForm.tsx) holds form state and validation and POSTs JSON to [app/api/contact/route.ts](app/api/contact/route.ts). That server route validates the payload and forwards it to a Google Apps Script Web App, which appends a row to a Sheet. Forwarding server-side keeps the webhook URL out of the client bundle. Without the env var the route returns 500 and the form shows a graceful inline error.

The route reads `GOOGLE_SHEETS_WEBHOOK_URL` **and falls back to `GOOGLE_SHEETS_WEBHOOKS_URL`** (plural) — the plural spelling is what currently exists in Vercel, and the mismatch was silently 500-ing the production form. Once Vercel is renamed to the singular canonical name, the fallback can go.

The Apps Script source to paste into the Sheet's editor (Extensions → Apps Script) is at [scripts/google-apps-script-webhook.gs](scripts/google-apps-script-webhook.gs); it is not built or executed by the Next.js app. `ContactForm` is styled to sit inside the panel `ContactSection` provides, so it carries no card border or padding of its own.

### Styling system

- **Tokens** in [tailwind.config.ts](tailwind.config.ts): `trust` (primary blue, 600 = `#2563A8`), `ember` (orange accent), `success` (workflow "submitted"/"accepted" states), `alert`, plus `ink`/`paper`/`surface`/`cream` neutrals, and `hero-glow` / `grid-fade` / `ledger-grid` background images.
- **Component classes** composed with `@apply` in [app/globals.css](app/globals.css): `.btn-primary`, `.btn-secondary`, `.card`, `.container-max`, `.eyebrow`, `.section-heading`, `.ledger-panel`, `.status-pill`. Prefer these over new one-off utility strings.
- **Fonts**: Libre Franklin (display), Source Sans 3 (body), IBM Plex Mono (stat figures and eyebrow labels) — loaded via `next/font/google` in [app/layout.tsx](app/layout.tsx) as `--font-display`/`--font-body`/`--font-mono`, mapped to `font-display`/`font-body`/`font-mono`.
- **Sections alternate `bg-paper` and `bg-surface`** down each page. Keep the alternation when adding a section; two adjacent white sections flatten the page.
- **Path alias**: `@/*` maps to the project root (see [tsconfig.json](tsconfig.json)).

## Gotchas worth knowing

**`@apply` component classes beat display utilities.** The classes in `globals.css` are declared *after* `@tailwind utilities`, so at equal specificity they win. `className="btn-primary hidden"` renders visible — you must write `!hidden` / `sm:!inline-flex`. This is why `!px-5`-style overrides already appear throughout the codebase.

**The honeycomb geometry is a coupled triple.** In [components/ConnectedHoneycomb.tsx](components/ConnectedHoneycomb.tsx), the `94×108` cell size, the `RING` offsets, and the pointy-top `HEX_CLIP` only tile correctly together (horizontal neighbours one width apart, diagonals at `w/2, h*0.75`). Changing one without the others produces overlapping cells — that was a real shipped bug. The hub is deliberately a shade darker (`trust-700`) and inset to `scale(0.92)` so it stays distinct from whichever model hex is active.

**Fixed-geometry visuals scale, they don't reflow.** `ConnectedHoneycomb` (300px stage) and `SpreadsheetChaos` (absolutely-positioned file stack) keep exact geometry and shrink via `scale()` on a fixed-size wrapper. `WorkflowDemo` is different: its 760×400 desktop org chart has a *separate* stacked-timeline tree below `lg`, swapped with `hidden lg:block` / `lg:hidden` — **CSS, not `matchMedia`**, so there is no hydration mismatch. Both trees read one shared state object.

**Motion has a reduced-motion path everywhere.** [components/Reveal.tsx](components/Reveal.tsx) renders visible immediately, the carousel freezes on slide 1, and `WorkflowDemo` jumps straight to the completed end state instead of animating. `Reveal` also starts children at `opacity: 0`, so a `<noscript>` rule in [app/layout.tsx](app/layout.tsx) forces `[data-reveal]` visible when JS is unavailable — keep that in sync if the reveal mechanism changes.

**`section[id]` carries `scroll-margin-top`** in `globals.css` so in-page anchors clear the sticky header. New anchor targets should be `<section id="…">` to inherit it.

**`app/icon.tsx`** generates a dynamic `/icon` route, but the explicit `metadata.icons` in `app/layout.tsx` takes precedence, so the static set in `public/` is what actually ships. The dynamic route is currently unreferenced.

## Verifying changes

`npm run build` catches type errors but not layout regressions. For visual work, run the dev server and check at **375 / 768 / 1440** — confirm no horizontal body scroll, that `WorkflowDemo` swaps to the stacked timeline below 768, and that a full "Run Forecast Cycle" completes (~6.2s) through the completion banner. Re-running mid-cycle should reset cleanly; navigating away mid-cycle should not warn about state updates after unmount.
