import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateGroupsIntegrationsExternalWiki = defineTool({
  name: "projects:integrations:update_groups_integrations_external_wiki",
  description: "Create or update the External Wiki integration. Creates or updates the External Wiki integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      external_wiki_url: {
        type: "string",
        description: "URL of the external wiki.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id", "external_wiki_url"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/integrations/external-wiki",
    body: ["external_wiki_url", "use_inherited_settings"],
  },
});
