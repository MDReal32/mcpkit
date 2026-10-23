import { defineTool } from "@usemcpkit/core";

export const usersPermissionSchemesCreatePermissionGrant = defineTool({
  name: "users:permission_schemes:create_permission_grant",
  description: "Create permission grant. Creates a permission grant in a permission scheme.",
  input: {
    type: "object",
    properties: {
      schemeId: {
        type: "integer",
        description: "The ID of the permission scheme in which to create a new permission grant.",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:",
      },
      holder: {
        type: "object",
        description:
          "The user or group being granted the permission. It consists of a `type`, a type-dependent `parameter` and a type-dependent `value`. See Holder object in *Get all permission schemes* for more information.",
        properties: {
          expand: {
            type: "string",
            description: "Expand options that include additional permission holder details in the response.",
          },
          parameter: {
            type: "string",
            description:
              "As a group's name can change, use of `value` is recommended. The identifier associated withthe `type` value that defines the holder of the permission.",
          },
          type: {
            type: "string",
            description: "The type of permission holder.",
          },
          value: {
            type: "string",
            description: "The identifier associated with the `type` value that defines the holder of the permission.",
          },
        },
        required: ["type"],
      },
      id: {
        type: "integer",
        description: "The ID of the permission granted details.",
      },
      permission: {
        type: "string",
        description:
          "The permission to grant. This permission can be one of the built-in permissions or a custom permission added by an app. See Built-in permissions in *Get all permission schemes* for more information about the built-in permissions. See the project permission and global permission module documentation for more information about custom permissions.",
      },
      self: {
        type: "string",
        description: "The URL of the permission granted details.",
      },
    },
    required: ["schemeId"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/permissionscheme/{schemeId}/permission",
    query: ["expand"],
    body: ["holder", "id", "permission", "self"],
  },
});
