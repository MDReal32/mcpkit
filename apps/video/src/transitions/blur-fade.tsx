import type { TransitionPresentationComponentProps } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";

/** Crossfade where the outgoing scene drifts forward and blurs and the incoming one settles into focus. */
export const BlurFade = ({
  children,
  presentationDirection,
  presentationProgress,
}: TransitionPresentationComponentProps<Record<string, never>>) => {
  const entering = presentationDirection === "entering";
  const visibility = entering ? presentationProgress : 1 - presentationProgress;
  return (
    <AbsoluteFill
      style={{
        opacity: visibility,
        scale: entering ? 0.985 + presentationProgress * 0.015 : 1 + presentationProgress * 0.025,
        filter: `blur(${(1 - visibility) * 14}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
