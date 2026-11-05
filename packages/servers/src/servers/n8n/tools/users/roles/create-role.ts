import { defineTool } from "@usemcpkit/core";

export const usersRolesCreateRole = defineTool({
  name: "users:roles:create_role",
  description:
    "Create a custom role. Creates a custom role. Set `roleType` to `global` for an instance-wide role or `project` for a project role.",
  input: {
    type: "object",
    properties: {
      displayName: {
        type: "string",
      },
      description: {
        type: "string",
      },
      roleType: {
        type: "string",
        enum: ["project", "global"],
      },
      scopes: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["displayName", "roleType", "scopes"],
  },
  request: {
    method: "POST",
    path: "/roles",
    body: ["displayName", "description", "roleType", "scopes"],
  },
});
