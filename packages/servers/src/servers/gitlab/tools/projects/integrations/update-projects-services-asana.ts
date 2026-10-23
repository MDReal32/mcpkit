import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateProjectsServicesAsana = defineTool({
  name: "projects:integrations:update_projects_services_asana",
  description: "Create or update the Asana integration. Creates or updates the Asana integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      api_key: {
        type: "string",
        description: "User API token. The user must have access to the task. All comments are attributed to this user.",
      },
      restrict_to_branch: {
        type: "string",
        description:
          "Comma-separated list of branches to be automatically inspected. Leave blank to include all branches.",
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
    required: ["id", "api_key"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/services/asana",
    body: ["api_key", "restrict_to_branch", "push_events", "use_inherited_settings"],
  },
});
