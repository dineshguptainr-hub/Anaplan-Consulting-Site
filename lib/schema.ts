import { SITE_URL } from "./site";

// JSON-LD describing the business to search engines. Everything below is
// asserted elsewhere on the site in prose — the schema restates it in a form
// Google can read without inferring.
//
// Deliberately omitted: address, telephone, founder name, aggregateRating,
// sameAs profiles. Structured data is a claim made to search engines, and
// inventing any of those would be fabricating facts about a real business.
// Add them here once there is a real value to add.

const SERVICE_NAMES = [
  "Connected Planning Model Design",
  "ERP & GL Data Integration",
  "Forecast Workflow Automation",
  "Model Build & Configuration",
  "Managed Anaplan Support",
  "Training & Enablement",
];

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const organizationSchema = {
  "@type": "ProfessionalService",
  "@id": ORGANIZATION_ID,
  name: "EPM Journey",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.png`,
  image: `${SITE_URL}/og-image.png`,
  description:
    "Anaplan Connected Planning consulting led by a Certified Master Anaplanner, replacing fragile Excel models with automated, connected planning across Finance, Workforce, Opex, and Capex.",
  knowsAbout: [
    "Anaplan",
    "Connected Planning",
    "Financial Planning and Analysis",
    "Workforce Planning",
    "Opex Planning",
    "Capex Planning",
    "Enterprise Performance Management",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Anaplan consulting services",
    itemListElement: SERVICE_NAMES.map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "EPM Journey",
  publisher: { "@id": ORGANIZATION_ID },
};

/** A page node tied back to the organization, so the graph is connected. */
export function pageSchema({
  type,
  path,
  name,
  description,
}: {
  type: "WebPage" | "ContactPage" | "CollectionPage";
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@type": type,
    "@id": `${SITE_URL}${path}#page`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": ORGANIZATION_ID },
  };
}

/** Wraps nodes in a single @graph — one script tag per page, not several. */
export function jsonLd(nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
