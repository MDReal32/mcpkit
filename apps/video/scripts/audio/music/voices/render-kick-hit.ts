import { SAMPLE_RATE } from "../../const.ts";

/** A soft kick: a sine dropping from about 150 Hz to 42 Hz. */
export const renderKickHit = () => {
  const output = new Float32Array(Math.round(0.4 * SAMPLE_RATE));
  let phase = 0;
  for (let index = 0; index < output.length; index++) {
    const time = index / SAMPLE_RATE;
    phase += (2 * Math.PI * (42 + 110 * Math.exp(-time / 0.035))) / SAMPLE_RATE;
    output[index] = Math.sin(phase) * Math.exp(-time / 0.16);
  }
  return output;
};
