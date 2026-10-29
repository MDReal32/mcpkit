import { ARP_PATTERN, BEAT_SECONDS, CHORDS, SAMPLE_RATE } from "../const.ts";
import { addInto } from "../dsp/add-into.ts";
import { chordIndexAt } from "./chord-index-at.ts";
import type { MusicSections } from "./music-sections.ts";
import type { StereoMix } from "./stereo-mix.ts";
import { renderPluckNote } from "./voices/render-pluck-note.ts";

/** Sixteenth-note arpeggios over the chord, with a ping-pong echo, once every client is on screen. */
export const renderArp = (sections: MusicSections, mix: StereoMix) => {
  const step = BEAT_SECONDS / 4;
  const echo = Math.round(step * 3 * SAMPLE_RATE);
  let index = 0;
  for (let time = sections.arpFrom; time < sections.grooveUntil; time += step, index++) {
    const chord = CHORDS[chordIndexAt(time)] ?? [];
    const note = (chord[ARP_PATTERN[index % ARP_PATTERN.length] ?? 0] ?? 69) + 12;
    const pluck = renderPluckNote(note);
    const offset = Math.round(time * SAMPLE_RATE);
    addInto(mix.left, pluck, offset, 0.1);
    addInto(mix.right, pluck, offset, 0.1);
    addInto(mix.right, pluck, offset + echo, 0.03);
    addInto(mix.left, pluck, offset + echo * 2, 0.015);
    addInto(mix.reverbSend, pluck, offset, 0.05);
  }
};
