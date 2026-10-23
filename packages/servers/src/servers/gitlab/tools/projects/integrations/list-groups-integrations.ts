import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsListGroupsIntegrations = defineTool({
  name: "projects:integrations:list_groups_integrations",
  description: "List all active integrations. Lists all active integrations.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/integrations",
  },
});
