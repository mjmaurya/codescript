"use client";

import { useMemo, useState } from "react";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";
import { CopyButton } from "@/components/ui/CopyButton";
import { ErrorText, Field } from "@/components/ui/Field";
import { TextArea } from "@/components/ui/TextArea";

type Direction = "json-to-yaml" | "yaml-to-json";

export default function JsonYamlConverter() {
  const [input, setInput] = useState("");

  const { output, direction, error } = useMemo((): {
    output: string;
    direction: Direction | null;
    error: string;
  } => {
    if (!input.trim()) return { output: "", direction: null, error: "" };

    try {
      const parsed = JSON.parse(input);
      return { output: stringifyYaml(parsed), direction: "json-to-yaml", error: "" };
    } catch {
      // Not valid JSON, fall through to YAML.
    }

    try {
      const parsed = parseYaml(input);
      return { output: JSON.stringify(parsed, null, 2), direction: "yaml-to-json", error: "" };
    } catch {
      // Not valid YAML either.
    }

    return { output: "", direction: null, error: "Input is neither valid JSON nor valid YAML." };
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Input (JSON or YAML)">
          <TextArea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"hello": "world"}'
          />
        </Field>
        <Field
          label={
            direction
              ? direction === "json-to-yaml"
                ? "Output — Detected: JSON → YAML"
                : "Output — Detected: YAML → JSON"
              : "Output"
          }
        >
          <TextArea rows={12} value={output} readOnly placeholder="Converted output will appear here" />
        </Field>
      </div>

      <div className="flex justify-end">
        <CopyButton text={output} />
      </div>

      <ErrorText>{error}</ErrorText>
    </div>
  );
}
