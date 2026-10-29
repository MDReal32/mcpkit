import { POP_ROOT, POP_STEPS, SAMPLE_RATE } from "../const.ts";
import { midiToFrequency } from "../dsp/midi-to-frequency.ts";
import { normalize } from "../dsp/normalize.ts";

/** A rounded blip for an item landing; `step` climbs a pentatonic scale. */
export const renderPop = (step: number) => {
  const output = new Float32Array(Math.round(0.4 * SAMPLE_RATE));
  const frequency = midiToFrequency(POP_ROOT + (POP_STEPS[step] ?? 0));
  let phase = 0;
  for (let index = 0; index < output.length; index++) {
    const time = index / SAMPLE_RATE;
    const glide = 0.82 + 0.18 * Math.min(1, time / 0.015);
    phase += (2 * Math.PI * frequency * glide) / SAMPLE_RATE;
    const envelope = Math.min(1, time / 0.003) * Math.exp(-time / 0.09);
    output[index] = (Math.sin(phase) + 0.18 * Math.sin(2 * phase)) * envelope;
  }
  return normalize([output], 0.75)[0] ?? output;
};
