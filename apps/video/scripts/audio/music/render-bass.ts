import { BASS_ROOTS, BEAT_SECONDS, SAMPLE_RATE } from "../const";
import { addInto } from "../dsp/add-into";
import { chordIndexAt } from "./chord-index-at";
import type { MusicSections } from "./music-sections";
import type { StereoMix } from "./stereo-mix";
import { renderBassNote } from "./voices/render-bass-note";

/** Off-beat bass on the chord roots, from the install scene to the close. */
export const renderBass = (sections: MusicSections, mix: StereoMix) => {
  for (let time = sections.bassFrom + BEAT_SECONDS / 2; time < sections.grooveUntil; time += BEAT_SECONDS) {
    const note = renderBassNote(BASS_ROOTS[chordIndexAt(time)] ?? 45);
    const offset = Math.round(time * SAMPLE_RATE);
    addInto(mix.left, note, offset, 0.32);
    addInto(mix.right, note, offset, 0.32);
  }
};
