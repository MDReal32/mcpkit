import { SCENE_SECONDS, TRANSITION_SECONDS, VIDEO } from "../../../src/const.ts";
import type { SceneTimeline } from "./scene-timeline.ts";

/** Where each scene starts in the promo, frame-rounded the way the composition rounds them. */
export const planSceneTimeline = () => {
  const transition = Math.round(TRANSITION_SECONDS * VIDEO.fps);
  const starts: Record<string, number> = {};
  let frame = 0;
  for (const [scene, seconds] of Object.entries(SCENE_SECONDS)) {
    starts[scene] = frame / VIDEO.fps;
    frame += Math.round(seconds * VIDEO.fps) - transition;
  }
  const timeline: SceneTimeline = { starts, length: (frame + transition) / VIDEO.fps };
  return timeline;
};
