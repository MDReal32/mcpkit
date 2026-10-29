import { SCENE_SECONDS, TRANSITION_SECONDS } from "./const";

/** Every scene back to back, minus the overlap of each transition between two of them. */
export const promoFrames = (fps: number) => {
  const scenes = Object.values(SCENE_SECONDS);
  const sceneFrames = scenes.reduce((sum, seconds) => sum + Math.round(seconds * fps), 0);
  return sceneFrames - (scenes.length - 1) * Math.round(TRANSITION_SECONDS * fps);
};
