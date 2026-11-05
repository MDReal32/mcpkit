import { defineTool } from "@usemcpkit/core";

export const usersRolesGetAllRoles = defineTool({
  name: "users:roles:get_all_roles",
  description:
    "Retrieve all roles. Returns all roles grouped by type (global and project). Set `withUsageCount` to include how many users and projects use each role.",
  input: {
    type: "object",
    properties: {
      withUsageCount: {
        type: "string",
        default: "false",
        enum: ["true", "false"],
      },
    },
  },
  request: {
    method: "GET",
    path: "/roles",
    query: ["withUsageCount"],
  },
});
