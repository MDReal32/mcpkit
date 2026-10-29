import { mkdir, writeFile } from "node:fs/promises";
import { OUTPUT_DIR, POP_STEPS } from "./const.ts";
import { encodeWav } from "./dsp/encode-wav.ts";
import { renderMusic } from "./music/render-music.ts";
import { renderPop } from "./sounds/render-pop.ts";

await mkdir(OUTPUT_DIR, { recursive: true });
await writeFile(new URL("music.wav", OUTPUT_DIR), encodeWav(renderMusic()));
await Promise.all(
  POP_STEPS.map((_, step) => writeFile(new URL(`pop-${step}.wav`, OUTPUT_DIR), encodeWav([renderPop(step)]))),
);
