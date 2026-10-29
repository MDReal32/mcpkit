import { Caret } from "../../components/caret";
import { COLORS } from "../../const";
import { typedText } from "../../motion/typed-text";
import { useSeconds } from "../../motion/use-seconds";
import { MONO } from "../../typography/fonts";
import { INSTALL_COMMAND, TERMINAL_FONT_SIZE, TYPING_WINDOW } from "./const";

export const TerminalPrompt = () => {
  const seconds = useSeconds();
  const typing = seconds < TYPING_WINDOW.end + 0.15;
  return (
    <div style={{ fontFamily: MONO, fontSize: TERMINAL_FONT_SIZE * 1.15, color: COLORS.text, height: 52 }}>
      <span style={{ color: COLORS.accent }}>~ </span>
      <span style={{ color: COLORS.faint }}>$ </span>
      {typedText(INSTALL_COMMAND, seconds, TYPING_WINDOW.start, TYPING_WINDOW.end)}
      {typing ? <Caret height={TERMINAL_FONT_SIZE * 1.2} solid={seconds > TYPING_WINDOW.start} /> : null}
    </div>
  );
};
