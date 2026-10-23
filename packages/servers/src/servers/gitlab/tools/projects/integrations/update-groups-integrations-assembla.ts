import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateGroupsIntegrationsAssembla = defineTool({
  name: "projects:integrations:update_groups_integrations_assembla",
  description: "Create or update the Assembla integration. Creates or updates the Assembla integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      token: {
        type: "string",
        description: "The authentication token.",
      },
      subdomain: {
        type: "string",
        description: "The subdomain setting.",
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
    required: ["id", "token"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/integrations/assembla",
    body: ["token", "subdomain", "push_events", "use_inherited_settings"],
  },
});
