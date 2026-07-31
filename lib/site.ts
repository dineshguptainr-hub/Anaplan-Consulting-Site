// The canonical public address of the site. Hard-coded rather than read from
// VERCEL_PROJECT_PRODUCTION_URL — that variable resolves to whichever domain
// Vercel currently considers shortest, so it can drift when domains are added
// or removed. Pinning it here also means fixing a wrong URL is a code change,
// not an env var that needs a redeploy before it takes effect.
export const SITE_URL = "https://epmjourney.com";

export const IS_PRODUCTION = process.env.VERCEL_ENV === "production";

// Preview deployments get their own public *.vercel.app URL, which Google will
// happily index in competition with the real site. So everything that isn't
// production points at itself and is marked noindex (see app/robots.ts) rather
// than advertising the canonical domain from a throwaway deployment.
export const CURRENT_URL = IS_PRODUCTION
  ? SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
