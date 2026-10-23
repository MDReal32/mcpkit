import { defineTool } from "@usemcpkit/core";

export const appsAppsAddRepoToInstallationForAuthenticatedUser = defineTool({
  name: "apps:apps:add_repo_to_installation_for_authenticated_user",
  description:
    "Add a repository to an app installation. Add a single repository to an installation. The authenticated user must have admin access to the repository.",
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
    method: "PUT",
    path: "/user/installations/{installation_id}/repositories/{repository_id}",
  },
});
