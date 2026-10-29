import { AbsoluteFill } from "remotion";
import { Words } from "../../components/words";
import { COLORS } from "../../const";
import { SANS } from "../../typography/fonts";
import { ClientWindow } from "./client-window";
import { CLIENT_WINDOWS } from "./const";
import { MoreClients } from "./more-clients";

export const ClientsScene = () => (
  <AbsoluteFill style={{ alignItems: "center", paddingTop: 170, gap: 64 }}>
    <div style={{ fontFamily: SANS, fontSize: 84, fontWeight: 600, letterSpacing: "-0.045em", color: COLORS.text }}>
      <Words text="Same tools. Every client." delay={0.05} step={0.05} accentWords={["Every"]} />
    </div>
    <div style={{ display: "flex", gap: 40 }}>
      {CLIENT_WINDOWS.map((window, index) => (
        <ClientWindow key={window.client} window={window} index={index} />
      ))}
    </div>
    <MoreClients />
  </AbsoluteFill>
);
