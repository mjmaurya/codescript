import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllToolSlugs, getToolBySlug } from "@/lib/tools-registry";
import { buildMetadata } from "@/lib/seo";
import { ToolLayout } from "@/components/tool-page/ToolLayout";
import { ToolRenderer } from "@/components/tool-page/ToolRenderer";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return buildMetadata(tool);
}

export default async function ToolPage({ params }: { params: Params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <ToolLayout tool={tool}>
      <ToolRenderer componentKey={tool.componentKey} />
    </ToolLayout>
  );
}
