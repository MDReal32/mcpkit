import type { UpstreamNameRule } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

export const TEAMS_REPO_URL = "https://github.com/InditexTech/mcp-teams-server.git";

export const TEAMS_REPO_COMMIT = "f6281411ff90f9dcbfd9845a7192215672884d89";

export const TEAMS_FORWARD_ENV = [
  "TEAMS_APP_ID",
  "TEAMS_APP_PASSWORD",
  "TEAMS_APP_TENANT_ID",
  "TEAM_ID",
  "TEAMS_CHANNEL_ID",
];

export const TEAMS_FORM_UI = defineUI({
  texts: { actionsDivider: "need an Entra app?" },
});

export const TEAMS_CREDENTIALS_UI = defineUI({
  inputs: {
    TEAMS_APP_ID: {
      label: "Application (client) ID",
      placeholder: "00000000-0000-0000-0000-000000000000",
      hint: "The Application (client) ID of your Entra app registration. You can also set the TEAMS_APP_ID environment variable.",
      secret: false,
    },
    TEAMS_APP_PASSWORD: {
      label: "Client secret",
      placeholder: "Client secret value",
      hint: "A client secret of that app (Certificates & secrets); its value is shown only when it is created. You can also set the TEAMS_APP_PASSWORD environment variable.",
    },
    TEAMS_APP_TENANT_ID: {
      label: "Directory (tenant) ID",
      placeholder: "00000000-0000-0000-0000-000000000000",
      hint: "The Directory (tenant) ID of the app, on its Overview page. You can also set the TEAMS_APP_TENANT_ID environment variable.",
      secret: false,
    },
    TEAM_ID: {
      label: "Team ID",
      placeholder: "00000000-0000-0000-0000-000000000000",
      hint: "The group id of the team: the groupId value in a link to the team or one of its channels (Get link in Teams). You can also set the TEAM_ID environment variable.",
      secret: false,
    },
    TEAMS_CHANNEL_ID: {
      label: "Channel ID",
      placeholder: "19%3A…%40thread.tacv2",
      hint: "The channel id, URL-escaped: the part after /channel/ in a link to the channel (Get link in Teams). You can also set the TEAMS_CHANNEL_ID environment variable.",
      secret: false,
    },
  },
  actions: [
    {
      type: "link",
      label: "Open your Entra app registrations ↗",
      url: "https://entra.microsoft.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade",
    },
    {
      type: "link",
      label: "Teams setup guide ↗",
      url: "https://github.com/InditexTech/mcp-teams-server/blob/main/doc/MS-Teams-setup.md",
    },
  ],
});

/**
 * The server names its tools `<verb>_<object>` (`start_thread`, `list_members`); these rules file them as
 * `<group>:<resource>:<action>` like the other servers. Threads live in the one channel it is configured for.
 */
export const TEAMS_NAMING: readonly UpstreamNameRule[] = [
  { match: "^([a-z]+)_threads?$", name: "channel:threads:$1" },
  { match: "^list_members$", name: "team:members:list" },
  { match: "^get_member_by_name$", name: "team:members:get_by_name" },
];
