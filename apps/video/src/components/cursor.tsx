import { COLORS, CURSOR_TRAVEL_SECONDS } from "../const";
import { progressBetween } from "../motion/progress-between";
import { useSeconds } from "../motion/use-seconds";
import type { CursorStop } from "./cursor-stop";

interface CursorProps {
  stops: readonly CursorStop[];
}

const CLICK_SECONDS = 0.45;

/** A pointer that glides to each stop, arriving at its `at`, and clicks where asked. */
export const Cursor = ({ stops }: CursorProps) => {
  const seconds = useSeconds();
  const first = stops[0];
  if (!first) {
    return null;
  }
  let x = first.x;
  let y = first.y;
  for (const stop of stops.slice(1)) {
    const travel = progressBetween(seconds, stop.at - CURSOR_TRAVEL_SECONDS, stop.at);
    x += (stop.x - x) * travel;
    y += (stop.y - y) * travel;
  }
  const click = stops.find((stop) => stop.click && seconds >= stop.at && seconds < stop.at + CLICK_SECONDS);
  const clickProgress = click ? (seconds - click.at) / CLICK_SECONDS : 1;
  const pressed = click ? Math.sin(Math.min(1, clickProgress * 3) * Math.PI) : 0;
  return (
    <div style={{ position: "absolute", left: x - 5, top: y - 3, zIndex: 10, pointerEvents: "none" }}>
      {click ? (
        <div
          style={{
            position: "absolute",
            left: -28,
            top: -28,
            width: 56,
            height: 56,
            borderRadius: 28,
            border: `2px solid ${COLORS.accent}`,
            opacity: 1 - clickProgress,
            scale: 0.3 + clickProgress * 0.9,
          }}
        />
      ) : null}
      <svg
        width={30}
        height={30}
        viewBox="0 0 24 24"
        style={{ scale: 1 - pressed * 0.15, filter: "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5))" }}
        aria-hidden="true"
      >
        <path
          d="M 4 2.5 L 4 19.5 L 8.6 15.2 L 11.6 21.6 L 14.4 20.4 L 11.4 14.1 L 17.6 14.1 Z"
          fill={COLORS.text}
          stroke={COLORS.background}
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
