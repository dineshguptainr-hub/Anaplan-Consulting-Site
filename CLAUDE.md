# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — Next.js dev server (Turbopack) on http://localhost:3000
- `npm run build` — production build; **also type-checks, so treat any failure as blocking**
- `npm run start` — **does not work**; the site is a static export, so there is no server to start. Serve `out/` instead: `cd out && python -m http.server 8080`
- `npm run lint` — no ESLint config exists in this repo yet, so the first run prompts interactively to create one. In a non-interactive/agent context that prompt is expected, not a failure.
- No test suite is configured.
- **Next 16 on React 18**, not React 19 — don't reach for React 19-only APIs.
- `gh` is installed at `C:\Program Files\GitHub CLI\gh.exe` but is **not on PATH** in sessions started before it was installed — call it by full path. Use it for PR status and build logs rather than the browser.
- Deleting a route leaves stale generated types behind. If the build complains about a module you already removed, `rm -rf .next` and rebuild.

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

[components/ContactForm.tsx](components/ContactForm.tsx) holds form state and validation and POSTs **directly** to a Google Apps Script Web App, which appends a row to a Sheet. There is no server route in between — the site is a static export (see Deployment), so there is nowhere to run one.

**There is no secret in the browser, because there cannot be one.** The site previously proxied through `app/api/contact/route.ts` so a shared secret could live server-side. Static hosting removed that option: anything the bundle carries is public. So the browser instead proves it solved a **Cloudflare Turnstile** challenge, and the Apps Script — which *does* have somewhere private to keep a key — verifies that token with Cloudflare before writing. The Turnstile **site key** in the page is public by design; the **secret key** lives only in the script's `TURNSTILE_SECRET` script property, and the script **fails closed** on it: unset property means every submission is refused. Set the property before deploying a new script version.

Both `NEXT_PUBLIC_CONTACT_ENDPOINT` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` are deliberately `NEXT_PUBLIC_` — they are meant to be readable. Do not "fix" that by trying to hide them.

**The form posts `Content-Type: text/plain`, and that is load-bearing.** `application/json` would make it a non-simple CORS request, triggering a preflight `OPTIONS` that Apps Script Web Apps do not answer — the submission fails before it is ever sent. Apps Script also always answers HTTP 200, so the form checks `ok` in the response *body*; a 200 is not proof the row landed.

**Apps Script grants OAuth scopes once, at first authorisation, and never re-asks.** This project began life only touching the Sheet, so it held the Sheets scope and *not* `script.external_request`. Pasting in code that calls `UrlFetchApp` therefore threw at runtime — every submission failed while the deployment, the secret, the token and CORS all looked perfectly healthy from outside. The fix is to run any function that calls `UrlFetchApp` **from the editor**, which makes Apps Script prompt for the missing scope; `authorizeExternalRequests()` in the `.gs` file exists purely to be that function. **If verification fails with `fetch_failed`, this is why** — it means the call never left Google, not that Cloudflare refused anything.

**Distinguish the two Turnstile keys by length.** Site key ≈ **24** chars, secret key ≈ **35**, and both start `0x4AAAAAAA…` so they are easy to swap. A secret key in the browser produces Turnstile error `400020 invalid sitekey`; a site key in `TURNSTILE_SECRET` produces `invalid-input-secret`. Both have happened here. The script returns Cloudflare's own `error-codes` alongside `failed_challenge` precisely so these are distinguishable — `invalid-input-secret` (wrong key), `invalid-input-response` (bad token), `timeout-or-duplicate` (expired or replayed), `fetch_failed` (the scope problem above).

**Debugging the webhook from a terminal is misleading.** A successful `doPost` answers **HTTP 302** to a `script.googleusercontent.com/macros/echo?...` URL, and the JSON body lives at *that* URL — `curl -L` mangles the follow and reports Google's "Page not found" Drive page, which reads exactly like a wrong URL and is not. Fetch the `Location` header, then GET it separately. Two more signals: a thrown script exception renders its error inline with **no** redirect, and a `GET` on this POST-only script answering `Script function not found: doGet` proves the deployment is live and publicly reachable. Also check **Who has access: Anyone** on the deployment — anything stricter returns the same Drive error page to a server-side call, and a redirect to `accounts.google.com/ServiceLogin` means exactly that. **Editing a deployment can silently reset that setting**, so re-check it after every version bump; visitors' browsers are not signed into the owner's Google account, so anything short of "Anyone" breaks the live form.

The Apps Script source to paste into the Sheet's editor (Extensions → Apps Script) is at [scripts/google-apps-script-webhook.gs](scripts/google-apps-script-webhook.gs); it is not built or executed by the Next.js app. To test the widget locally without a Cloudflare account, build with Cloudflare's always-passing test site key `1x00000000000000000000AA` — the hidden `cf-turnstile-response` field then fills with `XXXX.DUMMY.TOKEN.XXXX`, which is how you can tell the widget wired up correctly. `ContactForm` is styled to sit inside the panel `ContactSection` provides, so it carries no card border or padding of its own.

### Search metadata

Each route sets its own `title` and `description` via the App Router `metadata` export — don't collapse them back to one shared title.

[lib/schema.ts](lib/schema.ts) builds the JSON-LD, rendered by [components/JsonLd.tsx](components/JsonLd.tsx) as a single `<script type="application/ld+json">` per page holding one `@graph`. Nodes are linked by `@id` (`#organization`, `#website`, `#page`) so the graph is connected rather than three loose objects. `JsonLd` must stay a **server** component — the markup has to be in the HTML Google receives, not injected after hydration.

The schema deliberately omits `address`, `telephone`, `founder`, `sameAs` and any rating. **Structured data is a claim made directly to search engines**, so nothing goes in that isn't already asserted on the site. Add them when there are real values, not placeholders.

