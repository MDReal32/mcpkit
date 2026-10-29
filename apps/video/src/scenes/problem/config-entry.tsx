import type { CSSProperties } from "react";
import { COLORS } from "../../const";
import { MONO } from "../../typography/fonts";
import type { ConfigEntryData } from "./config-entry-data";

interface ConfigEntryProps {
  entry: ConfigEntryData;
  fontSize: number;
  highlighted?: boolean;
  style?: CSSProperties;
}

/** One MCP client config entry, rendered as the JSON a user would otherwise write by hand. */
export const ConfigEntry = ({ entry, fontSize, highlighted = false, style }: ConfigEntryProps) => {
  const stringColor = highlighted ? COLORS.accentLight : COLORS.muted;
  const quoted = (value: string) => <span style={{ color: stringColor }}>"{value}"</span>;
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize,
        lineHeight: 1.6,
        color: COLORS.faint,
        whiteSpace: "pre",
        padding: `${fontSize * 1.1}px ${fontSize * 1.3}px`,
        borderRadius: 16,
        border: `1px solid ${highlighted ? "rgba(107, 140, 255, 0.55)" : COLORS.border}`,
        background: `linear-gradient(180deg, ${COLORS.surfaceRaised}, ${COLORS.surface})`,
        boxShadow: highlighted
          ? `0 0 0 6px rgba(107, 140, 255, 0.08), 0 30px 120px ${COLORS.accentGlow}`
          : "0 24px 60px rgba(0, 0, 0, 0.5)",
        ...style,
      }}
    >
      <div>
        <span style={{ color: COLORS.text }}>"{entry.name}"</span>: {"{"}
      </div>
      <div>
        {"  "}
        <span style={{ color: COLORS.text }}>"command"</span>: {quoted(entry.command)},
      </div>
      <div>
        {"  "}
        <span style={{ color: COLORS.text }}>"args"</span>: [
        {entry.args.map((arg, index) => (
          <span key={arg}>
            {index > 0 ? ", " : ""}
            {quoted(arg)}
          </span>
        ))}
        ]{entry.env ? "," : ""}
      </div>
      {entry.env ? (
        <div>
          {"  "}
          <span style={{ color: COLORS.text }}>"env"</span>: {"{ "}
          {quoted(entry.env)}: {quoted("••••••")}
          {" }"}
        </div>
      ) : null}
      <div>{"}"}</div>
    </div>
  );
};
