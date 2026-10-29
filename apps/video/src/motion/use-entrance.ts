import { type SpringConfig, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SMOOTH_SPRING } from "../const";

/** Spring progress from 0 to 1 that starts `delaySeconds` into the current sequence. */
export const useEntrance = (delaySeconds: number, config: Partial<SpringConfig> = SMOOTH_SPRING) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delaySeconds * fps, fps, config });
};
