import { defineTool } from "@usemcpkit/core";

export const usersUsersCreateUsersUnblock = defineTool({
  name: "users:users:create_users_unblock",
  description:
    "Unblock access to a user. Unblocks a specified user account that was previously blocked. Administrators only.",
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
    path: "/users/{id}/unblock",
  },
});
