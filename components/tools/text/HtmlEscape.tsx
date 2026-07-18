"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Field } from "@/components/ui/Field";
import { TextArea } from "@/components/ui/TextArea";

type Mode = "escape" | "unescape";

const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (c) => ESCAPE_MAP[c]);
}

const NAMED_UNESCAPE_MAP: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function unescapeHtml(str: string): string {
  return str.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity: string) => {
    if (entity[0] === "#") {
      const isHex = entity[1] === "x" || entity[1] === "X";
      const code = isHex ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      if (Number.isNaN(code)) return match;
      try {
        return String.fromCodePoint(code);
      } catch {
        return match;
      }
    }
    const replacement = NAMED_UNESCAPE_MAP[entity];
    return replacement !== undefined ? replacement : match;
  });
}

export default function HtmlEscape() {
  const [mode, setMode] = useState<Mode>("escape");
  const [input, setInput] = useState("");

  const output = useMemo(() => {
    if (!input) return "";
    return mode === "escape" ? escapeHtml(input) : unescapeHtml(input);
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant={mode === "escape" ? "primary" : "secondary"}
          onClick={() => setMode("escape")}
        >
          Escape
        </Button>
        <Button
          type="button"
          variant={mode === "unescape" ? "primary" : "secondary"}
          onClick={() => setMode("unescape")}
        >
          Unescape
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label={mode === "escape" ? "Plain text / HTML" : "Text with HTML entities"}>
          <TextArea
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "escape"
                ? "e.g. <div class=\"card\">Tom & Jerry's</div>"
                : "e.g. &lt;div&gt;Tom &amp; Jerry&#39;s&lt;/div&gt;"
            }
          />
        </Field>
        <Field label="Output">
          <TextArea rows={10} value={output} readOnly placeholder="Result will appear here" />
        </Field>
      </div>

      <div className="flex items-center justify-end">
        <CopyButton text={output} />
      </div>
    </div>
  );
}
