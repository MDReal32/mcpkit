import { MODEL_ID, VOICE_SETTINGS } from "./const.ts";
import type { Take } from "./take.ts";
import type { TimestampedSpeech } from "./timestamped-speech.ts";

/** The whole script read in one go, so the delivery flows; the reply times every character. */
export const synthesizeTake = async (text: string, voiceId: string, apiKey: string) => {
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps`, {
    method: "POST",
    headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings: VOICE_SETTINGS }),
  });
  if (!response.ok) {
    throw new Error(`ElevenLabs answered ${response.status}: ${await response.text()}`);
  }
  const speech = (await response.json()) as TimestampedSpeech;
  const take: Take = { audio: Buffer.from(speech.audio_base64, "base64"), alignment: speech.alignment };
  return take;
};
