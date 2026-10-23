import { defineTool } from "@usemcpkit/core";

export const usersCustomAttributesListUsersCustomAttributes = defineTool({
  name: "users:custom_attributes:list_users_custom_attributes",
  description: "List all custom attributes for a user. Lists all custom attributes for a specified user.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the user.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/users/{id}/custom_attributes",
  },
});
