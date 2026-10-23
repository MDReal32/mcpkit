import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateProjectsIntegrationsDiffblueCover = defineTool({
  name: "projects:integrations:update_projects_integrations_diffblue_cover",
  description: "Create or update the Diffblue Cover integration. Creates or updates the Diffblue Cover integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      diffblue_license_key: {
        type: "string",
        description: "Diffblue Cover license key.",
      },
      diffblue_access_token_name: {
        type: "string",
        description: "Access token name used by Diffblue Cover in pipelines.",
      },
      diffblue_access_token_secret: {
        type: "string",
        description: "Access token secret used by Diffblue Cover in pipelines.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id", "diffblue_license_key", "diffblue_access_token_name", "diffblue_access_token_secret"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/integrations/diffblue-cover",
    body: [
      "diffblue_license_key",
      "diffblue_access_token_name",
      "diffblue_access_token_secret",
      "use_inherited_settings",
    ],
  },
});
