import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsCreateProjectsIntegrationsMattermostSlashCommandsTrigger = defineTool({
  name: "projects:integrations:create_projects_integrations_mattermost_slash_commands_trigger",
  description:
    "Trigger a slash command for mattermost-slash-commands. Triggers a slash command for mattermost-slash-commands.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      token: {
        type: "string",
        description: "The Mattermost token.",
      },
    },
    required: ["id", "token"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/integrations/mattermost_slash_commands/trigger",
    body: ["token"],
  },
});
