import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";
import { SITE_URL } from "@/lib/constants";

const TITLE = "API Directory";
const DESCRIPTION =
  "A curated directory of free, public developer APIs — weather, finance, geolocation, and testing sandboxes — with what each one needs and what it returns.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["free apis", "public api directory", "developer apis", "rest api list", "no-auth api"],
  alternates: { canonical: `${SITE_URL}/api-directory/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/api-directory/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ApiDirectoryPage() {
  return (
    <ComingSoon
      title={TITLE}
      intro="A directory of public APIs worth knowing about — organized by category, with auth requirements, rate limits, and a quick example request for each one."
      highlights={[
        { title: "Weather & geolocation", description: "Forecast, IP geolocation, and reverse-geocoding APIs with generous free tiers." },
        { title: "Finance & currency", description: "Exchange rates, stock quotes, and crypto price feeds for side projects and demos." },
        { title: "Public data", description: "Countries, holidays, postal codes, and other reference data you shouldn't have to hardcode." },
        { title: "No-auth sandboxes", description: "Fake REST APIs for prototyping frontend apps without standing up a backend." },
        { title: "Auth & identity", description: "OAuth providers and JWT-issuing test services for wiring up login flows." },
        { title: "Dev utilities", description: "IP lookup, QR generation, and other small hosted services worth bookmarking." },
      ]}
      closing="This section is actively being built. Check back soon, or explore the full tool library in the meantime."
    />
  );
}
