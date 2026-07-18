"use client";

import { useMemo, useRef, useState } from "react";
import { Base64 } from "js-base64";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { ErrorText, Field } from "@/components/ui/Field";
import { TextArea } from "@/components/ui/TextArea";

type Mode = "text" | "file";
type Direction = "encode" | "decode";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const PREVIEW_LIMIT = 5000;

function bufferToBase64(buffer: ArrayBuffer): string {
  return Base64.fromUint8Array(new Uint8Array(buffer));
}

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function Base64EncoderDecoder() {
  const [mode, setMode] = useState<Mode>("text");

  // Text mode state
  const [direction, setDirection] = useState<Direction>("encode");
  const [textInput, setTextInput] = useState("");

  // File -> Base64 state
  const [fileName, setFileName] = useState("");
  const [fileBase64, setFileBase64] = useState("");
  const [fileError, setFileError] = useState("");

  // Base64 -> File state
  const [pastedBase64, setPastedBase64] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { textOutput, textError } = useMemo(() => {
    if (!textInput) return { textOutput: "", textError: "" };
    try {
      if (direction === "encode") {
        const bytes = new TextEncoder().encode(textInput);
        return { textOutput: Base64.fromUint8Array(bytes), textError: "" };
      }
      const bytes = Base64.toUint8Array(textInput.trim());
      return { textOutput: new TextDecoder("utf-8", { fatal: true }).decode(bytes), textError: "" };
    } catch {
      return {
        textOutput: "",
        textError:
          direction === "decode"
            ? "Invalid Base64 input — check for missing padding or invalid characters."
            : "Could not encode this input.",
      };
    }
  }, [textInput, direction]);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFileError("");
    setFileBase64("");
    setFileName("");
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setFileError(
        `This file is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Files larger than 10MB may freeze the browser tab when processed client-side, so this file was not processed. Try a smaller file.`
      );
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      setFileBase64(bufferToBase64(buffer));
      setFileName(file.name);
    } catch {
      setFileError("Could not read this file.");
    }
  }

  function handleDownloadFromBase64() {
    setDownloadError("");
    if (!pastedBase64.trim()) return;
    try {
      const bytes = Base64.toUint8Array(pastedBase64.trim());
      const blob = new Blob([bytes as BlobPart]);
      download(blob, "decoded-file");
    } catch {
      setDownloadError("Invalid Base64 input — check for missing padding or invalid characters.");
    }
  }

  const filePreview =
    fileBase64.length > PREVIEW_LIMIT ? `${fileBase64.slice(0, PREVIEW_LIMIT)}` : fileBase64;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button variant={mode === "text" ? "primary" : "secondary"} onClick={() => setMode("text")}>
          Text
        </Button>
        <Button variant={mode === "file" ? "primary" : "secondary"} onClick={() => setMode("file")}>
          File
        </Button>
      </div>

      {mode === "text" && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={direction === "encode" ? "primary" : "secondary"}
              onClick={() => setDirection("encode")}
            >
              Encode
            </Button>
            <Button
              variant={direction === "decode" ? "primary" : "secondary"}
              onClick={() => setDirection("decode")}
            >
              Decode
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label={direction === "encode" ? "Plain text" : "Base64 input"}>
              <TextArea
                rows={10}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={direction === "encode" ? "Type or paste text here" : "Paste Base64 here"}
              />
            </Field>
            <Field label={direction === "encode" ? "Base64 output" : "Decoded text"}>
              <TextArea rows={10} value={textOutput} readOnly placeholder="Result will appear here" />
            </Field>
          </div>

          <div className="flex items-center gap-3">
            <CopyButton text={textOutput} />
          </div>

          <ErrorText>{textError}</ErrorText>
        </div>
      )}

      {mode === "file" && (
        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Encode a file to Base64
            </h3>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="text-sm text-slate-700 dark:text-slate-300"
            />
            <ErrorText>{fileError}</ErrorText>
            {fileBase64 && (
              <div className="space-y-2">
                <Field label={`Base64 output${fileName ? ` (${fileName})` : ""}`}>
                  <TextArea rows={8} value={filePreview} readOnly />
                </Field>
                {fileBase64.length > PREVIEW_LIMIT && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    (showing first {PREVIEW_LIMIT.toLocaleString()} characters of{" "}
                    {fileBase64.length.toLocaleString()} — the Copy button copies the full string)
                  </p>
                )}
                <CopyButton text={fileBase64} />
              </div>
            )}
          </div>

          <div className="space-y-3 border-t border-slate-200 pt-6 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Decode Base64 back to a file
            </h3>
            <Field label="Base64 input">
              <TextArea
                rows={8}
                value={pastedBase64}
                onChange={(e) => setPastedBase64(e.target.value)}
                placeholder="Paste a Base64 string here"
              />
            </Field>
            <Button variant="primary" onClick={handleDownloadFromBase64} disabled={!pastedBase64.trim()}>
              Download as file
            </Button>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The original filename and type aren&apos;t known, so the download will be named
              &quot;decoded-file&quot;.
            </p>
            <ErrorText>{downloadError}</ErrorText>
          </div>
        </div>
      )}
    </div>
  );
}
