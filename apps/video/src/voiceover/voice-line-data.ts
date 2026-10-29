import type { SCENE_SECONDS } from "../const";

export interface VoiceLineData {
  scene: keyof typeof SCENE_SECONDS;
  at: number;
  text: string;
  speech: string;
}
