import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateGroupsIntegrationsGitGuardian = defineTool({
  name: "projects:integrations:update_groups_integrations_git_guardian",
  description: "Create or update the Git Guardian integration. Creates or updates the Git Guardian integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      api_url: {
        type: "string",
        description:
          "GitGuardian API base URL. Defaults to https://api.gitguardian.com. Use https://api.eu1.gitguardian.com for the EU region, or the URL of your self-hosted GitGuardian instance. Must use HTTPS.",
      },
      token: {
        type: "string",
        description: "Personal access token to authenticate calls to the GitGuardian API.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id", "token"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/integrations/git-guardian",
    body: ["api_url", "token", "use_inherited_settings"],
  },
});
