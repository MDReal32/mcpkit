import { COLORS, LIVELY_SPRING } from "../../const";
import { useEntrance } from "../../motion/use-entrance";
import { useSeconds } from "../../motion/use-seconds";
import { MONO, SANS } from "../../typography/fonts";
import { TILE_STEP, TILE_WIDTH, TILES_AT } from "./const";
import type { ServerTileData } from "./server-tile-data";
import { tileCount } from "./tile-count";
import { ToolExampleRoll } from "./tool-example-roll";

interface ServerTileProps {
  tile: ServerTileData;
  index: number;
}

export const ServerTile = ({ tile, index }: ServerTileProps) => {
  const seconds = useSeconds();
  const appear = useEntrance(TILES_AT + index * TILE_STEP, LIVELY_SPRING);
  const settled = Math.min(1, appear);
  return (
    <div
      style={{
        width: TILE_WIDTH,
        height: 236,
        padding: "26px 28px",
        borderRadius: 18,
        border: `1px solid ${COLORS.border}`,
        background: `linear-gradient(180deg, ${COLORS.surfaceRaised}, ${COLORS.surface})`,
        boxShadow: "0 24px 70px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        opacity: settled,
        translate: `0px ${(1 - appear) * 70}px`,
        scale: 0.94 + appear * 0.06,
        filter: `blur(${(1 - settled) * 12}px)`,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 18,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: COLORS.faint,
          }}
        >
          {tile.category}
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 46,
            fontWeight: 600,
            letterSpacing: "-0.035em",
            color: COLORS.text,
            marginTop: 8,
          }}
        >
          {tile.name}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontFamily: MONO, fontSize: 26, color: COLORS.accent, fontVariantNumeric: "tabular-nums" }}>
          {tileCount(tile, index, seconds).toLocaleString("en-US")}
          <span style={{ color: COLORS.faint }}> tools</span>
        </div>
        <div
          style={{
            alignSelf: "flex-start",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontFamily: MONO,
            fontSize: 15,
            color: COLORS.muted,
            padding: "6px 10px",
            borderRadius: 8,
            background: "rgba(255, 255, 255, 0.04)",
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <ToolExampleRoll examples={tile.examples} startAt={TILES_AT + index * TILE_STEP + 0.6} />
        </div>
      </div>
    </div>
  );
};
