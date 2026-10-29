import { AbsoluteFill } from "remotion";
import { RiseIn } from "../../components/rise-in";
import { SceneCopy } from "../../components/scene-copy";
import { WindowFrame } from "../../components/window-frame";
import { COLORS, SAFE_X } from "../../const";
import { ClientRow } from "./client-row";
import { DETECTED_CLIENTS, ROW_STEP, ROWS_AT } from "./const";
import { TerminalLine } from "./terminal-line";
import { TerminalPrompt } from "./terminal-prompt";

export const InstallScene = () => (
  <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: `0 ${SAFE_X}px`, gap: 60 }}>
    <SceneCopy
      eyebrow="Install"
      title="One command."
      body="Finds the AI clients on this computer and adds mcpkit to each."
      width={640}
      delay={0.02}
    />
    <RiseIn delay={0.08} distance={50}>
      <WindowFrame title="zsh" width={860} height={570}>
        <div style={{ padding: "34px 40px" }}>
          <TerminalPrompt />
          <TerminalLine delay={ROWS_AT - 0.3}>
            <span style={{ color: COLORS.accent }}>◆</span>&nbsp;&nbsp;Found {DETECTED_CLIENTS.length} AI clients
          </TerminalLine>
          {DETECTED_CLIENTS.map((client, index) => (
            <ClientRow key={client.name} client={client} delay={ROWS_AT + index * ROW_STEP} />
          ))}
          <TerminalLine delay={ROWS_AT + DETECTED_CLIENTS.length * ROW_STEP + 0.35}>
            Restart the clients to load mcpkit.
          </TerminalLine>
        </div>
      </WindowFrame>
    </RiseIn>
  </AbsoluteFill>
);
