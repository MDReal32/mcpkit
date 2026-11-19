import { RESOLVE_BELLS, SAMPLE_RATE } from "../const";
import { addInto } from "../dsp/add-into";
import type { MusicSections } from "./music-sections";
import type { StereoMix } from "./stereo-mix";
import { renderBellNote } from "./voices/render-bell-note";

/** A rolled Am9 on bells as the call to action lands. */
export const renderBells = (sections: MusicSections, mix: StereoMix) => {
  RESOLVE_BELLS.forEach((note, index) => {
    const bell = renderBellNote(note, sections.length - sections.resolveAt);
    const offset = Math.round((sections.resolveAt + index * 0.07) * SAMPLE_RATE);
    addInto(mix.left, bell, offset, index % 2 === 0 ? 0.1 : 0.06);
    addInto(mix.right, bell, offset, index % 2 === 0 ? 0.06 : 0.1);
    addInto(mix.reverbSend, bell, offset, 0.12);
  });
};
