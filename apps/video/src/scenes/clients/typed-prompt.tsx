import { Caret } from "../../components/caret";
import { typedText } from "../../motion/typed-text";
import { useSeconds } from "../../motion/use-seconds";
import type { ClientWindowData } from "./client-window-data";
import { WINDOW_BEATS } from "./const";

interface TypedPromptProps {
  window: ClientWindowData;
}

export const TypedPrompt = ({ window }: TypedPromptProps) => {
  const seconds = useSeconds();
  const { start, end } = WINDOW_BEATS.prompt;
  const typing = seconds < end + 0.1;
  return (
    <div
      style={{
        fontSize: 22,
        lineHeight: 1.45,
        color: window.colors.text,
        padding: window.terminal ? 0 : "12px 16px",
        borderRadius: 12,
        background: window.terminal ? "transparent" : "rgba(255, 255, 255, 0.06)",
      }}
    >
      {window.terminal ? <span style={{ color: window.colors.faint }}>› </span> : null}
      {typedText(window.prompt, seconds, start, end)}
      {typing ? <Caret height={22} solid /> : null}
    </div>
  );
};
