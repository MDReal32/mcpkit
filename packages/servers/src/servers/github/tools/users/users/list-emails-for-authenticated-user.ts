import { defineTool } from "@usemcpkit/core";

export const usersUsersListEmailsForAuthenticatedUser = defineTool({
  name: "users:users:list_emails_for_authenticated_user",
  description:
    "List email addresses for the authenticated user. Lists all of your email addresses, and specifies which one is visible to the public.",
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
    path: "/user/emails",
    query: ["per_page", "page"],
  },
});
