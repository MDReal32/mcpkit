import { useCurrentFrame, useVideoConfig } from "remotion";

export const useSeconds = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};
