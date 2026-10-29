import { COLORS } from "../const";
import { MONO, SANS } from "../typography/fonts";
import { RiseIn } from "./rise-in";

interface SceneCopyProps {
  eyebrow: string;
  title: string;
  body: string;
  delay?: number;
  width?: number;
}

export const SceneCopy = ({ eyebrow, title, body, delay = 0.02, width = 640 }: SceneCopyProps) => (
  <div style={{ width, flexShrink: 0, display: "flex", flexDirection: "column", gap: 28 }}>
    <RiseIn delay={delay}>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 24,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: COLORS.accent,
        }}
      >
        {eyebrow}
      </div>
    </RiseIn>
    <RiseIn delay={delay + 0.08}>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 96,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          lineHeight: 1.02,
          color: COLORS.text,
        }}
      >
        {title}
      </div>
    </RiseIn>
    <RiseIn delay={delay + 0.18}>
      <div style={{ fontFamily: SANS, fontSize: 38, lineHeight: 1.35, color: COLORS.muted, letterSpacing: "-0.01em" }}>
        {body}
      </div>
    </RiseIn>
  </div>
);
