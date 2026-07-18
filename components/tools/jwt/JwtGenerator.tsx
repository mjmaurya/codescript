"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { ErrorText, Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { signJwtHs256, verifyJwtHs256 } from "@/lib/utils/jwt";

const DEFAULT_PAYLOAD = `{
  "sub": "1234567890",
  "name": "Ada Lovelace"
}`;

type Mode = "generate" | "verify";

export default function JwtGenerator() {
  const [mode, setMode] = useState<Mode>("generate");

  // Generate mode state
  const [payloadJson, setPayloadJson] = useState(DEFAULT_PAYLOAD);
  const [genSecret, setGenSecret] = useState("");
  const [token, setToken] = useState("");
  const [genError, setGenError] = useState("");

  // Verify mode state
  const [verifyToken, setVerifyToken] = useState("");
  const [verifySecret, setVerifySecret] = useState("");
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [verifyError, setVerifyError] = useState("");

  async function handleSign() {
    setGenError("");
    setToken("");
    let parsed: unknown;
    try {
      parsed = JSON.parse(payloadJson);
    } catch {
      setGenError("Payload must be valid JSON.");
      return;
    }
    if (!genSecret) {
      setGenError("Enter a secret to sign with.");
      return;
    }
    try {
      const jwt = await signJwtHs256(JSON.stringify(parsed), genSecret);
      setToken(jwt);
    } catch {
      setGenError("Could not sign the token.");
    }
  }

  async function handleVerify() {
    setVerifyError("");
    setVerifyResult(null);
    const parts = verifyToken.trim().split(".");
    if (parts.length !== 3) {
      setVerifyError("A JWT must have 3 segments separated by periods (header.payload.signature).");
      return;
    }
    if (!verifySecret) {
      setVerifyError("Enter the secret to verify against.");
      return;
    }
    try {
      const valid = await verifyJwtHs256(verifyToken, verifySecret);
      setVerifyResult(valid);
    } catch {
      setVerifyError("Could not verify this token.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant={mode === "generate" ? "primary" : "secondary"}
          onClick={() => setMode("generate")}
        >
          Generate
        </Button>
        <Button
          type="button"
          variant={mode === "verify" ? "primary" : "secondary"}
          onClick={() => setMode("verify")}
        >
          Verify
        </Button>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">Only the HS256 algorithm is supported.</p>

      {mode === "generate" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Payload (JSON)">
              <TextArea
                rows={8}
                value={payloadJson}
                onChange={(e) => setPayloadJson(e.target.value)}
                placeholder={DEFAULT_PAYLOAD}
              />
            </Field>
            <Field label="Secret">
              <Input
                type="text"
                value={genSecret}
                onChange={(e) => setGenSecret(e.target.value)}
                placeholder="your-256-bit-secret"
              />
            </Field>
          </div>

          <Button type="button" onClick={handleSign}>
            Sign
          </Button>

          <ErrorText>{genError}</ErrorText>

          {token && (
            <Field label="JWT">
              <div className="space-y-2">
                <TextArea rows={4} value={token} readOnly />
                <CopyButton text={token} />
              </div>
            </Field>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="JWT">
              <TextArea
                rows={4}
                value={verifyToken}
                onChange={(e) => setVerifyToken(e.target.value)}
                placeholder="header.payload.signature"
              />
            </Field>
            <Field label="Secret">
              <Input
                type="text"
                value={verifySecret}
                onChange={(e) => setVerifySecret(e.target.value)}
                placeholder="your-256-bit-secret"
              />
            </Field>
          </div>

          <Button type="button" onClick={handleVerify}>
            Verify
          </Button>

          <ErrorText>{verifyError}</ErrorText>

          {verifyResult !== null && (
            <p
              className={`rounded-md border px-3 py-2 text-sm font-medium ${
                verifyResult
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
                  : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
              }`}
            >
              {verifyResult ? "✓ Signature valid" : "✗ Signature invalid"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
