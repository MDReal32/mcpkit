import { COLORS } from "../../const";
import { useEntrance } from "../../motion/use-entrance";
import { MONO, SANS } from "../../typography/fonts";
import { FORM_TIMELINE, SERVER_NAME } from "./const";
import { HostCombobox } from "./host-combobox";
import { SaveButton } from "./save-button";
import { TokenField } from "./token-field";

/** The form as the loopback page shows it, until the API has accepted the token. */
export const CredentialsForm = () => {
  const leave = useEntrance(FORM_TIMELINE.connected);
  return (
    <div
      style={{
        padding: "40px 46px",
        display: "flex",
        flexDirection: "column",
        gap: 26,
        opacity: 1 - leave,
        scale: 1 - leave * 0.03,
        filter: `blur(${leave * 10}px)`,
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: COLORS.muted,
        }}
      >
        mcpkit
      </div>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 44,
          fontWeight: 600,
          letterSpacing: "-0.035em",
          color: COLORS.text,
          marginTop: -12,
        }}
      >
        Connect {SERVER_NAME}
      </div>
      <HostCombobox />
      <TokenField />
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 26, marginTop: 6 }}>
        <div style={{ fontFamily: SANS, fontSize: 22, color: COLORS.muted }}>Cancel</div>
        <SaveButton />
      </div>
    </div>
  );
};
