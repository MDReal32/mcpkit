import { Easing } from "remotion";
import { CheckIcon } from "../../components/check-icon";
import { progressBetween } from "../../motion/progress-between";
import { useSeconds } from "../../motion/use-seconds";
import { EXAMPLE_ROLL_SECONDS, EXAMPLE_SECONDS } from "./const";

interface ToolExampleRollProps {
  examples: readonly string[];
  startAt: number;
}

const LINE_HEIGHT = 22;

const CHECK_SIZE = 15;

/**
 * Keeps rolling through a server's tool names until the scene ends: each one rolls up into view, gets its check, and
 * gives way to the next. Sized to the longest name so the chip never jumps.
 */
export const ToolExampleRoll = ({ examples, startAt }: ToolExampleRollProps) => {
  const seconds = useSeconds();
  const elapsed = Math.max(0, seconds - startAt);
  const step = Math.floor(elapsed / EXAMPLE_SECONDS);
  const local = elapsed - step * EXAMPLE_SECONDS;
  const roll = progressBetween(local, 0, EXAMPLE_ROLL_SECONDS, Easing.bezier(0.65, 0, 0.35, 1));
  const check = progressBetween(local, EXAMPLE_ROLL_SECONDS + 0.04, EXAMPLE_ROLL_SECONDS + 0.26);
  const lines = [
    { step: step - 1, name: step > 0 ? examples[(step - 1) % examples.length] : "", checked: 1 },
    { step, name: examples[step % examples.length], checked: check },
  ];
  const longest = examples.reduce((widest, example) => (example.length > widest.length ? example : widest), "");
  return (
    <span style={{ position: "relative", display: "inline-flex", height: LINE_HEIGHT, overflow: "hidden" }}>
      <span style={{ visibility: "hidden", paddingRight: CHECK_SIZE + 8 }}>{longest}</span>
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          translate: `0px ${(1 - roll) * LINE_HEIGHT - LINE_HEIGHT}px`,
          opacity: seconds < startAt ? 0 : 1,
        }}
      >
        {lines.map((line) => (
          <span
            key={line.step}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: LINE_HEIGHT }}
          >
            <span>{line.name}</span>
            {line.name ? <CheckIcon size={CHECK_SIZE} progress={line.checked} /> : null}
          </span>
        ))}
      </span>
    </span>
  );
};
