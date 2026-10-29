import type { ConfigEntryData } from "./config-entry-data";

export interface ScatteredEntryData extends ConfigEntryData {
  x: number;
  y: number;
  rotate: number;
}
