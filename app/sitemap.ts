import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { tools } from "@/lib/tools-registry";
import { cheatSheets } from "@/lib/cheat-sheets-registry";

export const dynamic = "force-static";

const staticPages = [
  "/",
  "/tools/",
  "/cheat-sheets/",
  "/interview-questions/",
  "/snippets/",
  "/api-directory/",
  "/roadmaps/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.5,
    })),
    ...tools.map((tool) => ({
      url: `${SITE_URL}/tools/${tool.slug}/`,
      lastModified: tool.updatedAt,
      changeFrequency: "monthly" as const,
      priority: tool.priority ?? 0.8,
    })),
    ...cheatSheets.map((sheet) => ({
      url: `${SITE_URL}/cheat-sheets/${sheet.slug}/`,
      lastModified: sheet.updatedAt,
      changeFrequency: "monthly" as const,
      priority: sheet.priority ?? 0.7,
    })),
  ];
}
