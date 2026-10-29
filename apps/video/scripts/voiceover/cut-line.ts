import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { CUT_PADDING } from "./const.ts";

/** Copies `start`..`end` seconds of the take into its own MP3 with ffmpeg. */
export const cutLine = (take: URL, output: URL, start: number, end: number) => {
  execFileSync("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    "-i",
    fileURLToPath(take),
    "-ss",
    Math.max(0, start - CUT_PADDING.before).toFixed(3),
    "-to",
    (end + CUT_PADDING.after).toFixed(3),
    "-af",
    "afade=t=out:st=0:d=0.01,areverse,afade=t=in:d=0.06,areverse",
    "-b:a",
    "192k",
    fileURLToPath(output),
  ]);
};
