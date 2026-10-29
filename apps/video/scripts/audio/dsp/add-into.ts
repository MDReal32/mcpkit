/** Mixes `source` into `target` starting at `offset` samples, scaled by `gain`. */
export const addInto = (target: Float32Array, source: Float32Array, offset: number, gain = 1) => {
  for (let index = 0; index < source.length; index++) {
    const position = offset + index;
    if (position >= 0 && position < target.length) {
      target[position] = (target[position] ?? 0) + (source[index] ?? 0) * gain;
    }
  }
};
