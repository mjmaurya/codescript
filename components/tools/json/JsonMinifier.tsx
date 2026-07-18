"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { ErrorText, Field } from "@/components/ui/Field";
import { TextArea } from "@/components/ui/TextArea";

function describeError(input: string, err: unknown): string {
  if (!(err instanceof Error)) return "Invalid JSON.";
  const match = err.message.match(/position (\d+)/);
  if (!match) return err.message;

  const position = Number(match[1]);
  const before = input.slice(0, position);
  const line = (before.match(/\n/g)?.length ?? 0) + 1;
  const lastNewline = before.lastIndexOf("\n");
  const column = position - lastNewline;

  return `${err.message} (line ${line}, column ${column})`;
}

export default function JsonMinifier() {
  const [input, setInput] = useState("");

  const { minified, error } = useMemo(() => {
    if (!input.trim()) return { minified: "", error: "" };
    try {
      const parsed = JSON.parse(input);
      return { minified: JSON.stringify(parsed), error: "" };
    } catch (err) {
      return { minified: "", error: describeError(input, err) };
    }
  }, [input]);

  const beforeBytes = useMemo(() => new Blob([input]).size, [input]);
  const afterBytes = useMemo(() => new Blob([minified]).size, [minified]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Input JSON">
          <TextArea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"hello": "world"}'
          />
        </Field>
        <Field label="Minified output">
          <TextArea rows={12} value={minified} readOnly placeholder="Minified JSON will appear here" />
        </Field>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {minified && !error ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {beforeBytes} bytes &rarr; {afterBytes} bytes
            {beforeBytes > 0 && (
              <> ({Math.round((1 - afterBytes / beforeBytes) * 100)}% smaller)</>
            )}
          </p>
        ) : (
          <span />
        )}
        <CopyButton text={minified} />
      </div>

      <ErrorText>{error}</ErrorText>
    </div>
  );
}
