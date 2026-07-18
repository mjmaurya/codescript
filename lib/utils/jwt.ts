// Shared helpers for the JWT Decoder and JWT Generator tools.
// Everything here runs client-side using native browser APIs (atob/btoa, TextEncoder/TextDecoder,
// and Web Crypto's SubtleCrypto for HMAC signing/verification). No Node "crypto" or "jsonwebtoken".

/** Decode a base64url string into raw bytes. */
export function base64UrlToBytes(input: string): Uint8Array<ArrayBuffer> {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** Decode a base64url string into a UTF-8 text string (safe for non-ASCII characters). */
export function base64UrlDecode(input: string): string {
  return new TextDecoder().decode(base64UrlToBytes(input));
}

/** Encode raw bytes as a base64url string (no padding, URL-safe alphabet). */
export function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Encode a UTF-8 text string as base64url (safe for non-ASCII characters). */
export function base64UrlEncode(input: string): string {
  return bytesToBase64Url(new TextEncoder().encode(input));
}

export interface DecodedJwt {
  headerRaw: string;
  payloadRaw: string;
  signatureRaw: string;
  header: unknown;
  payload: unknown;
}

/** Split and decode a JWT's header/payload segments. Throws a descriptive Error on failure. */
export function decodeJwt(token: string): DecodedJwt {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    throw new Error("A JWT must have 3 segments separated by periods (header.payload.signature).");
  }
  const [headerRaw, payloadRaw, signatureRaw] = parts;

  let header: unknown;
  try {
    header = JSON.parse(base64UrlDecode(headerRaw));
  } catch {
    throw new Error("Could not decode/parse the header segment as JSON.");
  }

  let payload: unknown;
  try {
    payload = JSON.parse(base64UrlDecode(payloadRaw));
  } catch {
    throw new Error("Could not decode/parse the payload segment as JSON.");
  }

  return { headerRaw, payloadRaw, signatureRaw, header, payload };
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/** Sign `header.payload` (HS256) with the given secret and return the full JWT string. */
export async function signJwtHs256(payloadJson: string, secret: string): Promise<string> {
  const header = JSON.stringify({ alg: "HS256", typ: "JWT" });
  const headerSegment = base64UrlEncode(header);
  const payloadSegment = base64UrlEncode(payloadJson);
  const signingInput = `${headerSegment}.${payloadSegment}`;

  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signingInput));
  const signatureSegment = bytesToBase64Url(new Uint8Array(signature));

  return `${signingInput}.${signatureSegment}`;
}

/** Verify an HS256 JWT's signature against the given secret. */
export async function verifyJwtHs256(token: string, secret: string): Promise<boolean> {
  const parts = token.trim().split(".");
  if (parts.length !== 3) return false;
  const [headerSegment, payloadSegment, signatureSegment] = parts;
  const signingInput = `${headerSegment}.${payloadSegment}`;

  const key = await importHmacKey(secret);
  const signatureBytes = base64UrlToBytes(signatureSegment);
  return crypto.subtle.verify("HMAC", key, signatureBytes, new TextEncoder().encode(signingInput));
}
