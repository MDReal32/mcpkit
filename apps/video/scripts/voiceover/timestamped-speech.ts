import type { TakeAlignment } from "./take-alignment.ts";

/** The body of ElevenLabs' `with-timestamps` reply. */
export interface TimestampedSpeech {
  audio_base64: string;
  alignment: TakeAlignment;
}
