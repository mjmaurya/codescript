"use client";

import { md5 } from "js-md5";
import { useEffect, useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { Field } from "@/components/ui/Field";
import { TextArea } from "@/components/ui/TextArea";

const DIGESTS = [
  { label: "SHA-1", algo: "SHA-1" as const },
  { label: "SHA-256", algo: "SHA-256" as const },
  { label: "SHA-384", algo: "SHA-384" as const },
  { label: "SHA-512", algo: "SHA-512" as const },
];

function bytesToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;

    async function computeHashes() {
      if (!input) {
        if (!cancelled) setHashes({});
        return;
      }

      const bytes = new TextEncoder().encode(input);
      const results: Record<string, string> = { MD5: md5(input) };

      for (const { label, algo } of DIGESTS) {
        const digest = await crypto.subtle.digest(algo, bytes);
        results[label] = bytesToHex(digest);
      }

      if (!cancelled) setHashes(results);
    }

    computeHashes();
    return () => {
      cancelled = true;
    };
  }, [input]);

  const rows = ["MD5", ...DIGESTS.map((d) => d.label)];

  return (
    <div className="space-y-4">
      <Field label="Input text">
        <TextArea
          rows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text to hash"
        />
      </Field>

      <div className="space-y-3">
        {rows.map((label) => (
          <div key={label} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
            <span className="w-20 shrink-0 text-sm font-medium text-slate-700 dark:text-slate-300">
              {label}
            </span>
            <input
              readOnly
              value={hashes[label] ?? ""}
              placeholder="—"
              className="w-full min-w-0 flex-1 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            <CopyButton text={hashes[label] ?? ""} className="shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
