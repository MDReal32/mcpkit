import type { ClientWindowData } from "./client-window-data";

export const CLIENT_WINDOW = { width: 540, height: 330, step: 0.22 } as const;

/** Offsets in seconds from a window's own start. */
export const WINDOW_BEATS = {
  prompt: { start: 0.15, end: 0.65 },
  reply: { start: 1.3, end: 1.75 },
} as const;

const EDITOR_COLORS = { border: "#2f2f2f", text: "#e6e6e6", muted: "#a0a0a0", faint: "#6b6b6b" } as const;

export const CLIENT_WINDOWS: readonly ClientWindowData[] = [
  {
    client: "Cursor",
    panel: "Agent",
    prompt: "Move PROJ-142 to In Review",
    call: { name: "atlassian_jira_issues_issues_do_transition", result: "done", start: 0.75, done: 1.2 },
    reply: "PROJ-142 is now In Review.",
    background: "#181818",
    chrome: "#141414",
    colors: EDITOR_COLORS,
    terminal: false,
  },
  {
    client: "VS Code",
    panel: "Chat",
    prompt: "What's due in ClickUp this week?",
    call: { name: "productivity_clickup_tasks_tasks_get_tasks", result: "6 tasks", start: 0.75, done: 1.2 },
    reply: "6 tasks, 2 of them due tomorrow.",
    background: "#1f1f1f",
    chrome: "#181818",
    colors: { ...EDITOR_COLORS, border: "#2b2b2b" },
    terminal: false,
  },
  {
    client: "Codex",
    panel: "~/staging",
    prompt: "Generate a password for staging",
    call: { name: "security_bitwarden_vault_items_generate", result: "generated", start: 0.75, done: 1.2 },
    reply: "Generated a 32-character password.",
    background: "#0c0c0c",
    chrome: "#141414",
    colors: { ...EDITOR_COLORS, border: "#262626" },
    terminal: true,
  },
];

export const MORE_CLIENTS: readonly string[] = [
  "Claude Code",
  "Windsurf",
  "Zed",
  "Gemini CLI",
  "Kiro",
  "Cline",
  "Copilot CLI",
  "Warp",
];

export const MORE_CLIENTS_AT = 2.2;
