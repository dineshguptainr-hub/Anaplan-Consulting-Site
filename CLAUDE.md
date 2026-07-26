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

`/` is the landing page (the "Escape Spreadsheet Hell" hero). The two interactive proof pieces (`ConnectedHoneycomb`, `WorkflowDemo`) live on **home** deliberately — they are the site's main differentiator and were placed there so visitors reach them without a click. Don't relocate them to `/services` without a reason.

**Route-based nav**: `NAV_LINKS` in [components/Header.tsx](components/Header.tsx) and the array in [components/Footer.tsx](components/Footer.tsx) both use `next/link` to `/`, `/services`, `/contact` — real navigations, not hash anchors. Moving a section between pages means updating both nav arrays and the page imports.

**Content-as-data**: each section keeps repeatable content in a top-of-file array that JSX maps over (`BEFORE_ITEMS`/`AFTER_ITEMS`, `CAPABILITIES`, `SERVICES`, `MODELS`, `PROMISES`, `TOOL_OPTIONS`, …). Edit those arrays to change copy rather than touching the surrounding markup.

**Client vs server components**: most sections are server components. The client ones (`"use client"`) are `Header` (mobile menu + `usePathname`), `Reveal`, `CredentialCarousel`, `ConnectedHoneycomb`, `WorkflowDemo`, and `ContactForm`. Keep new sections server-rendered unless they genuinely need state.

### The journey section

[components/ConnectedHoneycomb.tsx](components/ConnectedHoneycomb.tsx) is not just the honeycomb — it renders a **before/after pair**: `SpreadsheetChaos` (five scattered `.xlsx` files on ruled grid paper) on the left, the clickable six-model honeycomb on the right, joined by a flowing dashed `Seam` that rotates from horizontal to vertical when the panels stack below `lg`.

[components/SpreadsheetChaos.tsx](components/SpreadsheetChaos.tsx) is a bare 440×400 stage with no card or caption of its own — the journey panel supplies those. It is used **only** here; it was deliberately removed from `PainPleasure` so the same illustration doesn't run on two pages.

### Contact form → Google Sheets

[components/ContactForm.tsx](components/ContactForm.tsx) holds form state and validation and POSTs JSON to [app/api/contact/route.ts](app/api/contact/route.ts). That server route validates the payload and forwards it to a Google Apps Script Web App, which appends a row to a Sheet. Forwarding server-side keeps the webhook URL out of the client bundle. Without the env var the route returns 500 and the form shows a graceful inline error.

The route reads `GOOGLE_SHEETS_WEBHOOK_URL` **and falls back to `GOOGLE_SHEETS_WEBHOOKS_URL`** (plural) — the plural spelling is what currently exists in Vercel, and the mismatch was silently 500-ing the production form. Once Vercel is renamed to the singular canonical name, the fallback can go.

The Apps Script source to paste into the Sheet's editor (Extensions → Apps Script) is at [scripts/google-apps-script-webhook.gs](scripts/google-apps-script-webhook.gs); it is not built or executed by the Next.js app. `ContactForm` is styled to sit inside the panel `ContactSection` provides, so it carries no card border or padding of its own.

### Styling system

- **Tokens** in [tailwind.config.ts](tailwind.config.ts): `trust` (primary blue, 600 = `#2563A8`, 700 = `#1A4780`), `ember` (orange accent), `success` (workflow "submitted"/"accepted" states), `alert`, plus `ink`/`paper`/`surface`/`cream` neutrals, `hero-glow` / `grid-fade` / `ledger-grid` background images, and `float1`/`float2` drift keyframes.
- **Fonts**: Libre Franklin (display), Source Sans 3 (body), IBM Plex Mono (stat figures and eyebrow labels) — loaded via `next/font/google` in [app/layout.tsx](app/layout.tsx) as `--font-display`/`--font-body`/`--font-mono`.
- **Sections alternate `bg-paper` and `bg-surface`** down each page. Keep the alternation when adding a section; two adjacent white sections flatten the page.
- **Path alias**: `@/*` maps to the project root (see [tsconfig.json](tsconfig.json)).

### Shared visual language

Everything below is defined once in [app/globals.css](app/globals.css) and reused site-wide. Prefer these over new one-off utility strings — the site reads as one system precisely because sections don't reinvent them.

| Class | Purpose |
|---|---|
| `.btn-primary` `.btn-secondary` `.card` `.container-max` `.eyebrow` `.section-heading` `.ledger-panel` `.status-pill` | base `@apply` component classes |
| `.hex-tile` | pointy-top hexagon clip — the site's icon shape |
| `.hex-tile--hover` | on a `group` parent: fills ember, scales 1.1 on hover/focus |
| `.card-lift` | lifts 4px, warms border, deepens shadow on hover |
| `.flow-line` + `--moving` / `--settled` | SVG dashed pipe that flows toward its destination, then goes solid |
| `.flow-spine` | vertical CSS sibling of `.flow-line`, same 6/6 dash rhythm |

