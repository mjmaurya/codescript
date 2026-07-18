"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { ErrorText, Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
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

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState("2");

  const { formatted, error } = useMemo(() => {
    if (!input.trim()) return { formatted: "", error: "" };
    try {
      const parsed = JSON.parse(input);
      return { formatted: JSON.stringify(parsed, null, Number(indent)), error: "" };
    } catch (err) {
      return { formatted: "", error: describeError(input, err) };
    }
  }, [input, indent]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Input JSON">
          <TextArea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"hello":"world"}'
          />
        </Field>
        <Field label="Formatted output">
          <TextArea rows={12} value={formatted} readOnly placeholder="Formatted JSON will appear here" />
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Field label="Indent size" className="w-32">
          <Select value={indent} onChange={(e) => setIndent(e.target.value)}>
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
          </Select>
        </Field>
        <div className="pt-6">
          <CopyButton text={formatted} />
        </div>
      </div>

      <ErrorText>{error}</ErrorText>
    </div>
  );
}
