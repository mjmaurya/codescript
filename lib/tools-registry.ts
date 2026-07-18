export type ToolCategory =
  | "json"
  | "jwt"
  | "base64"
  | "uuid"
  | "regex"
  | "sql"
  | "timestamp"
  | "hash"
  | "password"
  | "qrcode"
  | "text";

export interface ToolExample {
  label: string;
  input: string;
  output?: string;
  note?: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolCommonError {
  title: string;
  description: string;
}

export interface ToolDefinition {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  shortDescription: string;
  category: ToolCategory;
  keywords: string[];
  whatItDoes: string;
  commonErrors?: ToolCommonError[];
  examples?: ToolExample[];
  faqs: ToolFaq[];
  relatedToolSlugs: string[];
  componentKey: string;
  updatedAt?: string;
  priority?: number;
}

export interface ToolCategoryDefinition {
  slug: ToolCategory;
  label: string;
  description: string;
}

export const categories: ToolCategoryDefinition[] = [
  { slug: "json", label: "JSON Tools", description: "Format, validate, minify, diff, and convert JSON." },
  { slug: "jwt", label: "JWT Tools", description: "Decode and generate JSON Web Tokens." },
  { slug: "base64", label: "Base64 Tools", description: "Encode and decode text and files as Base64." },
  { slug: "uuid", label: "UUID Tools", description: "Generate unique identifiers." },
  { slug: "regex", label: "Regex Tools", description: "Test and debug regular expressions." },
  { slug: "sql", label: "SQL Tools", description: "Format and minify SQL queries." },
  { slug: "timestamp", label: "Timestamp Tools", description: "Convert between Unix timestamps and human-readable dates." },
  { slug: "hash", label: "Hash Tools", description: "Generate cryptographic hashes." },
  { slug: "password", label: "Password Tools", description: "Generate strong random passwords." },
  { slug: "qrcode", label: "QR Code Tools", description: "Generate downloadable QR codes." },
  { slug: "text", label: "Text Tools", description: "Encode, escape, and transform text." },
];

export const tools: ToolDefinition[] = [
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    seoTitle: "JSON Formatter – Format, Validate & Beautify JSON Online",
    metaDescription:
      "Free online JSON formatter. Paste minified or messy JSON and instantly get a beautified, indented, easy-to-read version. Runs entirely in your browser.",
    shortDescription: "Beautify and indent messy or minified JSON.",
    category: "json",
    keywords: ["json formatter", "json beautifier", "format json online", "pretty print json"],
    whatItDoes:
      "The JSON Formatter takes minified, single-line, or inconsistently indented JSON and reformats it with consistent indentation so it's easy to read and debug. It also validates the JSON as it formats, so syntax errors are caught immediately.",
    commonErrors: [
      { title: "Trailing commas", description: "JSON (unlike JavaScript) does not allow a trailing comma after the last item in an object or array." },
      { title: "Single quotes", description: "JSON requires double quotes around strings and keys — single quotes will fail to parse." },
      { title: "Unquoted keys", description: "Object keys must be wrapped in double quotes, e.g. \"key\": \"value\", not key: \"value\"." },
    ],
    examples: [
      { label: "Minified input", input: '{"name":"Ada","active":true,"roles":["admin","user"]}', output: '{\n  "name": "Ada",\n  "active": true,\n  "roles": [\n    "admin",\n    "user"\n  ]\n}' },
    ],
    faqs: [
      { question: "Is my JSON data sent to a server?", answer: "No. All formatting happens locally in your browser using JavaScript's built-in JSON parser — your data never leaves your device." },
      { question: "Can I use this to validate JSON too?", answer: "Yes — if the JSON is invalid, the formatter will show a parse error instead of output." },
    ],
    relatedToolSlugs: ["json-validator", "json-minifier", "json-compare", "json-yaml-converter"],
    componentKey: "json-formatter",
    priority: 0.9,
  },
  {
    slug: "json-validator",
    title: "JSON Validator",
    seoTitle: "JSON Validator – Check JSON Syntax Online for Free",
    metaDescription:
      "Validate JSON syntax instantly. Get a precise error message with line and column number when your JSON is invalid. 100% client-side, nothing is uploaded.",
    shortDescription: "Check whether JSON is syntactically valid, with precise error locations.",
    category: "json",
    keywords: ["json validator", "validate json", "json syntax checker"],
    whatItDoes:
      "The JSON Validator parses your input and reports whether it is valid JSON. When it isn't, it converts the parser's error position into a line and column number so you can find and fix the problem quickly.",
    commonErrors: [
      { title: "Comments in JSON", description: "JSON has no comment syntax — // and /* */ are not valid and will cause a parse error." },
      { title: "NaN / undefined / Infinity", description: "These JavaScript values are not valid JSON literals." },
    ],
    faqs: [
      { question: "Why does the error mention a character position instead of a line number?", answer: "Browsers only report a raw character offset. This tool converts that offset to a line/column by counting newlines before it." },
    ],
    relatedToolSlugs: ["json-formatter", "json-minifier"],
    componentKey: "json-validator",
    priority: 0.7,
  },
  {
    slug: "json-minifier",
    title: "JSON Minifier",
    seoTitle: "JSON Minifier – Compress JSON by Removing Whitespace",
    metaDescription:
      "Minify JSON online by stripping all unnecessary whitespace and newlines, producing the smallest possible valid JSON payload. Runs locally in your browser.",
    shortDescription: "Strip whitespace from JSON to reduce payload size.",
    category: "json",
    keywords: ["json minifier", "minify json", "compress json"],
    whatItDoes:
      "The JSON Minifier parses your JSON and re-serializes it with no extra whitespace, producing a compact single-line output — useful for reducing payload size before sending JSON over a network.",
    faqs: [
      { question: "Does minifying change the data?", answer: "No — only whitespace is removed. The parsed value (keys, strings, numbers, booleans, nulls, arrays, objects) is identical." },
    ],
    relatedToolSlugs: ["json-formatter", "json-validator"],
    componentKey: "json-minifier",
    priority: 0.6,
  },
  {
    slug: "json-compare",
    title: "JSON Compare",
    seoTitle: "JSON Compare – Diff Two JSON Documents Online",
    metaDescription:
      "Compare two JSON documents side by side and see exactly what changed. Both inputs are pretty-printed and diffed line by line, entirely in your browser.",
    shortDescription: "Diff two JSON documents and see what changed.",
    category: "json",
    keywords: ["json compare", "json diff", "compare two json files"],
    whatItDoes:
      "JSON Compare pretty-prints both of your JSON inputs with consistent formatting, then runs a line-by-line diff so additions, removals, and changes are highlighted clearly — similar to a git diff.",
    faqs: [
      { question: "Does key order matter?", answer: "Since this is a line diff on pretty-printed text, reordered keys will show as changed lines even if the underlying data is equivalent. For strict key-order-independent comparison you'd need a structural diff instead." },
    ],
    relatedToolSlugs: ["json-formatter", "json-validator"],
    componentKey: "json-compare",
    priority: 0.6,
  },
  {
    slug: "json-yaml-converter",
    title: "JSON to YAML Converter",
    seoTitle: "JSON to YAML Converter – Convert Between JSON and YAML Online",
    metaDescription:
      "Convert JSON to YAML or YAML to JSON instantly, free, and entirely in your browser. Automatically detects which format you pasted.",
    shortDescription: "Convert between JSON and YAML formats.",
    category: "json",
    keywords: ["json to yaml", "yaml to json", "json yaml converter"],
    whatItDoes:
      "This tool detects whether your input is JSON or YAML, then converts it to the other format. Paste JSON to get YAML, or paste YAML to get JSON.",
    faqs: [
      { question: "How does it know which direction to convert?", answer: "It first tries to parse the input as JSON. If that fails, it falls back to parsing as YAML and converts to JSON instead." },
    ],
    relatedToolSlugs: ["json-formatter", "json-path-tester"],
    componentKey: "json-yaml-converter",
    priority: 0.6,
  },
  {
    slug: "json-path-tester",
    title: "JSONPath Tester",
    seoTitle: "JSONPath Tester – Run JSONPath Queries Against JSON Online",
    metaDescription:
      "Test JSONPath expressions against your own JSON data and see matching results instantly. Free, client-side JSONPath evaluator.",
    shortDescription: "Run JSONPath queries against JSON and preview matches.",
    category: "json",
    keywords: ["jsonpath tester", "jsonpath evaluator", "jsonpath online"],
    whatItDoes:
      "Paste a JSON document and a JSONPath expression (e.g. $.store.book[0].title) and this tool evaluates the expression against your data, showing every matching value.",
    faqs: [
      { question: "What JSONPath syntax is supported?", answer: "Standard JSONPath syntax, including wildcards (*), recursive descent (..), array slices, and filter expressions (?())." },
    ],
    relatedToolSlugs: ["json-formatter", "json-yaml-converter"],
    componentKey: "json-path-tester",
    priority: 0.5,
  },
  {
    slug: "jwt-decoder",
    title: "JWT Decoder",
    seoTitle: "JWT Decoder – Decode JSON Web Tokens Online",
    metaDescription:
      "Decode a JWT's header and payload instantly. See the algorithm, claims, and expiration at a glance. 100% client-side — your token never leaves your browser.",
    shortDescription: "Decode a JWT's header and payload.",
    category: "jwt",
    keywords: ["jwt decoder", "decode jwt", "jwt parser"],
    whatItDoes:
      "Paste a JSON Web Token and this tool splits it into its three parts, base64url-decodes the header and payload, and displays them as readable JSON — including common claims like exp, iat, and sub.",
    commonErrors: [
      { title: "Decoding doesn't verify the signature", description: "Decoding only reveals the header and payload contents. It does not prove the token is authentic — use the JWT Generator's verify mode with the correct secret for that." },
    ],
    faqs: [
      { question: "Is my token uploaded anywhere?", answer: "No — decoding happens entirely in your browser using base64url decoding and JSON.parse. Nothing is sent to a server." },
      { question: "Why does the payload show a Unix timestamp for exp?", answer: "JWT date claims (exp, iat, nbf) are stored as seconds since the Unix epoch by the JWT spec — this tool also shows the human-readable equivalent." },
    ],
    relatedToolSlugs: ["jwt-generator", "timestamp-converter", "base64-encoder-decoder"],
    componentKey: "jwt-decoder",
    priority: 0.9,
  },
  {
    slug: "jwt-generator",
    title: "JWT Generator",
    seoTitle: "JWT Generator – Create & Sign HS256 JSON Web Tokens Online",
    metaDescription:
      "Generate and sign a JWT using HS256 with your own header, payload, and secret — or verify an existing HS256 token's signature. Runs entirely in your browser.",
    shortDescription: "Create and sign an HS256 JWT, or verify a token's signature.",
    category: "jwt",
    keywords: ["jwt generator", "create jwt", "sign jwt", "hs256 jwt"],
    whatItDoes:
      "Enter a JSON payload and a secret, and this tool signs a JWT using HMAC-SHA256 (HS256) via your browser's native Web Crypto API. It can also verify whether an existing HS256 token's signature matches a given secret.",
    commonErrors: [
      { title: "Only HS256 is supported", description: "This generator signs and verifies HS256 (HMAC) tokens only. RS256/ES256 (asymmetric) tokens require a private/public key pair and aren't supported here." },
    ],
    faqs: [
      { question: "Is my secret sent anywhere?", answer: "No. Signing uses the browser's native SubtleCrypto API entirely client-side — your secret and payload never leave your device." },
      { question: "Why use Web Crypto instead of a JS JWT library?", answer: "Most popular JWT libraries (like jsonwebtoken) depend on Node's crypto module and aren't safe or intended to run in the browser. Web Crypto's SubtleCrypto HMAC API covers HS256 signing and verification natively." },
    ],
    relatedToolSlugs: ["jwt-decoder", "hash-generator"],
    componentKey: "jwt-generator",
    priority: 0.7,
  },
  {
    slug: "base64-encoder-decoder",
    title: "Base64 Encoder / Decoder",
    seoTitle: "Base64 Encode & Decode – Text and Files Online",
    metaDescription:
      "Encode text or files to Base64, or decode Base64 back to text/download the original file. Handles full UTF-8 text correctly. Runs entirely in your browser.",
    shortDescription: "Encode or decode Base64 for text and files.",
    category: "base64",
    keywords: ["base64 encode", "base64 decode", "base64 converter", "base64 file"],
    whatItDoes:
      "Encode any text or file into a Base64 string, or decode a Base64 string back into readable text or a downloadable file. Text encoding is UTF-8 safe, so emoji and accented characters round-trip correctly.",
    commonErrors: [
      { title: "btoa() breaks on non-Latin1 text", description: "Naive use of the browser's built-in btoa() throws on characters outside Latin-1 (like emoji). This tool encodes via UTF-8 bytes first, so any text works." },
      { title: "Invalid Base64 padding", description: "Base64 strings must be a length that's a multiple of 4 (using = padding). A truncated or corrupted string will fail to decode." },
    ],
    faqs: [
      { question: "Is there a file size limit?", answer: "Very large files (hundreds of MB) can slow down or freeze the browser tab, since encoding happens on the main thread. For best results, keep files under a reasonable size." },
    ],
    relatedToolSlugs: ["url-encoder-decoder", "hash-generator"],
    componentKey: "base64-encoder-decoder",
    priority: 0.9,
  },
  {
    slug: "uuid-generator",
    title: "UUID Generator",
    seoTitle: "UUID Generator – Generate v1, v4 & v5 UUIDs Online",
    metaDescription:
      "Generate random (v4), time-based (v1), or name-based (v5) UUIDs in bulk. Free, instant, and entirely client-side.",
    shortDescription: "Generate v1, v4, or v5 UUIDs, individually or in bulk.",
    category: "uuid",
    keywords: ["uuid generator", "guid generator", "generate uuid online"],
    whatItDoes:
      "Generates universally unique identifiers (UUIDs). Choose v4 for cryptographically random IDs (the most common case), v1 for timestamp-based IDs, or v5 for deterministic IDs derived from a namespace and name. Generate one or many at once.",
    faqs: [
      { question: "Which version should I use?", answer: "v4 (random) is the right default for almost all use cases, like database primary keys or request IDs. Use v5 only if you need the same input to always produce the same UUID." },
      { question: "Are these cryptographically secure?", answer: "v4 UUIDs are generated using crypto.randomUUID() / crypto.getRandomValues(), which are cryptographically secure random sources." },
    ],
    relatedToolSlugs: ["password-generator", "hash-generator"],
    componentKey: "uuid-generator",
    priority: 0.8,
  },
  {
    slug: "regex-tester",
    title: "Regex Tester",
    seoTitle: "Regex Tester – Test Regular Expressions Online",
    metaDescription:
      "Test regular expressions against sample text with live match highlighting, capture groups, and a flags cheat sheet. Runs entirely in your browser.",
    shortDescription: "Test regex patterns with live match highlighting and capture groups.",
    category: "regex",
    keywords: ["regex tester", "regular expression tester", "regex online"],
    whatItDoes:
      "Enter a regular expression and test string, and this tool highlights every match live as you type, lists each capture group, and shows which flags (g, i, m, s, u, y) are active.",
    faqs: [
      { question: "Does this explain what my regex means in plain English?", answer: "Not currently — this tool focuses on live matching, capture groups, and a flags reference. A natural-language explainer may be added later." },
    ],
    relatedToolSlugs: ["json-path-tester", "url-encoder-decoder"],
    componentKey: "regex-tester",
    priority: 0.8,
  },
  {
    slug: "sql-formatter",
    title: "SQL Formatter",
    seoTitle: "SQL Formatter – Beautify SQL Queries Online",
    metaDescription:
      "Format and beautify SQL queries with proper indentation across MySQL, PostgreSQL, SQL Server, and more dialects. Free and entirely client-side.",
    shortDescription: "Beautify SQL queries with proper indentation.",
    category: "sql",
    keywords: ["sql formatter", "format sql", "sql beautifier"],
    whatItDoes:
      "Paste a SQL query and this tool reformats it with consistent indentation and line breaks around clauses (SELECT, FROM, WHERE, JOIN, etc.), with a dialect selector for MySQL, PostgreSQL, SQL Server, BigQuery, and more.",
    faqs: [
      { question: "Does the dialect choice matter?", answer: "Yes — different databases have slightly different SQL syntax (quoting, functions). Choosing the right dialect improves formatting accuracy for dialect-specific syntax." },
    ],
    relatedToolSlugs: ["sql-minifier", "json-formatter"],
    componentKey: "sql-formatter",
    priority: 0.8,
  },
  {
    slug: "sql-minifier",
    title: "SQL Minifier",
    seoTitle: "SQL Minifier – Compress SQL Queries Online",
    metaDescription:
      "Minify SQL queries by collapsing whitespace outside of string literals and comments, producing a compact one-line query. Free and client-side.",
    shortDescription: "Collapse whitespace in SQL queries to compress them.",
    category: "sql",
    keywords: ["sql minifier", "minify sql", "compress sql query"],
    whatItDoes:
      "Removes unnecessary whitespace and line breaks from a SQL query, while carefully preserving spacing inside string literals ('...', \"...\") and comments (--, #, /* */) so the query's meaning doesn't change.",
    commonErrors: [
      { title: "Escaped quotes inside strings", description: "A doubled quote ('') inside a string literal represents an escaped quote, not the end of the string — this tool accounts for that when scanning." },
    ],
    faqs: [
      { question: "Will minifying change what my query does?", answer: "No — only whitespace outside of strings and comments is collapsed. The query's logic is unchanged." },
    ],
    relatedToolSlugs: ["sql-formatter", "json-minifier"],
    componentKey: "sql-minifier",
    priority: 0.5,
  },
  {
    slug: "timestamp-converter",
    title: "Timestamp Converter",
    seoTitle: "Timestamp Converter – Unix Timestamp to Date Online",
    metaDescription:
      "Convert Unix timestamps to human-readable dates and back, with timezone selection. Free, instant, and entirely client-side.",
    shortDescription: "Convert between Unix timestamps and human-readable dates.",
    category: "timestamp",
    keywords: ["timestamp converter", "unix timestamp", "epoch converter"],
    whatItDoes:
      "Converts a Unix timestamp (seconds or milliseconds since Jan 1, 1970 UTC) into a human-readable date in a timezone of your choice, and converts a picked date/time back into a Unix timestamp.",
    faqs: [
      { question: "Seconds or milliseconds?", answer: "This tool auto-detects based on digit count: 10-digit numbers are treated as seconds, 13-digit numbers as milliseconds." },
      { question: "Why a timezone dropdown instead of typing a date?", answer: "Free-text date parsing is inconsistent across browsers and locales. A timezone-aware date/time picker avoids ambiguity." },
    ],
    relatedToolSlugs: ["jwt-decoder", "uuid-generator"],
    componentKey: "timestamp-converter",
    priority: 0.8,
  },
  {
    slug: "hash-generator",
    title: "Hash Generator",
    seoTitle: "Hash Generator – MD5, SHA-1, SHA-256 & SHA-512 Online",
    metaDescription:
      "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text instantly. Free and entirely client-side — nothing is uploaded.",
    shortDescription: "Generate MD5 and SHA family hashes from text.",
    category: "hash",
    keywords: ["hash generator", "md5 generator", "sha256 online", "sha1 hash"],
    whatItDoes:
      "Enter any text and instantly get its MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hash digests, computed locally in your browser.",
    faqs: [
      { question: "Is MD5 or SHA-1 secure?", answer: "No — both are considered cryptographically broken for security purposes (e.g. password storage, digital signatures). They're included here for compatibility/checksum use cases, not security." },
      { question: "Which hash should I use for security-sensitive purposes?", answer: "SHA-256 or SHA-512 are the current safe defaults for integrity/security use cases. Never use any of these general-purpose hashes for storing passwords — use a dedicated password hashing algorithm like bcrypt or Argon2 instead." },
    ],
    relatedToolSlugs: ["jwt-generator", "password-generator"],
    componentKey: "hash-generator",
    priority: 0.7,
  },
  {
    slug: "password-generator",
    title: "Password Generator",
    seoTitle: "Password Generator – Create Strong Random Passwords Online",
    metaDescription:
      "Generate strong, cryptographically random passwords with customizable length and character sets. Free and entirely client-side.",
    shortDescription: "Generate strong random passwords with customizable rules.",
    category: "password",
    keywords: ["password generator", "random password", "strong password generator"],
    whatItDoes:
      "Generates random passwords using your browser's cryptographically secure random number generator. Customize length and which character sets to include (lowercase, uppercase, digits, symbols), and see an estimated entropy in bits.",
    commonErrors: [
      { title: "Math.random() is not secure", description: "This tool deliberately avoids Math.random() for password generation, since it's not cryptographically secure — it uses crypto.getRandomValues() instead." },
    ],
    faqs: [
      { question: "How is strength estimated?", answer: "As entropy in bits, calculated as length × log2(character set size) — a rough but standard measure of how many guesses a brute-force attack would need." },
    ],
    relatedToolSlugs: ["uuid-generator", "hash-generator"],
    componentKey: "password-generator",
    priority: 0.8,
  },
  {
    slug: "qr-code-generator",
    title: "QR Code Generator",
    seoTitle: "QR Code Generator – Create Free QR Codes Online",
    metaDescription:
      "Generate a QR code from any text or URL and download it as PNG or SVG. Free, instant, and entirely client-side.",
    shortDescription: "Generate a downloadable QR code from text or a URL.",
    category: "qrcode",
    keywords: ["qr code generator", "create qr code", "free qr code"],
    whatItDoes:
      "Enter any text or URL and instantly get a QR code you can download as a PNG image or an SVG file, with adjustable error-correction level and size.",
    faqs: [
      { question: "What's error correction level for?", answer: "Higher error correction (Q or H) lets the QR code still scan correctly even if part of it is damaged or obscured, at the cost of a denser pattern." },
    ],
    relatedToolSlugs: ["url-encoder-decoder", "uuid-generator"],
    componentKey: "qr-code-generator",
    priority: 0.7,
  },
  {
    slug: "url-encoder-decoder",
    title: "URL Encoder / Decoder",
    seoTitle: "URL Encode & Decode – Percent-Encoding Tool Online",
    metaDescription:
      "Encode text for safe use in URLs (percent-encoding) or decode a URL-encoded string back to plain text. Free and entirely client-side.",
    shortDescription: "Percent-encode or decode text for use in URLs.",
    category: "text",
    keywords: ["url encode", "url decode", "percent encoding", "uri encode"],
    whatItDoes:
      "Encodes special characters in text so it's safe to use inside a URL (percent-encoding), or decodes a percent-encoded string back to its original form.",
    faqs: [
      { question: "What's the difference between encodeURIComponent and encodeURI?", answer: "encodeURIComponent (used here) escapes more characters, making it safe for encoding a single query-string value. encodeURI is meant for encoding a full URL and leaves characters like / and : untouched." },
    ],
    relatedToolSlugs: ["html-escape", "base64-encoder-decoder"],
    componentKey: "url-encoder-decoder",
    priority: 0.6,
  },
  {
    slug: "html-escape",
    title: "HTML Escape / Unescape",
    seoTitle: "HTML Escape & Unescape – Convert HTML Entities Online",
    metaDescription:
      "Escape text to safe HTML entities (for embedding in HTML) or unescape HTML entities back to plain text. Free and entirely client-side.",
    shortDescription: "Convert text to/from safe HTML entities.",
    category: "text",
    keywords: ["html escape", "html unescape", "html entities converter"],
    whatItDoes:
      "Escapes characters like <, >, &, and quotes into their HTML entity equivalents (e.g. &lt;) so text can be safely embedded inside HTML, or converts HTML entities back into plain text.",
    faqs: [
      { question: "Why does this matter?", answer: "Rendering un-escaped user input as HTML can lead to XSS (cross-site scripting) vulnerabilities. Escaping ensures special characters display as text instead of being interpreted as markup." },
    ],
    relatedToolSlugs: ["url-encoder-decoder", "case-converter"],
    componentKey: "html-escape",
    priority: 0.5,
  },
  {
    slug: "case-converter",
    title: "Case Converter",
    seoTitle: "Case Converter – camelCase, snake_case, kebab-case & More",
    metaDescription:
      "Convert text between camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and Title Case instantly. Free and entirely client-side.",
    shortDescription: "Convert text between common naming case styles.",
    category: "text",
    keywords: ["case converter", "camel case", "snake case", "kebab case converter"],
    whatItDoes:
      "Converts text between common code and naming conventions: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and Title Case.",
    faqs: [
      { question: "How are word boundaries detected?", answer: "The converter splits on spaces, hyphens, underscores, and camelCase/PascalCase letter transitions, then rejoins the words in the target case style." },
    ],
    relatedToolSlugs: ["html-escape", "url-encoder-decoder"],
    componentKey: "case-converter",
    priority: 0.5,
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return tools.filter((t) => t.category === category);
}

export function getAllToolSlugs(): string[] {
  return tools.map((t) => t.slug);
}

export function getRelatedTools(tool: ToolDefinition): ToolDefinition[] {
  const explicit = tool.relatedToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => Boolean(t));
  if (explicit.length >= 3) return explicit;
  const explicitSlugs = new Set(explicit.map((t) => t.slug));
  const fallback = getToolsByCategory(tool.category).filter(
    (t) => t.slug !== tool.slug && !explicitSlugs.has(t.slug)
  );
  return [...explicit, ...fallback].slice(0, 4);
}

export function getCategoryBySlug(slug: ToolCategory): ToolCategoryDefinition | undefined {
  return categories.find((c) => c.slug === slug);
}
