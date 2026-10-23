import { defineTool } from "@usemcpkit/core";

export const copilotCopilotSetCopilotCodingAgentSelectedRepositoriesForOrganization = defineTool({
  name: "copilot:copilot:set_copilot_coding_agent_selected_repositories_for_organization",
  description:
    "Set selected repositories for Copilot cloud agent in an organization. > [!NOTE] > This endpoint is in public preview and is subject to change.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      selected_repository_ids: {
        type: "array",
        description: "List of repository IDs to enable for Copilot cloud agent.",
        items: {
          type: "integer",
          description: "Unique identifier of the repository.",
        },
      },
    },
    required: ["org", "selected_repository_ids"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/copilot/coding-agent/permissions/repositories",
    body: ["selected_repository_ids"],
  },
});
