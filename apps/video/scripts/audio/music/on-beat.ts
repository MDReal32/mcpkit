import { BEAT_SECONDS } from "../const";

export const onBeat = (seconds: number) => Math.round(seconds / BEAT_SECONDS) * BEAT_SECONDS;
