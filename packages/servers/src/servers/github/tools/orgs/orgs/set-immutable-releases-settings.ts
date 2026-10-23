import { defineTool } from "@usemcpkit/core";

export const orgsOrgsSetImmutableReleasesSettings = defineTool({
  name: "orgs:orgs:set_immutable_releases_settings",
  description:
    "Set immutable releases settings for an organization. Sets the immutable releases policy for repositories in an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      enforced_repositories: {
        type: "string",
        description: "The policy that controls how immutable releases are enforced in the organization.",
        enum: ["all", "none", "selected"],
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
    required: ["org", "enforced_repositories"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/settings/immutable-releases",
    body: ["enforced_repositories", "selected_repository_ids"],
  },
});
