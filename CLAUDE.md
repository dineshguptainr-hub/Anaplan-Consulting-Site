# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — Next.js dev server (Turbopack) on http://localhost:3000
- `npm run build` — production build; **also type-checks, so treat any failure as blocking**
- `npm run start` — serve the production build (run `build` first)
- `npm run lint` — no ESLint config exists in this repo yet, so the first run prompts interactively to create one. In a non-interactive/agent context that prompt is expected, not a failure.
- No test suite is configured.
- **Next 16 on React 18**, not React 19 — don't reach for React 19-only APIs.

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

The route reads `GOOGLE_SHEETS_WEBHOOK_URL`. Vercel once defined this as `GOOGLE_SHEETS_WEBHOOKS_URL` (plural), which silently 500-ed the production form; the route carried a fallback accepting both spellings until Vercel was corrected to the singular canonical name.

**The webhook URL is not a credential — the secret is.** A Web App deployed with "Access: Anyone" will write for anybody who holds its URL, and URLs leak (this one sat in `.env.local.example` in a public repo). So every request also carries `CONTACT_WEBHOOK_SECRET`, which the script compares against its `WEBHOOK_SECRET` script property and **fails closed** on: unset property means every submission is refused. Set the script property before deploying a new script version. Apps Script Web Apps always answer HTTP 200, so the route checks `ok` in the response *body* — a 200 is not proof the row landed.

**Debugging the webhook from a terminal is misleading.** A successful `doPost` answers **HTTP 302** to a `script.googleusercontent.com/macros/echo?...` URL, and the JSON body lives at *that* URL — `curl -L` mangles the follow and reports Google's "Page not found" Drive page, which reads exactly like a wrong URL and is not. Fetch the `Location` header, then GET it separately. Two more signals: a thrown script exception renders its error inline with **no** redirect, and a `GET` on this POST-only script answering `Script function not found: doGet` proves the deployment is live and publicly reachable. Also check **Who has access: Anyone** on the deployment — anything stricter returns the same Drive error page to a server-side call.

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

**The live site is `https://epmjourney.com`** (apex is canonical; `www` 308-redirects to it). The domain is registered at IONOS and **IONOS also hosts its DNS** — Vercel is pointed at via an `A` record on the apex, not by delegating nameservers. That is deliberate: the domain carries live `mx00/mx01.ionos.co.uk` MX records, and handing the nameservers to Vercel would drop them and kill `@epmjourney.com` mail. Change web records at IONOS; leave NS and MX alone.

`lib/site.ts` is the single source of truth for the URL. `SITE_URL` is hard-coded rather than read from `VERCEL_PROJECT_PRODUCTION_URL`, which resolves to whichever domain Vercel currently considers shortest and can drift. `CURRENT_URL` (used for `metadataBase`) self-references on preview and localhost, and `app/robots.ts` returns `disallow: /` on anything that isn't `VERCEL_ENV === "production"` — **preview deployments are `noindex` by design**, so don't read that as a bug when testing a branch.

There is no `.vercel` directory in the repo and the `gh` CLI is not installed, so opening PRs and watching builds happen in the browser rather than from the terminal.

**Vercel bakes environment variables in at build time.** Adding or editing one changes nothing until the project is redeployed (Deployments → ⋮ → Redeploy). This is the first thing to check whenever a config change appears to have had no effect — it cost half an hour of misdiagnosis once, with a broken contact form that looked like a bad webhook URL and was really a build that predated the new variables.

## Verifying changes

`npm run build` catches type errors but not layout regressions. For visual work, run the dev server and check at **375 / 768 / 1440**.

Two things to know when driving a headless browser against the dev server. Client-side effects run **after hydration**, so a measurement taken the moment navigation completes reads pre-hydration values — the `WorkflowDemo` chart reports `scrollLeft: 0` until you wait for network idle, which looks like the centring effect never fired. And the `/browse` daemon does not reliably survive between separate shell invocations here: chain every command (viewport → goto → wait → assert) into **one** call, or the page resets to `about:blank` and selectors come back `null`.

What to check:

- No horizontal body scroll on any route.
- `WorkflowDemo`'s org chart keeps its shape below **1024px**, scrolling inside its own container (page itself must not scroll sideways) and starting centred on the Head card.
- A full "Run Forecast Cycle" completes (~6.2s) through the completion banner, with the ERP/GL pipes going grey → flowing blue → solid green. Re-running mid-cycle should reset cleanly; navigating away mid-cycle should not warn about state updates after unmount.
- The honeycomb hub touches all six models with no gap and no overlap.
- Hovering any icon tile fills it ember and scales it — this should behave identically on all three pages.
