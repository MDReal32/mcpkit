import { interpolate } from "remotion";

/** The prefix of `text` typed by `seconds`, at an even pace from `start` to `end`. */
export const typedText = (text: string, seconds: number, start: number, end: number) => {
  const count = Math.round(
    interpolate(seconds, [start, end], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return text.slice(0, count);
};
