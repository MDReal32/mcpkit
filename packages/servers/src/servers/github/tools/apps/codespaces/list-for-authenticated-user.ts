import { defineTool } from "@usemcpkit/core";

export const appsCodespacesListForAuthenticatedUser = defineTool({
  name: "apps:codespaces:list_for_authenticated_user",
  description: "List codespaces for the authenticated user. Lists the authenticated user's codespaces.",
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
      repository_id: {
        type: "integer",
        description: "ID of the Repository to filter on",
      },
    },
  },
  request: {
    method: "GET",
    path: "/user/codespaces",
    query: ["per_page", "page", "repository_id"],
  },
});
