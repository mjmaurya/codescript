"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { ErrorText, Field } from "@/components/ui/Field";
import { TextArea } from "@/components/ui/TextArea";

type Mode = "encode" | "decode";

export default function UrlEncoderDecoder() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");

  const { output, error } = useMemo(() => {
    if (!input) return { output: "", error: "" };
    try {
      if (mode === "encode") {
        return { output: encodeURIComponent(input), error: "" };
      }
      return { output: decodeURIComponent(input), error: "" };
    } catch {
      return {
        output: "",
        error:
          mode === "decode"
            ? "Invalid percent-encoded input."
            : "Unable to encode input.",
      };
    }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant={mode === "encode" ? "primary" : "secondary"}
          onClick={() => setMode("encode")}
        >
          Encode
        </Button>
        <Button
          type="button"
          variant={mode === "decode" ? "primary" : "secondary"}
          onClick={() => setMode("decode")}
        >
          Decode
        </Button>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Uses <code>encodeURIComponent</code>/<code>decodeURIComponent</code> (safe for a single
        query value), not <code>encodeURI</code> (meant for a whole URL).
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label={mode === "encode" ? "Plain text" : "Percent-encoded text"}>
          <TextArea
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode" ? "Enter text to encode" : "Enter percent-encoded text to decode"
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

      <ErrorText>{error}</ErrorText>
    </div>
  );
}
