import { defineTool } from "@usemcpkit/core";

export const usersPermissionSchemesGetPermissionSchemeGrant = defineTool({
  name: "users:permission_schemes:get_permission_scheme_grant",
  description: "Get permission scheme grant. Returns a permission grant.",
  input: {
    type: "object",
    properties: {
      schemeId: {
        type: "integer",
        description: "The ID of the permission scheme.",
      },
      permissionId: {
        type: "integer",
        description: "The ID of the permission grant.",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:",
      },
    },
    required: ["schemeId", "permissionId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/permissionscheme/{schemeId}/permission/{permissionId}",
    query: ["expand"],
  },
});
