import { useEntrance } from "../../motion/use-entrance";
import { SANS } from "../../typography/fonts";
import { APP_COLORS, CHAT_TIMELINE, PROMPT } from "./const";

export const UserMessage = () => {
  const appear = useEntrance(CHAT_TIMELINE.send + 0.1);
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div
        style={{
          maxWidth: 640,
          padding: "14px 20px",
          borderRadius: 16,
          background: APP_COLORS.bubble,
          fontFamily: SANS,
          fontSize: 21,
          lineHeight: 1.4,
          color: APP_COLORS.text,
          opacity: appear,
          translate: `0px ${(1 - appear) * 40}px`,
        }}
      >
        {PROMPT}
      </div>
    </div>
  );
};
