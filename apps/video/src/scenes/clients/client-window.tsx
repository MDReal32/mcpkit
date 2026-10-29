import { Sequence, useVideoConfig } from "remotion";
import { RiseIn } from "../../components/rise-in";
import { MONO, SANS } from "../../typography/fonts";
import { StreamedText } from "../assistant/streamed-text";
import { ToolCallRow } from "../assistant/tool-call-row";
import type { ClientWindowData } from "./client-window-data";
import { CLIENT_WINDOW, WINDOW_BEATS } from "./const";
import { TypedPrompt } from "./typed-prompt";
import { windowStart } from "./window-start";

interface ClientWindowProps {
  window: ClientWindowData;
  index: number;
}

/** Another client making its own mcpkit call; times inside are relative to the window's start. */
export const ClientWindow = ({ window, index }: ClientWindowProps) => {
  const { fps } = useVideoConfig();
  const start = windowStart(index);
  const font = window.terminal ? MONO : SANS;
  return (
    <RiseIn delay={start} distance={70} style={{ position: "relative" }}>
      <div
        style={{
          width: CLIENT_WINDOW.width,
          height: CLIENT_WINDOW.height,
          borderRadius: 14,
          overflow: "hidden",
          background: window.background,
          border: `1px solid ${window.colors.border}`,
          boxShadow: "0 40px 110px rgba(0, 0, 0, 0.55)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: 44,
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "0 16px",
            background: window.chrome,
            borderBottom: `1px solid ${window.colors.border}`,
            fontFamily: SANS,
            fontSize: 16,
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            {[0, 1, 2].map((dot) => (
              <div key={dot} style={{ width: 11, height: 11, borderRadius: 6, background: window.colors.border }} />
            ))}
          </div>
          <span style={{ color: window.colors.text, fontWeight: 600 }}>{window.client}</span>
          <span style={{ color: window.colors.faint, fontFamily: window.terminal ? MONO : SANS }}>{window.panel}</span>
        </div>
        <Sequence from={Math.round(start * fps)} layout="none">
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20, fontFamily: font }}>
            <TypedPrompt window={window} />
            <ToolCallRow call={window.call} colors={window.colors} fontSize={14} />
            <StreamedText
              text={window.reply}
              start={WINDOW_BEATS.reply.start}
              end={WINDOW_BEATS.reply.end}
              style={{ fontFamily: font, fontSize: 22, lineHeight: 1.45, color: window.colors.text }}
            />
          </div>
        </Sequence>
      </div>
    </RiseIn>
  );
};
