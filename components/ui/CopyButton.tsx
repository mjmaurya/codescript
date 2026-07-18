"use client";

import { useState } from "react";
import { Button } from "./Button";

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button type="button" variant="secondary" className={className} onClick={handleCopy} disabled={!text}>
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}
