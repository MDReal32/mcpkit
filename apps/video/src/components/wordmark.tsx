import { COLORS } from "../const";
import { SANS } from "../typography/fonts";
import { LogoMark } from "./logo-mark";

interface WordmarkProps {
  size: number;
  draw?: number;
}

export const Wordmark = ({ size, draw = 1 }: WordmarkProps) => (
  <div style={{ display: "flex", alignItems: "center", gap: size * 0.32 }}>
    <LogoMark size={size * 0.95} draw={draw} />
    <span
      style={{
        fontFamily: SANS,
        fontSize: size,
        fontWeight: 600,
        letterSpacing: "-0.045em",
        color: COLORS.text,
        lineHeight: 1,
      }}
    >
      mcpkit
    </span>
  </div>
);
