import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateProjectsIntegrationsSquashTm = defineTool({
  name: "projects:integrations:update_projects_integrations_squash_tm",
  description: "Create or update the Squash Tm integration. Creates or updates the Squash Tm integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      url: {
        type: "string",
        description: "URL of the Squash TM webhook.",
      },
      token: {
        type: "string",
        description: "Secret token.",
      },
      issues_events: {
        type: "boolean",
        description: "Trigger event when a work item is created, updated, or closed.",
      },
      confidential_issues_events: {
        type: "boolean",
        description: "Trigger event when a confidential work item is created, updated, or closed.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id", "url"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/integrations/squash-tm",
    body: ["url", "token", "issues_events", "confidential_issues_events", "use_inherited_settings"],
  },
});
