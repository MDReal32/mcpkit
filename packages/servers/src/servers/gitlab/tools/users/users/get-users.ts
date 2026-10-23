import { defineTool } from "@usemcpkit/core";

export const usersUsersGetUsers = defineTool({
  name: "users:users:get_users",
  description: "Retrieve a user as a regular user. Retrieves a specified user as a regular user.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the user.",
      },
      with_custom_attributes: {
        type: "boolean",
        default: false,
        description: "If `true`, includes custom attributes in the response. Administrators only.",
      },
      custom_attributes: {
        type: "object",
        description:
          "Filter by custom attributes that match all of the specified key and value pairs. Administrators only.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/users/{id}",
    query: ["with_custom_attributes", "custom_attributes"],
  },
});
