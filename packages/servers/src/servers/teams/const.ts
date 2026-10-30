import type { UpstreamNameRule } from "@usemcpkit/core";

export const TEAMS_REPO_URL = "https://github.com/InditexTech/mcp-teams-server.git";

export const TEAMS_REPO_COMMIT = "f6281411ff90f9dcbfd9845a7192215672884d89";

export const TEAMS_FORWARD_ENV = [
  "TEAMS_APP_ID",
  "TEAMS_APP_PASSWORD",
  "TEAMS_APP_TENANT_ID",
  "TEAM_ID",
  "TEAMS_CHANNEL_ID",
];

/**
 * The server names its tools `<verb>_<object>` (`start_thread`, `list_members`); these rules file them as
 * `<group>:<resource>:<action>` like the other servers. Threads live in the one channel it is configured for.
 */
export const TEAMS_NAMING: readonly UpstreamNameRule[] = [
  { match: "^([a-z]+)_threads?$", name: "channel:threads:$1" },
  { match: "^list_members$", name: "team:members:list" },
  { match: "^get_member_by_name$", name: "team:members:get_by_name" },
];
