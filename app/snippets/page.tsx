import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Snippets",
  description: "Ready-to-use code snippets for common programming tasks.",
};

export default function SnippetsPage() {
  return (
    <ComingSoon
      title="Snippets"
      description="Ready-to-use code snippets for common programming tasks are on the way."
    />
  );
}
