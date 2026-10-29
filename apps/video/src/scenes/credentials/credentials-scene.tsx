import { AbsoluteFill } from "remotion";
import { Cursor } from "../../components/cursor";
import { RiseIn } from "../../components/rise-in";
import { SceneCopy } from "../../components/scene-copy";
import { WindowFrame } from "../../components/window-frame";
import { SAFE_X } from "../../const";
import { ConnectedPanel } from "./connected-panel";
import { FORM_CURSOR, FORM_TIMELINE, PAGE_WIDTH } from "./const";
import { CredentialsForm } from "./credentials-form";

export const CredentialsScene = () => (
  <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: `0 ${SAFE_X}px`, gap: 120 }}>
    <SceneCopy
      eyebrow="Credentials"
      title="Enter once."
      body="On a local page. Saved only after the API accepts them."
      width={720}
    />
    <RiseIn delay={FORM_TIMELINE.pageIn} distance={50}>
      <WindowFrame title="127.0.0.1 · mcpkit" width={PAGE_WIDTH} height={530}>
        <CredentialsForm />
        <ConnectedPanel />
        <Cursor stops={FORM_CURSOR} />
      </WindowFrame>
    </RiseIn>
  </AbsoluteFill>
);
