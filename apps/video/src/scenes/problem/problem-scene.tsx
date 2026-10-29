import { AbsoluteFill } from "remotion";
import { useEntrance } from "../../motion/use-entrance";
import { ConfigEntry } from "./config-entry";
import { MCPKIT_ENTRY, MERGED_AT, SCATTERED_ENTRIES } from "./const";
import { ProblemTitle } from "./problem-title";
import { ScatteredEntry } from "./scattered-entry";

export const ProblemScene = () => {
  const merged = useEntrance(MERGED_AT, { damping: 16, stiffness: 120, mass: 0.8 });
  return (
    <AbsoluteFill>
      <ProblemTitle />
      <AbsoluteFill style={{ top: 70 }}>
        {SCATTERED_ENTRIES.map((entry, index) => (
          <ScatteredEntry key={entry.name} entry={entry} index={index} />
        ))}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            translate: "-50% -50%",
            opacity: Math.min(1, merged * 1.5),
            scale: 0.7 + merged * 0.3,
            filter: `blur(${Math.max(0, 1 - merged) * 12}px)`,
          }}
        >
          <ConfigEntry entry={MCPKIT_ENTRY} fontSize={32} highlighted />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
