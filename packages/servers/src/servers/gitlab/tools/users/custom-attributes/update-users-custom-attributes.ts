import { defineTool } from "@usemcpkit/core";

export const usersCustomAttributesUpdateUsersCustomAttributes = defineTool({
  name: "users:custom_attributes:update_users_custom_attributes",
  description:
    "Creates or updates a custom attribute for a user. Creates or updates a custom attribute for a specified user. If the attribute already exists, it is updated, otherwise a new attribute is created.",
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
      value: {
        type: "string",
        description: "Value of the custom attribute.",
      },
    },
    required: ["key", "id", "value"],
  },
  request: {
    method: "PUT",
    path: "/users/{id}/custom_attributes/{key}",
    body: ["value"],
  },
});
