import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Required by output: "export" — written out at build time, not per request.
export const dynamic = "force-static";

// The three real routes. Everything else under app/ is the contact API route
// and the currently unreferenced app/icon.tsx — neither belongs in a sitemap.
// Trailing slashes match next.config's trailingSlash: true — listing the
// unslashed form would advertise URLs that only 301 to the real ones.
const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/services/", priority: 0.8 },
  { path: "/contact/", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
