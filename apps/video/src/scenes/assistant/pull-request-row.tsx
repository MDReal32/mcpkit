import { useEntrance } from "../../motion/use-entrance";
import { MONO, SANS } from "../../typography/fonts";
import { APP_COLORS } from "./const";
import type { PullRequestData } from "./pull-request-data";

interface PullRequestRowProps {
  pull: PullRequestData;
  delay: number;
}

export const PullRequestRow = ({ pull, delay }: PullRequestRowProps) => {
  const appear = useEntrance(delay);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        height: 48,
        fontFamily: SANS,
        fontSize: 20,
        color: APP_COLORS.text,
        opacity: appear,
        translate: `${(1 - appear) * -14}px 0px`,
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 4, background: APP_COLORS.clay }} />
      <span style={{ fontFamily: MONO, color: APP_COLORS.muted, width: 56 }}>#{pull.number}</span>
      <span>{pull.title}</span>
      <span style={{ marginLeft: "auto", color: APP_COLORS.faint, fontSize: 17 }}>
        {pull.author} · {pull.age}
      </span>
    </div>
  );
};
