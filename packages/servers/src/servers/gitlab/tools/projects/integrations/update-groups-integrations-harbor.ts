import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateGroupsIntegrationsHarbor = defineTool({
  name: "projects:integrations:update_groups_integrations_harbor",
  description: "Create or update the Harbor integration. Creates or updates the Harbor integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      url: {
        type: "string",
        description:
          "The base URL to the Harbor instance linked to the GitLab project. For example, `https://demo.goharbor.io`.",
      },
      project_name: {
        type: "string",
        description: "The name of the project in the Harbor instance. For example, `testproject`.",
      },
      username: {
        type: "string",
        description: "The username created in the Harbor interface.",
      },
      password: {
        type: "string",
        description: "The password of the user.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id", "url", "project_name", "username", "password"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/integrations/harbor",
    body: ["url", "project_name", "username", "password", "use_inherited_settings"],
  },
});
