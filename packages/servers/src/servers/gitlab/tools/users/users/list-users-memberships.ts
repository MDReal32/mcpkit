import { defineTool } from "@usemcpkit/core";

export const usersUsersListUsersMemberships = defineTool({
  name: "users:users:list_users_memberships",
  description:
    "List all project and group memberships for a user. Lists all project and group memberships for a specified user. Administrators only.",
  input: {
    type: "object",
    properties: {
      user_id: {
        type: "integer",
        description: "ID of the user.",
      },
      type: {
        type: "string",
        enum: ["Project", "Namespace"],
        description: "Filter memberships by type.",
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
    required: ["user_id"],
  },
  request: {
    method: "GET",
    path: "/users/{user_id}/memberships",
    query: ["type", "page", "per_page"],
  },
});
