import { SAMPLE_RATE } from "../../const.ts";
import { midiToFrequency } from "../../dsp/midi-to-frequency.ts";

/** A bell with one inharmonic partial and a long tail. */
export const renderBellNote = (note: number, seconds: number) => {
  const output = new Float32Array(Math.round(seconds * SAMPLE_RATE));
  const frequency = midiToFrequency(note);
  for (let index = 0; index < output.length; index++) {
    const time = index / SAMPLE_RATE;
    const envelope = Math.min(1, time / 0.003) * Math.exp(-time / 1.3);
    output[index] =
      (Math.sin(2 * Math.PI * frequency * time) + 0.2 * Math.sin(2 * Math.PI * frequency * 2.76 * time)) * envelope;
  }
  return output;
};
