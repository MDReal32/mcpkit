import { defineTool } from "@usemcpkit/core";

export const usersCustomAttributesListGroupsCustomAttributes = defineTool({
  name: "users:custom_attributes:list_groups_custom_attributes",
  description: "List all custom attributes for a group. Lists all custom attributes for a specified group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/custom_attributes",
  },
});
