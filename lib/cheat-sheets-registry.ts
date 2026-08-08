export interface CheatSheetDefinition {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  shortDescription: string;
  keywords: string[];
  componentKey: string;
  updatedAt?: string;
  priority?: number;
}

export const cheatSheets: CheatSheetDefinition[] = [
  {
    slug: "git",
    title: "Git Cheat Sheet",
    seoTitle: "Git Cheat Sheet – Git Commands, Branching, and Recovery",
    metaDescription:
      "Complete Git cheat sheet with commands for initialization, branching, remotes, stashing, undoing mistakes, tags, and configuration.",
    shortDescription:
      "Branching, rebasing, undo, remote workflows, stash, tags, and Git recovery commands in one concise reference.",
    keywords: ["git cheat sheet", "git commands", "git workflow", "git recovery", "git branching"],
    componentKey: "git",
    updatedAt: "2026-08-08",
    priority: 0.8,
  },
  {
    slug: "angular",
    title: "Angular Cheat Sheet",
    seoTitle: "Angular Cheat Sheet – CLI, Signals, Control Flow, and Routing",
    metaDescription:
      "Essential Angular cheat sheet covering CLI schematics, Signals, control flow syntax, dependency injection, routing, reactive forms, and RxJS integration.",
    shortDescription:
      "CLI schematics, standalone components, Signals, control flow syntax, routing, reactive forms, and lifecycle hooks.",
    keywords: ["angular cheat sheet", "angular signals", "angular cli", "angular control flow", "standalone components"],
    componentKey: "angular",
    updatedAt: "2026-08-09",
    priority: 0.8,
  }
];

export function getAllCheatSheetSlugs() {
  return cheatSheets.map((sheet) => sheet.slug);
}

export function getCheatSheetBySlug(slug: string) {
  return cheatSheets.find((sheet) => sheet.slug === slug) ?? null;
}
