import { mkdir, writeFile } from "node:fs/promises";
import { OUTPUT_DIR, POP_STEPS } from "./const";
import { encodeWav } from "./dsp/encode-wav";
import { renderMusic } from "./music/render-music";
import { renderPop } from "./sounds/render-pop";

await mkdir(OUTPUT_DIR, { recursive: true });
await writeFile(new URL("music.wav", OUTPUT_DIR), encodeWav(renderMusic()));
await Promise.all(
  POP_STEPS.map((_, step) => writeFile(new URL(`pop-${step}.wav`, OUTPUT_DIR), encodeWav([renderPop(step)]))),
);
