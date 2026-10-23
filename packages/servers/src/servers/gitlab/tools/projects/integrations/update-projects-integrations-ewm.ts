import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateProjectsIntegrationsEwm = defineTool({
  name: "projects:integrations:update_projects_integrations_ewm",
  description: "Create or update the Ewm integration. Creates or updates the Ewm integration.",
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
      new_issue_url: {
        type: "string",
        description: "URL of the new issue.",
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
    required: ["id", "project_url", "issues_url", "new_issue_url"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/integrations/ewm",
    body: ["project_url", "issues_url", "new_issue_url", "push_events", "use_inherited_settings"],
  },
});
