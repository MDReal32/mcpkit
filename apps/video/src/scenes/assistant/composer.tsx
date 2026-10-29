import { Caret } from "../../components/caret";
import { LogoMark } from "../../components/logo-mark";
import { typedText } from "../../motion/typed-text";
import { useEntrance } from "../../motion/use-entrance";
import { useSeconds } from "../../motion/use-seconds";
import { SANS } from "../../typography/fonts";
import { APP_COLORS, APP_WINDOW, CHAT_TIMELINE, COLUMN_LEFT, COMPOSER, PROMPT } from "./const";
import { SendButton } from "./send-button";

/** The message box: centred on a new chat, it docks to the bottom once the prompt is sent. */
export const Composer = () => {
  const seconds = useSeconds();
  const dock = useEntrance(CHAT_TIMELINE.send + 0.05, { damping: 200, stiffness: 140 });
  const sent = seconds >= CHAT_TIMELINE.send;
  const typed = typedText(PROMPT, seconds, CHAT_TIMELINE.typing.start, CHAT_TIMELINE.typing.end);
  return (
    <div
      style={{
        position: "absolute",
        left: COLUMN_LEFT,
        top: COMPOSER.centeredTop + (COMPOSER.dockedTop - COMPOSER.centeredTop) * dock,
        width: APP_WINDOW.column,
        height: COMPOSER.height,
        borderRadius: 20,
        background: APP_COLORS.composer,
        border: `1px solid ${APP_COLORS.border}`,
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
        padding: "20px 20px 16px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: SANS,
      }}
    >
      <div style={{ fontSize: 22, color: sent || typed === "" ? APP_COLORS.faint : APP_COLORS.text }}>
        {sent ? "Reply…" : typed || "How can I help you today?"}
        {sent ? null : <Caret height={26} solid={seconds < CHAT_TIMELINE.typing.end} />}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: `1px solid ${APP_COLORS.border}`,
            color: APP_COLORS.muted,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
          }}
        >
          +
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            height: 36,
            padding: "0 12px",
            borderRadius: 10,
            border: `1px solid ${APP_COLORS.border}`,
            fontSize: 16,
            color: APP_COLORS.muted,
          }}
        >
          <LogoMark size={18} />
          mcpkit
        </div>
        <div style={{ marginLeft: "auto" }}>
          <SendButton />
        </div>
      </div>
    </div>
  );
};
