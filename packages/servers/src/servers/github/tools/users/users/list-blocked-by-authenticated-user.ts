import { defineTool } from "@usemcpkit/core";

export const usersUsersListBlockedByAuthenticatedUser = defineTool({
  name: "users:users:list_blocked_by_authenticated_user",
  description: "List users blocked by the authenticated user. List the users you've blocked on your personal account.",
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
    path: "/user/blocks",
    query: ["per_page", "page"],
  },
});
