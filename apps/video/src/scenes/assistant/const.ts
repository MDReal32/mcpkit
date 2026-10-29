import type { CursorStop } from "../../components/cursor-stop";
import type { PullRequestData } from "./pull-request-data";
import type { ToolCallData } from "./tool-call-data";

/** A warm, dark chat-app palette, kept apart from the promo's own cool one. */
export const APP_COLORS = {
  window: "#262624",
  titleBar: "#1f1e1d",
  sidebar: "#1f1e1d",
  composer: "#30302e",
  border: "#3a3935",
  text: "#f2f1ec",
  muted: "#a6a39a",
  faint: "#75736c",
  clay: "#d97757",
  bubble: "#141413",
} as const;

export const APP_WINDOW = {
  width: 1560,
  height: 800,
  titleBar: 44,
  sidebar: 280,
  column: 860,
} as const;

export const COMPOSER = {
  height: 128,
  centeredTop: 330,
  dockedTop: APP_WINDOW.height - 128 - 26,
} as const;

export const COLUMN_LEFT = APP_WINDOW.sidebar + (APP_WINDOW.width - APP_WINDOW.sidebar - APP_WINDOW.column) / 2;

export const PROMPT = "Which pull requests in acme/api are waiting on my review?";

export const INTRO_TEXT = "I'll check GitHub through mcpkit.";

export const ANSWER_TEXT = "Three are waiting on your review:";

export const FOLLOW_UP_TEXT = "#471 is the oldest. It fixes the token refresh race you reported last week.";

export const RECENT_CHATS: readonly string[] = [
  "Release notes for 0.5",
  "Jira sprint summary",
  "Rotate the Discord bot token",
  "Confluence onboarding page",
  "ClickUp tasks due Friday",
];

/** When each step of the conversation happens, in seconds into the scene. */
export const CHAT_TIMELINE = {
  typing: { start: 0.35, end: 1.3 },
  send: 1.45,
  intro: { start: 1.75, end: 2.05 },
  answer: { start: 3.55, end: 3.85 },
  pulls: 3.9,
  pullStep: 0.12,
  followUp: { start: 4.45, end: 5.25 },
} as const;

export const TOOL_CALLS: readonly ToolCallData[] = [
  { name: "git_github", result: "9 groups", start: 2.1, done: 2.45 },
  { name: "git_github_issues", result: "137 tools loaded", start: 2.5, done: 2.9 },
  { name: "git_github_issues_pulls_list", result: "3 pull requests", start: 2.95, done: 3.4 },
];

export const PULL_REQUESTS: readonly PullRequestData[] = [
  { number: 482, title: "Retry failed webhook deliveries", author: "nadia", age: "2 days" },
  { number: 479, title: "Bump vite to 8.1", author: "renovate", age: "3 days" },
  { number: 471, title: "Fix token refresh race", author: "omar", age: "5 days" },
];

export const SEND_BUTTON = {
  x: COLUMN_LEFT + APP_WINDOW.column - 40,
  y: COMPOSER.centeredTop + COMPOSER.height - 38,
} as const;

export const CHAT_CURSOR: readonly CursorStop[] = [
  { at: 0, x: 1380, y: 720 },
  { at: CHAT_TIMELINE.send, x: SEND_BUTTON.x, y: SEND_BUTTON.y, click: true },
  { at: CHAT_TIMELINE.send + 0.9, x: 1440, y: 560 },
];
