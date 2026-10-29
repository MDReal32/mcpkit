import { AbsoluteFill } from "remotion";
import { useEntrance } from "../../motion/use-entrance";
import { ClosingLine } from "./closing-line";
import { CLOSING_LINES, LINES_LEAVE_AT } from "./const";

export const ClosingLines = () => {
  const leave = useEntrance(LINES_LEAVE_AT);
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: 1 - leave,
        translate: `0px ${-leave * 60}px`,
        filter: `blur(${leave * 16}px)`,
      }}
    >
      {CLOSING_LINES.map((line, index) => (
        <ClosingLine key={line} text={line} index={index} last={index === CLOSING_LINES.length - 1} />
      ))}
    </AbsoluteFill>
  );
};
