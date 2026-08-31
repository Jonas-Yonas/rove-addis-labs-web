import { ImageResponse } from "next/og";

import { brand } from "@/config/brand";
import { siteUrl } from "@/lib/site";

export const alt = `${brand.name} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const domain = siteUrl.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0F2933",
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(40,181,177,0.38), transparent 42%), radial-gradient(circle at 96% 96%, rgba(40,181,177,0.16), transparent 48%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex" }}>
          <svg width="108" height="108" viewBox="0 0 512 512">
            <rect width="512" height="512" rx="112" fill="#0B1F27" />
            <path
              d="M160 256C160 202.981 202.981 160 256 160C309.019 160 352 202.981 352 256"
              stroke="#F7F8F6"
              strokeWidth="58"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M160 256C160 309.019 202.981 352 256 352C309.019 352 352 309.019 352 256"
              stroke="#28B5B1"
              strokeWidth="58"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="256" cy="256" r="42" fill="#F7F8F6" />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {brand.name}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 30,
              color: "#28B5B1",
              letterSpacing: "0.04em",
            }}
          >
            {brand.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {domain}
        </div>
      </div>
    ),
    { ...size },
  );
}
