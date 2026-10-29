import { Easing } from "remotion";
import { progressBetween } from "../../motion/progress-between";
import { useSeconds } from "../../motion/use-seconds";
import { EXAMPLE_ROLL_SECONDS, EXAMPLE_SECONDS } from "./const";

interface ToolExampleRollProps {
  examples: readonly string[];
  startAt: number;
}

const LINE_HEIGHT = 22;

/** Rolls through a server's tool names, one every `EXAMPLE_SECONDS`, sized to the longest. */
export const ToolExampleRoll = ({ examples, startAt }: ToolExampleRollProps) => {
  const seconds = useSeconds();
  const elapsed = Math.max(0, seconds - startAt);
  const step = Math.min(examples.length - 1, Math.floor(elapsed / EXAMPLE_SECONDS));
  const atLast = step === examples.length - 1;
  const switchAt = startAt + (step + 1) * EXAMPLE_SECONDS - EXAMPLE_ROLL_SECONDS;
  const roll = atLast
    ? 0
    : progressBetween(seconds, switchAt, switchAt + EXAMPLE_ROLL_SECONDS, Easing.bezier(0.65, 0, 0.35, 1));
  const longest = examples.reduce((widest, example) => (example.length > widest.length ? example : widest), "");
  return (
    <span style={{ position: "relative", display: "inline-block", height: LINE_HEIGHT, overflow: "hidden" }}>
      <span style={{ visibility: "hidden" }}>{longest}</span>
      <span style={{ position: "absolute", left: 0, top: 0, translate: `0px ${-roll * LINE_HEIGHT}px` }}>
        {examples.slice(step, step + 2).map((example) => (
          <span key={example} style={{ display: "block", height: LINE_HEIGHT, lineHeight: `${LINE_HEIGHT}px` }}>
            {example}
          </span>
        ))}
      </span>
    </span>
  );
};
