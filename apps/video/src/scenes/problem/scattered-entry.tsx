import { useCurrentFrame, useVideoConfig } from "remotion";
import { useEntrance } from "../../motion/use-entrance";
import { ConfigEntry } from "./config-entry";
import { COLLAPSE_AT } from "./const";
import type { ScatteredEntryData } from "./scattered-entry-data";

interface ScatteredEntryProps {
  entry: ScatteredEntryData;
  index: number;
}

/** A per-server config that floats in its spot, then gets pulled into the centre. */
export const ScatteredEntry = ({ entry, index }: ScatteredEntryProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = useEntrance(0.05 + index * 0.05);
  const collapse = useEntrance(COLLAPSE_AT + (index % 3) * 0.03, { damping: 200, stiffness: 140 });
  const float = Math.sin(frame / fps + index * 1.3) * 8;
  const remaining = 1 - collapse;
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        translate: `calc(-50% + ${entry.x * remaining}px) calc(-50% + ${(entry.y + float) * remaining + (1 - appear) * 40}px)`,
        rotate: `${entry.rotate * remaining}deg`,
        scale: (0.94 + appear * 0.06) * (1 - collapse * 0.45),
        opacity: Math.min(appear, remaining * 1.6),
        filter: `blur(${(1 - appear) * 10 + collapse * 8}px)`,
      }}
    >
      <ConfigEntry entry={entry} fontSize={19} />
    </div>
  );
};
