"use client";

import { toolComponents } from "@/lib/tool-components";

export function ToolRenderer({ componentKey }: { componentKey: string }) {
  const ToolUI = toolComponents[componentKey];
  if (!ToolUI) return null;
  return <ToolUI />;
}
