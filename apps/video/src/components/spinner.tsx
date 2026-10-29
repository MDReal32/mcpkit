import { useCurrentFrame, useVideoConfig } from "remotion";

interface SpinnerProps {
  size: number;
  color: string;
}

export const Spinner = ({ size, color }: SpinnerProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ rotate: `${(frame / fps) * 360 * 1.4}deg` }}
      aria-hidden="true"
    >
      <circle cx={12} cy={12} r={9} fill="none" stroke={color} strokeOpacity={0.25} strokeWidth={2.5} />
      <path d="M 12 3 A 9 9 0 0 1 21 12" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    </svg>
  );
};
