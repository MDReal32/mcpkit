export const midiToFrequency = (note: number) => 440 * 2 ** ((note - 69) / 12);
