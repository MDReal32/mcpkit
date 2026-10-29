import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../const";
import { Grain } from "./grain";

/** The one backdrop behind every scene: a dot grid and a slow accent glow. */
export const Background = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drift = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${COLORS.borderStrong} 1.2px, transparent 1.2px)`,
          backgroundSize: "36px 36px",
          opacity: 0.55,
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black 0%, transparent 75%)",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 45% 40% at ${50 + Math.sin(drift * 0.35) * 14}% ${
            38 + Math.cos(drift * 0.28) * 10
          }%, ${COLORS.accentSoft}, transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 55%, rgba(0, 0, 0, 0.6) 100%)",
        }}
      />
      <Grain />
    </AbsoluteFill>
  );
};
