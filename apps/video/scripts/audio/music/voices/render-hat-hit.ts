import { SAMPLE_RATE } from "../../const.ts";
import { createFilter } from "../../dsp/create-filter.ts";
import { createRandom } from "../../dsp/create-random.ts";

/** A short closed hat: high-passed noise with a fast decay. */
export const renderHatHit = (seed: number) => {
  const output = new Float32Array(Math.round(0.08 * SAMPLE_RATE));
  const random = createRandom(seed);
  const filter = createFilter();
  for (let index = 0; index < output.length; index++) {
    const time = index / SAMPLE_RATE;
    const { high } = filter(random() * 2 - 1, 7000);
    output[index] = high * Math.exp(-time / 0.02);
  }
  return output;
};
