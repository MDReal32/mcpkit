import { CTA_AT } from "../../../src/scenes/close/const";
import type { MusicSections } from "./music-sections";
import { onBeat } from "./on-beat";
import { planSceneTimeline } from "./plan-scene-timeline";

/** The music follows the story: bass with the install, drums with the first chat, arpeggios once every client joins. */
export const planSections = () => {
  const { starts, length } = planSceneTimeline();
  const sections: MusicSections = {
    length,
    bassFrom: onBeat(starts.install ?? 0),
    drumsFrom: onBeat(starts.assistant ?? 0),
    arpFrom: onBeat(starts.clients ?? 0),
    grooveUntil: onBeat(starts.close ?? length),
    resolveAt: (starts.close ?? length) + CTA_AT,
  };
  return sections;
};
