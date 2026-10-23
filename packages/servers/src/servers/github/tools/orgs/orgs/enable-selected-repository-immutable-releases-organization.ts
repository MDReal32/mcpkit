import { defineTool } from "@usemcpkit/core";

export const orgsOrgsEnableSelectedRepositoryImmutableReleasesOrganization = defineTool({
  name: "orgs:orgs:enable_selected_repository_immutable_releases_organization",
  description:
    "Enable a selected repository for immutable releases in an organization. Adds a repository to the list of selected repositories that are enforced for immutable releases in an organization. To use this endpoint, the organization immutable releases policy for `enforced_repositories` must be configured to `selected`.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      repository_id: {
        type: "integer",
        description: "The unique identifier of the repository.",
      },
    },
    required: ["org", "repository_id"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/settings/immutable-releases/repositories/{repository_id}",
  },
});
