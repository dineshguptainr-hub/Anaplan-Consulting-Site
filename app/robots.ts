import type { MetadataRoute } from "next";
import { CURRENT_URL, IS_PRODUCTION, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview and local builds are reachable on public URLs; keep them out of
  // the index entirely so they never compete with epmjourney.com.
  if (!IS_PRODUCTION) {
    return {
      rules: { userAgent: "*", disallow: "/" },
      host: CURRENT_URL,
    };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
