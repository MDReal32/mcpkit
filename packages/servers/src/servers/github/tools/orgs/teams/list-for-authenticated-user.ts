import { defineTool } from "@usemcpkit/core";

export const orgsTeamsListForAuthenticatedUser = defineTool({
  name: "orgs:teams:list_for_authenticated_user",
  description:
    "List teams for the authenticated user. List all of the teams across all of the organizations to which the authenticated user belongs.",
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
    path: "/user/teams",
    query: ["per_page", "page"],
  },
});
