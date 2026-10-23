import { defineTool } from "@usemcpkit/core";

export const appsAppsListInstallationsForAuthenticatedUser = defineTool({
  name: "apps:apps:list_installations_for_authenticated_user",
  description:
    "List app installations accessible to the user access token. Lists installations of your GitHub App that the authenticated user has explicit permission (`:read`, `:write`, or `:admin`) to access.",
  input: {
    type: "object",
    properties: {
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
  },
  request: {
    method: "GET",
    path: "/user/installations",
    query: ["per_page", "page"],
  },
});
