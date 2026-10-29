import { DETUNE_CENTS, SAMPLE_RATE } from "../const.ts";
import { midiToFrequency } from "../dsp/midi-to-frequency.ts";

/** Adds a chord as detuned saws into `left`/`right` from `start` to `end` seconds, with soft edges. */
export const addChord = (
  raw: readonly Float32Array[],
  notes: readonly number[],
  start: number,
  end: number,
  attack: number,
) => {
  const release = 0.8;
  const first = Math.max(0, Math.round(start * SAMPLE_RATE));
  const last = Math.min(raw[0]?.length ?? 0, Math.round((end + release) * SAMPLE_RATE));
  raw.forEach((channel, side) => {
    for (const note of notes) {
      for (const cents of DETUNE_CENTS[side] ?? []) {
        const frequency = midiToFrequency(note) * 2 ** (cents / 1200);
        let phase = (note * 0.137 + side * 0.31) % 1;
        for (let index = first; index < last; index++) {
          const time = index / SAMPLE_RATE;
          const rise = Math.min(1, (time - start) / attack);
          const fall = time > end ? Math.max(0, 1 - (time - end) / release) : 1;
          phase = (phase + frequency / SAMPLE_RATE) % 1;
          channel[index] = (channel[index] ?? 0) + (2 * phase - 1) * rise * fall * 0.03;
        }
      }
    }
  });
};
