import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateGroupsIntegrationsLinear = defineTool({
  name: "projects:integrations:update_groups_integrations_linear",
  description: "Create or update the Linear integration. Creates or updates the Linear integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      workspace_url: {
        type: "string",
        description: "Linear workspace URL (for example, https://linear.app/example)",
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
    required: ["id", "workspace_url"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/integrations/linear",
    body: ["workspace_url", "push_events", "use_inherited_settings"],
  },
});
