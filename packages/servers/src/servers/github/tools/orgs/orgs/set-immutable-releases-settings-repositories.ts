import { defineTool } from "@usemcpkit/core";

export const orgsOrgsSetImmutableReleasesSettingsRepositories = defineTool({
  name: "orgs:orgs:set_immutable_releases_settings_repositories",
  description:
    "Set selected repositories for immutable releases enforcement. Replaces all repositories that have been selected for immutable releases enforcement in an organization. To use this endpoint, the organization immutable releases policy for `enforced_repositories` must be configured to `selected`.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      selected_repository_ids: {
        type: "array",
        description:
          "An array of repository ids for which immutable releases enforcement should be applied. You can only provide a list of repository ids when the `enforced_repositories` is set to `selected`. You can add and remove individual repositories using the Enable a selected repository for immutable releases in an organization and Disable a selected repository for immutable releases in an organization endpoin…",
        items: {
          type: "integer",
        },
      },
    },
    required: ["org", "selected_repository_ids"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/settings/immutable-releases/repositories",
    body: ["selected_repository_ids"],
  },
});
