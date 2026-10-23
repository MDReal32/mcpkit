import { defineTool } from "@usemcpkit/core";

export const groupsMembersDeleteGroupsMembers = defineTool({
  name: "groups:members:delete_groups_members",
  description: "Remove a member from a group. Removes a specified user from a group. The user must be a direct member.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      user_id: {
        type: "integer",
        description: "User ID of the member.",
      },
      skip_subresources: {
        type: "boolean",
        default: false,
        description: "If `true`, skips deleting direct memberships of the removed member in subgroups and projects.",
      },
      unassign_issuables: {
        type: "boolean",
        default: false,
        description: "If `true`, unassigns the member from any issues or merge requests in the group.",
      },
    },
    required: ["id", "user_id"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/members/{user_id}",
    query: ["skip_subresources", "unassign_issuables"],
  },
});
