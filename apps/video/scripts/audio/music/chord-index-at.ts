import { BAR_SECONDS, CHORDS } from "../const.ts";

export const chordIndexAt = (seconds: number) => Math.floor(seconds / BAR_SECONDS) % CHORDS.length;
