import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "./constants";
import type { ToolDefinition } from "./tools-registry";

export function buildMetadata(tool: ToolDefinition): Metadata {
  const url = `${SITE_URL}/tools/${tool.slug}/`;
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

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_TAGLINE,
    url: SITE_URL,
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildToolJsonLd(tool: ToolDefinition) {
  const url = `${SITE_URL}/tools/${tool.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    description: tool.metaDescription,
    url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function buildToolsItemListJsonLd(tools: ToolDefinition[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.title,
      url: `${SITE_URL}/tools/${tool.slug}/`,
    })),
  };
}
