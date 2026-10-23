import { defineTool } from "@usemcpkit/core";

export const metaJiraForgeInstallationCreateIntegrationsJiraForgeInstallationForgeToken = defineTool({
  name: "meta:jira_forge_installation:create_integrations_jira_forge_installation_forge_token",
  description:
    "Register the GitLab for Jira (Forge) system token for direct dev-info sync. Stores the Forge app system OAuth token (X-Forge-Oauth-System header) and the Jira apiBaseUrl (from the FIT), so GitLab pushes dev-info directly to Jira. See Atlassian::Forge::SystemTokenClient.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "POST",
    path: "/integrations/jira_forge/installation/forge_token",
  },
});
