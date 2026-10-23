import { defineTool } from "@usemcpkit/core";

export const usersUsersCreateUsersBan = defineTool({
  name: "users:users:create_users_ban",
  description: "Ban a user. Bans a specified user account. Administrators only.",
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
    path: "/users/{id}/ban",
  },
});
