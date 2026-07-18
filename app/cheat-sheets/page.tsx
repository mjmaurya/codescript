import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Cheat Sheets",
  description: "Quick-reference cheat sheets for common languages, tools, and frameworks.",
};

export default function CheatSheetsPage() {
  return (
    <ComingSoon
      title="Cheat Sheets"
      description="Quick-reference cheat sheets for common languages, tools, and frameworks are on the way."
    />
  );
}
