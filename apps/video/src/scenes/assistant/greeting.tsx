import { useEntrance } from "../../motion/use-entrance";
import { SANS } from "../../typography/fonts";
import { APP_COLORS, APP_WINDOW, CHAT_TIMELINE, COLUMN_LEFT, COMPOSER } from "./const";

export const Greeting = () => {
  const appear = useEntrance(0.1);
  const leave = useEntrance(CHAT_TIMELINE.send);
  return (
    <div
      style={{
        position: "absolute",
        left: COLUMN_LEFT,
        width: APP_WINDOW.column,
        top: COMPOSER.centeredTop - 110,
        textAlign: "center",
        fontFamily: SANS,
        fontSize: 44,
        fontWeight: 500,
        letterSpacing: "-0.03em",
        color: APP_COLORS.text,
        opacity: appear * (1 - leave),
        translate: `0px ${(1 - appear) * 16 - leave * 30}px`,
      }}
    >
      Good afternoon
    </div>
  );
};
