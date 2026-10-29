import { BAR_SECONDS, BEAT_SECONDS, CHORDS, SAMPLE_RATE } from "../const.ts";
import { createFilter } from "../dsp/create-filter.ts";
import { addChord } from "./add-chord.ts";
import type { MusicSections } from "./music-sections.ts";
import type { StereoMix } from "./stereo-mix.ts";

/** Warm filtered pads through the whole piece, ducking under the kick, resolving on Am9 at the end. */
export const renderPad = (sections: MusicSections, mix: StereoMix) => {
  const raw = [new Float32Array(mix.left.length), new Float32Array(mix.right.length)];
  for (let bar = 0; bar * BAR_SECONDS < sections.resolveAt; bar++) {
    const start = bar * BAR_SECONDS;
    const end = Math.min(start + BAR_SECONDS, sections.resolveAt);
    addChord(raw, CHORDS[bar % CHORDS.length] ?? [], start, end, 0.35);
  }
  const resolve = [...(CHORDS[0] ?? []), 45];
  addChord(raw, resolve, sections.resolveAt, sections.length, 0.5);
  raw.forEach((channel, side) => {
    const filter = createFilter();
    const target = side === 0 ? mix.left : mix.right;
    for (let index = 0; index < channel.length; index++) {
      const time = index / SAMPLE_RATE;
      const cutoff = 900 + 500 * Math.sin((2 * Math.PI * time) / 8 + side) + (time > sections.resolveAt ? 900 : 0);
      const { low } = filter(channel[index] ?? 0, cutoff, 0.2);
      const fadeIn = Math.min(1, time / 1.6);
      const drumsOn = time >= sections.drumsFrom && time < sections.grooveUntil;
      const sinceBeat = (time - sections.drumsFrom) % BEAT_SECONDS;
      const duck = drumsOn ? 1 - 0.4 * Math.exp(-sinceBeat / 0.15) : 1;
      const sample = low * fadeIn * duck;
      target[index] = (target[index] ?? 0) + sample;
      mix.reverbSend[index] = (mix.reverbSend[index] ?? 0) + sample * 0.25;
    }
  });
};
