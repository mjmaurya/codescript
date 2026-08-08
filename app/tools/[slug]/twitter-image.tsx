import { getAllToolSlugs, getToolBySlug } from "@/lib/tools-registry";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  return renderOgImage({
    title: tool ? tool.title : "CodeScript",
    subtitle: tool ? tool.shortDescription : "",
  });
}
