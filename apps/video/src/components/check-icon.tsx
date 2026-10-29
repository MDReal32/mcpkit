import { COLORS } from "../const";

interface CheckIconProps {
  size: number;
  progress: number;
}

/** A check in a soft accent disc that draws itself as `progress` goes to 1. */
export const CheckIcon = ({ size, progress }: CheckIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle
      cx={12}
      cy={12}
      r={11}
      fill={COLORS.accentSoft}
      stroke={COLORS.accent}
      strokeOpacity={0.35 + progress * 0.45}
      strokeWidth={1.2}
    />
    <path
      d="M 7 12.4 L 10.4 15.6 L 17 8.8"
      pathLength={1}
      stroke={COLORS.accent}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={1}
      strokeDashoffset={1 - progress}
    />
  </svg>
);
