import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateProjectsServicesAssembla = defineTool({
  name: "projects:integrations:update_projects_services_assembla",
  description: "Create or update the Assembla integration. Creates or updates the Assembla integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
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
    path: "/projects/{id}/services/assembla",
    body: ["token", "subdomain", "push_events", "use_inherited_settings"],
  },
});
