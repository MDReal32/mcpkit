import { SANS } from "../../typography/fonts";
import { APP_COLORS, APP_WINDOW, RECENT_CHATS } from "./const";

export const AppSidebar = () => (
  <div
    style={{
      position: "absolute",
      left: 0,
      top: APP_WINDOW.titleBar,
      bottom: 0,
      width: APP_WINDOW.sidebar,
      background: APP_COLORS.sidebar,
      borderRight: `1px solid ${APP_COLORS.border}`,
      padding: "22px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontFamily: SANS,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        fontSize: 18,
        fontWeight: 500,
        color: APP_COLORS.text,
      }}
    >
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: 13,
          background: APP_COLORS.clay,
          color: APP_COLORS.bubble,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          lineHeight: 1,
        }}
      >
        +
      </div>
      New chat
    </div>
    <div style={{ fontSize: 14, color: APP_COLORS.faint, padding: "22px 12px 8px" }}>Recents</div>
    {RECENT_CHATS.map((chat) => (
      <div
        key={chat}
        style={{
          fontSize: 16,
          color: APP_COLORS.muted,
          padding: "9px 12px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {chat}
      </div>
    ))}
  </div>
);
