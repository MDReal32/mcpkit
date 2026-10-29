import { SANS } from "../../typography/fonts";
import { APP_COLORS, APP_WINDOW } from "./const";

export const AppTitleBar = () => (
  <div
    style={{
      height: APP_WINDOW.titleBar,
      display: "flex",
      alignItems: "center",
      padding: "0 18px",
      background: APP_COLORS.titleBar,
      borderBottom: `1px solid ${APP_COLORS.border}`,
      position: "relative",
    }}
  >
    <div style={{ display: "flex", gap: 9 }}>
      {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
        <div key={color} style={{ width: 13, height: 13, borderRadius: 7, background: color, opacity: 0.85 }} />
      ))}
    </div>
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: SANS,
        fontSize: 16,
        fontWeight: 500,
        color: APP_COLORS.muted,
      }}
    >
      Claude
    </div>
  </div>
);
