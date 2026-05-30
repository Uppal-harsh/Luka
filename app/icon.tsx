import { ImageResponse } from "next/og";

export const runtime = "edge";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f2f2f2"
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 28,
            background: "linear-gradient(145deg, #0d0d0d, #585858)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 16px 40px rgba(13, 13, 13, 0.18)"
          }}
        >
          <div
            style={{
              width: 86,
              height: 86,
              borderRadius: 24,
              background: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <svg viewBox="0 0 48 48" width="44" height="44" fill="none">
              <path
                d="M15 12v18.5c0 2.9 2.3 5.5 5.2 5.5H34"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M17 33h15" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    ),
    {
      width: 512,
      height: 512
    }
  );
}
