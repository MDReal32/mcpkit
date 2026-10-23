import { defineTool } from "@usemcpkit/core";

export const groupsGroupsDeleteGroupsShare = defineTool({
  name: "groups:groups:delete_groups_share",
  description: "Remove a group from a group. Removes a group from a group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      group_id: {
        type: "integer",
        description: "ID of the shared group.",
      },
    },
    required: ["id", "group_id"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/share/{group_id}",
  },
});
