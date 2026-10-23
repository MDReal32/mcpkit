import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateProjectsServicesMockCi = defineTool({
  name: "projects:integrations:update_projects_services_mock_ci",
  description: "Create or update the Mock Ci integration. Creates or updates the Mock Ci integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      enable_ssl_verification: {
        type: "boolean",
        description: "Enable SSL verification. Defaults to `true` (enabled).",
      },
      mock_service_url: {
        type: "string",
        description: "URL of the Mock CI integration.",
      },
      push_events: {
        type: "boolean",
        description: "Trigger event for pushes to the repository.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id", "mock_service_url"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/services/mock-ci",
    body: ["enable_ssl_verification", "mock_service_url", "push_events", "use_inherited_settings"],
  },
});
