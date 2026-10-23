import { defineTool } from "@usemcpkit/core";

export const usersUsersListUsersEmails = defineTool({
  name: "users:users:list_users_emails",
  description:
    "List all email addresses for a user. Lists all email addresses for a specified user account. Administrators only.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the user.",
      },
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
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/users/{id}/emails",
    query: ["page", "per_page"],
  },
});
