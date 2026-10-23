import { defineTool } from "@usemcpkit/core";

export const usersUsersListUserEmails = defineTool({
  name: "users:users:list_user_emails",
  description: "List all email addresses for a user. Lists all email addresses for the currently authenticated user.",
  input: {
    type: "object",
    properties: {
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/user/emails",
    query: ["page", "per_page"],
  },
});
