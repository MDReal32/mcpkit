import type { ConfigEntryData } from "./config-entry-data";
import type { ScatteredEntryData } from "./scattered-entry-data";

export const SCATTERED_ENTRIES: readonly ScatteredEntryData[] = [
  { name: "github", command: "npx", args: ["github-mcp"], env: "GITHUB_TOKEN", x: -560, y: -150, rotate: -4 },
  { name: "gitlab", command: "uvx", args: ["gitlab-mcp"], env: "GITLAB_TOKEN", x: 20, y: -215, rotate: 2 },
  { name: "jira", command: "docker", args: ["run", "jira-mcp"], env: "JIRA_API_TOKEN", x: 560, y: -130, rotate: 5 },
  { name: "confluence", command: "npx", args: ["confluence-mcp"], env: "CONFLUENCE_TOKEN", x: -620, y: 130, rotate: 3 },
  { name: "clickup", command: "node", args: ["clickup/index.js"], env: "CLICKUP_KEY", x: -60, y: 60, rotate: -2 },
  { name: "discord", command: "python", args: ["-m", "discord_mcp"], env: "DISCORD_TOKEN", x: 520, y: 160, rotate: -5 },
  { name: "bitwarden", command: "npx", args: ["bitwarden-mcp"], env: "BW_SESSION", x: 40, y: 255, rotate: 3 },
];

export const MCPKIT_ENTRY: ConfigEntryData = {
  name: "mcpkit",
  command: "~/.mcpkit/bin/mcpkit",
  args: ["serve"],
};

export const COLLAPSE_AT = 1.3;

export const MERGED_AT = 1.62;
