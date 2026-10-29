export const SAMPLE_RATE = 48000;

export const OUTPUT_DIR = new URL("../../public/audio/", import.meta.url);

export const BEAT_SECONDS = 0.5;

export const BAR_SECONDS = BEAT_SECONDS * 4;

/** One chord per bar, as MIDI notes: Am9, Fmaj7, C, G6. */
export const CHORDS: readonly (readonly number[])[] = [
  [57, 60, 64, 67, 71],
  [53, 57, 60, 64, 69],
  [55, 60, 64, 67, 72],
  [55, 59, 62, 64, 71],
];

export const BASS_ROOTS: readonly number[] = [45, 41, 48, 43];

export const ARP_PATTERN: readonly number[] = [0, 2, 4, 3, 1, 3, 2, 4];

/** Schroeder reverb: comb delays in milliseconds and their feedback, then all-pass delays. */
export const REVERB = {
  combs: [47.5, 59.3, 65.8, 69.9],
  feedback: 0.86,
  damping: 0.25,
  allpasses: [5.0, 1.7],
  allpassGain: 0.7,
  stereoSpread: 0.6,
} as const;

/** Cents each pad saw is detuned by, left channel then right. */
export const DETUNE_CENTS: readonly (readonly number[])[] = [
  [-7, 3],
  [-3, 7],
];

/** The Am9 rolled on bells when the call to action lands. */
export const RESOLVE_BELLS: readonly number[] = [69, 76, 83, 84];

/** Semitones above E5 for the rising item pops. */
export const POP_STEPS: readonly number[] = [0, 2, 4, 7, 9, 12, 14];

export const POP_ROOT = 76;
