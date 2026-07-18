"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const toolComponents: Record<string, ComponentType> = {
  "json-formatter": dynamic(() => import("@/components/tools/json/JsonFormatter"), { ssr: false }),
  "json-validator": dynamic(() => import("@/components/tools/json/JsonValidator"), { ssr: false }),
  "json-minifier": dynamic(() => import("@/components/tools/json/JsonMinifier"), { ssr: false }),
  "json-compare": dynamic(() => import("@/components/tools/json/JsonCompare"), { ssr: false }),
  "json-yaml-converter": dynamic(() => import("@/components/tools/json/JsonYamlConverter"), { ssr: false }),
  "json-path-tester": dynamic(() => import("@/components/tools/json/JsonPathTester"), { ssr: false }),

  "jwt-decoder": dynamic(() => import("@/components/tools/jwt/JwtDecoder"), { ssr: false }),
  "jwt-generator": dynamic(() => import("@/components/tools/jwt/JwtGenerator"), { ssr: false }),

  "base64-encoder-decoder": dynamic(() => import("@/components/tools/base64/Base64EncoderDecoder"), { ssr: false }),

  "uuid-generator": dynamic(() => import("@/components/tools/uuid/UuidGenerator"), { ssr: false }),

  "regex-tester": dynamic(() => import("@/components/tools/regex/RegexTester"), { ssr: false }),

  "sql-formatter": dynamic(() => import("@/components/tools/sql/SqlFormatter"), { ssr: false }),
  "sql-minifier": dynamic(() => import("@/components/tools/sql/SqlMinifier"), { ssr: false }),

  "timestamp-converter": dynamic(() => import("@/components/tools/timestamp/TimestampConverter"), { ssr: false }),

  "hash-generator": dynamic(() => import("@/components/tools/hash/HashGenerator"), { ssr: false }),

  "password-generator": dynamic(() => import("@/components/tools/password/PasswordGenerator"), { ssr: false }),

  "qr-code-generator": dynamic(() => import("@/components/tools/qrcode/QrCodeGenerator"), { ssr: false }),

  "url-encoder-decoder": dynamic(() => import("@/components/tools/text/UrlEncoderDecoder"), { ssr: false }),
  "html-escape": dynamic(() => import("@/components/tools/text/HtmlEscape"), { ssr: false }),
  "case-converter": dynamic(() => import("@/components/tools/text/CaseConverter"), { ssr: false }),
};
