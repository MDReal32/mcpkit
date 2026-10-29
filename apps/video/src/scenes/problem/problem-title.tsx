import { AbsoluteFill } from "remotion";
import { COLORS } from "../../const";
import { useEntrance } from "../../motion/use-entrance";
import { SANS } from "../../typography/fonts";
import { COLLAPSE_AT, MERGED_AT } from "./const";

/** "Seven of everything" gives way to "One entry." as the configs merge. */
export const ProblemTitle = () => {
  const before = useEntrance(0.03);
  const leave = useEntrance(COLLAPSE_AT);
  const after = useEntrance(MERGED_AT + 0.1);
  const style = {
    position: "absolute",
    top: 110,
    width: "100%",
    textAlign: "center",
    fontFamily: SANS,
    fontSize: 72,
    fontWeight: 600,
    letterSpacing: "-0.04em",
  } as const;
  return (
    <AbsoluteFill>
      <div
        style={{
          ...style,
          color: COLORS.text,
          opacity: before * (1 - leave),
          translate: `0px ${(1 - before) * 24 - leave * 24}px`,
          filter: `blur(${(1 - before) * 10 + leave * 10}px)`,
        }}
      >
        Seven servers. <span style={{ color: COLORS.muted }}>Seven configs. Seven tokens.</span>
      </div>
      <div
        style={{
          ...style,
          color: COLORS.text,
          opacity: after,
          translate: `0px ${(1 - after) * 24}px`,
          filter: `blur(${(1 - after) * 10}px)`,
        }}
      >
        One entry. <span style={{ color: COLORS.muted }}>Every server.</span>
      </div>
    </AbsoluteFill>
  );
};
