import { AbsoluteFill } from "remotion";
import { Words } from "../../components/words";
import { COLORS } from "../../const";
import { SANS } from "../../typography/fonts";
import { HookWordmark } from "./hook-wordmark";

export const HookScene = () => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <HookWordmark />
    <div
      style={{
        fontFamily: SANS,
        fontSize: 150,
        fontWeight: 600,
        letterSpacing: "-0.05em",
        lineHeight: 1.04,
        color: COLORS.text,
        textAlign: "center",
        marginTop: 90,
      }}
    >
      <Words text="Every API." delay={0.62} />
      <Words text="One MCP server." delay={0.88} accentWords={["One"]} />
    </div>
  </AbsoluteFill>
);
