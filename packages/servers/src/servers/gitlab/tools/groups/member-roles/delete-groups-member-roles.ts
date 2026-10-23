import { defineTool } from "@usemcpkit/core";

export const groupsMemberRolesDeleteGroupsMemberRoles = defineTool({
  name: "groups:member_roles:delete_groups_member_roles",
  description: "Remove member role of a group. Removes a specified member role from a group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      member_role_id: {
        type: "integer",
        description: "ID of the member role.",
      },
    },
    required: ["id", "member_role_id"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/member_roles/{member_role_id}",
  },
});
