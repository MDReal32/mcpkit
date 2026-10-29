import { Caret } from "../../components/caret";
import { COLORS } from "../../const";
import { MONO } from "../../typography/fonts";

export const InstallPill = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 22,
      padding: "24px 40px",
      borderRadius: 999,
      border: "1px solid rgba(107, 140, 255, 0.45)",
      background: `linear-gradient(180deg, ${COLORS.surfaceRaised}, ${COLORS.surface})`,
      boxShadow: `0 0 0 6px rgba(107, 140, 255, 0.06), 0 30px 100px ${COLORS.accentGlow}`,
      fontFamily: MONO,
      fontSize: 48,
      color: COLORS.text,
    }}
  >
    <span style={{ color: COLORS.accent }}>$</span>
    <span>
      npx usemcpkit
      <Caret height={46} />
    </span>
  </div>
);
