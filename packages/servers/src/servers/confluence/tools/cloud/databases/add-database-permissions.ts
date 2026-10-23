import { defineTool } from "@usemcpkit/core";

export const cloudDatabasesAddDatabasePermissions = defineTool({
  name: "cloud:databases:add_database_permissions",
  description:
    "[Cloud] Add database permissions. Adds or replaces direct content permissions for the specified principals on a database. Permissions for other principals are preserved; use `PUT` to replace all permissions at once.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the database.",
      },
      allow_self_lockout: {
        type: "boolean",
        description:
          "If `false` (default), the request is rejected when it would remove the calling user's own edit access. Set to `true` to allow the operation even when it locks out the caller.",
      },
      permissions: {
        type: "array",
        items: {
          type: "object",
          description: "A set of principals to assign a given operation permission to.",
        },
      },
    },
    required: ["id", "permissions"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/databases/{id}/permissions",
    query: {
      "allow-self-lockout": "allow_self_lockout",
    },
    body: ["permissions"],
  },
});
