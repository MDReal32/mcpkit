import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateGroupsIntegrationsMockMonitoring = defineTool({
  name: "projects:integrations:update_groups_integrations_mock_monitoring",
  description: "Create or update the Mock Monitoring integration. Creates or updates the Mock Monitoring integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/integrations/mock-monitoring",
    body: ["use_inherited_settings"],
  },
});
