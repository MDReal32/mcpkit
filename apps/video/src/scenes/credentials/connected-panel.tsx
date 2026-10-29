import { CheckIcon } from "../../components/check-icon";
import { COLORS } from "../../const";
import { useEntrance } from "../../motion/use-entrance";
import { MONO, SANS } from "../../typography/fonts";
import { FORM_TIMELINE, SERVER_NAME } from "./const";

export const ConnectedPanel = () => {
  const appear = useEntrance(FORM_TIMELINE.connected + 0.05);
  const check = useEntrance(FORM_TIMELINE.connected + 0.2, { damping: 200, stiffness: 90 });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 26,
        opacity: appear,
        scale: 0.96 + appear * 0.04,
        filter: `blur(${(1 - appear) * 10}px)`,
      }}
    >
      <CheckIcon size={96} progress={check} />
      <div style={{ fontFamily: SANS, fontSize: 48, fontWeight: 600, letterSpacing: "-0.035em", color: COLORS.text }}>
        {SERVER_NAME} is connected
      </div>
      <div style={{ fontFamily: SANS, fontSize: 22, color: COLORS.muted }}>
        Saved to <span style={{ fontFamily: MONO, color: COLORS.text }}>~/.mcpkit/config.json</span>
      </div>
    </div>
  );
};
