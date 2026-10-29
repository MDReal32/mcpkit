import type { CSSProperties, ReactNode } from "react";
import { COLORS } from "../const";
import { MONO } from "../typography/fonts";

interface WindowFrameProps {
  title: string;
  width: number;
  height: number;
  style?: CSSProperties;
  children: ReactNode;
}

export const WindowFrame = ({ title, width, height, style, children }: WindowFrameProps) => (
  <div
    style={{
      width,
      height,
      borderRadius: 18,
      border: `1px solid ${COLORS.border}`,
      background: `linear-gradient(180deg, ${COLORS.surfaceRaised}, ${COLORS.surface})`,
      boxShadow: "0 40px 120px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    <div
      style={{
        height: 52,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        borderBottom: `1px solid ${COLORS.border}`,
        position: "relative",
      }}
    >
      <div style={{ display: "flex", gap: 9 }}>
        {[0, 1, 2].map((dot) => (
          <div key={dot} style={{ width: 13, height: 13, borderRadius: 7, background: COLORS.borderStrong }} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: MONO,
          fontSize: 18,
          color: COLORS.faint,
        }}
      >
        {title}
      </div>
    </div>
    <div style={{ flex: 1, position: "relative" }}>{children}</div>
  </div>
);
