import { mkdir, rm, writeFile } from "node:fs/promises";
import { VOICE_LINES } from "../../src/voiceover/const.ts";
import { DEFAULT_VOICE_ID, OUTPUT_DIR } from "./const.ts";
import { cutLine } from "./cut-line.ts";
import { synthesizeTake } from "./synthesize-take.ts";

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  throw new Error("Set ELEVENLABS_API_KEY to generate the voiceover");
}
const voiceId = process.env.ELEVENLABS_VOICE_ID ?? DEFAULT_VOICE_ID;

const script = VOICE_LINES.map((line) => line.speech).join(" ");
const take = await synthesizeTake(script, voiceId, apiKey);
const takeFile = new URL("take.mp3", OUTPUT_DIR);
await mkdir(OUTPUT_DIR, { recursive: true });
await writeFile(takeFile, take.audio);

const { character_start_times_seconds: starts, character_end_times_seconds: ends } = take.alignment;
let offset = 0;
for (const line of VOICE_LINES) {
  const start = starts[offset];
  const end = ends[offset + line.speech.length - 1];
  if (start === undefined || end === undefined) {
    throw new Error(`The take has no timing for "${line.speech}"`);
  }
  cutLine(takeFile, new URL(`${line.scene}.mp3`, OUTPUT_DIR), start, end);
  process.stdout.write(`${line.scene}: ${(end - start).toFixed(2)}s ${line.text}\n`);
  offset += line.speech.length + 1;
}
await rm(takeFile);
