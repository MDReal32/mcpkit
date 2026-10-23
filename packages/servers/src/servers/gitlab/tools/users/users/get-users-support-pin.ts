import { defineTool } from "@usemcpkit/core";

export const usersUsersGetUsersSupportPin = defineTool({
  name: "users:users:get_users_support_pin",
  description:
    "Retrieve a Support PIN for a user. Retrieves a Support PIN for a specified user. GitLab Support may ask for this PIN to validate your identity. Administrators only.",
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
    path: "/users/{id}/support_pin",
  },
});
