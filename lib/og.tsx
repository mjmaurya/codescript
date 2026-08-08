import { ImageResponse } from "next/og";
import { SITE_NAME } from "./constants";

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgImage({ title, subtitle }: { title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0f172a",
          backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "16px", height: "16px", borderRadius: "9999px", backgroundColor: "#818cf8", display: "flex" }} />
          <div style={{ fontSize: 28, fontWeight: 600, color: "#94a3b8", display: "flex" }}>{SITE_NAME}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#f8fafc",
              lineHeight: 1.15,
              display: "flex",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 30, color: "#a5b4fc", display: "flex", maxWidth: "900px" }}>{subtitle}</div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
