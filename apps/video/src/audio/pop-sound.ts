import { POP_SOUNDS } from "./const";

/** The pop `step` notes up the scale, wrapping past the top. */
export const popSound = (step: number) => POP_SOUNDS[step % POP_SOUNDS.length] ?? "pop-0";
