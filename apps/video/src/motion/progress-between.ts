import { Easing, interpolate } from "remotion";

/** Eased 0..1 progress of `seconds` through the window from `start` to `end`. */
export const progressBetween = (seconds: number, start: number, end: number, easing = Easing.bezier(0.16, 1, 0.3, 1)) =>
  interpolate(seconds, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
