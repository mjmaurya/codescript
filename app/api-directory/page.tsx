import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "API Directory",
  description: "A directory of useful public and developer APIs.",
};

export default function ApiDirectoryPage() {
  return (
    <ComingSoon
      title="API Directory"
      description="A directory of useful public and developer APIs is on the way."
    />
  );
}
