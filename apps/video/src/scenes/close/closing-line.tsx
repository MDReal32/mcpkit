import { COLORS } from "../../const";
import { useEntrance } from "../../motion/use-entrance";
import { SANS } from "../../typography/fonts";
import { LINE_STEP } from "./const";

interface ClosingLineProps {
  text: string;
  index: number;
  last: boolean;
}

/** Each line arrives bright and dims once the next one takes over. */
export const ClosingLine = ({ text, index, last }: ClosingLineProps) => {
  const appear = useEntrance(0.08 + index * LINE_STEP);
  const next = useEntrance(0.08 + (index + 1) * LINE_STEP);
  const dim = last ? 0 : next;
  return (
    <div
      style={{
        fontFamily: SANS,
        fontSize: 104,
        fontWeight: 600,
        letterSpacing: "-0.05em",
        lineHeight: 1.12,
        color: COLORS.text,
        opacity: Math.min(1, appear * 1.3) * (1 - dim * 0.62),
        translate: `0px ${(1 - appear) * 40}px`,
        filter: `blur(${(1 - Math.min(1, appear)) * 14}px)`,
      }}
    >
      {text}
    </div>
  );
};
