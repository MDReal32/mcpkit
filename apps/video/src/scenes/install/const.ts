import type { ClientRowData } from "./client-row-data";

export const INSTALL_COMMAND = "npx usemcpkit";

export const DETECTED_CLIENTS: readonly ClientRowData[] = [
  { name: "Claude Desktop", configPath: "Claude/claude_desktop_config.json" },
  { name: "Claude Code", configPath: "~/.claude.json" },
  { name: "Cursor", configPath: "~/.cursor/mcp.json" },
  { name: "VS Code", configPath: "Code/User/mcp.json" },
  { name: "OpenAI Codex", configPath: "~/.codex/config.toml" },
  { name: "Windsurf", configPath: "~/.codeium/windsurf/mcp_config.json" },
  { name: "Zed", configPath: "~/.config/zed/settings.json" },
];

export const TYPING_WINDOW = { start: 0.35, end: 0.8 } as const;

export const ROWS_AT = 1.05;

export const ROW_STEP = 0.11;

export const TERMINAL_FONT_SIZE = 26;
