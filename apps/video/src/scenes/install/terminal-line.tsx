import type { ReactNode } from "react";
import { COLORS } from "../../const";
import { useEntrance } from "../../motion/use-entrance";
import { MONO } from "../../typography/fonts";
import { TERMINAL_FONT_SIZE } from "./const";

interface TerminalLineProps {
  delay: number;
  children: ReactNode;
}

export const TerminalLine = ({ delay, children }: TerminalLineProps) => {
  const appear = useEntrance(delay);
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: TERMINAL_FONT_SIZE,
        color: COLORS.muted,
        height: TERMINAL_FONT_SIZE * 1.9,
        display: "flex",
        alignItems: "center",
        opacity: appear,
      }}
    >
      {children}
    </div>
  );
};
