import { defineTool } from "@usemcpkit/core";

export const groupsMemberRolesListGroupsMemberRoles = defineTool({
  name: "groups:member_roles:list_groups_member_roles",
  description: "List all group member roles. Lists all member roles in a specified group.",
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
    path: "/groups/{id}/member_roles",
  },
});
