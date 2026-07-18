import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./constants";
import type { ToolDefinition } from "./tools-registry";

export function buildMetadata(tool: ToolDefinition): Metadata {
  const url = `${SITE_URL}/tools/${tool.slug}`;
  return {
    title: tool.seoTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: tool.seoTitle,
      description: tool.metaDescription,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seoTitle,
      description: tool.metaDescription,
    },
  };
}

export function buildFaqJsonLd(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
