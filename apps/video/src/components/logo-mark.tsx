import { COLORS } from "../const";
import { LOGO_INPUTS, LOGO_OUTPUT } from "./const";

interface LogoMarkProps {
  size: number;
  draw?: number;
}

/** Three inputs converging into one: many servers, one MCP server. */
export const LogoMark = ({ size, draw = 1 }: LogoMarkProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="logo-stroke" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor={COLORS.accent} stopOpacity="0.45" />
        <stop offset="1" stopColor={COLORS.accent} />
      </linearGradient>
    </defs>
    {LOGO_INPUTS.map((y) => (
      <path
        key={y}
        d={`M 12 ${y} C 32 ${y}, 34 ${LOGO_OUTPUT.y}, ${LOGO_OUTPUT.x} ${LOGO_OUTPUT.y}`}
        pathLength={1}
        stroke="url(#logo-stroke)"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
      />
    ))}
    {LOGO_INPUTS.map((y) => (
      <circle key={`node-${y}`} cx={12} cy={y} r={5} fill={COLORS.text} opacity={Math.min(1, draw * 3)} />
    ))}
    <circle cx={LOGO_OUTPUT.x} cy={LOGO_OUTPUT.y} r={7.5} fill={COLORS.accent} opacity={Math.max(0, draw * 2 - 1)} />
  </svg>
);
