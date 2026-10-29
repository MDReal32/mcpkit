import { useEntrance } from "../../motion/use-entrance";
import { useSeconds } from "../../motion/use-seconds";
import { APP_COLORS, CHAT_TIMELINE } from "./const";

export const SendButton = () => {
  const seconds = useSeconds();
  const ready = useEntrance(CHAT_TIMELINE.typing.start + 0.1, { damping: 200, stiffness: 200 });
  const sent = seconds >= CHAT_TIMELINE.send;
  const press = sent && seconds < CHAT_TIMELINE.send + 0.2 ? 0.88 : 1;
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: sent ? APP_COLORS.border : APP_COLORS.clay,
        opacity: sent ? 0.6 : 0.35 + ready * 0.65,
        scale: press,
      }}
    >
      <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M 12 19 L 12 5 M 6 11 L 12 5 L 18 11"
          fill="none"
          stroke={APP_COLORS.bubble}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
