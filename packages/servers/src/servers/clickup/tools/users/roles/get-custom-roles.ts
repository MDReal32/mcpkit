import { defineTool } from "@usemcpkit/core";

export const usersRolesGetCustomRoles = defineTool({
  name: "users:roles:get_custom_roles",
  description: "Get Custom Roles. View the Custom Roles available in a Workspace.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      include_members: {
        type: "boolean",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_id}/customroles",
    query: ["include_members"],
  },
});
