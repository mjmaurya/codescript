/**
 * Next.js streams generateMetadata() output for dynamic routes to the client via JS instead of
 * inlining it into the initial static HTML shell, and marks that shell `noindex` until the real
 * metadata streams in. For `output: 'export'` there's no server left to fix this per-request, so
 * this postbuild step rewrites each generated tool page's <head> directly from the registry data.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tools } from "../lib/tools-registry";
import { buildFaqJsonLd } from "../lib/seo";
import { SITE_NAME, SITE_URL } from "../lib/constants";

const OUT_DIR = join(process.cwd(), "out");

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

let injected = 0;

for (const tool of tools) {
  const filePath = join(OUT_DIR, "tools", `${tool.slug}.html`);
  let html: string;
  try {
    html = readFileSync(filePath, "utf8");
  } catch {
    console.warn(`[inject-metadata] Skipping ${tool.slug}: ${filePath} not found`);
    continue;
  }

  const url = `${SITE_URL}/tools/${tool.slug}`;
  const faqJsonLd = JSON.stringify(buildFaqJsonLd(tool));

  html = html
    .replace(/<title>[^<]*<\/title>/, "")
    .replace(/<meta name="description"[^>]*\/?>/, "")
    .replace(/<meta name="robots" content="noindex"\/?>/, "");

  const tags = [
    `<title>${tool.seoTitle}</title>`,
    `<meta name="description" content="${escapeAttr(tool.metaDescription)}"/>`,
    `<meta name="keywords" content="${escapeAttr(tool.keywords.join(","))}"/>`,
    `<link rel="canonical" href="${url}"/>`,
    `<meta property="og:title" content="${escapeAttr(tool.seoTitle)}"/>`,
    `<meta property="og:description" content="${escapeAttr(tool.metaDescription)}"/>`,
    `<meta property="og:url" content="${url}"/>`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${escapeAttr(tool.seoTitle)}"/>`,
    `<meta name="twitter:description" content="${escapeAttr(tool.metaDescription)}"/>`,
    `<script type="application/ld+json">${faqJsonLd}</script>`,
  ].join("");

  html = html.replace("</head>", `${tags}</head>`);

  writeFileSync(filePath, html, "utf8");
  injected++;
}

console.log(`[inject-metadata] Injected static metadata into ${injected}/${tools.length} tool pages.`);
