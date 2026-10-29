import { BEAT_SECONDS } from "../const.ts";

export const onBeat = (seconds: number) => Math.round(seconds / BEAT_SECONDS) * BEAT_SECONDS;
