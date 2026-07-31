// The canonical public address of the site. Hard-coded so the URL baked into
// the static export never depends on which host built it.
export const SITE_URL = "https://epmjourney.com";

// Whether this build is the real, public one and may be indexed.
//
// Deliberately host-agnostic: an earlier version keyed off VERCEL_ENV, which
// simply does not exist on an IONOS build — so `next build` produced a
// robots.txt saying Disallow: / and the live site would never have been
// indexed. NODE_ENV is set by Next itself on every `next build`, everywhere.
//
// Set NEXT_PUBLIC_SITE_NOINDEX=1 to keep a production build out of the index
// (staging copies, branch previews, anything on a throwaway URL).
export const SHOULD_INDEX =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_SITE_NOINDEX !== "1";

// A static export has no request-time host to read, so anything that isn't a
// production build is by definition the dev server.
export const CURRENT_URL =
  process.env.NODE_ENV === "production" ? SITE_URL : "http://localhost:3000";
