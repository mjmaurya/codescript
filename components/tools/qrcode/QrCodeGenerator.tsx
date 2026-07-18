"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/Button";
import { ErrorText, Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { TextArea } from "@/components/ui/TextArea";

type EccLevel = "L" | "M" | "Q" | "H";

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

export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [ecc, setEcc] = useState<EccLevel>("M");
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const trimmed = text.trim();

  useEffect(() => {
    if (!trimmed || !canvasRef.current) {
      setError("");
      return;
    }
    let cancelled = false;
    QRCode.toCanvas(canvasRef.current, text, { errorCorrectionLevel: ecc, width: 256 })
      .then(() => {
        if (!cancelled) setError("");
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message || "Could not generate a QR code for this input.");
      });
    return () => {
      cancelled = true;
    };
  }, [text, ecc, trimmed]);

  function handleDownloadPng() {
    const canvas = canvasRef.current;
    if (!canvas || !trimmed || error) return;
    canvas.toBlob((blob) => {
      if (blob) download(blob, "qrcode.png");
    }, "image/png");
  }

  async function handleDownloadSvg() {
    if (!trimmed || error) return;
    try {
      const svg = await QRCode.toString(text, { type: "svg", errorCorrectionLevel: ecc });
      const blob = new Blob([svg], { type: "image/svg+xml" });
      download(blob, "qrcode.svg");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate an SVG for this input.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Text or URL">
          <TextArea
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://example.com"
          />
        </Field>
        <Field label="Error correction level" className="max-w-xs">
          <Select value={ecc} onChange={(e) => setEcc(e.target.value as EccLevel)}>
            <option value="L">L — Low (~7%)</option>
            <option value="M">M — Medium (~15%)</option>
            <option value="Q">Q — Quartile (~25%)</option>
            <option value="H">H — High (~30%)</option>
          </Select>
        </Field>
      </div>

      <ErrorText>{error}</ErrorText>

      <div className="flex items-center justify-center rounded-md border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        {trimmed ? (
          <canvas ref={canvasRef} className={error ? "hidden" : ""} />
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Enter text or a URL above to generate a QR code.
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="secondary" onClick={handleDownloadPng} disabled={!trimmed || !!error}>
          Download PNG
        </Button>
        <Button variant="secondary" onClick={handleDownloadSvg} disabled={!trimmed || !!error}>
          Download SVG
        </Button>
      </div>
    </div>
  );
}
