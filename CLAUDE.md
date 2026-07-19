# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the Next.js dev server (Turbopack) on http://localhost:3000, hot-reloading
- `npm run build` — production build (also type-checks; treat build failures as blocking)
- `npm run start` — serve the production build (run `build` first)
- `npm run lint` — Next's lint command; no ESLint config file exists yet in this repo, so the first run will prompt interactively to create one — expect this in non-interactive/agent contexts rather than treating it as a failure
- No test suite is configured in this repo.

## Architecture

This is a multi-page Next.js (App Router, TypeScript) marketing site for an independent Anaplan consultant. There is no CMS, database, or content layer — all copy and section content lives inline in the component files as literal JSX and arrays.

- **Page composition**: three routes each compose section components from `components/`: [app/page.tsx](app/page.tsx) (Home: `Header → Hero → Authority → Footer`), [app/services/page.tsx](app/services/page.tsx) (Services: `Header → PainPleasure → Capabilities → Footer`), and [app/contact/page.tsx](app/contact/page.tsx) (Contact: `Header → ContactSection → Footer`). Every page shares the same `Header`/`Footer`.
- **Route-based nav**: [components/Header.tsx](components/Header.tsx)'s `NAV_LINKS` and [components/Footer.tsx](components/Footer.tsx)'s nav both use `next/link` `<Link>` to `/`, `/services`, `/contact` — real page navigations, not hash anchors. Moving a section to a different page requires updating both nav arrays and the page files' imports to match.
- **Content-as-data pattern**: each section keeps its repeatable content in a top-of-file array/object that JSX maps over — e.g. `BEFORE_ITEMS`/`AFTER_ITEMS` in [components/PainPleasure.tsx](components/PainPleasure.tsx), `CAPABILITIES` in [components/Capabilities.tsx](components/Capabilities.tsx), `STATS` in [components/Authority.tsx](components/Authority.tsx), `TOOL_OPTIONS` in [components/ContactForm.tsx](components/ContactForm.tsx). Edit these arrays directly to change copy rather than touching the surrounding markup.
- **Contact form → Google Sheets**: [components/ContactForm.tsx](components/ContactForm.tsx) is the only client component (`"use client"`) in the tree — it holds form state/validation and POSTs JSON to [app/api/contact/route.ts](app/api/contact/route.ts). That server route validates the payload, then forwards it to a Google Apps Script Web App URL read from `process.env.GOOGLE_SHEETS_WEBHOOK_URL`, which appends a row to a Google Sheet. Keeping the forward server-side keeps the webhook URL out of the client bundle. Without that env var set, the route returns 500 and the form surfaces a graceful inline error — see [.env.local.example](.env.local.example) for the variable name and setup notes.
- **Theming**: a custom dark palette (`ink`/`mist`/`gold`/`signal` color scales) plus background images (`hero-glow`, `grid-fade`) and a `fade-up` keyframe are defined in [tailwind.config.ts](tailwind.config.ts). Reusable component-level classes (`.btn-primary`, `.btn-secondary`, `.card`, `.container-max`, `.eyebrow`, `.section-heading`) are composed with `@apply` in [app/globals.css](app/globals.css) — prefer these existing classes over new one-off utility strings when styling new sections.
- **Fonts**: Inter (body) and Space Grotesk (display) are loaded via `next/font/google` in [app/layout.tsx](app/layout.tsx) and exposed as CSS variables (`--font-body`, `--font-display`) that `tailwind.config.ts` maps to the `font-body`/`font-display` utilities.
- **Path alias**: `@/*` maps to the project root (see [tsconfig.json](tsconfig.json)), used for imports like `@/components/Header`.
