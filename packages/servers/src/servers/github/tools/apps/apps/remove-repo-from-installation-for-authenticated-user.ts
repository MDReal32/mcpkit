import { defineTool } from "@usemcpkit/core";

export const appsAppsRemoveRepoFromInstallationForAuthenticatedUser = defineTool({
  name: "apps:apps:remove_repo_from_installation_for_authenticated_user",
  description:
    "Remove a repository from an app installation. Remove a single repository from an installation. The authenticated user must have admin access to the repository. The installation must have the `repository_selection` of `selected`.",
  input: {
    type: "object",
    properties: {
      installation_id: {
        type: "integer",
        description: "The unique identifier of the installation.",
      },
      repository_id: {
        type: "integer",
        description: "The unique identifier of the repository.",
      },
    },
    required: ["installation_id", "repository_id"],
  },
  request: {
    method: "DELETE",
    path: "/user/installations/{installation_id}/repositories/{repository_id}",
  },
});
