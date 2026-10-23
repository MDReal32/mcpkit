import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateProjectsServicesYoutrack = defineTool({
  name: "projects:integrations:update_projects_services_youtrack",
  description: "Create or update the Youtrack integration. Creates or updates the Youtrack integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      project_url: {
        type: "string",
        description: "URL of the project.",
      },
      issues_url: {
        type: "string",
        description: "URL of the issue.",
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
    required: ["id", "project_url", "issues_url"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/services/youtrack",
    body: ["project_url", "issues_url", "push_events", "use_inherited_settings"],
  },
});
