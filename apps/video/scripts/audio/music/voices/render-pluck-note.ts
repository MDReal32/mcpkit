import { SAMPLE_RATE } from "../../const.ts";
import { midiToFrequency } from "../../dsp/midi-to-frequency.ts";

/** A soft mallet pluck for the arpeggio. */
export const renderPluckNote = (note: number) => {
  const output = new Float32Array(Math.round(0.35 * SAMPLE_RATE));
  const frequency = midiToFrequency(note);
  for (let index = 0; index < output.length; index++) {
    const time = index / SAMPLE_RATE;
    const envelope = Math.min(1, time / 0.002) * Math.exp(-time / 0.11);
    const phase = 2 * Math.PI * frequency * time;
    output[index] = (Math.sin(phase) + 0.15 * Math.sin(3 * phase)) * envelope;
  }
  return output;
};
