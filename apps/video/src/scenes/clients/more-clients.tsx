import { RiseIn } from "../../components/rise-in";
import { COLORS } from "../../const";
import { MONO } from "../../typography/fonts";
import { MORE_CLIENTS, MORE_CLIENTS_AT } from "./const";

export const MoreClients = () => (
  <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
    {MORE_CLIENTS.map((client, index) => (
      <RiseIn key={client} delay={MORE_CLIENTS_AT + index * 0.05} distance={16} blur={6}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 20,
            color: COLORS.muted,
            padding: "8px 16px",
            borderRadius: 999,
            border: `1px solid ${COLORS.border}`,
            background: COLORS.surface,
          }}
        >
          {client}
        </div>
      </RiseIn>
    ))}
  </div>
);
