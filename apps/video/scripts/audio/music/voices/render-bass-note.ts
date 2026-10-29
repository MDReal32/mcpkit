import { SAMPLE_RATE } from "../../const.ts";
import { midiToFrequency } from "../../dsp/midi-to-frequency.ts";

/** A round sine bass pluck. */
export const renderBassNote = (note: number) => {
  const output = new Float32Array(Math.round(0.4 * SAMPLE_RATE));
  const frequency = midiToFrequency(note);
  for (let index = 0; index < output.length; index++) {
    const time = index / SAMPLE_RATE;
    const envelope = Math.min(1, time / 0.004) * Math.exp(-time / 0.18);
    output[index] =
      (Math.sin(2 * Math.PI * frequency * time) + 0.25 * Math.sin(4 * Math.PI * frequency * time)) * envelope;
  }
  return output;
};
