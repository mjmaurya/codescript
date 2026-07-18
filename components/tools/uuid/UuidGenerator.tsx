"use client";

import { useState } from "react";
import { v1 as uuidv1, v5 as uuidv5, validate as validateUuid } from "uuid";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { ErrorText, Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { TextArea } from "@/components/ui/TextArea";

type Version = "v4" | "v1" | "v5";

const MAX_COUNT = 100;

export default function UuidGenerator() {
  const [version, setVersion] = useState<Version>("v4");
  const [count, setCount] = useState(1);
  const [namespace, setNamespace] = useState(uuidv5.DNS);
  const [name, setName] = useState("example.com");
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");

  function handleGenerate() {
    setError("");
    const safeCount = Math.min(Math.max(Math.trunc(count) || 1, 1), MAX_COUNT);

    if (version === "v5" && !validateUuid(namespace)) {
      setError("Namespace must be a valid UUID.");
      return;
    }

    try {
      const generated: string[] = [];
      for (let i = 0; i < safeCount; i++) {
        if (version === "v4") {
          generated.push(crypto.randomUUID());
        } else if (version === "v1") {
          generated.push(uuidv1());
        } else {
          generated.push(uuidv5(name, namespace));
        }
      }
      setResults(generated);
    } catch {
      setError("Could not generate UUIDs with the given inputs.");
    }
  }

  const output = results.join("\n");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Version">
          <Select value={version} onChange={(e) => setVersion(e.target.value as Version)}>
            <option value="v4">v4 (random)</option>
            <option value="v1">v1 (timestamp)</option>
            <option value="v5">v5 (namespace + name)</option>
          </Select>
        </Field>
        <Field label="How many?">
          <Input
            type="number"
            min={1}
            max={MAX_COUNT}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </Field>
        <div className="flex items-end">
          <Button variant="primary" onClick={handleGenerate} className="w-full">
            Generate
          </Button>
        </div>
      </div>

      {version === "v5" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Namespace (UUID)">
            <Input value={namespace} onChange={(e) => setNamespace(e.target.value)} />
          </Field>
          <Field label="Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
        </div>
      )}

      <ErrorText>{error}</ErrorText>

      <Field label="Result">
        <TextArea rows={Math.min(Math.max(results.length, 4), 20)} value={output} readOnly placeholder="Click Generate to create UUIDs" />
      </Field>

      <div className="flex items-center gap-3">
        <CopyButton text={output} />
      </div>
    </div>
  );
}
