import { defineTool } from "@usemcpkit/core";

export const usersPermissionSchemesDeletePermissionScheme = defineTool({
  name: "users:permission_schemes:delete_permission_scheme",
  description: "Delete permission scheme. Deletes a permission scheme.",
  input: {
    type: "object",
    properties: {
      schemeId: {
        type: "integer",
        description: "The ID of the permission scheme being deleted.",
      },
    },
    required: ["schemeId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/permissionscheme/{schemeId}",
  },
});
