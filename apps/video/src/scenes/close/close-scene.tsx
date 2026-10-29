import { AbsoluteFill } from "remotion";
import { RiseIn } from "../../components/rise-in";
import { Wordmark } from "../../components/wordmark";
import { COLORS } from "../../const";
import { MONO } from "../../typography/fonts";
import { ClosingLines } from "./closing-lines";
import { CTA_AT, REPOSITORY } from "./const";
import { InstallPill } from "./install-pill";

export const CloseScene = () => (
  <AbsoluteFill>
    <ClosingLines />
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 64 }}>
      <RiseIn delay={CTA_AT} distance={30}>
        <Wordmark size={120} />
      </RiseIn>
      <RiseIn delay={CTA_AT + 0.18} distance={30}>
        <InstallPill />
      </RiseIn>
      <RiseIn delay={CTA_AT + 0.4} distance={20}>
        <div style={{ fontFamily: MONO, fontSize: 26, color: COLORS.faint, marginTop: -20 }}>{REPOSITORY}</div>
      </RiseIn>
    </AbsoluteFill>
  </AbsoluteFill>
);
