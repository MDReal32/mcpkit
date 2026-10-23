import { defineTool } from "@usemcpkit/core";

export const usersPermissionsGetAllPermissions = defineTool({
  name: "users:permissions:get_all_permissions",
  description: "Get all permissions. Returns all permissions, including:",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/permissions",
  },
});
