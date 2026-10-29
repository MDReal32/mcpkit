import type { CSSProperties } from "react";
import { COLORS } from "../const";
import { RiseIn } from "./rise-in";

interface WordsProps {
  text: string;
  delay: number;
  step?: number;
  accentWords?: readonly string[];
  style?: CSSProperties;
}

/** A line whose words rise in one after another. */
export const Words = ({ text, delay, step = 0.08, accentWords = [], style }: WordsProps) => (
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: "0.24em", ...style }}>
    {text.split(" ").map((word, index) => (
      <RiseIn
        key={word}
        delay={delay + index * step}
        distance={40}
        blur={14}
        style={{ color: accentWords.includes(word) ? COLORS.accent : undefined }}
      >
        {word}
      </RiseIn>
    ))}
  </div>
);
