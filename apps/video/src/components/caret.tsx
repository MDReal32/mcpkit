import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../const";

interface CaretProps {
  height: number;
  solid?: boolean;
}

/** A text caret that blinks twice a second unless it is `solid` (while typing). */
export const Caret = ({ height, solid = false }: CaretProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const visible = solid || Math.floor((frame / fps) * 2) % 2 === 0;
  return (
    <span
      style={{
        display: "inline-block",
        width: Math.max(3, height * 0.08),
        height,
        marginLeft: 4,
        verticalAlign: "middle",
        background: COLORS.accent,
        opacity: visible ? 1 : 0,
      }}
    />
  );
};