**`PainPleasure` and `ContactSection` each carry their page's only `<h1>`** (`/services` and `/contact` respectively; `Hero` carries the homepage's). They render `<h1 className="section-heading">` rather than the `<h2>` every other section uses — styling is on the class, so the tag is invisible. Both are single-use by design; if either is ever reused on a page that already has an `h1`, that must be reverted.

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

**The live site is `https://epmjourney.com`**, hosted on **IONOS Web Hosting Plus** — the same IONOS contract that registers the domain and runs `@epmjourney.com` mail. DNS stays on IONOS nameservers; the apex points at IONOS webspace.

**The site is a static export** (`output: "export"` in [next.config.mjs](next.config.mjs)). `npm run build` writes a complete site to `out/`, which is what gets uploaded. This is not a preference — **IONOS shared hosting has no Node.js runtime at all**, so there is no server, no SSR, no ISR, no route handlers, and no middleware. IONOS's own docs are explicit that Node is available only at build time via GitHub Actions. Anything you add that needs a request-time server will build locally and fail in production.

That constraint is what shapes the contact form: it lost its API route and now talks to Apps Script directly, guarded by Turnstile. See the contact form section above before changing it.

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) does the work: `npm ci` → `next build` → assert the export looks sane → `lftp mirror` the `out/` folder to `/public` over SFTP. **Pushing to `master` publishes**; `workflow_dispatch` also offers a `dry_run` input that connects and lists the target directory without uploading, which is the safe way to test credentials.

Two deliberate choices in it. `mirror` runs **without `--delete`**, so a wrong `IONOS_REMOTE_DIR` can add files but never wipe the webspace — turn it on only once the path is confirmed. And `IONOS_REMOTE_DIR` is a repo **variable**, not a secret, because secrets are masked in logs and the upload path is the first thing you need to see when a deploy "succeeds" but the live site doesn't change. The `NEXT_PUBLIC_*` values are variables too, and being build-time inlined, **changing one does nothing until the next build** — updating the Apps Script or a GitHub variable never updates the deployed site by itself.

**Canonicalisation and security headers live in [public/.htaccess](public/.htaccess)**, not in the app. IONOS serves the site over http *and* https, on the apex *and* `www`, all returning 200 — four URLs for identical content, contradicting the sitemap that names `https://epmjourney.com` as canonical. The `.htaccess` 301s the other three onto it. Note the HTTPS rule checks both `%{HTTPS}` and `X-Forwarded-Proto`: testing only `%{HTTPS}` is the standard way to write this *and* the standard way to cause an infinite redirect loop when TLS terminates upstream. Anything in `public/` is copied verbatim into `out/`, dotfiles included — verified, not assumed, and `lftp mirror` does transfer them. The same file sets HSTS, `nosniff`, `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy`; HSTS is deliberately **not** preloaded, since submitting to the preload list is close to irreversible.

`trailingSlash: true` makes `/services/` canonical, so the export writes `out/services/index.html` and Apache serves it from the directory index with no rewrite rules. `app/sitemap.ts` lists the slashed forms to match; listing `/services` would advertise URLs that only 301.

`lib/site.ts` is the single source of truth for the URL. `SITE_URL` is hard-coded so the address baked into the export never depends on which machine built it. `SHOULD_INDEX` keys off `NODE_ENV`, deliberately **not** a host-specific variable — an earlier version read `VERCEL_ENV`, which simply does not exist on an IONOS build, so `next build` produced a `robots.txt` saying `Disallow: /` and the live site would never have been indexed. Set `NEXT_PUBLIC_SITE_NOINDEX=1` to keep a staging copy out of the index.

`npm run start` does **not** work with `output: "export"` — there is no server to start. To check a production build locally, serve the folder: `python -m http.server 8080` from inside `out/`.

**Route handlers need `export const dynamic = "force-static"`.** `app/robots.ts`, `app/sitemap.ts` and `app/icon.tsx` all carry it. Without it the export fails with "export const dynamic … not configured on route", which reads like a config error and is really just Next asking you to confirm the route can be written at build time. Deleting `app/api/` also leaves stale generated types behind — if the build complains about a module you already removed, `rm -rf .next` and rebuild.

**Next 16 prefetch 404s in the export are expected.** Hovering a nav link requests `contact/__next.contact.__PAGE__.txt`, but the export writes that payload to `contact/__next.contact/__PAGE__.txt` (a directory). The prefetch always 404s, so `<Link>` navigation falls back to a full page load. Navigation works; the console noise is cosmetic. Don't chase it as a broken deploy.

## Verifying changes

`npm run build` catches type errors but not layout regressions. For visual work, run the dev server and check at **375 / 768 / 1440**.

Two things to know when driving a headless browser against the dev server. Client-side effects run **after hydration**, so a measurement taken the moment navigation completes reads pre-hydration values — the `WorkflowDemo` chart reports `scrollLeft: 0` until you wait for network idle, which looks like the centring effect never fired. And the `/browse` daemon does not reliably survive between separate shell invocations here: chain every command (viewport → goto → wait → assert) into **one** call, or the page resets to `about:blank` and selectors come back `null`.

What to check:

- No horizontal body scroll on any route.
- `WorkflowDemo`'s org chart keeps its shape below **1024px**, scrolling inside its own container (page itself must not scroll sideways) and starting centred on the Head card.
- A full "Run Forecast Cycle" completes (~6.2s) through the completion banner, with the ERP/GL pipes going grey → flowing blue → solid green. Re-running mid-cycle should reset cleanly; navigating away mid-cycle should not warn about state updates after unmount.
- The honeycomb hub touches all six models with no gap and no overlap.
- Hovering any icon tile fills it ember and scales it — this should behave identically on all three pages.
