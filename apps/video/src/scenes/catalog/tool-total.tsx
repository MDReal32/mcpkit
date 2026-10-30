import { COLORS } from "../../const";
import { useSeconds } from "../../motion/use-seconds";
import { MONO, SANS } from "../../typography/fonts";
import { AlphaBadge } from "./alpha-badge";
import { SERVER_TILES } from "./const";
import { tileCount } from "./tile-count";

/** The running total of every tile's count, so the big number always agrees with the tiles. */
export const ToolTotal = () => {
  const seconds = useSeconds();
  const total = SERVER_TILES.reduce((sum, tile, index) => sum + tileCount(tile, index, seconds), 0);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 132,
          fontWeight: 600,
          letterSpacing: "-0.05em",
          lineHeight: 1,
          color: COLORS.text,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {total.toLocaleString("en-US")}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 24, color: COLORS.muted, marginTop: 10 }}>
        tools across {SERVER_TILES.length} servers
      </div>
      <AlphaBadge />
    </div>
  );
};
