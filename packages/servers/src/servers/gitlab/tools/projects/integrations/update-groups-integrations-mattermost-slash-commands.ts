import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateGroupsIntegrationsMattermostSlashCommands = defineTool({
  name: "projects:integrations:update_groups_integrations_mattermost_slash_commands",
  description:
    "Create or update the Mattermost Slash Commands integration. Creates or updates the Mattermost Slash Commands integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      token: {
        type: "string",
        description: "The Mattermost token.",
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
    path: "/groups/{id}/integrations/mattermost-slash-commands",
    body: ["token", "use_inherited_settings"],
  },
});
