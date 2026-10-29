import { BEAT_SECONDS, SAMPLE_RATE } from "../const.ts";
import { addInto } from "../dsp/add-into.ts";
import type { MusicSections } from "./music-sections.ts";
import type { StereoMix } from "./stereo-mix.ts";
import { renderHatHit } from "./voices/render-hat-hit.ts";
import { renderKickHit } from "./voices/render-kick-hit.ts";

/** Four-on-the-floor soft kick with off-beat hats and quieter sixteenth ghosts, from the first chat to the close. */
export const renderDrums = (sections: MusicSections, mix: StereoMix) => {
  const kick = renderKickHit();
  const step = BEAT_SECONDS / 4;
  let index = 0;
  for (let time = sections.drumsFrom; time < sections.grooveUntil; time += step, index++) {
    const offset = Math.round(time * SAMPLE_RATE);
    const position = index % 4;
    if (position === 0) {
      addInto(mix.left, kick, offset, 0.3);
      addInto(mix.right, kick, offset, 0.3);
      continue;
    }
    const hat = renderHatHit(500 + index);
    const accent = position === 2 ? 0.09 : 0.03;
    addInto(mix.left, hat, offset, accent * (position === 2 ? 0.8 : 1.2));
    addInto(mix.right, hat, offset, accent * (position === 2 ? 1.2 : 0.8));
  }
};