**The flowing-dash motion is one deliberate language**, not scattered effects: it represents data moving through connected pipes, which is literally the product. It drives the journey seam, the ERP/GL → Data Hub pipes, and the contact page's node spine. Reuse it rather than inventing new motion.

[components/HexAmbience.tsx](components/HexAmbience.tsx) supplies the drifting-hex background behind most sections (`variant="dark"` for navy panels). It is intentionally **not** on the credential carousel or strip — those are thin bands where it reads as noise.

## Gotchas worth knowing

**`@apply` component classes beat display utilities.** The classes in `globals.css` are declared *after* `@tailwind utilities`, so at equal specificity they win. `className="btn-primary hidden"` renders visible — you must write `!hidden` / `sm:!inline-flex`. This is why `!px-5`-style overrides already appear throughout the codebase.

**The honeycomb geometry is a coupled triple.** In `ConnectedHoneycomb`, the `94×108` cell size, the `RING` offsets, and the pointy-top `HEX_CLIP` only tile correctly together (horizontal neighbours one width apart, diagonals at `w/2, h*0.75`). Changing one without the others produces overlapping cells — a real shipped bug. The hub renders at **full size so it tiles flush with the ring** (no gap, no overlap) and stays distinct from the active model by colour alone: `trust-700` navy hub vs `trust-600` active hex. Don't reintroduce a scale inset to separate them.

**`WorkflowDemo`'s org-chart connectors are hard-coded coordinates coupled to card heights.** `CONNECTORS` is a list of `[left, top, width, height]` segments. The stub under the head card starts at the card's bottom edge, so the head card is given a **fixed height** (`h-[78px]`) and extra width. When its status text grew to two lines, the card overlapped the stub and the connector visually vanished — if you change that card's content or size, re-check the geometry.

**Fixed-geometry visuals scale, they don't reflow.** `ConnectedHoneycomb` (300px stage) and `SpreadsheetChaos` (absolutely-positioned file stack) keep exact geometry and shrink via `scale()` on a fixed-size wrapper. `WorkflowDemo` is different again: there is **one** 760×400 org chart at every breakpoint, and below `lg` it neither reflows nor scales — the wrapper bleeds to the viewport edges (`-mx-6 px-6 sm:-mx-8 sm:px-8`) and scrolls horizontally, with an `lg:hidden` swipe hint. Don't add a reflowed or scaled-down variant: a flat list loses the Analysts → Managers → Head hierarchy that is the whole point of the diagram, and scaling to a 375px phone lands near `0.43` scale where the 12px card text is unreadable. The one piece of JS involved is a mount effect that sets `scrollLeft` to centre the chart, so the Head card is on screen on first paint rather than parked off to the right.

**Motion has a reduced-motion path everywhere.** [components/Reveal.tsx](components/Reveal.tsx) renders visible immediately, the carousel freezes on slide 1, `WorkflowDemo` jumps straight to the completed end state, and the flow/hover classes drop their animation and transform. `Reveal` also starts children at `opacity: 0`, so a `<noscript>` rule in `app/layout.tsx` forces `[data-reveal]` visible when JS is unavailable — keep that in sync if the reveal mechanism changes.

**`<body>` carries `suppressHydrationWarning`.** Browser extensions (Grammarly and friends) inject attributes like `data-gr-ext-installed` before React hydrates, which otherwise reports as a hydration mismatch. It suppresses that one element's attribute diff only, so genuine hydration bugs in children still surface.

**`section[id]` carries `scroll-margin-top`** in `globals.css` so in-page anchors clear the sticky header. New anchor targets should be `<section id="…">` to inherit it.

**`app/icon.tsx`** generates a dynamic `/icon` route, but the explicit `metadata.icons` in `app/layout.tsx` takes precedence, so the static set in `public/` is what actually ships. The dynamic route is currently unreferenced.

## Deployment

Vercel auto-deploys this repo from GitHub. **Pushing to `master` publishes the live site** — treat it as a release, not a save. Pushing any other branch produces a private preview deployment instead, which is the safe way to check a change on a real domain before it goes public.

There is no `.vercel` directory in the repo and the `gh` CLI is not installed, so opening PRs and watching builds happen in the browser rather than from the terminal.

## Verifying changes

`npm run build` catches type errors but not layout regressions. For visual work, run the dev server and check at **375 / 768 / 1440**:

- No horizontal body scroll on any route.
- `WorkflowDemo`'s org chart keeps its shape below **1024px**, scrolling inside its own container (page itself must not scroll sideways) and starting centred on the Head card.
- A full "Run Forecast Cycle" completes (~6.2s) through the completion banner, with the ERP/GL pipes going grey → flowing blue → solid green. Re-running mid-cycle should reset cleanly; navigating away mid-cycle should not warn about state updates after unmount.
- The honeycomb hub touches all six models with no gap and no overlap.
- Hovering any icon tile fills it ember and scales it — this should behave identically on all three pages.
