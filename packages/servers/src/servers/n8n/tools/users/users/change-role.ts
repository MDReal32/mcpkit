import { defineTool } from "@usemcpkit/core";

export const usersUsersChangeRole = defineTool({
  name: "users:users:change_role",
  description: "Change a user's global role",
  input: {
    type: "object",
    properties: {
      userId: {
        type: "string",
        description: "The ID of the user.",
      },
      newRoleName: {
        type: "string",
      },
    },
    required: ["userId", "newRoleName"],
  },
  request: {
    method: "PATCH",
    path: "/users/{userId}/role",
    body: ["newRoleName"],
  },
});
