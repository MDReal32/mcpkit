import { AbsoluteFill } from "remotion";
import { RiseIn } from "../../components/rise-in";
import { COLORS, SAFE_X } from "../../const";
import { MONO, SANS } from "../../typography/fonts";
import { SERVER_TILES, TILE_GAP, TILE_ROWS } from "./const";
import { ServerTile } from "./server-tile";
import { ToolTotal } from "./tool-total";

export const CatalogScene = () => (
  <AbsoluteFill style={{ padding: `110px ${SAFE_X}px 0`, gap: 64 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <RiseIn delay={0.05}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 24,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: COLORS.accent,
            }}
          >
            Catalog
          </div>
        </RiseIn>
        <RiseIn delay={0.12}>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: "-0.045em",
              lineHeight: 1,
              color: COLORS.text,
            }}
          >
            Thousands of tools.
          </div>
        </RiseIn>
        <RiseIn delay={0.2}>
          <div style={{ fontFamily: SANS, fontSize: 34, color: COLORS.muted }}>
            Each one its own MCP tool, loaded only when its group is opened.
          </div>
        </RiseIn>
      </div>
      <RiseIn delay={0.3}>
        <ToolTotal />
      </RiseIn>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: TILE_GAP, alignItems: "center" }}>
      {TILE_ROWS.map((row) => (
        <div key={row.join("-")} style={{ display: "flex", gap: TILE_GAP }}>
          {row.map((index) => {
            const tile = SERVER_TILES[index];
            return tile ? <ServerTile key={tile.name} tile={tile} index={index} /> : null;
          })}
        </div>
      ))}
    </div>
  </AbsoluteFill>
);
