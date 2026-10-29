import { REVERB, SAMPLE_RATE } from "../const.ts";

/** A Schroeder reverb: parallel damped combs into series all-passes; returns only the wet signal. */
export const applyReverb = (input: Float32Array, stretch = 1) => {
  const wet = new Float32Array(input.length);
  for (const delayMs of REVERB.combs) {
    const delay = Math.round(((delayMs * stretch) / 1000) * SAMPLE_RATE);
    const line = new Float32Array(delay);
    let damped = 0;
    for (let index = 0; index < input.length; index++) {
      const position = index % delay;
      const echoed = line[position] ?? 0;
      damped = echoed * (1 - REVERB.damping) + damped * REVERB.damping;
      line[position] = (input[index] ?? 0) + damped * REVERB.feedback;
      wet[index] = (wet[index] ?? 0) + echoed / REVERB.combs.length;
    }
  }
  for (const delayMs of REVERB.allpasses) {
    const delay = Math.round(((delayMs * stretch) / 1000) * SAMPLE_RATE);
    const line = new Float32Array(delay);
    for (let index = 0; index < wet.length; index++) {
      const position = index % delay;
      const delayed = line[position] ?? 0;
      const incoming = wet[index] ?? 0;
      const output = delayed - REVERB.allpassGain * incoming;
      line[position] = incoming + REVERB.allpassGain * output;
      wet[index] = output;
    }
  }
  return wet;
};
