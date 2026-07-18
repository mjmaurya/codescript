"use client";

import { diffLines } from "diff";
import { useMemo, useState } from "react";
import { ErrorText, Field } from "@/components/ui/Field";
import { TextArea } from "@/components/ui/TextArea";

function tryParse(input: string): { value?: unknown; error?: string } {
  if (!input.trim()) return { error: "Enter some JSON." };
  try {
    return { value: JSON.parse(input) };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Invalid JSON." };
  }
}

export default function JsonCompare() {
  const [original, setOriginal] = useState("");
  const [changed, setChanged] = useState("");

  const originalResult = useMemo(() => tryParse(original), [original]);
  const changedResult = useMemo(() => tryParse(changed), [changed]);

  const diffParts = useMemo(() => {
    if (originalResult.error || changedResult.error) return null;
    const prettyOriginal = JSON.stringify(originalResult.value, null, 2);
    const prettyChanged = JSON.stringify(changedResult.value, null, 2);
    return diffLines(prettyOriginal, prettyChanged);
  }, [originalResult, changedResult]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Original">
          <TextArea
            rows={12}
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder='{"hello":"world"}'
          />
        </Field>
        <Field label="Changed">
          <TextArea
            rows={12}
            value={changed}
            onChange={(e) => setChanged(e.target.value)}
            placeholder='{"hello":"there"}'
          />
        </Field>
      </div>

      {original.trim() && <ErrorText>{originalResult.error && `Original: ${originalResult.error}`}</ErrorText>}
      {changed.trim() && <ErrorText>{changedResult.error && `Changed: ${changedResult.error}`}</ErrorText>}

      {diffParts && (
        <div>
          <p className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">Diff</p>
          <div className="max-h-96 overflow-auto rounded-md border border-slate-300 bg-white font-mono text-sm dark:border-slate-700 dark:bg-slate-900">
            {diffParts.map((part, partIndex) =>
              part.value
                .split("\n")
                .filter((line, i, arr) => !(i === arr.length - 1 && line === ""))
                .map((line, lineIndex) => (
                  <div
                    key={`${partIndex}-${lineIndex}`}
                    className={
                      part.added
                        ? "bg-green-50 px-3 py-0.5 text-green-800 dark:bg-green-950/40 dark:text-green-300"
                        : part.removed
                          ? "bg-red-50 px-3 py-0.5 text-red-800 dark:bg-red-950/40 dark:text-red-300"
                          : "px-3 py-0.5 text-slate-700 dark:text-slate-300"
                    }
                  >
                    <span className="select-none text-slate-400 dark:text-slate-600">
                      {part.added ? "+ " : part.removed ? "- " : "  "}
                    </span>
                    {line}
                  </div>
                )),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
