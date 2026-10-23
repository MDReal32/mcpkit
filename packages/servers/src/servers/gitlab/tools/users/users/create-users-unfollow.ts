import { defineTool } from "@usemcpkit/core";

export const usersUsersCreateUsersUnfollow = defineTool({
  name: "users:users:create_users_unfollow",
  description: "Unfollow a user. Unfollows a specified user account.",
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
    method: "POST",
    path: "/users/{id}/unfollow",
  },
});
