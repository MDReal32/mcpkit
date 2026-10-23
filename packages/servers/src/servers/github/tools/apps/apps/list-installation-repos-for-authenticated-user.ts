import { defineTool } from "@usemcpkit/core";

export const appsAppsListInstallationReposForAuthenticatedUser = defineTool({
  name: "apps:apps:list_installation_repos_for_authenticated_user",
  description:
    "List repositories accessible to the user access token. List repositories that the authenticated user has explicit permission (`:read`, `:write`, or `:admin`) to access for an installation.",
  input: {
    type: "object",
    properties: {
      installation_id: {
        type: "integer",
        description: "The unique identifier of the installation.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ["installation_id"],
  },
  request: {
    method: "GET",
    path: "/user/installations/{installation_id}/repositories",
    query: ["per_page", "page"],
  },
});
