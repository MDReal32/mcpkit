import { AbsoluteFill } from "remotion";
import { Wordmark } from "../../components/wordmark";
import { useEntrance } from "../../motion/use-entrance";

/** The wordmark draws itself in the centre, then rises to make room for the headline. */
export const HookWordmark = () => {
  const appear = useEntrance(0.03);
  const draw = useEntrance(0.05, { damping: 200, stiffness: 70 });
  const lift = useEntrance(0.55);
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: appear,
        scale: 0.92 + appear * 0.08 - lift * 0.3,
        translate: `0px ${-lift * 290}px`,
        filter: `blur(${(1 - appear) * 12}px)`,
      }}
    >
      <Wordmark size={110} draw={draw} />
    </AbsoluteFill>
  );
};
