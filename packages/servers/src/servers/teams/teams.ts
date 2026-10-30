import { defineServer } from "@usemcpkit/core";
import { TEAMS_FORWARD_ENV, TEAMS_NAMING, TEAMS_REPO_COMMIT, TEAMS_REPO_URL } from "./const";

export const teams = defineServer({
  name: "teams",
  category: "communication",
  version: "1.0.0",
  description:
    "Microsoft Teams through the community MCP server by Inditex (github.com/InditexTech/mcp-teams-server), cloned on first use into ~/.mcpkit/repos/communication/teams, set up with uv and run locally on a Python that uv installs for it (the system Python is never used). It works in the one team and channel it is configured for: start a thread, reply to it, read a thread or the channel's threads, and look up team members to mention. It signs in as a Microsoft Entra application (a bot) and needs git and uv on PATH. Set TEAMS_APP_ID, TEAMS_APP_PASSWORD, TEAMS_APP_TENANT_ID, TEAM_ID and TEAMS_CHANNEL_ID in the client's env for mcpkit. It posts as the bot into a real channel, so allow the write tools only when you want that.",
  baseUrl: "https://graph.microsoft.com",
  upstream: {
    type: "stdio",
    command: "uv",
    args: ["run", "--managed-python", "--project", "{repo}", "--frozen", "mcp-teams-server"],
    forwardEnv: TEAMS_FORWARD_ENV,
    naming: TEAMS_NAMING,
    repo: {
      url: TEAMS_REPO_URL,
      ref: TEAMS_REPO_COMMIT,
      setup: [{ command: "uv", args: ["sync", "--managed-python", "--frozen", "--no-dev", "--project", "."] }],
    },
  },
  tools: [],
});
