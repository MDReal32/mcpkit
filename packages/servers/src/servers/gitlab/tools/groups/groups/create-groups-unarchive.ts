import { defineTool } from "@usemcpkit/core";

export const groupsGroupsCreateGroupsUnarchive = defineTool({
  name: "groups:groups:create_groups_unarchive",
  description:
    "Unarchive a group. Unarchives a specified group. You must be an administrator or have the Owner role for the group.",
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
    method: "POST",
    path: "/groups/{id}/unarchive",
  },
});
