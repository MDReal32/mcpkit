import { defineTool } from "@usemcpkit/core";

export const usersUsersListUsersFollowers = defineTool({
  name: "users:users:list_users_followers",
  description: "List all accounts that follow a user. Lists all user accounts that follow a specified user.",
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
    path: "/users/{id}/followers",
    query: ["page", "per_page"],
  },
});
