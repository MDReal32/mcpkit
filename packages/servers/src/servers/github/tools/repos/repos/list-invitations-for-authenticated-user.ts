import { defineTool } from "@usemcpkit/core";

export const reposReposListInvitationsForAuthenticatedUser = defineTool({
  name: "repos:repos:list_invitations_for_authenticated_user",
  description:
    "List repository invitations for the authenticated user. When authenticating as a user, this endpoint will list all currently open repository invitations for that user.",
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
    path: "/user/repository_invitations",
    query: ["per_page", "page"],
  },
});
