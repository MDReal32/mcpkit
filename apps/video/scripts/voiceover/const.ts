export const OUTPUT_DIR = new URL("../../public/voiceover/", import.meta.url);

/** A premade ElevenLabs voice; set ELEVENLABS_VOICE_ID to use another, such as a clone of your own. */
export const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";

export const MODEL_ID = "eleven_v4";

export const VOICE_SETTINGS = {
  stability: 0.5,
  similarity_boost: 0.8,
} as const;

/** Seconds kept before and after each line when it is cut out of the take. */
export const CUT_PADDING = { before: 0.04, after: 0.15 } as const;
