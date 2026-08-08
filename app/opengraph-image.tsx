import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const alt = `${SITE_NAME} – ${SITE_TAGLINE}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "Developer tools that just work.", subtitle: SITE_TAGLINE });
}
