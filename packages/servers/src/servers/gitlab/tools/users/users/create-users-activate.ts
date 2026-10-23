import { defineTool } from "@usemcpkit/core";

export const usersUsersCreateUsersActivate = defineTool({
  name: "users:users:create_users_activate",
  description:
    "Reactivate a user. Reactivates a specified user account that was previously deactivated. Administrators only.",
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
    path: "/users/{id}/activate",
  },
});
