import type { CSSProperties } from "react";
import { typedText } from "../../motion/typed-text";
import { useSeconds } from "../../motion/use-seconds";

interface StreamedTextProps {
  text: string;
  start: number;
  end: number;
  style?: CSSProperties;
}

/** Text that streams in like a model reply; the full line keeps its space from the start. */
export const StreamedText = ({ text, start, end, style }: StreamedTextProps) => {
  const seconds = useSeconds();
  const shown = typedText(text, seconds, start, end);
  return (
    <div style={{ position: "relative", ...style }}>
      <span style={{ visibility: "hidden" }}>{text}</span>
      <span style={{ position: "absolute", left: 0, top: 0 }}>{shown}</span>
    </div>
  );
};
