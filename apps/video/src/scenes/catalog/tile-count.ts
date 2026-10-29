import { Easing } from "remotion";
import { progressBetween } from "../../motion/progress-between";
import { COUNT_SECONDS, TILE_STEP, TILES_AT } from "./const";
import type { ServerTileData } from "./server-tile-data";

/** How far a tile's tool count has ticked at `seconds`; the scene total sums the same values. */
export const tileCount = (tile: ServerTileData, index: number, seconds: number) => {
  const start = TILES_AT + index * TILE_STEP + 0.25;
  return Math.round(
    tile.tools * progressBetween(seconds, start, start + COUNT_SECONDS, Easing.bezier(0.33, 1, 0.68, 1)),
  );
};
