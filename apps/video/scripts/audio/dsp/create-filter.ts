import { SAMPLE_RATE } from "../const.ts";
import type { FilterOutput } from "./filter-output.ts";

/** A state-variable filter (topology-preserving) that gives low, band and high pass at once. */
export const createFilter = () => {
  let first = 0;
  let second = 0;
  return (input: number, cutoff: number, resonance = 0) => {
    const g = Math.tan((Math.PI * Math.min(cutoff, SAMPLE_RATE * 0.45)) / SAMPLE_RATE);
    const k = 2 - 2 * resonance;
    const a1 = 1 / (1 + g * (g + k));
    const a2 = g * a1;
    const a3 = g * a2;
    const v3 = input - second;
    const v1 = a1 * first + a2 * v3;
    const v2 = second + a2 * first + a3 * v3;
    first = 2 * v1 - first;
    second = 2 * v2 - second;
    const output: FilterOutput = { low: v2, band: v1, high: input - k * v1 - v2 };
    return output;
  };
};
