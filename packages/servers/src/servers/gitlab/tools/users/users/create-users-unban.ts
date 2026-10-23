import { defineTool } from "@usemcpkit/core";

export const usersUsersCreateUsersUnban = defineTool({
  name: "users:users:create_users_unban",
  description: "Unban a user. Unbans a specified user account that was previously banned. Administrators only.",
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
    path: "/users/{id}/unban",
  },
});
