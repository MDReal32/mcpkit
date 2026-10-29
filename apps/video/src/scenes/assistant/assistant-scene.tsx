import { AbsoluteFill } from "remotion";
import { Cursor } from "../../components/cursor";
import { RiseIn } from "../../components/rise-in";
import { Words } from "../../components/words";
import { COLORS } from "../../const";
import { SANS } from "../../typography/fonts";
import { AppSidebar } from "./app-sidebar";
import { AppTitleBar } from "./app-title-bar";
import { Composer } from "./composer";
import { APP_COLORS, APP_WINDOW, CHAT_CURSOR } from "./const";
import { Conversation } from "./conversation";
import { Greeting } from "./greeting";

export const AssistantScene = () => (
  <AbsoluteFill style={{ alignItems: "center" }}>
    <div
      style={{
        marginTop: 64,
        fontFamily: SANS,
        fontSize: 52,
        fontWeight: 600,
        letterSpacing: "-0.04em",
        color: COLORS.text,
      }}
    >
      <Words text="Ask. mcpkit opens just the tools it needs." delay={0.05} step={0.04} accentWords={["mcpkit"]} />
    </div>
    <RiseIn delay={0} distance={60} style={{ marginTop: 40 }}>
      <div
        style={{
          position: "relative",
          width: APP_WINDOW.width,
          height: APP_WINDOW.height,
          borderRadius: 16,
          overflow: "hidden",
          background: APP_COLORS.window,
          border: `1px solid ${APP_COLORS.border}`,
          boxShadow: "0 50px 140px rgba(0, 0, 0, 0.6)",
        }}
      >
        <AppTitleBar />
        <AppSidebar />
        <Greeting />
        <Conversation />
        <Composer />
        <Cursor stops={CHAT_CURSOR} />
      </div>
    </RiseIn>
  </AbsoluteFill>
);
