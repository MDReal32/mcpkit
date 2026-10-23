import { defineTool } from "@usemcpkit/core";

export const usersCustomAttributesGetUsersCustomAttributes = defineTool({
  name: "users:custom_attributes:get_users_custom_attributes",
  description: "Retrieve a custom attribute for a user. Retrieves a specified custom attribute for a user.",
  input: {
    type: "object",
    properties: {
      key: {
        type: "string",
        description: "Key of the custom attribute.",
      },
      id: {
        type: "string",
        description: "ID or URL-encoded path of the user.",
      },
    },
    required: ["key", "id"],
  },
  request: {
    method: "GET",
    path: "/users/{id}/custom_attributes/{key}",
  },
});
