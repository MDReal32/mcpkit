import type { SoundName } from "./sound-name";

/**
 * Where each sound lives under `public/`: the interface sounds are CC0 by Kenney (kenney.nl), the pops are
 * written by `scripts/audio`.
 */
export const SOUND_FILES: Record<SoundName, string> = {
  click: "sfx/click.ogg",
  check: "sfx/check.ogg",
  merge: "sfx/merge.ogg",
  success: "sfx/success.ogg",
  land: "sfx/land.ogg",
  "pop-0": "audio/pop-0.wav",
  "pop-1": "audio/pop-1.wav",
  "pop-2": "audio/pop-2.wav",
  "pop-3": "audio/pop-3.wav",
  "pop-4": "audio/pop-4.wav",
  "pop-5": "audio/pop-5.wav",
  "pop-6": "audio/pop-6.wav",
};

export const POP_SOUNDS: readonly SoundName[] = ["pop-0", "pop-1", "pop-2", "pop-3", "pop-4", "pop-5", "pop-6"];
