import { RiseIn } from "../../components/rise-in";
import { COLORS } from "../../const";
import { MONO } from "../../typography/fonts";
import { ALPHA_AT } from "./const";

/** The count is where the project starts, not where it stops. */
export const AlphaBadge = () => (
  <RiseIn delay={ALPHA_AT} distance={14} blur={6}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 16,
        padding: "8px 16px",
        borderRadius: 999,
        border: "1px solid rgba(107, 140, 255, 0.45)",
        background: COLORS.accentSoft,
        fontFamily: MONO,
        fontSize: 21,
        color: COLORS.muted,
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 4, background: COLORS.accent }} />
      <span style={{ color: COLORS.accent, letterSpacing: "0.12em" }}>ALPHA</span>
      just warming up
    </div>
  </RiseIn>
);
