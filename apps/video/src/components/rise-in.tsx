import type { CSSProperties, ReactNode } from "react";
import type { SpringConfig } from "remotion";
import { useEntrance } from "../motion/use-entrance";

interface RiseInProps {
  delay: number;
  distance?: number;
  blur?: number;
  spring?: Partial<SpringConfig>;
  style?: CSSProperties;
  children: ReactNode;
}

export const RiseIn = ({ delay, distance = 28, blur = 10, spring, style, children }: RiseInProps) => {
  const progress = useEntrance(delay, spring);
  return (
    <div
      style={{
        ...style,
        opacity: Math.min(1, progress * 1.4),
        translate: `0px ${(1 - progress) * distance}px`,
        filter: `blur(${(1 - Math.min(1, progress)) * blur}px)`,
      }}
    >
      {children}
    </div>
  );
};
