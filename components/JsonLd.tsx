import { jsonLd } from "@/lib/schema";

/**
 * Emits one <script type="application/ld+json"> for a page.
 *
 * Server component by design — the markup has to be in the HTML Google
 * receives, not injected after hydration.
 */
export default function JsonLd({ nodes }: { nodes: object[] }) {
  return (
    <script
      type="application/ld+json"
      // Safe: `nodes` is built from constants in lib/schema.ts, never from
      // user input. JSON.stringify also escapes the payload.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(nodes)) }}
    />
  );
}
