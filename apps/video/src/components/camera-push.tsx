import type { ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CAMERA_PUSH } from "../const";

interface CameraPushProps {
  seconds: number;
  children: ReactNode;
}

/** A slow, constant push-in across the whole scene. */
export const CameraPush = ({ seconds, children }: CameraPushProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ scale: interpolate(frame, [0, seconds * fps], [1, 1 + CAMERA_PUSH]) }}>
      {children}
    </AbsoluteFill>
  );
};
