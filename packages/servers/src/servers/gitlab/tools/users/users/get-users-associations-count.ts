import { defineTool } from "@usemcpkit/core";

export const usersUsersGetUsersAssociationsCount = defineTool({
  name: "users:users:get_users_associations_count",
  description:
    "Retrieve association counts for a user. Retrieves the number of groups, projects, issues, and merge requests associated with a specified user.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the user.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/users/{id}/associations_count",
  },
});
