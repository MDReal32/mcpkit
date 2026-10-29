import { Spinner } from "../../components/spinner";
import { COLORS } from "../../const";
import { useEntrance } from "../../motion/use-entrance";
import { useSeconds } from "../../motion/use-seconds";
import { SANS } from "../../typography/fonts";
import { FORM_TIMELINE, SERVER_NAME } from "./const";

export const SaveButton = () => {
  const seconds = useSeconds();
  const press = useEntrance(FORM_TIMELINE.press, { damping: 12, stiffness: 300 });
  const pressed = seconds >= FORM_TIMELINE.press ? Math.sin(Math.min(1, press) * Math.PI) : 0;
  const checking = seconds >= FORM_TIMELINE.checking;
  return (
    <div
      style={{
        height: 60,
        padding: "0 28px",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontFamily: SANS,
        fontSize: 22,
        fontWeight: 600,
        color: COLORS.background,
        background: COLORS.accent,
        boxShadow: `0 10px 40px ${COLORS.accentGlow}`,
        scale: 1 - pressed * 0.04,
      }}
    >
      {checking ? <Spinner size={22} color={COLORS.background} /> : null}
      {checking ? `Checking with ${SERVER_NAME}…` : "Save and continue"}
    </div>
  );
};
