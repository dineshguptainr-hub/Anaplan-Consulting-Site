import type { MetadataRoute } from "next";
import { CURRENT_URL, SHOULD_INDEX, SITE_URL } from "@/lib/site";

// Required by output: "export" — there is no server to generate this per
// request, so it has to be written out at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Non-production builds are reachable on public URLs; keep them out of the
  // index entirely so they never compete with epmjourney.com.
  if (!SHOULD_INDEX) {
    return {
      rules: { userAgent: "*", disallow: "/" },
      host: CURRENT_URL,
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
